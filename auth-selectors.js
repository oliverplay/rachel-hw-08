// Selectors: Functions to retrieve specific pieces of data from the Redux state

const getIsLoggedIn = state => state.auth.isLoggedIn;
const getUserName = state => state.auth.user.name;
const getUserEmail = state => state.auth.user.email;
const getToken = state => state.auth.token;
const getIsFetchingCurrentUser = state => state.auth.isFetchingCurrentUser;

// Object containing all authentication selectors
const authSelectors = {
  getToken,
  getIsLoggedIn,
  getUserName,
  getUserEmail,
  getIsFetchingCurrentUser,
};

export default authSelectors;
