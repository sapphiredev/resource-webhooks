import { defineStore } from 'pinia';

interface LoadingState {
	isLoading: boolean;
}

export const useLoadingStore = defineStore('loading', {
	state: (): LoadingState => ({
		isLoading: false
	}),
	actions: {
		toggleLoading() {
			this.isLoading = !this.isLoading;
		},
		startLoading() {
			this.isLoading = true;
		},
		endLoading() {
			this.isLoading = false;
		}
	}
});
