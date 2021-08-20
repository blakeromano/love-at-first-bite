import React from 'react'
import styles from './Header.module.css'


const Header = () => {
  return ( 
    <div>
      <img className={styles.image} src="https://i.imgur.com/3toHJdt.png" alt="logo" />
    </div>
   );
}
 
export default Header;