import { User } from '@domain/entities/user';
import { UserDto } from '@infrastructure/dto/user-response-dto';

export class UserMapper {
  static toDomain(dto: UserDto): User {
    return new User({
      id: dto.id,
      firstname: dto.firstName,
      lastname: dto.lastName,
      email: dto.email,
    });
  }

  static toDto(user: User): UserDto {
    return {
      id: user.id,
      firstName: user.firstname,
      lastName: user.lastname ?? '',
      email: user.email ?? '',
    };
  }
}
