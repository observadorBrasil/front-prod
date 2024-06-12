import React, { useCallback, useEffect, useState } from "react";
import { Box, Image, Input, StackProps, Text, VStack } from "@chakra-ui/react";
import { convertBase64 } from "@observatorio-brasil/atores/src/utils/file";
import { UseFormRegisterReturn } from "react-hook-form";
import Button from "../../Button";

interface Props {
  containerProps?: StackProps;
  rhfregister: UseFormRegisterReturn;
  multiple?: boolean;
  accept?: string;
  buttonLabel: string;
  fileWatch?: FileList;
  previewUrl?: string;
}
const maxSizeInBytes = 5e6;
const maxSizeInMb = Math.round(maxSizeInBytes / 1e3);

const FileUploader = (props: Props) => {
  const {
    containerProps,
    rhfregister,
    multiple,
    accept,
    buttonLabel,
    fileWatch,
    previewUrl,
  } = props;

  const [preview, setPreview] = useState<string[]>();
  const [err, setErr] = useState<string | undefined>();

  const onSelectFile = useCallback(async (fileList: FileList) => {
    const files = Array.from(fileList);

    const filesSize = files.map((f) => f.size).reduce((acc, cur) => acc + cur);
    if (filesSize > maxSizeInBytes) {
      setErr(`Os arquivos têm ${Math.round(filesSize / maxSizeInMb)}mb!`);
      return;
    }

    setErr(undefined);
    const promisesBase64 = files.map(async (file) => await convertBase64(file));
    const previewBase64 = await Promise.all(promisesBase64);
    setPreview(previewBase64);
  }, []);

  useEffect(() => {
    if (!fileWatch || fileWatch?.length === 0) {
      setPreview(undefined);
      return;
    }

    onSelectFile(fileWatch);
  }, [fileWatch, onSelectFile]);

  return (
    <VStack {...containerProps}>
      <Box alignSelf={"flex-start"}>
        <Text color="gray">Tamanho Máximo: 5mb</Text>
      </Box>
      <Button w={"100%"} variant={"secondary"}>
        {buttonLabel}
        <Input
          type={"file"}
          multiple={multiple}
          accept={accept ?? "*"}
          cursor={"pointer"}
          h={"auto"}
          w={"100%"}
          pos={"absolute"}
          top={0}
          left={0}
          opacity={0}
          zIndex={2}
          {...rhfregister}
        />
      </Button>
      <Box>
        {!preview && previewUrl && (
          <Image src={previewUrl} alt="businessIconUpload" />
        )}
        {preview &&
          preview.map((i, idx) => (
            <Image key={idx} src={i} alt="businessIconUpload" />
          ))}
        {err && <Text color="red">{err}</Text>}
      </Box>
    </VStack>
  );
};

export default FileUploader;
