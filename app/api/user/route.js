import connectDB from "@/helper/mongodb";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const { email, name, image, username } = await req.json();
  try {
    const isExist = await User.findOne({ email });
    if (isExist) {
      throw new Error("Email already exists");
    }
    const user = await User.create({ email, name, image, username });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Get all users
export const GET = async (_req, _res) => {
  await connectDB();
  const users = await User.find().populate("notes");
  return NextResponse.json({ users });
};
