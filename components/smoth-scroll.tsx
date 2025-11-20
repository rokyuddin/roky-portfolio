
"use client"
import { ReactLenis } from "lenis/react";
export function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.5,
                // smoothTouch: false, //smooth scroll for touch devices
                // smooth: true,
                syncTouch: true,
                syncTouchLerp: 0.1,
                touchMultiplier: 2,
            }}
        >
            {children}
        </ReactLenis>
    )
}