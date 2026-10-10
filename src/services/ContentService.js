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
    commitment:
      "We take time to understand each site's routines, prepare our people for their responsibilities, and stay attentive throughout every shift.",
    highlights: ["On-site security personnel", "Staffing shaped around your site", "Direct access to our team"],
    image: "/assets/services/security/security.jpeg",
    imageAlt: "Spartan security guards standing in formation at a client site",
    imagePosition: "center",
    gallery: [
      {
        src: "/assets/services/security/security.jpeg",
        alt: "Spartan security guards standing in formation at a client site",
        caption: "A prepared security team",
      },
      {
        src: "/assets/services/security/team-patrol-site.jpg",
        alt: "Spartan security team gathered at a client site",
        caption: "On-site security presence",
      },
    ],
  },
  {
    id: "housekeeping",
    number: "02",
    title: "Housekeeping",
    description: "Dependable teams. Thoughtful attention to every detail.",
    detail:
      "Housekeeping support for workplaces and shared spaces, with dependable teams focused on the details people notice every day.",
    commitment:
      "We care for the spaces people rely on with steady, thoughtful work—paying attention to everyday details and the needs of each site.",
    highlights: ["Workplace and shared-space upkeep", "Consistent on-site teams", "Service aligned to your requirements"],
    image: "/assets/services/housekeeping/housekeeping-team.jpeg",
    imageAlt: "A cleaner mopping an industrial utility room",
    imagePosition: "70% center",
    gallery: [
      {
        src: "/assets/services/housekeeping/housekeeping-team.jpeg",
        alt: "A cleaner mopping an industrial utility room",
        caption: "Consistent workplace upkeep",
      },
      {
        src: "/assets/services/housekeeping/housekeeping-cleaning.jpeg",
        alt: "A cleaner operating a floor-cleaning machine",
        caption: "Attention to the details",
      },
    ],
  },
  {
    id: "gardening",
    number: "03",
    title: "Gardening",
    description: "Consistent care for the places people live and work.",
    detail:
      "Gardening and grounds support that helps keep the outdoor spaces around your property cared for and welcoming.",
    commitment:
      "We give outdoor spaces consistent hands-on care, from tending plants to maintaining the grounds that welcome people to your site.",
    highlights: ["Regular grounds care", "Support for residential and commercial sites", "Schedules aligned to your property"],
    image: "/assets/services/gardening/gardening-1.jpeg",
    imageAlt: "A gardener tending a landscaped flower bed",
    imagePosition: "center",
    gallery: [
      {
        src: "/assets/services/gardening/gardening-1.jpeg",
        alt: "A groundskeeper tending a planted garden bed",
        caption: "Hands-on garden care",
      },
      {
        src: "/assets/services/gardening/gardening-2.jpeg",
        alt: "A groundskeeper trimming flowering shrubs",
        caption: "Careful attention to planting",
      },
      {
        src: "/assets/services/gardening/gardening-3.jpeg",
        alt: "A groundskeeper watering a landscaped lawn",
        caption: "Maintaining outdoor grounds",
      },
    ],
  },
  {
    id: "manpower",
    number: "04",
    title: "Labour & manpower",
    description: "Skilled, reliable people—ready to support your operation.",
    detail:
      "Dependable labour and manpower support to help businesses meet the practical demands of day-to-day operations.",
    commitment:
      "We listen to the work your operation needs done and focus on providing dependable people who can support its day-to-day demands.",
    highlights: ["Manpower support for operational needs", "Staffing shaped to your requirements", "A direct conversation with our team"],
    image: "/assets/services/manpower/manpower-1.jpeg",
    imageAlt: "A team member picking items in a warehouse",
    imagePosition: "55% center",
    gallery: [
      {
        src: "/assets/services/manpower/manpower-1.jpeg",
        alt: "A team member picking items in a warehouse",
        caption: "Support for warehouse operations",
      },
      {
        src: "/assets/services/manpower/manpower-2.jpeg",
        alt: "Team members sorting and packing items in a workplace",
        caption: "Reliable day-to-day manpower",
      },
    ],
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
