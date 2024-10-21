import { Role } from "@prisma/client";
import { Script } from "./script";

export abstract class User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  salt?: string;
  createdAt: Date;
  updatedAt: Date;
  scripts?: Script[];
}