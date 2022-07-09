import React from 'react';
import { Button } from 'reactstrap';

const EmptyView = ({
  btnLable,
  icon,
  title,
  description,
  bgcolor,
  isButton,
  onBtnClick,
}) => {
  return (
    <div
      style={{
        padding: 40,
        backgroundColor: bgcolor,
        border: '1px solid #EDEDED',
      }}
      className='w-100 d-flex justify-content-center align-items-center flex-column'
    >
      <img src={icon} style={{ height: 100, width: 100 }} alt='' />
      <div
        style={{ color: '#000000', fontSize: 14, fontWeight: 'bold' }}
        className='mt-10'
      >
        {title}
      </div>
      <div className='mt-5 mb-10'>{description}</div>
      {isButton && (
        <Button onClick={onBtnClick} variant='contained' color='primary'>
          {btnLable}
        </Button>
      )}
    </div>
  );
};

export default EmptyView;
