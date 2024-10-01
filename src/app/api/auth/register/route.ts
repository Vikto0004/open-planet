import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { UserModel, registrationSchema } from "@/models/user-model";

interface IFormRegistration {
  email: string;
  password: string;
  username: string;
}

connect();
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const validation = registrationSchema.validate(data);

    if (validation.error) {
      return NextResponse.json(
        { message: validation.error.message },
        {
          status: 403,
        },
      );
    }

    const { email, password, username } = data as IFormRegistration;

    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (user) {
      return NextResponse.json(
        { message: `User with email ${email} is already exist` },
        {
          status: 403,
        },
      );
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const newUser = await UserModel.create({
      email,
      username,
      password: hashPassword,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("erro", error);

      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" });
    }
  }
}
