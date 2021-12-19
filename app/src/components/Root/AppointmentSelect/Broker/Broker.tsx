import React from "react";
import { useState } from 'react'

export interface BrokerProps {
  broker: {
    name: string;
    id: number;
    appointments: { id: number; brokerId: number; date: string }[];
  };
}

const Broker = (props: BrokerProps) => {
  const [appointmentsVisible, setAppointmentsVisible] = useState(false);
  const toggleAppointments = () => setAppointmentsVisible(!appointmentsVisible);

  return (
    <li>
      { props.broker.name }
      <br />
      appointments:

      <button onClick={toggleAppointments}>
        { appointmentsVisible ? 'Hide ' : 'Show ' }
        Appointments
      </button>
      { appointmentsVisible ? (
        <ul>
          { props.broker.appointments.map((appointment) => (
            <li>{ appointment.date }</li>
          ))}
        </ul>
      ) : null }
    </li>
  );
};

export default Broker;
