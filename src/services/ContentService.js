import { brandTokens } from "@/lib/brand/tokens";
const navigation = [
  { label: "Services", href: "/services" },
  { label: "Our approach", href: "/about#approach" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];
const services = [
  {
    id: "security",
    number: "01",
    title: "Security services",
    description: "Professional protection, delivered with vigilance and care.",
    detail:
      "A disciplined on-site presence for businesses and communities, shaped around your property's security needs.",
    highlights: ["On-site security personnel", "Staffing shaped around your site", "Direct access to our team"],
    image: "/assets/services/team-patrol-site.jpg",
    imageAlt: "Spartan security team gathered at a client site",
    imagePosition: "center",
  },
  {
    id: "housekeeping",
    number: "02",
    title: "Housekeeping",
    description: "Dependable teams. Thoughtful attention to every detail.",
    detail:
      "Housekeeping support for workplaces and shared spaces, with dependable teams focused on the details people notice every day.",
    highlights: ["Workplace and shared-space upkeep", "Consistent on-site teams", "Service aligned to your requirements"],
    image: "/assets/services/housekeeping.webp",
    imageAlt: "A woman sweeping an outdoor stone courtyard",
    imagePosition: "70% center",
  },
  {
    id: "gardening",
    number: "03",
    title: "Gardening",
    description: "Consistent care for the places people live and work.",
    detail:
      "Gardening and grounds support that helps keep the outdoor spaces around your property cared for and welcoming.",
    highlights: ["Regular grounds care", "Support for residential and commercial sites", "Schedules aligned to your property"],
    image: "/assets/services/garden.webp",
    imageAlt: "A lush planted wall at Terminal 2 of Bengaluru airport",
    imagePosition: "center",
  },
  {
    id: "manpower",
    number: "04",
    title: "Labour & manpower",
    description: "Skilled, reliable people—ready to support your operation.",
    detail:
      "Dependable labour and manpower support to help businesses meet the practical demands of day-to-day operations.",
    highlights: ["Manpower support for operational needs", "Staffing shaped to your requirements", "A direct conversation with our team"],
    image: "/assets/services/workforce.webp",
    imageAlt: "Workers carrying metal poles through a Mumbai shop entrance",
    imagePosition: "55% center",
  },
];
const contact = {
  address:
    "Sadashivnagar, 1st Main, 1st Cross, Nelamangala, Bengaluru – 562 123",
  phone: ["+91 90352 14907"],
  email: ["spartanarmsus@gmail.com"],
};
export class ContentService {
  getBrand() {
    return brandTokens;
  }
  getNavigation() {
    return navigation;
  }
  getServices() {
    return services;
  }
  getContact() {
    return contact;
  }
}
