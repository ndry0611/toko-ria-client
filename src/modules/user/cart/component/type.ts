import * as Yup from "yup";

export const AddCartDetailSchema = () =>
  Yup.object({
    id_spare_part: Yup.string().optional(),
    quantity: Yup.number().required(),
    price: Yup.number().required().min(1, "Minimal pembelian harus 1"),
  });

export type AddCartDetailFormType = Yup.InferType<
  ReturnType<typeof AddCartDetailSchema>
>;
