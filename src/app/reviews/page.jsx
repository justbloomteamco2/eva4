import { ContactFooter } from "@/components/ContactFooter";
import { ClientFeedbackForm } from "@/components/ClientFeedbackForm";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "Client feedback | Spartan Security Solutions",
  description:
    "Read client feedback and share your experience with Spartan Security Solutions.",
};

export default function ReviewsPage() {
  return (
    <>
      <SiteHeader />
      <main className="section-page reviews-page">
        <div className="section-page-intro">
          <a className="section-page-back" href="/">
            <span aria-hidden="true">←</span> Main page
          </a>
          <p className="eyebrow"><span /> Client feedback</p>
          <h1>Experiences built<br /><em>on trust.</em></h1>
          <p>Hear from clients and share your experience with the Spartan team.</p>
        </div>
        <ClientFeedbackForm />
      </main>
      <ContactFooter />
    </>
  );
}
