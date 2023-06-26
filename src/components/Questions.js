import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchQuestion } from '../hooks/FetchQuestion';
import { updateResult } from '../hooks/setResult';

export default function Questions({ onChecked }) {
  const [checked, setChecked] = useState(undefined);
  const questionsQueue = useSelector((state) => state.questions.queue);
  const trace = useSelector((state) => state.questions.trace);
  const result = useSelector((state) => state.result.result);
  const [{ isLoading, apiData, serverError }] = useFetchQuestion();

  const questions = questionsQueue && questionsQueue[trace];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateResult({ trace, checked }));
  }, [checked, dispatch, trace]);

  function onSelect(i) {
    onChecked(i);
    setChecked(i);
  }

  if (isLoading) {
    return <h3 className='text-light'>Loading...</h3>;
  }

  if (serverError) {
    return (
      <h3 className='text-light'>{serverError.message || 'Unknown Error'}</h3>
    );
  }

  if (!questions) {
    return <h3 className='text-light'>No questions available.</h3>;
  }

  return (
    <div className='questions'>
      <h2 className='text-light'>{questions.question}</h2>
      <ul>
        {questions.options.map((q, i) => (
          <li key={i}>
            <input
              type='radio'
              value={i}
              name='options'
              id={`q${i}-option`}
              onChange={() => onSelect(i)}
              checked={checked === i}
            />
            <label className='text-primary' htmlFor={`q${i}-option`}>
              {q}
            </label>
            <div
              className={`check ${result[trace] === i ? 'checked' : ''}`}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
}