import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import TextInput from "../../RHF/TextInput";
import { useForm } from "react-hook-form";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  action: () => Promise<void>;
}

export function ConfirmModal({
  isOpen,
  onClose,
  title,
  message,
  action,
}: ConfirmModalProps) {
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    try {
      setLoading(true);
      await action();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{message}</ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose} isLoading={loading}>
              Cancelar
            </Button>
            <Button onClick={handleAction} isLoading={loading}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
