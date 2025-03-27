<template>
	<div class="container mx-auto h-full px-5">
		<ModalsWebhook
			v-if="modalStorage.identifier === ''"
			:webhooks="webhookStorage.webhooks"
			:webhook="null"
			action="add"
			@close-modal="modalStorage.resetModal()"
			@append-webhook="webhookStorage.addWebhook"
			@splice-webhook="webhookStorage.spliceInWebhook"
		/>
		<button aria-label="Add new webhook" class="btn-shadow btn btn-primary my-5 w-full gap-2" @click="modalStorage.closeModal()">
			<PlusIcon class="h-6 w-6" />
			Add new webhook
		</button>
		<div class="overflow-x-auto shadow-md">
			<table aria-label="Table of configured webhooks" class="table-zebra table-pin-rows table w-full">
				<thead>
					<tr>
						<th>Actions</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="webhookStorage.webhooks.length === 0">
						<td colspan="3" class="text-center">
							<span class="opacity-75">No webhooks stored, add your first with the button above.</span>
						</td>
					</tr>
					<tr v-for="webhook in webhookStorage.webhooks" :key="webhook.value" class="hover">
						<td>
							<div class="tooltip-custom" data-tip="Update webhook">
								<button
									aria-label="Edit webhook"
									class="btn btn-circle btn-primary btn-sm mr-3"
									@click="modalStorage.openModal(webhook.value)"
								>
									<PencilIcon class="h-4 w-4" />
								</button>
							</div>
							<div class="tooltip-custom" data-tip="Delete webhook">
								<button
									aria-label="Delete webhook"
									class="btn btn-circle btn-secondary btn-sm"
									@click="webhookStorage.removeWebhook(webhook.value)"
								>
									<TrashIcon class="h-4 w-4" />
								</button>
							</div>
						</td>
						<td>
							<NuxtLink
								:to="webhook.value"
								target="_blank"
								class="link tooltip tooltip-info"
								data-tip="Use 'Copy Link Address' to copy the webhook URL"
								aria-label="Webhook URL"
							>
								{{ webhook.label }}
							</NuxtLink>
						</td>
						<ModalsWebhook
							v-if="modalStorage.identifier === webhook.value"
							:webhooks="webhookStorage.webhooks"
							:webhook="webhook"
							action="edit"
							@close-modal="modalStorage.resetModal()"
							@append-webhook="webhookStorage.addWebhook"
							@splice-webhook="webhookStorage.spliceInWebhook"
						/>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/vue/24/solid';
const modalStorage = useModalStore();
const webhookStorage = useWebhooks();
</script>
