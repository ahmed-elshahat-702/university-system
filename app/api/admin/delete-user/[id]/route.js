import mongoose from "mongoose";
import UsersModel from "@/app/api/models/Users";

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export async function DELETE(request, context) {
    try {
        const { id } = context.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return new Response(
                JSON.stringify({ message: "Invalid user ID" }),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    status: 400,
                }
            );
        }

        const deletedUser = await UsersModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return new Response(JSON.stringify({ message: "User not found" }), {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 404,
            });
        }

        return new Response(
            JSON.stringify({ message: "User deleted successfully" }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error deleting user by ID:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 500,
            }
        );
    }
}
