import DashboardPage from '@/modules/dashboard/pages/dashboard/store';

function getState() {
	return {
		loading: false,
	};
}

export default {
	namespaced: true,
	modules: {
		DashboardPage,
	},
	state: getState,
	getters: {
		loading(state) {
			return state.loading;
		},
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value;
		},
		resetState(state) {
			Object.assign(state, getState());
		},
	},
	actions: {},
};
