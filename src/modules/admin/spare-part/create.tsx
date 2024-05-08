import { useRouter } from "next/router";
import { useCreateSparePart } from "../../../api-hooks/spare-part-api";
import { SparePartFormType } from "./component/type";
import { FileWithPath } from "@mantine/dropzone";
import SparePartForm from "./component/spare-part-form";
import React from "react";

export default function SparePartCreate() {
  const {mutateAsync} = useCreateSparePart();
  const {push} = useRouter();
  const onSubmit = React.useCallback(async (values: SparePartFormType, files: FileWithPath[]) => {

  }, []);
  return <SparePartForm onSubmit={onSubmit}/>
}