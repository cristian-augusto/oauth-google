import User from "../models/user.model";
import BaseRepository from "./base.repository";

type IUsersRepository = {
    findByEmail(email: string): Promise<User | undefined>;
    findByEmailOrThrow(email: string): Promise<User>;
} & BaseRepository<User>;

export default IUsersRepository;
