import React from 'react';
import { StyledPromoForm } from './PromoForm.styles';
import { PromoFormProps, PromoFormValues } from './PromoForm.types';
import TextField from 'components/TextField';
import Button from 'components/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const PromoForm: React.FC<PromoFormProps> = ({
  onSubmit,
  ...restProps
}) => {
  const {
    handleSubmit,
    handleBlur,
    errors,
    touched,
    handleChange,
    values,
  } = useFormik<PromoFormValues>({
    initialValues: {
      code: '',
    },
    validationSchema: Yup.object().shape({
      code: Yup.string().required('Please enter a promo code'),
    }),
    onSubmit: (vals, { resetForm }) => {
      if (onSubmit) {
        onSubmit(vals);
        resetForm();
      }
    },
  });

  return (
    <StyledPromoForm onSubmit={handleSubmit} {...restProps}>
      <TextField
        name="code"
        label="Promo code"
        error={touched?.code && errors?.code ? errors.code : ''}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.code}
      />
      <Button type="submit">Apply promo</Button>
    </StyledPromoForm>
  );
};

export default PromoForm;
