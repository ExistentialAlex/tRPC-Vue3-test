<script lang="ts" setup>
import { watch } from 'vue';
import { useRoute, type RouteLocationNormalized } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { client } from '@/composables/trpcClient';

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
        label: 'users.breadcrumbs.view',
        params: {
          id: (route: RouteLocationNormalized<'/users/[id]'>) => route.params.id as string,
        },
      },
    ],
  },
});

const toast = useToast();
const route = useRoute('/users/[id]');

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
  }
});
</script>

<template>
  <div class="p-4">
    <div v-if="isPending">
      <USkeleton class="h-8 w-48" />
      <USkeleton class="h-6 w-32 mt-2" />
      <USkeleton class="h-6 w-64 mt-2" />
      <USkeleton class="h-6 w-48 mt-2" />
    </div>
    <UCard v-else>
      <template #header> User Details </template>
      <p><strong>ID:</strong> {{ data?.id }}</p>
      <p><strong>Name:</strong> {{ data?.name }}</p>
      <p><strong>Job Title:</strong> {{ data?.jobTitle }}</p>
    </UCard>
  </div>
</template>
