export class UserDto {
  email: string;
  id: number;
  isConfirmed: boolean;
  roleId: number;
  // name: string;
  // surname: string;
  // phone: string;
  constructor(model: any) {
    this.email = model.email;
    this.id = model.id;
    this.isConfirmed = model.isConfirmed;
    this.roleId = model.roleId;
    // this.name = model.name;
    // this.surname = model.surname;
    // this.phone = model.phone;
  }
}
