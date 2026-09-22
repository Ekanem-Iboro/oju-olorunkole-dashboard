import {
    addProgram, deleteProgram, login, register, updateProgram, uploadFile, deleteUpload,
    addMember, deleteMember, updateMember,
    addTestimonial, deleteTestimonial, updateTestimonial, approveTestimonial, rejectTestimonial, toggleFeaturedTestimonial,
    addDonation, deleteDonation, updateDonation, updateDonationStatus,
    addHeroSlide, deleteHeroSlide, updateHeroSlide,
    addBanner, deleteBanner, updateBanner,
    addNews, deleteNews, updateNews,
    addEvent, deleteEvent, updateEvent, toggleEventStatus,
    addUser, updateUser,
    deleteContact, markContactRead,
    deleteAccommodation, updateAccommodation, updateAccommodationStatus,
    changePassword,
} from ".";
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Auth
export const useLogin = () => {
    return useMutation({
        mutationFn: (credentials: { email: string; password: string }) =>
            login(credentials),
        onSuccess: (data: any) => {
            localStorage.setItem("access_token", data.access_token);
        },
        onError: (error: any) => {
            let resMessage;
            error.response.data.message == "Validation error"
                ? (resMessage =
                    error.response.data.errors?.email[0] ||
                    error.response.data.errors?.password[0])
                : (resMessage = error.response.data.message);
            console.log(error)
        },
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: register,
    });
};

// Users
export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => addUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => updateUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        },
    });
};

// Programs
export const useAddProgram = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => addProgram(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["programs"] });
        },
    });
}

export const useUpdateProgram = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => updateProgram(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["programs"] });
        },
    });
};

export const useDeleteProgram = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProgram,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["programs"] });
        },
        onError: (error) => {
            console.error('Error deleting program:', error);
        },
    });
};

// Members
export const useAddMember = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => addMember(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["members"] });
        },
    });
}

export const useUpdateMember = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => updateMember(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["members"] });
        },
    });
};

export const useDeleteMember = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteMember,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["members"] });
        },
    });
};

// Testimonials
export const useAddTestimonial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => addTestimonial(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
        },
    });
}

export const useUpdateTestimonial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => updateTestimonial(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
        },
    });
};

export const useDeleteTestimonial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTestimonial,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
        },
    });
};

export const useApproveTestimonial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: approveTestimonial,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
            queryClient.invalidateQueries({ queryKey: ["pendingTestimonials"] });
        },
    });
};

export const useRejectTestimonial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: rejectTestimonial,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
            queryClient.invalidateQueries({ queryKey: ["pendingTestimonials"] });
        },
    });
};

export const useToggleFeaturedTestimonial = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: toggleFeaturedTestimonial,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
        },
    });
};

// Donations
export const useAddDonation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => addDonation(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["donations"] });
        },
    });
}

export const useUpdateDonation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => updateDonation(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["donations"] });
        },
    });
};

export const useUpdateDonationStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, status }: { id: number; status: string }) => updateDonationStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["donations"] });
        },
    });
};

export const useDeleteDonation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteDonation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["donations"] });
        },
    });
};

// Hero Slides
export const useAddHeroSlide = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => addHeroSlide(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["heroSlides"] });
        },
    });
}

export const useUpdateHeroSlide = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => updateHeroSlide(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["heroSlides"] });
        },
    });
};

export const useDeleteHeroSlide = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteHeroSlide,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["heroSlides"] });
        },
    });
};

// Banners
export const useAddBanner = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => addBanner(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["banners"] });
        },
    });
}

export const useUpdateBanner = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => updateBanner(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["banners"] });
        },
    });
};

export const useDeleteBanner = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteBanner,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["banners"] });
        },
    });
};

// News
export const useAddNews = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => addNews(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["news"] });
        },
    });
}

export const useUpdateNews = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => updateNews(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["news"] });
        },
    });
};

export const useDeleteNews = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteNews,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["news"] });
        },
    });
};

// Events
export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => addEvent(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });
}

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => updateEvent(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });
};

export const useToggleEventStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: toggleEventStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });
};

// Upload
export const useUploadImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => uploadFile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["programs"] });
            queryClient.invalidateQueries({ queryKey: ["events"] });
            queryClient.invalidateQueries({ queryKey: ["heroSlides"] });
            queryClient.invalidateQueries({ queryKey: ["banners"] });
            queryClient.invalidateQueries({ queryKey: ["news"] });
        },
    });
}

export const useDeleteUpload = () => {
    return useMutation({
        mutationFn: deleteUpload,
    });
}

// Contacts
export const useMarkContactRead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: markContactRead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
        },
    });
};

export const useDeleteContact = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
        },
    });
};

// Accommodations
export const useUpdateAccommodation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => updateAccommodation(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["accommodations"] });
        },
    });
};

export const useUpdateAccommodationStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, status }: { id: number; status: string }) => updateAccommodationStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["accommodations"] });
        },
    });
};

export const useDeleteAccommodation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAccommodation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["accommodations"] });
        },
    });
};

// Auth - Change Password
export const useChangePassword = () => {
    return useMutation({
        mutationFn: changePassword,
    });
};
