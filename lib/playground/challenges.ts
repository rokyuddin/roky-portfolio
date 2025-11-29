export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Category = "react" | "algorithms" | "dom" | "async";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  category: Category;
  starterCode: string;
  solution: string;
  testCases?: Array<{
    input: string;
    expectedOutput: string;
  }>;
}

export const challenges: Challenge[] = [
  // React Challenges
  {
    id: "react-counter",
    title: "Build a Counter Component",
    description: "Create a simple counter component with increment and decrement buttons. The counter should display the current count and have two buttons to increase or decrease the value.",
    difficulty: "beginner",
    category: "react",
    starterCode: `// Create a counter component
function Counter() {
  // Your code here
  
  return (
    <div>
      {/* Add your JSX here */}
    </div>
  );
}

// Test your component
Counter();`,
    solution: `function Counter() {
  let count = 0;
  
  const increment = () => {
    count++;
    console.log('Count:', count);
  };
  
  const decrement = () => {
    count--;
    console.log('Count:', count);
  };
  
  return {
    increment,
    decrement,
    getCount: () => count
  };
}

const counter = Counter();
counter.increment(); // Count: 1
counter.increment(); // Count: 2
counter.decrement(); // Count: 1`
  },
  {
    id: "react-todo",
    title: "Todo List Manager",
    description: "Build a todo list manager with add, remove, and toggle complete functionality. Implement functions to manage a list of todo items.",
    difficulty: "intermediate",
    category: "react",
    starterCode: `// Create a todo list manager
function TodoList() {
  const todos = [];
  
  // Implement these methods:
  // - addTodo(text)
  // - removeTodo(id)
  // - toggleComplete(id)
  // - getTodos()
  
  return {
    // Your methods here
  };
}

// Test your implementation
const list = TodoList();
list.addTodo("Learn React");
console.log(list.getTodos());`,
    solution: `function TodoList() {
  const todos = [];
  let nextId = 1;
  
  const addTodo = (text) => {
    todos.push({ id: nextId++, text, completed: false });
  };
  
  const removeTodo = (id) => {
    const index = todos.findIndex(t => t.id === id);
    if (index > -1) todos.splice(index, 1);
  };
  
  const toggleComplete = (id) => {
    const todo = todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
  };
  
  const getTodos = () => [...todos];
  
  return { addTodo, removeTodo, toggleComplete, getTodos };
}

const list = TodoList();
list.addTodo("Learn React");
list.addTodo("Build Projects");
console.log(list.getTodos());`
  },

  // Algorithm Challenges
  {
    id: "algo-palindrome",
    title: "Check Palindrome",
    description: "Write a function that checks if a given string is a palindrome (reads the same forwards and backwards). Ignore spaces and case.",
    difficulty: "beginner",
    category: "algorithms",
    starterCode: `// Check if a string is a palindrome
function isPalindrome(str) {
  // Your code here
}

// Test cases
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
console.log(isPalindrome("A man a plan a canal Panama")); // true`,
    solution: `function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
console.log(isPalindrome("A man a plan a canal Panama")); // true`
  },
  {
    id: "algo-fibonacci",
    title: "Fibonacci Sequence",
    description: "Implement a function that returns the nth number in the Fibonacci sequence. Optimize for performance using memoization.",
    difficulty: "intermediate",
    category: "algorithms",
    starterCode: `// Calculate the nth Fibonacci number
function fibonacci(n) {
  // Your code here
}

// Test cases
console.log(fibonacci(0));  // 0
console.log(fibonacci(1));  // 1
console.log(fibonacci(10)); // 55
console.log(fibonacci(20)); // 6765`,
    solution: `function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

console.log(fibonacci(0));  // 0
console.log(fibonacci(1));  // 1
console.log(fibonacci(10)); // 55
console.log(fibonacci(20)); // 6765`
  },
  {
    id: "algo-anagram",
    title: "Anagram Checker",
    description: "Create a function that determines if two strings are anagrams of each other (contain the same characters in different order).",
    difficulty: "beginner",
    category: "algorithms",
    starterCode: `// Check if two strings are anagrams
function areAnagrams(str1, str2) {
  // Your code here
}

// Test cases
console.log(areAnagrams("listen", "silent")); // true
console.log(areAnagrams("hello", "world"));   // false
console.log(areAnagrams("Triangle", "Integral")); // true`,
    solution: `function areAnagrams(str1, str2) {
  const normalize = (s) => s.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
  return normalize(str1) === normalize(str2);
}

console.log(areAnagrams("listen", "silent")); // true
console.log(areAnagrams("hello", "world"));   // false
console.log(areAnagrams("Triangle", "Integral")); // true`
  },

  // DOM Manipulation Challenges
  {
    id: "dom-element-creator",
    title: "Dynamic Element Creator",
    description: "Create a function that generates HTML elements with specified attributes and content. Return an object representation of the element.",
    difficulty: "beginner",
    category: "dom",
    starterCode: `// Create an element with attributes
function createElement(tag, attributes = {}, content = '') {
  // Your code here
  // Return an object with: tag, attributes, content
}

// Test cases
console.log(createElement('div', { class: 'container' }, 'Hello'));
console.log(createElement('button', { id: 'btn', disabled: true }, 'Click me'));`,
    solution: `function createElement(tag, attributes = {}, content = '') {
  return {
    tag,
    attributes,
    content,
    toString() {
      const attrs = Object.entries(this.attributes)
        .map(([key, val]) => \`\${key}="\${val}"\`)
        .join(' ');
      return \`<\${tag} \${attrs}>\${content}</\${tag}>\`;
    }
  };
}

console.log(createElement('div', { class: 'container' }, 'Hello').toString());
console.log(createElement('button', { id: 'btn', disabled: true }, 'Click me').toString());`
  },

  // Async/Promises Challenges
  {
    id: "async-delay",
    title: "Promise Delay Function",
    description: "Create a delay function that returns a promise which resolves after a specified number of milliseconds.",
    difficulty: "beginner",
    category: "async",
    starterCode: `// Create a delay function using Promises
function delay(ms) {
  // Your code here
}

// Test case
console.log('Start');
delay(2000).then(() => console.log('Done after 2 seconds'));`,
    solution: `function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

console.log('Start');
delay(2000).then(() => console.log('Done after 2 seconds'));`
  },
  {
    id: "async-fetch-retry",
    title: "Retry Failed Requests",
    description: "Implement a function that retries a failed async operation a specified number of times before giving up.",
    difficulty: "advanced",
    category: "async",
    starterCode: `// Retry an async function on failure
async function retry(fn, maxAttempts = 3) {
  // Your code here
  // Retry the function up to maxAttempts times
  // Throw error if all attempts fail
}

// Test with a function that fails twice then succeeds
let attempts = 0;
async function unreliableFunction() {
  attempts++;
  if (attempts < 3) throw new Error('Failed');
  return 'Success!';
}

retry(unreliableFunction).then(console.log).catch(console.error);`,
    solution: `async function retry(fn, maxAttempts = 3) {
  let lastError;
  
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.log(\`Attempt \${i + 1} failed\`);
    }
  }
  
  throw lastError;
}

let attempts = 0;
async function unreliableFunction() {
  attempts++;
  if (attempts < 3) throw new Error('Failed');
  return 'Success!';
}

retry(unreliableFunction).then(console.log).catch(console.error);`
  },
  {
    id: "async-parallel",
    title: "Parallel Promise Execution",
    description: "Create a function that executes multiple promises in parallel and returns their results in order.",
    difficulty: "intermediate",
    category: "async",
    starterCode: `// Execute promises in parallel
async function parallel(promises) {
  // Your code here
}

// Test case
const p1 = delay(1000).then(() => 'First');
const p2 = delay(500).then(() => 'Second');
const p3 = delay(1500).then(() => 'Third');

parallel([p1, p2, p3]).then(console.log); // ['First', 'Second', 'Third']

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}`,
    solution: `async function parallel(promises) {
  return Promise.all(promises);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const p1 = delay(1000).then(() => 'First');
const p2 = delay(500).then(() => 'Second');
const p3 = delay(1500).then(() => 'Third');

parallel([p1, p2, p3]).then(console.log);`
  }
];

export function getChallengeById(id: string): Challenge | undefined {
  return challenges.find(c => c.id === id);
}

export function getChallengesByCategory(category: Category): Challenge[] {
  return challenges.filter(c => c.category === category);
}

export function getChallengesByDifficulty(difficulty: Difficulty): Challenge[] {
  return challenges.filter(c => c.difficulty === difficulty);
}
