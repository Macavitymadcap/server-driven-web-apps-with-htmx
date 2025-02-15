type User = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
};

export class UsersService {
  private _usersURL = 'https://jsonplaceholder.typicode.com/users';

  async fetch(): Promise<User[]> {
    Bun.sleepSync(1000); // Simulate slow network
    const response = await fetch(this._usersURL);
    const users = await response.json();

    return users as User[];
  }
}
