import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, extractToken, TokenPayload } from './jwt';

export function withAuth(handler: (req: NextRequest, { user }: { user: TokenPayload }) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const token = extractToken(req.headers.get('authorization'));
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    return handler(req, { user });
  };
}

export function withAdminAuth(handler: (req: NextRequest, { user }: { user: TokenPayload }) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const token = extractToken(req.headers.get('authorization'));
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = verifyToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    return handler(req, { user });
  };
}
