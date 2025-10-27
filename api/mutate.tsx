import { addProgram, deleteProgram, login, updateProgram, uploadFile } from ".";
import { useMutation, useQueryClient } from '@tanstack/react-query'



export const useLogin = () => {
    return useMutation({
        mutationFn: (credentials: { email: string; password: string }) =>
            login(credentials),
        onSuccess: (data: any) => {
            localStorage.setItem("access_token", data.access_token);
            //   toast.success(data.message);
        },
        onError: (error: any) => {
            let resMessage;
            error.response.data.message == "Validation error"
                ? (resMessage =
                    error.response.data.errors?.email[0] ||
                    error.response.data.errors?.password[0])
                : (resMessage = error.response.data.message);
            console.log(error)
            //   toast.error(resMessage);
        },
    });
};

// add program mutation
export const useAddProgram = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => addProgram(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["programs"] });
        },
    });
}

// api/mutate.ts - Fix useUpdateProgram
export const useUpdateProgram = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: any }) => updateProgram(id, data), // Fixed parameter order
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["programs"] });
        },
    });
};

// delete program mutation
export const useDeleteProgram = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProgram, // Directly use the API function
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["programs"] });
        },
        onError: (error) => {
            console.error('Error deleting program:', error);
            // You can add toast notification here
        },
    });
};
// upload image mutation
export const useUploadImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: any) => uploadFile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["programs"] });

        },
    });
}