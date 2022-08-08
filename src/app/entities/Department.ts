import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Employee } from "./Employee";


@Entity("department")
export class Department extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;
    @Column({ nullable: false })
    public name: string;
    @Column({ nullable: false })
    public employeeno: Number;

    @OneToMany(() => Employee, (employee) => employee.department)
    @JoinColumn()
    public employee: Employee[];
}