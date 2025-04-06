import { useCallback, useState } from 'react';

const useChatContext = () => {
  const [currentContext, setCurrentContext] = useState({
    section: null,
    element: null,
    property: null,
    value: null
  });

  const resetContext = useCallback(() => {
    setCurrentContext({
      section: null,
      element: null,
      property: null,
      value: null
    });
  }, []);

  const updateContext = useCallback((updates) => {
    return new Promise(resolve => {
      setCurrentContext(prev => {
        const newContext = { ...prev, ...updates };
        setTimeout(() => resolve(newContext), 0);
        return newContext;
      });
    });
  }, []);

  return {
    currentContext,
    resetContext,
    updateContext
  };
};

export default useChatContext; 