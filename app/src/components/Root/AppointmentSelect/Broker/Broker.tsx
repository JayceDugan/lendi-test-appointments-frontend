import React from "react";

export interface BrokerProps {
  broker: {
    name: string;
    id: number;
    appointments: { id: number; brokerId: number; date: string }[];
  };
}

const Broker = (props: BrokerProps) => {
  return (
    <li>
      { props.broker.name }
      <br />
      appointments:
      <button>Hide appointments</button>
      <ul>
        { props.broker.appointments.map((appointment) => (
          <li>{ appointment.date }</li>
        ))}
      </ul>
    </li>
  );
};

export default Broker;
