export const handleError = (error) => {
  if (error.response) {
    const errorMessage = error.response.data.message;
    console.log("error---------", errorMessage);
    throw errorMessage;
  } else {
    // Handle network errors
    throw error.message;
  }
};
