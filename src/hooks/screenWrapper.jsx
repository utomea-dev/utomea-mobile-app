import React from "react";

const withScreenWrapper = (WrappedComponent, WrapperComponent) => {
  return (props) => {
    return (
      <WrapperComponent>
        <WrappedComponent {...props} />
      </WrapperComponent>
    );
  };
};

export default withScreenWrapper;
