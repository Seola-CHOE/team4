import { Navigate } from 'react-router-dom';


function IndexPage() {
  
  return (
      <Navigate to={'/products/list'}></Navigate>
  );
}

export default IndexPage;