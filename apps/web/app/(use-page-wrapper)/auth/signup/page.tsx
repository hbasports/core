import type { Metadata } from "next";

import Signup from "../../../../modules/auth/signup-view";

export const metadata: Metadata = {
    title: "Register | HBA Sports",
    description: "Register a new HBA Sports scoring account."
}

const ServerPage = async () => {
    return <Signup />
}

export default ServerPage