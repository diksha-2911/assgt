import { PrismaService } from '../prisma/prisma.service';
import { Status } from '@prisma/client';
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
    assignWorkItem(workItemId: string, memberName: string): Promise<{
        status: import("@prisma/client").$Enums.Status;
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
        assignedToId: string | null;
    }>;
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
    updateStatus(workItemId: string, newStatus: Status): Promise<{
        status: import("@prisma/client").$Enums.Status;
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
        assignedToId: string | null;
    }>;
    getItems(): Promise<{
        status: import("@prisma/client").$Enums.Status;
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
        assignedToId: string | null;
    }[]>;
    getItemsById(id: string): Promise<{
        status: import("@prisma/client").$Enums.Status;
        id: string;
        title: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
        assignedToId: string | null;
    } | null>;
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
