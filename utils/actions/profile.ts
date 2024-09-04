"use server";
import {
  doc,
  collection,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db, USERS_COLLECTION, PROFILES_COLLECTION } from "@/lib/firebase";
import { userProfileSchema, UserProlfileType } from "@/lib/zod";
import { auth } from "@/auth";
import { ComboboxItemType } from "@/lib/types";
import { cookies } from "next/headers";

export const addProfile = async (
  name: string,
  image: number,
  country: ComboboxItemType | null | undefined,
  isGold: boolean
) => {
  const session = await auth();
  try {
    const userRef = doc(db, USERS_COLLECTION, session?.user?.email!);
    const profileRef = doc(userRef, PROFILES_COLLECTION, name.toLowerCase());
    const existingUser = await getDoc(userRef);
    const existingProfile = await getDoc(profileRef);
    if (existingUser.exists() && !existingProfile.exists()) {
      const data: UserProlfileType = {
        name,
        imgId: image,
        country: {
          name: country?.label,
          currencySymbol: country?.value,
          currencyCode: country?.currencyCode,
        },
        metal: isGold ? "gold" : "silver",
      };
      userProfileSchema.safeParse(data).success &&
        (await setDoc(profileRef, data));
    }
  } catch (err: any) {
    return err;
  }
};

export const updateProfile = async (type: string, newData: any) => {
  const session = await auth();
  const profileId = await getCurrentProfileId();
  try {
    const profileRef = doc(
      db,
      USERS_COLLECTION,
      session?.user?.email!,
      PROFILES_COLLECTION,
      profileId!
    );
    const existingProfile = await getDoc(profileRef);
    if (existingProfile.exists()) {
      let data: UserProlfileType = {};
      switch (type) {
        case "nisab":
          data = {
            country: newData.country,
            metal: newData.metal,
            isZakater: newData.isZakater,
          };
          break;
        case "assets":
          data = {
            assets: {
              totalAssets: newData.totalAssets,
            },
            isZakater: newData.isZakater,
          };
          break;
      }
      userProfileSchema.safeParse(data).success &&
        (await updateDoc(profileRef, data));
    }
  } catch (err: any) {
    return err;
  }
};

export const getProfiles = async () => {
  const session = await auth();
  try {
    const profilesRef = collection(
      db,
      USERS_COLLECTION,
      session?.user?.email!,
      PROFILES_COLLECTION
    );
    const profiles = await getDocs(profilesRef);
    const result: object[] = [];
    profiles.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() });
    });
    return result;
  } catch (err: any) {
    return err;
  }
};

const COOKIE_NAME = "CURRENT_PROFILE_ID";

export async function getCurrentProfileId() {
  return cookies().get(COOKIE_NAME)?.value;
}

export async function setCurrentProfileId(id: string) {
  cookies().set(COOKIE_NAME, id);
}
