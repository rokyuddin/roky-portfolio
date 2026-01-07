import Link from "next/link";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";

export default function CaseStudyNotFound() {
  return (
    <div className="bg-background min-h-screen text-foreground flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <FileQuestion className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-6xl font-serif text-primary mb-4">404</h1>
          <h2 className="text-3xl font-serif text-foreground mb-4">
            Case Study Not Found
          </h2>
          <p className="text-lg text-muted-foreground">
            The case study you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            View All Case Studies
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground border border-border rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
