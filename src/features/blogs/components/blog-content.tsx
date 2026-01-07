interface BlogContentProps {
    content: string;
}

export function BlogContent({ content }: BlogContentProps) {
    const formattedContent = content
        .split("\n")
        .map((line) => {
            // Convert markdown headings to HTML
            if (line.startsWith("# ")) {
                return `<h1 class="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mt-8 md:mt-12 mb-4 md:mb-6">${line.replace("# ", "")}</h1>`;
            }
            if (line.startsWith("## ")) {
                return `<h2 class="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-foreground mt-6 md:mt-10 mb-3 md:mb-4">${line.replace("## ", "")}</h2>`;
            }
            if (line.startsWith("### ")) {
                return `<h3 class="text-lg sm:text-xl md:text-2xl font-serif font-bold text-foreground mt-4 md:mt-8 mb-2 md:mb-3">${line.replace("### ", "")}</h3>`;
            }
            // Convert code blocks
            if (line.startsWith("```")) {
                return line.replace("```", "<pre class='bg-muted p-4 rounded-lg overflow-x-auto my-6'><code>");
            }
            // Paragraphs
            if (line.trim() && !line.startsWith("<")) {
                return `<p class="text-sm sm:text-base text-foreground/90 mb-4">${line}</p>`;
            }
            return line;
        })
        .join("\n")
        .replace(/<\/code><\/pre>/g, "</code></pre>");

    return (
        <div className="prose prose-lg prose-zinc dark:prose-invert max-w-none">
            <div
                className="article-content space-y-6 leading-relaxed"
                dangerouslySetInnerHTML={{
                    __html: formattedContent,
                }}
            />
        </div>
    );
}
