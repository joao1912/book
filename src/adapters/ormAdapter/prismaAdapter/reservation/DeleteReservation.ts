import { prisma } from "../db";

import { IDeleteMessage, IDeleteReservation } from "../../repositories/reservation/IDeleteReservation";

export class DeleteReservation implements IDeleteReservation {

    async execute(reservationId: string): Promise<IDeleteMessage> {
       
        try {
            
            await prisma.reservation.delete({
                where: {
                    id: reservationId
                }
            })

            const message: IDeleteMessage =  {
                message: 'Reservada deletada com sucesso!'
            }            

            return message

        } catch (error) {
            
            throw new Error('internal server error' + error)

        }
    }
}