import connectDB from "@/db/mongodb";
import Note from "@/models/note.model";
import User from "@/models/user.model";

import { NextResponse } from "next/server";

// Get a single user by id
export const GET = async (_req, { params }) => {
  const { id } = params;
  try {
    await connectDB();
    const user = await User.findById(id).populate({
      path: "notes",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "author",
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to connect to the server" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req, { params }) => {
  const { id } = params;
  const { bio, socialLinks } = await req.json();
  try {
    await connectDB();
    const user = await User.findByIdAndUpdate(
      id,
      { bio, socialLinks },
      { new: true }
    );
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Bio updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to connect to the server" },
      { status: 500 }
    );
  }
};
