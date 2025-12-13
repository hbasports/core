"use client";

import Link from "next/link"
import FormProvider from "../../components/form/FormProvider";
import { InputField } from "../../components/form/inputs/Input";
import AuthContainer from "../../components/form/ui/AuthContainer";

interface SignupValues {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export default function Signup() {

    const SignupFooter = () => (
        <Link href=""></Link>
    )

    return (
        <div className="bg-[var(--color-bg-primary)]">
            <AuthContainer
                heading="Register">
                <FormProvider>
                    <form className="bg-white">

                        <InputField name="name" placeholder="Username" />

                    </form>
                </FormProvider>
            </AuthContainer>
        </div>
    )
}