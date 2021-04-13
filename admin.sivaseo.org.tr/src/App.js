import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import Login from './components/User/Login'
import ForgetPassword from './components/User/ForgetPassword'
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Logout from './components/User/Logout';
class App extends React.Component {

    constructor(){
      super()
      this.state = {
        auth:false
      }
    }

    componentDidMount(){
      if(!localStorage.getItem('auth-token')){
        this.setState({
          auth: true
        })
      }else{
        if(window.location.pathname == '/user/forget-password' || window.location.pathname == '/user/forget-password/'){
          this.setState({
            auth: true
          })
        }else{
          this.setState({
            auth: false
          })
        }
        
      }
      

    
    }



    render(){

      if(this.state.auth){
        return (
    
          <Router>
            <Switch>
              <Route path="/user/forget-password" exact component={ForgetPassword}></Route>
              <Route path="/user/login" exact component={Login}></Route>
              <Route path="/user/logout" exact component={Logout}></Route>
              <Route path="/" component={Home}></Route>
      
            </Switch>
          </Router>
        );
      }else{
        return(
          <Router>
            <Login />
          </Router>
        )
      }

      
    }
  
}

export default App;
