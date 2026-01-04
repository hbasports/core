import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export function hashPassword(password: string): Promise<string> {
    const hash = bcrypt.hash(password, SALT_ROUNDS);

    return hash;
}

