interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

interface UsersTableProps {
  users: User[];
}

export const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Company</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: User) => {
          return (
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
