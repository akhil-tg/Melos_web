<template>
  <section id="features" class="features-section">
    <div class="container">
      <div class="section-header">
        <h2>Why Melos?</h2>
        <p>Built for music lovers who value freedom and privacy.</p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon-box">
            <LockOpen :size="32" />
          </div>
          <h3>Completely Free</h3>
          <p>No ads, no subscriptions, no telemetry. Open-source and fully transparent.</p>
          <ul class="feature-list">
            <li>Zero cost forever</li>
            <li>No tracking</li>
            <li>No data collection</li>
          </ul>
        </div>

        <div class="feature-card">
          <div class="feature-icon-box">
            <Download :size="32" />
          </div>
          <h3>Listen Offline</h3>
          <p>Download your favorite songs and enjoy them without an internet connection.</p>
          <ul class="feature-list">
            <li>Download and keep forever</li>
            <li>Works anywhere</li>
            <li>Save bandwidth</li>
          </ul>
        </div>

        <div class="feature-card">
          <div class="feature-icon-box">
            <MonitorSmartphone :size="32" />
          </div>
          <h3>Cross-Platform</h3>
          <p>Use Melos on Android, Linux and Windows. Your music, everywhere.</p>
          <ul class="feature-list">
            <li>Available on different devices</li>
            <li>Sync your library with backup</li>
            <li>Same experience everywhere</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { LockOpen, Download, MonitorSmartphone } from 'lucide-vue-next'
</script>

<style scoped lang="scss">
@use '../../assets/styles/_variables' as *;

.features-section {
  padding: 60px 0;
  background: linear-gradient(180deg, transparent 0%, rgba($primary-color, 0.03) 100%);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: -20%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba($primary-color, 0.06) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
  position: relative;
  z-index: 1;

  h2 {
    font-size: 42px;
    font-weight: 700;
    margin: 0 0 12px;
    color: $text-color;
  }

  p {
    font-size: 18px;
    color: $on-surface-color;
    margin: 0;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  position: relative;
  z-index: 1;
}

.feature-card {
  padding: 32px;
  border: 1px solid rgba(210, 188, 253, 0.08);
  border-radius: 16px;
  background: rgba(210, 188, 253, 0.02);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &:hover {
    border-color: rgba(210, 188, 253, 0.2);
    background: rgba(210, 188, 253, 0.06);
    transform: translateY(-4px);
  }
}

.feature-icon-box {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba($primary-color, 0.15), rgba($inverse-primary-color, 0.08));
  border-radius: 12px;
  color: $primary-color;
}

.feature-card h3 {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: $text-color;
}

.feature-card p {
  color: $on-surface-color;
  margin: 0;
  line-height: 1.6;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    font-size: 14px;
    color: $on-surface-color;
    padding-left: 20px;
    position: relative;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: $primary-color;
      font-weight: bold;
    }
  }
}

@media (max-width: $breakpoint-md) {
  .features-section {
    padding: 60px 0;
  }

  .section-header {
    margin-bottom: 40px;

    h2 {
      font-size: 28px;
    }

    p {
      font-size: 16px;
    }
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .feature-card {
    padding: 24px;
  }
}
</style>
