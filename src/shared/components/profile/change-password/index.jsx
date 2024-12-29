import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import InputField from 'shared/components/form/inputField';
import Button from 'shared/components/button';
import Label from 'shared/components/form/label';
import Card from 'shared/components/card';
import { toastMessage } from 'shared/components/toast';
import { changePassword } from 'shared/services/userService';

export default function ChangePassword() {
  const [formValues] = useState({
    old_password: '',
    password: '',
    password_confirmation: '',
  });

  const validationSchema = Yup.object().shape({
    old_password: Yup.string().required('Old password is required'),
    password: Yup.string().required('Password is required'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: formValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      handleChangePassword(values, setSubmitting, resetForm);
    },
  });

  const handleChangePassword = (values, setSubmitting, resetForm) => {
    changePassword(values)
      .then(({ data: { message } }) => {
        toastMessage('success', message);
        resetForm(); // Reset the form on success
      })
      .catch((error) => {
        toastMessage('error', error?.response?.data?.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Card customClass="bg-white mt-4">
      <form onSubmit={formik.handleSubmit} className="space-y-6 px-4">
        {/* Old Password */}
        <div>
          <Label title="Old Password" />
          <InputField
            type="password"
            placeholder="Enter your old password"
            name="old_password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.old_password}
          />
          {formik.touched.old_password && formik.errors.old_password && (
            <div className="text-red-500">{formik.errors.old_password}</div>
          )}
        </div>
        <div>
          <Label title="New Password" />
          <InputField
            type="password"
            placeholder="Enter your Password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500">{formik.errors.password}</div>
          )}
        </div>
        <div>
          <Label title="Confirm Password" />
          <InputField
            type="password"
            placeholder="Confirm your password"
            name="password_confirmation"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password_confirmation}
          />
          {formik.touched.password_confirmation &&
            formik.errors.password_confirmation && (
              <div className="text-red-500">
                {formik.errors.password_confirmation}
              </div>
            )}
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            customClass="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 rounded mb-4"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Processing...' : 'Update'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
