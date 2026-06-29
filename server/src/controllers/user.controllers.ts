import { Context } from "hono";
import { connectDb } from "../util/connectDb.js";
import { UserModel } from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (c: Context) => {
  await connectDb();

  const { email, password } = await c.req.json();

  if (!email) {
    return c.json(
      {
        message: "Emailaa uguuchee",
      },
      400,
    );
  }
  if (!password) {
    return c.json(
      {
        message: "Passwordoo yvuulda",
      },
      400,
    );
  }
  const signedUp = await UserModel.find({ email });
  console.log("signedUp", signedUp);

  if (signedUp.length > 0) {
    return c.json(
      {
        message: "burtgeltei bn",
      },
      400,
    );
  }
  const hashedPassord = bcrypt.hashSync(password, 10);
  const newUser = await UserModel.create({
    email,
    password: hashedPassord,
  });
  return c.json({
    message: "Amjilttai hereglech burtgelee",
    user: newUser,
  });
};
