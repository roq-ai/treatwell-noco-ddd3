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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getCustomerById, updateCustomerById } from 'apiSdk/customers';
import { Error } from 'components/error';
import { customerValidationSchema } from 'validationSchema/customers';
import { CustomerInterface } from 'interfaces/customer';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { SalonInterface } from 'interfaces/salon';
import { getSalons } from 'apiSdk/salons';

function CustomerEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<CustomerInterface>(
    () => (id ? `/customers/${id}` : null),
    () => getCustomerById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CustomerInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateCustomerById(id, values);
      mutate(updated);
      resetForm();
      router.push('/customers');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<CustomerInterface>({
    initialValues: data,
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
            Edit Customer
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'customer',
  operation: AccessOperationEnum.UPDATE,
})(CustomerEditPage);
