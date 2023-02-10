export class UserDto {
  email: string;
  id: number;
  isConfirmed: boolean;
  constructor(model: any) {
    this.email = model.email;
    this.id = model.id;
    this.isConfirmed = model.isConfirmed;
  }
}
