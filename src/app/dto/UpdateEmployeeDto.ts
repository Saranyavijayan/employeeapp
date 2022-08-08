
import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { UpdateAddressDto } from "./UpdateAddressDto";

export class UpdateEmployeeDto {
    @IsString()
    public name: string;

    @IsString()
    public username: string;

    @IsNumber()
    public experience: number;

    @IsString()
    public departmentId: string;

    @IsString()
    public joiningdate : string;

    @IsString()
    public role: string;

    @IsString()
    public status: string;

    @IsString()
    public password: string;

    @ValidateNested({ each: true })
    @Type(() => UpdateAddressDto)
    public address:UpdateAddressDto
}