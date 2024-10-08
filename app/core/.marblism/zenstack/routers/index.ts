/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@zenstackhq/runtime/models";
import createUserRouter from "./User.router";
import createMediaRouter from "./Media.router";
import createNotebookRouter from "./Notebook.router";
import createBoardRouter from "./Board.router";
import createNoteRouter from "./Note.router";
import createTaskRouter from "./Task.router";
import createNotificationRouter from "./Notification.router";
import createNoteMediaRouter from "./NoteMedia.router";
import createTaskMediaRouter from "./TaskMedia.router";
import createOrganizationRouter from "./Organization.router";
import createOrganizationRoleRouter from "./OrganizationRole.router";
import createPwaSubscriptionRouter from "./PwaSubscription.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as MediaClientType } from "./Media.router";
import { ClientType as NotebookClientType } from "./Notebook.router";
import { ClientType as BoardClientType } from "./Board.router";
import { ClientType as NoteClientType } from "./Note.router";
import { ClientType as TaskClientType } from "./Task.router";
import { ClientType as NotificationClientType } from "./Notification.router";
import { ClientType as NoteMediaClientType } from "./NoteMedia.router";
import { ClientType as TaskMediaClientType } from "./TaskMedia.router";
import { ClientType as OrganizationClientType } from "./Organization.router";
import { ClientType as OrganizationRoleClientType } from "./OrganizationRole.router";
import { ClientType as PwaSubscriptionClientType } from "./PwaSubscription.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        media: createMediaRouter(router, procedure),
        notebook: createNotebookRouter(router, procedure),
        board: createBoardRouter(router, procedure),
        note: createNoteRouter(router, procedure),
        task: createTaskRouter(router, procedure),
        notification: createNotificationRouter(router, procedure),
        noteMedia: createNoteMediaRouter(router, procedure),
        taskMedia: createTaskMediaRouter(router, procedure),
        organization: createOrganizationRouter(router, procedure),
        organizationRole: createOrganizationRoleRouter(router, procedure),
        pwaSubscription: createPwaSubscriptionRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    media: MediaClientType<AppRouter>;
    notebook: NotebookClientType<AppRouter>;
    board: BoardClientType<AppRouter>;
    note: NoteClientType<AppRouter>;
    task: TaskClientType<AppRouter>;
    notification: NotificationClientType<AppRouter>;
    noteMedia: NoteMediaClientType<AppRouter>;
    taskMedia: TaskMediaClientType<AppRouter>;
    organization: OrganizationClientType<AppRouter>;
    organizationRole: OrganizationRoleClientType<AppRouter>;
    pwaSubscription: PwaSubscriptionClientType<AppRouter>;
}
