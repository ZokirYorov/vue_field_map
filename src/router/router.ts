import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AllUsersView from "@/views/AllUsersView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Main',
        redirect: '/home',
        component: () => import('@/Layouts/Layout.vue'),
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: 'home',
                name: 'HomeView',
                component: () => import('@/views/HomeView.vue'),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: 'users',
                name: 'AllUsersView',
                component: () => import('@/views/AllUsersView.vue'),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: 'booking/:id',
                name: 'BookingView',
                component: () => import('@/views/BookingView.vue'),
                props: true,
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: 'goal',
                name: 'GoalView',
                component: () => import('@/views/GoalView.vue'),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: 'missed',
                name: 'MissedPrayer',
                component: () => import('@/views/MissedPrayer.vue'),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: 'prayer',
                name: 'PrayerController',
                component: () => import('@/views/PrayerController.vue'),
                meta: {
                    requiresAuth: true,
                }
            },
            {
                path: 'reminder',
                name: 'ReminderView',
                component: () => import('@/views/ReminderView.vue'),
                meta: {
                    requiresAuth: true,
                }
            }
        ]
    },
    {
        path: '/user',
        name: 'UserView',
        component: () => import('@/views/UserView.vue'),
    }

]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

router.beforeEach((to, _, next) => {
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token

    if (to.meta.requiresAuth && !isAuthenticated) {
        return next('/user');
    }

    next();
})


export default router;