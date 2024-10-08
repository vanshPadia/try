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

        createMany: procedure.input($Schema.NoteMediaInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).noteMedia.createMany(input as any))),

        create: procedure.input($Schema.NoteMediaInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).noteMedia.create(input as any))),

        deleteMany: procedure.input($Schema.NoteMediaInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).noteMedia.deleteMany(input as any))),

        delete: procedure.input($Schema.NoteMediaInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).noteMedia.delete(input as any))),

        findFirst: procedure.input($Schema.NoteMediaInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).noteMedia.findFirst(input as any))),

        findMany: procedure.input($Schema.NoteMediaInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).noteMedia.findMany(input as any))),

        findUnique: procedure.input($Schema.NoteMediaInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).noteMedia.findUnique(input as any))),

        updateMany: procedure.input($Schema.NoteMediaInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).noteMedia.updateMany(input as any))),

        update: procedure.input($Schema.NoteMediaInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).noteMedia.update(input as any))),

        count: procedure.input($Schema.NoteMediaInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).noteMedia.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.NoteMediaCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NoteMediaCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NoteMediaCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NoteMediaCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.NoteMediaCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NoteMediaCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.NoteMediaGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.NoteMediaGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NoteMediaCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NoteMediaCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.NoteMediaGetPayload<T>, Context>) => Promise<Prisma.NoteMediaGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.NoteMediaDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NoteMediaDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NoteMediaDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NoteMediaDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.NoteMediaDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NoteMediaDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.NoteMediaGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.NoteMediaGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NoteMediaDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NoteMediaDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.NoteMediaGetPayload<T>, Context>) => Promise<Prisma.NoteMediaGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.NoteMediaFindFirstArgs, TData = Prisma.NoteMediaGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.NoteMediaFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.NoteMediaGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.NoteMediaFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.NoteMediaFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.NoteMediaGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.NoteMediaGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.NoteMediaFindManyArgs, TData = Array<Prisma.NoteMediaGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.NoteMediaFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.NoteMediaGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.NoteMediaFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.NoteMediaFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.NoteMediaGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.NoteMediaGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.NoteMediaFindUniqueArgs, TData = Prisma.NoteMediaGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.NoteMediaFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.NoteMediaGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.NoteMediaFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.NoteMediaFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.NoteMediaGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.NoteMediaGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.NoteMediaUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NoteMediaUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NoteMediaUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NoteMediaUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.NoteMediaUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NoteMediaUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.NoteMediaGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.NoteMediaGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NoteMediaUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NoteMediaUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.NoteMediaGetPayload<T>, Context>) => Promise<Prisma.NoteMediaGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.NoteMediaCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.NoteMediaCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.NoteMediaCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.NoteMediaCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.NoteMediaCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.NoteMediaCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.NoteMediaCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.NoteMediaCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
