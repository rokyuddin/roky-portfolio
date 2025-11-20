import React from "react";

export const ReactLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="0" cy="0" r="2" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="10" ry="4.5" />
            <ellipse rx="10" ry="4.5" transform="rotate(60)" />
            <ellipse rx="10" ry="4.5" transform="rotate(120)" />
        </g>
    </svg>
);

export const NextJSLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <mask id="mask0_1_2" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
            <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g mask="url(#mask0_1_2)">
            <circle cx="90" cy="90" r="90" fill="black" stroke="currentColor" strokeWidth="6" />
            <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_1_2)" />
            <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_1_2)" />
        </g>
        <defs>
            <linearGradient id="paint0_linear_1_2" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="currentColor" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint1_linear_1_2" x1="121" y1="54" x2="120.791" y2="106.883" gradientUnits="userSpaceOnUse">
                <stop stopColor="currentColor" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
        </defs>
    </svg>
);

export const TypeScriptLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M2 0h20c1.1 0 2 .9 2 2v20c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V2c0-1.1.9-2 2-2zm11.5 12.5h-1v4.5h-1.5v-4.5h-1v-1.5h3.5v1.5zm4.5 3.5c0 1-.8 1.5-2 1.5-.8 0-1.4-.3-1.8-.8l.8-1c.2.3.5.5.9.5.3 0 .5-.2.5-.5 0-.2-.1-.4-.6-.5-.9-.3-1.4-.8-1.4-1.6 0-1 .9-1.6 1.9-1.6.7 0 1.3.2 1.7.6l-.7 1c-.2-.3-.5-.4-.9-.4-.3 0-.5.2-.5.4 0 .2.1.3.6.5.9.3 1.4.8 1.4 1.6z" fill="#3178C6" />
    </svg>
);

export const TailwindLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12.001 10.375c-1.25.987-2.942 1.104-3.688.657-.745-.446-1.09-2.188.16-3.175 1.25-.987 2.942-1.104 3.688-.657.745.446 1.09 2.188-.16 3.175zM18.5 19.5c-1.25.987-2.942 1.104-3.688.657-.745-.446-1.09-2.188.16-3.175 1.25-.987 2.942-1.104 3.688-.657.745.446 1.09 2.188-.16 3.175zM6.5 13.5c-1.25.987-2.942 1.104-3.688.657-.745-.446-1.09-2.188.16-3.175 1.25-.987 2.942-1.104 3.688-.657.745.446 1.09 2.188-.16 3.175zM13 4.5c-1.25.987-2.942 1.104-3.688.657-.745-.446-1.09-2.188.16-3.175 1.25-.987 2.942-1.104 3.688-.657.745.446 1.09 2.188-.16 3.175z" fill="#06B6D4" fillOpacity="0" />
        <path d="M18.5 19.5c-2.5 2-6.5 1-8.5-1.5-2-2.5-1-5.5 1.5-7.5 2.5-2 6.5-1 8.5 1.5 2 2.5 1 5.5-1.5 7.5z" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12.5 10.5c-2.5 2-6.5 1-8.5-1.5-2-2.5-1-5.5 1.5-7.5 2.5-2 6.5-1 8.5 1.5 2 2.5 1 5.5-1.5 7.5z" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const NodeLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M16 3L3 10.5V21.5L16 29L29 21.5V10.5L16 3Z" stroke="#339933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 29V14" stroke="#339933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M29 10.5L16 14L3 10.5" stroke="#339933" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const GitLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M2.5 12a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" stroke="#F05032" strokeWidth="1.5" />
        <path d="M15.5 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" stroke="#F05032" strokeWidth="1.5" />
        <path d="M12 8.5v7" stroke="#F05032" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8.5 12h7" stroke="#F05032" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);
