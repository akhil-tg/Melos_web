<template>
  <DeeplinkContent
    type="album"
    :is-loading="isLoading"
    :error="error"
    :data="albumData"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'nuxt/app'
import { useYTMusicAPI } from '../../../composables/useYTMusicAPI'

useSeoMeta({
  title: 'Album - Musily',
  description: 'Opening album in Musily app',
})

const route = useRoute()
const { getAlbum } = useYTMusicAPI()

const isLoading = ref(true)
const error = ref<string | null>(null)
const albumData = ref({
  title: '',
  artist: '',
  thumbnail: '',
  year: undefined as number | undefined,
  description: '',
})

onMounted(async () => {
  try {
    const albumId = route.params.albumId as string
    
    if (!albumId) {
      error.value = 'Invalid album ID'
      return
    }

    const album = await getAlbum(albumId)
    
    if (!album) {
      error.value = 'Album not found'
      return
    }

    albumData.value = {
      title: album.name || 'Unknown Album',
      artist: album.artist?.name || 'Unknown Artist',
      thumbnail: album.thumbnails?.[0]?.url || '',
      year: album.year || undefined,
      description: '',
    }

    isLoading.value = false

    setTimeout(() => {
      const musilyUrl = `musily://musily.app/album/${albumId}`
      window.location.href = musilyUrl
    }, 3000)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load album'
    isLoading.value = false

    setTimeout(() => {
      window.location.href = `musily://musily.app/album/${route.params.albumId}`
    }, 3000)
  }
})
</script>
