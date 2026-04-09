<template>
  <main class="home-page">
    <HeroSection />
    <FeaturesSection />
    <StatsSection />
    <CTASection />
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Melos: A great music app.',
  ogTitle: 'Melos: A great music app.',
  description: 'Enjoy your music with a great music app. Free, open-source, no ads, no telemetry.',
  ogDescription: 'Enjoy your music with a great music app. Free, open-source, no ads, no telemetry.',
  twitterTitle: 'Melos: Enjoy your music with a great music app.',
  twitterDescription: 'Enjoy your music with a great music app. Free, open-source, no ads, no telemetry.',
})
</script>

<style scoped lang="scss">
main {
  flex: 1;
}
</style>
