import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

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
                name: 'Home',
                component: () => import('@/views/HomeView.vue'),
                meta: {
                    icon: 'fa-solid fa-house',
                    requiresAuth: true,
                }
            },
            {
                path: 'missed',
                name: 'Missed',
                component: () => import('@/views/MissedPrayer.vue'),
                meta: {
                    icon: 'fa-solid fa-diagram-project',
                    requiresAuth: true,
                }
            },
            {
                path: 'booking/:id',
                name: 'Booking',
                component: () => import('@/views/BookingView.vue'),
                props: true,
                meta: {
                    icon: 'fa-solid fa-house',
                    requiresAuth: true,
                }
            },
            {
                path: 'goal',
                name: 'Goal',
                component: () => import('@/views/GoalView.vue'),
                meta: {
                    icon: 'fa-solid fa-flag-checkered',
                    requiresAuth: true,
                }
            },
            {
                path: 'reminder',
                name: 'Reminder',
                component: () => import('@/views/ReminderView.vue'),
                meta: {
                    icon: 'fa-regular fa-bell',
                    requiresAuth: true,
                }
            },
            {
                path: 'profile',
                name: 'Profile',
                component: () => import('@/views/UserProfileView.vue'),
                meta: {
                    icon: 'fa-regular fa-user',
                    requiresAuth: true,
                }
            },
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