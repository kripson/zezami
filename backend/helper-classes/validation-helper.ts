import { z } from "zod";
import { Models, User } from "../models";

type DataBaseAction = "create" | "update" | "delete";

//this is the schema mapping for the database;
//TODO: make the schema object for each model more explicit
type SchemaMapping = Map<
  Models,
  {
    [key in DataBaseAction]?: z.AnyZodObject;
  }
>;

export class ValidationHelper {
  private schemaMapping: SchemaMapping = new Map([
    [
      User,
      {
        create: z.object({
          name: z.string({ message: "Name is a required field" }).min(1),
          email: z
            .string({ message: "Email is a required field" })
            .email({ message: "Invalid format" }),
          id: z.number({ message: "Id is a required field" }).int().positive(),
        }),
        update: z.object({
          //optional since partial update might not have all fields
          name: z.string({ message: "Id is a required field" }).min(1).optional(),
          email: z
            .string({ message: "Id is a required field" })
            .email()
            .optional(),
          id: z.number({ message: "Id is a required field" }).int().positive(),
        }),
      },
    ],
  ]);

  public validate(schema: Models, action: DataBaseAction, data: any) {
    try {
      const validationSchema = this.schemaMapping.get(schema)?.[action];
      if (!validationSchema) {
        return {
          valid: false,
          errors: [`No schema found for ${schema} and ${action}`],
        };
      }
      validationSchema.parse(data);

      return {
        valid: true,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          valid: false,
          errors: error.errors.map((e) => {
            return e.path[0] + " : " + e.message;
          }),
        };
      } else {
        return {
          valid: false,
          errors: [error instanceof Error ? error.message : String(error)],
        };
      }
    }
  }
}
