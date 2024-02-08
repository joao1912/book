import { addBook } from "../../../src/adapters/ormAdapter/protocols/bookProtocols";
import { createFavorite, deleteFavorite, getAllFavoritesByUserId } from "../../../src/adapters/ormAdapter/protocols/favoriteProtocols";
import { createUser } from "../../../src/adapters/ormAdapter/protocols/userProtocols";
import { Book } from "../../../src/entities/Book";

interface IFavoriteToBeSearch {
    id?: string;
    name: 'nome_para_busca';
    description: 'uma descrição';
}

interface IFavoriteToBeUpdate {
    id?: string;
    name: 'nome_para_update';
    description: 'uma descrição';
}

interface IUserToFavoriteTest {
    id?: string;
    username: 'um nome2eawefaer';
    email: 'teste@gmail.coaefaefm2';
    telephone: '550000500002';
    password: 'senha_segura';
}

describe('Testes do FavoriteRepository', () => {

    let idFavoriteToBeDelete: string;
    let idFavoriteToBeSearch: string;
    let idFavoriteToBeUpdate: string;

    let userId: string;
    let bookId1: string;
    let bookId2: string;

    beforeAll(async () => {

        // Criar um usuário para os testes

        const user: IUserToFavoriteTest = {
            username: 'um nome2eawefaer',
            email: 'teste@gmail.coaefaefm2',
            telephone: '550000500002',
            password: 'senha_segura'
        }

        await createUser.execute(user)
            .then(result => {

                userId = result.props.id

            })

        // Crir um livro para os testes

        const book1 = {
            title: "Um livro de tesaefvacetes",
            author: "Um author",
            synopsis: "bla bla bla",
            price: 15,
            genre: "teste"
        }

        const book2 = {
            title: "Um livro de tescaefcaetes2",
            author: "Um author2",
            synopsis: "bla bla bla2",
            price: 15,
            genre: "teste2"
        }

        await addBook.execute(book1)
            .then(result => {

                bookId1 = result.props.id

            })

        await addBook.execute(book2)
            .then(result => {

                bookId2 = result.props.id

            })

        await createFavorite.execute(userId, bookId2)
            .then(result => {

                idFavoriteToBeDelete = result.favoriteId

            })


    })

    it('Deve criar um favorite', async () => {

        await createFavorite.execute(userId, bookId1)
            .then(result => {

                const { book, favoriteId } = result

                if (favoriteId != undefined) {

                    expect(book).toBeInstanceOf(Book)

                }

            })

    })

    it('Deve deletar um favorite', async () => {

        await deleteFavorite.execute(idFavoriteToBeDelete)
            .then(result => {

                expect(result.message).toBe('O livro foi removido dos favoritos')

            })

    })

    it('Deve buscar todos os favorites', async () => {

        await getAllFavoritesByUserId.execute(userId)
            .then(result => {

                expect(result.length).toBeGreaterThan(0)
                expect(result[0]).toBeInstanceOf(Book)

            })

    })

})