import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="bg-background min-h-screen text-foreground flex items-center justify-center">
            <div className="text-center px-6">
                <div className="text-6xl mb-4">🔍</div>
                <h1 className="text-4xl font-serif font-bold mb-4">Post Not Found</h1>
                <p className="text-muted-foreground mb-8">
                    The blog post you&apos;re looking for doesn&apos;t exist.
                </p>
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-border"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                </Link>
            </div>
        </div>
    );
}
