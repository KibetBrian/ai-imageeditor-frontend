import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import React from "react";

interface CustomModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  body: React.ReactNode;
  footer: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "xs" | "3xl" | "4xl" | "5xl" | "full";
  title?: string;
}

const CustomModal = ({ body, footer, isOpen, onOpenChange, title, size = "sm" }: CustomModalProps) => {
  return (
    <Modal isOpen={isOpen} radius="sm" size={size} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
