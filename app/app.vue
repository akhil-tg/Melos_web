<template>
  <div>
    <Head>
      <!-- Favicon -->
      <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <Link rel="manifest" href="/site.webmanifest" />
      <Link rel="sitemap" type="application/xml" href="/sitemap.xml" />

      <!-- Meta Tags -->
      <Meta charset="utf-8" />
      <Meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta name="robots" content="index, follow" />
      <Meta name="theme-color" content="#151318" />
      
      <!-- OG Meta Tags -->
      <Meta property="og:url" content="https://melos.app/" />
      <Meta property="og:type" content="website" />
      <Meta property="og:locale" content="en_US" />
      <Meta property="og:site_name" content="Melos" />
      <Meta property="og:image" content="/assets/og_img.png" />
      <Meta property="og:image:width" content="1200" />
      <Meta property="og:image:height" content="630" />
      <Meta property="og:image:type" content="image/png" />
      
      <!-- Twitter Card -->
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:image" content="/assets/og_img.png" />
    </Head>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Melos: A great music app.',
  ogTitle: 'Melos: A great music app.',
  description: 'Enjoy your music with a great music app.',
  ogDescription: 'Enjoy your music with a great music app.',
  twitterTitle: 'Melos: Enjoy your music with a great music app.',
  twitterDescription: 'Enjoy your music with a great music app.',
})
useHead({
  script: [
    {
      src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8530606967858852",
      async: true,
      crossorigin: "anonymous"
    }
  ]
})
</script>
