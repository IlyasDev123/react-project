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

export { AddWorkoutValidationSchema };
