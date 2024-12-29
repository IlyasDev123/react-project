/* eslint-disable react/no-unescaped-entities */

import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import Card from 'shared/components/card';
import InputField from 'shared/components/form/inputField';
import Button from 'shared/components/button';
import Label from 'shared/components/form/label';
import { LoginUser } from 'shared/services/authService';
import { toastMessage } from 'shared/components/toast';
import { setUser } from 'src/shared/redux/reducers/userSlice';

export default function Index() {
  // const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      handleLogIn(values, setSubmitting);
    },
  });

  const handleLogIn = (values, setSubmitting) => {
    setSubmitting(true);
    LoginUser(values)
      .then(({ data }) => {
        let resp = {
          isLoggedIn: true,
          user: data?.data,
          token: data.data?.token,
          resetPassword: false,
        };
        dispatch(setUser(resp));
        setSubmitting(false);
        toastMessage('success', data.message);
        navigate('/dashboard'); //use constants
      })
      .catch((error) => {
        setSubmitting(false);
        toastMessage('error', error.response.data.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
      <Card customClass="p-6 shadow rounded-2xl bg-white md:w-1/4">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <p className="text-center text-gray-600 mb-6">
          Please enter your credentials to proceed.
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-6 px-4">
          <div>
            <Label title="Email" />
            <InputField
              type="text"
              placeholder="Enter your email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <Label title="Password" />
            <InputField
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              customClass="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 rounded"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Logging In...' : 'Login'}
            </Button>
          </div>
        </form>
        {/* <p className="text-center text-gray-600 py-2 mb-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500">
            Please register
          </Link>
        </p> */}
      </Card>
    </div>
  );
}
