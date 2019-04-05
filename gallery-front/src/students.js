import React, { Component } from "react";
import SingleStudent from "./singleStudent";
import "./App.css";
import NavBar from "./navbar";
import AddStudent from "./AddStudent";
import AllStudents from "./allStudents";
import { Route, Switch, Redirect } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";

const ApiUrl = "/api/students";

//checking token
if (localStorage.jwtToken) {
  //set token in header authorization
  setAuthToken(localStorage.jwtToken);
  //Decode the token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and is Authenticated
  store.dispatch(setCurrentUser(decoded));
  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());
    //Clear the current profile
    store.dispatch(clearCurrentProfile());

    //Redirect to Login
    window.location.href = "/login";
  }
}

class Students extends Component {
  constructor(props) {
    super(props);

    this.state = { students: [] };
  }

  componentDidMount() {
    this.loadStudents();
  }
  loadStudents() {
    axios
      .arguments(ApiUrl)
      .then(res => res.json())
      .then(myJson => this.setState({ students: myJson }));
  }

  addStudent = val => {
    const formData = new FormData();
    for (let item in val) {
      console.log(item, val[item]);

      formData.append(item, val[item]);
    }

    axios({
      method: "POST",
      url: ApiUrl,
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
