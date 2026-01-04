import * as bcrypt from 'bcrypt';

export const hashPassword = (
  password: string,
  saltRounds: number = 12,
): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

export const checkPassword = (password: string, storedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, storedPassword)
};