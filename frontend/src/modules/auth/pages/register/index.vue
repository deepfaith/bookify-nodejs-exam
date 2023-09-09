<template>
	<div class="q-pa-md flex column">
		<h6 class="text-dark q-my-sm text-center">Register to Coding Test App</h6>
		<register-form @submit="handleSubmit" />
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import RegisterForm from 'src/modules/auth/components/register-form.vue';

export default {
	components: {
		RegisterForm,
	},
	methods: {
		...mapActions('Auth/Register', ['register']),
		handleSubmit(payload) {
			this.register(payload)
				.then(() => {
					this.$router.push('/register');
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},
};
</script>

<style></style>
