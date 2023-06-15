import * as yup from 'yup';
import { appointmentValidationSchema } from 'validationSchema/appointments';

export const customerValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string(),
  salon_id: yup.string().nullable().required(),
  appointment: yup.array().of(appointmentValidationSchema),
});
