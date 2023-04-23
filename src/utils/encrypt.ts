import { sha512 } from 'hash.js';

export const encryptWithSHA512 = (str: string) => {
  return sha512().update(str).digest('hex');
};
