"use client";
import { useEffect, useRef } from "react";
import { grainTexture } from "@/lib/motion/variants";
export function GrainTexture() {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) {
            return;
        }
        const drawNoise = () => {
            const width = document.documentElement.clientWidth;
            const height = document.documentElement.clientHeight;
            const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = Math.ceil(width * ratio);
            canvas.height = Math.ceil(height * ratio);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            const image = context.createImageData(canvas.width, canvas.height);
            for (let i = 0; i < image.data.length; i += 4) {
                const shade = Math.random() > 0.5 ? 255 : 0;
                image.data[i] = shade;
                image.data[i + 1] = shade;
                image.data[i + 2] = shade;
                image.data[i + 3] = 28;
            }
            context.putImageData(image, 0, 0);
        };
        drawNoise();
        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(drawNoise, 150);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimer);
        };
    }, []);
    return <canvas ref={canvasRef} className="grain-canvas" style={{ opacity: grainTexture.opacity }} aria-hidden="true"/>;
}
