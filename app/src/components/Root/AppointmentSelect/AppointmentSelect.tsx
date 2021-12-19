import { useEffect, useState } from 'react';
import axios from "axios";
import styled from "styled-components";

import {
  AppointmentInterface,
  AppointmentPreviewInterface,
  AppointmentSelectPropsInterface,
  BrokerInterface,
} from '../../../lib/interfaces';
import { BrokerAppointmentsType } from '../../../lib/types';

import Broker from "./Broker";
import AppointmentPreview from './AppointmentPreview/AppointmentPreview';

const Wrapper = styled.div`
  display: flex;
`;

const SideBar = styled.div`
  width: 250px;
`;

const Heading = styled.strong.attrs({ role: "heading", level: 2 })`
  display: block;
  font-size: 20px;
`;

const AppointmentSelect = (props: AppointmentSelectPropsInterface) => {
  const [appointmentPreview, setAppointmentPreview] = useState<AppointmentPreviewInterface | null>(null)
  const [brokerAppointments, setBrokerAppointments] = useState<BrokerAppointmentsType>([])

  const requestBrokers = axios.get("http://localhost:8080/brokers").then(({ data }) => data);
  const requestAppointments = axios.get("http://localhost:8080/appointments").then(({ data }) => data);

  useEffect(function() {
    async function loadBrokersAndAppointments() {
      const [brokers, appointments] = await Promise.all([requestBrokers, requestAppointments])

      const mappedAppointments = brokers.map((broker: BrokerInterface): BrokerAppointmentsType => ({
        ...broker,
        // Disabled TS as recommendations suggest user defined type guards,
        // but while playing with solutions I didn't resolve the issue &
        // given my understanding of type guards is limited I couldn't be sure
        // that the final solution would even be reasonable in fixing the issue.
        // @ts-ignore
        appointments: appointments.filter((appointment: AppointmentInterface): Array<AppointmentInterface> => appointment.brokerId === broker.id)
      }));

      setBrokerAppointments(mappedAppointments)
    }

    loadBrokersAndAppointments()
  }, [])

  return (
    <Wrapper>
      <SideBar>
        <Heading>Amazing site</Heading>
        <ul>
          { brokerAppointments.map((broker: BrokerInterface) => (
            <Broker key={broker.id} broker={broker} setAppointmentPreview={setAppointmentPreview} />
          ))}
        </ul>
      </SideBar>
      <div>
        <Heading>Appointment details</Heading>

        {
          appointmentPreview !== null
          ? (
            <>
              <AppointmentPreview appointment={appointmentPreview.appointment} />
              <button onClick={() => props.setActiveAppointment(appointmentPreview)}>
                Select Appointment
              </button>
            </>
          ) : null
        }
      </div>
    </Wrapper>
  );
};

export default AppointmentSelect;
