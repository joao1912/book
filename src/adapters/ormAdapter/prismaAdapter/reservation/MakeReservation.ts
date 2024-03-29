import { prisma } from "../db";
import { IMakeReservation } from "../../repositories/reservation/IMakeReservation";
import { Reservation } from "../../../../entities/Reservation";
import handlePrismaError from "../util/handlePrismaError";


export class MakeReservation implements IMakeReservation {
    //@ts-ignore
    async execute({ props }: Reservation): Promise<Reservation> {

        const { userId, bookId, price, startedAt, endsAt, status } = props

        try {

            const data = await prisma.reservation.create({
                data: {
                    fk_id_book: bookId,
                    fk_id_user: userId,
                    price: price,
                    status: status


                },
                select: {
                    id: true,
                    fk_id_book: true,
                    fk_id_user: true,
                    price: true,
                    status: true,
                    createdAt: true,
                }
            })

            return new Reservation({

                id: data.id,
                userId: data.fk_id_user,
                bookId: data.fk_id_book,
                price: data.price,
                status: data.status,
                startedAt: data.createdAt,
                endsAt: data.createdAt,
            })


        } catch (error) {

            handlePrismaError("ReservationError",error)
        }


    }
}