import { InvalidUserException } from '@domain/exceptions/domain-exception';

export interface UserProps {
  id: number;
  firstname: string;
  lastname?: string;
  email?: string;
}

export class User {
  readonly id: number;
  readonly firstname: string;
  readonly lastname?: string;
  readonly email?: string;

  constructor(props: UserProps) {
    const trimmedFirstname = props.firstname?.trim();
    if (!trimmedFirstname) {
      throw new InvalidUserException('User name is required');
    }

    this.id = props.id;
    this.firstname = trimmedFirstname;
    this.lastname = props.lastname?.trim() || undefined;
    this.email = props.email?.trim() || undefined;
  }

  get fullName(): string {
    if (this.lastname) {
      return `${this.firstname} ${this.lastname}`;
    }
    return this.firstname;
  }

  hasEmail(): boolean {
    return Boolean(this.email && this.email.length > 0);
  }

  withUpdatedInfo(props: Partial<Omit<UserProps, 'id'>>): User {
    return new User({
      id: this.id,
      firstname: props.firstname ?? this.firstname,
      lastname: props.lastname !== undefined ? props.lastname : this.lastname,
      email: props.email !== undefined ? props.email : this.email,
    });
  }
}
