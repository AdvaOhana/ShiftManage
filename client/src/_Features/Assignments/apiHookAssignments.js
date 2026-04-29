import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetAllAssignments, AddAssignment, UpdateAssignment, DeleteAssignment } from "./apiAssignments.js";

import { useToast } from "../../context/ToastContext.jsx";

function useGetAssignments() {
    return useQuery({
        queryKey: ['assignments'],
        queryFn: GetAllAssignments
    });
}

function useAddAssignment() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    const { mutate: addAssignment } = useMutation({
        mutationFn: AddAssignment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assignments'] });
            showToast("שיבוץ נוסף", "success");
        },
        onError: () => {
            showToast("שגיאה בהוספה", "error");
        }
    });

    return { addAssignment };
}

function useUpdateAssignment() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    const { mutate: updateAssignment } = useMutation({
        mutationFn: UpdateAssignment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assignments'] });
            showToast("שיבוץ עודכן", "success");
        },
        onError: () => {
            showToast("שגיאה בעדכון", "error");
        }
    });

    return { updateAssignment };
}

function useDeleteAssignment() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    const { mutate: deleteAssignment } = useMutation({
        mutationFn: DeleteAssignment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assignments'] });
            showToast("שיבוץ נמחק", "success");
        },
        onError: () => {
            showToast("שגיאה במחיקה", "error");
        }
    });

    return { deleteAssignment };
}

export {
    useGetAssignments,
    useAddAssignment,
    useUpdateAssignment,
    useDeleteAssignment
};