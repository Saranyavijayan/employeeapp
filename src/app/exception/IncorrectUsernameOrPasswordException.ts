import HttpException from "./HttpException";
import { CustomError } from "../util/errorCode";


class IncorrectUsernameOrPasswordException extends HttpException {

  constructor(error: CustomError) {
    super(403, error.MESSAGE, error.CODE);
  }
}

export default IncorrectUsernameOrPasswordException;
