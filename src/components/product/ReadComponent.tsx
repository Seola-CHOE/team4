import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOne } from '../../api/productAPI.ts';

// 제품 정보 인터페이스 정의
interface IProduct {
  pno: number;
  pname: string;
  pdesc: string;
  price: number;
  uploadFileNames: string[]; // 이미지 파일 이름 배열
}

// 초기 상태 정의
const initialState: IProduct = {
  pno: 0,
  pname: '',
  pdesc: '',
  price: 0,
  uploadFileNames: [],
};

function ReadPage() {
  const { pno } = useParams<{ pno: string }>(); // URL 파라미터에서 pno를 가져옴
  const [product, setProduct] = useState<IProduct>({ ...initialState });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (pno) {
      getProduct(parseInt(pno)); // URL 파라미터 pno를 숫자로 변환하여 제품 정보 가져오기
    }
  }, [pno]);

  // 제품 정보를 가져오는 비동기 함수
  const getProduct = async (pno: number) => {
    try {
      const productData = await getOne(pno);
      setProduct(productData);
      setLoading(false);
    } catch (err) {
      console.log('Failed to fetch product:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>
      {product && (
        <div className="border rounded p-4 shadow-lg">
          {/* 제품 번호 */}
          <p className="mb-2">
            <strong>Product No:</strong> {product.pno}
          </p>

          {/* 이미지 리스트 출력 */}
          {product.uploadFileNames.length > 0 && (
            <div className="mb-4 flex space-x-4 overflow-x-auto">
              {product.uploadFileNames.map((s_fileName, index) => (
                <img
                  key={index}
                  src={`http://localhost:8089/api/products/view/${s_fileName}`} // 이미지 파일 URL 생성
                  alt={`${product.pname} image ${index + 1}`}
                  className="flex-shrink-0 w-60 h-60 rounded mb-2 object-cover"
                />
              ))}
            </div>
          )}


          {/* 제품 이름 */}
          <p className="mb-2">
            <strong>Product Name:</strong> {product.pname}
          </p>

          {/* 제품 설명 */}
          <p className="mb-2">
            <strong>Description:</strong> {product.pdesc}
          </p>

          {/* 제품 가격 */}
          <p className="mb-2">
            <strong>Price:</strong> ${product.price}
          </p>
        </div>
      )}
      <div className="flex justify-center mt-4 space-x-4">
        <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          LIST
        </button>
        <button className="bg-success hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          CORRECTION, UPDATE
        </button>
        <button className="bg-danger hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          DELETE
        </button>
      </div>


    </div>
  );
}

export default ReadPage;
