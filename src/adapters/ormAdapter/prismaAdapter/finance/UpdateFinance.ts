import { IFinance, Finance } from "../../../../entities/Finance";
import { typeOfPayment } from "../../repositories/finance/ICreateFinance";
import { IUpdateFinance } from "../../repositories/finance/IUpdateFinance";
import { prisma } from "../db";


export class UpdateFinance implements IUpdateFinance {

    private toEnumPayment(type: string): typeOfPayment {

        let typePayment: typeOfPayment

        switch(type) {

            case "Ticket":
                typePayment = typeOfPayment.Ticket
                break
            case "Credit card":
                typePayment = typeOfPayment.CreditCard
                break
            case "Debit card":
                typePayment = typeOfPayment.DebitCard
                break
            case "Pix":
                typePayment = typeOfPayment.Pix
                break
            default:
                throw new Error('Internal server error: Type of Payment is undefined')
        }

        return typePayment

    }

    async execute({payment, id, total}: Partial<IFinance>): Promise<Partial<Finance>> {
        
        try {

            const updatedFinance = await prisma.finance.update({
                where: {
                    id: id
                },
                data: {
                    payments: payment || undefined,
                    total: total || undefined
                }
            })

            return new Finance({
                id: updatedFinance.id,
                payment: this.toEnumPayment(updatedFinance.payments),
                total: updatedFinance.total,
                bookId: updatedFinance.fk_id_book,
                userId: updatedFinance.fk_id_user 
            })
            
        } catch (error) {

            throw new Error('Internal server error: ' + error)

        }
    }
}