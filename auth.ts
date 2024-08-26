import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fbAuth } from "@/lib/firebase";
import { checkUsersOnDB } from "@/utils/actions/authentication";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials: any): Promise<any> => {
        return await signInWithEmailAndPassword(
          fbAuth,
          credentials.email,
          credentials.password
        )
          .then((userCredential) => {
            if (userCredential.user && userCredential.user.emailVerified) {
              const user = {
                ...userCredential.user,
                id: userCredential.user.uid,
                name: userCredential.user.displayName,
                image: userCredential.user.photoURL,
              };
              return user;
            } else {
              return null;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      // TODO google provider changes uid everytime
      // IMPORTANT Mongoose does not work in edge environment
      await checkUsersOnDB(account?.provider, user);
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
});
