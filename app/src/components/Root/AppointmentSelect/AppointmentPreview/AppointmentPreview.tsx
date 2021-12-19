import { AppointmentInterface } from '../../../../lib/interfaces';

export interface AppointmentPreviewPropsInterface {
  appointment: AppointmentInterface
}

const AppointmentPreview = (props: AppointmentPreviewPropsInterface) => {
  const { id, brokerId, date } = props.appointment
  const testingIdPrefix = `appointment-preview-item-${id}`

  return (
    <table data-testid="appointment-preview">
      <thead>
      <tr>
        <th>ID</th>
        <th>BrokerID</th>
        <th>Date</th>
      </tr>
      </thead>
      <tbody>
      <tr data-testid={ testingIdPrefix }>
        <td data-testid={testingIdPrefix.concat('-id')}>{ id }</td>
        <td data-testid={testingIdPrefix.concat('-brokerid')}>{ brokerId }</td>
        <td data-testid={testingIdPrefix.concat('-date')}>{ date }</td>
      </tr>
      </tbody>
    </table>
  )
}

export default AppointmentPreview
