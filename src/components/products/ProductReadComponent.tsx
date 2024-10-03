// ReadPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOne } from '../../api/productAPI';
import UpdateModal from '../../common/modal/UpdateModal';
import DeleteModal from '../../common/modal/DeleteModal';
import { IProduct } from '../../types/product';

// 초기 상태 정의
const initialState: IProduct = {
  pno: 0,
  pname: '',
  pdesc: '',
  price: 0,
  uploadFileNames: [],
  del_flag: false,
};

function ReadPage() {
  const { pno } = useParams<{ pno: string }>(); // URL 파라미터에서 pno를 가져옴
  const [product, setProduct] = useState<IProduct>({ ...initialState });
  const [loading, setLoading] = useState<boolean>(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 이미지 인덱스 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    if (pno) {
      getProduct(parseInt(pno));
    }
  }, [pno]);

  useEffect(() => {
    // 이미지가 업데이트되면 currentImageIndex를 초기화
    if (product.uploadFileNames.length > 0) {
      setCurrentImageIndex(0); // 이미지가 업데이트될 때마다 인덱스 초기화
    }
  }, [product.uploadFileNames]);

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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-3xl font-semibold text-bodydark animate-spin-1.5">Loading...</div>
      </div>
    );
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
    setSelectedProduct(null); // 모달 닫을 때 상태 초기화
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

  // 다음 이미지로 이동하는 함수
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.uploadFileNames.length);
  };

  // 이전 이미지로 이동하는 함수
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.uploadFileNames.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl bg-gray-2 rounded-xl shadow-default">
      <div className="bg-white rounded-lg shadow-card p-8 transition-all duration-300 hover:shadow-card-2">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-primary">Product Details</h2>
        {product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <p className="text-lg font-medium text-black mb-4">
                <span className="font-bold text-black">Product No:</span> <span className="text-bodydark">{product.pno}</span>
              </p>
              <p className="text-lg font-medium text-black mb-4">
                <span className="font-bold text-black">Product Name:</span> <span className="text-bodydark">{product.pname}</span>
              </p>
              <p className="text-lg font-medium text-black mb-4">
                <span className="font-bold text-black">Category:</span> <span className="text-bodydark">{product.pdesc}</span>
              </p>
              <p className="text-lg font-medium text-black mb-4">
                <span className="font-bold text-black">Price:</span> <span className="text-bodydark">${product.price}</span>
              </p>
            </div>
            {product.uploadFileNames.length > 0 && (
              <div className="relative flex items-center justify-center">
                {/* 이미지 슬라이드 컨테이너 */}
                <div className="relative">
                  {/* 현재 선택된 이미지 */}
                  <img
                    src={`http://localhost:8089/api/products/view/${product.uploadFileNames[currentImageIndex]}`}
                    alt={`${product.pname} image ${currentImageIndex + 1}`}
                    className="rounded-lg shadow-lg object-cover w-64 h-64 transform transition-all duration-300 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/default-image.png'; // 이미지 로드 오류 시 대체 이미지
                    }}
                  />
                </div>
                {/* 이전/다음 버튼은 이미지가 2개 이상일 때만 표시 */}
                {product.uploadFileNames.length > 1 && (
                  <>
                    {/* 이전 이미지 버튼 */}
                    <button
                      onClick={prevImage}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800  rounded-full p-2 hover:bg-gray-700 focus:outline-none"
                    >
                      &#9664;
                    </button>
                    {/* 다음 이미지 버튼 */}
                    <button
                      onClick={nextImage}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 rounded-full p-2 hover:bg-gray-700 focus:outline-none"
                    >
                      &#9654;
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}
        <div className="flex justify-center mt-8 space-x-6">
          <button
            className="bg-primary hover:bg-blue-700 text-white py-2 px-8 rounded-lg font-semibold shadow-lg transition duration-300 ease-in-out"
            onClick={moveToList}
          >
            LIST
          </button>
          <button
            className="bg-success hover:bg-meta-3 text-white py-2 px-8 rounded-lg font-semibold shadow-lg transition duration-300 ease-in-out"
            onClick={openUpdateModal}
          >
            UPDATE
          </button>
          <button
            className="bg-danger hover:bg-meta-7 text-white py-2 px-8 rounded-lg font-semibold shadow-lg transition duration-300 ease-in-out"
            onClick={openDeleteModal}
          >
            DELETE
          </button>
        </div>
      </div>

      <UpdateModal
        isCorrectionModalOpen={isUpdateModalOpen}
        closeCorrectionModal={closeUpdateModal}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        refreshProduct={refreshProduct}
      />

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
