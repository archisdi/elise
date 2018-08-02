import userRepo from '../repositories/user_repository';

export default class User {
  name: string;
  username: string;

  constructor(name: string, username: string) {
    this.name = name;
    this.username = username;
  }

  static find(id: number) {
    return userRepo.findOne({ id });
  }
}
