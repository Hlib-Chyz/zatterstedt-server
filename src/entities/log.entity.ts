/* eslint-disable @typescript-eslint/no-explicit-any */
import { Entity, ObjectIdColumn, Column, CreateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity('logs')
export class Log {
    @ObjectIdColumn()
    public _id: ObjectId;
    @Column()
    @IsNotEmpty()
    @IsString()
    public operation: string;
    @Column()
    @IsNotEmpty()
    @IsString()
    public collection: string;
    @Column()
    @IsNotEmpty()
    @IsString()
    public documentId: string;
    @Column({ type: 'json', nullable: true })
    @IsNotEmpty()
    public oldData?: any;
    @Column({ type: 'json', nullable: true })
    @IsNotEmpty()
    public newData?: any;
    @CreateDateColumn()
    public createdAt: Date;
}
