import React from "react";
import { useState } from 'react'

export interface BrokerProps {
  broker: {
    name: string;
    id: number;
    appointments: { id: number; brokerId: number; date: string }[];
  };
  setAppointmentPreview: any,
}

const Broker = (props: BrokerProps) => {
  const [appointmentsVisible, setAppointmentsVisible] = useState(false);
  const toggleAppointments = () => setAppointmentsVisible(!appointmentsVisible);

  const buttonTestingID = appointmentsVisible
    ? 'broker-show-appointments-button'
    : 'broker-hide-appointments-button'

  return (
    <li>
      { props.broker.name }
      <br />
      appointments:

      {
        props.broker.appointments.length
        ? (
          <>
            <button
              onClick={toggleAppointments}
              data-testid={
                appointmentsVisible
                  ? 'broker-hide-appointments-button'
                  : 'broker-show-appointments-button'
              }
            >
              { appointmentsVisible ? 'Hide ' : 'Show ' }
              Appointments
            </button>
            { appointmentsVisible ? (
              <ul data-testingid="broker-appointments-list">
                { props.broker.appointments.map((appointment) => (
                  <li
                    key={`broker-${props.broker.id}-appointment-${appointment.id}`}
                    data-testingid="broker-appointment-list-item"
                  >
                    <p data-testingid="broker-appointment-list-item-date">
                      { appointment.date }
                    </p>
                    <button
                      data-testingid="broker-appointment-list-item-preview"
                      onClick={() => props.setAppointmentPreview({
                      broker: props.broker,
                      appointment
                    })
                    }>Preview</button>
                  </li>
                ))}
              </ul>
            ) : null }
          </>
        ) : (
          <p data-testingid="broker-no-appointments-message">
            { props.broker.name } currently has no appointments available.
          </p>
        )
      }

    </li>
  );
};

export default Broker;
