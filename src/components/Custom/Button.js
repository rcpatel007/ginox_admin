import React from 'react';
import { Button } from 'reactstrap';
const Buttons = (props) => {
  const {
    type,
    children,
    classname,
    className,
    size,
    handleSubmit,
    color,
    onClick,
    disabled,
  } = props;
  return (
    <React.Fragment>
      <Button
        type={type}
        name={classname}
        className={className}
        size={size}
        onSubmit={handleSubmit}
        onClick={onClick}
        color={color}
        disabled={disabled}
      >
        {children}
      </Button>
    </React.Fragment>
  );
};
export default Buttons;
