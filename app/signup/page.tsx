import SignUp from "@/components/auth/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Signup',
};

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;
