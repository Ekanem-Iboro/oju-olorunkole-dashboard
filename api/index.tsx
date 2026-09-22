import { publicApi, privateApi } from "./axios"
import { endPoints } from "./end_points"

// Auth
export const login = async (data: any) => {
    const response = await publicApi.post(endPoints.login, data);
    return response.data;
}

export const register = async (data: any) => {
    const response = await publicApi.post(endPoints.register, data);
    return response.data;
}

export const changePassword = async (data: { current_password: string; new_password: string }) => {
    const response = await privateApi.put(endPoints.CHANGEPASSWORD, data);
    return response.data;
}

// Dashboard
export const getDashboardOverview = async () => {
    const response = await privateApi.get(endPoints.DASHBOARDOVERVIEW);
    return response.data;
}

// Users
export const getUsers = async () => {
    const response = await privateApi.get(endPoints.GETUSERS);
    return response.data;
}

export const getUser = async (id: number) => {
    const response = await privateApi.get(`${endPoints.GETUSER}/${id}`);
    return response.data;
}

export const addUser = async (data: any) => {
    const response = await privateApi.post(endPoints.ADDUSER, data);
    return response.data;
}

export const updateUser = async (id: number, data: any) => {
    const response = await privateApi.put(`${endPoints.UPDATEUSER}/${id}`, data);
    return response.data;
}

export const getUserProfile = async () => {
    const response = await privateApi.get(endPoints.GETUSERPROFILE);
    return response.data;
}

// Programs
export const addProgram = async (data: any) => {
    const response = await privateApi.post(endPoints.ADDPROGRAM, data);
    return response.data;
}

export const getPrograms = async () => {
    const response = await privateApi.get(endPoints.GETPROGRAMS);
    return response.data;
}

export const getProgram = async (id: number) => {
    const response = await privateApi.get(`${endPoints.GETPROGRAM}/${id}`);
    return response.data;
}

export const updateProgram = async (id: number, data: any) => {
    const response = await privateApi.put(`${endPoints.UPDATEPROGRAM}/${id}`, data);
    return response.data;
}

export const deleteProgram = async (id: number) => {
    const response = await privateApi.delete(`${endPoints.DELETEPROGRAM}/${id}`);
    return response.data;
}

// Members
export const getMembers = async () => {
    const response = await privateApi.get(endPoints.GETMEMBERS);
    return response.data;
}

export const getMember = async (id: number) => {
    const response = await privateApi.get(`${endPoints.GETMEMBER}/${id}`);
    return response.data;
}

export const addMember = async (data: any) => {
    const response = await privateApi.post(endPoints.ADDMEMBER, data);
    return response.data;
}

export const updateMember = async (id: number, data: any) => {
    const response = await privateApi.put(`${endPoints.UPDATEMEMBER}/${id}`, data);
    return response.data;
}

export const deleteMember = async (id: number) => {
    const response = await privateApi.delete(`${endPoints.DELETEMEMBER}/${id}`);
    return response.data;
}

// Testimonials
export const getTestimonials = async () => {
    const response = await privateApi.get(endPoints.GETTESTIMONIALS);
    return response.data;
}

export const getTestimonial = async (id: number) => {
    const response = await privateApi.get(`${endPoints.GETTESTIMONIAL}/${id}`);
    return response.data;
}

export const addTestimonial = async (data: any) => {
    const response = await publicApi.post(endPoints.ADDTESTIMONIAL, data);
    return response.data;
}

export const updateTestimonial = async (id: number, data: any) => {
    const response = await privateApi.put(`${endPoints.UPDATTESTIMONIAL}/${id}`, data);
    return response.data;
}

export const deleteTestimonial = async (id: number) => {
    const response = await privateApi.delete(`${endPoints.DELETETESTIMONIAL}/${id}`);
    return response.data;
}

export const getPendingTestimonials = async () => {
    const response = await privateApi.get(endPoints.PENDINGTESTIMONIALS);
    return response.data;
}

export const approveTestimonial = async (id: number) => {
    const response = await privateApi.put(`${endPoints.GETTESTIMONIAL}/${id}/approve`);
    return response.data;
}

export const rejectTestimonial = async (id: number) => {
    const response = await privateApi.put(`${endPoints.GETTESTIMONIAL}/${id}/reject`);
    return response.data;
}

export const toggleFeaturedTestimonial = async (id: number) => {
    const response = await privateApi.put(`${endPoints.GETTESTIMONIAL}/${id}/feature`);
    return response.data;
}

// Donations
export const getDonations = async () => {
    const response = await privateApi.get(endPoints.GETDONATIONS);
    return response.data;
}

export const getDonation = async (id: number) => {
    const response = await privateApi.get(`${endPoints.GETDONATION}/${id}`);
    return response.data;
}

export const addDonation = async (data: any) => {
    const response = await publicApi.post(endPoints.ADDDONATION, data);
    return response.data;
}

export const updateDonation = async (id: number, data: any) => {
    const response = await privateApi.put(`${endPoints.UPDATEDONATION}/${id}`, data);
    return response.data;
}

export const updateDonationStatus = async (id: number, status: string) => {
    const response = await privateApi.put(`${endPoints.UPDATEDONATIONSTATUS}/${id}/status`, { payment_status: status });
    return response.data;
}

export const deleteDonation = async (id: number) => {
    const response = await privateApi.delete(`${endPoints.DELETEDONATION}/${id}`);
    return response.data;
}

export const getDonationStats = async () => {
    const response = await privateApi.get(endPoints.DONATIONSTATS);
    return response.data;
}

// Hero Slides
export const getHeroSlides = async () => {
    const response = await privateApi.get(endPoints.GETHEROSLIDES);
    return response.data;
}

export const getHeroSlide = async (id: number) => {
    const response = await privateApi.get(`${endPoints.GETHEROSLIDES}/${id}`);
    return response.data;
}

export const addHeroSlide = async (data: any) => {
    const response = await privateApi.post(endPoints.ADDHEROSLIDE, data);
    return response.data;
}

export const updateHeroSlide = async (id: number, data: any) => {
    const response = await privateApi.put(`${endPoints.UPDATEHEROSLIDE}/${id}`, data);
    return response.data;
}

export const deleteHeroSlide = async (id: number) => {
    const response = await privateApi.delete(`${endPoints.DELETEHEROSLIDE}/${id}`);
    return response.data;
}

// Banners
export const getBanners = async () => {
    const response = await privateApi.get(endPoints.GETBANNERS);
    return response.data;
}

export const getBanner = async (id: number) => {
    const response = await privateApi.get(`${endPoints.GETBANNER}/${id}`);
    return response.data;
}

export const addBanner = async (data: any) => {
    const response = await privateApi.post(endPoints.ADDBANNER, data);
    return response.data;
}

export const updateBanner = async (id: number, data: any) => {
    const response = await privateApi.put(`${endPoints.UPDATEBANNER}/${id}`, data);
    return response.data;
}

export const deleteBanner = async (id: number) => {
    const response = await privateApi.delete(`${endPoints.DELETEBANNER}/${id}`);
    return response.data;
}

// News
export const getNews = async () => {
    const response = await privateApi.get(endPoints.GETNEWS);
    return response.data;
}

export const getNewsItem = async (id: number) => {
    const response = await privateApi.get(`${endPoints.GETNEW}/${id}`);
    return response.data;
}

export const addNews = async (data: any) => {
    const response = await privateApi.post(endPoints.ADDNEWS, data);
    return response.data;
}

export const updateNews = async (id: number, data: any) => {
    const response = await privateApi.put(`${endPoints.UPDATENEWS}/${id}`, data);
    return response.data;
}

export const deleteNews = async (id: number) => {
    const response = await privateApi.delete(`${endPoints.DELETENEWS}/${id}`);
    return response.data;
}

// Events
export const getEvents = async () => {
    const response = await privateApi.get(endPoints.GETEVENTS);
    return response.data;
}

export const getEvent = async (id: number) => {
    const response = await privateApi.get(`${endPoints.GETEVENT}/${id}`);
    return response.data;
}

export const addEvent = async (data: any) => {
    const response = await privateApi.post(endPoints.ADDEVENT, data);
    return response.data;
}

export const updateEvent = async (id: number, data: any) => {
    const response = await privateApi.put(`${endPoints.UPDATEEVENT}/${id}`, data);
    return response.data;
}

export const deleteEvent = async (id: number) => {
    const response = await privateApi.delete(`${endPoints.DELETEEVENT}/${id}`);
    return response.data;
}

export const toggleEventStatus = async (id: number) => {
    const response = await privateApi.put(`${endPoints.TOGGLEEVENTSTATUS}/${id}/toggle-status`);
    return response.data;
}

export const getUpcomingEvents = async () => {
    const response = await privateApi.get(endPoints.UPCOMINGEVENTS);
    return response.data;
}

// Contacts
export const getContacts = async () => {
    const response = await privateApi.get(endPoints.GETCONTACTS);
    return response.data;
}

export const getContact = async (id: number) => {
    const response = await privateApi.get(`${endPoints.GETCONTACT}/${id}`);
    return response.data;
}

export const addContact = async (data: any) => {
    const response = await publicApi.post(endPoints.ADDCONTACT, data);
    return response.data;
}

export const markContactRead = async (id: number) => {
    const response = await privateApi.put(`${endPoints.MARKCONTACTREAD}/${id}/read`);
    return response.data;
}

export const deleteContact = async (id: number) => {
    const response = await privateApi.delete(`${endPoints.DELETECONTACT}/${id}`);
    return response.data;
}

// Accommodations
export const getAccommodations = async () => {
    const response = await privateApi.get(endPoints.GETACCOMMODATIONS);
    return response.data;
}

export const getAccommodation = async (id: number) => {
    const response = await privateApi.get(`${endPoints.GETACCOMMODATION}/${id}`);
    return response.data;
}

export const addAccommodation = async (data: any) => {
    const response = await publicApi.post(endPoints.ADDACCOMMODATION, data);
    return response.data;
}

export const updateAccommodation = async (id: number, data: any) => {
    const response = await privateApi.put(`${endPoints.UPDATEACCOMMODATION}/${id}`, data);
    return response.data;
}

export const updateAccommodationStatus = async (id: number, status: string) => {
    const response = await privateApi.put(`${endPoints.UPDATEACCOMMODATIONSTATUS}/${id}/status`, { status });
    return response.data;
}

export const deleteAccommodation = async (id: number) => {
    const response = await privateApi.delete(`${endPoints.DELETEACCOMMODATION}/${id}`);
    return response.data;
}

// Upload
export const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await privateApi.post(
        endPoints.UPLOAD,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
    return response.data;
}

export const deleteUpload = async (filename: string) => {
    const response = await privateApi.delete(`${endPoints.DELETEUPLOAD}/${filename}`);
    return response.data;
}
