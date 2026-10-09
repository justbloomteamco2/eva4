const config = {
    content: ["./src/**/*.{js,jsx,mdx}"],
    theme: {
        extend: {
            colors: {
                obsidian: "var(--brand-obsidian)",
                clementine: "var(--brand-clementine)",
                crimson: "var(--brand-crimson)",
                white: "var(--brand-white)",
                tuscan: "var(--brand-tuscan)",
            },
            fontFamily: {
                display: ["var(--font-display)", "sans-serif"],
                body: ["var(--font-body)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
