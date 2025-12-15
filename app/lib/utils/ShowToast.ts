import type { TailvueToast, ToastProps } from 'tailvue';

export function showToast(options: ToastProps): void {
	const { $toast } = useNuxtApp();
	$toast.show(options);
}

declare module '#app' {
	export interface NuxtApp {
		$toast: TailvueToast;
	}
}
