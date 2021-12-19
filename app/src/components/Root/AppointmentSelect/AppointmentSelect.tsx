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

const AppointmentSelect = () => {
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
        TODO: populate brokers
        <ul>
          { brokerAppointments.map((broker) => (
            <Broker key={broker.id} broker={broker} />
          ))}
        </ul>
      </SideBar>
      <div>
        <Heading>Appointment details</Heading>
        TODO: get appointment details when clicking on one from the left side
      </div>
    </Wrapper>
  );
};

export default AppointmentSelect;
