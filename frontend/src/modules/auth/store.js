import Login from './pages/login/store';
import Register from './pages/register/store';
import ResetPassword from './pages/reset-password/store';
import TwoFactorAuth from './pages/two-factor-auth/store';
import authHelper from '@/utils/auth-helper';
import AuthService from './service';
import { axiosInstance, unauthenticatedAxiosInstance } from '@/boot/axios';
const refreshTokenAPI = process.env.BACKEND_SERVER_URL + 'api/refresh';

function getState() {
	return {
		loading: false,
		accessToken: authHelper.getRefreshToken(),
		refreshToken: authHelper.getAccessToken(),
		gettingAccessTokenPromise: null,
	};
}

export default {
	namespaced: true,
	modules: {
		Login,
		Register,
		ResetPassword,
		TwoFactorAuth,
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
		setTokens(state, tokens) {
			state.accessToken = tokens.accessToken;
			state.refreshToken = tokens.refreshToken;
			authHelper.setAccessToken(state.accessToken);
			authHelper.setRefreshToken(state.refreshToken);
			axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + authHelper.getAccessToken();
		},
		setAccessToken(state, token) {
			state.accessToken = token;
			authHelper.setAccessToken(token);
			axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + authHelper.getAccessToken();
		},
		setRefreshToken(state, token) {
			state.refreshToken = token;
			authHelper.setRefreshToken(token);
		},
		setAccessTokenPromise(state, promise) {
			state.gettingAccessTokenPromise = promise;
		},
		resetState(state) {
			Object.assign(state, getState());
		},
	},
	actions: {
		getAccessToken({ dispatch }) {
			const accessToken = authHelper.getAccessToken();
			if (accessToken) {
				return accessToken;
			} else {
				const refreshToken = authHelper.getRefreshToken();
				if (refreshToken) {
					return dispatch('getNewAccessToken')
						.then((_) => {
							return authHelper.getAccessToken();
						})
						.catch((_) => {
							return Promise.reject('failed to get new accessToken -> unauthenticated');
						});
				} else {
					return Promise.reject('no accessToken nor refreshToken -> unauthenticated');
				}
			}
		},
		getNewAccessToken({ state, commit, dispatch }) {
			if (state.gettingAccessTokenPromise) {
				return state.gettingAccessTokenPromise;
			}
			const refreshToken = authHelper.getRefreshToken();
			if (!refreshToken) {
				return Promise.reject();
			}

			const promise = unauthenticatedAxiosInstance.post(refreshTokenAPI, {
				refreshToken,
			});
			commit('setAccessTokenPromise', promise);

			promise
				.then((res) => {
					commit('setAccessToken', res.data.data.token);
					if (res.data.data.refreshToken) {
						commit('setRefreshToken', res.data.data.refreshToken);
					}
					return authHelper.getAccessToken();
				})
				.catch((error) => {
					console.warn('failed to get new access token');
					// dispatch('redirectToLogin');
					return Promise.reject(error);
				})
				.finally(() => {
					commit('setAccessTokenPromise', null);
				});
			return promise;
		},
		async logout({ commit }) {
			commit('setLoading', true);
			try {
				await AuthService.logout();
				commit('resetState');
				return;
			} catch (err) {
				throw err;
			} finally {
				commit('setLoading', false);
			}
		},
	},
};
