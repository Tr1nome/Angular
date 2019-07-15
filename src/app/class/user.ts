import { Image } from './image';

export class User {
    username: string;
    email: string;
    password: string;
    formations: [];
    events: [];
    enabled: boolean;
    profilePicture: Image;
    connected: boolean;
    photos: [];
    imageDeletable: boolean;
    lname: string;
    fname: string;
    adherent: boolean;
}
