import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-9xl font-bold text-primary/10">404</h1>
      <div className="space-y-4 -mt-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Page not found
        </h2>
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
