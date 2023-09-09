import axios from 'axios';
import { addAuthorizationInterceptor, addNotificationInterceptor } from '@/utils/axios-helpers';
import authHelper from '@/utils/auth-helper';
import { createApp } from 'vue';
const axiosInstance = axios.create({
	baseURL: process.env.BACKEND_SERVER_URL + 'api/',
	headers: {
		Authorization: `Bearer ${authHelper.getAccessToken()}`,
	},
});
const unauthenticatedAxiosInstance = axios.create({ baseURL: process.env.BACKEND_SERVER_URL + 'api/' });

addNotificationInterceptor(axiosInstance);
addNotificationInterceptor(unauthenticatedAxiosInstance);

addAuthorizationInterceptor(axiosInstance);

export default ({ Vue }) => {
	const app = createApp({})
	app.config.globalProperties.$axios = axiosInstance;
};

export { axiosInstance, unauthenticatedAxiosInstance };
