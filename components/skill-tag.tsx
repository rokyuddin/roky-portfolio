import React from "react";

export const SkillTag = ({ name }: { name: string }) => (
    <span className="px-4 py-2 bg-secondary border border-border text-muted-foreground text-sm hover:border-primary hover:text-primary transition-all duration-300 cursor-default">
        {name}
    </span>
);
