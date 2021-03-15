import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="">
        <header className="jumbotron">
        <img
       src="htt://static.thenounproject.com/png/363640-200.png"
       alt=""
       />
       <div className="container-container">
       <img
           src="https://static.thenounproject.com/png/363640-200.png"
           alt=""
           />
        <div className="overlay">
         <div className="text">Welcome {currentUser.username}!</div>
        </div>
       </div>
        </header>
        <p>
        <strong>Username:</strong>{" "}
       {currentUser.username}
        </p>
        <p>
          <strong>userId:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    );
  }
}
