import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import InputField from 'shared/components/form/inputField';
import Label from 'shared/components/form/label';
import Toggle from 'shared/components/form/toggle';
import Button from 'shared/components/button';
import { AddPackageValidationSchema } from 'shared/utils/validation';
import { toastMessage } from '../../toast';
import { updatePackage, getPackageById } from 'shared/services/packageService';
import { routeConstant } from 'shared/routes/routeConstants';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

export default function Update() {
  const navigate = useNavigate();
  const [additionalFields, setAdditionalFields] = useState([]);
  // const [counter, setCounter] = useState(0);
  const [description, setDescription] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const queryParam = useParams();

  const initialValues = {
    name: '',
    price: '',
    inapp_package_id: '',
    inapp_android_package: '',
    duration: '',
    is_active: true,
    package_id: '',
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
    validationSchema: AddPackageValidationSchema,
    initialValues: initialValues,
    onSubmit: () => {
      handleUpdatePackage();
    },
  });

  const statusHandleSwitch = (value) => {
    setFieldValue('is_active', value);
  };

  const packageDurationOptions = [
    { id: 1, value: 'Daily', label: 'Daily' },
    { id: 2, value: 'Weekly', label: 'Weekly' },
    { id: 3, value: 'Monthly', label: 'Monthly' },
    { id: 4, value: '3 Months', label: '3 Months' },
    { id: 5, value: '6 Months', label: '6 Months' },
    { id: 6, value: 'Yearly', label: 'Yearly' },
    { id: 7, value: 'Lifetime', label: 'Lifetime' },
  ];

  const onChnagePackageDuration = (value) => {
    setFieldValue('duration', value?.value);
    setSelectedValue(value);
  };

  const handleAddField = () => {
    setAdditionalFields([...additionalFields, '']);
  };

  const handleInputChange = (index, value) => {
    const updatedValues = [...description];
    updatedValues[index] = value;
    setDescription(updatedValues);
  };

  const handleRemoveField = (index) => {
    console.log('index ', index);
    const updatedFields = [...additionalFields];
    updatedFields.splice(index, 1);
    setAdditionalFields(updatedFields);
    description.splice(index + 1, 1);
  };

  const fetchPackageById = (id) => {
    getPackageById(id)
      .then(({ data: { data } }) => {
        console.log('data ', data);
        setFieldValue('name', data.name);
        setFieldValue('price', data.price);
        setFieldValue('duration', data.duration);
        setFieldValue('inapp_package_id', data.inapp_package_id);
        setFieldValue('inapp_android_package', data.inapp_android_package);
        setFieldValue('is_active', data.is_active === 1 ? true : false);
        setFieldValue('package_id', data.id);
        setDescription(JSON.parse(data.description));
        setSelectedValue({
          value: data?.duration,
          label: data?.duration,
        });
        setAdditionalFields(
          Array.from({ length: JSON.parse(data.description).length - 1 })
        );
      })
      .catch((error) => {
        toastMessage('error', error?.response?.data?.message);
      });
  };

  useEffect(() => {
    fetchPackageById(queryParam.id);
  }, [queryParam.id]);

  const handleUpdatePackage = () => {
    setSubmitting(true);
    const formData = {
      package_id: values.package_id,
      name: values.name,
      price: values.price,
      duration: values.duration,
      is_active: values.is_active,
      inapp_package_id: values.inapp_package_id,
      inapp_android_package: values.inapp_android_package,
      description: description,
    };
    updatePackage(formData)
      .then(({ data: { message } }) => {
        toastMessage('success', message);
        navigate(routeConstant.package.path);
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
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-4xl mx-auto px-4"
    >
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-4">
          <h2 className="text-2xl font-semibold mb-4">Update Package</h2>
        </div>

        <div className="col-span-3">
          <Label title="Package Name" />
          <InputField
            type="text"
            placeholder="Enter Package Name"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {touched.name && errors.name && (
            <div className="text-red-500">{errors.name}</div>
          )}
        </div>

        <div className="col-span-3">
          <Label title="Package Price" />
          <InputField
            type="number"
            placeholder="Enter Package Price"
            name="price"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.price}
          />
          {touched.name && errors.name && (
            <div className="text-red-500">{errors.name}</div>
          )}
        </div>

        <div className="col-span-2">
          <Label title="Duration" />
          <Select
            className="text-gray-900"
            onChange={onChnagePackageDuration}
            options={packageDurationOptions}
            placeholder="Select Duration..."
            isSearchable={true}
            isClearable={true}
            closeMenuOnSelect={true}
            value={selectedValue}
          />
          {touched.duration && errors.duration && (
            <div className="text-red-500">{errors.duration}</div>
          )}
        </div>
        <div className="col-span-2">
          <Label title="Inapp Package Id" />
          <InputField
            type="text"
            placeholder="Enter inapp ios package id"
            name="inapp_package_id"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.inapp_package_id}
          />
          {touched.inapp_package_id && errors.inapp_package_id && (
            <div className="text-red-500">{errors.inapp_package_id}</div>
          )}
        </div>

        <div className="col-span-2">
          <Label title="Inapp Android Package Id" />
          <InputField
            type="text"
            placeholder="Enter inapp android package id"
            name="inapp_android_package"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.inapp_android_package}
          />
          {touched.inapp_android_package && errors.inapp_android_package && (
            <div className="text-red-500">{errors.inapp_android_package}</div>
          )}
        </div>

        <div className="col-span-6">
          <Label title="Description" />
          <div className="flex gap-2">
            <InputField
              type="text"
              placeholder="Enter Package Description"
              name="description"
              id={`description${0}`}
              onChange={(e) => handleInputChange(0, e.target.value)}
              onBlur={handleBlur}
              value={description[0]}
            />
            <div className="m-4">
              <FaPlusCircle onClick={handleAddField} />
            </div>
          </div>
          {touched.description && errors.description && (
            <div className="text-red-500">{errors.description}</div>
          )}
        </div>
        {additionalFields.map((field, index) => (
          <div key={index} className="col-span-6">
            <div className="flex gap-2">
              <InputField
                type="text"
                placeholder={`Enter Additional Description`}
                id={`description${index + 1}`}
                name={`description${index + 1}`}
                onChange={(e) => handleInputChange(index + 1, e.target.value)}
                value={description[index + 1]}
              />
              <div className="m-4">
                <FaMinusCircle onClick={() => handleRemoveField(index)} />
              </div>
            </div>
          </div>
        ))}
        <div className="col-span-1">
          <Toggle
            title="Status"
            name="is_active"
            onChange={statusHandleSwitch}
            onBlur={handleBlur}
            checked={values.is_active}
          />
        </div>
      </div>

      <div className="flex justify-end mt-8 mb-6">
        <Button
          type="submit"
          customClass="bg-blue-500 w-48 hover:bg-blue-700 text-white font-bold py-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}
