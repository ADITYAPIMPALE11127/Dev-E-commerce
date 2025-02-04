// ConfirmQuantityModal.tsx
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    selectedItem: any; // Adjust the type as needed
}

const ConfirmQuantityModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, selectedItem }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg">
                <h2 className="text-lg font-semibold">Notice</h2>
                <p className="mt-2">
                    You have added the product "{selectedItem?.name}" multiple times (Quantity: {selectedItem?.quantity}).
                    Do you want to proceed to checkout with these quantities?
                </p>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">No</button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-blue-600 text-white rounded">Yes</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmQuantityModal;
