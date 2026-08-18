export interface UserProps {
  id: number;
  firstname?: string;
  lastname?: string;
  email?: string;
}

export class User {
  readonly id: number;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly email?: string;

  constructor(props: UserProps) {
    if (!props.firstname?.trim()) {
      throw new Error('User name is required');
    }

    this.id = props.id;
    this.firstname = props.firstname;
    this.lastname = props.lastname;
    this.email = props.email;
  }

  get fullName(): string {
    return `${this.firstname} ${this.lastname}`;
  }
}
