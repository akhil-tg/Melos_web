<template>
  <section class="cta-section">
    <div class="container">
      <div class="cta-content">
        <h2>Ready to take control of your music?</h2>
        <p>Download Melos today and experience music the way it should be.</p>
        <p>Free, private, and on your terms.</p>
        <NuxtLink to="/downloads" class="btn btn-primary btn-lg">
          <Download :size="20" />
          Download
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Download } from 'lucide-vue-next'
</script>

<style scoped lang="scss">
@use '../../assets/styles/_variables' as *;

.cta-section {
  padding: 60px 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -40%;
    right: -20%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba($primary-color, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba($primary-color, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
}

.cta-content {
  text-align: center;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  h2 {
    font-size: 42px;
    font-weight: 700;
    margin: 0;
    color: $text-color;
  }

  p {
    font-size: 18px;
    color: $on-surface-color;
    margin: 0;
    max-width: 500px;
  }
}

@media (max-width: $breakpoint-md) {
  .cta-section {
    padding: 60px 0;
  }

  .cta-content {
    h2 {
      font-size: 28px;
    }

    p {
      font-size: 16px;
    }
  }
}
</style>
