import { useQuery } from "@tanstack/react-query";
import { getPrograms, getProgram } from './index'
export const useGetPrograms = () => {
    return useQuery({
        queryFn: getPrograms,
        queryKey: ["programs"],
    });
};

// api/query.ts - Fix useGetProgram
export const useGetProgram = (id: number) => {
    return useQuery({
        queryFn: () => getProgram(id), // Fixed: pass id to getProgram
        queryKey: ["program", id],
        enabled: !!id, // Only run if id exists
    });
};
