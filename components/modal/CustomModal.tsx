import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import React from "react";

interface CustomModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  body: React.ReactNode;
  footer: React.ReactNode;
  header: React.ReactNode;
  width?: string;
  height?: string;
}

const CustomModal = ({ body, footer, isOpen, onOpenChange, header, width = "50vw", height = "50vh" }: CustomModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      radius="sm"
      size="3xl"
      style={{
        width,
        height,
      }}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="flex flex-[1] flex-col gap-1">{header}</ModalHeader>
        <ModalBody className="flex-[10]">{body}</ModalBody>
        <ModalFooter className="flex-[1]">{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
