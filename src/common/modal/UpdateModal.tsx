import React from 'react';
import Modal from 'react-modal';
import { IProduct } from '../../types/product.ts'; // IProduct 타입 import
import { updateProduct } from '../../api/productAPI'; // updateProduct API import

// UpdateModalProps 타입 정의
interface UpdateModalProps {
  isCorrectionModalOpen: boolean;
  closeCorrectionModal: () => void;
  selectedProduct: IProduct | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<IProduct | null>>;
  refreshProduct: () => void; // 상태 업데이트를 위한 함수
}

function UpdateModal({
                       isCorrectionModalOpen,
                       closeCorrectionModal,
                       selectedProduct,
                       setSelectedProduct,
                       refreshProduct,
                     }: UpdateModalProps) {
  // 수정 로직
  const handleModify = async () => {
    if (selectedProduct) {
      try {
        // undefined 확인 및 방어 코드 추가
        const modifiedProduct = {
          ...selectedProduct,
          pname: selectedProduct.pname || '', // 기본값 설정
          pdesc: selectedProduct.pdesc || '', // 기본값 설정
          price: selectedProduct.price ? selectedProduct.price.toString() : '0', // 값이 없을 경우 '0'으로 설정
        };

        const formData = new FormData();
        formData.append('pname', modifiedProduct.pname);
        formData.append('pdesc', modifiedProduct.pdesc);
        formData.append('price', modifiedProduct.price);
        formData.append('del_flag', modifiedProduct.del_flag.toString());

        // 서버에 수정된 제품 정보 전송
        const response = await updateProduct(modifiedProduct.pno, formData);

        console.log('Product successfully updated:', response);

        // 상태 업데이트 및 모달 닫기
        refreshProduct();
        closeCorrectionModal();
      } catch (error) {
        console.error('Failed to update product:', error);
      }
    }
  };

  return (
    <Modal
      isOpen={isCorrectionModalOpen}
      onRequestClose={closeCorrectionModal}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          width: '500px',
          borderRadius: '10px',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경색 설정
        },
      }}
      contentLabel="Update Product Modal"
    >
      <h2 className="text-2xl font-bold mb-4">Product Update</h2>
      {selectedProduct && (
        <div className="space-y-4">
          {/* 제품 이름 수정 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name:
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={selectedProduct.pname}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  pname: e.target.value,
                })
              }
            />
          </div>

          {/* 제품 설명 수정 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Description:
            </label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={selectedProduct.pdesc}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  pdesc: e.target.value,
                })
              }
            />
          </div>

          {/* 제품 가격 수정 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Price:
            </label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={selectedProduct.price}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  price: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>

          {/* 삭제 플래그 수정 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Delete Flag:
            </label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={selectedProduct.del_flag ? 'true' : 'false'}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  del_flag: e.target.value === 'true',
                })
              }
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>

          {/* 모달 닫기 및 수정 버튼 */}
          <div className="flex justify-end mt-4 space-x-4">
            <button
              className="bg-danger text-white font-bold py-2 px-4 rounded"
              onClick={closeCorrectionModal}
            >
              Cancel
            </button>
            <button
              className="bg-success text-white font-bold py-2 px-4 rounded"
              onClick={handleModify} // 수정 로직 연결
            >
              Modify
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default UpdateModal;
