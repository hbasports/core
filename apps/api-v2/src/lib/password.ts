import bcrypt from 'bcrypt';

export const hashPassword = (
  password: string,
  saltRounds: number = 12,
): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};
