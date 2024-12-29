import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from 'shared/components/form/inputField';
import Button from 'shared/components/button';
import Label from 'shared/components/form/label';
import Card from 'shared/components/card';
import { toastMessage } from 'shared/components/toast';
import { updateProfile } from 'shared/services/userService';
import { setAuth } from 'src/shared/redux/reducers/authSlice';

export default function Profile() {
  const { user } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    name: Yup.string().required('Name is required'),
  });
  const initialValues = { name: user?.user?.name, email: user?.user?.email };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleUpdateProfile(values, setSubmitting);
    },
  });

  const handleUpdateProfile = (values, setSubmitting) => {
    updateProfile(values)
      .then(({ data: { data, message } }) => {
        toastMessage('success', message);
        dispatch(setAuth({ user: data }));
      })
      .catch((error) => {
        toastMessage('error', error?.response?.data?.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Card customClass="bg-white rounded-lg">
      <form onSubmit={formik.handleSubmit} className="space-y-6 px-4">
        <div>
          <Label title="Name" />
          <InputField
            type="text"
            placeholder="Enter your name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500">{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <Label title="Email" />
          <InputField
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            isDisabled={true}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            customClass="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 rounded mb-4"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Procesing...' : 'Update'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
