<template>
	<nav class="navbar bg-base-100 dark:bg-base-200 sticky top-0 z-20 rounded-md shadow-md">
		<div class="navbar-start flex items-center">
			<details ref="mobileMenuDropdown" class="dropdown">
				<summary tabindex="0" class="btn btn-ghost lg:hidden">
					<Bars4Icon class="h-5 w-5" />
				</summary>
				<ul tabindex="0" class="menu-compact menu dropdown-content rounded-box bg-base-100 mt-3 w-52 p-2 shadow">
					<li>
						<NuxtLink to="/" @click="mobileMenuDropdown?.removeAttribute('open')">Home</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/post" @click="mobileMenuDropdown?.removeAttribute('open')">Post</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/update" @click="mobileMenuDropdown?.removeAttribute('open')">Update</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/configure/webhooks" @click="mobileMenuDropdown?.removeAttribute('open')">Configure Webhooks</NuxtLink>
					</li>
					<li>
						<NuxtLink to="/configure/roles" @click="mobileMenuDropdown?.removeAttribute('open')">Configure Roles</NuxtLink>
					</li>
				</ul>
			</details>
			<NuxtLink to="/" class="btn btn-ghost flex items-center justify-start text-xl normal-case">
				<img alt="Sapphire Logo" src="/icons/gem.svg" class="h-[24px]" /><span class="ml-2">Sapphire</span>
			</NuxtLink>
		</div>
		<div class="navbar-end lg:hidden">
			<ThemeButton />
		</div>
		<div class="navbar-end hidden w-full lg:flex">
			<ul class="menu menu-horizontal px-1">
				<li>
					<NuxtLink class="btn btn-ghost mx-1 content-center normal-case" to="/">Home</NuxtLink>
				</li>
				<li>
					<NuxtLink class="btn btn-ghost mx-1 content-center normal-case" to="/post">Post</NuxtLink>
				</li>
				<li>
					<NuxtLink class="btn btn-ghost mx-1 content-center normal-case" to="/update">Update</NuxtLink>
				</li>
				<li>
					<NuxtLink class="btn btn-ghost mx-1 content-center normal-case" to="/configure/webhooks">Configure Webhooks</NuxtLink>
				</li>
				<li>
					<NuxtLink class="btn btn-ghost mx-1 content-center normal-case" to="/configure/roles">Configure Roles</NuxtLink>
				</li>
				<li>
					<ThemeButton />
				</li>
			</ul>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { Bars4Icon } from '@heroicons/vue/24/solid';
import type { HTMLDetailsNavbarElement } from '~~/lib/types/HTMLDetailsElement';

const mobileMenuDropdown = ref<HTMLDetailsNavbarElement | null>(null);

defineExpose({ close: () => mobileMenuDropdown.value?.removeAttribute('open') });
</script>
