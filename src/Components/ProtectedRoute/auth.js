export const isAuthenticated = () => {

     const token = localStorage.getItem('loggedInUser' && "Forgotuser");

     if (token) {
          return true;
     } else {
          return false;
     }
};
