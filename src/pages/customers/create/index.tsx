import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCustomer } from 'apiSdk/customers';
import { Error } from 'components/error';
import { customerValidationSchema } from 'validationSchema/customers';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { SalonInterface } from 'interfaces/salon';
import { getSalons } from 'apiSdk/salons';
import { CustomerInterface } from 'interfaces/customer';

function CustomerCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CustomerInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCustomer(values);
      resetForm();
      router.push('/customers');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CustomerInterface>({
    initialValues: {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      salon_id: (router.query.salon_id as string) ?? null,
    },
    validationSchema: customerValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Customer
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="first_name" mb="4" isInvalid={!!formik.errors?.first_name}>
            <FormLabel>First Name</FormLabel>
            <Input type="text" name="first_name" value={formik.values?.first_name} onChange={formik.handleChange} />
            {formik.errors.first_name && <FormErrorMessage>{formik.errors?.first_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="last_name" mb="4" isInvalid={!!formik.errors?.last_name}>
            <FormLabel>Last Name</FormLabel>
            <Input type="text" name="last_name" value={formik.values?.last_name} onChange={formik.handleChange} />
            {formik.errors.last_name && <FormErrorMessage>{formik.errors?.last_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="phone" mb="4" isInvalid={!!formik.errors?.phone}>
            <FormLabel>Phone</FormLabel>
            <Input type="text" name="phone" value={formik.values?.phone} onChange={formik.handleChange} />
            {formik.errors.phone && <FormErrorMessage>{formik.errors?.phone}</FormErrorMessage>}
          </FormControl>
          <FormControl id="email" mb="4" isInvalid={!!formik.errors?.email}>
            <FormLabel>Email</FormLabel>
            <Input type="text" name="email" value={formik.values?.email} onChange={formik.handleChange} />
            {formik.errors.email && <FormErrorMessage>{formik.errors?.email}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<SalonInterface>
            formik={formik}
            name={'salon_id'}
            label={'Select Salon'}
            placeholder={'Select Salon'}
            fetcher={getSalons}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'customer',
  operation: AccessOperationEnum.CREATE,
})(CustomerCreatePage);
