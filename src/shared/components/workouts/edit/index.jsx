import { useFormik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import InputField from 'shared/components/form/inputField';
import Label from 'shared/components/form/label';
import TextArea from 'shared/components/form/text-area';
import FileUploader from 'shared/components/form/upload-file';

import Button from 'shared/components/button';
import Toggle from 'shared/components/form/toggle';
import { getWorkoutById, uploadVideo } from 'shared/services/workoutService';
import { updateWorkoutValidationSchema } from 'shared/utils/validation.js';
import { updateWorkout } from 'src/shared/services/workoutService';
import { toastMessage } from '../../toast';
import { routeConstant } from 'shared/routes/routeConstants';
import { useNavigate } from 'react-router-dom';
export default function Index() {
  const queryParam = useParams();
  const [file, setFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { categories } = useSelector((state) => state.root);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [selectedValue, setSelectedValue] = useState('');
  const [videoLoader, setVideoLoader] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    title: '',
    category_id: '',
    description: '',
    is_featured: false,
    url: '',
    duration: '',
    status: true,
    thumbnail: '',
    workout_id: '',
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
    validationSchema: updateWorkoutValidationSchema,
    initialValues: initialValues,
    onSubmit: () => {
      handleUpdateWorkout();
    },
  });

  const statusHandleSwitch = (value) => {
    console.log(value);
    setFieldValue('status', value);
  };

  const featuredHandleSwitch = (value) => {
    setFieldValue('is_featured', value);
  };

  const fetchWorkoutById = (id) => {
    getWorkoutById(id)
      .then(({ data: { data } }) => {
        setFieldValue('title', data.title);
        setFieldValue('category_id', data.category_id);
        setFieldValue('description', data.description);
        setFieldValue('is_featured', data.is_featured);
        setFieldValue('url', data?.video?.url);
        setFieldValue('duration', data?.video?.duration);
        setFieldValue('status', data.status === 1 ? true : false);
        setFieldValue('workout_id', data.id);
        setImageFile(data?.video?.thumbnail);
        setFile(data?.video?.url);
        setUploadPercentage(100);
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
    fetchWorkoutById(queryParam.id);
  }, [queryParam.id]);

  const handleUpdateWorkout = () => {
    setSubmitting(true);
    const formData = new FormData();

    formData.append('title', values.title);
    formData.append('category_id', values.category_id);
    formData.append('description', values.description);
    formData.append('is_featured', values.is_featured);
    formData.append('url', values.url);
    formData.append('duration', values.duration);
    formData.append('status', values.status);
    formData.append('thumbnail', values.thumbnail);
    formData.append('workout_id', values.workout_id);
    updateWorkout(formData)
      .then(({ data: { message } }) => {
        toastMessage('success', message);
        setVideoLoader(false);
        navigate(routeConstant.workout.path);
      })
      .catch((error) => {
        toastMessage('error', error?.response?.data?.message);
      })
      .finally(() => {
        setSubmitting(false);
        setVideoLoader(false);
      });
  };

  const uploadThumbnail = (file) => {
    setFieldValue('thumbnail', file);
  };

  const handleVideoUpload = (file) => {
    const formData = new FormData();
    formData.append('video', file);

    uploadVideo(formData, (progressEvent) => {
      const progress = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100
      );
      setUploadPercentage(progress);
    })
      .then(({ data: { data, message } }) => {
        setFieldValue('url', data.video_path);
        setFieldValue('duration', data.duration);
        toastMessage('success', message);
      })
      .catch((error) => {
        toastMessage('error', error?.response?.data?.message);
        setFile(null);
        setFieldValue('url', '');
        setFieldValue('duration', '');
        setUploadPercentage(0);
      });
  };

  const formattedCategories = useMemo(
    () =>
      categories.map((category) => ({
        id: category.id,
        value: category.name,
        label: category.name,
      })),
    [categories]
  );

  const onChnageCategrory = (value) => {
    setFieldValue('category_id', value?.id);
    setSelectedValue(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-4xl mx-auto px-4"
    >
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Update Workout</h2>
        </div>

        <div className="col-span-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <Label title="Upload Video" />
              <FileUploader
                onFileUpload={handleVideoUpload}
                progress={uploadPercentage}
                selectedFile={file}
                setSelectedFile={setFile}
                name="video"
                acceptedFileTypes="video/*"
                isEdited
                videoPath={values.url}
              />
              {touched.url && errors.url && (
                <div className="text-red-500">{errors.url}</div>
              )}
            </div>
            <div>
              <Label title="Upload Thumbnail (optional)" />
              <FileUploader
                onFileUpload={uploadThumbnail}
                name="thumbnail"
                selectedFile={imageFile}
                setSelectedFile={setImageFile}
                acceptedFileTypes="image/*"
                isEdited
                imagePath={imageFile}
                handleRemoveFile={() => setFieldValue('thumbnail', '')}
              />
            </div>
          </div>
        </div>

        <div className="col-span-1">
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

        <div className="col-span-1">
          <Label title="Duration" />
          <InputField
            type="text"
            placeholder="Enter duration"
            name="duration"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.duration}
          />
          {touched.duration && errors.duration && (
            <div className="text-red-500">{errors.duration}</div>
          )}
        </div>

        <div className="col-span-1">
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

        <div className="col-span-3">
          <Label title="Description" />
          <TextArea
            name="description"
            placeholder="Enter description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            row="5"
          />
          {touched.description && errors.description && (
            <div className="text-red-500">{errors.description}</div>
          )}
        </div>

        <div className="col-span-1">
          <Toggle
            title="Mark Featured"
            name="is_featured"
            onChange={featuredHandleSwitch}
            onBlur={handleBlur}
            checked={values.is_featured}
          />
        </div>

        <div className="col-span-1">
          <Toggle
            title="Status"
            name="status"
            onChange={statusHandleSwitch}
            onBlur={handleBlur}
            checked={values.status}
          />
        </div>
      </div>

      <div className="flex justify-end mt-8 mb-6">
        <Button
          type="submit"
          customClass={` ${
            videoLoader ? 'bg-blue-200' : 'bg-blue-500'
          }  w-48 hover:bg-blue-700 text-white font-bold py-2 rounded`}
          disabled={isSubmitting || videoLoader}
        >
          {isSubmitting ? 'Processing...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}
