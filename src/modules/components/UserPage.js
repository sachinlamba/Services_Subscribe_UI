import React, { Component} from 'react';
import { connect } from 'react-redux';
import { alterLoginStatus, loggedInUser } from '../actions/allAction';
import urls from '../constants/AppContants';

class UserPage extends Component {
  constructor(props){
  super(props);
    this.state={
      username:'',
      password:''
    }
   }


   validateForm() {
     return this.state.username.length > 0 && this.state.password.length > 0;
   }

   handleChange = (event, field) => {
     this.setState({
       [field]: event.target.value
     });
   }

   subscribeService(e, service){
     console.log("User page subscribe try",e,  service, this.props.userDetails)
     fetch(urls.userSubscribeServices, {
       method: 'POST',
       headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"id": this.props.userDetails.id, subscribes: [{"id": service.id}]})
     })
     .then((response) => {
       return response.json();
     })
     .then((data) => {
       console.log("Subscribed try result: " , data);

     })
     .catch(error => this.setState({ error }));

   }

   render() {
     return (
       <div className="Login">
          <h3> Hi {this.props.username}</h3>
         <div>Subscribed Services:</div>
         {
           this.props.subscribedList.map(service => <div>{service.name}</div>)
         }

          <h2>Subscribe to Services: </h2>
          {
            this.props.serviceList.map(service => <div onClick={(event) => this.subscribeService(event, service)}>{service.name}</div>)
          }
       </div>
     );
   }
}

const mapStateToProps = state => ({
  serviceList: state.userServiceReducer.serviceList,
  userDetails: state.userServiceReducer.userDetails,
  username: state.userServiceReducer.userDetails.username,
  subscribedList: state.userServiceReducer.userDetails.subscribes || [],
})

const mapDispatchToProps = dispatch => (
  {
    alterLoginStatus: (status) => dispatch(alterLoginStatus(status)),
    loggedInUser: (user) => dispatch(loggedInUser(user)),

  }
)

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
