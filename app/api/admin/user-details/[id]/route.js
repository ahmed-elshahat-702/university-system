import mongoose from "mongoose";
import UsersModel from "@/app/api/models/Users";
import { isValidObjectId } from "mongoose";

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
});

export async function GET(request, context) {
  const { id } = context.params;

  if (!isValidObjectId(id)) {
    return new Response(JSON.stringify({ error: "Invalid user ID format" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }

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
    return new Response(JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching user details by ID:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}

export async function PUT(request, context) {
  const { id } = context.params;

  if (!isValidObjectId(id)) {
    return new Response(JSON.stringify({ error: "Invalid user ID format" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }

  const updatedFields = JSON.parse(await request.text());
  try {
    const user = await UsersModel.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      });
    }

    for (let section in updatedFields) {
      for (let field in updatedFields[section]) {
        user[section][field] = updatedFields[section][field];
      }
    }

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
