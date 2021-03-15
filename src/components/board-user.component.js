import React from "react";
import axios from 'axios';
import Shelf from './Shelf.js';
import './User.css'

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

 class BoardUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined , content: "Hello", data: 'Hello People', title: '', authors: [], cover: '', description: '', booktitle: '', reviews: {
      reviews: '', title: ''
    }, book: {title: 'The Lord of the Rings', author: 'J. R. R. Tolkien'}
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitBackEnd = this.submitBackEnd.bind(this);
  }

  handleInput(event) {
        this.setState({booktitle: event.target.value});
        console.log(this.state)
    }

  componentWillMount() {

    const user = AuthService.getCurrentUser();
    // console.log(user)
    this.setState({currentUser: user.username})
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );

  }
  submitBackEnd() {
    this.setState({title: ''})
    this.setState({authors: []})
    this.setState({cover: ''})
    this.setState({description: ''})
  console.log("button clicked")
    // this.setState({booktitle: event.target.value});
    fetch('https://zeibrary.herokuapp.com/books/' , {
method: "POST",
headers: {
  'Content-type': 'application/json'
},
body: JSON.stringify(this.state)
})
.then((result) => result.json())
.then((info) => { console.log(info); })
}

  handleSubmit(event) {
    event.preventDefault();
    // this.props.onSubmit( this.state.query );

    const bookUrl = `https://www.googleapis.com/books/v1/volumes?q=title:${ this.state.booktitle }`
    axios(bookUrl).then((response) => {
       const info = (response.data)
       console.log(info)
       const titleResponse = info["items"][0]["volumeInfo"]["title"]
       const authorsResponse = info["items"][0]["volumeInfo"]["authors"]
       const descriptionResponse = info["items"][0]["volumeInfo"]["description"]
       const coverResponse = info["items"][0]["volumeInfo"]["imageLinks"]["thumbnail"]
         console.log(coverResponse)
         this.setState({cover: coverResponse});
         this.setState({title: titleResponse});
         this.setState({authors: authorsResponse});
         this.setState({description: descriptionResponse});
    }).catch((error) =>  console.log('no book by this name')
  )
  }


  render() {
    return (
      <div className="container">

       <div className="searchForm">

        <form onSubmit={this.handleSubmit} className="search-button">
          <label>
             <label className="font-weight-bolder">Search Available Books </label>

        <div className="searching-searching">
            <div className="searching">
             <input type="search" onInput={this.handleInput} required placeholder="Book Name ..." />
             </div>
          <input type="submit" value="Search" className="search-button p-0 bg-dark text-white "/>
          </div>
              </label>
    </form>

     <div className="search-result-section">
      <h1> {this.state.title} </h1>

          {this.state.authors ? this.state.authors.map((author) =>
            <h3 key={author}> {author} </h3>
          ) : this.state.data}
          <div className="display-response"> <p><small> {this.state.description}</small></p></div>
          {<img src={ this.state.cover } />}
    </div>
        {this.state.title ?
          <button type="button left" onClick={this.submitBackEnd} className="p-1 bg-dark text-white">Add to shelf</button>
          :null}
      </div>

      <div className="shelfDiv">
        <Shelf data = {this.state.data} />
        </div>
      </div>
    );
  }
}
export default BoardUser;
