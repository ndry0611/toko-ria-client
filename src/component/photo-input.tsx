import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import Image from "next/image";
import { color } from "../common/constants/color";
import { Flex, Text } from "@mantine/core";
import { ImageSquare } from "@phosphor-icons/react";
import { useFormState } from "./form";

export function PhotoPreview(props: {
  imageUrl: FileWithPath | string;
  size?: number;
}) {
  const { imageUrl, size = 128 } = props;
  const isUrlString = typeof imageUrl === "string";
  const url = isUrlString ? imageUrl : URL.createObjectURL(imageUrl);
  const onLoad = isUrlString ? undefined : () => URL.revokeObjectURL(url);
  if (url) {
    return (
      <Image
        onClick={(e) => {
          e.stopPropagation();
          window?.open(url, "_blank")?.focus();
        }}
        alt="image"
        width={size}
        height={size}
        src={url}
        style={{
          border: `1px solid ${color.mainBlack}`,
          objectFit: "cover",
          overflow: "hidden",
          borderRadius: 4,
          objectPosition: "top",
          minWidth: size,
          minHeight: size,
        }}
        onLoad={onLoad}
      />
    );
  } else {
    return (
      <ImageSquare
        size={size}
        style={{ backgroundColor: color.mainTheme, borderRadius: 4 }}
      />
    );
  }
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
        <>
          <Text fz={12} c={"red"}>*Ukuran gambar maksimal 5 MB</Text>
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
        </>
      ) : (
        defaultPreview
      )}
    </>
  );
}
