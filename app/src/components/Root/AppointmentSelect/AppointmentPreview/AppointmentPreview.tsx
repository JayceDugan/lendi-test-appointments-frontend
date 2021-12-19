import { AppointmentInterface } from '../../../../lib/interfaces';

export interface AppointmentPreviewPropsInterface {
  appointment: AppointmentInterface
}

const AppointmentPreview = (props: AppointmentPreviewPropsInterface) => {
  return (
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
        <td>{ props.appointment.id }</td>
        <td>{ props.appointment.brokerId }</td>
        <td>{ props.appointment.date }</td>
      </tr>
      </tbody>
    </table>
  )
}

export default AppointmentPreview
