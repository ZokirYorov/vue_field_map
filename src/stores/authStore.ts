import { defineStore } from "pinia";
import {computed, ref} from "vue";
import {IUser, IUsers, MissedPrayer, MissedType, Prayer} from "@/ModelType/modelType";
import axiosInstance from "@/axios";

interface IUserState {
    user: IUser | null;
    users: IUsers[];
    token: string | null;
    roles: string[];
    missed: MissedPrayer[] | null;
    prayer: Prayer | null;
    isGuest: boolean;
    deviceId: string | null;
}



export const authStore = defineStore("authStore", () => {

    const state = ref<IUserState>({
        user: null,
        users: [],
        token: localStorage.getItem("accessToken"),
        roles: [],
        missed: [],
        prayer: null,
        isGuest: localStorage.getItem('GUEST') === 'true',
        deviceId: localStorage.getItem('deviceId'),
    });

    const isAuthenticated = computed(() => !!state.value.token && !state.value.isGuest);
    const isGuestUser = computed(() => state.value.isGuest);

    const generateDeviceId = (): string => {
        return `device_${Date.now()}_${Math.random().toString(36).substr(2, 9 )}`;
    };

    const setUser = (user: IUser | null) => {
        state.value.user = user;
        try {
            if (user?.roles){
                state.value.roles = Array.isArray(user.roles)
                ? user.roles.map(r => typeof r === 'string' ? r : r.name)
                    : [user.roles];
            } else {
                state.value.roles = [];
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const setToken = (token: string) => {
        state.value.token = token;
        localStorage.setItem("accessToken", token);
    }

    const setGuestStatus = (isGuest: boolean) => {
        state.value.isGuest = isGuest;
        localStorage.setItem("isGuest", isGuest.toString());
    };

    const initGuestSession = async () => {
        try {
            let deviceId = state.value.deviceId;
            if( !deviceId ) {
                deviceId = generateDeviceId();
                state.value.deviceId = deviceId;
                localStorage.setItem("deviceId", deviceId);
            }

            const response = await axiosInstance.post("/api/auth/guest",
                {
                    deviceId: deviceId
                }
                )

            if (response.data.accessToken) {
                setToken(response.data.accessToken);
                setGuestStatus(true);
            }

            return response.data;
        }
        catch (error) {
            console.error(error);
        }
    }

    const login = async (username: string, password: string) => {
        try {
            const response = await axiosInstance.post("/api/auth/login", {
                username,
                password,
            })
            if (response.data.accessToken) {
                setToken(response.data.accessToken);
                setUser(response.data.user);
                setGuestStatus(false);
                localStorage.setItem("ROLE", "USER");
                localStorage.removeItem("deviceId");

                return response.data;
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const register = async (username: string, email: string, password: string) => {
        try {
            let deviceId = state.value.deviceId;
            if( !deviceId ) {
                deviceId = generateDeviceId();
                state.value.deviceId = deviceId;
                localStorage.setItem("deviceId", deviceId);
            }


            const response = await axiosInstance.post("/api/auth/convert-guest", {
               deviceId, username, email, password
            });
            if (response.data.accessToken) {
                setToken(response.data.accessToken);
                setUser(response.data.user);
                setGuestStatus(false);
                localStorage.setItem("ROLE", "USER");

                localStorage.removeItem("deviceId");
                return response.data;
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const logout = async () => {
        state.value.user = null;
        state.value.users = [];
        state.value.token = null;
        state.value.roles = [];
        state.value.missed = [];
        state.value.prayer = null;
        state.value.isGuest = false;
        state.value.deviceId = null;

        localStorage.removeItem("deviceId");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("ROLE");
        localStorage.removeItem("isGuest");

    }

    const getUser = async () => {
        if (!state.value.token) return;

        try {
            const { data } = await axiosInstance.get(`/api/users/me`);

            setUser(data);
        }
        catch (error) {
            console.log(error);
            await logout();
        }
    }

    const getMissed = async (prayerType?: MissedType) => {
        if (!state.value.token) {
            console.log("No token available, skipping missed prayers fetch");
            state.value.missed = [];
            return;
        }
        // Guest user bo'lsa, bo'sh array qaytarish
        if (state.value.isGuest) {
            console.log("Guest user, using local storage for missed prayers");
            state.value.missed = [];
            return;
        }

        try {
            const response = await axiosInstance.get(`/api/qaza/get-all`, {params: { prayerType: prayerType }});
            state.value.missed = response.data
        }
        catch (error: any) {
            console.error(error);
            if (error.response?.status === 401 || error.response?.status === 403) {
                console.log("Unauthorized, clearing missed prayers");
                state.value.missed = [];
            }

            // Agar 500 xato bo'lsa, backend muammosi
            if (error.response?.status === 500) {
                console.error("Backend error when fetching missed prayers");
                state.value.missed = [];
            }
        }
    }

    return {
        state,
        isAuthenticated,
        generateDeviceId,
        isGuestUser,
        initGuestSession,
        login,
        register,
        logout,
        getMissed,
        getUser,
        setToken,
        setUser,
    }

})