// // App.js
// //
// import React, { Component } from 'react';
// import './App.css';
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       flower: {}
//     }
//     this.getFlower();
//   }
//   getFlower() {
//     fetch('/flower')
//       .then(response => response.json())
//       .then(data => {
//         this.setState({
//           flower: data
//         });
//       });
//   }
//   render() {
//     return (
//       <div className="App">
//         <h1>{this.state.flower.name}</h1>
//         <p>{this.state.flower.colour}</p>
//       </div>
//     );
//   }
// }
// export default App;

import React, { Component } from "react";
import "./assets/css/material-dashboard-react.css";
import {
  BrowserRouter as Router
} from "react-router-dom";
import { connect } from "react-redux";
import NavBar from "./components/Navigation/Navbar";
import Sidebar from "./components/Navigation/Sidebar";
import MainPage from "./views/MainPage";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const mapStateToProps = state => {
  return {
    menuOpen: state.app.menuOpen
  };
};
class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      version: "0",
      width: 0,
      marginLeft: 220
    };
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    let w = window.innerWidth;
    if (w >= 600) {
      w -= 200;
      this.setState({ width: w, marginLeft: 220, innerWidth: window.innerWidth });
    }
    else {
      this.setState({ width: w, marginLeft: 0, innerWidth: window.innerWidth });
    }
  }

  render() {
    return (
      <Router>
        {this.props.menuOpen ? 
          <Box display={{ xs: 'none', sm: 'inline' }} className="Sidebar">
            <Sidebar className="" logoText={"Author's Notebook"} />
          </Box>
        : "" }
        <Grid container>
          <Grid item xs={12}
            style={{ 
              marginLeft: `${this.props.menuOpen ? this.state.marginLeft : 0}px`, 
              width: `${this.props.menuOpen ? this.state.width : this.state.innerWidth}px` 
            }}>
            <NavBar />
          </Grid>
          <Grid item xs={12}
            style={{ 
              marginLeft: `${this.props.menuOpen ? this.state.marginLeft + 10 : 10}px`, 
              width: `${this.props.menuOpen ? this.state.width - 20 : this.state.innerWidth - 20}px`,
              marginRight: "10px",
              marginTop: "10px" 
            }}>
            <MainPage />
          </Grid>
        </Grid>
      </Router>
    );
  }
}

const App = connect(mapStateToProps)(AppLayout);
export default App;
