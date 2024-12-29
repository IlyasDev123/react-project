import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line react-refresh/only-export-components
export const toastMessage = (type, msg) => {
  if (type === 'success') {
    toast.success(msg, {
      position: 'top-right',
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      hideProgressBar: true,
    });
  } else {
    toast.error(msg, {
      position: 'top-right',
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      hideProgressBar: true,
      theme: 'colored',
    });
  }
};
export default function Toast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
