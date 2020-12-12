import React from "react";
import Aside from "./components/Aside";
import Header from "./components/Header";
import Main from "./components/Main";

class App extends React.Component {
  state = {
    postings: [],
  };

  handleAdd = (event, formInputs) => {
    event.preventDefault();
    fetch("http://localhost:3000/postings", {
      body: JSON.stringify(formInputs),
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((createdPosting) => createdPosting.json())
      .then((jsonedPosting) => {
        // add posting to postings
        this.setState({
          postings: [jsonedPosting, ...this.state.postings],
        });
      })
      .catch((error) => console.log(error));
  };

  handleDelete = (deletedPosting) => {
    fetch(`http://localhost:3000/postings/${deletedPosting.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((json) => {
        const postings = this.state.postings.filter(
          (posting) => posting.id !== deletedPosting.id
        );
        this.setState({ postings });
      })
      .catch((error) => console.log(error));
  };

  handleUpdate = (event, formInputs) => {
    event.preventDefault();
    console.log("in it to win it");
    fetch(`http://localhost:3000/postings/${formInputs.id}`, {
      body: JSON.stringify(formInputs),
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((updatedPosting) => {
        // go wild
        this.getPostings();
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.getPostings();
  }

  getPostings = () => {
    fetch("http://localhost:3000/postings")
      .then((response) => response.json())
      .then((json) => this.setState({ postings: json }))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <Aside handleSubmit={this.handleAdd} />
          <Main
            postings={this.state.postings}
            handleDelete={this.handleDelete}
            handleUpdate={this.handleUpdate}
          />
        </div>
      </div>
    );
  }
}

export default App;
