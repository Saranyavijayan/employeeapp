import express from "express";
//import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import RequestWithUser from "../util/rest/request";
import jsonwebtoken from "jsonwebtoken";
import APP_CONSTANTS from "../constants";
//import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import { ErrorCodes } from "../util/errorCode";
import UserNotAuthorizedException from "../exception/UserNotAuthorisedException";


const authorize = (permittedRoles: string[]) => {
  return async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
        const token = getTokenFromRequestHeader(req);
        jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
  
        const data: any = jsonwebtoken.decode(token);
  
        const decodedData = JSON.parse(JSON.stringify(data));
  
        if (!(permittedRoles.includes(decodedData.role))) {
          throw new UserNotAuthorizedException(ErrorCodes.UNAUTHORIZED);
        }
    } catch (error) {
      return next(new UserNotAuthorizedException(ErrorCodes.UNAUTHORIZED));
    }
  };
};

const getTokenFromRequestHeader = (req: RequestWithUser) => {
  const tokenWithBearerHeader = req.header(
    `${APP_CONSTANTS.authorizationHeader}`
  );

  if (tokenWithBearerHeader) {
    return tokenWithBearerHeader.replace(`${APP_CONSTANTS.bearer} `, "");
  }
  return "";
};

export default authorize;