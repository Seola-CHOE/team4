import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { IProduct } from '../../types/product.ts';
import { updateProduct } from '../../api/productAPI';

interface UpdateModalProps {
  isCorrectionModalOpen: boolean;
  closeCorrectionModal: () => void;
  selectedProduct: IProduct | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<IProduct | null>>;
  refreshProduct: () => void;
}

// react-modal 초기화 코드
Modal.setAppElement('#root');

const UpdateModal: React.FC<UpdateModalProps> = ({
                                                   isCorrectionModalOpen,
                                                   closeCorrectionModal,
                                                   selectedProduct,
                                                   setSelectedProduct,
                                                   refreshProduct,
                                                 }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // 파일 배열로 상태 관리
  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // 미리보기 URL 배열

  useEffect(() => {
    if (selectedProduct) {
      console.log('Selected product:', selectedProduct);
    }
  }, [selectedProduct]);

  // 파일 변경 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files); // 선택한 파일 배열로 변환
      setSelectedFiles(filesArray);

      // 파일 미리보기 URL 생성
      const urls = filesArray.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);
    }
  };

  // 수정 버튼 클릭 핸들러
  const handleModify = async () => {
    if (!selectedProduct) return;

    try {
      const formData = new FormData();
      formData.append('pname', selectedProduct.pname ?? '');
      formData.append('pdesc', selectedProduct.pdesc ?? '');
      formData.append('price', selectedProduct.price?.toString() ?? '0');
      formData.append('pno', selectedProduct.pno.toString()); // pno 추가

      // 선택된 파일이 있을 때만 파일 추가
      selectedFiles.forEach((file) => {
        formData.append('files', file); // 파일들을 formData에 추가
      });

      // 서버로 폼 데이터 전송하여 상품 업데이트
      await updateProduct(selectedProduct.pno, formData);

      // 상태 갱신 및 모달 창 닫기
      refreshProduct();
      closeCorrectionModal();
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  return (
    <Modal
      isOpen={isCorrectionModalOpen}
      onRequestClose={closeCorrectionModal}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto p-6 relative"
      contentLabel="Update Product Modal"
    >
      <h2 className="text-2xl font-bold mb-4">Product Update</h2>
      {selectedProduct && (
        <div className="space-y-4">
          {/* 제품명 입력 필드 */}
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedProduct.pname ?? ''}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, pname: e.target.value })}
          />

          {/* 제품 설명 입력 필드 */}
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedProduct.pdesc ?? ''}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, pdesc: e.target.value })}
          />

          {/* 가격 입력 필드 */}
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedProduct.price?.toString() ?? '0'}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) || 0 })}
          />

          {/* 파일 선택 필드 - multiple 속성 추가 */}
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={handleFileChange}
          />

          {/* 새로운 파일 미리보기 */}
          {previewUrls.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">New Image Previews</h3>
              <div className="grid grid-cols-2 gap-4">
                {previewUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24 object-cover border border-gray-300 rounded-md"
                  />
                ))}
              </div>
            </div>
          )}

          {/* 업데이트 및 취소 버튼 */}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={handleModify}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update
            </button>
            <button
              onClick={closeCorrectionModal}
              className="px-4 py-2 bg-success text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default UpdateModal;