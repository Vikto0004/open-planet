import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { loginSchema, UserModel } from "@/models/user-model";
import { generateToken, saveToken } from "@/services/tokenServices";

connect();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const validation = loginSchema.validate(data);

    if (validation.error) {
      return NextResponse.json(
        { message: validation.error.message },
        {
          status: 403,
        },
      );
    }

    const { email, password } = data;

    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(`User with email ${email} does not exist`, {
        status: 400,
      });
    }

    const validatePassword = await bcryptjs.compare(password, user.password);

    if (!validatePassword) {
      return NextResponse.json("Invalid password", { status: 400 });
    }

    const tokenData = {
      _id: user._id,
      email: user.email,
      role: user.role,
      username: user.username,
    };

    const token = await generateToken(tokenData);

    await saveToken(tokenData._id, token);

    const response = NextResponse.json({ message: "LoginFormik Success", user });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
