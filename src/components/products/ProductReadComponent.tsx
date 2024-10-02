import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOne } from '../../api/productAPI';
import UpdateModal from '../../common/modal/UpdateModal.tsx'; // UpdateModal import
import DeleteModal from '../../common/modal/DeleteModal.tsx'; // DeleteModal import
import { IProduct } from '../../types/product.ts'; // IProduct 타입 import

// 초기 상태 정의
const initialState: IProduct = {
  pno: 0,
  pname: '',
  pdesc: '',
  price: 0, // price를 number 타입으로 설정
  uploadFileNames: [],
  del_flag: false, // del_flag 속성 추가
};

function ReadPage() {
  const { pno } = useParams<{ pno: string }>(); // URL 파라미터에서 pno를 가져옴
  const [product, setProduct] = useState<IProduct>({ ...initialState });
  const [loading, setLoading] = useState<boolean>(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Update 모달 상태 관리
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Delete 모달 상태 관리
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (pno) {
      getProduct(parseInt(pno));
    }
  }, [pno]);

  // 제품 정보를 가져오는 비동기 함수
  const getProduct = async (pno: number) => {
    try {
      const productData = await getOne(pno);
      setProduct(productData);
      setLoading(false);
    } catch (err) {
      console.log('Failed to fetch products:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // 리스트 페이지로 이동 함수
  const moveToList = () => {
    navigate('/product/list');
  };

  // Update 모달 열기 함수
  const openUpdateModal = () => {
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
  };

  // Update 모달 닫기 함수
  const closeUpdateModal = () => {
    setSelectedProduct(null);
    setIsUpdateModalOpen(false);
    refreshProduct(); // 상태 새로고침
  };

  // Delete 모달 열기 함수
  const openDeleteModal = () => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  // Delete 모달 닫기 함수
  const closeDeleteModal = () => {
    setSelectedProduct(null);
    setIsDeleteModalOpen(false);
  };

  // 상태 새로고침 함수
  const refreshProduct = () => {
    if (pno) {
      getProduct(parseInt(pno)); // 상태 업데이트를 위해 제품 정보 다시 가져오기
    }
  };

  // 삭제 처리 함수
  const handleDelete = () => {
    setProduct({ ...initialState }); // 삭제 후 상태 초기화
    setIsDeleteModalOpen(false); // 삭제 모달 닫기
    moveToList(); // 리스트 페이지로 이동
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>
      {product && (
        <div className="border rounded p-4 shadow-lg">
          <p className="mb-2">
            <strong>Product No:</strong> {product.pno}
          </p>
          {product.uploadFileNames.length > 0 && (
            <div className="mb-4 flex space-x-4 overflow-x-auto">
              {product.uploadFileNames.map((s_fileName, index) => (
                <img
                  key={index}
                  src={`http://localhost:8089/api/products/view/${s_fileName}`}
                  alt={`${product.pname} image ${index + 1}`}
                  className="flex-shrink-0 w-60 h-60 rounded mb-2 object-cover"
                />
              ))}
            </div>
          )}
          <p className="mb-2">
            <strong>Product Name:</strong> {product.pname}
          </p>
          <p className="mb-2">
            <strong>Description:</strong> {product.pdesc}
          </p>
          <p className="mb-2">
            <strong>Price:</strong> ${product.price}
          </p>
        </div>
      )}
      <div className="flex justify-center mt-4 space-x-4">
        <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={moveToList}>
          LIST
        </button>
        <button className="bg-success hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={openUpdateModal}>
          CORRECTION, UPDATE
        </button>
        <button className="bg-danger hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={openDeleteModal}>
          DELETE
        </button>
      </div>


      {/* UpdateModal 컴포넌트 추가 및 모달 상태 전달 */}
      <UpdateModal
        isCorrectionModalOpen={isUpdateModalOpen}
        closeCorrectionModal={closeUpdateModal}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        refreshProduct={refreshProduct} // 상태 업데이트 함수 전달
      />

      {/* DeleteModal 컴포넌트 추가 및 모달 상태 전달 */}
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        closeDeleteModal={closeDeleteModal}
        selectedProduct={selectedProduct}
        handleDelete={handleDelete} // 삭제 처리 함수 전달
        navigateToList={moveToList} // 삭제 후 리스트 페이지로 이동
      />

    </div>
  );
}

export default ReadPage;