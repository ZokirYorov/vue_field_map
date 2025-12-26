import { defineStore } from "pinia";
import {ref} from "vue";
import {IUser, MissedPrayer, Prayer} from "@/ModelType/modelType";
import axiosInstance from "@/axios";

interface IUserState {
    user: IUser | null;
    token: string | null;
    role: string[];
    missed: MissedPrayer[] | null;
    prayer: Prayer | null;
}



export const authStore = defineStore("authStore", () => {

    const state = ref<IUserState>({
        user: null,
        token: localStorage.getItem("token"),
        role: [],
        missed: [],
        prayer: null,
    });

    const setUser = (user: IUser | null) => {
        state.value.user = user;
        try {
            if (user?.role){
                state.value.role = Array.isArray(user.role)
                ? user.role.map(r => typeof r === 'string' ? r : r.name)
                    : [user.role];
            } else {
                state.value.role = [];
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const setToken = (token: string) => {
        state.value.token = token;
        localStorage.setItem("token", token);
    }

    const getUser = async (id: number) => {
        if (!state.value.token) return;

        try {

            const { data } = await axiosInstance.get(`/api/users/${id}`);

            setUser(data);
            setToken(data.token);
        }
        catch (error) {
            console.log(error);
        }
    }

    const getMissed = async () => {
        try {
            const userId = 1
            const response = await axiosInstance.get(`/api/qaza/get-all`,
                {
                    params: {
                        userId,
                    }
                }
                );
            state.value.missed = response.data
        }
        catch (error) {
            console.error(error);
        }
    }

    return {
        state,
        getMissed,
        getUser,
        setToken,
        setUser,
    }

})