import Card from '../../shared/components/card';
import InputField from '../../shared/components/form/inputField';
import Button from '../../shared/components/button';
import Label from '../../shared/components/form/label';
import { Link } from 'react-router-dom';

export default function index() {
  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Card customClass="p-6 shadow rounded-2xl bg-white w-1/4">
          <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
          <p className="text-center text-gray-600 mb-6">
            Please enter your details to proceed.
          </p>
          <form className="space-y-4">
            <div>
              <Label title="User Name" />
              <InputField type="text" placeholder="Enter your username" />
            </div>

            <div>
              <Label title="Email" />
              <InputField type="email" placeholder="Enter your email" />
            </div>

            <div>
              <Label title="Password" />
              <InputField
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <Label title="Confirm Password" />
              <InputField
                type="password"
                id="password"
                placeholder="Enter your confirm password"
              />
            </div>
            <div className="flex justify-end p-4">
              <Button customClass="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
                Login
              </Button>
            </div>
            <p className="text-center text-gray-600 py-2">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500">
                Please login
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
