import DashboardService from '@/modules/dashboard/service';

export default {
	namespaced: true,
	state() {
		return {
			loading: false,
		};
	},
	getters: {
		loading(state) {
			return state.loading;
		},
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value;
		},
	},
	actions: {},
};
