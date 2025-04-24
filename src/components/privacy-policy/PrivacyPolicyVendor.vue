<template>
<div>
    {{ name }}<br>
    <template v-if="typeof description === 'string'">
        {{ description }}<br>
    </template>
    <component v-else-if="description" :is="description" />
    <template v-if="country">
        A feldolgozás helye: {{ country }}<br>
    </template>
    <template v-if="manages && manages.length">
        A kezelt Személyes Adatok:
        <ul class="badge-list badge-list--inline">
            <li
                v-for="(managedItem, index) in manages"
                :key="index"
                class="badge rounded-pill text-bg-primary"
            >
                {{ managedItem }}
            </li>
        </ul><br>
    </template>
    <template v-if="privacyPolicyUrl">
        <a :href="privacyPolicyUrl" target="_blank">Adatvédelmi szabályzat</a>
    </template>
    <a
        v-for="(url, link) in otherLinks ?? {}"
        :key="link"
        :href="url"
        target="_blank"
        class="d-block"
    >
        {{ link }}
    </a>
</div>
</template>

<script setup lang="ts">
import type { PrivacyPolicyVendorInterface } from '~/utils/PrivacyPolicyVendorInterface';

defineProps<PrivacyPolicyVendorInterface>();
</script>
