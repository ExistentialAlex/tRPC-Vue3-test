<script lang="ts" setup>
import { reactive } from 'vue';
import { CreateUserSchema } from 'adfinity-ui-schemas';
import { client } from '@/composables/trpcClient';
import { useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';

definePage({
  meta: {
    requiresAuth: true,
    breadcrumbs: [
      {
        to: '/users',
        label: 'users.breadcrumbs.list',
      },
      {
        to: '',
        label: 'users.breadcrumbs.create',
      },
    ],
  },
});

const toast = useToast();
const router = useRouter();

const model = reactive<CreateUserSchema>({
  name: '',
  jobTitle: '',
});

const mutation = useMutation({
    mutationKey: ['createUser'],
    mutationFn: async () => {
      return await client.user.create.mutate(model);
    },
    onSuccess: (data) => {
      toast.add({
        title: 'User Created Successfully',
        description: `User ${data.name} has been created.`,
        color: 'success',
      });
      router.push(`/users/${data.id}`);
    },
    onError: (error) => {
      toast.add({
        title: 'Error Creating User',
        description: error.message || 'An error occurred while creating user data.',
        color: 'error',
      });
    },
  });

const onSubmit = async () => {
  mutation.mutate();
};
</script>

<template>
  <div class="p-4">
    <UForm class="flex flex-col gap-4" :state="model" :schema="CreateUserSchema" @submit="onSubmit">
      <UFormField label="Name" name="name">
        <UInput v-model="model.name" class="w-full" />
      </UFormField>
      <UFormField label="Job Title" name="jobTitle">
        <UInput v-model="model.jobTitle" class="w-full" />
      </UFormField>
      <UButton type="submit" class="justify-center">Create</UButton>
    </UForm>
  </div>
</template>
