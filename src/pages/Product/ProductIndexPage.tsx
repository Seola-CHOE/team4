import { Navigate } from 'react-router-dom';


function ProductIndexPage() {
  
  return (
      <Navigate to={'/product/list'}></Navigate>
  );
}

export default ProductIndexPage;