import React, { Component} from 'react';
import { connect } from 'react-redux';
import 'fetch';
import { studentSelection, allServicesFetch, newUserRegister } from './modules/actions/allAction';
import LoginPage from './modules/components/LoginPage';
import UserPage from './modules/components/UserPage';
import RegisterUser from './modules/components/RegisterUser';
import urls from './modules/constants/AppContants';

class App extends Component {
  componentDidMount(){
    this.serviceListFetch();
  }

  serviceListFetch(){
    fetch(urls.allServices)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("Available services: " , data);
      this.props.allServicesFetch(data)

    })
    .catch(error => this.setState({ error }));
  }

  studentSelection = (event) => {
    this.props.studentSelection();
  }
  registerUser = () => {
    this.props.newUserRegister(true);
  }

  render() {
    return (
      <div className = "App" >
        <header className = "App-header" >
          <h1 className = "App-title" > Welcome to Online Service Subscriber < /h1>
        </header>

        {
          !this.props.register ? (this.props.loginStatus ? <UserPage /> : <LoginPage />) : ""
        }

        {
          !this.props.loginStatus ? (this.props.register ? <RegisterUser /> : <button onClick={this.registerUser}>Register</button>) : ""
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginStatus: state.userServiceReducer.loginStatus,
  username: state.userServiceReducer.userDetails.username,
  subscribedList: state.userServiceReducer.userDetails.subscribes || [],
  register: state.userServiceReducer.register,

})

const mapDispatchToProps = dispatch => ({
  studentSelection: () => dispatch(studentSelection()),
  allServicesFetch: (data) => dispatch(allServicesFetch(data)),
  newUserRegister: (status) => dispatch(newUserRegister(status)),

})

export default connect(mapStateToProps, mapDispatchToProps)(App);
