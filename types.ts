interface User {
  id: string;
  name: string;
  email: string;
  hobbies: string[];
}

interface UpdateUser {
  name: string;
  email: string;
}

interface Hobbies {
  hobbies: string[];
}

export type { User, UpdateUser, Hobbies };
