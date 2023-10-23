export interface Auth {
    name: string;
    email: string;
    password: string;
    confirmPassword? : string ;
    role?: string;
}
