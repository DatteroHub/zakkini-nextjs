import { Connection, Schema } from "mongoose";

const userSchema = new Schema({
  authId: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  authProviderType: { type: String },
  datteroApps: { type: [String] },
});

export const getDatteroUserModel = (conn: Connection) => {
  return conn.models.DatteroUser ?? conn.model("DatteroUser", userSchema);
};
