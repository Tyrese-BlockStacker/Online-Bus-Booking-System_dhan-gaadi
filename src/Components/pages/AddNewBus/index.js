import React, { Component } from "react";
import FormAdditionalDetails from "./FormAdditionalDetails";
import FormPrimaryDetails from "./FormPrimaryDetails";
import Confirm from "./Confirm";
import Success from "./Success";

class AddNewBus extends Component {
  state = {
    step: 1,
    name: "",
    type: "Normal",
    busNumber: "",
    fare: "",
    features: "",
    description: "",
    seatsAvailable: "",
    numberOfSeats: "",
    departure_time: "",
    isAvailable: false,
    startLocation: "",
    endLocation: "",
    journeyDate: "",
    boardingPoints: "",
    droppingPoints: "",
    image: "",
    buttonStyle: "block",
    formData: ""
  };

  componentDidMount() {
    this.setState({
      formData: new FormData()
    });
  }

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    let value;
    if (input === "image") {
      if (e.length === 0) {
        return this.setState({ buttonStyle: "block" });
      }

      value = e[0];
      this.setState({ buttonStyle: "none" });
    } else {
      value = e.target.value;
    }

    this.state.formData.set(input, value);

    this.setState({ [input]: value });
  };

  // Handle checkbox change
  handleCheckbox = () => {
    this.setState({ isAvailable: !this.state.isAvailable });
  };

  render() {
    const { step } = this.state;

    console.log(this.state);

    const {
      name,
      type,
      busNumber,
      fare,
      features,
      description,
      seatsAvailable,
      numberOfSeats,
      image,
      departure_time,
      isAvailable,
      startLocation,
      endLocation,
      journeyDate,
      boardingPoints,
      droppingPoints,
      buttonStyle,
      formData
    } = this.state;

    const values = {
      name,
      type,
      busNumber,
      fare,
      features,
      description,
      seatsAvailable,
      numberOfSeats,
      image,
      departure_time,
      isAvailable,
      startLocation,
      endLocation,
      journeyDate,
      boardingPoints,
      droppingPoints,
      buttonStyle,
      formData
    };

    switch (step) {
      case 1:
        return (
          <FormPrimaryDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            handleCheckbox={this.handleCheckbox}
            values={values}
          />
        );
      case 2:
        return (
          <FormAdditionalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleCheckbox={this.handleCheckbox}
            values={values}
          />
        );
      case 3:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
            handleChange={this.handleChange}
          />
        );
      case 4:
        return <Success values={values} formData={formData} />;
      default:
        return <h3>Error</h3>;
    }
  }
}

export default AddNewBus;
