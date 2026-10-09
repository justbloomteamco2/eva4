"use client";
import { createContext, useContext, useMemo } from "react";
import { AnimationService } from "@/services/AnimationService";
import { ContentService } from "@/services/ContentService";
const SiteServicesContext = createContext(null);
export function SiteServicesProvider({ children }) {
    const services = useMemo(() => ({ content: new ContentService(), animation: new AnimationService() }), []);
    return <SiteServicesContext.Provider value={services}>{children}</SiteServicesContext.Provider>;
}
export function useSiteServices() {
    const services = useContext(SiteServicesContext);
    if (services === null) {
        throw new Error("useSiteServices must be used inside SiteServicesProvider.");
    }
    return services;
}
