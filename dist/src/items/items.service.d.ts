import { PrismaService } from '../prisma/prisma.service';
export declare class ItemsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(title: string, memberName: string, description?: string): Promise<{
        status: import("@prisma/client").$Enums.Status;
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
        assignedToId: string | null;
    }>;
    assignWorkItem(workItemId: string, memberName: string): Promise<void>;
    update(id: string, data: {
        title?: string;
        description?: string;
        status?: 'OPEN' | 'IN_PROGRESS' | 'DONE';
    }): Promise<{
        status: import("@prisma/client").$Enums.Status;
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
        assignedToId: string | null;
    }>;
    delete(id: string): Promise<{
        status: import("@prisma/client").$Enums.Status;
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
        assignedToId: string | null;
    }>;
}
