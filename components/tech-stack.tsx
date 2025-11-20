"use client"
import { Code2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link';
import { useState } from 'react';

export function TechStack() {
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
            <div className="mx-auto max-w-5xl px-6">
                <div className="aspect-16/10 group relative mx-auto flex max-w-[22rem] items-center justify-between sm:max-w-sm">
                    <div
                        role="presentation"
                        className="bg-linear-to-b border-foreground/5 absolute inset-0 z-10 aspect-square animate-spin items-center justify-center rounded-full border-t from-primary/15 to-transparent to-25% opacity-0 duration-[3.5s] group-hover:opacity-100 dark:from-white/5"></div>
                    <div
                        role="presentation"
                        className="bg-linear-to-b border-foreground/5 absolute inset-16 z-10 aspect-square scale-90 animate-spin items-center justify-center rounded-full border-t from-blue-500/15 to-transparent to-25% opacity-0 duration-[3.5s] group-hover:opacity-100"></div>

                    {/* Outer Orbit - 4 items */}
                    <div className="bg-linear-to-b from-muted-foreground/15 absolute inset-0 flex aspect-square items-center justify-center rounded-full border-t to-transparent to-25%">
                        {/* Top */}
                        <TechCard className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" techName="TanStack">
                            <Image src="/tech/tanstack.png" alt="TanStack" width={40} height={40} className="size-full object-contain" />
                        </TechCard>

                        {/* Top Right */}
                        <TechCard className="absolute right-[15%] top-[15%] translate-x-1/2 -translate-y-1/2" techName="Next.js">
                            <Image src="/tech/nextjs.png" alt="Next.js" width={40} height={40} className="size-full object-contain" />
                        </TechCard>

                        {/* Right Bottom */}
                        <TechCard className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2" techName="TypeScript">
                            <Image src="/tech/typescript.png" alt="TypeScript" width={40} height={40} className="size-full object-contain" />
                        </TechCard>

                        {/* Left Top */}
                        <TechCard className="absolute left-[15%] top-[15%] -translate-x-1/2 -translate-y-1/2" techName="React">
                            <Image src="/tech/react.png" alt="React" width={40} height={40} className="size-full object-contain" />
                        </TechCard>

                        {/* Left Bottom */}
                        <TechCard className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" techName="JavaScript">
                            <Image src="/tech/javascript.webp" alt="Javascript" width={40} height={40} className="size-full object-contain" />
                        </TechCard>
                    </div>

                    {/* Inner Orbit - 4 items */}
                    <div className="bg-linear-to-b from-muted-foreground/15 absolute inset-16 z-40 flex aspect-square scale-90 items-center justify-center rounded-full border-t to-transparent to-25%">
                        {/* Right Bottom */}
                        <TechCard className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-50" techName="Material UI">
                            <Image src="/tech/mui.png" alt="Material UI" width={32} height={32} className="size-full object-contain" />
                        </TechCard>

                        {/* Middle */}
                        <TechCard className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50" techName="Redux">
                            <Image src="/tech/redux.webp" alt="Redux" width={32} height={32} className="size-full object-contain" />
                        </TechCard>
                        {/* Left Bottom */}
                        <TechCard className="absolute bottom-1/2 left-0 translate-y-1/2 -translate-x-1/2 z-50" techName="Tailwind CSS">
                            <Image src="/tech/tailwind.png" alt="Tailwind CSS" width={32} height={32} className="size-full object-contain" />
                        </TechCard>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 mx-auto my-2 flex w-fit justify-center gap-2">
                        <div className="bg-muted relative z-20 rounded-full border p-1">
                            <TechCard
                                className="shadow-black-950/10 dark:bg-background size-16 border-black/20 shadow-xl dark:border-white/25 dark:shadow-white/15"
                                isCenter={true}
                                techName="Code"
                                >
                                <Code2 className="text-primary size-8" />
                            </TechCard>
                        </div>
                    </div>
                </div>
                <div className="bg-linear-to-t from-background relative z-20 mx-auto mt-12 max-w-lg space-y-6 from-55% text-center">
                    <h2 className="text-balance text-3xl font-semibold md:text-4xl text-primary font-serif">My Tech Stack</h2>
                    <p className="text-muted-foreground">
                        I build with modern, scalable technologies to create fast and reliable applications.
                    </p>
                    <br />
                    <Link
                        href="#projects"
                        onClick={(e) => handleScroll(e, "#projects")}
                        className="px-8 py-4 border border-border text-primary font-medium tracking-wide hover:border-primary transition-colors"
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
            className={cn('relative z-30 flex size-12 rounded-full border bg-white shadow-sm shadow-black/5 dark:bg-white/5 dark:backdrop-blur-md items-center justify-center p-2', className)}
            onMouseEnter={() => techName && setIsHovered(true)}
            onMouseLeave={() => techName && setIsHovered(false)}
        >
            {/* Animated Tooltip */}
            {techName && (
                <div className={cn(
                    'absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap',
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
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45 border-r border-b border-primary/20"></div>
                </div>
            )}
            <div className={cn('flex items-center justify-center size-full', isCenter && 'p-1')}>{children}</div>
        </div>
    )
}
