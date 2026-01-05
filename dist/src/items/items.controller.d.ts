import { ItemsService } from './items.service';
export declare class ItemController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
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
    createWorkItem(body: {
        memberName: string;
        title?: string;
        description?: string;
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
    assignworkItems(body: {
        workItemId: string;
        memberName: string;
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
    updateWorkItem(id: string, body: {
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
    deleteWorkItem(id: string): Promise<{
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
