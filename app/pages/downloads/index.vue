<template>
  <main>
    <section class="downloads-hero">
      <div class="container">
        <NuxtLink to="/" class="hero-logo-link">
          <img src="/assets/musily_logo_rounded_white.png" alt="Melos" class="hero-logo" />
        </NuxtLink>
        <h1>Download Melos</h1>
        <p>Choose your platform and get started</p>
        <div class="hero-social">
          <a href="https://github.com/akhil-tg/Melos" target="_blank" rel="noopener" class="social-icon" title="GitHub">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://t.me/MelosApp" target="_blank" rel="noopener" class="social-icon" title="Telegram">
            <i class="fab fa-telegram"></i>
          </a>
        </div>
        <div v-if="!loading && version" class="version-info">
          <span class="version-badge">{{ version }}</span>
          <span class="release-date">Released {{ releaseDate }}</span>
        </div>
        <div v-if="loading" class="loading-spinner">Loading releases...</div>
        <div v-if="error" class="error-message">{{ error }}</div>
      </div>
    </section>

    <section v-if="!loading && downloadFiles.length > 0" class="downloads-section">
      <div class="container">
        <!-- Tab Navigation -->
        <div class="tabs-wrapper">
          <div class="tab-navigation">
            <button
              v-for="platform in ['android', 'windows', 'linux']"
              :key="platform"
              :class="['tab-button', { active: activeTab === platform }]"
              @click="activeTab = platform as 'android' | 'windows' | 'linux'"
            >
              <i :class="getPlatformIcon(platform)"></i>
              <span class="tab-label">{{ getPlatformLabel(platform) }}</span>
            </button>
          </div>

          <!-- Tab Content -->
          <div class="tab-content">
            <div v-show="activeTab === 'android'" class="tab-pane">
              <PlatformDownloadSection
                title="Android"
                description="APK for Android devices. Install on any Android 5.0+ device."
                :icon="'fab fa-android'"
                :files="getFilesByPlatform('android')"
              />
            </div>

            <div v-show="activeTab === 'windows'" class="tab-pane">
              <PlatformDownloadSection
                title="Windows"
                description="Executable installer for Windows 10 and later."
                :icon="'fab fa-windows'"
                :files="getFilesByPlatform('windows')"
              />
            </div>

            <div v-show="activeTab === 'linux'" class="tab-pane">
              <PlatformDownloadSection
                title="Linux"
                description="Download for any modern Linux distribution."
                :icon="'fab fa-linux'"
                :files="getFilesByPlatform('linux')"
              />
            </div>
          </div>
        </div>

        <section class="additional-info">
          <div class="info-box">
            <h3>Open Source</h3>
            <p>Melos is completely open-source. You can find the source code and contribute on <a href="https://github.com/MelosApp/musily" target="_blank" rel="noopener">GitHub</a>.</p>
          </div>
          <div class="info-box">
            <h3>System Requirements</h3>
            <p>
              <strong>Android:</strong> Android 5.0 or higher<br>
              <strong>Windows:</strong> Windows 10 or later<br>
              <strong>Linux:</strong> Any modern distribution
            </p>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGitHubReleases } from '../../../composables/useGitHubReleases'

const { loading, error, downloadFiles, version, releaseDate } = useGitHubReleases()
const activeTab = ref<'android' | 'windows' | 'linux'>('android')

// Detect user's platform on mount
onMounted(() => {
  const userAgent = navigator.userAgent.toLowerCase()
  const platform = navigator.platform.toLowerCase()
  
  if (userAgent.includes('android')) {
    activeTab.value = 'android'
  } else if (userAgent.includes('win') || platform.includes('win')) {
    activeTab.value = 'windows'
  } else if (userAgent.includes('linux') || platform.includes('linux') || userAgent.includes('x11')) {
    activeTab.value = 'linux'
  }
  // Default remains 'android' if no match
})

useSeoMeta({
  title: 'Download Melos - Free Music App',
  ogTitle: 'Download Melos - Free Music App',
  description: 'Download Melos for Android, Windows, and Linux. Free, open-source music player with no ads or telemetry.',
  ogDescription: 'Download Melos for Android, Windows, and Linux. Free, open-source music player with no ads or telemetry.',
  twitterTitle: 'Download Melos - Free Music App',
  twitterDescription: 'Download Melos for Android, Windows, and Linux. Free, open-source music player with no ads or telemetry.',
})

const getFilesByPlatform = (platform: string) => {
  return downloadFiles.value.filter((file: any) => file.platform === platform)
}

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'android':
      return 'fab fa-android'
    case 'windows':
      return 'fab fa-windows'
    case 'linux':
      return 'fab fa-linux'
    default:
      return 'fab fa-linux'
  }
}

const getPlatformLabel = (platform: string) => {
  switch (platform) {
    case 'android':
      return 'Android'
    case 'windows':
      return 'Windows'
    case 'linux':
      return 'Linux'
    default:
      return platform
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/_variables' as *;

.downloads-hero {
  padding: 60px 0 40px;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba($primary-color, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }
}

.hero-logo-link {
  display: block;
  width: 120px;
  margin: 0 auto 24px;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    opacity: 0.9;
  }

  &:active {
    transform: translateY(-2px);
  }
}

.hero-logo {
  width: 120px;
  height: 120px;
  border-radius: 16px;
  display: block;
}

.downloads-hero h1 {
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 12px;
  color: $text-color;
  position: relative;
  z-index: 1;
}

.downloads-hero p {
  font-size: 18px;
  color: $on-surface-color;
  margin: 0 0 24px;
  position: relative;
  z-index: 1;
}

.hero-social {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
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

.version-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  position: relative;
  z-index: 1;
}

.version-badge {
  background: $primary-color;
  color: $on-primary-color;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.release-date {
  color: $on-surface-color;
  font-size: 14px;
}

.loading-spinner {
  color: $on-surface-color;
  font-size: 16px;
  position: relative;
  z-index: 1;
}

.error-message {
  color: #ff6b6b;
  font-size: 14px;
  background: rgba(255, 107, 107, 0.1);
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 107, 107, 0.2);
  position: relative;
  z-index: 1;
}

.downloads-section {
  padding: 60px 0;
}

.platforms-grid {
  display: none;
}

.tabs-wrapper {
  margin-bottom: 60px;
}

.tab-navigation {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  border-bottom: 2px solid rgba(210, 188, 253, 0.08);
  overflow-x: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(210, 188, 253, 0.04);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(210, 188, 253, 0.15);
    border-radius: 2px;

    &:hover {
      background: rgba(210, 188, 253, 0.25);
    }
  }
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 20px;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  color: $on-surface-color;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  i {
    font-size: 20px;
  }

  &:hover {
    color: $primary-color;
  }

  &.active {
    color: $primary-color;
    border-bottom-color: $primary-color;
  }
}

.tab-content {
  animation: fadeIn 0.3s ease;
}

.tab-pane {
  animation: slideIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.additional-info {
  margin-top: 60px;
  padding-top: 60px;
  border-top: 1px solid rgba(210, 188, 253, 0.08);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.info-box {
  padding: 24px;
  background: rgba(210, 188, 253, 0.02);
  border: 1px solid rgba(210, 188, 253, 0.08);
  border-radius: 12px;

  h3 {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 12px;
    color: $text-color;
  }

  p {
    font-size: 14px;
    color: $on-surface-color;
    margin: 0;
    line-height: 1.6;

    a {
      color: $primary-color;
      text-decoration: none;
      transition: opacity 0.3s ease;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}

@media (max-width: $breakpoint-md) {
  .downloads-hero {
    padding: 40px 0 30px;
  }

  .downloads-hero h1 {
    font-size: 32px;
  }

  .downloads-hero p {
    font-size: 16px;
  }

  .version-info {
    flex-direction: column;
    gap: 12px;
  }

  .tab-navigation {
    margin-bottom: 24px;
    gap: 8px;
  }

  .tab-button {
    padding: 12px 14px;
    font-size: 14px;
    font-weight: 600;

    i {
      font-size: 18px;
    }

    .tab-label {
      display: inline;
    }
  }

  .additional-info {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
