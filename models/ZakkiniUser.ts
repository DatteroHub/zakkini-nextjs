import { Connection, Schema } from "mongoose";

const Profile = new Schema({
    name: { type: String, required: true },
    imgId: { type: Number, required: true },
    isZakater: { type: Boolean, required: true },
    hDay: { type: String, required: true },
    country: { type: String, required: true },
    metal: { type: String, required: true },
    assets: {type: [Number]}
} );

const userSchema = new Schema({
  authId: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  profiles: { type: [Profile] },
});

export const getZakkiniUserModel = (conn: Connection) => {
  return conn.models.ZakkiniUser ?? conn.model("ZakkiniUser", userSchema);
};