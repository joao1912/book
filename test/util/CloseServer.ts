import HTTPAdapter from "../../src/adapters/HTTPAdapter/protocol";

class CloseServer {

    static async execute() {

        HTTPAdapter.close()

    }

}

export default async () => {

    try {
        await CloseServer.execute()
    } catch (error) {
        console.log(error)
    }

}
