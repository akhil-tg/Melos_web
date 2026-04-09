<template>
  <div class="deeplink-container">
    <div class="content-wrapper">
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading song...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <div class="error-icon">⚠️</div>
        <h2>Error Loading Song</h2>
        <p>{{ error }}</p>
        <p class="fallback-text">You will be redirected to Melos app...</p>
      </div>

      <!-- Success State -->
      <div v-else class="success-state">
        <!-- Album Thumbnail -->
        <div class="thumbnail-container">
          <img 
            v-if="albumThumbnail" 
            :src="albumThumbnail" 
            :alt="albumTitle"
            class="thumbnail"
          />
          <div v-else class="thumbnail-placeholder">
            <i class="fas fa-compact-disc"></i>
          </div>
        </div>

        <!-- Album Info -->
        <div class="album-info">
          <div class="type-badge">Album</div>
          <h2>{{ albumTitle }}</h2>
          <p class="artist">{{ artistName }}</p>
        </div>

        <!-- Song Info -->
        <div class="song-info">
          <div class="song-badge">Track</div>
          <h1>{{ songTitle }}</h1>
          <p class="duration">{{ formatDuration(duration) }}</p>
        </div>

        <!-- Redirect Message -->
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
import { ref, onMounted } from 'vue'
import { useRoute } from 'nuxt/app'
import { useYTMusicAPI } from '~/composables/useYTMusicAPI'

useSeoMeta({
  title: 'Song in Album - Melos',
  description: 'Opening song in Melos app',
})

const route = useRoute()
const { getAlbum } = useYTMusicAPI()

const isLoading = ref(true)
const error = ref<string | null>(null)
const albumTitle = ref('')
const artistName = ref('')
const albumThumbnail = ref('')
const songTitle = ref('')
const duration = ref(0)

onMounted(async () => {
  try {
    const albumId = route.params.albumId as string
    const songId = route.params.songId as string
    
    if (!albumId || !songId) {
      error.value = 'Invalid album or song ID'
      return
    }

    const album = await getAlbum(albumId)
    
    if (!album) {
      error.value = 'Album not found'
      return
    }

    const song = album.songs?.find((track: any) => track.videoId === songId)
    
    if (!song) {
      error.value = 'Song not found in album'
      return
    }

    albumTitle.value = album.name || 'Unknown Album'
    artistName.value = album.artist.name || 'Unknown Artist'
    albumThumbnail.value = album.thumbnails?.[0]?.url || ''
    songTitle.value = song.name || 'Unknown Song'
    duration.value = song.duration || 0

    isLoading.value = false

    setTimeout(() => {
      const musilyUrl = `musily://musily.app/album/${albumId}/${songId}`
      window.location.href = musilyUrl
    }, 3000)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load song'
    isLoading.value = false

    setTimeout(() => {
      window.location.href = `musily://musily.app/album/${route.params.albumId}/${route.params.songId}`
    }, 3000)
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
@use '@/assets/styles/_variables' as *;

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

.album-info {
  display: flex;
  flex-direction: column;
  gap: 4px;

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

  h2 {
    font-size: 18px;
    font-weight: 700;
    color: $text-color;
    margin: 0;
    word-break: break-word;
  }

  .artist {
    font-size: 14px;
    color: $on-surface-color;
    margin: 0;
  }
}

.song-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 0;
  border-top: 1px solid rgba(210, 188, 253, 0.08);
  border-bottom: 1px solid rgba(210, 188, 253, 0.08);

  .song-badge {
    display: inline-block;
    width: fit-content;
    margin: 0 auto;
    background: rgba(210, 188, 253, 0.12);
    color: $primary-color;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
  }

  h1 {
    font-size: 24px;
    font-weight: 700;
    color: $text-color;
    margin: 0;
    word-break: break-word;
  }

  .duration {
    font-size: 13px;
    color: $on-surface-color;
    margin: 0;
  }
}

.redirect-message {
  margin-top: 16px;
  padding-top: 16px;
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

  .album-info h2 {
    font-size: 16px;
  }

  .song-info h1 {
    font-size: 20px;
  }

  .thumbnail-container {
    width: 100px;
    height: 100px;
  }
}
</style>
