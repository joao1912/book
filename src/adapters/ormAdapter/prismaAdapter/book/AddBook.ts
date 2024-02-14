import { prisma } from "../db";
import { IBook, Book } from "../../../../entities/Book";
import { IAddBook } from "../../repositories/book/IAddBook";


export class AddBook implements IAddBook {
  async execute({ props }: Book): Promise<Book> {

    const { title, price, genre, synopsis, author, publishedDate, pageCount, image } = props
   
    try {
      const book = await prisma.book.create({
        data: {
          title: title,
          price: price,
          synopsis: synopsis,
          publishedDate: publishedDate,
          pageCount: pageCount,
          image: image,
          author: {
            connectOrCreate: {
              where: {
                name: author,
              },
              create: {
                name: author,
              },
            },
          },
          tag: {
            connectOrCreate: {
              where: {
                genre: genre,
              },
              create: {
                genre: genre,
              },
            },
          },
          stock: {
            create: {
              quantity: 1
            }
          }
        },
        select: {
          id: true,
          title: true,
          synopsis: true,
          price: true,
          publishedDate: true,
          pageCount: true,
          image: true,
          author: {
            select: {
              name: true,
            },
          },
          tag: {
            select: {
              genre: true,
            },
          },
        },
      });


      return new Book({
        id: book.id,
        title: book.title,
        price: book.price,
        author: book.author[0].name,
        publishedDate: book.publishedDate,
        pageCount: book.pageCount,
        synopsis: book.synopsis,
        genre: book.tag[0].genre,
      });

    } catch (error) {
      throw new Error("Internal server error: " + error);
    }
  }
}
