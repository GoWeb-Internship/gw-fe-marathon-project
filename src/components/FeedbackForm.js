import React, { useEffect, useState, CSSProperties } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Link } from 'gatsby';
import { sendFeedbackMessage } from '../utils/feedbackFormApi';
import Section from './Section';
import Button from './Button';
import icons from '../assets/images/sprite.svg';
import SyncLoader from 'react-spinners/SyncLoader';

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
    formState,
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

  const htmlDark = document.querySelector('.dark');
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
        setResult(res.data.ok);
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

  // useEffect(() => {
  // if (formState.isSubmitSuccessful) {
  //     reset();
  //   }
  // }, [formState, reset]);

  return (
    <Section styles="pt-[34px] pb-[34px] xl:pt-[80px] xl:pb-[80px]">
      {formResult ? (
        <div className="md:flex md:flex-row-reverse md:justify-between">
          <div className="text-left md:w-[337px] xl:w-[472px] xl:pt-[98px]">
            <h2 className="mb-4 font-montserrat text-lg font-bold leading-[22px] text-font-dark dark:text-font-light md:text-xl md:leading-6 xl:text-[32px] xl:leading-[39px]">
              {formText.successTitle}
            </h2>
            <p className="mb-6 font-inter text-base font-normal leading-[19px] text-font-dark dark:text-font-light md:mb-9 md:text-lg md:font-light md:leading-[22px] xl:mb-16 xl:text-2xl xl:leading-[29px]">
              {formText.successAnswer}
            </p>
            <Link
              className="inline-block rounded border-2 border-blue-700 bg-blue-700 py-4 px-8 text-white duration-300 hover:bg-white hover:text-blue-700 xl:text-lg xl:font-semibold xl:leading-[22px]"
              onClick={backToPage}
              to="/"
            >
              {formText.home}
            </Link>
          </div>
          <svg className="h-[212px] w-[334px] max-md:min-w-full xl:h-[436px] xl:w-[684px]">
            <use href={`${icons}#success-section`} />
          </svg>
        </div>
      ) : (
        <div className="flex-row-reverse justify-between md:flex">
          {loading ? (
            <div className="relative h-[394px] max-md:mb-[34px] max-sm:min-w-full md:h-[460px] md:w-[337px] xl:h-[481px] xl:w-[480px]">
              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
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
              className="text-left max-md:mb-[34px] max-sm:min-w-full md:w-[337px] xl:w-[480px]"
            >
              <h2 className="mb-8 font-montserrat text-lg font-bold leading-[22px] text-font-dark dark:text-font-light md:text-xl md:leading-6 xl:text-[32px] xl:leading-[39px]">
                {formText.title}
              </h2>

              <div className="relative mb-8">
                <input
                  className="min-w-full border-b-2 border-solid border-accent p-3 font-inter text-base font-normal leading-[19px] text-font-dark focus:outline-none dark:bg-transparent dark:text-font-light xl:text-lg xl:leading-[22px]"
                  {...register('name')}
                  placeholder={formText.name}
                />
                <p className="absolute  left-2 font-inter text-xs font-extralight dark:text-font-light">
                  {errors.name?.message}
                </p>
              </div>

              <div className="relative mb-14">
                <input
                  className="min-w-full border-b-2 border-solid border-accent p-3 font-inter text-base font-normal leading-[19px] text-font-dark focus:outline-none dark:bg-transparent dark:text-font-light xl:text-lg xl:leading-[22px]"
                  {...register('email')}
                  placeholder={formText.email}
                  type="email"
                />
                <p className="absolute  left-2 font-inter text-xs font-extralight dark:text-font-light">
                  {errors.email?.message}
                </p>
              </div>

              <div className="relative mb-10">
                <textarea
                  className=" h-[124px] min-w-full rounded-lg border-2 border-solid border-accent p-3 font-inter text-base font-normal leading-[19px] text-font-dark focus:outline-none dark:bg-transparent dark:text-font-light xl:text-lg xl:leading-[22px]"
                  {...register('message')}
                  placeholder={formText.question}
                  style={resizeTextarea}
                />
                <p className="absolute top-[124px] left-2 font-inter text-xs font-extralight dark:text-font-light">
                  {errors.message?.message}
                </p>
              </div>

              <Button text={formText.send} type="submit"></Button>
            </form>
          )}
          <div className="md:flex md:flex-col-reverse">
            <svg className=" h-[212px] w-[334px] max-md:min-w-full md:hidden">
              <use href={`${icons}#feedback-page`} />
            </svg>
            <svg className="h-[285px] w-[334px] max-md:hidden md:mb-[100px] xl:hidden ">
              <use href={`${icons}#feedback-page-tablet`} />
            </svg>
            <svg className="h-[436px] w-[687px] max-xl:hidden xl:mb-[18px]">
              <use href={`${icons}#feedback-page-desktop`} />
            </svg>
          </div>
        </div>
      )}
    </Section>
  );
};

export default FeedbackForm;
