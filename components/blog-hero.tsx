export function BlogHero() {
    return (
        <section className="pt-32 px-6 border-b border-border transition-colors duration-500">
            <div className="max-w-4xl mx-auto">
                <div className="space-y-6 mb-12">
                    {/* Decorative element */}
                    <div className="inline-block">
                        <div className="px-4 py-2 rounded-sm bg-primary/10 border border-primary/20 text-primary text-xs font-medium tracking-wider uppercase">
                            Insights & Ideas
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground">
                        Blog
                    </h1>

                    <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                        Exploring the intersection of design, development, and digital innovation.
                        Deep dives into web technologies, best practices, and creative insights.
                    </p>
                </div>
            </div>
        </section>
    );
}
