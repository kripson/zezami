import express from 'express';
import dotenv from 'dotenv';
import { HomeController } from './controllers/home-controller';
import { logger } from './middlewares/logger';
import { UserController } from './controllers';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
const homeController = new HomeController();
const userController = new UserController();

app.use('/', homeController.router);
app.use('/users', userController.router);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});