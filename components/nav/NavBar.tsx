import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignInButtons from "./SignInButtons";
import SignOutButton from "./SignOutButton";


const NavBar = async () => {
  const session = await getServerSession(authOptions);

  return <>{session?.user ? <SignOutButton /> : <SignInButtons />}</>;
};

NavBar.auth = true;
export default NavBar;
