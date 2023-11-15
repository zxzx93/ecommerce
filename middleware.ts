import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// 각각의 사이트 페이지 접근 조건에 따라 해당 페이지로의 접근을 허용
const authMiddleware = async (req: NextRequest) => {
  const { pathname, origin } = req.nextUrl;

  // getToken 함수를 사용하여 JWT(JSON Web Tokens)를 가져옴
  const session = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });

  // 로그인이 되어있지 않다면, origin으로 리다이렉션
  if (pathname === '/checkout') {
    if (!session) return NextResponse.redirect(`${origin}`);
  }
  if (pathname.startsWith('/order')) {
    if (!session) return NextResponse.redirect(`${origin}`);
  }
  if (pathname.startsWith('/profile')) {
    if (!session) return NextResponse.redirect(`${origin}`);
  }
  if (pathname.startsWith('/admin')) {
    if (!session) return NextResponse.redirect(`${origin}`);
    if (session.role !== 'admin') return NextResponse.redirect(`${origin}`);
  }
  return null;
};

export default authMiddleware;
