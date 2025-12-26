import { MembersService } from './members.service';
export declare class MembersController {
    private readonly membersService;
    constructor(membersService: MembersService);
    createMember(body: {
        name: string;
        role: string;
    }): import("@prisma/client").Prisma.Prisma__MemberClient<{
        id: string;
        name: string;
        role: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateRole(id: string, body: {
        role: string;
    }): Promise<{
        id: string;
        name: string;
        role: string;
    }>;
}
