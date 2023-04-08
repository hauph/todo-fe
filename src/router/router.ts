import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home/Home.vue';
import Login from '@/pages/Login/Login.vue';
import Edit from '@/pages/Edit/Edit.vue';
import { RouteNames } from '@/typings/router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: '/edit',
        name: 'edit',
        component: Edit,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    console.log(to)
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const token = localStorage.getItem('jwt');

    if (to.name === RouteNames.Login && token) {
        next({ name: RouteNames.Home });
    }

    if (requiresAuth && !token) {
        next('/login');
    } else {
        next();
    }
});

export default router;