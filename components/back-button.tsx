import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
    return (
        <Link
            href="/blog"
            className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 mb-8"
        >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">Back to Blog</span>
        </Link>
    );
}
