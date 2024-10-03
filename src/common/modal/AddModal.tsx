import Modal from 'react-modal';


// AddModalProps 타입 정의
interface AddModalProps {
    isAddModalOpen: boolean;
    closeAddModal: () => void;
}

function AddModal({
                      isAddModalOpen,
                      closeAddModal,
                     }: AddModalProps) {


    return (
        <Modal
            isOpen={isAddModalOpen}
            onRequestClose={closeAddModal}
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
            contentLabel="Add Confirmation Modal"
        >
            <h2 className="text-2xl font-bold mb-4">Registration Confirmation</h2>

                <div>
                    {/* 등록 확인 메시지 */}
                    <p>
                        상품이 등록되었습니다.
                    </p>
                    <div className="flex justify-end mt-4 space-x-4">

                        {/* 닫기 버튼 */}
                        <button
                            className="bg-primary hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            onClick={closeAddModal}
                        >
                            Close
                        </button>
                    </div>
                </div>

        </Modal>
    );
}

export default AddModal;