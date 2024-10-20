import { ScriptStatus } from "@prisma/client";
import { User } from "./user";

export abstract class Script {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  phoneNumberAlt: string;
  scriptFile: string;
  status: ScriptStatus;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}