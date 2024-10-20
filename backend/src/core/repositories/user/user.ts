
import { Role } from "@prisma/client";
import { User } from "src/core/entities/user";
import { IRepository } from "../repository";

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  role?: Role
}

export abstract class IUserRepository extends IRepository<User, IUserCreate, IUserUpdate> {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByUsername(username: string): Promise<User | null>;
  abstract findOne(id: string): Promise<User | null>;
}