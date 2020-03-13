import React from 'react'
import { useParams } from 'react-router-dom'

function Gameplay() {
  const { id } = useParams()

  return (
    <div>
      <h2>Gameplay {id}</h2>
      <div>Avatar</div>
      <div>Board</div>
      <div>Avatar</div>
    </div>
  )
}

export { Gameplay }
