import mongoose from "mongoose";
import AdminsModel from "@/app/api/models/Admins";
import UsersModel from "@/app/api/models/Users";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

export async function POST(request) {
  try {
    const requestData = await request.json();
    const { username, password, role } = requestData;

    if (!username || !password || !role) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    const UserModel = role === "admin" ? AdminsModel : UsersModel;

    const user =
      role === "admin"
        ? await UserModel.findOne({ username })
        : await UserModel.findOne({ "userRegistration.username": username });

    if (!user) {
      console.log(UserModel);
      return new Response(JSON.stringify({ message: "User not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Validate password
    const isValidPassword =
      role === "user"
        ? password === user.userRegistration.password
        : password === user.password;
    if (isValidPassword) {
      return new Response(
        JSON.stringify({ message: "Login successful", user }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Incorrect username or password" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 401,
        }
      );
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
