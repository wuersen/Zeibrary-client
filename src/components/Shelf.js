import React from 'react';
import axios from 'axios';
import './Shelf.css'
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import ReviewsNotesPage from './ReviewsNotesPage.js'
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

class Shelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: null, bookid: null , shelfBooks: [], };
      this.handleBackEnd = this.handleBackEnd.bind(this);
      this.deleteBook = this.deleteBook.bind(this);
  }


  handleBackEnd() {
    console.log("getting stuff from API")
      // this.setState({booktitle: event.target.value});
      const baseUrl = "https://zeibrary.herokuapp.com/books/"
      axios(baseUrl).then((response) => {
         const info = (response.data)
         console.log(info)
         this.setState({shelfBooks: info})
         // console.log(this.state.shelfBooks)
      })
  }

  componentWillMount(val){
    const user = AuthService.getCurrentUser();
    // console.log(user)
    this.setState({currentUser: user.username})
    setInterval(this.handleBackEnd, 2000)
    this.handleBackEnd()
  }

  componentDidMount(){
    // this.handleBackEnd();
    const user = AuthService.getCurrentUser();
    // console.log(user)
    this.setState({currentUser: user.username})
    setInterval(this.handleBackEnd, 2000)

  }
paramsbook(e){

  console.log(e.currentTarget.innerHTML)
}
deleteBook(e){
const bookId = e.target.getAttribute('value')

  // const baseUrl = ``
  window.confirm(
      "Are you sure you wish to delete this book from your Shelf?"
    ) && axios.delete(`https://zeibrary.herokuapp.com/books/${bookId}`)
        .then(res => {
          console.log(res);
          console.log(res.data);

        }).then(() => {
          const books = this.state.shelfBooks.filter(item => item._id !== bookId)
          this.setState({shelfBooks: books})
          console.log('deleted')
        })
}

 render() {

   const listBooks = this.state.shelfBooks.map((book) =>

     (

       <li key={book._id} className="Book">

       <a href={'/reviews/'+book._id} onClick={this.paramsbook.bind(this)} style={{background: book.cover}}>{book.title}</a>
       <button onClick={(e) => this.deleteBook(e)} className="deleteBook" value = {book._id}> x </button>


       </li>

     )
   )
   console.log(listBooks)

  return (
  <div className="shelfContainer">
    <h1> <span className="d-block p-2 bg-dark text-white mx-auto" style={{ display: "flex", justifyContent: "center", fontSize: 45 }}> Book Shelf </span> </h1>


    <div className="bookShelf">
       <ul className="">
      {listBooks}
      </ul>
    </div>
    <Switch>
         <Route path="/ReviewsNotesPage/id" children={<ReviewsNotesPage />} />
       </Switch>
  </div>
  )
 }
}
export default Shelf;

// <button type="button" onClick={this.handleBackEnd}>Check Shelf</button>
//
// {this.props.data}
