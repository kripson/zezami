import { Request, Response, Router } from 'express';

// Controller for handling home-related routes
export class HomeController {
    router: Router;

    constructor() {
        this.router = Router();
        this.setupRoutes();
    }

    private setupRoutes() {
        this.router.get('/', this.index);
    }

    // Handler for the home page route
    public index(_req: Request, res: Response) {
        res.send('Hello World');
    }
}