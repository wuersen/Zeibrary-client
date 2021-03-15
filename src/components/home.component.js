import React, { Component } from "react";

import UserService from "../services/user.service";
import './home.component.css'
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
      <h1> <span class="d-block p-2 bg-dark text-white mx-auto" style={{ display: "flex", justifyContent: "center", fontSize: 45 }}>{this.state.content}</span> </h1>
</header>
      <img
					src="https://pbs.twimg.com/media/EomvmqyU8AA_TiV?format=jpg&name=medium"
          alt=""
          className="home-image"/>



      </div>
    );
  }
}
