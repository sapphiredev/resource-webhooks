<template>
	<div class="container mx-auto h-full px-5">
		<ModalsRole
			v-if="modalStorage.identifier === ''"
			:roles="roleStorage.roles"
			:role="null"
			action="add"
			@close-modal="modalStorage.resetModal()"
			@append-role="roleStorage.addRole"
			@splice-role="roleStorage.spliceInRole"
		/>
		<button aria-label="Add new role" class="btn-shadow btn btn-primary my-5 w-full gap-2" @click="modalStorage.closeModal()">
			<PlusIcon class="h-6 w-6" />
			Add new role
		</button>
		<div class="overflow-x-auto shadow-md">
			<table aria-label="Table of configured roles" class="table-zebra table-pin-rows table w-full">
				<thead>
					<tr>
						<th>Actions</th>
						<th>Role name</th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="roleStorage.roles.length === 0">
						<td colspan="3" class="text-center">
							<span class="opacity-75">No roles stored, add your first with the button above.</span>
						</td>
					</tr>
					<tr v-for="role in roleStorage.roles" :key="role.value" class="hover">
						<td>
							<div class="tooltip-custom" data-tip="Update role">
								<button
									aria-label="Edit role"
									class="btn btn-circle btn-primary btn-sm mr-3"
									@click="modalStorage.openModal(role.value)"
								>
									<PencilIcon class="h-4 w-4" />
								</button>
							</div>
							<div class="tooltip-custom" data-tip="Delete role">
								<button
									aria-label="Delete role"
									class="btn btn-circle btn-secondary btn-sm"
									@click="roleStorage.removeRole(role.value)"
								>
									<TrashIcon class="h-4 w-4" />
								</button>
							</div>
						</td>
						<td>
							<span class="tooltip tooltip-info" :data-tip="role.value">{{ role.label }}</span>
						</td>
						<ModalsRole
							v-if="modalStorage.identifier === role.value"
							:roles="roleStorage.roles"
							:role="role"
							action="edit"
							@close-modal="modalStorage.resetModal()"
							@append-role="roleStorage.addRole"
							@splice-role="roleStorage.spliceInRole"
						/>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
const modalStorage = useModalStore();
const roleStorage = useRoles();
</script>
