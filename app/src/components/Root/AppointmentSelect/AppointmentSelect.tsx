import axios from "axios";
import styled from "styled-components";

import Broker from "./Broker";
import { useEffect, useState } from 'react';

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

type BrokerAppointments = {
  id: number;
  name: string;
  appointments: { id: number; brokerId: number; date: string }[];
}[];

export interface AppointmentSelectProps {
  setActiveAppointment: any
}

const AppointmentSelect = (props: AppointmentSelectProps) => {
  const [appointmentPreview, setAppointmentPreview] = useState(null)
  const [brokerAppointments, setBrokerAppointments] = useState<BrokerAppointments>([])
  const requestBrokers = axios.get("http://localhost:8080/brokers").then(({ data }) => data);
  const requestAppointments = axios.get("http://localhost:8080/appointments").then(({ data }) => data);

  useEffect(function() {
    async function init() {
      const [brokers, appointments] = await Promise.all([requestBrokers, requestAppointments])
      const mappedAppointments = brokers.map((broker) => ({
        ...broker,
        // @ts-ignore
        appointments: appointments.filter((appointment) => appointment.brokerId === broker.id)
      }));

      setBrokerAppointments(mappedAppointments)
    }

    init()
  }, [])

  return (
    <Wrapper>
      <SideBar>
        <Heading>Amazing site</Heading>
        <ul>
          { brokerAppointments.map((broker) => (
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
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>BrokerID</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{ appointmentPreview.appointment.id }</td>
                  <td>{ appointmentPreview.appointment.brokerId }</td>
                  <td>{ appointmentPreview.appointment.date }</td>
                </tr>
                </tbody>
              </table>

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
