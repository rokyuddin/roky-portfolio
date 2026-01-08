export const SectionHeader = ({
    title,
    number,
}: {
    title: string;
    number: string;
}) => (
    <div className="group flex items-center gap-4 mb-12">
        <span className="font-mono text-muted-foreground group-hover:text-foreground text-sm tracking-widest transition-colors">
            {number}
        </span>
        <h2 className="font-light text-primary text-2xl md:text-3xl uppercase tracking-tight">
            {title}
        </h2>
        <div className="ml-4 bg-border max-w-xs group-hover:max-w-md h-px transition-all duration-500 grow"></div>
    </div>
);
