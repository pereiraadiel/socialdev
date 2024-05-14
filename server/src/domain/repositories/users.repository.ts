import { UserEntity } from '../entities/user.entity';

export interface UsersRepository {
  create(user: UserEntity): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findByUsername(username: string): Promise<UserEntity | null>;
  findMany(page: number, pageSize: number): Promise<UserEntity[]>;
  count(page: number, pageSize: number): Promise<number>;
  update(id: string, user: Partial<UserEntity>): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}
