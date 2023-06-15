import * as yup from 'yup';

export const appointmentValidationSchema = yup.object().shape({
  date_time: yup.date().required(),
  customer_id: yup.string().nullable().required(),
  stylist_id: yup.string().nullable().required(),
  salon_id: yup.string().nullable().required(),
});
