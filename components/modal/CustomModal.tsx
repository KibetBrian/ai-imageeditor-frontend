import { Modal, ModalBody, ModalContent } from "@nextui-org/modal";
import React from "react";

interface CustomModalProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const CustomModal = ({ children, handleClose, open }: CustomModalProps) => {
  return (
    <Modal backdrop="blur" isOpen={open} radius="sm" scrollBehavior="inside" size="4xl" onClose={handleClose}>
      <ModalContent>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
