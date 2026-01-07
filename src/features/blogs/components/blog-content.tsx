interface BlogContentProps {
    content: string;
}

export function BlogContent({ content }: BlogContentProps) {
    let inCodeBlock = false;
    const formattedContent = content
        .split("\n")
        .map((line) => {
            // Convert code blocks
            if (line.trim().startsWith("```")) {
                if (inCodeBlock) {
                    inCodeBlock = false;
                    return "</code></pre>";
                } else {
                    inCodeBlock = true;
                    return `<pre class='bg-muted my-6 p-4 rounded-lg overflow-x-auto'><code>`;
                }
            }

            if (inCodeBlock) return line;

            // Convert markdown headings to HTML
            if (line.startsWith("# ")) {
                return `<h1 class="mt-8 md:mt-12 mb-4 md:mb-6 font-serif font-bold text-foreground text-2xl sm:text-3xl md:text-4xl">${line.replace("# ", "")}</h1>`;
            }
            if (line.startsWith("## ")) {
                return `<h2 class="mt-6 md:mt-10 mb-3 md:mb-4 font-serif font-bold text-foreground text-xl sm:text-2xl md:text-3xl">${line.replace("## ", "")}</h2>`;
            }
            if (line.startsWith("### ")) {
                return `<h3 class="mt-4 md:mt-8 mb-2 md:mb-3 font-serif font-bold text-foreground text-lg sm:text-xl md:text-2xl">${line.replace("### ", "")}</h3>`;
            }
            // Paragraphs
            if (line.trim() && !line.startsWith("<")) {
                return `<p class="mb-4 text-foreground/90 text-sm sm:text-base">${line}</p>`;
            }
            return line;
        })
        .join("\n");

    return (
        <div className="dark:prose-invert max-w-none prose prose-lg prose-zinc">
            <div
                className="space-y-6 leading-relaxed article-content"
                dangerouslySetInnerHTML={{
                    __html: formattedContent,
                }}
            />
        </div>
    );
}
