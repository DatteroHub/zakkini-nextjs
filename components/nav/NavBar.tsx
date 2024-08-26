import { auth } from "@/auth";
import SignInButtons from "./SignInButtons";
import SignOutButton from "./SignOutButton";

const NavBar = async () => {
  const session = await auth();

  return <>{session?.user ? <SignOutButton /> : <SignInButtons />}</>;
};

NavBar.auth = true;
export default NavBar;
