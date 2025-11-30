import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Type for user credentials.
 */
type Credentials = {
  email: string;
  password: string;
};

/**
 * Type for authentication response.
 */
type AuthResponse = {
  success: boolean;
  message: string;
  token?: string;
};

/**
 * Hashes a password using bcrypt.
 * @param password - The plain text password.
 * @returns The hashed password.
 */
export function hashPassword(password: string): string {
  try {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

/**
 * Compares a plain text password with a hashed password.
 * @param password - The plain text password.
 * @param hashedPassword - The hashed password.
 * @returns Whether the passwords match.
 */
export function comparePassword(password: string, hashedPassword: string): boolean {
  try {
    return bcrypt.compareSync(password, hashedPassword);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
}

/**
 * Generates a JWT token for a user.
 * @param email - The user's email.
 * @returns The JWT token.
 */
export function generateToken(email: string): string {
  try {
    const secretKey = process.env.JWT_SECRET || 'defaultSecret';
    return jwt.sign({ email }, secretKey, { expiresIn: '1h' });
  } catch (error) {
    throw new Error('Error generating token');
  }
}

/**
 * Authenticates a user based on credentials.
 * @param credentials - The user's credentials.
 * @returns The authentication response.
 */
export async function authenticateUser(credentials: Credentials): Promise<AuthResponse> {
  try {
    // Replace with actual user lookup
    const user = { email: 'test@example.com', password: hashPassword('password123') };

    if (credentials.email !== user.email || !comparePassword(credentials.password, user.password)) {
      return { success: false, message: 'Invalid credentials' };
    }

    const token = generateToken(user.email);
    return { success: true, message: 'Authentication successful', token };
  } catch (error) {
    return { success: false, message: 'Authentication failed' };
  }
}

/**
 * Middleware to verify JWT token in requests.
 * @param req - The Next.js API request.
 * @param res - The Next.js API response.
 * @param next - The next middleware function.
 */
export function verifyToken(req: NextApiRequest, res: NextApiResponse, next: Function): void {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const secretKey = process.env.JWT_SECRET || 'defaultSecret';
    jwt.verify(token, secretKey, (err) => {
      if (err) {
        res.status(403).json({ message: 'Failed to authenticate token' });
        return;
      }
      next();
    });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying token' });
  }
}