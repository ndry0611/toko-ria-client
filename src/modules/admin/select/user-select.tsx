import { ComboboxItem } from "@mantine/core";
import { GetUserModel, UserFilter } from "../user/component/user-type";
import { SelectInputFieldProps } from "../../../component/input/select-input-field";
import { useGetUsers } from "../../../api-hooks/user-api";
import Input from "../../../component/input";

type UserOption = ComboboxItem & { item: GetUserModel };

interface UserSelectProps
  extends Omit<SelectInputFieldProps, "data" | "type" | "onAfterChange"> {
  filtering?: UserFilter;
  onAfterChange?: (value: UserOption) => void;
}

export function userTransformer(value: GetUserModel): UserOption {
  return {
    value: value.id.toString(),
    label: `${value.name} (${value.username})`,
    item: value,
  };
}

export default function UserSelect(props: UserSelectProps) {
  const { filtering, onAfterChange, ...rest } = props;
  const { data } = useGetUsers(filtering);
  const options = (data || []).map((item) => userTransformer(item));
  return (
    <Input
      type="select"
      data={options}
      onAfterChange={onAfterChange as any}
      {...rest}
    />
  );
}
