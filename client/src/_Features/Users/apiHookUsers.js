import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GetAllUsers, AddUsers, UpdateUsers, DeleteUsers } from "./apiUsers.js";

import { useToast } from "../../context/ToastContext.jsx";
function useGetUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: GetAllUsers
    });
}

function useAddUsers() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();
    const { mutate: addUser } = useMutation({
        mutationFn: AddUsers,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            showToast("משתמש נוסף", "success");
        },
        onError: () => {
            showToast("שגיאה בהוספה", "error");
        }
    });
    return { addUser };
}

function useUpdateUsers() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();
    const { mutate: updateUser } = useMutation({
        mutationFn: UpdateUsers,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            showToast("משתמש עודכן", "success");
        },
        onError: () => {
            showToast("שגיאה בעדכון", "error");
        }
    });
    return { updateUser };
}

function useDeleteUsers() {
    const queryClient = useQueryClient();
    const { showToast } = useToast();
    const { mutate: deleteUser } = useMutation({
        mutationFn: DeleteUsers,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            showToast("משתמש נמחק", "success");
        },
        onError: () => {
            showToast("שגיאה במחיקה", "error");
        }
    });
    return { deleteUser };
}

export {
    useGetUsers,
    useAddUsers,
    useUpdateUsers,
    useDeleteUsers
};