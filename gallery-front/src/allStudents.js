import React from "react";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const AllStudents = props => {
  return (
    <div className="allStudents">
      {/* <div className="container-fluid">
        <div className="row">{props.allStudents}</div>
      </div> */}
      {props.allStudents}
    </div>
  );
};
export default AllStudents;
