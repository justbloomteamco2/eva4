"use client";
import { useCallback, useEffect, useRef, useState } from "react";
const ratingOptions = [1, 2, 3, 4, 5];
const initialForm = {
    name: "",
    role: "",
    quote: "",
    rating: 5,
    service: "Security services",
};
export function ClientFeedbackForm() {
    const [form, setForm] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState([]);
    const [loadingFeedback, setLoadingFeedback] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [previewRating, setPreviewRating] = useState(null);
    const feedbackRequest = useRef(null);
    const [status, setStatus] = useState({
        type: "idle",
        message: "",
    });
    const loadFeedback = useCallback(async () => {
        if (feedbackRequest.current) return;
        const controller = new AbortController();
        feedbackRequest.current = controller;
        try {
            const response = await fetch("/api/reviews", { cache: "no-store", signal: controller.signal });
            if (!response.ok) throw new Error("Unable to load feedback.");
            const data = await response.json();
            if (!Array.isArray(data)) throw new Error("Unable to load feedback.");
            setFeedback(data);
            setLoadError("");
        } catch (error) {
            if (!controller.signal.aborted) {
                setLoadError(error instanceof Error ? error.message : "Unable to load client feedback.");
            }
        } finally {
            if (feedbackRequest.current === controller) feedbackRequest.current = null;
            if (!controller.signal.aborted) setLoadingFeedback(false);
        }
    }, []);
    useEffect(() => {
        const refresh = () => {
            if (document.visibilityState === "visible") void loadFeedback();
        };
        void loadFeedback();
        const interval = window.setInterval(refresh, 15000);
        document.addEventListener("visibilitychange", refresh);
        window.addEventListener("focus", refresh);
        return () => {
            feedbackRequest.current?.abort();
            window.clearInterval(interval);
            document.removeEventListener("visibilitychange", refresh);
            window.removeEventListener("focus", refresh);
        };
    }, [loadFeedback]);
    const activeRating = previewRating ?? form.rating;
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setStatus({ type: "idle", message: "" });
        try {
            const response = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, name: form.name.trim(), quote: form.quote.trim(), role: form.role.trim() || "Client" }),
            });
            const data = (await response.json());
            if (!response.ok) {
                throw new Error(data.error ?? "Unable to save your feedback.");
            }
            setForm(initialForm);
            setStatus({ type: "success", message: data.message ?? "Thank you. Your feedback will be reviewed before it appears." });
            void loadFeedback();
        }
        catch (error) {
            setStatus({
                type: "error",
                message: error instanceof Error ? error.message : "Something went wrong while saving your feedback.",
            });
        }
        finally {
            setSubmitting(false);
        }
    };
    return (<section id="reviews" className="feedback-panel" aria-labelledby="feedback-title">
      <div className="feedback-form-wrap">
        <p className="eyebrow"><span/> Your voice matters</p>
        <h3 id="feedback-title">Share your experience</h3>
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="field-row">
            <label>
              Name
              <input type="text" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Your name" required/>
            </label>
            <label>
              Role
              <input type="text" value={form.role} onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))} placeholder="Company or role"/>
            </label>
          </div>

          <label>
            Service received
            <select value={form.service} onChange={(event) => setForm((current) => ({ ...current, service: event.target.value }))}>
              <option value="Security services">Security services</option>
              <option value="Housekeeping">Housekeeping</option>
              <option value="Gardening">Gardening</option>
              <option value="Labour & manpower">Labour & manpower</option>
            </select>
          </label>

          <label>
            Your experience
            <textarea value={form.quote} onChange={(event) => setForm((current) => ({ ...current, quote: event.target.value }))} placeholder="How did Spartan support your site or property?" rows={4} required maxLength={220}/>
            <span className="review-character-count">{form.quote.length} / 220 characters</span>
          </label>

          <div className="rating-picker" role="group" aria-label="Rate your experience">
            {ratingOptions.map((rating) => (<button key={rating} type="button" className={rating <= activeRating ? "is-selected" : ""} onClick={() => setForm((current) => ({ ...current, rating }))} onMouseEnter={() => setPreviewRating(rating)} onMouseLeave={() => setPreviewRating(null)} onFocus={() => setPreviewRating(rating)} onBlur={() => setPreviewRating(null)} aria-label={`Rate ${rating} out of 5`} aria-pressed={rating === form.rating}>
                <span aria-hidden="true">★</span>
              </button>))}
            <span className="rating-summary" aria-live="polite">{activeRating} out of 5</span>
          </div>

          <button className="submit-review" type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit feedback"}
          </button>
        </form>

        {status.type !== "idle" && (<p className={`form-status ${status.type}`} role="status" aria-live="polite">
            {status.message}
          </p>)}
      </div>

      <div className="feedback-list" aria-label="Recent visitor feedback">
        <h3>Published client feedback</h3>
        {loadingFeedback ? (<p className="empty-state" role="status">Loading client feedback…</p>) : loadError && feedback.length === 0 ? (<p className="empty-state" role="status">{loadError}</p>) : feedback.length === 0 ? (<p className="empty-state">No approved reviews yet. Be the first to share your experience.</p>) : (feedback.slice(0, 4).map((item) => (<article key={`${item.name}-${item.createdAt ?? item.role}`} className="mini-review">
              <div className="mini-review-header">
                <strong>{item.name}</strong>
                <span>{item.service ?? "Security services"}</span>
              </div>
              <div className="review-stars" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: item.rating }, (_, index) => (<span key={`${item.name}-star-${index}`} aria-hidden="true">★</span>))}
              </div>
              <p>“{item.quote}”</p>
            </article>)))}
      </div>
    </section>);
}
