export class Image {
    id: number;
    title: string;
    description: string;
    imgPath: string;
    path: string;
    alternative: string;
    file: File;
    liked = false;
    allowed: boolean;
    createdAt: Date;
    updatedAt: Date;
    likedBy: [];
}
