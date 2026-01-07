import { ExecutionResult } from "../types";

export class CodeExecutor {
    private worker: Worker | null = null;
    private timeout: number = 5000; // 5 seconds max execution time

    constructor(timeout?: number) {
        if (timeout) this.timeout = timeout;
    }

    async execute(code: string): Promise<ExecutionResult> {
        const startTime = performance.now();
        const output: string[] = [];
        const errors: string[] = [];

        return new Promise((resolve) => {
            // Create a blob with the worker code
            const workerCode = `
        // Intercept console methods
        const originalConsole = {
          log: console.log,
          error: console.error,
          warn: console.warn,
          info: console.info
        };

        const logs = [];
        const errors = [];

        console.log = (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };

        console.error = (...args) => {
          errors.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };

        console.warn = console.log;
        console.info = console.log;

        // Listen for code execution requests
        self.onmessage = function(e) {
          try {
            // Execute the code
            const result = eval(e.data);
            
            // If the result is a promise, wait for it
            if (result instanceof Promise) {
              result
                .then(() => {
                  self.postMessage({ logs, errors, success: true });
                })
                .catch((error) => {
                  errors.push(error.message || String(error));
                  self.postMessage({ logs, errors, success: false });
                });
            } else {
              self.postMessage({ logs, errors, success: true });
            }
          } catch (error) {
            errors.push(error.message || String(error));
            self.postMessage({ logs, errors, success: false });
          }
        };
      `;

            const blob = new Blob([workerCode], { type: 'application/javascript' });
            const workerUrl = URL.createObjectURL(blob);

            try {
                this.worker = new Worker(workerUrl);

                // Set up timeout
                const timeoutId = setTimeout(() => {
                    if (this.worker) {
                        this.worker.terminate();
                        this.worker = null;
                    }
                    errors.push('Execution timeout: Code took too long to execute');
                    const executionTime = performance.now() - startTime;
                    resolve({ output, errors, executionTime });
                }, this.timeout);

                // Listen for results
                this.worker.onmessage = (e) => {
                    clearTimeout(timeoutId);

                    if (e.data.logs) {
                        output.push(...e.data.logs);
                    }
                    if (e.data.errors) {
                        errors.push(...e.data.errors);
                    }

                    const executionTime = performance.now() - startTime;

                    // Clean up
                    if (this.worker) {
                        this.worker.terminate();
                        this.worker = null;
                    }
                    URL.revokeObjectURL(workerUrl);

                    resolve({ output, errors, executionTime });
                };

                // Listen for errors
                this.worker.onerror = (error) => {
                    clearTimeout(timeoutId);
                    errors.push(error.message || 'Unknown error occurred');

                    const executionTime = performance.now() - startTime;

                    if (this.worker) {
                        this.worker.terminate();
                        this.worker = null;
                    }
                    URL.revokeObjectURL(workerUrl);

                    resolve({ output, errors, executionTime });
                };

                // Send code to worker
                this.worker.postMessage(code);
            } catch (error) {
                errors.push(`Failed to create worker: ${error}`);
                const executionTime = performance.now() - startTime;
                URL.revokeObjectURL(workerUrl);
                resolve({ output, errors, executionTime });
            }
        });
    }

    terminate() {
        if (this.worker) {
            this.worker.terminate();
            this.worker = null;
        }
    }
}

// Singleton instance for convenience
let executorInstance: CodeExecutor | null = null;

export function getCodeExecutor(): CodeExecutor {
    if (!executorInstance) {
        executorInstance = new CodeExecutor();
    }
    return executorInstance;
}

export function executeCode(code: string): Promise<ExecutionResult> {
    return getCodeExecutor().execute(code);
}
