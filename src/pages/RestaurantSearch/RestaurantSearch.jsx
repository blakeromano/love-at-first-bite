import React, { Component } from 'react';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import * as restaurantAPI from '../../services/restaurantService'
import styles from './RestaurantSearch.module.css'
import Header from '../../components/Header/Header'



class RestaurantSearch extends Component {
  state = {
    searchResults: []
  }
  async componentDidMount(){
    const {params} = this.props.match
    const searchResults = await (params.name ?
      restaurantAPI.search(params.location, params.name) :
      restaurantAPI.searchWithoutName(params.location))
    this.setState({
      searchResults: searchResults.businesses
    })
  }
  async componentDidUpdate(prevProps){
    const {params} = this.props.match
    if (params.location !== prevProps.match.params.location ||
        params.name !== prevProps.match.params.name){
      const searchResults = await (params.name ?
        restaurantAPI.search(params.location, params.name) :
        restaurantAPI.searchWithoutName(params.location))
      this.setState({
        searchResults: searchResults.businesses
      })
    }
  }
  render(){
    return (
      <>
      <Header />
        <h1 className={styles.header} >Search Results</h1>
        <div className={styles.main}>
          <ul className={styles.cards}>
        {this.state.searchResults?.map(restaurant => 
          <RestaurantCard
            restaurant={restaurant}
            key={restaurant.id}
            userProfile={this.props.userProfile}
            handleAddRestaurant={this.props.handleAddRestaurant}
            handleRemoveRestaurant={this.props.handleRemoveRestaurant}
          />
        )}
        </ul>
        </div>
      </>
    )
  }
}

export default RestaurantSearch