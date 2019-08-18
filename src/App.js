import React, { Component} from 'react';
import { connect } from 'react-redux';
import './App.css';
import { simpleAction } from './modules/actions/simpleAction';

class App extends Component {
  simpleAction = (event) => {
    this.props.simpleAction();
  }

  render() {
    return (
      <div className = "App" >
        <header className = "App-header" >
          <h1 className = "App-title" > Welcome to React < /h1>
        </header>
        <p className = "App-intro" >
          To get started, edit < code > src / App.js < /code> and save to reload
        </p>
        <pre > { JSON.stringify(this.props) } </pre>
        <button onClick = {this.simpleAction} > Test redux action </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
