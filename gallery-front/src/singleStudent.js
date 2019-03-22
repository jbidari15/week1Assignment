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
    const { title, category, description, src, _id } = this.props.eachStudent;

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
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15855.442357983791!2d24.802977009256683!3d60.214984164714345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468df67f5517aac9%3A0xa00b553b98e2b00!2sLepp%C3%A4vaara!5e0!3m2!1sen!2sfi!4v1553246076216"
                      width="200"
                      height="200"
                      frameborder="0"
                      allowfullscreen
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
