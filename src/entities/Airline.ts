import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ticket } from "./Ticket";

@Index("uq_airline_name", ["name"], { unique: true })
@Entity("airline", { schema: "fir_rs_2024" })
export class Airline {
  @PrimaryGeneratedColumn({ type: "int", name: "airline_id", unsigned: true })
  airlineId: number;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.airline)
  tickets: Ticket[];
}
