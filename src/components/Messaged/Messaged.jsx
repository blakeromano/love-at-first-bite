import React, { Component } from 'react'
import ProfileCard from '../ProfileCard/ProfileCard'
import styles from './Messaged.module.css'

class Messaged extends Component {
  render() { 
    return (
      <>
      <div className={styles.box}>
      <h1 className={styles.header}>Messages</h1>
      {this.props.messaged?.map((messaged, idx) =>
        <>
        <button className={styles.messageBox} onClick={() => this.props.handleMessageShow(messaged.otherPerson)}>
          <div>
            <p>
            <h1 className={styles.name}> <ProfileCard key={idx} profile={messaged.otherPerson}/>  </h1> 
            <h3 className={styles.message}>{messaged.newestMessage}</h3>
            </p>
          </div>
        </button>
        </>
      )}
      </div>
      </>
    );
  }
}

export default Messaged;