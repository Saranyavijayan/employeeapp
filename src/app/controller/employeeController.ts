import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../../service/EmployeeService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateEmployeeDto } from "../dto/createEmployeeDto";
import authorize from "../middleware/authorize";
import { CreateUuidDto } from "../dto/CreateUuidDto";
import { UpdateEmployeeDto } from "../dto/UpdateEmployeeDto";
//import { updateEmployeeDto } from "../dto/UpdateEmployeeDto";


class employeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  
  protected initializeRoutes() {
    this.router.get(`${this.path}`, authorize(['admin','developer']), this.getEmployees);
    this.router.get(`${this.path}/:id`,authorize(['admin','developer']),validationMiddleware(CreateUuidDto, APP_CONSTANTS.params), this.getEmployeebyId);
   // this.router.post(`${this.path}`, this.createEmployee);
    this.router.post(`${this.path}`,authorize(['admin']),validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),this.createEmployee);
    this.router.put(`${this.path}/:id`,authorize(['admin']),validationMiddleware(CreateUuidDto, APP_CONSTANTS.params),validationMiddleware( UpdateEmployeeDto, APP_CONSTANTS.body) ,this.updateEmployee); 
    this.router.delete(`${this.path}/:id`,authorize(['admin']),validationMiddleware(CreateUuidDto, APP_CONSTANTS.params),this.deleteEmployee); 
    this.router.post(`${this.path}/login`,this.login); 
  }
  private getEmployees = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data=  await this.employeeService.getAllEmployees();
      response.status(200);
      
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  
  private getEmployeebyId = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data=  await this.employeeService.getEmployeebyId(request.params.id);
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
      console.log(request.body);
      const data = await this.employeeService.createEmployee(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }
 
  private updateEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.updateEmployee(request.params.id,request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private deleteEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.employeeService.deleteEmployee(request.params.id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }
  
  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try{
    const loginData = request.body;
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.username.toLowerCase(),
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );}
    catch(err){
      next(err);
    }
  };
}

export default employeeController;
