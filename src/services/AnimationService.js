import gsap from "gsap";
import { hoverDistort, logoMaskReveal, magneticButton, textReveal, textRevealGroup } from "@/lib/motion/variants";
export class AnimationService {
    textReveal = textReveal;
    textRevealGroup = textRevealGroup;
    logoMaskReveal = logoMaskReveal;
    hoverDistort = hoverDistort;
    moveMagneticButton(element, event, strength = 1) {
        const bounds = element.getBoundingClientRect();
        const x = event.clientX - (bounds.left + bounds.width / 2);
        const y = event.clientY - (bounds.top + bounds.height / 2);
        const distance = Math.hypot(x, y);
        const limit = magneticButton.radius;
        const scale = distance > limit ? limit / distance : 1;
        element.style.transform = `translate(${x * scale * magneticButton.strength * strength}px, ${y * scale * magneticButton.strength * strength}px)`;
    }
    resetMagneticButton(element) {
        element.style.transform = "translate(0, 0)";
    }
}
