"use client";

export default function ErrorPage({ reset }) {
    return (
        <main className="error-screen" role="alert">
            <p className="eyebrow"><span /> Spartan Security Solutions</p>
            <h1>That page needs another moment.</h1>
            <p>Something went wrong while loading this page. Please try again.</p>
            <div className="error-actions">
                <button type="button" onClick={reset}>Try again</button>
                <a href="/">Back to home</a>
            </div>
        </main>
    );
}
