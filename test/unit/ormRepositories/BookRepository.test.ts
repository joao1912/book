import { addBook, deleteBook, getAllBooks, searchBookByGenre, searchBookById, searchBookByTitle, updateBook } from "../../../src/adapters/ormAdapter/protocols/bookProtocols"
import { Book, IBook } from "../../../src/entities/Book"


describe('Testes do BookRepository', () => {

    let idBookToBeDelete: string
    let idBookToBeDeleteTitle: string
    let bookGenre: string
    let bookTitle: string
    let bookId: string
    let idBookToBeUpdate: string;


    beforeAll(async () => {

        // Criar um livro para deletar

        const Book1 = new Book({
            title: "ORM Book to delete ",
            synopsis: "This is a test to delete e a book just with orm",
            price: 1,
            genre: "Test ORM",
            author: "Wilson",
            pageCount: 360,
            publishedDate: '2013-10-10'
        })

        await addBook.execute(Book1)
            .then(result => {

                if (result instanceof Book) {
                    if (result.props.id) (idBookToBeDelete = result.props.id)
                    if (result.props.title) (idBookToBeDeleteTitle = result.props.title)
                }



            })


        // Criar livro para buscas e update

        const BookToBeSearch: IBook = {
            title: "ORM Book to search",
            synopsis: "This is a test to search a book just with orm",
            price: 1,
            genre: "Test ORM",
            author: "Wilson",
            pageCount: 360,
            publishedDate: '2013-10-10'
        }

        const Book2 = new Book(BookToBeSearch)

        await addBook.execute(Book2)
            .then(result => {

                if (result instanceof Book) {
                    bookGenre = result.props.genre
                    bookTitle = result.props.title
                    if (result.props.id) {
                        bookId = result.props.id
                    }
                }


            })

        // Criar livro para update

        const BookToBeUpdate: IBook = {
            title: "ORM Book to update",
            synopsis: "This is a test to update a book just with orm",
            price: 1,
            genre: "Test ORM",
            author: "Wilson",
            pageCount: 360,
            publishedDate: '2013-10-10'
        }

        const Book3 = new Book(BookToBeUpdate)

        await addBook.execute(Book3)
            .then(result => {

                if (result instanceof Book) {
                    if (result.props.id) {
                        idBookToBeUpdate = result.props.id
                    }
                }


            })

    })

    it('Deve criar um book', async () => {

        const BookInstanceToBeAdd = new Book({
            title: "ORM Book to create",
            synopsis: "This is a test to create a book just with orm",
            price: 1,
            genre: "Test ORM",
            author: "Wilson",
            pageCount: 360,
            publishedDate: '2013-10-10'
        })

        const result = await addBook.execute(BookInstanceToBeAdd)

        if (result instanceof Book) {
            expect(result.props).toHaveProperty('id')
            expect(result).toBeInstanceOf(Book)
        }



    })

    it('Deve deletar um book', async () => {

        if (idBookToBeDelete == undefined) throw new Error('idBookToBeDelete can not be undefined')

        await deleteBook.execute(idBookToBeDelete)
            .then(result => {
                if(result instanceof Book){

                    expect(result).toBe(`O livro de id: ${idBookToBeDelete} e ${idBookToBeDeleteTitle} foi excluído com sucesso.`)
                }

            })

    })



    it('Deve buscar um livro por genero', async () => {

        if (bookGenre == undefined) throw new Error('bookGenre can not be undefined')

        await searchBookByGenre.execute(bookId)
            .then(result => {

                const equalValue: IBook = {
                    title: "ORM Book to search",
                    synopsis: "This is a test to search a book just with orm",
                    price: 1,
                    genre: bookGenre,
                    author: "Wilson",
                    pageCount: 360,
                    publishedDate: '2013-10-10'
                }
                if(result instanceof Book && Array.isArray(result)){

                    for (let books of result) {
    
                        expect(books).toBeInstanceOf(Book)
                    }
                }


            })

    })

    it('Deve buscar um livro por nome', async () => {

        if (bookTitle == undefined) throw new Error('bookGenre can not be undefined')

        await searchBookByTitle.execute(bookTitle)
            .then(result => {

                const equalValue: IBook = {

                    title: bookTitle,
                    synopsis: "This is a test to search a book just with orm",
                    price: 1,
                    genre: "Test ORM",
                    author: "Wilson",
                    pageCount: 360,
                    publishedDate: '2013-10-10'
                }
                if(result instanceof Book && Array.isArray(result))
                for (let book of result) { expect(book).toBeInstanceOf(Book) }

            })

    })
    it('Deve buscar um livro por id', async () => {


        await searchBookById.execute(bookId)
            .then(result => {

                const equalValue: IBook = {

                    title: bookTitle,
                    synopsis: "This is a test to search a book just with orm",
                    price: 1,
                    genre: "Test ORM",
                    author: "Wilson",
                    pageCount: 360,
                    publishedDate: '2013-10-10'
                }
                // expect(result[0].props).toEqual(equalValue)
                expect(result).toBeInstanceOf(Book)

            })

    })

    it('Deve atualizar informações do livro', async () => {

        const updatedValues = {
            id: idBookToBeUpdate,
            title: "ORM Book to search",
            synopsis: "This is a test to search a book just with orm",
            price: 140,
            genre: "Test ORM",
            author: "Wilson",
            pageCount: 360,
            publishedDate: '2013-10-10'
        }

        const BookInstanceToBeUpdated = new Book(updatedValues)

        await updateBook.execute(BookInstanceToBeUpdated)
            .then((result) => {

                if (result instanceof Book) {
                    expect(result.props).toEqual(updatedValues)
                    expect(result).toBeInstanceOf(Book)
                }



            })

    })

    it('Deve buscar todos os livros', async () => {

        const result = await getAllBooks.execute()

        if(result instanceof Book && Array.isArray(result)){
            expect(result.length).toBeGreaterThan(0)

            for (let books of result) expect(books).toBeInstanceOf(Book)
        }

    })

})