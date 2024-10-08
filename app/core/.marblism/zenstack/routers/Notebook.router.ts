/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@zenstackhq/runtime/models';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.NotebookInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).notebook.createMany(input as any))),

        create: procedure.input($Schema.NotebookInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).notebook.create(input as any))),

        deleteMany: procedure.input($Schema.NotebookInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).notebook.deleteMany(input as any))),

        delete: procedure.input($Schema.NotebookInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).notebook.delete(input as any))),

        findFirst: procedure.input($Schema.NotebookInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).notebook.findFirst(input as any))),

        findMany: procedure.input($Schema.NotebookInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).notebook.findMany(input as any))),

        findUnique: procedure.input($Schema.NotebookInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).notebook.findUnique(input as any))),

        updateMany: procedure.input($Schema.NotebookInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).notebook.updateMany(input as any))),

        update: procedure.input($Schema.NotebookInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).notebook.update(input as any))),

        count: procedure.input($Schema.NotebookInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).notebook.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.NotebookCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NotebookCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NotebookCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NotebookCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.NotebookCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NotebookCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.NotebookGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.NotebookGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NotebookCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NotebookCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.NotebookGetPayload<T>, Context>) => Promise<Prisma.NotebookGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.NotebookDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NotebookDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NotebookDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NotebookDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.NotebookDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NotebookDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.NotebookGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.NotebookGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NotebookDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NotebookDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.NotebookGetPayload<T>, Context>) => Promise<Prisma.NotebookGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.NotebookFindFirstArgs, TData = Prisma.NotebookGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.NotebookFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.NotebookGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.NotebookFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.NotebookFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.NotebookGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.NotebookGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.NotebookFindManyArgs, TData = Array<Prisma.NotebookGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.NotebookFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.NotebookGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.NotebookFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.NotebookFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.NotebookGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.NotebookGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.NotebookFindUniqueArgs, TData = Prisma.NotebookGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.NotebookFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.NotebookGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.NotebookFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.NotebookFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.NotebookGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.NotebookGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.NotebookUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NotebookUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NotebookUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NotebookUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.NotebookUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NotebookUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.NotebookGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.NotebookGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NotebookUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NotebookUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.NotebookGetPayload<T>, Context>) => Promise<Prisma.NotebookGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.NotebookCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.NotebookCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.NotebookCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.NotebookCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.NotebookCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.NotebookCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.NotebookCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.NotebookCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
