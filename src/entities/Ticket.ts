import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Airline } from "./Airline";
import { User } from "./User";

@Index("fk_ticket_airline_idx", ["airlineId"], {})
@Index("fk_ticket_user_idx", ["userId"], {})
@Entity("ticket", { schema: "fir_rs_2024" })
export class Ticket {
  @PrimaryGeneratedColumn({ type: "int", name: "ticket_id", unsigned: true })
  ticketId: number;

  @Column("int", { name: "flight_id", unsigned: true })
  flightId: number;

  @Column("int", { name: "airline_id", unsigned: true })
  airlineId: number;

  @Column("int", { name: "user_id", unsigned: true })
  userId: number;

  @Column("boolean", { name: "return" })
  return: boolean;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Airline, (airline) => airline.tickets, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "airline_id", referencedColumnName: "airlineId" }])
  airline: Airline;

  @ManyToOne(() => User, (user) => user.tickets, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;
}
