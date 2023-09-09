import { createI18n } from 'vue-i18n';
import { Quasar } from 'quasar';
// import messages from '@/i18n';

let i18n;
const supportedLanguages = ['en-US'];

export default async ({ app }) => {
	//Vue.use(VueI18n);

	let locale = localStorage.getItem('locale'),
		messages = {};
	if (!locale || !supportedLanguages.includes(locale)) {
		locale = 'en-US';
	}
	try {
		await import(/* webpackChunkName: "lang-[request]" */ `quasar/lang/${locale}`).then(
			(lang) => {
				Quasar.lang.set(lang.default);
			},
		);
		await import(/* webpackChunkName: "lang-[request]" */ `../i18n/${locale}`).then((lang) => {
			messages[locale] = lang.default;
		});
	} catch (err) {
		console.log(err);
		// Requested Quasar Language Pack does not exist,
		// let's not break the app, so catching error
	}
	app.i18n = createI18n({
		locale: 'en-US',
		globalInjection: true,
		messages
	})

	// Set i18n instance on app
	i18n = app.i18n;
};

export { i18n };
