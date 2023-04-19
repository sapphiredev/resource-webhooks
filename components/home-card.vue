<template>
	<div class="card w-full bg-base-100 px-2 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">{{ title }}</h2>
			<p>{{ description }}</p>
			<div class="card-actions justify-end">
				<nuxt-link :aria-label="`Link to ${title}`" :to="href">
					<button :aria-label="`Button for going to the ${title} page`" class="btn-primary btn min-w-[10rem] normal-case">
						{{ btnText }}
					</button>
				</nuxt-link>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{ title: string; description: string; btnText: string; href: string }>();
</script>
