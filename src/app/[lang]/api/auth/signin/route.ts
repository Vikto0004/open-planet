import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { User, loginSchema } from "@/models/user-model";

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

    const user = await User.findOne({ email: email.toLowerCase() });

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
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({ message: "Success" });

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
