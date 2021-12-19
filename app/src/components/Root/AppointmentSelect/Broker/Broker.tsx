import React from "react";
import { useState } from 'react'
import { AppointmentPreviewInterface } from '../../../../lib/interfaces';
import BrokerAppointmentsList from './BrokerAppointmentsList';

export interface BrokerProps {
  broker: {
    name: string;
    id: number;
    appointments: { id: number; brokerId: number; date: string }[];
  };
  setAppointmentPreview: (arg0: AppointmentPreviewInterface) => void,
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
              <BrokerAppointmentsList broker={props.broker} setAppointmentPreview={props.setAppointmentPreview} />
            ) : null }
          </>
        ) : (
          <p data-testid="broker-no-appointments-message">
            { props.broker.name } currently has no appointments available.
          </p>
        )
      }

    </li>
  );
};

export default Broker;
