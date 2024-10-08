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

        createMany: procedure.input($Schema.MediaInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).media.createMany(input as any))),

        create: procedure.input($Schema.MediaInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).media.create(input as any))),

        deleteMany: procedure.input($Schema.MediaInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).media.deleteMany(input as any))),

        delete: procedure.input($Schema.MediaInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).media.delete(input as any))),

        findFirst: procedure.input($Schema.MediaInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).media.findFirst(input as any))),

        findMany: procedure.input($Schema.MediaInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).media.findMany(input as any))),

        findUnique: procedure.input($Schema.MediaInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).media.findUnique(input as any))),

        updateMany: procedure.input($Schema.MediaInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).media.updateMany(input as any))),

        update: procedure.input($Schema.MediaInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).media.update(input as any))),

        count: procedure.input($Schema.MediaInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).media.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.MediaCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MediaCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MediaCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MediaCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.MediaCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MediaCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.MediaGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.MediaGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MediaCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MediaCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.MediaGetPayload<T>, Context>) => Promise<Prisma.MediaGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.MediaDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MediaDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MediaDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MediaDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.MediaDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MediaDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.MediaGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.MediaGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MediaDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MediaDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.MediaGetPayload<T>, Context>) => Promise<Prisma.MediaGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.MediaFindFirstArgs, TData = Prisma.MediaGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.MediaFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.MediaGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.MediaFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.MediaFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.MediaGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.MediaGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.MediaFindManyArgs, TData = Array<Prisma.MediaGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.MediaFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.MediaGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.MediaFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.MediaFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.MediaGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.MediaGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.MediaFindUniqueArgs, TData = Prisma.MediaGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.MediaFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.MediaGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.MediaFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.MediaFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.MediaGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.MediaGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.MediaUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MediaUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MediaUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MediaUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.MediaUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MediaUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.MediaGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.MediaGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MediaUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MediaUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.MediaGetPayload<T>, Context>) => Promise<Prisma.MediaGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.MediaCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.MediaCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.MediaCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.MediaCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.MediaCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.MediaCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.MediaCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.MediaCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
