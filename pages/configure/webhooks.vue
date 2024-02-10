<template>
	<div class="container mx-auto h-full px-5">
		<modals-webhook :webhooks="webhookStorage.webhooks" :webhook="null" action="add" @close-modal="openModal = null" v-if="openModal === ''" />
		<button aria-label="Add new webhook" class="btn-shadow btn-primary btn my-5 w-full gap-2" @click="openModal = ''">
			<plus-icon class="h-6 w-6" />
			Add new webhook
		</button>
		<div class="overflow-x-auto shadow-md">
			<table class="table-pin-rows table-zebra table w-full">
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
								<button aria-label="Edit webhook" class="btn-primary btn-sm btn-circle btn mr-3" @click="openModal = webhook.value">
									<pencil-icon class="h-4 w-4" />
								</button>
							</div>
							<div class="tooltip-custom" data-tip="Delete webhook">
								<button
									aria-label="Delete webhook"
									class="btn-secondary btn-sm btn-circle btn"
									@click="webhookStorage.removeWebhook(webhook.value)"
								>
									<trash-icon class="h-4 w-4" />
								</button>
							</div>
						</td>
						<td>
							<nuxt-link
								:to="webhook.value"
								target="_blank"
								class="link tooltip-info tooltip"
								data-tip="Use 'Copy Link Address' to copy the webhook URL"
								aria-label="Webhook URL"
							>
								{{ webhook.label }}
							</nuxt-link>
						</td>
						<modals-webhook
							:webhooks="webhookStorage.webhooks"
							:webhook="webhook"
							action="edit"
							@close-modal="openModal = null"
							v-if="openModal === webhook.value"
						/>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/vue/24/solid';
const openModal = useOpenModal();
const webhookStorage = useWebhooks();
</script>
