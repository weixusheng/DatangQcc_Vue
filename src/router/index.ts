import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import index from '../view/index.vue'
import page1 from '../view/view_interface/page1.vue'
import page2 from '../view/view_interface/page2.vue'
import ConfigArgs from '../view/view_interface/ConfigArgs.vue'
import Schedule from '../view/view_interface/Schedule.vue'
import welcome from '../view/welcome.vue'
import page_father from '@/view/view_test/page_father.vue'
import test_page from '@/view/view_test/test_page.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: index,
        name: 'index',
        redirect: '/welcome',
        children:[
            {
                path: '/welcome',
                name: 'welcome',
                component: welcome,
            },
            {
                path: '/ConfigArgs',
                name: 'ConfigArgs',
                component: ConfigArgs,
            },
            {
                path: '/Schedule',
                name: 'Schedule',
                component: Schedule,
            },
            {
                path: 'page_father',
                name: 'page_father',
                component: page_father,
            }
        ],
    },
    {
        path: '/test',
        component: test_page,
        name: 'test_page'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;