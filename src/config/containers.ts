import { container } from "tsyringe";
import UsersRepositorySupabase from "../repositories/implementations/supabase/users.repository";
import IUsersRepository from "../repositories/users.repository";

export enum InjectionTokenEnum {
  IUsersRepository = "IUsersRepository",
}

container.registerSingleton<IUsersRepository>(
  InjectionTokenEnum.IUsersRepository,
  UsersRepositorySupabase
);
