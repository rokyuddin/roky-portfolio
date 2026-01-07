"use client"
import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import { Code2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface TechStackProps {
    skills: any[];
}

export function TechStack({ skills }: TechStackProps) {
    if (!skills) return null;

    // Split skills for orbits
    const outerSkills = skills.slice(0, 5);
    const innerSkills = skills.slice(5, 8);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="pb-24 md:pb-32">
            <div className="mx-auto px-6 max-w-5xl">
                <div className="group relative flex justify-between items-center mx-auto max-w-88 sm:max-w-sm aspect-16/10">
                    <div
                        role="presentation"
                        className="z-10 absolute inset-0 justify-center items-center bg-linear-to-b from-primary/15 dark:from-white/5 to-25% to-transparent opacity-0 group-hover:opacity-100 border-foreground/5 border-t rounded-full aspect-square animate-spin duration-[3.5s]"></div>
                    <div
                        role="presentation"
                        className="z-10 absolute inset-16 justify-center items-center bg-linear-to-b from-blue-500/15 to-25% to-transparent opacity-0 group-hover:opacity-100 border-foreground/5 border-t rounded-full aspect-square scale-90 animate-spin duration-[3.5s]"></div>

                    {/* Outer Orbit */}
                    <div className="absolute inset-0 flex justify-center items-center bg-linear-to-b from-muted-foreground/15 to-25% to-transparent border-t rounded-full aspect-square">
                        {outerSkills.map((skill, idx) => {
                            // Simple positioning for 5 items
                            const positions = [
                                "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
                                "top-[15%] right-[15%] -translate-y-1/2 translate-x-1/2",
                                "top-1/2 right-0 -translate-y-1/2 translate-x-1/2",
                                "top-[15%] left-[15%] -translate-x-1/2 -translate-y-1/2",
                                "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
                            ];
                            return (
                                <TechCard key={skill._id} className={cn("absolute", positions[idx])} techName={skill.name}>
                                    {skill.image ? (
                                        <Image src={urlFor(skill.image).url()} alt={skill.name} width={40} height={40} className="size-full object-contain" />
                                    ) : (
                                        <div className="font-bold text-primary text-xs">{skill.name[0]}</div>
                                    )}
                                </TechCard>
                            );
                        })}
                    </div>

                    {/* Inner Orbit */}
                    <div className="z-40 absolute inset-16 flex justify-center items-center bg-linear-to-b from-muted-foreground/15 to-25% to-transparent border-t rounded-full aspect-square scale-90">
                        {innerSkills.map((skill, idx) => {
                            const positions = [
                                "top-1/2 right-0 -translate-y-1/2 translate-x-1/2",
                                "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
                                "bottom-1/2 left-0 -translate-x-1/2 translate-y-1/2",
                            ];
                            return (
                                <TechCard key={skill._id} className={cn("z-50 absolute", positions[idx])} techName={skill.name}>
                                    {skill.image ? (
                                        <Image src={urlFor(skill.image).url()} alt={skill.name} width={32} height={32} className="size-full object-contain" />
                                    ) : (
                                        <div className="font-bold text-primary text-xs">{skill.name[0]}</div>
                                    )}
                                </TechCard>
                            );
                        })}
                    </div>

                    <div className="bottom-0 absolute inset-x-0 flex justify-center gap-2 mx-auto my-2 w-fit">
                        <div className="z-20 relative bg-muted p-1 border rounded-full">
                            <TechCard
                                className="dark:bg-background shadow-black-950/10 shadow-xl dark:shadow-white/15 border-black/20 dark:border-white/25 size-16"
                                isCenter={true}
                                techName="Code"
                            >
                                <Code2 className="size-8 text-primary" />
                            </TechCard>
                        </div>
                    </div>
                </div>
                <div className="z-20 relative space-y-6 bg-linear-to-t from-55% from-background mx-auto mt-12 max-w-lg text-center">
                    <h2 className="font-serif font-semibold text-primary text-3xl md:text-4xl text-balance">My Tech Stack</h2>
                    <p className="text-muted-foreground">
                        I build with modern, scalable technologies to create fast and reliable applications.
                    </p>
                    <br />
                    <Link
                        href="#projects"
                        onClick={(e) => handleScroll(e, "#projects")}
                        className="px-8 py-4 border border-border hover:border-primary font-medium text-primary tracking-wide transition-colors"
                    >
                        VIEW WORK
                    </Link>
                </div>
            </div>
        </section>
    )
}

const TechCard = ({
    children,
    className,
    isCenter = false,
    techName
}: {
    children: React.ReactNode;
    className?: string;
    isCenter?: boolean;
    techName?: string;
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={cn('z-30 relative flex justify-center items-center bg-white dark:bg-white/5 shadow-black/5 shadow-sm dark:backdrop-blur-md p-2 border rounded-full size-12', className)}
            onMouseEnter={() => techName && setIsHovered(true)}
            onMouseLeave={() => techName && setIsHovered(false)}
        >
            {/* Animated Tooltip */}
            {techName && (
                <div className={cn(
                    '-top-12 left-1/2 absolute whitespace-nowrap -translate-x-1/2',
                    'px-3 py-1.5 rounded-lg',
                    'bg-primary text-primary-foreground',
                    'text-sm font-medium',
                    'shadow-lg border border-primary/20',
                    'transition-all duration-300 ease-out',
                    'pointer-events-none',
                    isHovered
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-2'
                )}>
                    {techName}
                    {/* Tooltip Arrow */}
                    <div className="-bottom-1 left-1/2 absolute bg-primary border-primary/20 border-r border-b w-2 h-2 rotate-45 -translate-x-1/2"></div>
                </div>
            )}
            <div className={cn('flex justify-center items-center size-full', isCenter && 'p-1')}>{children}</div>
        </div>
    )
}
