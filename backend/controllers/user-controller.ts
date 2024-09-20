import { Request, Response, Router } from "express";
import { User } from "../models";
import { Ioc } from "../ioc/ioc";

export class UserController {
  router: Router;
  // Temporary array of users for development purposes
  dummyUsers: any[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@example.com",
    },
    {
      id: 3,
      name: "John Smith",
      email: "john.smith@example.com",
    },
    {
      id: 4,
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
  ];

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  // Set up routes for CRUD operations
  private setupRoutes() {
    this.router.get("/", this.getUsers);
    this.router.post("/", this.createUser);
    this.router.put("/:id", this.updateUser);
    this.router.delete("/:id", this.deleteUser);
  }

  // Retrieve all users
  public getUsers = (_req: Request, res: Response) => {
    //TODO:implement filtering
      //server response messages can be made enums or internationalisation can be done instead of hard coded strings
    res.status(200).send({
      status: 200,
      data: this.dummyUsers,
      message: "Users fetched successfully",
    });
  };

  // Create a new user
  public createUser = (req: Request, res: Response) => {
    const { name, email } = req.body;

    const newUser = new User({
      name,
      email,
      id: this.dummyUsers.length + 1,
    });

    const { validationHelper } = new Ioc().getMapping();

    const validity = validationHelper.validate(User, "create", newUser);
    if (validity.valid) {
      this.dummyUsers.push(newUser);

      //server response messages can be made enums or internationalisation can be done instead of hard coded strings

      res.status(200).send({
        status: 200,
        data: [newUser],
        message: "User created successfully",
      });
    } else {
      res.status(400).send({
        status: 400,
        errors: validity.errors,
        message: "Validation Error",
      });
    }
  };

  // Update an existing user
  public updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    let user = this.dummyUsers.find((user) => user.id === parseInt(id));

    if (!user) {
      res.status(400).send({
        status: 400,
        errors: ["User not found"],
        message: "User not found",
      });
      return;
    }

    const updatedUser = {
      ...user,
      ...req.body,
    };

    const { validationHelper } = new Ioc().getMapping();

    const validity = validationHelper.validate(User, "update", updatedUser);

    if (validity.valid) {
      
      Object.keys(updatedUser).forEach(key=>{
        user[key] = updatedUser[key]
      })
      //server response messages can be made enums or internationalisation can be done instead of hard coded strings

      res.status(200).send({
        status: 200,
        data: [user],
        message: "User updated successfully",
      });
    } else {
      //server response messages can be made enums or internationalisation can be done instead of hard coded strings
      res.status(400).send({
        status: 400,
        errors: validity.errors,
        message: "Validation Error",
      });
    }
  };

  // Delete a user
  public deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    this.dummyUsers = this.dummyUsers.filter(
      (user) => user.id !== parseInt(id)
    );
    res.status(200).send({ status: 200, message: "User deleted successfully" });
  };
}
