export const handleError = (error) => {
    switch(error.response.status) {
      case 400:
        setError('This username or email is linked to another account.');
        break;
      case 401:
        setError('User was not found.');
        break;
      case 402:
        setError('Token not found. Ensure cookies are not blocked by your browser.');
        break;
      case 404:
        setError('The requested resource was not found.');
        break;
      case 405:
        setError('All fields are required.');
        break;
      case 406:
        setError('Invalid login details');
        break;
      case 500:
        setError('Server error. Please try again later.');
        break;
      default:
        setError('An unexpected error occurred. Please try again later.');
  }
};