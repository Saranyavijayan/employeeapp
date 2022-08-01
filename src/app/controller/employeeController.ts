import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../../service/EmployeeService";

class employeeController extends AbstractController {
  constructor(private EmployeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.getEmployees);
    this.router.post(`${this.path}`, this.createEmployee);
  }
  private getEmployees = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data=  await this.EmployeeService.getAllEmployees();
      response.status(200);
      
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.EmployeeService.createEmployee(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }
}

export default employeeController;
