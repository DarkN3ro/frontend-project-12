export const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    return userId?.token ? { Authorization: `Bearer ${userId.token}` } : {};
  };