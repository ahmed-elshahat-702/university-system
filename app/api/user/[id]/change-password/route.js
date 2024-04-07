import mongoose from "mongoose";
import UsersModel from "@/app/api/models/Users";
import { isValidObjectId } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);

export async function PUT(request, context) {
  const { id } = context.params;

  const { oldPassword, newPassword } = await request.json();

  try {
    const user = await UsersModel.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ error: "user not found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      });
    }

    if (user.userRegistration.password !== oldPassword) {
      return new Response(
        JSON.stringify({ message: "Incorrect old password" }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 401,
        }
      );
    }

    if (newPassword === oldPassword) {
      return new Response(
        JSON.stringify({ message: "Please enter a new password" }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 401,
        }
      );
    }

    user.userRegistration.password = newPassword;
    await user.save();

    return new Response(JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error updating user details by ID:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
