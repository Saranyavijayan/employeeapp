import { BaseEntity, Column, Entity, Generated, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";





@Entity("address")
    export class Address extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
        @Column({ nullable: false })
        public hname: string;
        @Column({ nullable: false })
        public hno: string;
        @Column({ nullable: false })
        public city: string;
        @Column({ nullable: false })
        public state: string;
        @Column({ nullable: false })
        public country: String;
        @Column({ nullable: false })
        public pincode: string;

    }