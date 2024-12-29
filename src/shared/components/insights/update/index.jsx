import { useFormik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import InputField from 'shared/components/form/inputField';
import Label from 'shared/components/form/label';
import TextEditor from 'shared/components/form/text-editor';
import FileUploader from 'shared/components/form/upload-file';
import TextArea from 'shared/components/form/text-area';
import Button from 'shared/components/button';
import { getInsightById, updateInsight } from 'shared/services/insightService';
import { UpdateInsightValidationSchema } from 'shared/utils/validation.js';
import { toastMessage } from 'shared/components/toast';
import { routeConstant } from 'shared/routes/routeConstants';

export default function Index() {
  const queryParam = useParams();
  const [imageFile, setImageFile] = useState(null);
  const { insightCategories } = useSelector((state) => state.root);
  const [selectedValue, setSelectedValue] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    title: '',
    category_id: '',
    short_description: '',
    description: '',
    duration: '',
    thumbnail: '',
    insight_id: '',
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
    validationSchema: UpdateInsightValidationSchema,
    initialValues: initialValues,
    onSubmit: () => {
      handleUpdateWorkout();
    },
  });

  const fetchInsightById = (id) => {
    getInsightById(id)
      .then(({ data: { data } }) => {
        setFieldValue('title', data.title);
        setFieldValue('category_id', data.category_id);
        setFieldValue('short_description', data.short_description);
        setFieldValue('description', data.description);
        setFieldValue('is_featured', data.is_featured);
        setFieldValue('duration', data?.duration);
        setFieldValue('status', data.status === 1 ? true : false);
        setFieldValue('insight_id', data.id);
        setImageFile(data?.thumbnail);
        setSelectedValue({
          id: data?.category?.id,
          value: data?.category?.name,
          label: data?.category?.name,
        });
      })
      .catch((error) => {
        toastMessage('error', error?.response?.data?.message);
      });
  };

  useEffect(() => {
    fetchInsightById(queryParam.id);
  }, [queryParam.id]);

  const handleUpdateWorkout = () => {
    setSubmitting(true);
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('category_id', values.category_id);
    formData.append('short_description', values.short_description);
    formData.append('description', values.description);
    formData.append('is_featured', values.is_featured);
    formData.append('duration', values.duration);
    formData.append('status', values.status);
    formData.append('thumbnail', values.thumbnail);
    formData.append('insight_id', values.insight_id);
    updateInsight(formData)
      .then(({ data: { message } }) => {
        toastMessage('success', message);
        navigate(routeConstant.insight.path);
      })
      .catch((error) => {
        toastMessage('error', error?.response?.data?.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const uploadThumbnail = (file) => {
    setFieldValue('thumbnail', file);
  };

  const formattedCategories = useMemo(
    () =>
      insightCategories?.map((category) => ({
        id: category.id,
        value: category.name,
        label: category.name,
      })),
    [insightCategories]
  );

  const onChnageCategrory = (value) => {
    setFieldValue('category_id', value?.id);
    setSelectedValue(value);
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
        <h2 className="text-2xl font-semibold mb-10">Update Insight</h2>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
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
            <Label title="Short Description" />
            <TextArea
              name="short_description"
              placeholder="Enter short description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.short_description}
              maxLength={200}
              row="4"
            />
            {touched.short_description && errors.short_description && (
              <div className="text-red-500">{errors.short_description}</div>
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
        <div className="col-span-1">
          <div className="mb-4">
            <Label title="Upload Thumbnail" />
            <FileUploader
              onFileUpload={uploadThumbnail}
              name="thumbnail"
              selectedFile={imageFile}
              setSelectedFile={setImageFile}
              acceptedFileTypes="image/*"
              isEdited
              imagePath={imageFile}
            />
          </div>

          <div className="mb-4">
            <Label title="Duration" />
            <InputField
              type="text"
              placeholder="Enter duration (format: h:min:sec)"
              name="duration"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.duration}
            />
            {touched.duration && errors.duration && (
              <div className="text-red-500">{errors.duration}</div>
            )}
          </div>

          <div className="mb-4">
            <Label title="Select Category" />
            <Select
              className="text-gray-900"
              onChange={onChnageCategrory}
              options={formattedCategories}
              placeholder="Select Category..."
              isSearchable={true}
              isClearable={true}
              value={selectedValue}
            />
            {touched.category_id && errors.category_id && (
              <div className="text-red-500">{errors.category_id}</div>
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
