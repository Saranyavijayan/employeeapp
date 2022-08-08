import HttpException from "./HttpException";
import { CustomError } from "../util/errorCode";

class UserNotAuthorizedException extends HttpException {

  constructor(error: CustomError) {
    super(403, error.MESSAGE, error.CODE);
  }
}

export default UserNotAuthorizedException;
