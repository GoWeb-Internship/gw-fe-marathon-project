import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Link } from 'gatsby';
import { sendFeedbackMessage } from '../utils/feedbackFormApi';
import Container from './Container';

const resizeTextarea = {
  resize: 'none',
};

const FeedbackForm = () => {
  const { t } = useTranslation();
  const formText = t('Form', { returnObjects: true });
  const formValidation = t('formValidation', { returnObjects: true });

  const schema = yup
    .object({
      email: yup
        .string()
        .email(formValidation.email)
        .required(formValidation.required),
      name: yup
        .string()
        .required(formValidation.required)
        .min(2, formValidation.nameLength)
        .max(30)
        .trim(),
      message: yup
        .string()
        .required(formValidation.required)
        .min(10, formValidation.messageLength)
        .max(2000)
        .trim(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      name: '',
      message: '',
    },
    resolver: yupResolver(schema),
  });

  const [result, setResult] = useState(null);
  console.log(result);
  const formResult = result;
  function onSubmit(data) {
    const res = sendFeedbackMessage(data);
    res.then(res => {
      setResult(res.data.ok);
    });
    reset();
  }

  const backToPage = () => {
    setResult(null);
    return;
  };

  // useEffect(() => {
  //   if (formState.isSubmitSuccessful) {
  //     reset();
  //   }
  // }, [formState, reset]);

  return (
    <section className="pt-[34px] pb-[34px]">
      <Container>
        {formResult ? (
          <div>
            <h2>{formText.successTitle}</h2>
            <p>{formText.successAnswer}</p>
            <Link onClick={backToPage} to="/">
              {formText.home}
            </Link>
          </div>
        ) : (
          <div>
            <h2 className="text-font-dark text-xl leading-6 font-bold">
              {formText.title}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="bg-amber-300"
                {...register('email')}
                placeholder={formText.email}
                type="email"
              />
              <p>{errors.email?.message}</p>
              <input
                className="bg-amber-300"
                {...register('name')}
                placeholder={formText.name}
              />
              <p>{errors.name?.message}</p>
              <textarea
                className="w-60 h-60 bg-amber-300"
                {...register('message')}
                placeholder={formText.question}
                style={resizeTextarea}
              />
              <p>{errors.message?.message}</p>

              <button type="submit">{formText.send}</button>
            </form>
          </div>
        )}
      </Container>
    </section>
  );
};

export default FeedbackForm;
