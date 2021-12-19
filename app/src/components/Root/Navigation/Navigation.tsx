import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #e7e7e7;
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  padding: 24px 48px;
  box-shadow: 1px 1px 1px #b8b8b8;
  margin-bottom: 48px;
`;

export interface NavigationProps {
  activeAppointment: {
    broker: {
      name: string;
      id: number;
      appointments: { id: number; brokerId: number; date: string }[];
    };
    appointment: {
      id: number;
      brokerId: number;
      date: string
    }
  } | null
}

const Navigation = (props: NavigationProps) => {
  const appointmentDate = props.activeAppointment !== null ? (props?.activeAppointment?.appointment?.date) : ''
  const appointmentBroker = props.activeAppointment !== null ? props?.activeAppointment?.broker?.name : ''
  const appointmentMessage = props.activeAppointment !== null
      ? `Currently selected appointment: ${appointmentDate} with ${appointmentBroker}`
      : 'Please select your next appointment with Lendi.'

  return (
    <Wrapper>
      <strong>
        { appointmentMessage }
      </strong>
      <strong>Welcome to Lendi</strong>
    </Wrapper>
  );
};

export default Navigation;
