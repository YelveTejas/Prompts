import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Client from "@/models/user";
import { connectDB } from "@/utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        await connectDB();
        const sessionUser = await Client.findOne({ email: session.user.email });

        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        } else {
          throw new Error("User not found in session callback");
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        throw error;
      }
    },
    async signIn({ profile }) {
      try {
        await connectDB();

        const userExist = await Client.findOne({ email: profile.email });

        if (!userExist) {
          await Client.create({
            email: profile.email,
            username: profile.name.split(" ").join("").toLowerCase(),
            image: profile.picture,
          });
        }
        return true; // Indicate successful sign in
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Indicate unsuccessful sign in
      }
    },
  },
  debug: true, // Enable debug mode for more detailed logging
});

export { handler as GET, handler as POST };
