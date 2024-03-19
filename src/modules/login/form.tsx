import { Button } from "@mantine/core";
import { InputTooltip } from "./components/input-form";
import './form.css'

interface Props { }

function LoginButton() {
    return (
        <Button
            radius={"md"}
            mt={"md"}
            color="orange"
        >Login</Button>
    )
}

function FormModal() {
    return (
        <div className="modal">
            <InputTooltip />
            <LoginButton />
        </div>
    )
}

export default function FormComponent(props: Props) {
    return (
        <FormModal />
    )
}