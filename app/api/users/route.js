import mongoose from "mongoose";
import UsersModel from "@/app/api/models/Users";

mongoose.connect(process.env.MONGODB_URI);

export async function GET() {
  try {
    const users = await UsersModel.find({});

    return new Response(JSON.stringify(users), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
