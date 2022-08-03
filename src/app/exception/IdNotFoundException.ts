import HttpException from "./HttpException";
import { CustomError } from "../util/errorCode";

class IdNotFoundException extends HttpException {

    constructor(error: CustomError) {
      super(404, error.MESSAGE, error.CODE);
    }
  }
  
  export default IdNotFoundException;
  