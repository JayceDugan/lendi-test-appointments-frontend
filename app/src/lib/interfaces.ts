export interface AppointmentInterface {
  id: number;
  brokerId: number;
  date: string;
}

export interface BrokerInterface {
  id: number;
  name: string;
  appointments: Array<AppointmentInterface>;
}

export interface AppointmentPreviewInterface {
  broker: BrokerInterface,
  appointment: AppointmentInterface
}

export interface AppointmentSelectPropsInterface {
  setActiveAppointment: (arg0: AppointmentPreviewInterface) => void;
}
