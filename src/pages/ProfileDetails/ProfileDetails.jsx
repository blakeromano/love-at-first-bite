import React from 'react';
import FavoriteRestaurants from '../../components/FavoriteRestaurants/FavoriteRestaurants'
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'
import OtherUserInfo from '../../components/OtherUserInfo/OtherUserInfo';
import styles from './ProfileDetails.module.css'

const ProfileDetails = ({location, history, userProfile, handleAddRestaurant, handleRemoveRestaurant, handleUpdateProfile}) => {
  const {profile} = location.state
  return (
    <>
      <main className={styles.mainPage}>  
      <OtherUserInfo 
        profile= {profile}
        history= {history}
        userProfile={userProfile}
      />
      <FavoriteRestaurants 
        profile= {profile}
        userProfile= {userProfile}
        handleAddRestaurant= {handleAddRestaurant}
        handleRemoveRestaurant= {handleRemoveRestaurant}
      />
      {
        profile?._id === userProfile?._id &&
        <ProfileInfo 
          profile= {profile}
          history= {history}
          userProfile={userProfile}
          handleUpdateProfile={handleUpdateProfile}
        /> 
      }
      
    </main>
    </>
  )
}

export default ProfileDetails