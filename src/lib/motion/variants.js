export const textReveal = {
    hidden: { y: "100%" },
    visible: {
        y: "0%",
        transition: { duration: 0.85, ease: [0.77, 0, 0.175, 1] },
    },
};
export const textRevealGroup = {
    hidden: {},
    visible: { transition: { delayChildren: 0.3, staggerChildren: 0.035 } },
};
export const logoMaskReveal = {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: {
        clipPath: "inset(0 0% 0 0)",
        transition: { duration: 1.1, ease: [0.77, 0, 0.175, 1] },
    },
};
export const magneticButton = {
    radius: 40,
    strength: 0.2,
};
export const grainTexture = {
    opacity: 0.08,
};
export const scrollProgress = {
    origin: "left",
    color: "#D92128",
};
export const hoverDistort = {
    rest: { scale: 1, filter: "grayscale(100%)" },
    hover: { scale: 1.045, filter: "grayscale(0%)", transition: { duration: 0.55, ease: "easeOut" } },
};
