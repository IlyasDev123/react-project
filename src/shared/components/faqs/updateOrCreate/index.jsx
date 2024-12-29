import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TextArea from 'shared/components/form/text-area';
import Label from 'shared/components/form/label';
import TextEditor from 'shared/components/form/text-editor';
import Button from 'shared/components/button';
import { getFaqById, addFaq, updateFaq } from 'shared/services/faqService';
import { UpdateFaqsValidationSchema } from 'shared/utils/validation.js';
import { toastMessage } from 'shared/components/toast';
import { routeConstant } from 'shared/routes/routeConstants';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const queryParam = useParams();
  const navigate = useNavigate();

  const initialValues = {
    question: '',
    answer: '',
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
    validationSchema: UpdateFaqsValidationSchema,
    initialValues: initialValues,
    onSubmit: () => {
      handleUpdatePage();
    },
  });

  const fetchFaqById = (id) => {
    getFaqById(id)
      .then(({ data: { data } }) => {
        setFieldValue('question', data.question);
        setFieldValue('answer', data.answer);
        setFieldValue('id', data.id);
      })
      .catch((error) => {
        toastMessage('error', error?.response?.data?.message);
      });
  };

  useEffect(() => {
    fetchFaqById(queryParam.id);
  }, [queryParam.id]);

  const handleUpdatePage = () => {
    setSubmitting(true);
    const data = {
      question: values.question,
      answer: values.answer,
      id: values?.id,
    };

    const updateOrCreate = queryParam.id ? updateFaq : addFaq;

    updateOrCreate(data)
      .then(({ data: { message } }) => {
        toastMessage('success', message);
        navigate(routeConstant.faq.path);
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
    setFieldValue('answer', value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-full mx-auto px-4"
    >
      <div className="col-span-2">
        <h2 className="text-2xl font-semibold mb-10">
          {queryParam.id ? 'Update Faqs' : 'Add Faqs'}
        </h2>
      </div>
      <div className="">
        <div className="">
          <div className="mb-4">
            <Label title="Question" />
            <TextArea
              name="question"
              placeholder="Enter short description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.question}
              maxLength={200}
              row="4"
            />
            {touched.question && errors.question && (
              <div className="text-red-500">{errors.question}</div>
            )}
          </div>

          <div className="mb-4">
            <Label title="Answer" />
            <TextEditor
              name="answer"
              placeholder="Enter your answer"
              handleChnageContent={handleProcedureContentChange}
              value={values.answer}
            />
            {touched.answer && errors.answer && (
              <div className="text-red-500">{errors.answer}</div>
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
