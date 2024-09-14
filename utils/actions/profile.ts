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
const moment = require("moment-hijri");

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
        zakatPaid: 0,
      };
      if (userProfileSchema.safeParse(data).success) {
        await setDoc(profileRef, data);
      } else {
        throw new Error("Validation failed");
      }
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
            ...(!newData.isZakater
              ? {
                  zDay: null,
                }
              : {}),
          };
          break;
        case "assets":
          data = {
            assets: {
              totalAssets: newData.totalAssets,
              lastUpdate: Date.now(),
            },
            isZakater: newData.isZakater,
            ...(!newData.isZakater
              ? {
                  zDay: null,
                }
              : {}),
          };
          break;
        case "zakatDay":
          data = {
            zDay: newData.zDay,
            zakatPaid: 0,
          };
          break;
        case "zakat":
          const newAmount = newData.zakatPaid;
          const oldAmount = existingProfile.data().zakatPaid;
          const zakatDue = parseFloat(
            (existingProfile.data().assets.totalAssets / 40).toFixed(2)
          );
          const totalAmount = newAmount + oldAmount;
          const isZakatFull = totalAmount >= zakatDue;
          data = {
            zakatPaid: isZakatFull ? 0 : totalAmount,
            ...(isZakatFull
              ? {
                  zDay: Number(
                    moment(existingProfile.data().zDay)
                      .add(1, "iYear")
                      .format("x")
                  ),
                  history: [
                    {
                      currencySymbol:
                        existingProfile.data().country.currencySymbol,
                      assets: existingProfile.data().assets,
                      zakatAmount: zakatDue,
                      date: existingProfile.data().zDay,
                    },
                    ...(existingProfile.data().history || []),
                  ],
                }
              : {}),
          };
          break;
      }
      if (userProfileSchema.safeParse(data).success) {
        await updateDoc(profileRef, data);
      } else {
        throw new Error("Validation failed");
      }
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
