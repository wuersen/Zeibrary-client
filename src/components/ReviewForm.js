import React from 'react';
import axios from 'axios';
import './ReviewForm.css';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: '', title: this.props.data, review: '', reloadReviews: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
      console.log(this.state.title + "this is the line of the code")
  }


  handleChange(event) {
  this.setState({review: event.target.value});
}

    handleSubmit(event) {
      alert('An essay was submitted: ' + this.state.review);
      event.preventDefault();

      console.log("button clicked")
        // this.setState({booktitle: event.target.value});
        fetch('https://zeibrary.herokuapp.com/reviews/' , {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(this.state)
  })
  .then((result) => result.json())
  .then((info) => { console.log(info); }).then((e) => this.setState({review: ''}))
    }

componentDidMount(){
  const user = AuthService.getCurrentUser();
  const theUser = user.username
  console.log(theUser)
  this.setState({currentUser: theUser})
  console.log(this.state.currentUser)
}
 render() {

  return (
  <div className="">


  <form onSubmit={this.handleSubmit} className="form-container">
        <label>
        <textarea value={this.state.value} onChange={this.handleChange} className="textarea-form"/>
        </label>
         <input type="Submit" value="Submit" />
      </form>
  </div>
  )
 }
}
export default ReviewForm;
