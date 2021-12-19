import React from 'react';
import { BrokerInterface, AppointmentInterface, AppointmentPreviewInterface } from '../../../../lib/interfaces';

export interface BrokerAppointmentsListProps {
  broker: BrokerInterface,
  setAppointmentPreview: (arg0: AppointmentPreviewInterface) => void;
}

const BrokerAppointmentsList = (props: BrokerAppointmentsListProps) => {
  return (
    <ul data-testid="broker-appointments-list">
      { props.broker.appointments.map((appointment: AppointmentInterface) => (
        <li
          key={`broker-${props.broker.id}-appointment-${appointment.id}`}
          data-testid={`broker-appointment-list-item-${appointment.id}`}
        >
          <p data-testid={`broker-appointment-list-item-${appointment.id}-date`}>
            { appointment.date }
          </p>
          <button
            data-testid="broker-appointment-list-item-preview"
            onClick={() => props.setAppointmentPreview({
              broker: props.broker,
              appointment
            })
            }>Preview</button>
        </li>
      ))}
    </ul>
  )
}

export default BrokerAppointmentsList;
