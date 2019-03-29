import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

class SingleStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };
  render() {
    const {
      title,
      category,
      description,
      src,
      _id,
      lat,
      lng
    } = this.props.eachStudent;
    const mapLocation = `http://maps.google.com/maps?q=${lat}, ${lng}&z=15&output=embed`;
    return (
      <div>
        {this.state.modal ? (
          <div>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
              <ModalBody>
                <Card>
                  <div className="map">
                    <iframe
                      src={mapLocation}
                      style={{
                        scrolling: "no",
                        marginheight: "0",
                        marginwidth: "0"
                      }}
                    />
                  </div>
                  <CardImg top width="100%" src={src} alt="image" />
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        ) : (
          <Card>
            <CardImg
              top
              width="100%"
              src={src}
              alt="image"
              onClick={this.toggle}
            />

            <CardBody>
              <CardTitle>{title}</CardTitle>
              <CardSubtitle>{category}</CardSubtitle>
              <CardText>{description}</CardText>
              <Button onClick={this.toggle}>View</Button>
            </CardBody>
          </Card>
        )}
      </div>
    );
  }
}

export default SingleStudent;
