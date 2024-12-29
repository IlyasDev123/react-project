import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InputField from 'shared/components/form/inputField';
import Label from 'shared/components/form/label';
import TextEditor from 'shared/components/form/text-editor';
import Button from 'shared/components/button';
import { getPageDetail } from 'shared/services/pageService';
import { UpdatePagesValidationSchema } from 'shared/utils/validation.js';
import { toastMessage } from 'shared/components/toast';
import { updatePage } from 'src/shared/services/pageService';

export default function Index() {
  const queryParam = useParams();

  const initialValues = {
    title: '',
    description: '',
    id: '',
  };

  const {
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
    validationSchema: UpdatePagesValidationSchema,
    initialValues: initialValues,
    onSubmit: () => {
      handleUpdatePage();
    },
  });

  const fetchPagesById = (id) => {
    getPageDetail(id)
      .then(({ data: { data } }) => {
        setFieldValue('title', data.title);
        setFieldValue('description', data.content);
        setFieldValue('id', data.id);
      })
      .catch((error) => {
        toastMessage('error', error?.response?.data?.message);
      });
  };

  useEffect(() => {
    fetchPagesById(queryParam.id);
  }, [queryParam.id]);

  const handleUpdatePage = () => {
    setSubmitting(true);
    const data = {
      title: values.title,
      description: values.description,
      id: values.id,
    };

    updatePage(data)
      .then(({ data: { message } }) => {
        toastMessage('success', message);
        // navigate(routeConstant.pages.path);
        setSubmitting(false);
      })
      .catch((error) => {
        toastMessage('error', error?.response?.data?.message);
        setSubmitting(false);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleProcedureContentChange = (value) => {
    setFieldValue('description', value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-full mx-auto px-4"
    >
      <div className="col-span-2">
        <h2 className="text-2xl font-semibold mb-10">Update Pages</h2>
      </div>
      <div className="">
        <div className="">
          <div className="mb-4">
            <Label title="Title" />
            <InputField
              type="text"
              placeholder="Enter title"
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            {touched.title && errors.title && (
              <div className="text-red-500">{errors.title}</div>
            )}
          </div>

          <div className="mb-4">
            <Label title="Description" />
            <TextEditor
              name="description"
              placeholder="Enter description"
              handleChnageContent={handleProcedureContentChange}
              value={values.description}
            />
            {touched.description && errors.description && (
              <div className="text-red-500">{errors.description}</div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8 mb-6">
        <Button
          type="submit"
          customClass="bg-blue-500 w-80 hover:bg-blue-700 text-white font-bold py-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}
