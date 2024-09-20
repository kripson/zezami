import { ValidationHelper } from "../helper-classes";

export class Ioc {
  
  
  
    getMapping() {
        return {
            validationHelper: new ValidationHelper()
        }
    }
}
