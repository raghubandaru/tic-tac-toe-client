export function base64StringtoFile(base64String, filename) {
  var arr = base64String.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

// Extract an Base64 Image's File Extension
export function extractImageFileExtensionFromBase64(base64Data) {
  return base64Data.substring(
    'data:image/'.length,
    base64Data.indexOf(';base64')
  )
}

// Base64 Image to Canvas with a Crop
export function image64toCanvasRef(canvasRef, image64, pixelCrop) {
  const canvas = canvasRef
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  const image = new Image()
  image.src = image64

  const ctx = canvas.getContext('2d')

  image.onload = function() {
    var scaleX = 1
    var scaleY = 1
    if (this.naturalWidth <= 200) {
      canvas.width = this.naturalWidth
      canvas.height = this.naturalHeight
    } else if (this.naturalWidth <= 400) {
      canvas.width = (pixelCrop.width * this.naturalWidth) / 100
      canvas.height = (pixelCrop.height * this.naturalHeight) / 100
    } else {
      canvas.width = 400
      canvas.height = 400
    }

    scaleX = this.naturalWidth
    scaleY = this.naturalHeight

    ctx.drawImage(
      image,
      (pixelCrop.x * scaleX) / 100,
      (pixelCrop.y * scaleY) / 100,
      (pixelCrop.width * scaleX) / 100,
      (pixelCrop.height * scaleY) / 100,
      0,
      0,
      canvas.width,
      canvas.height
    )
  }
}
