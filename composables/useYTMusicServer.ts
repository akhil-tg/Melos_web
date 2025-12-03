import { ref } from 'vue'

export interface Thumbnail {
  url: string
  width?: number
  height?: number
}

export interface Artist {
  artistId?: string
  name: string
}

export interface Song {
  title: string
  artists?: Artist[]
  thumbnails?: Thumbnail[]
  duration?: number
  videoId?: string
}

export interface ArtistDetails {
  artistId?: string
  name: string
  thumbnails?: Thumbnail[]
  description?: string
}

export interface Album {
  albumId?: string
  name: string
  artist?: Artist
  thumbnails?: Thumbnail[]
  year?: number
}

const isInitialized = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)

export function useYTMusicServer() {
  const getSong = async (videoId: string): Promise<Song> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch<Song>(`/api/ytmusic/song/${videoId}`)
      return response
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch song'
      error.value = errorMsg
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const getArtist = async (artistId: string): Promise<ArtistDetails> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch<ArtistDetails>(`/api/ytmusic/artist/${artistId}`)
      return response
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch artist'
      error.value = errorMsg
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const getAlbum = async (albumId: string): Promise<Album> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await $fetch<Album>(`/api/ytmusic/album/${albumId}`)
      return response
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch album'
      error.value = errorMsg
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    getSong,
    getArtist,
    getAlbum,
    isInitialized,
    isLoading,
    error,
  }
}
