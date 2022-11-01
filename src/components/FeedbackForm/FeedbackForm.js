import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Link } from 'gatsby';
import Swal from 'sweetalert2';
import { sendFeedbackMessage } from '../../utils/feedbackFormApi';
import Section from '../Section';
import Button from '../Button';
import icons from '../../assets/images/sprite.svg';
import SyncLoader from 'react-spinners/SyncLoader';
import {
  feedbackFormSection,
  feedbackFormBlock,
  form,
  formTitle,
  nameContainer,
  nameInput,
  nameInputValidationMessage,
  emailContainer,
  emailInput,
  emailInputValidationMessage,
  messageContainer,
  messageInput,
  messageInputValidation,
  imageWrapper,
  imageMobile,
  imageTablet,
  imageDesktop,
  loaderContainer,
  loaderWrapper,
  successPageSection,
  successPageContainer,
  successPageTitle,
  successPageText,
  successPageLink,
  successPageImageWrapper,
} from './FeedbackForm.module.css';

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
        .required(formValidation.required)
        .matches(
          /^(?=^.{3,63}$)(((^[^<>()!?-\\.\/а-яА-ЯёЁЇїІіЄєҐґ][^а-яА-ЯёЁЇїІіЄєҐґ<>()[\],;:\s@"]{2,}(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,10})))$/,
          formValidation.email,
        ),
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
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      message: '',
    },
    resolver: yupResolver(schema),
  });

  const spinnerDefault = '#3b82f6';
  const spinnerDarkTheme = '#fcfcfc';

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState(spinnerDefault);

  let htmlDark;

  if (typeof window !== 'undefined') {
    htmlDark = document.querySelector('.dark');
  }
  const darkSpinner = () => {
    if (htmlDark) {
      setColor(spinnerDarkTheme);
    }
  };

  const formResult = result;
  function onSubmit(data) {
    darkSpinner();
    setLoading(true);
    setTimeout(() => {
      const res = sendFeedbackMessage(data);
      res.then(res => {
        if (!res?.data.ok) {
          Swal.fire({
            icon: 'error',
            title: formText.errorMessageTitle,
            text: formText.errorMessageText,
          });
          setLoading(false);
          return;
        }
        setResult(res?.data.ok);
        if (result) {
          setLoading(false);
        }
      });
      reset();
    }, 500);
  }

  const backToPage = () => {
    setResult(null);
    return;
  };

  return (
    <Section styles={feedbackFormSection}>
      {formResult ? (
        <div className={successPageSection}>
          <div className={successPageContainer}>
            <h2 className={`${successPageTitle} dark:text-font-light`}>
              {formText.successTitle}
            </h2>
            <p className={`${successPageText} dark:text-font-light`}>
              {formText.successAnswer}
            </p>
            <Link className={successPageLink} onClick={backToPage} to="/">
              {formText.home}
            </Link>
          </div>
          <svg className={successPageImageWrapper}>
            <use href={`${icons}#success-section`} />
          </svg>
        </div>
      ) : (
        <div className={feedbackFormBlock}>
          {loading ? (
            <div className={loaderContainer}>
              <div className={loaderWrapper}>
                <SyncLoader
                  color={color}
                  cssOverride={{
                    display: 'block',
                    margin: '0 auto',
                  }}
                />
              </div>
            </div>
          ) : (
            <form
              id="form"
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className={form}
            >
              <h2 className={`${formTitle} dark:text-font-light `}>
                {formText.title}
              </h2>

              <div className={nameContainer}>
                <input
                  className={`${nameInput} dark:bg-transparent dark:text-font-light`}
                  {...register('name')}
                  placeholder={formText.name}
                />
                <p className={nameInputValidationMessage}>
                  {errors.name?.message}
                </p>
              </div>

              <div className={emailContainer}>
                <input
                  className={`${emailInput} dark:bg-transparent dark:text-font-light`}
                  {...register('email')}
                  placeholder={formText.email}
                  type="email"
                />
                <p className={emailInputValidationMessage}>
                  {errors.email?.message}
                </p>
              </div>

              <div className={messageContainer}>
                <textarea
                  className={`${messageInput} dark:bg-transparent dark:text-font-light`}
                  {...register('message')}
                  placeholder={formText.question}
                  style={resizeTextarea}
                />
                <p className={messageInputValidation}>
                  {errors.message?.message}
                </p>
              </div>

              <Button text={formText.send} type="submit"></Button>
            </form>
          )}
          <div className={imageWrapper}>
            <svg className={imageMobile}>
              <use href={`${icons}#feedback-page`} />
            </svg>
            <svg className={imageTablet}>
              <use href={`${icons}#feedback-page-tablet`} />
            </svg>
            <svg className={imageDesktop}>
              <use href={`${icons}#feedback-page-desktop`} />
            </svg>
          </div>
        </div>
      )}
    </Section>
  );
};

export default FeedbackForm;
