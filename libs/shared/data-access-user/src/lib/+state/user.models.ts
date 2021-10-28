/**
 * Interface for the 'User' data
 */
export interface UserEntity {
  id: string; // Primary ID
  fullName: string;
  givenName: string;
  familyName: string;
  email: string;
  phone: string;
}
