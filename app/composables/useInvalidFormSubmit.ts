export default function <T extends object>(errors: T) {
	for (const error of Object.values(errors)) {
		if (error) {
			showToast({
				type: 'danger',
				message: error,
				timeout: 5,
				pauseOnHover: true
			});
		}
	}
}
