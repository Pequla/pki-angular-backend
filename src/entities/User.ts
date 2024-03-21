import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ticket } from "./Ticket";

@Index("uq_user_email", ["email"], { unique: true })
@Entity("user", { schema: "fir_rs_2024" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];
}
