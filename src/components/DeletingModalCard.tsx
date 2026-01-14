import React, { useState } from "react";
import { Trash2, X, AlertTriangle, CheckCircle } from "lucide-react"; // Tambahkan CheckCircle untuk demo

interface DeleteCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (cardId: string) => void;
  cardName: string;
  cardId: string;
}

export const DeleteCardModal: React.FC<DeleteCardModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  cardName,
  cardId,
}) => {
  if (!isOpen) return null;

  const handleDelete = () => {
    onConfirm(cardId);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all border border-gray-200 p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <header className="flex justify-between items-start border-b border-gray-200 pb-4 mb-4">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0" />
            <h3 id="modal-title" className="text-xl font-bold text-gray-900">
              Konfirmasi Penghapusan
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="text-center py-4">
          <p
            id="modal-description"
            className="text-justify text-gray-600 mb-6 leading-relaxed"
          >
            Anda yakin ingin menghapus data diri? Tindakan ini tidak dapat
            dibatalkan. Semua data terkait kartu ini akan hilang secara
            permanen.
          </p>
        </div>

        <footer className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
          <button
            onClick={handleDelete}
            className="w-full sm:w-auto flex justify-center items-center px-4 py-2.5 text-white bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md shadow-red-500/30"
          >
            <Trash2 className="h-5 w-5 mr-2" />
            Ya, Hapus
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto flex justify-center items-center px-4 py-2.5 text-gray-700 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition-colors border border-gray-300"
          >
            Batalkan
          </button>
        </footer>
      </div>
    </div>
  );
};
