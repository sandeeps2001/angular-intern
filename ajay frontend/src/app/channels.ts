export interface Channels {
    _id?: string;
    name: string;
    description: string;
    createdBy?: {
        email: string;
    };
    createdAt?: string;
}
