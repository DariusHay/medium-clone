// This is the interface that will store user information to be passed through 
// to create a new user.

import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";

export interface AuthResponseInterface {
    user: CurrentUserInterface
}