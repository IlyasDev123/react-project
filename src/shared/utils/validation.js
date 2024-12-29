import * as Yup from 'yup';

const AddWorkoutValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  category_id: Yup.string().required('Category is required'),
  description: Yup.string().required('Description is required'),
  is_featured: Yup.boolean(),
  url: Yup.string().required('Please upload a video'),
  duration: Yup.string().required('Duration is required'),
  is_premium: Yup.boolean(),
});

const updateWorkoutValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  category_id: Yup.string().required('Category is required'),
  description: Yup.string().required('Description is required'),
  is_featured: Yup.boolean(),
  url: Yup.string().required('Please upload a video'),
  duration: Yup.string().required('Duration is required'),
  is_premium: Yup.boolean(),
});

const AddInsightValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  category_id: Yup.string().required('Category is required'),
  short_description: Yup.string()
    .required('Short Description is required')
    .max(200, 'Short Description must not be 200 characters'),
  description: Yup.string().required('Description is required'),
  thumbnail: Yup.string().required('Please upload a image'),
  duration: Yup.string().required('Duration is required'),
});

const UpdateInsightValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  category_id: Yup.string().required('Category is required'),
  short_description: Yup.string()
    .required('Short Description is required')
    .max(200, 'Short Description must not be 200 characters'),
  description: Yup.string().required('Description is required'),
  duration: Yup.string().required('Duration is required'),
});

const AddPackageValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  price: Yup.string().required('Price is required'),
  // inapp_package_id: Yup.string().required('Inapp package id is required'),
  // inapp_android_package: Yup.string().when('inapp_package_id', {
  //   is: (val) => val === '',
  //   then: Yup.string().required('Inapp android package id is required'),
  // }),

  duration: Yup.string().required('Duration is required'),
});

const CategoriesValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  type: Yup.string().required('Type is required'),
});

const UpdatePagesValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
});

const UpdateFaqsValidationSchema = Yup.object().shape({
  question: Yup.string().required('Question field is required'),
  answer: Yup.string().required('Answer field is required'),
});

export {
  AddWorkoutValidationSchema,
  updateWorkoutValidationSchema,
  AddInsightValidationSchema,
  UpdateInsightValidationSchema,
  AddPackageValidationSchema,
  CategoriesValidationSchema,
  UpdatePagesValidationSchema,
  UpdateFaqsValidationSchema,
};
