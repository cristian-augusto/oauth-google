import { SupabaseClient } from "@supabase/supabase-js";
import {plainToInstance} from 'class-transformer';
import useSupabase from "../../../providers/useSupabase";
import IUsersRepository from "../../users.repository";
import User from "../../../models/user.model";
import AppError from "../../../exceptions/app-error.exception";

export default class UsersRepositorySupabase implements IUsersRepository {
  private client: SupabaseClient;
  constructor() {
    this.client = useSupabase();
  }

  async create(dto: Partial<User>): Promise<User> {
    const {data, error} = await this.client.from('users').insert(dto).select();

    if(error){
      console.error(error);
      throw new AppError('Failed creating user.');
    }

    return plainToInstance(User, data[0]);
  }

  async findByPk(pk: string | number): Promise<User | undefined> {
    const {data, error} = await this.client.from('users').select('*').eq('id_user', pk).single();

    if(error){
      console.error(error);
      throw new AppError('Failed finding user by PK.');
    }

    return data ? plainToInstance(User, data) : undefined;
  }

  async findByPkOrThrow(pk: string | number): Promise<User> {
    const user = await this.findByPk(pk);

    if(!user){
      throw new AppError('User not found.');
    }

    return user;
  }

  async update(pk: string | number, dto: Partial<User>): Promise<void> {
    const {error} = await this.client.from('users').update(dto).eq('id_user', pk);

    if(error){
      console.error(error);
      throw new AppError('Failed updating user.');
    }
  }

  async delete(pk: string | number): Promise<void> {
   const {error} = await this.client.from('users').delete().eq('id_user', pk);

    if(error){
      console.error(error);
      throw new AppError('Failed deleting user.');
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const {data, error} = await this.client.from('users').select('*').eq('email', email);

    if(error){
      console.error(error);
      throw new AppError('Failed finding user by email.');
    }

    return data && data.length ? plainToInstance(User, data[0]) : undefined;
  }

  async findByEmailOrThrow(email: string): Promise<User> {
    const user = await this.findByEmail(email);

    if(!user) {
      throw new AppError('User not found.')
    }

    return user;
  }
}
