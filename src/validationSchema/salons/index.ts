import * as yup from 'yup';
import { appointmentValidationSchema } from 'validationSchema/appointments';
import { customerValidationSchema } from 'validationSchema/customers';

export const salonValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  appointment: yup.array().of(appointmentValidationSchema),
  customer: yup.array().of(customerValidationSchema),
});
