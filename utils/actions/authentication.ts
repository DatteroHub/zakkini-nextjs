"use server";
import { fbAuth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  User,
} from "firebase/auth";
import { getDatteroUserModel } from "@/models/DatteroUser";
import { getZakkiniUserModel } from "@/models/ZakkiniUser";
import connectDBDattero from "@/lib/dbDattero";
import connectDB from "@/lib/db";
import { User as NextUser } from "next-auth";

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
  const conn_d = await connectDBDattero();
  const DatteroUser = conn_d ? getDatteroUserModel(conn_d) : null;
  const existingUser_d = await DatteroUser?.findOne({ email });
  if (!existingUser_d) return "email_not_found";

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
  user: NextUser
) {
  // check existing user - Dattero
  const conn_d = await connectDBDattero();
  const DatteroUser = conn_d ? getDatteroUserModel(conn_d) : null;
  const existingUser_d = await DatteroUser?.findOne({ authId: user.id });
  if (!existingUser_d) {
    await DatteroUser?.create({
      authId: user.id,
      userName: user.name,
      email: user.email,
      authProviderType: provider,
      datteroApps: ["zakkini"],
    });
  } else {
    // check list of apps
    if (!existingUser_d.datteroApps.includes("zakkini")) {
      existingUser_d.datteroApps.push("zakkini");
      await existingUser_d.save();
    }
  }

  // check existing user - Zakkini
  const conn = await connectDB();
  const ZakkiniUser = conn ? getZakkiniUserModel(conn) : null;
  const existingUser = await ZakkiniUser?.findOne({ authId: user.id });
  if (!existingUser) {
    await ZakkiniUser?.create({
      authId: user.id,
      userName: user.name,
      email: user.email,
      profiles: [],
    });
  }
}
