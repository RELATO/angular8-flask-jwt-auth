import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
/**
 * user service class
 */
export class UserDataService {

    users: User[] = [];

    constructor() {
        let user = {
            id: 1, username: "admin", password: "password", email: "admin@aqui.br", birthdate: new Date('10/28/1992')
        };
        this.users.push(user);
    }

    /**
     * get user by user name and password
     * @param username
     * @param password
     */
    getUserByUserNameAndPassword(userName: string, password: string): User {
        let user: User = null;
        this.users.forEach(element => {
            if (element.username === userName && element.password === password) {
                user = element;
            }
        });
        return user;
    }

    /**
     * add new user
     * @param username
     * @param password
     * @param email
     * @param birthdate
     */
    addUser(userName: string, password: string, emailId: string, birthDate: Date): boolean {
        let id = this.users.length + 1;
        const user = new User();
        user.id = id;
        user.username = userName;
        user.password = password;
        user.email = emailId;
        user.birthdate = birthDate;
        this.users.push(user);
        return true;
    }
}
