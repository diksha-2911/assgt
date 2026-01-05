"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ItemsService = class ItemsService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(title, memberName, description) {
        const memberId = await this.prismaService.member.findFirst({
            where: { name: memberName },
        });
        return this.prismaService.workItem.create({
            data: {
                title,
                description,
                status: 'OPEN',
                createdBy: {
                    connect: {
                        id: memberId?.id || '',
                    },
                },
            },
        });
    }
    async assignWorkItem(workItemId, memberName) {
        const member = await this.prismaService.member.findFirst({
            where: { name: memberName },
        });
        return await this.prismaService.workItem.update({
            where: { id: workItemId },
            data: {
                assignedTo: {
                    connect: {
                        id: member?.id || '',
                    },
                },
            },
        });
    }
    async update(id, data) {
        const existsWorkItem = await this.prismaService.workItem.findUnique({
            where: { id },
            select: { status: true },
        });
        if (!existsWorkItem) {
            throw new common_1.NotFoundException('workItem not found');
        }
        if (data.status && data.status !== existsWorkItem.status) {
            await this.updateStatus(id, data.status);
        }
        const { status, ...rest } = data;
        return this.prismaService.workItem.update({
            where: { id },
            data: rest,
        });
    }
    async updateStatus(workItemId, newStatus) {
        const ALLOWED_STATUS_TRANSITIONS = {
            OPEN: ['IN_PROGRESS'],
            IN_PROGRESS: ['DONE'],
            DONE: [],
        };
        const workItem = await this.prismaService.workItem.findUnique({
            where: { id: workItemId },
        });
        if (!workItem) {
            throw new common_1.NotFoundException('Work item not found');
        }
        const currentStatus = workItem.status;
        const allowedNextStatuses = ALLOWED_STATUS_TRANSITIONS[currentStatus];
        if (!allowedNextStatuses.includes(newStatus)) {
            throw new common_1.BadRequestException(`Invalid status transition: ${currentStatus} → ${newStatus}`);
        }
        return this.prismaService.workItem.update({
            where: { id: workItemId },
            data: { status: newStatus },
        });
    }
    async getItems() {
        return await this.prismaService.workItem.findMany();
    }
    async getItemsById(id) {
        return await this.prismaService.workItem.findUnique({
            where: { id },
        });
    }
    async delete(id) {
        const exists = await this.prismaService.workItem.findUnique({
            where: { id },
        });
        if (!exists) {
            throw new common_1.NotFoundException('workItem not found');
        }
        return this.prismaService.workItem.delete({
            where: { id },
        });
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ItemsService);
//# sourceMappingURL=items.service.js.map