import mongoose from "mongoose";
import UsersModel from "@/app/api/models/Users";

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
});

export async function POST(request) {
  try {
    const userData = await request.json();

    // Validate request body
    if (
      !userData ||
      !userData.userRegistration ||
      !userData.userRegistration.username
    ) {
      return new Response(JSON.stringify({ message: "Invalid request body" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400, // Set the appropriate status code for a bad request
      });
    }

    // Check if the user already exists
    const existingUser = await UsersModel.findOne({
      "userRegistration.username": userData.userRegistration.username,
    });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 409, // Set the appropriate status code for conflict
      });
    }

    // Create a new user
    const newUser = new UsersModel(userData);
    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error saving user:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
