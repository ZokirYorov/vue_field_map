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
                name: 'HomeView',
                component: () => import('@/views/HomeView.vue'),
            },
            {
                path: 'booking/:id',
                name: 'BookingView',
                component: () => import('@/views/BookingView.vue'),
                props: true,
            }
        ]
    }

]

const router = createRouter({
    routes,
    history: createWebHistory(),
})
export default router;