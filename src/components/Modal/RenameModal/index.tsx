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

interface RenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialValue: string;
  handleRename: (value: string) => Promise<void>;
}

export function RenameModal({
  isOpen,
  onClose,
  title,
  initialValue,
  handleRename,
}: RenameModalProps) {
  const { register, setValue, getValues } = useForm<{ renameText: string }>({
    defaultValues: { renameText: "" },
  });
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    try {
      setLoading(true);
      const newValue = getValues();
      await handleRename(newValue.renameText);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue("renameText", initialValue);
  }, [initialValue, setValue]);

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TextInput
              rhfregister={register("renameText")}
              id={"renameText"}
              placeholder="renomear..."
              containerProps={{ width: "full" }}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose} isLoading={loading}>
              Cancelar
            </Button>
            <Button onClick={handleAction} isLoading={loading}>
              Renomear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
