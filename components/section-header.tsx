import React from "react";

interface SectionHeaderProps {
    title: string;
    number: string;
}

export const SectionHeader = ({
    title,
    number,
}: {
    title: string;
    number: string;
}) => (
    <div className="flex items-center gap-4 mb-12 group">
        <span className="text-muted-foreground font-mono text-sm tracking-widest group-hover:text-foreground transition-colors">
            {number}
        </span>
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-primary uppercase">
            {title}
        </h2>
        <div className="h-px bg-border flex-grow max-w-xs ml-4 group-hover:max-w-md transition-all duration-500"></div>
    </div>
);
