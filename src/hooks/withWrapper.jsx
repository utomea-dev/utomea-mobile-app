import React from "react";

const withWrapper = (WrappedComponent, WrapperComponent) => {
  return (props) => {
    return (
      <WrapperComponent>
        <WrappedComponent {...props} />
      </WrapperComponent>
    );
  };
};

export default withWrapper;
