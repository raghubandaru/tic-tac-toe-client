import React, { useCallback, useState, useRef } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import ReactCrop from 'react-image-crop'
import styled, { css } from 'styled-components'
import 'styled-components/macro'
import 'react-image-crop/dist/ReactCrop.css'

import { useUser } from '../../shared/context/User'
import { Button } from '../../shared/elements'
import {
  image64toCanvasRef,
  extractImageFileExtensionFromBase64,
  base64StringtoFile
} from '../../shared/helpers/image'
import { getAccessToken } from '../../shared/helpers/token'

const StyledReactCrop = styled(ReactCrop)`
  margin: 0 auto;
  margin-bottom: 2rem;
`

const DragnDrop = styled.div`
  flex-grow: 1;
  border: 2px dashed #334e68;
  background: #243b53;
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

function Upload({ close }) {
  const [imgSrc, setImgSrc] = useState(null)
  const [crop, setCrop] = useState({
    unit: '%',
    aspect: 1 / 1,
    width: 40
  })
  const imagePreviewCanvasRef = useRef()
  const { user, setUser } = useUser()

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

      const url = `${process.env.REACT_APP_API_DOMAIN}/users/${user._id}`
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
        close()
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
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
            `}
          >
            <canvas
              ref={imagePreviewCanvasRef}
              css={css`
                display: none;
              `}
            ></canvas>
            <Button
              width={100}
              variant="secondary"
              onClick={handleClearToDefault}
              css={css`
                margin-bottom: 1rem;
              `}
            >
              Clear
            </Button>
            <Button width={100} variant="primary" onClick={handleAvatarUpload}>
              Upload
            </Button>
          </div>
        </UploadContainer>
      ) : (
        <UploadContainer>
          <DragnDrop {...getRootProps()}>
            <input {...getInputProps()} multiple={false} accept="image/*" />
            {isDragActive ? <p>Drop the image here</p> : <p>Upload Image</p>}
          </DragnDrop>
          <Button variant="secondary" onClick={close}>
            Skip
          </Button>
        </UploadContainer>
      )}
    </>
  )
}

Upload.propTypes = {
  close: PropTypes.func.isRequired
}

export { Upload }
