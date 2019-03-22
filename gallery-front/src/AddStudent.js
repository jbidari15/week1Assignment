import React, { Component } from "react";

import { Button, Form, FormGroup, Label, Input, Jumbotron } from "reactstrap";

class AddStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      category: "",
      src: null,
      alt: "",
      description: ""
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.addStudent(this.state);
    e.target.reset();
    this.props.history.push("/");
  };

  fileHandler = e => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };

  render() {
    return (
      <div className="formWrapper">
        <div className="jumbotronDiv">
          <Jumbotron className="manageJumbotron">
            <h1>New Spy Event</h1>
          </Jumbotron>
        </div>
        <div className="formDiv">
          <Form className="manageForm" onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input
                id="category"
                type="text"
                name="category"
                value={this.state.category}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="title">Title </Label>

              <Input
                type="text"
                id="title"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                id="description"
                type="textarea"
                name="description"
                cols="15"
                rows="5"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="src">Image</Label>

              <Input
                type="file"
                id="src"
                name="src"
                placeholder="Image"
                onChange={this.fileHandler}
                required
              />
            </FormGroup>
            <Button className="submitButton">Submit</Button>{" "}
          </Form>
        </div>
      </div>
    );
  }
}

export default AddStudent;
