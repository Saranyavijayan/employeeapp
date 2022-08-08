import {  IsUUID } from "class-validator";

export class CreateUuidDto {
    @IsUUID()
    public id: string;}