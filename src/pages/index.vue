<template>
<div>
    <h3>Üdvözlünk az online értelmező szótárunkban!</h3>

    <p>
        Az oldalunk több tízezer szót tartalmaz. Reméljük, hogy könnyen és gyorsan megtalálod a keresett szavak
        jelentését, és hogy az oldalunk hasznos eszközként fog szolgálni bármilyen más célra.
    </p>

    <template v-if="dailyHits.data.value">
        <h3>Napi szavak</h3>
        <p>Napi válogatás a szótári adatbázisból.</p>
        <HitTable :hits="dailyHits.data.value" />
    </template>
</div>
</template>

<script setup lang="ts">
import type { Hit } from '~/components/interfaces/Hit';

const dailyHits = await useFetch<Hit[]>('/api/daily', {
    method: 'POST',
});
</script>
