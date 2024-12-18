<template>
<div>
    <NuxtRouteAnnouncer />
    <header class="container-fluid">
        <div class="container title">
            <h1><span class="text-secondary">értelmező</span><span class="text-primary">szótár</span>.hu</h1>
            <h2>Tudományos és Köznyelvi Szavak Magyar Értelmező Szótára</h2>
        </div>
    </header>
    <section class="container content">
        <form class="mb-3" @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label :for="searchQueryId" class="form-label">Kifejezés</label>
                <input
                    :id="searchQueryId"
                    v-model="searchQuery"
                    type="text"
                    class="form-control"
                >
            </div>
            <div>
                <button class="btn btn-primary" type="submit">Keresés</button>
            </div>
        </form>
        
        <NuxtPage />
    </section>

    <!-- <x-google-adsense slot="default" class="mb-3 text-center" /> -->

    <footer class="container-fluid">
        <div class="container">
            <div>A szótári adatbázis kialakításában végzett munkájáért köszönet
                <a href="https://svenopus.hu/" target="_blank">dr. Kovács J. Lászlónak</a>!
            </div>
        </div>
    </footer>
</div>
</template>

<script setup lang="ts">
const route = useRoute();
const isOnSearchRoute = route.matched?.[0]?.name === 'keres-query';
const currentSearchQuery = isOnSearchRoute ? (route.params.query as string) : undefined;
const searchQuery = ref(currentSearchQuery ?? '');

useHead({
    titleTemplate: (chunk) => chunk ? `${chunk} | Értelmező Szótár` : 'Értelmező Szótár',
    meta: [
        {
            name: 'description',
            content: 'Tudományos és Köznyelvi Szavak Magyar Értelmező Szótára',
        },
    ],
    script: [
        {
            innerHTML: `window.gtag_enable_tcf_support = true;`,
        },
        // Google AdSense script, if the client ID is set.
        ...(process.env.GOOGLE_ADSENSE_CLIENT_ID ? [{
            src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${process.env.GOOGLE_ADSENSE_CLIENT_ID}`,
            async: true,
            crossorigin: 'anonymous',
        }] : []),
        // Google Tag Manager, if the container ID is set.
        ...(process.env.GOOGLE_TAG_MANAGER_CONTAINER_ID ? [{
            innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.GOOGLE_TAG_MANAGER_CONTAINER_ID}');`,
        }] : []),
    ],
});

const handleSubmit = async () => {
    if (searchQuery.value.length <= 0) {
        return;
    }
    await navigateTo(`/keres/${encodeURIComponent(searchQuery.value)}`);
};

const searchQueryId = `input-${Math.random().toString(36).substring(7)}`;
</script>
