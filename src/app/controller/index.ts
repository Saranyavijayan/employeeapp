/**
 * Wraps Controllers for easy import from other modules
 */
import { EmployeeService } from "../../service/EmployeeService";
import { EmployeeRespository } from "../repository/employeeRepository";
import employeeController from "./employeeController";
import HealthController from "./HealthController";
export default [
  new HealthController(),
  new employeeController(new EmployeeService(new EmployeeRespository)),
  
];
