<template>
	<footer class="flex items-end">
		<div class="container mx-auto flex flex-col items-center px-5 py-8 sm:flex-row">
			<div class="flex w-full flex-row flex-wrap content-start items-center justify-center">
				<p class="mb-2 mt-4 max-w-full flex-grow-0 basis-full text-center text-sm opacity-70">
					Copyright © 2022 The Sapphire Community and its contributors
				</p>

				<sponsor-link href="https://vercel.com/?utm_source=sapphiredev&utm_campaign=oss" title="Vercel" class="mr-2">
					<img alt="Logo Vercel" src="/icons/powered-by-vercel.svg" style="height: 40px" />
				</sponsor-link>

				<sponsor-link href="https://polypane.app/" title="Polypane" class="mr-2">
					<img alt="Logo Polypane" src="/icons/powered-by-polypane.svg" style="height: 40px" />
				</sponsor-link>

				<sponsor-link href="https://www.cloudflare.com/" title="Cloudflare">
					<img alt="Logo Cloudflare" src="/icons/powered-by-cloudflare.svg" style="height: 40px" />
				</sponsor-link>
			</div>
		</div>
	</footer>
</template>
