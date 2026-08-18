export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UsersResponseDto {
  users: UserDto[];
  total: number;
  skip: number;
  limit: number;
}
