import { UserType } from "./enums/user-type.enum";

export type User = {
  userType: UserType;
  socketId: string;
  sessionId?: string;
};
