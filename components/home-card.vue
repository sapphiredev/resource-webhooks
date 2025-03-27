<template>
	<div class="card bg-base-100 w-full px-2 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">{{ title }}</h2>
			<p>{{ description }}</p>
			<div class="card-actions justify-end">
				<NuxtLink :aria-label="`Link to ${title}`" :to="href">
					<button :aria-label="`Button for going to the ${title} page`" class="btn btn-primary min-w-[10rem] normal-case">
						{{ btnText }}
					</button>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{ title: string; description: string; btnText: string; href: string }>();
</script>
