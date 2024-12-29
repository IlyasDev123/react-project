import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import InputField from 'shared/components/form/inputField';
import Label from 'shared/components/form/label';
import Button from 'shared/components/button';
import { CategoriesValidationSchema } from 'shared/utils/validation';
import { toastMessage } from '../../toast';
import Modal from '../../modal';
import {
  createCategory,
  updateCategory,
} from 'src/shared/services/categoryService';
import PropsType from 'prop-types';

const Index = ({ updateCategoryList, showAddModal, closeModal, category }) => {
  const [title, setTitle] = useState('Add Category');

  const initialValues = {
    name: '',
    type: 1,
    status: true,
  };

  const {
    resetForm,
    values,
    setSubmitting,
    isSubmitting,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
  } = useFormik({
    enableReinitialize: true,
    validationSchema: CategoriesValidationSchema,
    initialValues: initialValues,
    onSubmit: () => {
      handleSubmitCategory();
    },
  });

  useEffect(() => {
    if (showAddModal) {
      if (category !== null) {
        setFieldValue('name', category.name);
        setFieldValue('type', category.type);
        setFieldValue('status', category.status);
        setTitle('Update Category');
      }
    } else {
      onClear();
    }
  }, [category, showAddModal]);

  const handleSubmitCategory = () => {
    setSubmitting(true);
    const formData = {
      name: values.name,
      type: values.type,
      status: true,
    };

    const submitForm =
      category !== null && category !== undefined
        ? updateCategory(category.id, formData)
        : createCategory(formData);

    submitForm
      .then(({ data: { data, message } }) => {
        toastMessage('success', message);
        closeModal();
        updateCategoryList(data);
        onClear();
      })
      .catch((error) => {
        toastMessage('error', error?.response?.data?.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const onClear = () => {
    resetForm();
    setTitle('Add Category');
  };

  return (
    <Modal showModal={showAddModal} closeModal={closeModal} title={title}>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label title="Title" />
          <InputField
            type="text"
            placeholder="Enter title"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {touched.title && errors.title && (
            <div className="text-red-500">{errors.title}</div>
          )}
        </div>

        <div className="flex justify-end mt-10 mb-6">
          <Button
            type="submit"
            customClass="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

Index.propTypes = {
  updateCategoryList: PropsType.func,
  showAddModal: PropsType.bool,
  closeModal: PropsType.func,
  category: PropsType.object,
};

export default Index;
