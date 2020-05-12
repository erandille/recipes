export class User {
  constructor(user?: object) {
    if (!(user == null)) {
      this.id = user["id"];
      this.username = user["username"];
      this.vege = user["vege"];
      this.avatarPath = user["avatarPath"];
    }
  }
  id: string;
  username: string;
  vege: boolean;
  avatarPath: string;
}
