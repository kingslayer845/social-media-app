export interface LoginUserProps {
  email: string;
  password: string;
}
export interface SignupUserProps extends LoginUserProps {
  firstName: string;
  lastName: string;
  location: string;
  occupation: string;
  confirmPassword: string;
}
