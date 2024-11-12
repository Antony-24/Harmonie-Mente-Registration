import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-t-4 border-solid rounded-full animate-spin"
        style={{
          borderTopColor: '#c09a51',
          borderRightColor: '#c09a51',
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent'
        }}
      ></div>
    </div>
  );
};

export default Loader;
