import React, { Component} from 'react';
import { connect } from 'react-redux';
import { alterLoginStatus, loggedInUser, tokenSetter } from '../actions/allAction';
import urls from '../constants/AppContants';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

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
       }else{
         this.props.alterLoginStatus(true);
         this.props.loggedInUser(data);
         this.props.tokenSetter(this.state.username + ":" + this.state.password);
       }

     })
     .catch(error => this.setState({ error }));
   }

   validateForm() {
     return this.state.username.length > 0 && this.state.password.length > 0;
   }

   handleChange = event => {
     this.setState({
       [event.target.id]: event.target.value
     });
   }

   handleSubmit = event => {
     event.preventDefault();
     this.loginVerify();
   }

   render() {
     return (
       <div className="form-fields">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <FormLabel>User Name</FormLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
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
    tokenSetter: (saveUser) => dispatch(tokenSetter(saveUser)),

  }
)

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
