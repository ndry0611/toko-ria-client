import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import Image from "next/image";
import { color } from "../common/constants/color";
import { Container, Flex, Text } from "@mantine/core";
import { ImageSquare } from "@phosphor-icons/react";
import { useFormState } from "./form";

export function PhotoPreview(props: { imageUrl: FileWithPath | string }) {
  const { imageUrl } = props;
  const isUrlString = typeof imageUrl === "string";
  const url = isUrlString ? imageUrl : URL.createObjectURL(imageUrl);
  const onLoad = isUrlString ? undefined : () => URL.revokeObjectURL(url);
  return (
    <Image
      onClick={(e) => {
        e.stopPropagation();
        window?.open(url, "_blank")?.focus();
      }}
      alt="image"
      width={128}
      height={128}
      src={url}
      style={{
        border: `1px solid ${color.mainBlack}`,
        objectFit: "cover",
        overflow: "hidden",
        borderRadius: 4,
        objectPosition: "top",
      }}
      onLoad={onLoad}
    />
  );
}

interface PhotoInputProps {
  label?: string;
  defaultImage?: string | null;
  files?: FileWithPath[];
  onDrop: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
}

export default function PhotoInput(props: PhotoInputProps) {
  const { defaultImage, label, files = [], onDrop } = props;

  // previews when input image
  const previews = files.map((file, index) => {
    return <PhotoPreview key={index} imageUrl={file} />;
  });

  const defaultPreview = defaultImage ? (
    <PhotoPreview imageUrl={defaultImage} />
  ) : (
    <Flex
      w={128}
      h={128}
      direction={"column"}
      justify={"center"}
      align={"center"}
      style={{ border: "1px dashed", borderRadius: 4 }}
    >
      <ImageSquare weight="light" size={64} />
      <Text>Drop Your Image</Text>
    </Flex>
  );

  const labelComponent = label && <Text mb={4}>{label}</Text>;
  const { disabled } = useFormState();

  return (
    <>
      {labelComponent}
      {!disabled ? (
        <Dropzone
          accept={IMAGE_MIME_TYPE}
          p={0}
          onDrop={onDrop}
          multiple={false}
          w={128}
          h={128}
          style={{
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {files.length ? previews : defaultPreview}
        </Dropzone>
      ) : (
        defaultPreview
      )}
    </>
  );
}
