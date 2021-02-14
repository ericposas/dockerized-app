import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { Plugin as FragmentPlugin } from 'vue-fragment'
import Component3 from '../components/Component3.vue'

Vue.use(FragmentPlugin)
Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Component3
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
