
import Modal from 'react-modal';
import { IProduct } from '../../types/product.ts'; // IProduct 타입 import
import { deleteProduct } from '../../api/productAPI.ts'; // deleteProduct 함수 import

// DeleteModalProps 타입 정의
interface DeleteModalProps {
  isDeleteModalOpen: boolean;
  closeDeleteModal: () => void;
  selectedProduct: IProduct | null;
  handleDelete: () => void; // 삭제 처리 함수
  navigateToList: () => void; // 리스트 페이지로 이동하는 함수
}

function DeleteModal({
                       isDeleteModalOpen,
                       closeDeleteModal,
                       selectedProduct,
                       handleDelete,
                       navigateToList,
                     }: DeleteModalProps) {

  const deleteSelectedProduct = async () => {
    if (selectedProduct) {
      try {

        await deleteProduct(selectedProduct.pno);


        console.log(`Product ${selectedProduct.pname} has been deleted.`);


        handleDelete();
        navigateToList();
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  return (
    <Modal
      isOpen={isDeleteModalOpen}
      onRequestClose={closeDeleteModal}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          width: '400px',
          borderRadius: '10px',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경색 설정
        },
      }}
      contentLabel="Delete Confirmation Modal"
    >
      <h2 className="text-2xl font-bold mb-4">Delete Confirmation</h2>
      {selectedProduct && (
        <div>
          {/* 삭제 경고 메시지 */}
          <p>
            이 상품 <span className="font-bold">"{selectedProduct.pname}"</span>을(를) 삭제하시겠습니까?
          </p>
          <div className="flex justify-end mt-4 space-x-4">
            {/* 삭제 확인 버튼 */}
            <button
              className="bg-danger hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={deleteSelectedProduct} // 수정된 삭제 로직 실행
            >
              Yes, Delete
            </button>
            {/* 취소 버튼 */}
            <button
              className="bg-success hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={closeDeleteModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default DeleteModal;
