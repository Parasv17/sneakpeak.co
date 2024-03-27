import LoginForm from "./LoginForm";
// import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  
  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;

export const metadata = {
  title: "Login",
  description: "Login to your account",
};
