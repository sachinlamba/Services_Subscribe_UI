import React, { Component} from 'react';
import { connect } from 'react-redux';
import { alterLoginStatus, loggedInUser, newUserRegister } from '../actions/allAction';
import urls from '../constants/AppContants';

class RegisterUser extends Component {
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

   register(){
     fetch(urls.users, {
       method: 'POST',
       headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"username": this.state.username, "password": this.state.password})
     })
     .then((data) => {
       console.log("Register request status: " , data);
       if(data.status === 200){
         this.props.newUserRegister(false);
       }else{
         this.setState({error: data.message})
       }
     })
     .catch(error => this.setState({ error }));

   }
   handleSubmit = event => {
     event.preventDefault();
     this.register();
   }

   render() {
     return (
       <div className="Register">
         <form onSubmit={this.handleSubmit}>
           <div id="username" bsSize="large">
             <label>username</label>
             <input
               autoFocus
               type="text"
               value={this.state.username}
               onChange={(event) => this.handleChange(event, "username")}
             />
           </div>
           <div id="password" bsSize="large">
             <label>Password</label>
             <input
               value={this.state.password}
               onChange={(event) => this.handleChange(event, "password")}
               type="password"
             />
           </div>
           <button
             bsSize="large"
             disabled={!this.validateForm()}
             type="submit"
           >
             Register
           </button>
         </form>
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
    newUserRegister: (status) => dispatch(newUserRegister(status)),

  }
)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
