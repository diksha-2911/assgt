import { PrismaService } from '../prisma/prisma.service';
export declare class MembersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(name: string, role: string): import("@prisma/client").Prisma.Prisma__MemberClient<{
        id: string;
        name: string;
        role: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateRole(id: string, role: string): Promise<{
        id: string;
        name: string;
        role: string;
    }>;
    findById(id: string): import("@prisma/client").Prisma.Prisma__MemberClient<{
        id: string;
        name: string;
        role: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
