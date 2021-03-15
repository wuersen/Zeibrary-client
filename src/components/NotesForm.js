import React from 'react';
import axios from 'axios';
import './NotesForm.css';


class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: this.props.titleOfBook, note: '', reloadReviews: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
      console.log(this.state.title + "this is the line of the code")
  }


  handleChange(event) {
  this.setState({note: event.target.value});
}

    handleSubmit(event) {
      alert('An essay was submitted: ' + this.state.note);
      event.preventDefault();

      console.log("button clicked")
        // this.setState({booktitle: event.target.value});
        fetch('https://zeibrary.herokuapp.com/notes/' , {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(this.state)
  })
  .then((result) => result.json())
  .then((info) => { console.log(info); })
    }

 render() {

  return (
    <div className="">

      <form onSubmit={this.handleSubmit} className="form-container">
            <label>
              <textarea value={this.state.value} onChange={this.handleChange} className="textarea-form2"/>
            </label>
            <input type="Submit" value="Submit" />
          </form>

      </div>
  )
 }
}
export default NoteForm;
