import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import User from '../../../models/User';
import db from '../../../utils/helpers/db';

import clientPromise from './lib/mongodb';

const signInUser = async ({ user, password }) => {
  if (!user.password) {
    throw new Error('패스워드를 입력해주세요.');
  }
  const testPassword = await bcrypt.compare(password, user.password);
  if (!testPassword) {
    throw new Error('이메일이나 패스워드가 틀렸습니다.');
  }
  return user;
};

db.connectDb();
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        const user = await User.findOne({ email });
        if (user) {
          return signInUser({ user, password });
        }
        throw new Error('이메일이 존재하지 않습니다.');
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      const user = await User.findById(token.sub);
      session.user.id = user._id || token.sub?.toString();
      session.user.role = user.role || 'user';

      return session;
    },
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/signin', // Displays signin buttons
  },

  debug: false,
});
