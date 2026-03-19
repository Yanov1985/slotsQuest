import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'crypto';

type AdminTokenPayload = {
  sub: string;
  role: 'super_admin';
  exp: number;
};

@Injectable()
export class AuthService {
  private readonly adminLogin = process.env.ADMIN_LOGIN || 'yanov';
  private readonly adminPassword = process.env.ADMIN_PASSWORD || 'Guru007-';
  private readonly secret =
    process.env.ADMIN_AUTH_SECRET || 'slotquest-admin-secret-change-me';
  private readonly tokenTtlSeconds = 60 * 60 * 12; // 12 часов

  private encodeBase64Url(value: string): string {
    return Buffer.from(value, 'utf8')
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/g, '');
  }

  private decodeBase64Url(value: string): string {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    const padding = '='.repeat((4 - (normalized.length % 4)) % 4);
    return Buffer.from(normalized + padding, 'base64').toString('utf8');
  }

  private sign(input: string): string {
    return createHmac('sha256', this.secret).update(input).digest('base64url');
  }

  private safeEqual(a: string, b: string): boolean {
    const aBuffer = Buffer.from(a, 'utf8');
    const bBuffer = Buffer.from(b, 'utf8');
    if (aBuffer.length !== bBuffer.length) {
      return false;
    }
    return timingSafeEqual(aBuffer, bBuffer);
  }

  private issueToken(username: string): string {
    const payload: AdminTokenPayload = {
      sub: username,
      role: 'super_admin',
      exp: Math.floor(Date.now() / 1000) + this.tokenTtlSeconds,
    };
    const encodedPayload = this.encodeBase64Url(JSON.stringify(payload));
    const signature = this.sign(encodedPayload);
    return `${encodedPayload}.${signature}`;
  }

  private verifyTokenInternal(token: string): AdminTokenPayload {
    const [encodedPayload, signature] = token.split('.');
    if (!encodedPayload || !signature) {
      throw new UnauthorizedException('Invalid token format');
    }

    const expectedSignature = this.sign(encodedPayload);
    if (!this.safeEqual(signature, expectedSignature)) {
      throw new UnauthorizedException('Invalid token signature');
    }

    let payload: AdminTokenPayload;
    try {
      payload = JSON.parse(this.decodeBase64Url(encodedPayload));
    } catch {
      throw new UnauthorizedException('Invalid token payload');
    }

    if (!payload?.sub || payload?.role !== 'super_admin' || !payload?.exp) {
      throw new UnauthorizedException('Invalid token data');
    }

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      throw new UnauthorizedException('Token expired');
    }

    return payload;
  }

  login(login: string, password: string) {
    const isLoginValid = this.safeEqual(login || '', this.adminLogin);
    const isPasswordValid = this.safeEqual(password || '', this.adminPassword);

    if (!isLoginValid || !isPasswordValid) {
      throw new UnauthorizedException('Invalid login or password');
    }

    const accessToken = this.issueToken(this.adminLogin);

    return {
      accessToken,
      user: {
        username: this.adminLogin,
        role: 'super_admin',
      },
      expiresIn: this.tokenTtlSeconds,
    };
  }

  verifyToken(token: string) {
    const payload = this.verifyTokenInternal(token);
    return {
      username: payload.sub,
      role: payload.role,
    };
  }

  extractTokenFromHeader(authorizationHeader?: string): string {
    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header is required');
    }

    const [scheme, token] = authorizationHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Use Bearer token');
    }

    return token;
  }
}

