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

        createMany: procedure.input($Schema.TaskMediaInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).taskMedia.createMany(input as any))),

        create: procedure.input($Schema.TaskMediaInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).taskMedia.create(input as any))),

        deleteMany: procedure.input($Schema.TaskMediaInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).taskMedia.deleteMany(input as any))),

        delete: procedure.input($Schema.TaskMediaInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).taskMedia.delete(input as any))),

        findFirst: procedure.input($Schema.TaskMediaInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).taskMedia.findFirst(input as any))),

        findMany: procedure.input($Schema.TaskMediaInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).taskMedia.findMany(input as any))),

        findUnique: procedure.input($Schema.TaskMediaInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).taskMedia.findUnique(input as any))),

        updateMany: procedure.input($Schema.TaskMediaInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).taskMedia.updateMany(input as any))),

        update: procedure.input($Schema.TaskMediaInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).taskMedia.update(input as any))),

        count: procedure.input($Schema.TaskMediaInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).taskMedia.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.TaskMediaCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TaskMediaCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TaskMediaCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TaskMediaCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.TaskMediaCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TaskMediaCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TaskMediaGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TaskMediaGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TaskMediaCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TaskMediaCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TaskMediaGetPayload<T>, Context>) => Promise<Prisma.TaskMediaGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.TaskMediaDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TaskMediaDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TaskMediaDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TaskMediaDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.TaskMediaDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TaskMediaDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TaskMediaGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TaskMediaGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TaskMediaDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TaskMediaDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TaskMediaGetPayload<T>, Context>) => Promise<Prisma.TaskMediaGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.TaskMediaFindFirstArgs, TData = Prisma.TaskMediaGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.TaskMediaFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TaskMediaGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TaskMediaFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TaskMediaFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TaskMediaGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TaskMediaGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.TaskMediaFindManyArgs, TData = Array<Prisma.TaskMediaGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.TaskMediaFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.TaskMediaGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TaskMediaFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.TaskMediaFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.TaskMediaGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.TaskMediaGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.TaskMediaFindUniqueArgs, TData = Prisma.TaskMediaGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.TaskMediaFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.TaskMediaGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.TaskMediaFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.TaskMediaFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.TaskMediaGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.TaskMediaGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.TaskMediaUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TaskMediaUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TaskMediaUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TaskMediaUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.TaskMediaUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.TaskMediaUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.TaskMediaGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.TaskMediaGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.TaskMediaUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.TaskMediaUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.TaskMediaGetPayload<T>, Context>) => Promise<Prisma.TaskMediaGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.TaskMediaCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TaskMediaCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.TaskMediaCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.TaskMediaCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.TaskMediaCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.TaskMediaCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.TaskMediaCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.TaskMediaCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
