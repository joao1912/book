import { prisma } from "../db";
import { IUpdateStock } from "../../repositories/stock/IUpdateStock";
import { IStock, Stock } from "../../../../entities/Stock";
import handlePrismaError from "../util/handlePrismaError";

export class UpdateStock implements IUpdateStock {
  //@ts-ignore
  async execute({ props }: Stock): Promise<Stock> {

    const { id, quantity, book } = props

    try {
      const stockData = await prisma.stock.update({

        data: {
          quantity: quantity || undefined
        },
        where: {
          fk_id_book: book.id,
        },

        select: {
          id: true,
          quantity: true,
          book: {
            include: {
              author: true,
              tag: true
            }
          }
        }
      });

      return new Stock({
        id: stockData.id,
        quantity: stockData.quantity,
        book: {
          id: stockData.id,
          title: stockData.book.title,
          author: stockData.book.author[0].name,
          price: stockData.book.price,
          synopsis: stockData.book.synopsis,
          publishedDate: stockData.book.publishedDate,
          pageCount: stockData.book.pageCount,
          genre: stockData.book.tag[0].genre,
        }
      });

    } catch (error) {
      handlePrismaError("StockError", error)
    }
  }
}
