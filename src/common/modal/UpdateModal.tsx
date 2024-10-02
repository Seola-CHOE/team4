import React, { useState } from 'react';
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // 파일 상태 추가

  // 파일 변경 처리 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // 수정 로직
  const handleModify = async () => {
    if (selectedProduct) {
      try {
        // selectedProduct의 각 속성이 undefined가 아닌지 확인
        const formData = new FormData();
        formData.append('pname', selectedProduct.pname ?? ''); // pname이 undefined인 경우 빈 문자열 사용
        formData.append('pdesc', selectedProduct.pdesc ?? '');
        formData.append('price', selectedProduct.price?.toString() ?? '0'); // price가 undefined인 경우 '0' 사용
        formData.append('del_flag', selectedProduct.del_flag?.toString() ?? 'false'); // del_flag가 undefined인 경우 'false' 사용

        // 선택된 파일이 있을 경우 FormData에 추가
        if (selectedFile) {
          formData.append('file', selectedFile);
        }

        // 서버에 수정된 제품 정보 전송
        const response = await updateProduct(selectedProduct.pno, formData);

        console.log('Product successfully updated:', response);

        // 상태 업데이트를 위해 리로드
        refreshProduct();

        // 모달 닫기 및 Read 페이지로 이동
        closeCorrectionModal();
      } catch (error) {
        console.error('Failed to update product:', error);
      }
    } else {
      console.error('selectedProduct is null or undefined');
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
              value={selectedProduct.pname ?? ''} // pname이 undefined인 경우 빈 문자열 사용
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
              value={selectedProduct.pdesc ?? ''}
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
              value={selectedProduct.price?.toString() ?? '0'}
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
              value={selectedProduct.del_flag?.toString() ?? 'false'}
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

          {/* 이미지 파일 수정 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Image:
            </label>
            <input
              type="file"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              accept="image/*"
              onChange={handleFileChange} // 파일 변경 이벤트 연결
            />
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
