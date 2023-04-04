import React from 'react';
import '../styles/compStyles/ContentWrapper.scss';
const ContentWrapper = ({ children }) => {
  return <div className="wrapper">{children}</div>;
};

export default ContentWrapper;
