import PropTypes from 'prop-types';

const Modal = ({
  children = null,
  showModal,
  closeModal,
  title,
  content = '',
  buttonText,
  buttonClass,
  buttonClick,
  isDiabled,
}) => {
  return (
    <div
      className={
        showModal
          ? 'fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto'
          : 'hidden'
      }
    >
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md mx-auto my-6">
            <div className="bg-white rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-2xl font-semibold">{title}</h3>
                <button
                  onClick={() => closeModal()}
                  className="p-1 ml-auto bg-transparent border-0 text-gray-700 opacity-75 hover:text-black text-3xl leading-none font-semibold outline-none focus:outline-none"
                >
                  <span className="block">&#10005;</span>
                </button>
              </div>
              <div className="p-6 flex-auto">
                <p className="my-4 text-gray-600 text-lg">{content}</p>
                {children}
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                <button
                  onClick={buttonClick}
                  className={`font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-4 transition duration-300 ease-in-out ${buttonClass}`}
                  type="button"
                  disabled={isDiabled}
                >
                  {isDiabled ? 'Deleting...' : buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  buttonText: PropTypes.string,
  buttonClass: PropTypes.string,
  buttonClick: PropTypes.func,
  isDiabled: PropTypes.bool,
  children: PropTypes.node,
};

export default Modal;
