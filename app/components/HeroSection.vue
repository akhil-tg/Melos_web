<template>
  <section class="hero">
    <div class="container hero-container">
      <div class="hero-content">
        <h1 class="hero-title">Free music for everyone</h1>
        <p class="hero-description">Melos is an open-source music app. Free, no ads, no telemetry. Download your favorite tracks and listen offline, anytime, anywhere.</p>
        <div class="hero-actions">
          <NuxtLink to="/downloads" class="btn btn-primary btn-lg">
            <Download :size="20" />
            Download
          </NuxtLink>
          <a href="#features" class="btn btn-ghost btn-lg">
            <ArrowDown :size="20" />
            Learn More
          </a>
        </div>
        <div class="hero-social">
          <a href="https://github.com/akhil-tg/Melos" target="_blank" rel="noopener" class="social-icon" title="GitHub">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://t.me/MelosApp" target="_blank" rel="noopener" class="social-icon" title="Telegram">
            <i class="fab fa-telegram"></i>
          </a>
        </div>
      </div>
      <div class="hero-visual">
        <img src="/assets/musily_logo_foreground_white.png" alt="Melos" class="hero-logo" width="380" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Download, ArrowDown } from 'lucide-vue-next'
</script>

<style scoped lang="scss">
@use '../../assets/styles/_variables' as *;

.hero {
  padding: 100px 0 40px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba($primary-color, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
}

.hero-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero-title {
  font-size: 56px;
  font-weight: 700;
  line-height: 1.1;
  margin: 0;
  background: linear-gradient(135deg, $text-color 0%, $on-surface-color 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 18px;
  color: $on-surface-color;
  margin: 0;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.hero-social {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  color: $on-surface-color;
  background: rgba(210, 188, 253, 0.08);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 20px;

  &:hover {
    color: $primary-color;
    background: rgba(210, 188, 253, 0.15);
    transform: translateY(-2px);
  }
}

.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 360px;
}

.hero-logo {
  width: 280px;
  height: 280px;
  border-radius: 24px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@media (max-width: $breakpoint-md) {
  .hero {
    padding: 60px 0 40px;

    &::before {
      width: 400px;
      height: 400px;
    }
  }

  .hero-container {
    grid-template-columns: 1fr;
    gap: 40px;
    order: -1;

    &::before {
      content: '';
      order: -1;
      width: 200px;
      height: 200px;
      margin: 0 auto 20px;
      background: url('/assets/musily_logo_foreground_white.png') center/contain no-repeat;
      animation: float 3s ease-in-out infinite;
    }
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-description {
    font-size: 16px;
  }

  .hero-actions {
    flex-direction: column;

    .btn {
      width: 100%;
      justify-content: center;
    }
  }

  .hero-visual {
    display: none;
  }
}
</style>
