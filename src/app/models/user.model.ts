export class User {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    created_date: string;
    id: number;
    id_status: number;
}

export class UserStatus {
    tag: string;
    description: string;
    id: number;
}

export class Users {
    data: UserData;
}

export class UserData {
    count: number;
    users: User[];
}