import AuthService from '@/modules/auth/service';

export default {
	namespaced: true,
	state() {
		return {
			registerForm: {
				email: '',
				password: '',
			},
			loading: false,
		};
	},
	getters: {
		loading(state) {
			return state.loading;
		},
		registerForm(state) {
			return state.registerForm;
		},
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value;
		},
		setRegisterForm(state, value) {
			state.registerForm = value;
		},
	},
	actions: {
		async register({ commit, dispatch }, payload) {
			commit('setLoading', true);
			commit('setRegisterForm', {
				email: '',
				password: '',
			});
			try {
				const { data } = await AuthService.register(payload);
			} catch (error) {
				throw error;
			} finally {
				commit('setLoading', false);
			}
		},
	},
};
