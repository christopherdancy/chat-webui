import { useState } from 'react';

const useChatContext = () => {
  const [currentContext, setCurrentContext] = useState({
    section: null,
    element: null,
    property: null,
    value: null
  });

  const resetContext = () => {
    setCurrentContext({
      section: null,
      element: null,
      property: null,
      value: null
    });
  };

  const updateContext = (updates) => {
    setCurrentContext(prev => ({ ...prev, ...updates }));
  };

  return {
    currentContext,
    resetContext,
    updateContext
  };
};

export default useChatContext; 