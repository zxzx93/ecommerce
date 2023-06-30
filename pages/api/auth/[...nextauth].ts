import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import User, { TUser } from '../../../models/User';
import db from '../../../utils/helpers/db';

import clientPromise from './lib/mongodb';

interface SignInParams {
  user: TUser;
  password: string;
}

const signInUser = async ({ user, password }: SignInParams): Promise<any> => {
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
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@email.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('이메일과 비밀번호를 모두 입력하세요.');
        }
        const { email, password } = credentials;
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('해당 이메일을 가진 사용자가 존재하지 않습니다.');
        }
        return signInUser({ user, password });
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],

  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      const user = await User.findById(token.sub);
      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          id: user?._id || token.sub?.toString(),
          role: user?.role || 'user',
        },
      };
      return updatedSession;
    },
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/signin', // Displays signin buttons
  },

  debug: false,
});
