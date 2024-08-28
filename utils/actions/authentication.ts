"use server";
import { db, dbDattero, fbAuth, USERS_COLLECTION } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import {
  datteroUserScherma,
  DatteroUserType,
  zakkiniUserScherma,
  ZakkiniUserType,
} from "@/lib/zod";

export async function doSignUp(formData: any) {
  const userName = formData.get("user-name");
  const email = formData.get("email");
  const password = formData.get("password");
  let user: User;

  return createUserWithEmailAndPassword(fbAuth, email, password)
    .then((userCredential) => {
      user = userCredential.user;
      // save user's name on firebase
      return updateProfile(user, { displayName: userName });
    })
    .then(() => {
      // add new user to db
      // (nedded in case user dont verify email and need reset password)
      return checkUsersOnDB("credentials", user.displayName, user.email);
    })
    .then(() => {
      // send email to user with verification link
      return sendEmailVerification(user);
    })
    .then(() => {
      return "success";
    })
    .catch((error) => {
      return error.code ?? error;
    });
}

export async function resendEmailVerification() {
  const user = fbAuth.currentUser;
  if (user) {
    return sendEmailVerification(user)
      .then(() => {
        return "success";
      })
      .catch((error) => {
        return "error";
      });
  }
  return "error";
}

export async function sendResetPasswordEmail(formData: any) {
  const email = formData.get("email");

  // check if email exists
  const userRef_D = doc(dbDattero, USERS_COLLECTION, email);
  const existingUser_D = await getDoc(userRef_D);
  if (!existingUser_D.exists()) return "email_not_found";

  return sendPasswordResetEmail(fbAuth, email)
    .then(() => {
      return "success";
    })
    .catch((error) => {
      return error.code ?? error;
    });
}

export async function checkUsersOnDB(
  provider: string | undefined,
  userName: string | null | undefined,
  email: string | null | undefined
) {
  const fbEmailVerified = fbAuth.currentUser?.emailVerified;
  try {
    // check existing user - Dattero
    const userRef_D = doc(dbDattero, USERS_COLLECTION, email!);
    const existingUser_D = await getDoc(userRef_D);
    if (!existingUser_D.exists()) {
      const data: DatteroUserType = {
        userName: userName!,
        email: email!,
        emailVerified: fbEmailVerified ?? true,
        authProviders: [provider!],
        datteroApps: ["zakkini"],
      };
      datteroUserScherma.safeParse(data).success &&
        (await setDoc(userRef_D, data));
    } else {
      // check list of apps and authProviders
      let mustUpdate = false;
      let emailVerified = existingUser_D.data().emailVerified;
      const apps = existingUser_D.data().datteroApps;
      const providers = existingUser_D.data().authProviders;
      if (!apps.includes("zakkini")) {
        mustUpdate = true;
        apps.push("zakkini");
      }
      if (!providers.includes(provider)) {
        mustUpdate = true;
        providers.push(provider);
      }
      if (fbEmailVerified != undefined && fbEmailVerified != emailVerified) {
        emailVerified = fbEmailVerified;
        mustUpdate = true;
      }
      if (mustUpdate) {
        const data: DatteroUserType = {
          emailVerified: emailVerified,
          authProviders: providers,
          datteroApps: apps,
        };
        datteroUserScherma.safeParse(data).success &&
          (await updateDoc(userRef_D, data));
      }
    }

    // check existing user - Zakkini
    const userRef = doc(db, USERS_COLLECTION, email!);
    const existingUser = await getDoc(userRef);
    if (!existingUser.exists()) {
      const data: ZakkiniUserType = {
        userName: userName!,
        email: email!,
      };
      zakkiniUserScherma.safeParse(data).success &&
        (await setDoc(userRef, data));
    }
  } catch (error) {
    console.error("DB: Error with Firebase Firestore db", error);
    throw error;
  }
}
