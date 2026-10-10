export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainException';
  }
}

export class InvalidUserException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidUserException';
  }
}

export class UserNotFoundException extends DomainException {
  constructor(id: number) {
    super(`User with id "${id}" was not found.`);
    this.name = 'UserNotFoundException';
  }
}
