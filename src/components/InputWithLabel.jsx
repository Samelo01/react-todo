import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const InputWithLabel = ({ children, value, onChange }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label>
        {children}
        <input ref={inputRef} type="text" value={value} onChange={onChange} />
      </label>
    </>
  );
};

InputWithLabel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputWithLabel;
