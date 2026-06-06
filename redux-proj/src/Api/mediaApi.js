import axios from 'axios'

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY


export async function fetchPhotos(query,page=1,per_page=20) {
  const res = await axios.get('https://api.unsplash.com/search/photos',{
    params:{query,page,per_page},
    headers:{Authorization:`Client-ID ${UNSPLASH_KEY}`}
  })
  
  return res.data
}

export async function fetchVideos(query,per_page=15) {
  const res = await axios.get('https://api.pexels.com/videos/search',{
    params:{query,per_page},
    headers:{Authorization:PEXELS_KEY}
  })
  return res.data
}

export async function fetchGIF(query,limit=20) {
  // Use Giphy search endpoint and normalize results
  const res = await axios.get('https://api.giphy.com/v1/gifs/search', {
    params: { api_key: GIPHY_KEY, q: query, limit }
  })

  const gifs = (res.data && res.data.data) || []

  const results = gifs.map((gif) => ({
    id: gif.id,
    title: gif.title || 'GIF',
    type: 'gif',
    thumbnail: (gif.images && (gif.images.preview_gif?.url || gif.images.fixed_height_small_still?.url || gif.images.fixed_height_small?.url)) || '',
    src: gif.images?.original?.url || '',
    url: gif.url || ''
  }))

  return { results }
}