<template>
  <div class="deeplink-container">
    <div class="content-wrapper">
      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading {{ type }}...</p>
      </div>

      <div v-else-if="error" class="loading-state">
        <h2>Openning {{ type }}</h2>
        <p class="fallback-text">You will be redirected to Melos app...</p>
      </div>

      <div v-else class="success-state">
        <div class="thumbnail-container">
          <img 
            v-if="thumbnail" 
            :src="thumbnail" 
            :alt="title"
            class="thumbnail"
          />
          <div v-else class="thumbnail-placeholder">
            <i class="fas fa-music"></i>
          </div>
        </div>

        <div class="info-container">
          <div class="type-badge">{{ typeLabel }}</div>
          <h1>{{ title }}</h1>
          <p v-if="artist" class="artist">{{ artist }}</p>
          <p v-if="year" class="year">{{ year }}</p>
          <p v-if="description" class="description">{{ description }}</p>

          <div v-if="duration" class="duration">
            {{ formatDuration(duration) }}
          </div>
        </div>

        <div class="redirect-message">
          <p>Opening in Melos...</p>
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type: 'song' | 'artist' | 'album'
  isLoading: boolean
  error: string | null
  data: {
    title: string
    artist?: string
    thumbnail?: string
    year?: number
    description?: string
    duration?: number
  }
}

const props = defineProps<Props>()

const title = computed(() => props.data.title || 'Loading...')
const artist = computed(() => props.data.artist)
const thumbnail = computed(() => props.data.thumbnail)
const year = computed(() => props.data.year)
const description = computed(() => props.data.description)
const duration = computed(() => props.data.duration)

const typeLabel = computed(() => {
  switch (props.type) {
    case 'song':
      return 'Song'
    case 'artist':
      return 'Artist'
    case 'album':
      return 'Album'
    default:
      return ''
  }
})

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`
  }
  return `${minutes}m ${secs}s`
}
</script>

<style scoped lang="scss">
@use '../../assets/styles/_variables' as *;

.deeplink-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.content-wrapper {
  width: 100%;
  max-width: 500px;
  padding: 40px;
  border: 1px solid rgba(210, 188, 253, 0.08);
  border-radius: 16px;
  background: rgba(210, 188, 253, 0.02);
  text-align: center;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .spinner {
    width: 48px;
    height: 48px;
    border: 4px solid rgba(210, 188, 253, 0.1);
    border-top-color: $primary-color;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  p {
    color: $on-surface-color;
    font-size: 16px;
    margin: 0;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Error State */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  .error-icon {
    font-size: 48px;
  }

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #ff6b6b;
    margin: 0;
  }

  p {
    color: $on-surface-color;
    margin: 0;
    font-size: 14px;

    &.fallback-text {
      color: $on-surface-color;
      margin-top: 12px;
      font-style: italic;
    }
  }
}

/* Success State */
.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  animation: fadeIn 0.4s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.thumbnail-container {
  width: 120px;
  height: 120px;
  margin: 0 auto;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(210, 188, 253, 0.1);
}

.thumbnail-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba($primary-color, 0.15), rgba($inverse-primary-color, 0.08));
  border-radius: 12px;
  color: $primary-color;
  font-size: 48px;
}

.info-container {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .type-badge {
    display: inline-block;
    width: fit-content;
    margin: 0 auto;
    background: rgba(210, 188, 253, 0.08);
    color: $primary-color;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
  }

  h1 {
    font-size: 28px;
    font-weight: 700;
    color: $text-color;
    margin: 0;
    word-break: break-word;
  }

  .artist {
    font-size: 16px;
    color: $primary-color;
    margin: 0;
    font-weight: 500;
  }

  .year {
    font-size: 14px;
    color: $on-surface-color;
    margin: 0;
  }

  .description {
    font-size: 14px;
    color: $on-surface-color;
    margin: 12px 0 0;
    line-height: 1.5;
  }

  .duration {
    font-size: 13px;
    color: $on-surface-color;
    margin-top: 8px;
    padding: 8px 12px;
    background: rgba(210, 188, 253, 0.04);
    border-radius: 8px;
  }
}

.redirect-message {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(210, 188, 253, 0.08);

  p {
    color: $on-surface-color;
    font-size: 14px;
    margin: 0 0 12px;
  }

  .progress-bar {
    width: 100%;
    height: 4px;
    background: rgba(210, 188, 253, 0.1);
    border-radius: 2px;
    overflow: hidden;

    .progress-fill {
      height: 100%;
      background: $primary-color;
      animation: progressFill 3s ease-in-out forwards;
    }
  }
}

@keyframes progressFill {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

@media (max-width: $breakpoint-md) {
  .content-wrapper {
    padding: 24px;
  }

  .info-container h1 {
    font-size: 22px;
  }

  .thumbnail-container {
    width: 100px;
    height: 100px;
  }
}
</style>
