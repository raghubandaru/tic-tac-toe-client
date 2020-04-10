import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import DialogUpload from './DialogUpload'
import { Header, Main } from '../../shared/components'
import { useUser } from '../../shared/context/User'
import { Button } from '../../shared/elements'
import UserInfo from './UserInfo'

function Profile({ className }) {
  const [avatarEdit, setAvatarEdit] = useState(false)

  const { user } = useUser()

  const close = () => setAvatarEdit(false)

  return (
    <>
      <Header title="Profile" quote="Access the information provided" />
      <Main>
        <div className={className}>
          {user.avatar && (
            <div className="image-content">
              <img
                src={`https://res.cloudinary.com/raghubandaru/image/upload/v${user.avatar}`}
                alt="Avatar"
              />
            </div>
          )}
          <UserInfo />
          <Button variant="secondary" onClick={() => setAvatarEdit(true)}>
            {user.avatar ? 'Change Avatar' : 'Add Avatar'}
          </Button>
          <DialogUpload isOpen={avatarEdit} close={close} />
        </div>
      </Main>
    </>
  )
}

const StyledProfile = styled(Profile)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .image-content {
    width: 200px;
    height: 200px;
    margin-bottom: 2rem;
    border-radius: 50%;

    img {
      width: 100%;
      border-radius: 50%;
    }
  }
`

Profile.propTypes = {
  className: PropTypes.string.isRequired
}

export { StyledProfile as Profile }
