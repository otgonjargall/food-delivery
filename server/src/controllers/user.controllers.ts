import { Context } from "hono";
import { connectDb } from "../util/connectDb.js";
import { UserModel } from "../model/user.model.js";
import bcrypt from "bcryptjs";
export const getAllUsers = async (c: Context) => {
    await connectDb();
    const users = await UserModel.find({})
    return c.json({
        users
    })
}
 
export const signUp = async (c: Context) => {
    await connectDb();
    const { email, password } = await c.req.json();
    if (!email) {
        return c.json({
            message: "Emailaa ognvv",
        },
            400
        );
    }
    if (!password) {
        return c.json({
            message: "Passwordoo ognvv",
        },
            400
        )
    }
    const signedUp = await UserModel.findOne({ email });
 
    if (signedUp) {
        return c.json({
            message: "bvrtgeltei bn",
        },
            400
        );
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await UserModel.create({
        email,
        password: hashedPassword
    });
    return c.json({
        message: "Amjilttai hereglegch bvrtgegdlee",
        user: newUser
    },
        201
    )
 
};
export const signIn = async (c: Context) => {
    await connectDb();
    const { email, password } = await c.req.json();
    if (!email || !password) {
        return c.json({
            message: "Email,esvel password boglon vv"
        },
            400
        )
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
        return c.json({
            message: "Email, esvel password buruu bn"
        },
            401
        )
    }
    const isCorrect = await bcrypt.compareSync(password, user.password!);
    if (!isCorrect) {
        return c.json({
            message: "Email,esvel Password buruu bn"
        },
            401
        )
    }
 
    return c.json({
        email: email,
        user: user._id,
        message: "amjilttai nevterle"
    },
        200
    )
}
 