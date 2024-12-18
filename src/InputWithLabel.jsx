import React, { useRef, useEffect } from 'react';

const InputWithLabel = ({ children, value, onChange }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label>
        {children}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
        />
      </label>
    </>
  );
};

export default InputWithLabel;
