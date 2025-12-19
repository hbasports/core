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
        <div className="bg-[var(--color-bg-secondary)]">
            <AuthContainer
                heading="Register">
                <FormProvider>
                    <form className="bg-white space-y-2">

                        <InputField label="Username" name="name" placeholder="Username" />
                        <InputField label="Password" type="password" name="name" placeholder="Password" />

                    </form>
                </FormProvider>
            </AuthContainer>
        </div>
    )
}