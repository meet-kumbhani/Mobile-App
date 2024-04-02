import React from 'react'
import { isAuthenticated } from './auth';
import { Navigate } from 'react-router-dom';

const Protected = ({ element, ...props }) => {
     return isAuthenticated() ? (
          element
     ) : (
          <Navigate to="/login" replace state={{ from: props.location }} />
     );
};

export default Protected
