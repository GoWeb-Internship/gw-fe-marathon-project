import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { sendFeedbackMessage } from '../utils/feedbackFormApi';

const resizeTextarea = {
  resize: 'none',
};

const FeedbackForm = ({}) => {
  const schema = yup
    .object({
      email: yup.string().email().required(),
      name: yup.string().min(2).max(30).trim().required(),
      message: yup.string().min(10).max(2000).trim().required(),
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
  // console.log(result);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <div>
      <h2>Write to the mentor</h2>
      <form
        onSubmit={handleSubmit(data => {
          const { status } = sendFeedbackMessage(data);
          setResult(status);
        })}
      >
        <input
          className="bg-amber-300"
          {...register('email')}
          placeholder="Email"
          type="email"
        />
        <p>{errors.email?.message}</p>
        <input
          className="bg-amber-300"
          {...register('name')}
          placeholder="Name"
        />
        <p>{errors.name?.message}</p>
        <textarea
          className="w-60 h-60 bg-amber-300"
          {...register('message')}
          placeholder="Type your message here"
          style={resizeTextarea}
        />
        <p>{errors.message?.message}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
