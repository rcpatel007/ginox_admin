import React, { useState } from 'react';
import { Input } from 'reactstrap';
import './inputcss.scss';

function TextInput({
  type = 'text',
  values,
  name,
  placeholder,
  errors,
  touched,
  handleChange,
  isPassword,
  isIcon = true,
  iconName,
  min = '0',
  max,
}) {
  const isError = errors[name] && touched[name];
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='has-wrapper mb-20'>
      {isIcon && (
        <span className='has-icon'>
          <i className={iconName}></i>
        </span>
      )}

      <Input
        value={values[name]}
        name={name}
        className={`login-input pr-3 mt-3 ${isError ? 'border-danger' : ''}`}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete='off'
        type={showPassword ? 'text' : type}
        min={min}
        max={max}
      />

      {isPassword && showPassword && (
        <span className='has-icon' style={{ top: '4px' }}>
          <i className='ri-eye-fill' onClick={() => setShowPassword(false)}></i>
        </span>
      )}

      {isPassword && !showPassword && (
        <span className='has-icon' style={{ top: '4px' }}>
          <i
            className='ri-eye-off-fill'
            onClick={() => setShowPassword(true)}
          ></i>
        </span>
      )}

      {isError && (
        <div style={{ fontSize: 14 }} className='text-left mt-1 text-danger'>
          {errors[name]}
        </div>
      )}
    </div>
  );
}

export default TextInput;
