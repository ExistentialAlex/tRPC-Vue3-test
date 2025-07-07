<script lang="ts" setup>
import doublet from 'doublet';
import { FetchError, ofetch } from 'ofetch';
import { onMounted, reactive, watch } from 'vue';
import { UpdateUserSchema, UserSchema } from 'adfinity-ui-schemas';
import { useRoute, useRouter, type RouteLocationNormalizedLoaded } from 'vue-router';
import { client } from '@/composables/trpcClient';
import { useMutation, useQuery } from '@tanstack/vue-query';

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
        label: 'users.breadcrumbs.edit',
        params: {
          id: (route: RouteLocationNormalizedLoaded<'/users/edit/[id]'>) =>
            route.params.id as string,
        },
      },
    ],
  },
});

const toast = useToast();

const route = useRoute('/users/edit/[id]');
const router = useRouter();

const model = reactive<UpdateUserSchema>({
  id: Number(route.params.id),
  name: '',
  jobTitle: '',
});

const { error, data, isPending } = useQuery({
  queryKey: ['user', route.params.id],
  queryFn: async () =>
    client.user.get.query({
      id: Number(route.params.id),
    }),
});

watch([error], ([err]) => {
  if (err) {
    toast.add({
      title: 'Error Fetching User',
      description: err.message || 'An error occurred while fetching user data.',
      color: 'error',
    });
    router.push('/users');
  }
});

watch([data], ([userData]) => {
  if (userData) {
    model.name = userData.name;
    model.jobTitle = userData.jobTitle;
  }
});

const mutation = useMutation({
  mutationKey: ['updateUser'],
  mutationFn: async () => {
    return await client.user.update.mutate(model);
  },
  onSuccess: (data) => {
    toast.add({
      title: 'User Updated Successfully',
      description: `User ${data.name} has been updated.`,
      color: 'success',
    });
    router.push(`/users/${data.id}`);
  },
  onError: (error) => {
    toast.add({
      title: 'Error Updating User',
      description: error.message || 'An error occurred while updating user data.',
      color: 'error',
    });
  },
});

const onSubmit = async () => {
  mutation.mutate();
};

onMounted(async () => {
  const [err, userData] = await doublet(ofetch<UserSchema>, `/api/users/${route.params.id}`);
  if (err) {
    toast.add({
      title: 'Error Fetching User Data',
      description: (err as FetchError).message || 'An error occurred while fetching user data.',
      color: 'error',
    });
    router.push('/users');
    return;
  }

  model.name = userData.name;
  model.jobTitle = userData.jobTitle;
});
</script>

<template>
  <div class="p-4">
    <UForm class="flex flex-col gap-4" :state="model" :schema="UpdateUserSchema" @submit="onSubmit">
      <UFormField label="Name" name="name">
        <UInput v-model="model.name" class="w-full" />
      </UFormField>
      <UFormField label="Job Title" name="jobTitle">
        <UInput v-model="model.jobTitle" class="w-full" />
      </UFormField>
      <UButton type="submit" class="justify-center">Save</UButton>
    </UForm>
  </div>
</template>
