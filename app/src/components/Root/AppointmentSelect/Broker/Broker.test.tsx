import { screen, render, fireEvent } from "@testing-library/react";

import Broker from "./Broker";

const testBroker = {
  name: "bob",
  id: 1,
  appointments: [{ brokerId: 1, date: "24/11/2021", id: 1 }],
};

describe("Broker Component", () => {
  test("should hide and show appointments on button click", () => {
    render(<Broker broker={testBroker} setAppointmentPreview={null}/>);

    const showAppointmentsButton = screen.getByTestId("broker-show-appointments-button");

    expect(showAppointmentsButton.textContent).toBeTruthy()
    expect(showAppointmentsButton.textContent).toBe('Show Appointments')

    fireEvent.click(showAppointmentsButton)

    const hideAppointmentsButton = screen.getByTestId("broker-hide-appointments-button");

    expect(hideAppointmentsButton).toBeTruthy()
    expect(hideAppointmentsButton.textContent).toBe('Hide Appointments')
  });

  test("Broker appointments are listed when the preview button is clicked.", () => {
    render(<Broker broker={testBroker} setAppointmentPreview={null}/>);

    // Elements
    const showAppointmentsButton = screen.getByTestId("broker-show-appointments-button");

    fireEvent.click(showAppointmentsButton)

    const appointmentsList = screen.getByTestId('broker-appointments-list')
    const appointmentItem = screen.getByTestId(`broker-appointment-list-item-${testBroker.appointments[0].id}`)
    const appointmentItemDate = screen.getByTestId(`broker-appointment-list-item-${testBroker.appointments[0].id}-date`)

    expect(appointmentsList).toBeTruthy()
    expect(appointmentItem).toBeTruthy()
    expect(appointmentItemDate.textContent).toBe(testBroker.appointments[0].date)
  });
});
