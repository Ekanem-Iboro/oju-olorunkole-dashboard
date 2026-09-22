import { useQuery } from "@tanstack/react-query";
import {
    getPrograms, getProgram,
    getMembers, getMember,
    getTestimonials, getTestimonial, getPendingTestimonials,
    getDonations, getDonation, getDonationStats,
    getHeroSlides, getHeroSlide,
    getBanners, getBanner,
    getNews, getNewsItem,
    getEvents, getEvent, getUpcomingEvents,
    getUsers, getUser, getUserProfile,
    getContacts, getContact,
    getAccommodations, getAccommodation,
    getDashboardOverview,
} from './index'

// Users
export const useGetUsers = () => {
    return useQuery({
        queryFn: getUsers,
        queryKey: ["users"],
    });
};

export const useGetUser = (id: number) => {
    return useQuery({
        queryFn: () => getUser(id),
        queryKey: ["user", id],
        enabled: !!id,
    });
};

export const useGetUserProfile = () => {
    return useQuery({
        queryFn: getUserProfile,
        queryKey: ["userProfile"],
    });
};

// Programs
export const useGetPrograms = () => {
    return useQuery({
        queryFn: getPrograms,
        queryKey: ["programs"],
    });
};

export const useGetProgram = (id: number) => {
    return useQuery({
        queryFn: () => getProgram(id),
        queryKey: ["program", id],
        enabled: !!id,
    });
};

// Members
export const useGetMembers = () => {
    return useQuery({
        queryFn: getMembers,
        queryKey: ["members"],
    });
};

export const useGetMember = (id: number) => {
    return useQuery({
        queryFn: () => getMember(id),
        queryKey: ["member", id],
        enabled: !!id,
    });
};

// Testimonials
export const useGetTestimonials = () => {
    return useQuery({
        queryFn: getTestimonials,
        queryKey: ["testimonials"],
    });
};

export const useGetTestimonial = (id: number) => {
    return useQuery({
        queryFn: () => getTestimonial(id),
        queryKey: ["testimonial", id],
        enabled: !!id,
    });
};

export const useGetPendingTestimonials = () => {
    return useQuery({
        queryFn: getPendingTestimonials,
        queryKey: ["pendingTestimonials"],
    });
};

// Donations
export const useGetDonations = () => {
    return useQuery({
        queryFn: getDonations,
        queryKey: ["donations"],
    });
};

export const useGetDonation = (id: number) => {
    return useQuery({
        queryFn: () => getDonation(id),
        queryKey: ["donation", id],
        enabled: !!id,
    });
};

export const useGetDonationStats = () => {
    return useQuery({
        queryFn: getDonationStats,
        queryKey: ["donationStats"],
    });
};

// Hero Slides
export const useGetHeroSlides = () => {
    return useQuery({
        queryFn: getHeroSlides,
        queryKey: ["heroSlides"],
    });
};

export const useGetHeroSlide = (id: number) => {
    return useQuery({
        queryFn: () => getHeroSlide(id),
        queryKey: ["heroSlide", id],
        enabled: !!id,
    });
};

// Banners
export const useGetBanners = () => {
    return useQuery({
        queryFn: getBanners,
        queryKey: ["banners"],
    });
};

export const useGetBanner = (id: number) => {
    return useQuery({
        queryFn: () => getBanner(id),
        queryKey: ["banner", id],
        enabled: !!id,
    });
};

// News
export const useGetNews = () => {
    return useQuery({
        queryFn: getNews,
        queryKey: ["news"],
    });
};

export const useGetNewsItem = (id: number) => {
    return useQuery({
        queryFn: () => getNewsItem(id),
        queryKey: ["newsItem", id],
        enabled: !!id,
    });
};

// Events
export const useGetEvents = () => {
    return useQuery({
        queryFn: getEvents,
        queryKey: ["events"],
    });
};

export const useGetEvent = (id: number) => {
    return useQuery({
        queryFn: () => getEvent(id),
        queryKey: ["event", id],
        enabled: !!id,
    });
};

export const useGetUpcomingEvents = () => {
    return useQuery({
        queryFn: getUpcomingEvents,
        queryKey: ["upcomingEvents"],
    });
};

// Contacts
export const useGetContacts = () => {
    return useQuery({
        queryFn: getContacts,
        queryKey: ["contacts"],
    });
};

export const useGetContact = (id: number) => {
    return useQuery({
        queryFn: () => getContact(id),
        queryKey: ["contact", id],
        enabled: !!id,
    });
};

// Accommodations
export const useGetAccommodations = () => {
    return useQuery({
        queryFn: getAccommodations,
        queryKey: ["accommodations"],
    });
};

export const useGetAccommodation = (id: number) => {
    return useQuery({
        queryFn: () => getAccommodation(id),
        queryKey: ["accommodation", id],
        enabled: !!id,
    });
};

// Dashboard
export const useGetDashboardOverview = () => {
    return useQuery({
        queryFn: getDashboardOverview,
        queryKey: ["dashboardOverview"],
    });
};
