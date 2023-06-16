<template>
	<div class="container mx-auto h-full px-5">
		<modals-role ref="roleDialog" :roles="rolesStorage.roles" :role="null" action="add" />
		<button aria-label="Add new role" class="btn-shadow btn-primary btn my-5 w-full gap-2" @click="roleDialog?.showModal()">
			<hero-icons-plus class="h-6 w-6" />
			Add new role
		</button>
		<div class="overflow-x-auto shadow-md">
			<table class="table-pin-rows table-zebra table w-full">
				<thead>
					<tr>
						<th>Actions</th>
						<th>Role name</th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="rolesStorage.roles.length === 0">
						<td colspan="3" class="text-center">
							<span class="opacity-75">No roles stored, add your first with the button above.</span>
						</td>
					</tr>
					<tr v-for="role in rolesStorage.roles" :key="role.value" class="hover">
						<td>
							<div class="tooltip-custom" data-tip="Update role">
								<button aria-label="Edit role" class="btn-primary btn-sm btn-circle btn mr-3" @click="roleDialog?.showModal()">
									<hero-icons-pencil class="h-4 w-4" />
								</button>
							</div>
							<div class="tooltip-custom" data-tip="Delete role">
								<button
									aria-label="Delete role"
									class="btn-secondary btn-sm btn-circle btn"
									@click="rolesStorage.removeRole(role.value)"
								>
									<hero-icons-trash class="h-4 w-4" />
								</button>
							</div>
						</td>
						<td>
							<span class="tooltip-info tooltip" :data-tip="role.value">{{ role.label }}</span>
						</td>
						<lazy-modals-role :roles="rolesStorage.roles" ref="roleDialog" :role="role" action="edit" />
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
const rolesStorage = useRoles();
const roleDialog = ref<HTMLDialogElement | null>(null);
</script>
