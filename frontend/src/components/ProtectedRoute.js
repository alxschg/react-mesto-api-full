import {Navigate} from 'react-router-dom';

function ProtectedRoute({isLogged, children}) {
  if (!isLogged) {
    return (
      <Navigate to="/signin" />
    )
  }

  return children;
}

export default ProtectedRoute;