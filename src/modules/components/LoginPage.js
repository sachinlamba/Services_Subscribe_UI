import React, { Component} from 'react';
import { connect } from 'react-redux';
import { alterLoginStatus, loggedInUser } from '../actions/allAction';
import urls from '../constants/AppContants';

class LoginPage extends Component {
  constructor(props){
  super(props);
    this.state={
      username:'',
      password:''
    }
   }
   loginVerify(){
     fetch(urls.authenticate, {
       method: 'POST',
       headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"username": this.state.username, "password": this.state.password})
     })
     .then((response) => {
       return response.json();
     })
     .then((data) => {
       console.log("Login status data: " , data);
       if(data.status === 500){
         this.props.alterLoginStatus(false);
         // this.props.wrongCredentails(data.message);
       }
       this.props.alterLoginStatus(true);
       this.props.loggedInUser(data);

     })
     .catch(error => this.setState({ error }));
   }

   validateForm() {
     return this.state.username.length > 0 && this.state.password.length > 0;
   }

   handleChange = (event, field) => {
     debugger
     this.setState({
       [field]: event.target.value
     });
   }

   handleSubmit = event => {
     event.preventDefault();
     this.loginVerify();
   }

   render() {
     return (
       <div className="Login">
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
             Login
           </button>
         </form>

         <h2>Available Services: </h2>
         {
           this.props.serviceList.map(service => <div>{service.name}</div>)
         }
       </div>
     );
   }
}

const mapStateToProps = state => ({
  serviceList: state.userServiceReducer.serviceList,
})

const mapDispatchToProps = dispatch => (
  {
    alterLoginStatus: (status) => dispatch(alterLoginStatus(status)),
    loggedInUser: (user) => dispatch(loggedInUser(user)),

  }
)

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
