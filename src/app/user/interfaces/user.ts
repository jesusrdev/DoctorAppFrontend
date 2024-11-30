import { SignUp } from "./sign-up";

export interface User extends Omit<SignUp, "password"> {
}
