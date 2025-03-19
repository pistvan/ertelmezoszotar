<template>
<table class="table table-hover hits">
    <thead>
        <tr>
            <td>Szó</td>
            <td>Jelentés</td>
        </tr>
    </thead>
    <tbody>
        <tr
            v-for="(hit, index) in hits"
            :key="index"
            itemprop="itemListElement"
            itemscope
            itemtype="https://schema.org/ListItem"
        >
            <td>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span itemprop="name" v-html="hit.word" />

                <div v-if="hit.categories" class="categories small">
                    <span
                        v-for="category in hit.categories"
                        :key="category"
                        class="badge bg-info"
                    >
                        {{ category }}
                    </span>
                </div>
            </td>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <td itemprop="desciption" v-html="hit.meaning" />
        </tr>
    </tbody>
</table>
</template>

<script setup lang="ts">
import type { Hit } from './interfaces/Hit';

defineProps<{
    hits: Hit[];
}>();
</script>
