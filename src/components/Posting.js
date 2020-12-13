import React from "react";
import Form from "./Form.js";
import Button from 'react-bootstrap/Button'

class Posting extends React.Component {
  state = {
    formVisible: false,
  };

  toggleForm = () => {
    this.setState({ formVisible: !this.state.formVisible });
  };

  handleUpdate = (event, posting) => {
    console.log("Update in progress");
    this.props.handleUpdate(event, posting);
    this.toggleForm();
  };

  render() {
    const { posting, handleDelete } = this.props;

    return (
      <>
        {this.state.formVisible ? (
          <Form
            posting={posting}
            handleSubmit={this.handleUpdate}
            toggleForm={this.toggleForm}
          />
        ) : (
          <div className="posting">
            <h3>{posting.name}</h3>
            <h3>{posting.neighborhood}</h3>
            <h3>{posting.crime_type}</h3>
            <h3>{posting.cross_street}</h3>
            <p>{posting.short_desc}</p>
            <Button variant="dark" onClick={() => handleDelete(posting)}>Delete</Button>
            <Button variant="dark" onClick={this.toggleForm}>Edit</Button>
          </div>
        )}
      </>
    );
  }
}

export default Posting;
