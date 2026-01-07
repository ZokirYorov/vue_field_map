import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { authStore } from "@/stores/authStore";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Main',
        redirect: '/home',
        component: () => import('@/Layouts/Layout.vue'),
        meta: {
            requiresAuth: false,
        },
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('@/views/HomeView.vue'),
                meta: {
                    icon: 'fa-solid fa-house',
                    requiresAuth: false,
                }
            },
            {
                path: 'missed',
                name: 'Missed',
                component: () => import('@/views/MissedPrayer.vue'),
                meta: {
                    icon: 'fa-solid fa-diagram-project',
                    requiresAuth: false,
                }
            },
            {
                path: 'booking/:id',
                name: 'Booking',
                component: () => import('@/views/BookingView.vue'),
                props: true,
                meta: {
                    icon: 'fa-solid fa-house',
                    requiresAuth: false,
                }
            },
            {
                path: 'goal',
                name: 'Goal',
                component: () => import('@/views/GoalView.vue'),
                meta: {
                    icon: 'fa-solid fa-flag-checkered',
                    requiresAuth: false,
                }
            },
            {
                path: 'reminder',
                name: 'Reminder',
                component: () => import('@/views/ReminderView.vue'),
                meta: {
                    icon: 'fa-regular fa-bell',
                    requiresAuth: false,
                }
            },
            {
                path: 'profile',
                name: 'Profile',
                component: () => import('@/views/UserProfileView.vue'),
                meta: {
                    icon: 'fa-regular fa-user',
                    requiresAuth: false,
                }
            },
        ]
    },
    {
        path: '/users',
        name: 'Users',
        component: () => import('@/views/UsersView.vue'),
        props: true ,
        meta: {
            requiresAuth: false,
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/LoginView.vue'),
        meta: {
            guestOnly: true,
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/RegisterView.vue'),
        meta: {
            guestOnly: true,
        }
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

router.beforeEach((to, _, next) => {
    const token = localStorage.getItem('accessToken');
    const isGuest = localStorage.getItem('isGuest');
    const store = authStore();

    if(!isGuest && !token && to.name !== 'Login' && to.name !== 'Register') {
        try {
            store.initGuestSession().then(r => r);
        }
        catch (error) {
            console.error(error);
        }
    }

    if (to.meta.guestOnly && token && !isGuest) {
        return next('/home')
    }

    if (to.meta.requiresAuth && (!token || isGuest) ) {
        return next('/login');
    }

    next();
})


export default router;