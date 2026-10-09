"use client";

export default function GlobalError({ reset }) {
    return (
        <html lang="en">
            <body style={{ margin: 0, background: "#111111", color: "#ffffff", fontFamily: "Arial, sans-serif" }}>
                <main style={{ maxWidth: 680, margin: "15vh auto", padding: "2rem" }} role="alert">
                    <p style={{ color: "#F2A900", letterSpacing: ".15em", textTransform: "uppercase" }}>Spartan Security Solutions</p>
                    <h1>We hit an unexpected error.</h1>
                    <p>The page could not be displayed. Please try again or return to the home page.</p>
                    <button type="button" onClick={reset} style={{ padding: ".85rem 1.2rem", background: "#F2A900", border: 0, cursor: "pointer" }}>Try again</button>
                    <a href="/" style={{ marginLeft: "1rem", color: "#ffffff" }}>Back to home</a>
                </main>
            </body>
        </html>
    );
}
