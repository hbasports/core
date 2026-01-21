import Signup from "@/modules/signup-view";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up | HBA SPORTS"
}

const ServerPage = () => {
    return <Signup />;
}

export default ServerPage;
