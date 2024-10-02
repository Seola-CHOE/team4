import { Navigate } from 'react-router-dom';


function IndexPage() {
  
  return (
      <Navigate to={'/product/list'}></Navigate>
  );
}

export default IndexPage;