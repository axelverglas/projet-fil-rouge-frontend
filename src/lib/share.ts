export const shareOnFacebook = (text: string) => {
  const url = window.location.href
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
    '_blank'
  )
}

export const shareOnTwitter = (text: string) => {
  const url = window.location.href
  window.open(
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    '_blank'
  )
}
