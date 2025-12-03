<template>
  <DeeplinkContent
    type="song"
    :is-loading="isLoading"
    :error="error"
    :data="songData"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'nuxt/app'
import { useYTMusicServer } from '~/composables/useYTMusicServer'

useSeoMeta({
  title: 'Song - Musily',
  description: 'Opening song in Musily app',
})

const route = useRoute()
const { getSong } = useYTMusicServer()

const isLoading = ref(true)
const error = ref<string | null>(null)
const songData = ref({
  title: '',
  artist: '',
  thumbnail: '',
  duration: 0,
})

onMounted(async () => {
  try {
    const songId = route.params.id as string
    
    if (!songId) {
      error.value = 'Invalid song ID'
      return
    }

    const song = await getSong(songId)
    
    if (!song) {
      error.value = 'Song not found'
      return
    }

    songData.value = {
      title: song.title || 'Unknown Song',
      artist: song.artists?.[0]?.name || 'Unknown Artist',
      thumbnail: song.thumbnails?.[0]?.url || '',
      duration: song.duration || 0,
    }

    isLoading.value = false

    setTimeout(() => {
      const musilyUrl = `musily://musily.app/song/${songId}`
      window.location.href = musilyUrl
    }, 3000)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load song'
    isLoading.value = false

    setTimeout(() => {
      window.location.href = `musily://musily.app/song/${route.params.id}`
    }, 3000)
  }
})
</script>
