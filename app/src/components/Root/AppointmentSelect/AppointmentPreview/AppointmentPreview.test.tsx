import { screen, render, fireEvent } from '@testing-library/react';

import AppointmentPreview from './AppointmentPreview';

const testAppointment = {
  brokerId: 1,
  date: '24/11/2021',
  id: 1,
};

describe('Appointment Preview component', () => {
  test('Renders expected appointment data', () => {
    render(<AppointmentPreview appointment={testAppointment} />);

    const appointmentPreview = screen.getByTestId('appointment-preview');
    const appointmentPreviewItem = screen.getByTestId(`appointment-preview-item-${testAppointment.id}`);
    const appointmentPreviewItemID = screen.getByTestId(`appointment-preview-item-${testAppointment.id}-id`);
    const appointmentPreviewItemBrokerID = screen.getByTestId(`appointment-preview-item-${testAppointment.id}-brokerid`);
    const appointmentPreviewItemDate = screen.getByTestId(`appointment-preview-item-${testAppointment.id}-date`);

    expect(appointmentPreview).toBeTruthy();
    expect(appointmentPreviewItem).toBeTruthy();
    expect(appointmentPreviewItemID.textContent).toBe(String(testAppointment.id));
    expect(appointmentPreviewItemDate.textContent).toBe(testAppointment.date);
    expect(appointmentPreviewItemBrokerID.textContent).toBe(String(testAppointment.brokerId));
  });
});
