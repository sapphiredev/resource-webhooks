import { defineStore } from 'pinia';

interface ModalState {
	identifier: string | null;
}

export const useModalStore = defineStore('modal', {
	state: (): ModalState => ({
		identifier: null
	}),
	actions: {
		openModal(id: string) {
			this.identifier = id;
		},
		closeModal() {
			this.identifier = '';
		},
		resetModal() {
			this.identifier = null;
		}
	}
});
