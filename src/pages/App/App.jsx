import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import Landing from '../Landing/Landing'
import * as authService from '../../services/authService'
import * as profileAPI from '../../services/profileService'
import ProfileList from '../ProfileList/ProfileList'
import ProfileDetails from '../ProfileDetails/ProfileDetails'
import RestaurantSearch from '../RestaurantSearch/RestaurantSearch'
import RestaurantDetails from '../RestaurantDetails/RestaurantDetails'
import * as restaurantAPI from '../../services/restaurantService'
import Messages from '../Messages/Messages'
import styles from './App.module.css'
// import ProfileInfo from '../../components/ProfileInfo/ProfileInfo'

class App extends Component {
	state = {
		userProfile: null,
		user: authService.getUser()
	}

	handleLogout = () => {
		authService.logout()
		this.setState({ user: null, userProfile: null })
		this.props.history.push('/')
	}

	handleSignupOrLogin = async () => {
		this.setState({
			user: await authService.getUser(),
			userProfile: await profileAPI.getUserProfile()
		})
	}

	handleAddRestaurant = async restaurant => {
		const updatedProfile = await restaurantAPI.addRestaurant(restaurant)
		this.setState({userProfile: updatedProfile})
	}

	handleRemoveRestaurant = async restaurant => {
		const updatedProfile = await restaurantAPI.removeRestaurant(restaurant)
		this.setState({userProfile: updatedProfile})
	}

	handleUpdateProfile = async profile => {
		const updatedProfile = await profileAPI.updatedProfile(profile)
		this.setState({userProfile: updatedProfile})
	}

	async componentDidMount(){
		if (!this.state.userProfile){
			const userProfile = await profileAPI.getUserProfile()
			this.setState({userProfile})
		}
	}

	render() {
		const { user, userProfile } = this.state
		return (
			<>
				<NavBar userProfile={userProfile} history={this.props.history} handleLogout={this.handleLogout} />

				<main>
				{/* <NavBar userProfile={userProfile} history={this.props.history} handleLogout={this.handleLogout} /> */}
				<Route 
					exact path="/"
					render={({ history }) => 
					authService.getUser() ? 
					<Landing history={history} userProfile={userProfile}/> : 
					<Redirect to="/login" />
				}/>
				<Route exact path='/signup'>
          <Signup history={this.props.history} handleSignupOrLogin={this.handleSignupOrLogin}/>
        </Route>
				<Route exact path='/login'>
          <Login handleSignupOrLogin={this.handleSignupOrLogin} history={this.props.history}/>
        </Route>
				<Route 
					exact path="/users"
					render={() => 
						authService.getUser() ?
						<ProfileList userProfile={userProfile}/> :
						<Redirect to='/login'/>
				}/>
				<Route
					exact path="/profile"
					render={({history, location}) =>
						authService.getUser() ?
						<ProfileDetails
							user={user}
							history={history}
							location={location}
							userProfile={userProfile}
							handleAddRestaurant={this.handleAddRestaurant}
							handleRemoveRestaurant={this.handleRemoveRestaurant}
							handleUpdateProfile={this.handleUpdateProfile}
							handleLogout={this.handleLogout}
							/> :
						<Redirect to='/login'/>
				}/>
				<Route
					exact path="/search/:location/:name"
					render={({match}) =>
						authService.getUser() ?
						<RestaurantSearch
							match={match}
							userProfile={userProfile}
							handleAddRestaurant={this.handleAddRestaurant}
							handleRemoveRestaurant={this.handleRemoveRestaurant}
						/> : <Redirect to='/login'/>
				}/>
				<Route
					exact path="/search/:location"
					render={({match}) =>
						authService.getUser() ?
						<RestaurantSearch
							match={match}
							userProfile={userProfile}
							handleAddRestaurant={this.handleAddRestaurant}
							handleRemoveRestaurant={this.handleRemoveRestaurant}
						/> : <Redirect to='/login'/>
				}/>
				<Route
					exact path="/restaurants/:id"
					render={({match}) =>
						authService.getUser() ?
						<RestaurantDetails
							match={match}
							userProfile={userProfile}
							handleAddRestaurant={this.handleAddRestaurant}
							handleRemoveRestaurant={this.handleRemoveRestaurant}
						/> : <Redirect to='/login'/>
				}/>
				<Route
					exact path='/messages'
					render={({location})=>
					authService.getUser() ?
					<Messages location={location} userProfile={userProfile}/> : <Redirect to='/login'/>
				}/>
				</main>
		    {/* forces Footer to the bottom */}

			</>
		)
	}
}

export default App
