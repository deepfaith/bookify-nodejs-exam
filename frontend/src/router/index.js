import authHelper from '@/utils/auth-helper';
import { store } from '../store';
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the router instance.
 */

/**
 * @returns {VueRouter}
 */
export default function(/* { store, ssrContext } */) {
	if (router == null) {
		const createHistory = process.env.SERVER
			? createMemoryHistory
			: process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory;

		router = createRouter({
			scrollBehavior: () => ({ left: 0, top: 0 }),
			routes,

			// Leave this as is and make changes in the quasar.config file instead!
			// quasar.config file -> build -> vueRouterMode
			// quasar.config file -> build -> publicPath
			history: createHistory(process.env.VUE_ROUTER_BASE)
		})
	}

	const whiteList = ['/login', '/2fa', '/register'];

	router.beforeEach((to, from, next) => {
		if (store.getters['User/expiredPasswordFlag'] === true) {
			if (to.path === '/reset-password') {
				next();
			} else {
				next('/reset-password');
			}
		} else {
			store
				.dispatch('Auth/getAccessToken')
				.then((_) => {
					if (whiteList.includes(to.path)) {
						// if is logged in, redirect to the home page
						next('/dashboard');
					} else {
						if (canAccess(to)) {
							next();
						} else {
							next('/');
						}
					}
				})
				.catch((_) => {
					if (whiteList.includes(to.path)) {
						next();
					} else {
						authHelper.reset();
						next('/login');
					}
				});
		}
	});

	return router;
}

function canAccess(route) {
	const userRoles = store.getters['User/userRoles'].map((e) => e.name);
	let routeRoles = [];

	for (const match of route.matched) {
		if (match.meta?.roles) {
			routeRoles = match.meta.roles;
			break;
		}
	}
	if (routeRoles.length === 0) {
		return true;
	} else {
		if (routeRoles.some((e) => userRoles.includes(e))) {
			return true;
		} else {
			return false;
		}
	}
}

export var router;
