<template>
  <DeeplinkContent
    type="artist"
    :is-loading="isLoading"
    :error="error"
    :data="artistData"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'nuxt/app'
import { useYTMusicAPI } from '~/composables/useYTMusicAPI'

useSeoMeta({
  title: 'Artist - Musily',
  description: 'Opening artist in Musily app',
})

const route = useRoute()
const { getArtist } = useYTMusicAPI()

const isLoading = ref(true)
const error = ref<string | null>(null)
const artistData = ref({
  title: '',
  thumbnail: '',
})

onMounted(async () => {
  try {
    const artistId = route.params.id as string
    
    if (!artistId) {
      error.value = 'Invalid artist ID'
      return
    }

    const artist = await getArtist(artistId)
    
    if (!artist) {
      error.value = 'Artist not found'
      return
    }

    artistData.value = {
      title: artist.name || 'Unknown Artist',
      thumbnail: artist.thumbnails?.[0]?.url || '',
    }

    isLoading.value = false

    setTimeout(() => {
      const musilyUrl = `musily://musily.app/artist/${artistId}`
      window.location.href = musilyUrl
    }, 3000)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load artist'
    isLoading.value = false

    setTimeout(() => {
      window.location.href = `musily://musily.app/artist/${route.params.id}`
    }, 3000)
  }
})
</script>
