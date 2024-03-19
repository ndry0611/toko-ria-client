import { Container, Image, Text } from "@mantine/core";
import FormComponent from "../../modules/login/form";

function LoginPage() {
    return (
        <Container
            fluid
            className="page"
        >
            <LoginText />
            <FormComponent />
        </Container>
    )
}

function LoginText() {
    return (
        <>
            <Text
            size="xl"
            
            >
                Welcome To
            </Text>
            <Image
                src={'/logo.svg'}
                fit="contain"
                h={200} w={500}
                alt="logo"
            />

        </>
    )
}

export default function LoginPageView() {
    return (
        <LoginPage />
    )
}