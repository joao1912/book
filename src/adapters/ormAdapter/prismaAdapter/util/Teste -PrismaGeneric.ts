import { prisma } from "../db";
import { Prisma } from "@prisma/client"
import handlePrismaError from "./handlePrismaError";


const prismaGeneric =  prisma.$extends({
            model: {
                $allModels: {
                    async findOne<T>(
                        this: T,
                        where: Prisma.Args<T, 'findUnique'>['where']
                    ): Promise<boolean> {
                        // Get the current model at runtime
                        const context = Prisma.getExtensionContext(this)

                        const result = await (context as any).findUnique({ where })
                        return result !== null
                    },

                    async findsMany<T>(
                        this: T,
                        where: Prisma.Args<T, 'findMany'>['where']
                    ): Promise<boolean> {
                        // Get the current model at runtime
                        const context = Prisma.getExtensionContext(this)

                        const result = await (context as any).findMany({ where })
                        return result !== null
                    },
                    async delete<T>(
                        this: T,
                        where: Prisma.Args<T, 'delete'>['where']
                    ): Promise<boolean> {
                        // Get the current model at runtime
                        const context = Prisma.getExtensionContext(this)

                        const result = await (context as any).delete({ where })
                        return result !== null
                    },
                },
            },
        })

        // try {

        // } catch (error) {
        //     return handlePrismaError("adminError", error)

        // }
export default prismaGeneric