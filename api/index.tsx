import { publicApi, privateApi } from "./axios"
import { endPoints } from "./end_points"

export const login = async (data: any) => {
    const response = await publicApi.post(endPoints.login, data);
    return response.data;
}

// add program
export const addProgram = async (data: any) => {
    const response = await privateApi.post(endPoints.ADDPROGRAM, data);
    return response.data;
}

// get programs
export const getPrograms = async () => {
    const response = await privateApi.get(endPoints.GETPROGRAMS);
    return response.data;
}

// get a program
export const getProgram = async (id: number) => {
    const response = await privateApi.get(`${endPoints.GETPROGRAM}/${id}`);
    return response.data;
}

// update program - FIXED PARAMETER ORDER
export const updateProgram = async (id: number, data: any) => {
    const response = await privateApi.put(`${endPoints.GETPROGRAM}/${id}`, data);
    return response.data;
}

export const deleteProgram = async (id: number) => {
  const response = await privateApi.delete(`${endPoints.DELETEPROGRAM}/${id}`);
  return response.data;
};

// upload file - FIXED
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