<template>
	<div class="h-full px-2 py-2 pb-20">
		<nuxt-loading-indicator />
		<div class="grid-layout grid min-h-full">
			<sections-app-navbar />
			<section class="grid-layout-container grid h-[calc(100vh_-_64px)] overflow-auto pb-20 lg:pb-0">
				<main>
					<slot></slot>
				</main>
				<sections-app-footer />
			</section>
		</div>
	</div>
</template>
