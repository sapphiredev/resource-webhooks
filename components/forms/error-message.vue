<template>
	<div v-show="!!hasErrorMessage" role="alert" class="alert alert-error">
		<XCircleIcon class="h-7 w-7 text-white" />
		<div>
			<VeeErrorMessage :name="name" class="text-white" />
			<div class="text-xs text-white italic">Resolve this error to submit</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/24/outline';

defineProps<{ name: string; hasErrorMessage: boolean }>();
</script>
