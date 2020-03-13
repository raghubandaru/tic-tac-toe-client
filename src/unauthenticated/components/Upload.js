import React, { useCallback, useState, useRef } from 'react'
import styled, { css } from 'styled-components'
import 'styled-components/macro'
import { useDropzone } from 'react-dropzone'
import ReactCrop from 'react-image-crop'
import axios from 'axios'

import { Button, ButtonGroup } from '../../shared/elements'
import {
  image64toCanvasRef,
  extractImageFileExtensionFromBase64,
  base64StringtoFile
} from '../../shared/helpers/image'
import { getAccessToken } from '../../shared/helpers/token'
import { useUser } from '../../shared/context/User'

const StyledReactCrop = styled(ReactCrop)`
  margin: 0 auto;
  margin-bottom: 2rem;
`

const DragnDrop = styled.div`
  flex-grow: 1;
  border: 2px dashed #bcccdc;
  background: #102a43;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`

const UploadContainer = styled.div`
  min-height: 30rem;
  display: flex;
  flex-direction: column;
`

function Upload({ userData }) {
  const [imgSrc, setImgSrc] = useState(null)
  const [crop, setCrop] = useState({
    unit: '%',
    aspect: 1 / 1,
    width: 40
  })
  const imagePreviewCanvasRef = useRef()
  const { setUser } = useUser()

  const onDrop = useCallback(acceptedFiles => {
    const currentFile = acceptedFiles[0]
    const reader = new FileReader()
    reader.addEventListener(
      'load',
      () => {
        setImgSrc(reader.result)
      },
      false
    )
    reader.readAsDataURL(currentFile)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleSkip = () => {
    setUser(userData)
  }

  const handleImageLoaded = image => {}

  const handleOnCropChange = crop => {
    setCrop(crop)
  }

  const handleOnCropComplete = (crop, pixelCrop) => {
    const canvasRef = imagePreviewCanvasRef.current
    image64toCanvasRef(canvasRef, imgSrc, pixelCrop)
  }

  const handleAvatarUpload = () => {
    if (imgSrc) {
      const canvasRef = imagePreviewCanvasRef.current
      const fileExtension = extractImageFileExtensionFromBase64(imgSrc)
      const fileName = 'preview.' + fileExtension
      const imageData64 = canvasRef.toDataURL('image/' + fileExtension)

      const croppedFile = base64StringtoFile(imageData64, fileName)
      const data = new FormData()
      data.append('file', croppedFile)

      const url = `${process.env.REACT_APP_API_DOMAIN}/users/${userData._id}`
      const config = {
        method: 'PATCH',
        url,
        data,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      }

      axios(config).then(({ data: { user } }) => {
        setUser(user)
      })
    }
  }

  const handleClearToDefault = () => {
    const canvasRef = imagePreviewCanvasRef.current
    const ctx = canvasRef.getContext('2d')
    ctx.clearRect(0, 0, canvasRef.width, canvasRef.height)
    setImgSrc(null)
  }

  return (
    <>
      {imgSrc !== null ? (
        <UploadContainer>
          <StyledReactCrop
            src={imgSrc}
            crop={crop}
            onChange={handleOnCropChange}
            onImageLoaded={handleImageLoaded}
            onComplete={handleOnCropComplete}
          />
          <div>
            <canvas
              ref={imagePreviewCanvasRef}
              css={css`
                display: none;
              `}
            ></canvas>
            <ButtonGroup>
              <Button secondary onClick={handleClearToDefault}>
                Clear
              </Button>
              <Button primary onClick={handleAvatarUpload}>
                Upload
              </Button>
            </ButtonGroup>
          </div>
        </UploadContainer>
      ) : (
        <UploadContainer>
          <DragnDrop {...getRootProps()}>
            <input {...getInputProps()} multiple={false} accept="image/*" />
            {isDragActive ? <p>Drop the image here</p> : <p>Upload Image</p>}
          </DragnDrop>
          <div
            css={css`
              text-align: center;
            `}
          >
            <Button onClick={handleSkip}>Skip</Button>
          </div>
        </UploadContainer>
      )}
    </>
  )
}

export { Upload }
