import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fbAuth } from "@/lib/firebase";
import { checkUsersOnDB } from "@/utils/actions/authentication";

const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
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
      await checkUsersOnDB(account?.provider, user);
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
