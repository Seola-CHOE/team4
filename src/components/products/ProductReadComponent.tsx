import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import UpdateModal from '../../common/modal/UpdateModal';
import DeleteModal from '../../common/modal/DeleteModal';
import useProduct from '../../hooks/useProduct'; // 커스텀 훅을 올바르게 임포트
import { IProduct } from '../../types/product';

function ReadPage() {
  const { pno } = useParams<{ pno: string }>(); // URL 파라미터에서 pno를 가져옴
  const { product, loading, fetchProduct } = useProduct(pno); // Custom Hook 사용
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 이미지 인덱스 상태 추가
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams(); // URL의 query 파라미터를 관리하는 훅

  // URL 파라미터 초기 설정 (필요 시)
  useEffect(() => {
    if (!query.get('page') || !query.get('size')) {
      setQuery({ page: '1', size: '10' });
    }
  }, [query, setQuery]);

  // 제품 정보가 업데이트될 때 이미지 인덱스를 초기화
  useEffect(() => {
    if (product?.uploadFileNames.length) {
      setCurrentImageIndex(0); // 이미지 업데이트 시 인덱스 초기화
    }
  }, [product?.uploadFileNames]);

  // 히스토리 상태를 관리하기 위한 설정 추가
  useEffect(() => {
    // 현재 페이지 상태를 히스토리에 추가
    window.history.pushState(
      { page: `/product/read/${pno}` },
      '',
      `/product/read/${pno}?page=${query.get('page') || 1}&size=${query.get('size') || 10}`
    );

    // popstate 이벤트를 감지하여 뒤로 가기 이벤트 처리
    const handlePopState = (event: PopStateEvent) => {
      console.log('popstate event detected', event.state); // 이벤트 발생 여부 확인용 로그

      // 이전 상태로 돌아갈 때 리스트 페이지로 이동
      if (event.state?.page) {
        navigate(`/product/list?page=${query.get('page') || 1}&size=${query.get('size') || 10}`, { replace: true });
      }
    };

    // popstate 이벤트 리스너 추가
    window.addEventListener('popstate', handlePopState);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pno, query, navigate]);

  // 리스트 페이지로 이동 함수
  const moveToList = () => {
    // 히스토리 상태를 변경하여 리스트 페이지로 이동
    window.history.pushState(
      { page: '/product/list' },
      '',
      `/product/list?page=${query.get('page') || 1}&size=${query.get('size') || 10}`
    );
    navigate(`/product/list?page=${query.get('page') || 1}&size=${query.get('size') || 10}`);
  };

  // 모달 상태 관리 함수
  const toggleModal = (type: 'update' | 'delete', isOpen: boolean) => {
    if (type === 'update') {
      setIsUpdateModalOpen(isOpen);
      setSelectedProduct(product); // update 모달 열기 시 선택된 제품 상태 설정
    }
    if (type === 'delete') {
      setIsDeleteModalOpen(isOpen);
      setSelectedProduct(product); // delete 모달 열기 시 선택된 제품 상태 설정
    }
  };

  // 제품 정보 새로고침
  const refreshProduct = () => {
    fetchProduct();
    window.history.replaceState(
      { page: `/product/read/${pno}` },
      '',
      `/product/read/${pno}?page=${query.get('page') || 1}&size=${query.get('size') || 10}`
    );
    navigate(`/product/read/${pno}?page=${query.get('page') || 1}&size=${query.get('size') || 10}`);
  };

  // 삭제 처리 함수
  const handleDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
    moveToList(); // 삭제 후 리스트 페이지로 이동
  };

  // 이미지 이동 함수
  const changeImage = (direction: 'next' | 'prev') => {
    if (!product) return;
    const totalImages = product.uploadFileNames.length;
    setCurrentImageIndex((prevIndex) => {
      if (direction === 'next') return (prevIndex + 1) % totalImages;
      if (direction === 'prev') return prevIndex === 0 ? totalImages - 1 : prevIndex - 1;
      return prevIndex;
    });
  };

  // 로딩 중일 때 보여줄 화면
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-3xl font-semibold text-bodydark animate-spin-1.5">Loading...</div>
      </div>
    );
  }

  // 실제 화면 렌더링
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
                  <img
                    src={`http://localhost:8089/api/products/view/${product.uploadFileNames[currentImageIndex]}`}
                    alt={`${product.pname} image ${currentImageIndex + 1}`}
                    className="rounded-lg shadow-lg object-cover w-64 h-64 transform transition-all duration-300 hover:scale-105"
                    onError={(e) => (e.currentTarget.src = '/default-image.png')}
                  />
                </div>
                {product.uploadFileNames.length > 1 && (
                  <>
                    <button onClick={() => changeImage('prev')} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 rounded-full p-2 hover:bg-gray-700 focus:outline-none">
                      &#9664;
                    </button>
                    <button onClick={() => changeImage('next')} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 rounded-full p-2 hover:bg-gray-700 focus:outline-none">
                      &#9654;
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}
        <div className="flex justify-center mt-8 space-x-6">
          <button className="bg-primary hover:bg-blue-700 text-white py-2 px-8 rounded-lg font-semibold shadow-lg transition duration-300 ease-in-out" onClick={moveToList}>
            LIST
          </button>
          <button className="bg-success hover:bg-meta-3 text-white py-2 px-8 rounded-lg font-semibold shadow-lg transition duration-300 ease-in-out" onClick={() => toggleModal('update', true)}>
            UPDATE
          </button>
          <button className="bg-danger hover:bg-meta-7 text-white py-2 px-8 rounded-lg font-semibold shadow-lg transition duration-300 ease-in-out" onClick={() => toggleModal('delete', true)}>
            DELETE
          </button>
        </div>
      </div>

      {/* Update, Delete 모달 컴포넌트 렌더링 */}
      <UpdateModal
        isCorrectionModalOpen={isUpdateModalOpen}
        closeCorrectionModal={() => toggleModal('update', false)}
        selectedProduct={selectedProduct} // 선택된 제품 상태 전달
        setSelectedProduct={setSelectedProduct} // setSelectedProduct 함수 전달
        refreshProduct={refreshProduct} // 새로고침 함수 전달
      />
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        closeDeleteModal={() => toggleModal('delete', false)}
        selectedProduct={selectedProduct} // 선택된 제품 상태 전달
        handleDelete={handleDelete} // 삭제 처리 함수 전달
        navigateToList={moveToList} // 리스트 페이지로 이동 함수 전달
      />
    </div>
  );
}

export default ReadPage;