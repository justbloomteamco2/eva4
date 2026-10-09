import { brandTokens } from "@/lib/brand/tokens";
const navigation = [
  { label: "Services", href: "/#services" },
  { label: "Our approach", href: "/#approach" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
];
const services = [
  {
    id: "security",
    number: "01",
    title: "Security services",
    description: "Professional protection, delivered with vigilance and care.",
    image: "/assets/services/security-team.jpg",
    imageAlt: "Uniformed security officer on duty holding a tablet",
    imagePosition: "50% 45%",
  },
  {
    id: "housekeeping",
    number: "02",
    title: "Housekeeping",
    description: "Dependable teams. Thoughtful attention to every detail.",
    image: "/assets/services/housekeeping.jpg",
    imageAlt: "A woman sweeping an outdoor stone courtyard",
    imagePosition: "70% center",
  },
  {
    id: "gardening",
    number: "03",
    title: "Gardening",
    description: "Consistent care for the places people live and work.",
    image: "/assets/services/garden.jpg",
    imageAlt: "A lush planted wall at Terminal 2 of Bengaluru airport",
    imagePosition: "center",
  },
  {
    id: "manpower",
    number: "04",
    title: "Labour & manpower",
    description: "Skilled, reliable people—ready to support your operation.",
    image: "/assets/services/workforce.jpg",
    imageAlt: "Workers carrying metal poles through a Mumbai shop entrance",
    imagePosition: "55% center",
  },
];
const contact = {
  address:
    "Sadashivnagar, 1st Main, 1st Cross, Nelamangala, Bengaluru – 562 123",
  phone: ["+91 90352 14905"],
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
