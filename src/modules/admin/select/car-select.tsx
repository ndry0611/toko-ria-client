import { ComboboxData, ComboboxItem } from "@mantine/core";
import { CarModel, CarsFilter, useGetCars } from "../../../api-hooks/car-api";
import Input from "../../../component/input";
import { SelectInputFieldProps } from "../../../component/input/select-input-field";

type CarOption = ComboboxItem & {item: CarModel}


interface CarSelectProps extends Omit<SelectInputFieldProps,'data'|'type' |'onAfterChange'> {
  filtering?: CarsFilter
  onAfterChange?:(value:CarOption)=>void
}


export function carTransfomer(value: CarModel):CarOption {
  return {
    value: value.id.toString(),
    label: value.name,
    item: value
  } 
}

export default function CarSelect(props:CarSelectProps) {
  const { filtering, onAfterChange, ...rest} = props
  const {data} = useGetCars(filtering)
  const options = (data||[]).map((item)=> carTransfomer(item))
  return (
    <Input type='select' data={options} onAfterChange={onAfterChange as any}  {...rest}/>
  )
}