<template>
	<q-drawer
		behavior="desktop"
		:mini="miniState"
		show-if-above
		content-class="bg-white flex column"
	>
		<q-list>
			<sidebar-item v-for="item in sidebarRoutes" :key="item.title" v-bind="item" />
		</q-list>

		<q-space />

		<q-btn
			@click="toggleMiniState"
			icon="menu"
			:label="miniState ? '' : 'Menu'"
			align="items-start"
			flat
		/>
	</q-drawer>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './sidebar-item.vue';

const linksData = [
	{
		title: 'Dashboard',
		icon: 'dashboard',
		link: '/dashboard',
	},
	// {
	// 	title: 'Disapproved',
	// 	icon: 'indeterminate_check_box',
	// 	link: '/disapproved',
	// 	meta: {
	// 		roles: ['admin', 'super-admin'],
	// 	},
	// },
];

export default {
	components: {
		SidebarItem,
	},
	data() {
		return {
			miniState: this.$q.platform.is.mobile ? true : false,
			sidebarRoutes: [],
		};
	},
	computed: {
		...mapGetters('User', ['userRoles']),
	},
	methods: {
		toggleMiniState() {
			this.miniState = !this.miniState;
		},
	},
	created() {
		const mappedUserRoles = this.userRoles.map((e) => e.name);
		this.sidebarRoutes = linksData.filter((e) => {
			if (e.meta?.roles) {
				if (e.meta.roles.some((role) => mappedUserRoles.includes(role))) {
					return true;
				} else {
					return false;
				}
			} else {
				return true;
			}
		});
	},
};
</script>

<style></style>
