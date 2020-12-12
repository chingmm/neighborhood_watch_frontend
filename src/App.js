import React from "react";
import TopMain from "./components/TopMain";
import Header from "./components/Header";
import Main from "./components/Main";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

class App extends React.Component {
  state = {
    postings: [],
  };

  handleAdd = (event, formInputs) => {
    event.preventDefault();
    fetch("https://community-watch-backend.herokuapp.com/postings", {
      body: JSON.stringify(formInputs),
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((createdPosting) => createdPosting.json())
      .then((jsonedPosting) => {
        this.setState({
          postings: [jsonedPosting, ...this.state.postings],
        });
      })
      .catch((error) => console.log(error));
  };

  handleDelete = (deletedPosting) => {
    fetch(`https://community-watch-backend.herokuapp.com/postings/${deletedPosting.id}`, {
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
    fetch(`https://community-watch-backend.herokuapp.com/postings/${formInputs.id}`, {
      body: JSON.stringify(formInputs),
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((updatedPosting) => {
        this.getPostings();
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.getPostings();
  }

  getPostings = () => {
    fetch("https://community-watch-backend.herokuapp.com/postings")
      .then((response) => response.json())
      .then((json) => this.setState({ postings: json }))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    return (
      <div className="App">
        <Container fluid>
          <Row>
          <Header />
          <TopMain handleSubmit={this.handleAdd} />
          <Main
            postings={this.state.postings}
            handleDelete={this.handleDelete}
            handleUpdate={this.handleUpdate}
          />
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
