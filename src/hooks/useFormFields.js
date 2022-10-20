import { useState } from 'react';

export default function useFormFields(initialVal) {
  const [state, setState] = useState(initialVal);

  const handleChange = ({ target: { value } }) => {
    setState(value);
  };

  return { state, setState, handleChange };
}
