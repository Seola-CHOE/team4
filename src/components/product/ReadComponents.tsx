import { useEffect, useState } from 'react';
import { getOne } from '../../api/productAPI.ts';

const initialState= {
  pno:0,
  pdesc:'',
  pname:'',
  price:0,
}

interface IProduct {
  pno: number;
  pdesc: string;
  pname: string;
  price: number;

}
function ReadComponents() {
  const [product, setProduct] = useState<IProduct>({...initialState});

  const [loading, setLoading] = useState<boolean>(true);

// 제품 정보를 가져오는 비동기 함수
  const getProduct = async (pno: number) => {
    try {
      const productData = await getOne(pno)
      setProduct(productData);
      setLoading(false)
    }catch(err){
      console.log("Failed to fatch product:", err)
      setLoading(false)
    }
  };

  useEffect(() => {
    getProduct(1);
  },[])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>
      {product && (
        <div className="border rounded p-4 shadow-lg">
          {/* 제품 번호 */}
          <p className="mb-2"><strong>Product No:</strong> {product.pno}</p>

          ```
          {/* 제품 이름 */}
          <p className="mb-2"><strong>Product Name:</strong> {product.pname}</p>

          {/* 제품 설명 */}
          <p className="mb-2"><strong>Description:</strong> {product.pdesc}</p>

          {/* 제품 가격 */}
          <p className="mb-2"><strong>Price:</strong> ${product.price}</p>
        </div>
      )}
    </div>
);
}
export default ReadComponents;