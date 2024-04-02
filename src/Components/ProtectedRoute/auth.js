export const isAuthenticated = () => {

     const token = localStorage.getItem('loggedInUser');

     if (token) {
          return true;
     } else {
          return false;
     }
};
