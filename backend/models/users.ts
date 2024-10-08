export class User {
    name: string;
    email: string;
    id: number;
    
    constructor({name, email, id}: {name: string, email: string, id: number}) {
        this.name = name;
        this.email = email;
        this.id = id;
    }
}