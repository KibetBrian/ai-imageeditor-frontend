import { useState } from "react";

type Modal = "viewUploadedImage";

interface ModalProperties {
  id: Modal;
  open: boolean;
}

const useBackgroundRemovalModalManager = (id: Modal) => {
  const [modals, setModals] = useState<ModalProperties[]>([]);

  const openModal = () => {
    setModals((prev) => {
      const newModals = prev.map((modal) => {
        if (modal.id === id) {
          return { ...modal, open: true };
        }

        return modal;
      });

      return newModals;
    });
  };

  const closeModal = () => {
    setModals((prev) => {
      const newModals = prev.map((modal) => {
        if (modal.id === id) {
          return { ...modal, open: false };
        }

        return modal;
      });

      return newModals;
    });
  };

  const isModalOpen = modals.find((modal) => modal.id === id)?.open;

  return {
    openModal,
    closeModal,
    isModalOpen,
  };
};

export default useBackgroundRemovalModalManager;
