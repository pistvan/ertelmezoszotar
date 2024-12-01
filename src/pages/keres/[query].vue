<template>
<div>
    <!-- Loader -->
    <div v-if="result.status.value === 'pending'" class="d-flex align-items-center gap-2">
        <div class="spinner-border" role="status" />
        <span>Keresés...</span>
    </div>
    <!-- We found hits. -->
    <HitTable v-if="result.data.value?.length" :hits="result.data.value" />
    <!-- No hits found. -->
    <div v-else class="alert alert-warning">
        <h4>Nincs találat. 😮</h4>
        <div>Próbáld meg a keresést képző és rag nélküli alakban (szótári alak).</div>
    </div>
</div>
</template>

<script setup lang="ts">
import type { Hit } from '~/components/interfaces/Hit';

const route = useRoute();

useHead({
    title: route.params.query as string,
});

const result = await useFetch<Hit[]>('/api/search', {
    method: 'POST',
    body: {
        query: route.params.query,
    },
});
</script>
