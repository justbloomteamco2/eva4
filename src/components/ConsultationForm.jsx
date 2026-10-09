"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
const initialForm = {
    name: "",
    email: "",
    phone: "",
    serviceType: "Security services",
};
export function ConsultationForm() {
    const reduceMotion = useReducedMotion();
    const [form, setForm] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState(null);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setStatus(null);
        try {
            const response = await fetch("/api/consultations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            let result;
            try {
                result = await response.json();
            } catch {
                throw new Error("We couldn't submit your request. Please try again.");
            }
            if (!response.ok)
                throw new Error(result.error ?? "Unable to send your request.");
            setForm(initialForm);
            setStatus({ type: "success", message: result.message ?? "Your request has been sent." });
        }
        catch (error) {
            setStatus({
                type: "error",
                message: error instanceof Error ? error.message : "Unable to send your request. Please try again.",
            });
        }
        finally {
            setSubmitting(false);
        }
    };
    return (<motion.div
      id="consultation"
      className="consultation-wrap"
      initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="consultation-form-heading">
        <p className="consultation-form-kicker">Secure, no-obligation enquiry</p>
        <h2>Request a free consultation</h2>
        <p className="consultation-form-intro">Tell us how to reach you and what your site needs. Our team will follow up directly.</p>
      </div>
      <form className="consultation-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input autoComplete="name" maxLength={120} name="name" onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Your full name" required value={form.name}/>
        </label>
        <label>
          Email
          <input autoComplete="email" maxLength={254} name="email" onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder="you@example.com" required type="email" value={form.email}/>
        </label>
        <label>
          Phone
          <input autoComplete="tel" maxLength={24} name="phone" onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} placeholder="+91 00000 00000" required type="tel" value={form.phone}/>
        </label>
        <label>
          Service needed
          <select name="serviceType" onChange={(event) => setForm((current) => ({ ...current, serviceType: event.target.value }))} value={form.serviceType}>
            <option>Security services</option>
            <option>Housekeeping</option>
            <option>Gardening</option>
            <option>Labour &amp; manpower</option>
          </select>
        </label>
        <button className="submit-review consultation-submit" disabled={submitting} type="submit" aria-busy={submitting}>
          {submitting ? "Sending..." : <>Send request <span aria-hidden="true">↗</span></>}
        </button>
      </form>
      {status && <p id="consultation-status" className={`form-status ${status.type}`} role="status" aria-live="polite">{status.message}</p>}
    </motion.div>);
}
