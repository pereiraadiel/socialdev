import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserViewer, UserViewerType } from '../viewers/user.viewer';
import {
  USERS_REPOSITORY,
  UsersRepository,
} from '../repositories/users.repository';
import { CryptUtil } from '../../utils/crypt.util';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
    private readonly userViewer: UserViewer,
  ) {}

  async createOne(dto: UserEntity): Promise<UserViewerType> {
    try {
      const userExists = await this.usersRepository.findByUsername(
        dto.username,
      );
      if (userExists) {
        throw new ConflictException('Username already exists');
      }

      const password = await CryptUtil.hash(dto.password);
      delete dto.password;

      const user = await this.usersRepository.create({
        ...dto,
        password,
      });

      return this.userViewer.setUser(user).response();
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error);
      }
      throw new UnprocessableEntityException();
    }
  }

  async getMany(page: number, pageSize: number) {
    try {
      const users = await this.usersRepository.findMany(page, pageSize);
      const total = await this.usersRepository.count(page, pageSize);
      const data = users.map((user) =>
        this.userViewer.setUser(user).maskedResponse(),
      );

      return {
        data,
        meta: {
          total,
          totalPages: Math.ceil(total / pageSize),
          page,
          pageSize,
        },
      };
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  async getById(id: string): Promise<UserViewerType> {
    try {
      const user = await this.usersRepository.findById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return this.userViewer.setUser(user).maskedResponse();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new UnprocessableEntityException();
    }
  }

  async getByUsername(username: string): Promise<UserViewerType> {
    try {
      const user = await this.usersRepository.findByUsername(username);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return this.userViewer.setUser(user).response();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new UnprocessableEntityException();
    }
  }

  async updateOne(id: string, dto: Partial<UserEntity>) {
    try {
      const userExists = await this.usersRepository.findById(id);
      if (!userExists) {
        throw new NotFoundException('User not found');
      }

      if (dto.password) {
        dto.password = await CryptUtil.hash(dto.password);
      }

      const user = await this.usersRepository.update(id, dto);
      return this.userViewer.setUser(user).response();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new UnprocessableEntityException();
    }
  }

  async deleteOne(id: string) {
    try {
      const userExists = await this.usersRepository.findById(id);
      if (!userExists) {
        throw new NotFoundException('User not found');
      }

      await this.usersRepository.delete(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error);
      }
      throw new UnprocessableEntityException();
    }
  }
}
