import React, { Component } from "react";
import SingleStudent from "./singleStudent";
import "./App.css";
import NavBar from "./navbar";
import AddStudent from "./AddStudent";
import AllStudents from "./allStudents";
import { Route, Switch, Redirect } from "react-router-dom";

const ApiUrl = "/api/students";

class Students extends Component {
  constructor(props) {
    super(props);

    this.state = { students: [] };
  }

  componentDidMount() {
    this.loadStudents();
  }
  loadStudents() {
    fetch(ApiUrl)
      .then(res => res.json())
      .then(myJson => this.setState({ students: myJson }));
  }

  addStudent = val => {
    const formData = new FormData();
    for (let item in val) {
      console.log(item, val[item]);

      formData.append(item, val[item]);
    }

    fetch(ApiUrl, {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => this.setState({ students: [...this.state.students, data] }))
      .catch(error => console.error("Error:", error))
      .then(response => ("Success:", response));
  };

  render() {
    console.log(this.state.students);
    const allStudents = this.state.students.map(eachStudent => (
      <SingleStudent
        key={eachStudent._id}
        eachStudent={eachStudent}
        findStudent={this.findStudent}
      />
    ));
    return (
      <div className="mainComponentWrapper">
        <div className="mainComponent">
          <NavBar />
          {/* <div>
            <iframe
              width="600"
              height="450"
              frameborder="0"
              src="https://www.google.com/maps/embed/v1/undefined?origin=...&q=...&destination=...&center=...&zoom=...&key=..."
              allowfullscreen
            />

          </div> */}

          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/integrify/students" />}
            />
            <Route
              exact
              path="/integrify/students"
              render={() => <AllStudents allStudents={allStudents} />}
            />
            <Route
              path="/integrify/students/new"
              render={props => (
                <AddStudent addStudent={this.addStudent} {...props} />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Students;
