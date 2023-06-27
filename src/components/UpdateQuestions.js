export const updateQuestions = (questions) => {
    return {
      type: 'UPDATE_QUESTIONS',
      payload: questions,
    };
  };