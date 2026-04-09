import { ref, computed, onMounted } from 'vue'

interface Asset {
  name: string
  browser_download_url: string
  size: number
}

interface Release {
  tag_name: string
  published_at: string
  assets: Asset[]
}

interface DownloadFile {
  name: string
  url: string
  platform: 'android' | 'windows' | 'linux'
  type: 'primary' | 'secondary'
  size: string
}

export const useGitHubReleases = () => {
  const latestRelease = ref<Release | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchLatestRelease = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(
        'https://api.github.com/repos/akhil-tg/Melos/releases/latest'
      )

      if (!response.ok) {
        throw new Error('Failed to fetch releases')
      }

      latestRelease.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const getDownloadFiles = (): DownloadFile[] => {
    if (!latestRelease.value) return []

    const files: DownloadFile[] = []
    const assets = latestRelease.value.assets

    assets.forEach((asset) => {
      const name = asset.name.toLowerCase()

      if (name.endsWith('.apk')) {
        files.push({
          name: asset.name,
          url: asset.browser_download_url,
          platform: 'android',
          type: 'primary',
          size: formatFileSize(asset.size)
        })
      }

      if (name.endsWith('.exe')) {
        files.push({
          name: asset.name,
          url: asset.browser_download_url,
          platform: 'windows',
          type: 'primary',
          size: formatFileSize(asset.size)
        })
      }

      if ((name.includes('musily_installer') || name.includes('musily-linux-installer')) && name.endsWith('.zip')) {
        files.push({
          name: asset.name,
          url: asset.browser_download_url,
          platform: 'linux',
          type: 'primary',
          size: formatFileSize(asset.size)
        })
      }

      if (name.endsWith('.flatpak')) {
        files.push({
          name: asset.name,
          url: asset.browser_download_url,
          platform: 'linux',
          type: 'secondary',
          size: formatFileSize(asset.size)
        })
      }
    })

    return files
  }

  const getVersion = (): string => {
    return latestRelease.value?.tag_name || 'Unknown'
  }

  const getReleaseDate = (): string => {
    if (!latestRelease.value) return ''
    const date = new Date(latestRelease.value.published_at)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  onMounted(() => {
    fetchLatestRelease()
  })

  return {
    latestRelease,
    loading,
    error,
    downloadFiles: computed(() => getDownloadFiles()),
    version: computed(() => getVersion()),
    releaseDate: computed(() => getReleaseDate())
  }
}
