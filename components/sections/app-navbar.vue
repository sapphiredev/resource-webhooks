<template>
	<nav class="navbar sticky top-0 z-20 rounded-md bg-base-100 shadow-md dark:bg-base-200">
		<div class="navbar-start flex items-center">
			<details ref="mobileMenuDropdown" class="dropdown">
				<summary tabindex="0" class="btn-ghost btn lg:hidden">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
					</svg>
				</summary>
				<ul tabindex="0" class="menu-compact dropdown-content menu rounded-box mt-3 w-52 bg-base-100 p-2 shadow">
					<li>
						<nuxt-link to="/" @click="mobileMenuDropdown?.removeAttribute('open')">Home</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/post" @click="mobileMenuDropdown?.removeAttribute('open')">Post</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/update" @click="mobileMenuDropdown?.removeAttribute('open')">Update</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/configure/webhooks" @click="mobileMenuDropdown?.removeAttribute('open')">Configure Webhooks</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/configure/roles" @click="mobileMenuDropdown?.removeAttribute('open')">Configure Roles</nuxt-link>
					</li>
				</ul>
			</details>
			<nuxt-link to="/" class="btn-ghost btn flex items-center justify-start text-xl normal-case">
				<img alt="Sapphire Logo" src="/icons/gem.svg" style="height: 24px" /><span class="ml-2">Sapphire</span>
			</nuxt-link>
		</div>
		<div class="navbar-end lg:hidden">
			<theme-button />
		</div>
		<div class="navbar-end hidden w-full lg:flex">
			<ul class="menu menu-horizontal px-1">
				<li>
					<nuxt-link class="btn-ghost btn mx-1 content-center normal-case" to="/">Home</nuxt-link>
				</li>
				<li>
					<nuxt-link class="btn-ghost btn mx-1 content-center normal-case" to="/post">Post</nuxt-link>
				</li>
				<li>
					<nuxt-link class="btn-ghost btn mx-1 content-center normal-case" to="/update">Update</nuxt-link>
				</li>
				<li>
					<nuxt-link class="btn-ghost btn mx-1 content-center normal-case" to="/configure/webhooks">Configure Webhooks</nuxt-link>
				</li>
				<li>
					<nuxt-link class="btn-ghost btn mx-1 content-center normal-case" to="/configure/roles">Configure Roles</nuxt-link>
				</li>
				<li>
					<theme-button />
				</li>
			</ul>
		</div>
	</nav>
</template>

<script setup lang="ts">
import type { HTMLDetailsNavbarElement } from '~~/lib/types/HTMLDetailsElement';

const mobileMenuDropdown = ref<HTMLDetailsNavbarElement | null>(null);

defineExpose({ close: () => mobileMenuDropdown.value?.removeAttribute('open') });
</script>
