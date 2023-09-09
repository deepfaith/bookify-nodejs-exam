import AuthModuleRoutes from '@/modules/auth/routes';
import DashboardModuleRoutes from '@/modules/example-module/routes';

const routes = [
	{
		path: '/',
		component: () => import(/* webpackChunkName: "MainLayout" */ '@/layouts/main'),
		children: [],
	},
	{
		path: '/',
		component: () => import(/* webpackChunkName: "AuthLayout" */ '@/layouts/auth'),
		children: [AuthModuleRoutes],
	},
	{
		path: '/dashboard',
		component: () => import(/* webpackChunkName: "AuthLayout" */ '@/layouts/main'),
		children: [DashboardModuleRoutes],
	},
	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('@/layouts/404'),
	},
];

export default routes;
