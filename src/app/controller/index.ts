/**
 * Wraps Controllers for easy import from other modules
 */
import { DepartmentService } from "../../service/DepartmentService";
import { EmployeeService } from "../../service/EmployeeService";
import { DepartmentRespository } from "../repository/departmentRepository";
import { EmployeeRespository } from "../repository/employeeRepository";
import DepartmentController from "./DepartmentController";
import employeeController from "./employeeController";
import HealthController from "./HealthController";
export default [
  new HealthController(),
  new employeeController(new EmployeeService(new EmployeeRespository)),
  new DepartmentController(new DepartmentService(new DepartmentRespository)),
  
];
