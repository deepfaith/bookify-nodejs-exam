import { createStore } from 'vuex';

import User from './modules/user';
import Auth from '@/modules/auth/store';

/*
 * If not building with SSR mode, you can
 * directly export the store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the store instance.
 */

/**
 * @returns {store}
 */
export default function(/* { ssrContext } */) {

	store = createStore({
		modules: {
			User,
			Auth,
		},

		// enable strict mode (adds overhead!)
		// for dev mode and --debug builds only
		strict: process.env.DEBUGGING
	})

	return store;
}

export var store;
