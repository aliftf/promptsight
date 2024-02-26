import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) { // get the data about that user every single time to keep an existing running sessioon
      const sessionUser = await User.findOne({ email: session.user.email });
  
      session.user.id = sessionUser._id.toString();
      return session; // updating it making sure that we always know which user is online
    },
    async signIn({ profile }) {
      try {
        // serverless -> lambda -> dynamodb
        await connectToDB();
  
        // check if user exists in db
        const userExist = await User.findOne({ email: profile.email });
  
        // if not, create user
        if(!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture
          });
        }
  
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
})

export { handler as GET, handler as POST};