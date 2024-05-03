import { FileWithPath } from "@mantine/dropzone";
import React from "react";

interface FileContextProps {
  files: FileWithPath[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
}

const FileContext = React.createContext<FileContextProps>({
  files: [],
  setFiles: () => {},
});

export function FilesProvider(props: {
  children: React.ReactNode;
  files: FileWithPath[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
}) {
  const { files, setFiles } = props;

  return (
    <FileContext.Provider
      value={{
        files: files,
        setFiles: setFiles,
      }}
    >
      {props.children}
    </FileContext.Provider>
  );
}

export function useFilesContext() {
  const context = React.useContext(FileContext);
  return context;
}
