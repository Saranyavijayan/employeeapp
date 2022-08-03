import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../../service/DepartmentService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateDepartmentDto } from "../dto/CreateDepartmentDto";

class DepartmentController extends AbstractController {
  constructor(private DeptService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.getDepartments);
    //this.router.post(`${this.path}`, this.createDepartment);
    this.router.post(`${this.path}`,
    validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),
    this.createDepartment);
    this.router.post(`${this.path}/:id`, this.updateDepartment);
    this.router.delete(`${this.path}/:id`, this.deleteDepartment);
    this.router.get(`${this.path}/:id`, this.getDepartmentbyId);

    
  }


  private getDepartments = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data=  await this.DeptService.getAllDepartment();
      response.status(200);
      
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }
  private getDepartmentbyId = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const data=  await this.DeptService.getDepartmentbyId(request.params.id);
      response.status(200);
      
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1));
    } catch (error) {
      return next(error);
    }
  }

  private createDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.DeptService.createDepartment(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private updateDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.DeptService.updateDepatment(request.params.id,request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

  private deleteDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.DeptService.deleteDepartment(request.params.id);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  }

}

export default DepartmentController;
