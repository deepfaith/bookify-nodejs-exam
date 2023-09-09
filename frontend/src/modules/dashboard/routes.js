import ModuleLayout from './module-layout.vue';

export default {
	path: '/test',
	component: ModuleLayout,
	children: [
		{
			path: 'dashboard',
			component: () => import('./pages/dashboard'),
		},
	],
};
