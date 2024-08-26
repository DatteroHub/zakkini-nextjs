import ForgotPassword from "@/components/auth/ForgotPassword";
import { Metadata } from "next";

//export const runtime = "edge";
export const metadata: Metadata = {
  title: 'Forgot Password',
};

const ForgotPasswordPage = () => {
  return <ForgotPassword />;
};

export default ForgotPasswordPage;
