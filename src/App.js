import React, { Component} from 'react';
import { connect } from 'react-redux';
import 'fetch';
import { studentSelection, allServicesFetch } from './modules/actions/allAction';
import LoginPage from './modules/components/LoginPage';
import UserPage from './modules/components/UserPage';

class App extends Component {
  componentDidMount(){
    this.serviceListFetch();
  }

  serviceListFetch(){
    // fetch("http://localhost:8080/api/allServices")
    fetch("https://service-subscriber.herokuapp.com/api/allServices")
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

  render() {
    return (
      <div className = "App" >
        <header className = "App-header" >
          <h1 className = "App-title" > Welcome to Online Service Subscriber < /h1>
        </header>
        <div>{this.props.loginStatus ? <UserPage /> : <LoginPage />}</div>
        <button>
          Register
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginStatus: state.userServiceReducer.loginStatus,
  username: state.userServiceReducer.userDetails.username,
  subscribedList: state.userServiceReducer.userDetails.subscribes || [],
})

const mapDispatchToProps = dispatch => ({
  studentSelection: () => dispatch(studentSelection()),
  allServicesFetch: (data) => dispatch(allServicesFetch(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
