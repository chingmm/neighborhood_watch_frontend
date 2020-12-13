import React from "react";
import Input from "./Input.js";

class Form extends React.Component {
  state = {
    name: "",
    neighborhood: "",
    crime_type: "",
    short_desc: "",
    cross_street: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event) => {
    console.log("running");
    event.preventDefault();

    const { name, neighborhood, crime_type, short_desc, cross_street } = this.state;
    const posting = {
      name: name,
      neighborhood: neighborhood,
      crime_type: crime_type,
      short_desc: short_desc,
      cross_street: cross_street,
    };

    if (this.props.posting) posting.id = this.props.posting.id;

    this.props.handleSubmit(event, posting);
  };

  componentDidMount() {
    if (this.props.posting) {
      const { name, neighborhood, crime_type, short_desc, cross_street, id } = this.props.posting;
      this.setState({
        name: name || "",
        neighborhood: neighborhood || "",
        crime_type: crime_type || "",
        short_desc: short_desc || "",
        cross_street: cross_street || "",
        id: id || "",
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          handleChange={this.handleChange}
          name={"Your Name"}
          placeholder={"Your Name (Feel Free to say Anonymous)"}
          type={"text"}
          value={this.state.name}
          id={"name"}
        />
        <Input
          handleChange={this.handleChange}
          name={"Neighborhood"}
          placeholder={"ex: Bridgeport"}
          type={"text"}
          value={this.state.neighborhood}
          id={"neighborhood"}
        />
        <Input
          handleChange={this.handleChange}
          name={"Crime Type"}
          placeholder={"ex: Theft"}
          type={"text"}
          value={this.state.crime_type}
          id={"crime_type"}
        />
        <Input
          handleChange={this.handleChange}
          name={"Short Description"}
          placeholder={"Short Description of Event"}
          type={"text"}
          value={this.state.short_desc}
          id={"short_desc"}
        />
        <Input
          handleChange={this.handleChange}
          name={"Cross Street"}
          placeholder={"Cross Street"}
          type={"text"}
          value={this.state.cross_street}
          id={"cross_street"}
        />
        <div></div>
        <input className="submit-post"
          type="submit"
          value={this.props.posting ? "Update Post" : "Add Post"}
        />
      </form>
    );
  }
}

export default Form;
