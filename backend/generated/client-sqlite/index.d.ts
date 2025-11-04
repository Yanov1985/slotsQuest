
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model providers
 * 
 */
export type providers = $Result.DefaultSelection<Prisma.$providersPayload>
/**
 * Model mechanics
 * 
 */
export type mechanics = $Result.DefaultSelection<Prisma.$mechanicsPayload>
/**
 * Model themes
 * 
 */
export type themes = $Result.DefaultSelection<Prisma.$themesPayload>
/**
 * Model slot_categories
 * 
 */
export type slot_categories = $Result.DefaultSelection<Prisma.$slot_categoriesPayload>
/**
 * Model slots
 * 
 */
export type slots = $Result.DefaultSelection<Prisma.$slotsPayload>
/**
 * Model slot_mechanics
 * 
 */
export type slot_mechanics = $Result.DefaultSelection<Prisma.$slot_mechanicsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Providers
 * const providers = await prisma.providers.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Providers
   * const providers = await prisma.providers.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.providers`: Exposes CRUD operations for the **providers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Providers
    * const providers = await prisma.providers.findMany()
    * ```
    */
  get providers(): Prisma.providersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mechanics`: Exposes CRUD operations for the **mechanics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mechanics
    * const mechanics = await prisma.mechanics.findMany()
    * ```
    */
  get mechanics(): Prisma.mechanicsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.themes`: Exposes CRUD operations for the **themes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Themes
    * const themes = await prisma.themes.findMany()
    * ```
    */
  get themes(): Prisma.themesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.slot_categories`: Exposes CRUD operations for the **slot_categories** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Slot_categories
    * const slot_categories = await prisma.slot_categories.findMany()
    * ```
    */
  get slot_categories(): Prisma.slot_categoriesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.slots`: Exposes CRUD operations for the **slots** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Slots
    * const slots = await prisma.slots.findMany()
    * ```
    */
  get slots(): Prisma.slotsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.slot_mechanics`: Exposes CRUD operations for the **slot_mechanics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Slot_mechanics
    * const slot_mechanics = await prisma.slot_mechanics.findMany()
    * ```
    */
  get slot_mechanics(): Prisma.slot_mechanicsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    providers: 'providers',
    mechanics: 'mechanics',
    themes: 'themes',
    slot_categories: 'slot_categories',
    slots: 'slots',
    slot_mechanics: 'slot_mechanics'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "providers" | "mechanics" | "themes" | "slot_categories" | "slots" | "slot_mechanics"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      providers: {
        payload: Prisma.$providersPayload<ExtArgs>
        fields: Prisma.providersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.providersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$providersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.providersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$providersPayload>
          }
          findFirst: {
            args: Prisma.providersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$providersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.providersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$providersPayload>
          }
          findMany: {
            args: Prisma.providersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$providersPayload>[]
          }
          create: {
            args: Prisma.providersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$providersPayload>
          }
          createMany: {
            args: Prisma.providersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.providersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$providersPayload>[]
          }
          delete: {
            args: Prisma.providersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$providersPayload>
          }
          update: {
            args: Prisma.providersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$providersPayload>
          }
          deleteMany: {
            args: Prisma.providersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.providersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.providersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$providersPayload>[]
          }
          upsert: {
            args: Prisma.providersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$providersPayload>
          }
          aggregate: {
            args: Prisma.ProvidersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProviders>
          }
          groupBy: {
            args: Prisma.providersGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProvidersGroupByOutputType>[]
          }
          count: {
            args: Prisma.providersCountArgs<ExtArgs>
            result: $Utils.Optional<ProvidersCountAggregateOutputType> | number
          }
        }
      }
      mechanics: {
        payload: Prisma.$mechanicsPayload<ExtArgs>
        fields: Prisma.mechanicsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.mechanicsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mechanicsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.mechanicsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mechanicsPayload>
          }
          findFirst: {
            args: Prisma.mechanicsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mechanicsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.mechanicsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mechanicsPayload>
          }
          findMany: {
            args: Prisma.mechanicsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mechanicsPayload>[]
          }
          create: {
            args: Prisma.mechanicsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mechanicsPayload>
          }
          createMany: {
            args: Prisma.mechanicsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.mechanicsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mechanicsPayload>[]
          }
          delete: {
            args: Prisma.mechanicsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mechanicsPayload>
          }
          update: {
            args: Prisma.mechanicsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mechanicsPayload>
          }
          deleteMany: {
            args: Prisma.mechanicsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.mechanicsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.mechanicsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mechanicsPayload>[]
          }
          upsert: {
            args: Prisma.mechanicsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$mechanicsPayload>
          }
          aggregate: {
            args: Prisma.MechanicsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMechanics>
          }
          groupBy: {
            args: Prisma.mechanicsGroupByArgs<ExtArgs>
            result: $Utils.Optional<MechanicsGroupByOutputType>[]
          }
          count: {
            args: Prisma.mechanicsCountArgs<ExtArgs>
            result: $Utils.Optional<MechanicsCountAggregateOutputType> | number
          }
        }
      }
      themes: {
        payload: Prisma.$themesPayload<ExtArgs>
        fields: Prisma.themesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.themesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$themesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.themesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$themesPayload>
          }
          findFirst: {
            args: Prisma.themesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$themesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.themesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$themesPayload>
          }
          findMany: {
            args: Prisma.themesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$themesPayload>[]
          }
          create: {
            args: Prisma.themesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$themesPayload>
          }
          createMany: {
            args: Prisma.themesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.themesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$themesPayload>[]
          }
          delete: {
            args: Prisma.themesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$themesPayload>
          }
          update: {
            args: Prisma.themesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$themesPayload>
          }
          deleteMany: {
            args: Prisma.themesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.themesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.themesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$themesPayload>[]
          }
          upsert: {
            args: Prisma.themesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$themesPayload>
          }
          aggregate: {
            args: Prisma.ThemesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateThemes>
          }
          groupBy: {
            args: Prisma.themesGroupByArgs<ExtArgs>
            result: $Utils.Optional<ThemesGroupByOutputType>[]
          }
          count: {
            args: Prisma.themesCountArgs<ExtArgs>
            result: $Utils.Optional<ThemesCountAggregateOutputType> | number
          }
        }
      }
      slot_categories: {
        payload: Prisma.$slot_categoriesPayload<ExtArgs>
        fields: Prisma.slot_categoriesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.slot_categoriesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_categoriesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.slot_categoriesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_categoriesPayload>
          }
          findFirst: {
            args: Prisma.slot_categoriesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_categoriesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.slot_categoriesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_categoriesPayload>
          }
          findMany: {
            args: Prisma.slot_categoriesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_categoriesPayload>[]
          }
          create: {
            args: Prisma.slot_categoriesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_categoriesPayload>
          }
          createMany: {
            args: Prisma.slot_categoriesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.slot_categoriesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_categoriesPayload>[]
          }
          delete: {
            args: Prisma.slot_categoriesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_categoriesPayload>
          }
          update: {
            args: Prisma.slot_categoriesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_categoriesPayload>
          }
          deleteMany: {
            args: Prisma.slot_categoriesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.slot_categoriesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.slot_categoriesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_categoriesPayload>[]
          }
          upsert: {
            args: Prisma.slot_categoriesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_categoriesPayload>
          }
          aggregate: {
            args: Prisma.Slot_categoriesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSlot_categories>
          }
          groupBy: {
            args: Prisma.slot_categoriesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Slot_categoriesGroupByOutputType>[]
          }
          count: {
            args: Prisma.slot_categoriesCountArgs<ExtArgs>
            result: $Utils.Optional<Slot_categoriesCountAggregateOutputType> | number
          }
        }
      }
      slots: {
        payload: Prisma.$slotsPayload<ExtArgs>
        fields: Prisma.slotsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.slotsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slotsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.slotsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slotsPayload>
          }
          findFirst: {
            args: Prisma.slotsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slotsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.slotsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slotsPayload>
          }
          findMany: {
            args: Prisma.slotsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slotsPayload>[]
          }
          create: {
            args: Prisma.slotsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slotsPayload>
          }
          createMany: {
            args: Prisma.slotsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.slotsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slotsPayload>[]
          }
          delete: {
            args: Prisma.slotsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slotsPayload>
          }
          update: {
            args: Prisma.slotsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slotsPayload>
          }
          deleteMany: {
            args: Prisma.slotsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.slotsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.slotsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slotsPayload>[]
          }
          upsert: {
            args: Prisma.slotsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slotsPayload>
          }
          aggregate: {
            args: Prisma.SlotsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSlots>
          }
          groupBy: {
            args: Prisma.slotsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SlotsGroupByOutputType>[]
          }
          count: {
            args: Prisma.slotsCountArgs<ExtArgs>
            result: $Utils.Optional<SlotsCountAggregateOutputType> | number
          }
        }
      }
      slot_mechanics: {
        payload: Prisma.$slot_mechanicsPayload<ExtArgs>
        fields: Prisma.slot_mechanicsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.slot_mechanicsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_mechanicsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.slot_mechanicsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_mechanicsPayload>
          }
          findFirst: {
            args: Prisma.slot_mechanicsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_mechanicsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.slot_mechanicsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_mechanicsPayload>
          }
          findMany: {
            args: Prisma.slot_mechanicsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_mechanicsPayload>[]
          }
          create: {
            args: Prisma.slot_mechanicsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_mechanicsPayload>
          }
          createMany: {
            args: Prisma.slot_mechanicsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.slot_mechanicsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_mechanicsPayload>[]
          }
          delete: {
            args: Prisma.slot_mechanicsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_mechanicsPayload>
          }
          update: {
            args: Prisma.slot_mechanicsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_mechanicsPayload>
          }
          deleteMany: {
            args: Prisma.slot_mechanicsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.slot_mechanicsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.slot_mechanicsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_mechanicsPayload>[]
          }
          upsert: {
            args: Prisma.slot_mechanicsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$slot_mechanicsPayload>
          }
          aggregate: {
            args: Prisma.Slot_mechanicsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSlot_mechanics>
          }
          groupBy: {
            args: Prisma.slot_mechanicsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Slot_mechanicsGroupByOutputType>[]
          }
          count: {
            args: Prisma.slot_mechanicsCountArgs<ExtArgs>
            result: $Utils.Optional<Slot_mechanicsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    providers?: providersOmit
    mechanics?: mechanicsOmit
    themes?: themesOmit
    slot_categories?: slot_categoriesOmit
    slots?: slotsOmit
    slot_mechanics?: slot_mechanicsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProvidersCountOutputType
   */

  export type ProvidersCountOutputType = {
    slots: number
  }

  export type ProvidersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slots?: boolean | ProvidersCountOutputTypeCountSlotsArgs
  }

  // Custom InputTypes
  /**
   * ProvidersCountOutputType without action
   */
  export type ProvidersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProvidersCountOutputType
     */
    select?: ProvidersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProvidersCountOutputType without action
   */
  export type ProvidersCountOutputTypeCountSlotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: slotsWhereInput
  }


  /**
   * Count Type MechanicsCountOutputType
   */

  export type MechanicsCountOutputType = {
    slot_mechanics: number
  }

  export type MechanicsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slot_mechanics?: boolean | MechanicsCountOutputTypeCountSlot_mechanicsArgs
  }

  // Custom InputTypes
  /**
   * MechanicsCountOutputType without action
   */
  export type MechanicsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MechanicsCountOutputType
     */
    select?: MechanicsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MechanicsCountOutputType without action
   */
  export type MechanicsCountOutputTypeCountSlot_mechanicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: slot_mechanicsWhereInput
  }


  /**
   * Count Type ThemesCountOutputType
   */

  export type ThemesCountOutputType = {
    slots: number
  }

  export type ThemesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slots?: boolean | ThemesCountOutputTypeCountSlotsArgs
  }

  // Custom InputTypes
  /**
   * ThemesCountOutputType without action
   */
  export type ThemesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ThemesCountOutputType
     */
    select?: ThemesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ThemesCountOutputType without action
   */
  export type ThemesCountOutputTypeCountSlotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: slotsWhereInput
  }


  /**
   * Count Type Slot_categoriesCountOutputType
   */

  export type Slot_categoriesCountOutputType = {
    slots: number
  }

  export type Slot_categoriesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slots?: boolean | Slot_categoriesCountOutputTypeCountSlotsArgs
  }

  // Custom InputTypes
  /**
   * Slot_categoriesCountOutputType without action
   */
  export type Slot_categoriesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot_categoriesCountOutputType
     */
    select?: Slot_categoriesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Slot_categoriesCountOutputType without action
   */
  export type Slot_categoriesCountOutputTypeCountSlotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: slotsWhereInput
  }


  /**
   * Count Type SlotsCountOutputType
   */

  export type SlotsCountOutputType = {
    slot_mechanics: number
  }

  export type SlotsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slot_mechanics?: boolean | SlotsCountOutputTypeCountSlot_mechanicsArgs
  }

  // Custom InputTypes
  /**
   * SlotsCountOutputType without action
   */
  export type SlotsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SlotsCountOutputType
     */
    select?: SlotsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SlotsCountOutputType without action
   */
  export type SlotsCountOutputTypeCountSlot_mechanicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: slot_mechanicsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model providers
   */

  export type AggregateProviders = {
    _count: ProvidersCountAggregateOutputType | null
    _avg: ProvidersAvgAggregateOutputType | null
    _sum: ProvidersSumAggregateOutputType | null
    _min: ProvidersMinAggregateOutputType | null
    _max: ProvidersMaxAggregateOutputType | null
  }

  export type ProvidersAvgAggregateOutputType = {
    founded_year: number | null
  }

  export type ProvidersSumAggregateOutputType = {
    founded_year: number | null
  }

  export type ProvidersMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    logo_url: string | null
    website_url: string | null
    founded_year: number | null
    country: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
    is_recommended: boolean | null
  }

  export type ProvidersMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    logo_url: string | null
    website_url: string | null
    founded_year: number | null
    country: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
    is_recommended: boolean | null
  }

  export type ProvidersCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    logo_url: number
    website_url: number
    founded_year: number
    country: number
    is_active: number
    created_at: number
    updated_at: number
    is_recommended: number
    _all: number
  }


  export type ProvidersAvgAggregateInputType = {
    founded_year?: true
  }

  export type ProvidersSumAggregateInputType = {
    founded_year?: true
  }

  export type ProvidersMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    logo_url?: true
    website_url?: true
    founded_year?: true
    country?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    is_recommended?: true
  }

  export type ProvidersMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    logo_url?: true
    website_url?: true
    founded_year?: true
    country?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    is_recommended?: true
  }

  export type ProvidersCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    logo_url?: true
    website_url?: true
    founded_year?: true
    country?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    is_recommended?: true
    _all?: true
  }

  export type ProvidersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which providers to aggregate.
     */
    where?: providersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of providers to fetch.
     */
    orderBy?: providersOrderByWithRelationInput | providersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: providersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned providers
    **/
    _count?: true | ProvidersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProvidersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProvidersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProvidersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProvidersMaxAggregateInputType
  }

  export type GetProvidersAggregateType<T extends ProvidersAggregateArgs> = {
        [P in keyof T & keyof AggregateProviders]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProviders[P]>
      : GetScalarType<T[P], AggregateProviders[P]>
  }




  export type providersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: providersWhereInput
    orderBy?: providersOrderByWithAggregationInput | providersOrderByWithAggregationInput[]
    by: ProvidersScalarFieldEnum[] | ProvidersScalarFieldEnum
    having?: providersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProvidersCountAggregateInputType | true
    _avg?: ProvidersAvgAggregateInputType
    _sum?: ProvidersSumAggregateInputType
    _min?: ProvidersMinAggregateInputType
    _max?: ProvidersMaxAggregateInputType
  }

  export type ProvidersGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string | null
    logo_url: string | null
    website_url: string | null
    founded_year: number | null
    country: string | null
    is_active: boolean
    created_at: Date
    updated_at: Date
    is_recommended: boolean
    _count: ProvidersCountAggregateOutputType | null
    _avg: ProvidersAvgAggregateOutputType | null
    _sum: ProvidersSumAggregateOutputType | null
    _min: ProvidersMinAggregateOutputType | null
    _max: ProvidersMaxAggregateOutputType | null
  }

  type GetProvidersGroupByPayload<T extends providersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProvidersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProvidersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProvidersGroupByOutputType[P]>
            : GetScalarType<T[P], ProvidersGroupByOutputType[P]>
        }
      >
    >


  export type providersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    logo_url?: boolean
    website_url?: boolean
    founded_year?: boolean
    country?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_recommended?: boolean
    slots?: boolean | providers$slotsArgs<ExtArgs>
    _count?: boolean | ProvidersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["providers"]>

  export type providersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    logo_url?: boolean
    website_url?: boolean
    founded_year?: boolean
    country?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_recommended?: boolean
  }, ExtArgs["result"]["providers"]>

  export type providersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    logo_url?: boolean
    website_url?: boolean
    founded_year?: boolean
    country?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_recommended?: boolean
  }, ExtArgs["result"]["providers"]>

  export type providersSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    logo_url?: boolean
    website_url?: boolean
    founded_year?: boolean
    country?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_recommended?: boolean
  }

  export type providersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "description" | "logo_url" | "website_url" | "founded_year" | "country" | "is_active" | "created_at" | "updated_at" | "is_recommended", ExtArgs["result"]["providers"]>
  export type providersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slots?: boolean | providers$slotsArgs<ExtArgs>
    _count?: boolean | ProvidersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type providersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type providersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $providersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "providers"
    objects: {
      slots: Prisma.$slotsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string | null
      logo_url: string | null
      website_url: string | null
      founded_year: number | null
      country: string | null
      is_active: boolean
      created_at: Date
      updated_at: Date
      is_recommended: boolean
    }, ExtArgs["result"]["providers"]>
    composites: {}
  }

  type providersGetPayload<S extends boolean | null | undefined | providersDefaultArgs> = $Result.GetResult<Prisma.$providersPayload, S>

  type providersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<providersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProvidersCountAggregateInputType | true
    }

  export interface providersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['providers'], meta: { name: 'providers' } }
    /**
     * Find zero or one Providers that matches the filter.
     * @param {providersFindUniqueArgs} args - Arguments to find a Providers
     * @example
     * // Get one Providers
     * const providers = await prisma.providers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends providersFindUniqueArgs>(args: SelectSubset<T, providersFindUniqueArgs<ExtArgs>>): Prisma__providersClient<$Result.GetResult<Prisma.$providersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Providers that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {providersFindUniqueOrThrowArgs} args - Arguments to find a Providers
     * @example
     * // Get one Providers
     * const providers = await prisma.providers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends providersFindUniqueOrThrowArgs>(args: SelectSubset<T, providersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__providersClient<$Result.GetResult<Prisma.$providersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Providers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {providersFindFirstArgs} args - Arguments to find a Providers
     * @example
     * // Get one Providers
     * const providers = await prisma.providers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends providersFindFirstArgs>(args?: SelectSubset<T, providersFindFirstArgs<ExtArgs>>): Prisma__providersClient<$Result.GetResult<Prisma.$providersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Providers that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {providersFindFirstOrThrowArgs} args - Arguments to find a Providers
     * @example
     * // Get one Providers
     * const providers = await prisma.providers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends providersFindFirstOrThrowArgs>(args?: SelectSubset<T, providersFindFirstOrThrowArgs<ExtArgs>>): Prisma__providersClient<$Result.GetResult<Prisma.$providersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Providers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {providersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Providers
     * const providers = await prisma.providers.findMany()
     * 
     * // Get first 10 Providers
     * const providers = await prisma.providers.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const providersWithIdOnly = await prisma.providers.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends providersFindManyArgs>(args?: SelectSubset<T, providersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$providersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Providers.
     * @param {providersCreateArgs} args - Arguments to create a Providers.
     * @example
     * // Create one Providers
     * const Providers = await prisma.providers.create({
     *   data: {
     *     // ... data to create a Providers
     *   }
     * })
     * 
     */
    create<T extends providersCreateArgs>(args: SelectSubset<T, providersCreateArgs<ExtArgs>>): Prisma__providersClient<$Result.GetResult<Prisma.$providersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Providers.
     * @param {providersCreateManyArgs} args - Arguments to create many Providers.
     * @example
     * // Create many Providers
     * const providers = await prisma.providers.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends providersCreateManyArgs>(args?: SelectSubset<T, providersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Providers and returns the data saved in the database.
     * @param {providersCreateManyAndReturnArgs} args - Arguments to create many Providers.
     * @example
     * // Create many Providers
     * const providers = await prisma.providers.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Providers and only return the `id`
     * const providersWithIdOnly = await prisma.providers.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends providersCreateManyAndReturnArgs>(args?: SelectSubset<T, providersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$providersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Providers.
     * @param {providersDeleteArgs} args - Arguments to delete one Providers.
     * @example
     * // Delete one Providers
     * const Providers = await prisma.providers.delete({
     *   where: {
     *     // ... filter to delete one Providers
     *   }
     * })
     * 
     */
    delete<T extends providersDeleteArgs>(args: SelectSubset<T, providersDeleteArgs<ExtArgs>>): Prisma__providersClient<$Result.GetResult<Prisma.$providersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Providers.
     * @param {providersUpdateArgs} args - Arguments to update one Providers.
     * @example
     * // Update one Providers
     * const providers = await prisma.providers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends providersUpdateArgs>(args: SelectSubset<T, providersUpdateArgs<ExtArgs>>): Prisma__providersClient<$Result.GetResult<Prisma.$providersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Providers.
     * @param {providersDeleteManyArgs} args - Arguments to filter Providers to delete.
     * @example
     * // Delete a few Providers
     * const { count } = await prisma.providers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends providersDeleteManyArgs>(args?: SelectSubset<T, providersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {providersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Providers
     * const providers = await prisma.providers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends providersUpdateManyArgs>(args: SelectSubset<T, providersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Providers and returns the data updated in the database.
     * @param {providersUpdateManyAndReturnArgs} args - Arguments to update many Providers.
     * @example
     * // Update many Providers
     * const providers = await prisma.providers.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Providers and only return the `id`
     * const providersWithIdOnly = await prisma.providers.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends providersUpdateManyAndReturnArgs>(args: SelectSubset<T, providersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$providersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Providers.
     * @param {providersUpsertArgs} args - Arguments to update or create a Providers.
     * @example
     * // Update or create a Providers
     * const providers = await prisma.providers.upsert({
     *   create: {
     *     // ... data to create a Providers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Providers we want to update
     *   }
     * })
     */
    upsert<T extends providersUpsertArgs>(args: SelectSubset<T, providersUpsertArgs<ExtArgs>>): Prisma__providersClient<$Result.GetResult<Prisma.$providersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {providersCountArgs} args - Arguments to filter Providers to count.
     * @example
     * // Count the number of Providers
     * const count = await prisma.providers.count({
     *   where: {
     *     // ... the filter for the Providers we want to count
     *   }
     * })
    **/
    count<T extends providersCountArgs>(
      args?: Subset<T, providersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProvidersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProvidersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProvidersAggregateArgs>(args: Subset<T, ProvidersAggregateArgs>): Prisma.PrismaPromise<GetProvidersAggregateType<T>>

    /**
     * Group by Providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {providersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends providersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: providersGroupByArgs['orderBy'] }
        : { orderBy?: providersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, providersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProvidersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the providers model
   */
  readonly fields: providersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for providers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__providersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    slots<T extends providers$slotsArgs<ExtArgs> = {}>(args?: Subset<T, providers$slotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$slotsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the providers model
   */
  interface providersFieldRefs {
    readonly id: FieldRef<"providers", 'String'>
    readonly name: FieldRef<"providers", 'String'>
    readonly slug: FieldRef<"providers", 'String'>
    readonly description: FieldRef<"providers", 'String'>
    readonly logo_url: FieldRef<"providers", 'String'>
    readonly website_url: FieldRef<"providers", 'String'>
    readonly founded_year: FieldRef<"providers", 'Int'>
    readonly country: FieldRef<"providers", 'String'>
    readonly is_active: FieldRef<"providers", 'Boolean'>
    readonly created_at: FieldRef<"providers", 'DateTime'>
    readonly updated_at: FieldRef<"providers", 'DateTime'>
    readonly is_recommended: FieldRef<"providers", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * providers findUnique
   */
  export type providersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the providers
     */
    select?: providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the providers
     */
    omit?: providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: providersInclude<ExtArgs> | null
    /**
     * Filter, which providers to fetch.
     */
    where: providersWhereUniqueInput
  }

  /**
   * providers findUniqueOrThrow
   */
  export type providersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the providers
     */
    select?: providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the providers
     */
    omit?: providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: providersInclude<ExtArgs> | null
    /**
     * Filter, which providers to fetch.
     */
    where: providersWhereUniqueInput
  }

  /**
   * providers findFirst
   */
  export type providersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the providers
     */
    select?: providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the providers
     */
    omit?: providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: providersInclude<ExtArgs> | null
    /**
     * Filter, which providers to fetch.
     */
    where?: providersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of providers to fetch.
     */
    orderBy?: providersOrderByWithRelationInput | providersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for providers.
     */
    cursor?: providersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of providers.
     */
    distinct?: ProvidersScalarFieldEnum | ProvidersScalarFieldEnum[]
  }

  /**
   * providers findFirstOrThrow
   */
  export type providersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the providers
     */
    select?: providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the providers
     */
    omit?: providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: providersInclude<ExtArgs> | null
    /**
     * Filter, which providers to fetch.
     */
    where?: providersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of providers to fetch.
     */
    orderBy?: providersOrderByWithRelationInput | providersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for providers.
     */
    cursor?: providersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of providers.
     */
    distinct?: ProvidersScalarFieldEnum | ProvidersScalarFieldEnum[]
  }

  /**
   * providers findMany
   */
  export type providersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the providers
     */
    select?: providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the providers
     */
    omit?: providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: providersInclude<ExtArgs> | null
    /**
     * Filter, which providers to fetch.
     */
    where?: providersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of providers to fetch.
     */
    orderBy?: providersOrderByWithRelationInput | providersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing providers.
     */
    cursor?: providersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` providers.
     */
    skip?: number
    distinct?: ProvidersScalarFieldEnum | ProvidersScalarFieldEnum[]
  }

  /**
   * providers create
   */
  export type providersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the providers
     */
    select?: providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the providers
     */
    omit?: providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: providersInclude<ExtArgs> | null
    /**
     * The data needed to create a providers.
     */
    data: XOR<providersCreateInput, providersUncheckedCreateInput>
  }

  /**
   * providers createMany
   */
  export type providersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many providers.
     */
    data: providersCreateManyInput | providersCreateManyInput[]
  }

  /**
   * providers createManyAndReturn
   */
  export type providersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the providers
     */
    select?: providersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the providers
     */
    omit?: providersOmit<ExtArgs> | null
    /**
     * The data used to create many providers.
     */
    data: providersCreateManyInput | providersCreateManyInput[]
  }

  /**
   * providers update
   */
  export type providersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the providers
     */
    select?: providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the providers
     */
    omit?: providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: providersInclude<ExtArgs> | null
    /**
     * The data needed to update a providers.
     */
    data: XOR<providersUpdateInput, providersUncheckedUpdateInput>
    /**
     * Choose, which providers to update.
     */
    where: providersWhereUniqueInput
  }

  /**
   * providers updateMany
   */
  export type providersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update providers.
     */
    data: XOR<providersUpdateManyMutationInput, providersUncheckedUpdateManyInput>
    /**
     * Filter which providers to update
     */
    where?: providersWhereInput
    /**
     * Limit how many providers to update.
     */
    limit?: number
  }

  /**
   * providers updateManyAndReturn
   */
  export type providersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the providers
     */
    select?: providersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the providers
     */
    omit?: providersOmit<ExtArgs> | null
    /**
     * The data used to update providers.
     */
    data: XOR<providersUpdateManyMutationInput, providersUncheckedUpdateManyInput>
    /**
     * Filter which providers to update
     */
    where?: providersWhereInput
    /**
     * Limit how many providers to update.
     */
    limit?: number
  }

  /**
   * providers upsert
   */
  export type providersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the providers
     */
    select?: providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the providers
     */
    omit?: providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: providersInclude<ExtArgs> | null
    /**
     * The filter to search for the providers to update in case it exists.
     */
    where: providersWhereUniqueInput
    /**
     * In case the providers found by the `where` argument doesn't exist, create a new providers with this data.
     */
    create: XOR<providersCreateInput, providersUncheckedCreateInput>
    /**
     * In case the providers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<providersUpdateInput, providersUncheckedUpdateInput>
  }

  /**
   * providers delete
   */
  export type providersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the providers
     */
    select?: providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the providers
     */
    omit?: providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: providersInclude<ExtArgs> | null
    /**
     * Filter which providers to delete.
     */
    where: providersWhereUniqueInput
  }

  /**
   * providers deleteMany
   */
  export type providersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which providers to delete
     */
    where?: providersWhereInput
    /**
     * Limit how many providers to delete.
     */
    limit?: number
  }

  /**
   * providers.slots
   */
  export type providers$slotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slots
     */
    select?: slotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slots
     */
    omit?: slotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slotsInclude<ExtArgs> | null
    where?: slotsWhereInput
    orderBy?: slotsOrderByWithRelationInput | slotsOrderByWithRelationInput[]
    cursor?: slotsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SlotsScalarFieldEnum | SlotsScalarFieldEnum[]
  }

  /**
   * providers without action
   */
  export type providersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the providers
     */
    select?: providersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the providers
     */
    omit?: providersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: providersInclude<ExtArgs> | null
  }


  /**
   * Model mechanics
   */

  export type AggregateMechanics = {
    _count: MechanicsCountAggregateOutputType | null
    _min: MechanicsMinAggregateOutputType | null
    _max: MechanicsMaxAggregateOutputType | null
  }

  export type MechanicsMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MechanicsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type MechanicsCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type MechanicsMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type MechanicsMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type MechanicsCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type MechanicsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which mechanics to aggregate.
     */
    where?: mechanicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mechanics to fetch.
     */
    orderBy?: mechanicsOrderByWithRelationInput | mechanicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: mechanicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mechanics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mechanics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned mechanics
    **/
    _count?: true | MechanicsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MechanicsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MechanicsMaxAggregateInputType
  }

  export type GetMechanicsAggregateType<T extends MechanicsAggregateArgs> = {
        [P in keyof T & keyof AggregateMechanics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMechanics[P]>
      : GetScalarType<T[P], AggregateMechanics[P]>
  }




  export type mechanicsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: mechanicsWhereInput
    orderBy?: mechanicsOrderByWithAggregationInput | mechanicsOrderByWithAggregationInput[]
    by: MechanicsScalarFieldEnum[] | MechanicsScalarFieldEnum
    having?: mechanicsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MechanicsCountAggregateInputType | true
    _min?: MechanicsMinAggregateInputType
    _max?: MechanicsMaxAggregateInputType
  }

  export type MechanicsGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string | null
    created_at: Date
    updated_at: Date
    _count: MechanicsCountAggregateOutputType | null
    _min: MechanicsMinAggregateOutputType | null
    _max: MechanicsMaxAggregateOutputType | null
  }

  type GetMechanicsGroupByPayload<T extends mechanicsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MechanicsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MechanicsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MechanicsGroupByOutputType[P]>
            : GetScalarType<T[P], MechanicsGroupByOutputType[P]>
        }
      >
    >


  export type mechanicsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    slot_mechanics?: boolean | mechanics$slot_mechanicsArgs<ExtArgs>
    _count?: boolean | MechanicsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mechanics"]>

  export type mechanicsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["mechanics"]>

  export type mechanicsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["mechanics"]>

  export type mechanicsSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type mechanicsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "description" | "created_at" | "updated_at", ExtArgs["result"]["mechanics"]>
  export type mechanicsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slot_mechanics?: boolean | mechanics$slot_mechanicsArgs<ExtArgs>
    _count?: boolean | MechanicsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type mechanicsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type mechanicsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $mechanicsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "mechanics"
    objects: {
      slot_mechanics: Prisma.$slot_mechanicsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["mechanics"]>
    composites: {}
  }

  type mechanicsGetPayload<S extends boolean | null | undefined | mechanicsDefaultArgs> = $Result.GetResult<Prisma.$mechanicsPayload, S>

  type mechanicsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<mechanicsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MechanicsCountAggregateInputType | true
    }

  export interface mechanicsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['mechanics'], meta: { name: 'mechanics' } }
    /**
     * Find zero or one Mechanics that matches the filter.
     * @param {mechanicsFindUniqueArgs} args - Arguments to find a Mechanics
     * @example
     * // Get one Mechanics
     * const mechanics = await prisma.mechanics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends mechanicsFindUniqueArgs>(args: SelectSubset<T, mechanicsFindUniqueArgs<ExtArgs>>): Prisma__mechanicsClient<$Result.GetResult<Prisma.$mechanicsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mechanics that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {mechanicsFindUniqueOrThrowArgs} args - Arguments to find a Mechanics
     * @example
     * // Get one Mechanics
     * const mechanics = await prisma.mechanics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends mechanicsFindUniqueOrThrowArgs>(args: SelectSubset<T, mechanicsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__mechanicsClient<$Result.GetResult<Prisma.$mechanicsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mechanics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mechanicsFindFirstArgs} args - Arguments to find a Mechanics
     * @example
     * // Get one Mechanics
     * const mechanics = await prisma.mechanics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends mechanicsFindFirstArgs>(args?: SelectSubset<T, mechanicsFindFirstArgs<ExtArgs>>): Prisma__mechanicsClient<$Result.GetResult<Prisma.$mechanicsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mechanics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mechanicsFindFirstOrThrowArgs} args - Arguments to find a Mechanics
     * @example
     * // Get one Mechanics
     * const mechanics = await prisma.mechanics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends mechanicsFindFirstOrThrowArgs>(args?: SelectSubset<T, mechanicsFindFirstOrThrowArgs<ExtArgs>>): Prisma__mechanicsClient<$Result.GetResult<Prisma.$mechanicsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mechanics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mechanicsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mechanics
     * const mechanics = await prisma.mechanics.findMany()
     * 
     * // Get first 10 Mechanics
     * const mechanics = await prisma.mechanics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mechanicsWithIdOnly = await prisma.mechanics.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends mechanicsFindManyArgs>(args?: SelectSubset<T, mechanicsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mechanicsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mechanics.
     * @param {mechanicsCreateArgs} args - Arguments to create a Mechanics.
     * @example
     * // Create one Mechanics
     * const Mechanics = await prisma.mechanics.create({
     *   data: {
     *     // ... data to create a Mechanics
     *   }
     * })
     * 
     */
    create<T extends mechanicsCreateArgs>(args: SelectSubset<T, mechanicsCreateArgs<ExtArgs>>): Prisma__mechanicsClient<$Result.GetResult<Prisma.$mechanicsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mechanics.
     * @param {mechanicsCreateManyArgs} args - Arguments to create many Mechanics.
     * @example
     * // Create many Mechanics
     * const mechanics = await prisma.mechanics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends mechanicsCreateManyArgs>(args?: SelectSubset<T, mechanicsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Mechanics and returns the data saved in the database.
     * @param {mechanicsCreateManyAndReturnArgs} args - Arguments to create many Mechanics.
     * @example
     * // Create many Mechanics
     * const mechanics = await prisma.mechanics.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Mechanics and only return the `id`
     * const mechanicsWithIdOnly = await prisma.mechanics.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends mechanicsCreateManyAndReturnArgs>(args?: SelectSubset<T, mechanicsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mechanicsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mechanics.
     * @param {mechanicsDeleteArgs} args - Arguments to delete one Mechanics.
     * @example
     * // Delete one Mechanics
     * const Mechanics = await prisma.mechanics.delete({
     *   where: {
     *     // ... filter to delete one Mechanics
     *   }
     * })
     * 
     */
    delete<T extends mechanicsDeleteArgs>(args: SelectSubset<T, mechanicsDeleteArgs<ExtArgs>>): Prisma__mechanicsClient<$Result.GetResult<Prisma.$mechanicsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mechanics.
     * @param {mechanicsUpdateArgs} args - Arguments to update one Mechanics.
     * @example
     * // Update one Mechanics
     * const mechanics = await prisma.mechanics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends mechanicsUpdateArgs>(args: SelectSubset<T, mechanicsUpdateArgs<ExtArgs>>): Prisma__mechanicsClient<$Result.GetResult<Prisma.$mechanicsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mechanics.
     * @param {mechanicsDeleteManyArgs} args - Arguments to filter Mechanics to delete.
     * @example
     * // Delete a few Mechanics
     * const { count } = await prisma.mechanics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends mechanicsDeleteManyArgs>(args?: SelectSubset<T, mechanicsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mechanics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mechanicsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mechanics
     * const mechanics = await prisma.mechanics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends mechanicsUpdateManyArgs>(args: SelectSubset<T, mechanicsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mechanics and returns the data updated in the database.
     * @param {mechanicsUpdateManyAndReturnArgs} args - Arguments to update many Mechanics.
     * @example
     * // Update many Mechanics
     * const mechanics = await prisma.mechanics.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Mechanics and only return the `id`
     * const mechanicsWithIdOnly = await prisma.mechanics.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends mechanicsUpdateManyAndReturnArgs>(args: SelectSubset<T, mechanicsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$mechanicsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mechanics.
     * @param {mechanicsUpsertArgs} args - Arguments to update or create a Mechanics.
     * @example
     * // Update or create a Mechanics
     * const mechanics = await prisma.mechanics.upsert({
     *   create: {
     *     // ... data to create a Mechanics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mechanics we want to update
     *   }
     * })
     */
    upsert<T extends mechanicsUpsertArgs>(args: SelectSubset<T, mechanicsUpsertArgs<ExtArgs>>): Prisma__mechanicsClient<$Result.GetResult<Prisma.$mechanicsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Mechanics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mechanicsCountArgs} args - Arguments to filter Mechanics to count.
     * @example
     * // Count the number of Mechanics
     * const count = await prisma.mechanics.count({
     *   where: {
     *     // ... the filter for the Mechanics we want to count
     *   }
     * })
    **/
    count<T extends mechanicsCountArgs>(
      args?: Subset<T, mechanicsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MechanicsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mechanics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MechanicsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MechanicsAggregateArgs>(args: Subset<T, MechanicsAggregateArgs>): Prisma.PrismaPromise<GetMechanicsAggregateType<T>>

    /**
     * Group by Mechanics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mechanicsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends mechanicsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: mechanicsGroupByArgs['orderBy'] }
        : { orderBy?: mechanicsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, mechanicsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMechanicsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the mechanics model
   */
  readonly fields: mechanicsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for mechanics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__mechanicsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    slot_mechanics<T extends mechanics$slot_mechanicsArgs<ExtArgs> = {}>(args?: Subset<T, mechanics$slot_mechanicsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$slot_mechanicsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the mechanics model
   */
  interface mechanicsFieldRefs {
    readonly id: FieldRef<"mechanics", 'String'>
    readonly name: FieldRef<"mechanics", 'String'>
    readonly slug: FieldRef<"mechanics", 'String'>
    readonly description: FieldRef<"mechanics", 'String'>
    readonly created_at: FieldRef<"mechanics", 'DateTime'>
    readonly updated_at: FieldRef<"mechanics", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * mechanics findUnique
   */
  export type mechanicsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mechanics
     */
    select?: mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mechanics
     */
    omit?: mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mechanicsInclude<ExtArgs> | null
    /**
     * Filter, which mechanics to fetch.
     */
    where: mechanicsWhereUniqueInput
  }

  /**
   * mechanics findUniqueOrThrow
   */
  export type mechanicsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mechanics
     */
    select?: mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mechanics
     */
    omit?: mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mechanicsInclude<ExtArgs> | null
    /**
     * Filter, which mechanics to fetch.
     */
    where: mechanicsWhereUniqueInput
  }

  /**
   * mechanics findFirst
   */
  export type mechanicsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mechanics
     */
    select?: mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mechanics
     */
    omit?: mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mechanicsInclude<ExtArgs> | null
    /**
     * Filter, which mechanics to fetch.
     */
    where?: mechanicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mechanics to fetch.
     */
    orderBy?: mechanicsOrderByWithRelationInput | mechanicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for mechanics.
     */
    cursor?: mechanicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mechanics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mechanics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of mechanics.
     */
    distinct?: MechanicsScalarFieldEnum | MechanicsScalarFieldEnum[]
  }

  /**
   * mechanics findFirstOrThrow
   */
  export type mechanicsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mechanics
     */
    select?: mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mechanics
     */
    omit?: mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mechanicsInclude<ExtArgs> | null
    /**
     * Filter, which mechanics to fetch.
     */
    where?: mechanicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mechanics to fetch.
     */
    orderBy?: mechanicsOrderByWithRelationInput | mechanicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for mechanics.
     */
    cursor?: mechanicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mechanics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mechanics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of mechanics.
     */
    distinct?: MechanicsScalarFieldEnum | MechanicsScalarFieldEnum[]
  }

  /**
   * mechanics findMany
   */
  export type mechanicsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mechanics
     */
    select?: mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mechanics
     */
    omit?: mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mechanicsInclude<ExtArgs> | null
    /**
     * Filter, which mechanics to fetch.
     */
    where?: mechanicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mechanics to fetch.
     */
    orderBy?: mechanicsOrderByWithRelationInput | mechanicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing mechanics.
     */
    cursor?: mechanicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mechanics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mechanics.
     */
    skip?: number
    distinct?: MechanicsScalarFieldEnum | MechanicsScalarFieldEnum[]
  }

  /**
   * mechanics create
   */
  export type mechanicsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mechanics
     */
    select?: mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mechanics
     */
    omit?: mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mechanicsInclude<ExtArgs> | null
    /**
     * The data needed to create a mechanics.
     */
    data: XOR<mechanicsCreateInput, mechanicsUncheckedCreateInput>
  }

  /**
   * mechanics createMany
   */
  export type mechanicsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many mechanics.
     */
    data: mechanicsCreateManyInput | mechanicsCreateManyInput[]
  }

  /**
   * mechanics createManyAndReturn
   */
  export type mechanicsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mechanics
     */
    select?: mechanicsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the mechanics
     */
    omit?: mechanicsOmit<ExtArgs> | null
    /**
     * The data used to create many mechanics.
     */
    data: mechanicsCreateManyInput | mechanicsCreateManyInput[]
  }

  /**
   * mechanics update
   */
  export type mechanicsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mechanics
     */
    select?: mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mechanics
     */
    omit?: mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mechanicsInclude<ExtArgs> | null
    /**
     * The data needed to update a mechanics.
     */
    data: XOR<mechanicsUpdateInput, mechanicsUncheckedUpdateInput>
    /**
     * Choose, which mechanics to update.
     */
    where: mechanicsWhereUniqueInput
  }

  /**
   * mechanics updateMany
   */
  export type mechanicsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update mechanics.
     */
    data: XOR<mechanicsUpdateManyMutationInput, mechanicsUncheckedUpdateManyInput>
    /**
     * Filter which mechanics to update
     */
    where?: mechanicsWhereInput
    /**
     * Limit how many mechanics to update.
     */
    limit?: number
  }

  /**
   * mechanics updateManyAndReturn
   */
  export type mechanicsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mechanics
     */
    select?: mechanicsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the mechanics
     */
    omit?: mechanicsOmit<ExtArgs> | null
    /**
     * The data used to update mechanics.
     */
    data: XOR<mechanicsUpdateManyMutationInput, mechanicsUncheckedUpdateManyInput>
    /**
     * Filter which mechanics to update
     */
    where?: mechanicsWhereInput
    /**
     * Limit how many mechanics to update.
     */
    limit?: number
  }

  /**
   * mechanics upsert
   */
  export type mechanicsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mechanics
     */
    select?: mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mechanics
     */
    omit?: mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mechanicsInclude<ExtArgs> | null
    /**
     * The filter to search for the mechanics to update in case it exists.
     */
    where: mechanicsWhereUniqueInput
    /**
     * In case the mechanics found by the `where` argument doesn't exist, create a new mechanics with this data.
     */
    create: XOR<mechanicsCreateInput, mechanicsUncheckedCreateInput>
    /**
     * In case the mechanics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<mechanicsUpdateInput, mechanicsUncheckedUpdateInput>
  }

  /**
   * mechanics delete
   */
  export type mechanicsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mechanics
     */
    select?: mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mechanics
     */
    omit?: mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mechanicsInclude<ExtArgs> | null
    /**
     * Filter which mechanics to delete.
     */
    where: mechanicsWhereUniqueInput
  }

  /**
   * mechanics deleteMany
   */
  export type mechanicsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which mechanics to delete
     */
    where?: mechanicsWhereInput
    /**
     * Limit how many mechanics to delete.
     */
    limit?: number
  }

  /**
   * mechanics.slot_mechanics
   */
  export type mechanics$slot_mechanicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_mechanics
     */
    select?: slot_mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_mechanics
     */
    omit?: slot_mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_mechanicsInclude<ExtArgs> | null
    where?: slot_mechanicsWhereInput
    orderBy?: slot_mechanicsOrderByWithRelationInput | slot_mechanicsOrderByWithRelationInput[]
    cursor?: slot_mechanicsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Slot_mechanicsScalarFieldEnum | Slot_mechanicsScalarFieldEnum[]
  }

  /**
   * mechanics without action
   */
  export type mechanicsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the mechanics
     */
    select?: mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the mechanics
     */
    omit?: mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: mechanicsInclude<ExtArgs> | null
  }


  /**
   * Model themes
   */

  export type AggregateThemes = {
    _count: ThemesCountAggregateOutputType | null
    _min: ThemesMinAggregateOutputType | null
    _max: ThemesMaxAggregateOutputType | null
  }

  export type ThemesMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ThemesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ThemesCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ThemesMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    created_at?: true
    updated_at?: true
  }

  export type ThemesMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    created_at?: true
    updated_at?: true
  }

  export type ThemesCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ThemesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which themes to aggregate.
     */
    where?: themesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of themes to fetch.
     */
    orderBy?: themesOrderByWithRelationInput | themesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: themesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` themes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` themes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned themes
    **/
    _count?: true | ThemesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ThemesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ThemesMaxAggregateInputType
  }

  export type GetThemesAggregateType<T extends ThemesAggregateArgs> = {
        [P in keyof T & keyof AggregateThemes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateThemes[P]>
      : GetScalarType<T[P], AggregateThemes[P]>
  }




  export type themesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: themesWhereInput
    orderBy?: themesOrderByWithAggregationInput | themesOrderByWithAggregationInput[]
    by: ThemesScalarFieldEnum[] | ThemesScalarFieldEnum
    having?: themesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ThemesCountAggregateInputType | true
    _min?: ThemesMinAggregateInputType
    _max?: ThemesMaxAggregateInputType
  }

  export type ThemesGroupByOutputType = {
    id: string
    name: string
    slug: string
    created_at: Date
    updated_at: Date
    _count: ThemesCountAggregateOutputType | null
    _min: ThemesMinAggregateOutputType | null
    _max: ThemesMaxAggregateOutputType | null
  }

  type GetThemesGroupByPayload<T extends themesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ThemesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ThemesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ThemesGroupByOutputType[P]>
            : GetScalarType<T[P], ThemesGroupByOutputType[P]>
        }
      >
    >


  export type themesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    created_at?: boolean
    updated_at?: boolean
    slots?: boolean | themes$slotsArgs<ExtArgs>
    _count?: boolean | ThemesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["themes"]>

  export type themesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["themes"]>

  export type themesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["themes"]>

  export type themesSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type themesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "created_at" | "updated_at", ExtArgs["result"]["themes"]>
  export type themesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slots?: boolean | themes$slotsArgs<ExtArgs>
    _count?: boolean | ThemesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type themesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type themesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $themesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "themes"
    objects: {
      slots: Prisma.$slotsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["themes"]>
    composites: {}
  }

  type themesGetPayload<S extends boolean | null | undefined | themesDefaultArgs> = $Result.GetResult<Prisma.$themesPayload, S>

  type themesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<themesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ThemesCountAggregateInputType | true
    }

  export interface themesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['themes'], meta: { name: 'themes' } }
    /**
     * Find zero or one Themes that matches the filter.
     * @param {themesFindUniqueArgs} args - Arguments to find a Themes
     * @example
     * // Get one Themes
     * const themes = await prisma.themes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends themesFindUniqueArgs>(args: SelectSubset<T, themesFindUniqueArgs<ExtArgs>>): Prisma__themesClient<$Result.GetResult<Prisma.$themesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Themes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {themesFindUniqueOrThrowArgs} args - Arguments to find a Themes
     * @example
     * // Get one Themes
     * const themes = await prisma.themes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends themesFindUniqueOrThrowArgs>(args: SelectSubset<T, themesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__themesClient<$Result.GetResult<Prisma.$themesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Themes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {themesFindFirstArgs} args - Arguments to find a Themes
     * @example
     * // Get one Themes
     * const themes = await prisma.themes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends themesFindFirstArgs>(args?: SelectSubset<T, themesFindFirstArgs<ExtArgs>>): Prisma__themesClient<$Result.GetResult<Prisma.$themesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Themes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {themesFindFirstOrThrowArgs} args - Arguments to find a Themes
     * @example
     * // Get one Themes
     * const themes = await prisma.themes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends themesFindFirstOrThrowArgs>(args?: SelectSubset<T, themesFindFirstOrThrowArgs<ExtArgs>>): Prisma__themesClient<$Result.GetResult<Prisma.$themesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Themes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {themesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Themes
     * const themes = await prisma.themes.findMany()
     * 
     * // Get first 10 Themes
     * const themes = await prisma.themes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const themesWithIdOnly = await prisma.themes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends themesFindManyArgs>(args?: SelectSubset<T, themesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$themesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Themes.
     * @param {themesCreateArgs} args - Arguments to create a Themes.
     * @example
     * // Create one Themes
     * const Themes = await prisma.themes.create({
     *   data: {
     *     // ... data to create a Themes
     *   }
     * })
     * 
     */
    create<T extends themesCreateArgs>(args: SelectSubset<T, themesCreateArgs<ExtArgs>>): Prisma__themesClient<$Result.GetResult<Prisma.$themesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Themes.
     * @param {themesCreateManyArgs} args - Arguments to create many Themes.
     * @example
     * // Create many Themes
     * const themes = await prisma.themes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends themesCreateManyArgs>(args?: SelectSubset<T, themesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Themes and returns the data saved in the database.
     * @param {themesCreateManyAndReturnArgs} args - Arguments to create many Themes.
     * @example
     * // Create many Themes
     * const themes = await prisma.themes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Themes and only return the `id`
     * const themesWithIdOnly = await prisma.themes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends themesCreateManyAndReturnArgs>(args?: SelectSubset<T, themesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$themesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Themes.
     * @param {themesDeleteArgs} args - Arguments to delete one Themes.
     * @example
     * // Delete one Themes
     * const Themes = await prisma.themes.delete({
     *   where: {
     *     // ... filter to delete one Themes
     *   }
     * })
     * 
     */
    delete<T extends themesDeleteArgs>(args: SelectSubset<T, themesDeleteArgs<ExtArgs>>): Prisma__themesClient<$Result.GetResult<Prisma.$themesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Themes.
     * @param {themesUpdateArgs} args - Arguments to update one Themes.
     * @example
     * // Update one Themes
     * const themes = await prisma.themes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends themesUpdateArgs>(args: SelectSubset<T, themesUpdateArgs<ExtArgs>>): Prisma__themesClient<$Result.GetResult<Prisma.$themesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Themes.
     * @param {themesDeleteManyArgs} args - Arguments to filter Themes to delete.
     * @example
     * // Delete a few Themes
     * const { count } = await prisma.themes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends themesDeleteManyArgs>(args?: SelectSubset<T, themesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Themes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {themesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Themes
     * const themes = await prisma.themes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends themesUpdateManyArgs>(args: SelectSubset<T, themesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Themes and returns the data updated in the database.
     * @param {themesUpdateManyAndReturnArgs} args - Arguments to update many Themes.
     * @example
     * // Update many Themes
     * const themes = await prisma.themes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Themes and only return the `id`
     * const themesWithIdOnly = await prisma.themes.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends themesUpdateManyAndReturnArgs>(args: SelectSubset<T, themesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$themesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Themes.
     * @param {themesUpsertArgs} args - Arguments to update or create a Themes.
     * @example
     * // Update or create a Themes
     * const themes = await prisma.themes.upsert({
     *   create: {
     *     // ... data to create a Themes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Themes we want to update
     *   }
     * })
     */
    upsert<T extends themesUpsertArgs>(args: SelectSubset<T, themesUpsertArgs<ExtArgs>>): Prisma__themesClient<$Result.GetResult<Prisma.$themesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Themes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {themesCountArgs} args - Arguments to filter Themes to count.
     * @example
     * // Count the number of Themes
     * const count = await prisma.themes.count({
     *   where: {
     *     // ... the filter for the Themes we want to count
     *   }
     * })
    **/
    count<T extends themesCountArgs>(
      args?: Subset<T, themesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ThemesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Themes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ThemesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ThemesAggregateArgs>(args: Subset<T, ThemesAggregateArgs>): Prisma.PrismaPromise<GetThemesAggregateType<T>>

    /**
     * Group by Themes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {themesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends themesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: themesGroupByArgs['orderBy'] }
        : { orderBy?: themesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, themesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetThemesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the themes model
   */
  readonly fields: themesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for themes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__themesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    slots<T extends themes$slotsArgs<ExtArgs> = {}>(args?: Subset<T, themes$slotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$slotsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the themes model
   */
  interface themesFieldRefs {
    readonly id: FieldRef<"themes", 'String'>
    readonly name: FieldRef<"themes", 'String'>
    readonly slug: FieldRef<"themes", 'String'>
    readonly created_at: FieldRef<"themes", 'DateTime'>
    readonly updated_at: FieldRef<"themes", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * themes findUnique
   */
  export type themesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the themes
     */
    select?: themesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the themes
     */
    omit?: themesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: themesInclude<ExtArgs> | null
    /**
     * Filter, which themes to fetch.
     */
    where: themesWhereUniqueInput
  }

  /**
   * themes findUniqueOrThrow
   */
  export type themesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the themes
     */
    select?: themesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the themes
     */
    omit?: themesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: themesInclude<ExtArgs> | null
    /**
     * Filter, which themes to fetch.
     */
    where: themesWhereUniqueInput
  }

  /**
   * themes findFirst
   */
  export type themesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the themes
     */
    select?: themesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the themes
     */
    omit?: themesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: themesInclude<ExtArgs> | null
    /**
     * Filter, which themes to fetch.
     */
    where?: themesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of themes to fetch.
     */
    orderBy?: themesOrderByWithRelationInput | themesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for themes.
     */
    cursor?: themesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` themes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` themes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of themes.
     */
    distinct?: ThemesScalarFieldEnum | ThemesScalarFieldEnum[]
  }

  /**
   * themes findFirstOrThrow
   */
  export type themesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the themes
     */
    select?: themesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the themes
     */
    omit?: themesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: themesInclude<ExtArgs> | null
    /**
     * Filter, which themes to fetch.
     */
    where?: themesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of themes to fetch.
     */
    orderBy?: themesOrderByWithRelationInput | themesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for themes.
     */
    cursor?: themesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` themes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` themes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of themes.
     */
    distinct?: ThemesScalarFieldEnum | ThemesScalarFieldEnum[]
  }

  /**
   * themes findMany
   */
  export type themesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the themes
     */
    select?: themesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the themes
     */
    omit?: themesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: themesInclude<ExtArgs> | null
    /**
     * Filter, which themes to fetch.
     */
    where?: themesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of themes to fetch.
     */
    orderBy?: themesOrderByWithRelationInput | themesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing themes.
     */
    cursor?: themesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` themes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` themes.
     */
    skip?: number
    distinct?: ThemesScalarFieldEnum | ThemesScalarFieldEnum[]
  }

  /**
   * themes create
   */
  export type themesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the themes
     */
    select?: themesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the themes
     */
    omit?: themesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: themesInclude<ExtArgs> | null
    /**
     * The data needed to create a themes.
     */
    data: XOR<themesCreateInput, themesUncheckedCreateInput>
  }

  /**
   * themes createMany
   */
  export type themesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many themes.
     */
    data: themesCreateManyInput | themesCreateManyInput[]
  }

  /**
   * themes createManyAndReturn
   */
  export type themesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the themes
     */
    select?: themesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the themes
     */
    omit?: themesOmit<ExtArgs> | null
    /**
     * The data used to create many themes.
     */
    data: themesCreateManyInput | themesCreateManyInput[]
  }

  /**
   * themes update
   */
  export type themesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the themes
     */
    select?: themesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the themes
     */
    omit?: themesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: themesInclude<ExtArgs> | null
    /**
     * The data needed to update a themes.
     */
    data: XOR<themesUpdateInput, themesUncheckedUpdateInput>
    /**
     * Choose, which themes to update.
     */
    where: themesWhereUniqueInput
  }

  /**
   * themes updateMany
   */
  export type themesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update themes.
     */
    data: XOR<themesUpdateManyMutationInput, themesUncheckedUpdateManyInput>
    /**
     * Filter which themes to update
     */
    where?: themesWhereInput
    /**
     * Limit how many themes to update.
     */
    limit?: number
  }

  /**
   * themes updateManyAndReturn
   */
  export type themesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the themes
     */
    select?: themesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the themes
     */
    omit?: themesOmit<ExtArgs> | null
    /**
     * The data used to update themes.
     */
    data: XOR<themesUpdateManyMutationInput, themesUncheckedUpdateManyInput>
    /**
     * Filter which themes to update
     */
    where?: themesWhereInput
    /**
     * Limit how many themes to update.
     */
    limit?: number
  }

  /**
   * themes upsert
   */
  export type themesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the themes
     */
    select?: themesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the themes
     */
    omit?: themesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: themesInclude<ExtArgs> | null
    /**
     * The filter to search for the themes to update in case it exists.
     */
    where: themesWhereUniqueInput
    /**
     * In case the themes found by the `where` argument doesn't exist, create a new themes with this data.
     */
    create: XOR<themesCreateInput, themesUncheckedCreateInput>
    /**
     * In case the themes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<themesUpdateInput, themesUncheckedUpdateInput>
  }

  /**
   * themes delete
   */
  export type themesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the themes
     */
    select?: themesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the themes
     */
    omit?: themesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: themesInclude<ExtArgs> | null
    /**
     * Filter which themes to delete.
     */
    where: themesWhereUniqueInput
  }

  /**
   * themes deleteMany
   */
  export type themesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which themes to delete
     */
    where?: themesWhereInput
    /**
     * Limit how many themes to delete.
     */
    limit?: number
  }

  /**
   * themes.slots
   */
  export type themes$slotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slots
     */
    select?: slotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slots
     */
    omit?: slotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slotsInclude<ExtArgs> | null
    where?: slotsWhereInput
    orderBy?: slotsOrderByWithRelationInput | slotsOrderByWithRelationInput[]
    cursor?: slotsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SlotsScalarFieldEnum | SlotsScalarFieldEnum[]
  }

  /**
   * themes without action
   */
  export type themesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the themes
     */
    select?: themesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the themes
     */
    omit?: themesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: themesInclude<ExtArgs> | null
  }


  /**
   * Model slot_categories
   */

  export type AggregateSlot_categories = {
    _count: Slot_categoriesCountAggregateOutputType | null
    _min: Slot_categoriesMinAggregateOutputType | null
    _max: Slot_categoriesMaxAggregateOutputType | null
  }

  export type Slot_categoriesMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Slot_categoriesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Slot_categoriesCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Slot_categoriesMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    created_at?: true
    updated_at?: true
  }

  export type Slot_categoriesMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    created_at?: true
    updated_at?: true
  }

  export type Slot_categoriesCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Slot_categoriesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which slot_categories to aggregate.
     */
    where?: slot_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of slot_categories to fetch.
     */
    orderBy?: slot_categoriesOrderByWithRelationInput | slot_categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: slot_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` slot_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` slot_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned slot_categories
    **/
    _count?: true | Slot_categoriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Slot_categoriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Slot_categoriesMaxAggregateInputType
  }

  export type GetSlot_categoriesAggregateType<T extends Slot_categoriesAggregateArgs> = {
        [P in keyof T & keyof AggregateSlot_categories]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSlot_categories[P]>
      : GetScalarType<T[P], AggregateSlot_categories[P]>
  }




  export type slot_categoriesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: slot_categoriesWhereInput
    orderBy?: slot_categoriesOrderByWithAggregationInput | slot_categoriesOrderByWithAggregationInput[]
    by: Slot_categoriesScalarFieldEnum[] | Slot_categoriesScalarFieldEnum
    having?: slot_categoriesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Slot_categoriesCountAggregateInputType | true
    _min?: Slot_categoriesMinAggregateInputType
    _max?: Slot_categoriesMaxAggregateInputType
  }

  export type Slot_categoriesGroupByOutputType = {
    id: string
    name: string
    slug: string
    created_at: Date
    updated_at: Date
    _count: Slot_categoriesCountAggregateOutputType | null
    _min: Slot_categoriesMinAggregateOutputType | null
    _max: Slot_categoriesMaxAggregateOutputType | null
  }

  type GetSlot_categoriesGroupByPayload<T extends slot_categoriesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Slot_categoriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Slot_categoriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Slot_categoriesGroupByOutputType[P]>
            : GetScalarType<T[P], Slot_categoriesGroupByOutputType[P]>
        }
      >
    >


  export type slot_categoriesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    created_at?: boolean
    updated_at?: boolean
    slots?: boolean | slot_categories$slotsArgs<ExtArgs>
    _count?: boolean | Slot_categoriesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["slot_categories"]>

  export type slot_categoriesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["slot_categories"]>

  export type slot_categoriesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["slot_categories"]>

  export type slot_categoriesSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type slot_categoriesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "created_at" | "updated_at", ExtArgs["result"]["slot_categories"]>
  export type slot_categoriesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slots?: boolean | slot_categories$slotsArgs<ExtArgs>
    _count?: boolean | Slot_categoriesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type slot_categoriesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type slot_categoriesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $slot_categoriesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "slot_categories"
    objects: {
      slots: Prisma.$slotsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["slot_categories"]>
    composites: {}
  }

  type slot_categoriesGetPayload<S extends boolean | null | undefined | slot_categoriesDefaultArgs> = $Result.GetResult<Prisma.$slot_categoriesPayload, S>

  type slot_categoriesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<slot_categoriesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Slot_categoriesCountAggregateInputType | true
    }

  export interface slot_categoriesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['slot_categories'], meta: { name: 'slot_categories' } }
    /**
     * Find zero or one Slot_categories that matches the filter.
     * @param {slot_categoriesFindUniqueArgs} args - Arguments to find a Slot_categories
     * @example
     * // Get one Slot_categories
     * const slot_categories = await prisma.slot_categories.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends slot_categoriesFindUniqueArgs>(args: SelectSubset<T, slot_categoriesFindUniqueArgs<ExtArgs>>): Prisma__slot_categoriesClient<$Result.GetResult<Prisma.$slot_categoriesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Slot_categories that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {slot_categoriesFindUniqueOrThrowArgs} args - Arguments to find a Slot_categories
     * @example
     * // Get one Slot_categories
     * const slot_categories = await prisma.slot_categories.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends slot_categoriesFindUniqueOrThrowArgs>(args: SelectSubset<T, slot_categoriesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__slot_categoriesClient<$Result.GetResult<Prisma.$slot_categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Slot_categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {slot_categoriesFindFirstArgs} args - Arguments to find a Slot_categories
     * @example
     * // Get one Slot_categories
     * const slot_categories = await prisma.slot_categories.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends slot_categoriesFindFirstArgs>(args?: SelectSubset<T, slot_categoriesFindFirstArgs<ExtArgs>>): Prisma__slot_categoriesClient<$Result.GetResult<Prisma.$slot_categoriesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Slot_categories that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {slot_categoriesFindFirstOrThrowArgs} args - Arguments to find a Slot_categories
     * @example
     * // Get one Slot_categories
     * const slot_categories = await prisma.slot_categories.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends slot_categoriesFindFirstOrThrowArgs>(args?: SelectSubset<T, slot_categoriesFindFirstOrThrowArgs<ExtArgs>>): Prisma__slot_categoriesClient<$Result.GetResult<Prisma.$slot_categoriesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Slot_categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {slot_categoriesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Slot_categories
     * const slot_categories = await prisma.slot_categories.findMany()
     * 
     * // Get first 10 Slot_categories
     * const slot_categories = await prisma.slot_categories.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const slot_categoriesWithIdOnly = await prisma.slot_categories.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends slot_categoriesFindManyArgs>(args?: SelectSubset<T, slot_categoriesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$slot_categoriesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Slot_categories.
     * @param {slot_categoriesCreateArgs} args - Arguments to create a Slot_categories.
     * @example
     * // Create one Slot_categories
     * const Slot_categories = await prisma.slot_categories.create({
     *   data: {
     *     // ... data to create a Slot_categories
     *   }
     * })
     * 
     */
    create<T extends slot_categoriesCreateArgs>(args: SelectSubset<T, slot_categoriesCreateArgs<ExtArgs>>): Prisma__slot_categoriesClient<$Result.GetResult<Prisma.$slot_categoriesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Slot_categories.
     * @param {slot_categoriesCreateManyArgs} args - Arguments to create many Slot_categories.
     * @example
     * // Create many Slot_categories
     * const slot_categories = await prisma.slot_categories.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends slot_categoriesCreateManyArgs>(args?: SelectSubset<T, slot_categoriesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Slot_categories and returns the data saved in the database.
     * @param {slot_categoriesCreateManyAndReturnArgs} args - Arguments to create many Slot_categories.
     * @example
     * // Create many Slot_categories
     * const slot_categories = await prisma.slot_categories.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Slot_categories and only return the `id`
     * const slot_categoriesWithIdOnly = await prisma.slot_categories.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends slot_categoriesCreateManyAndReturnArgs>(args?: SelectSubset<T, slot_categoriesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$slot_categoriesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Slot_categories.
     * @param {slot_categoriesDeleteArgs} args - Arguments to delete one Slot_categories.
     * @example
     * // Delete one Slot_categories
     * const Slot_categories = await prisma.slot_categories.delete({
     *   where: {
     *     // ... filter to delete one Slot_categories
     *   }
     * })
     * 
     */
    delete<T extends slot_categoriesDeleteArgs>(args: SelectSubset<T, slot_categoriesDeleteArgs<ExtArgs>>): Prisma__slot_categoriesClient<$Result.GetResult<Prisma.$slot_categoriesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Slot_categories.
     * @param {slot_categoriesUpdateArgs} args - Arguments to update one Slot_categories.
     * @example
     * // Update one Slot_categories
     * const slot_categories = await prisma.slot_categories.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends slot_categoriesUpdateArgs>(args: SelectSubset<T, slot_categoriesUpdateArgs<ExtArgs>>): Prisma__slot_categoriesClient<$Result.GetResult<Prisma.$slot_categoriesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Slot_categories.
     * @param {slot_categoriesDeleteManyArgs} args - Arguments to filter Slot_categories to delete.
     * @example
     * // Delete a few Slot_categories
     * const { count } = await prisma.slot_categories.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends slot_categoriesDeleteManyArgs>(args?: SelectSubset<T, slot_categoriesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Slot_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {slot_categoriesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Slot_categories
     * const slot_categories = await prisma.slot_categories.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends slot_categoriesUpdateManyArgs>(args: SelectSubset<T, slot_categoriesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Slot_categories and returns the data updated in the database.
     * @param {slot_categoriesUpdateManyAndReturnArgs} args - Arguments to update many Slot_categories.
     * @example
     * // Update many Slot_categories
     * const slot_categories = await prisma.slot_categories.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Slot_categories and only return the `id`
     * const slot_categoriesWithIdOnly = await prisma.slot_categories.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends slot_categoriesUpdateManyAndReturnArgs>(args: SelectSubset<T, slot_categoriesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$slot_categoriesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Slot_categories.
     * @param {slot_categoriesUpsertArgs} args - Arguments to update or create a Slot_categories.
     * @example
     * // Update or create a Slot_categories
     * const slot_categories = await prisma.slot_categories.upsert({
     *   create: {
     *     // ... data to create a Slot_categories
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Slot_categories we want to update
     *   }
     * })
     */
    upsert<T extends slot_categoriesUpsertArgs>(args: SelectSubset<T, slot_categoriesUpsertArgs<ExtArgs>>): Prisma__slot_categoriesClient<$Result.GetResult<Prisma.$slot_categoriesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Slot_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {slot_categoriesCountArgs} args - Arguments to filter Slot_categories to count.
     * @example
     * // Count the number of Slot_categories
     * const count = await prisma.slot_categories.count({
     *   where: {
     *     // ... the filter for the Slot_categories we want to count
     *   }
     * })
    **/
    count<T extends slot_categoriesCountArgs>(
      args?: Subset<T, slot_categoriesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Slot_categoriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Slot_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Slot_categoriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Slot_categoriesAggregateArgs>(args: Subset<T, Slot_categoriesAggregateArgs>): Prisma.PrismaPromise<GetSlot_categoriesAggregateType<T>>

    /**
     * Group by Slot_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {slot_categoriesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends slot_categoriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: slot_categoriesGroupByArgs['orderBy'] }
        : { orderBy?: slot_categoriesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, slot_categoriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSlot_categoriesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the slot_categories model
   */
  readonly fields: slot_categoriesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for slot_categories.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__slot_categoriesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    slots<T extends slot_categories$slotsArgs<ExtArgs> = {}>(args?: Subset<T, slot_categories$slotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$slotsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the slot_categories model
   */
  interface slot_categoriesFieldRefs {
    readonly id: FieldRef<"slot_categories", 'String'>
    readonly name: FieldRef<"slot_categories", 'String'>
    readonly slug: FieldRef<"slot_categories", 'String'>
    readonly created_at: FieldRef<"slot_categories", 'DateTime'>
    readonly updated_at: FieldRef<"slot_categories", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * slot_categories findUnique
   */
  export type slot_categoriesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_categories
     */
    select?: slot_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_categories
     */
    omit?: slot_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which slot_categories to fetch.
     */
    where: slot_categoriesWhereUniqueInput
  }

  /**
   * slot_categories findUniqueOrThrow
   */
  export type slot_categoriesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_categories
     */
    select?: slot_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_categories
     */
    omit?: slot_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which slot_categories to fetch.
     */
    where: slot_categoriesWhereUniqueInput
  }

  /**
   * slot_categories findFirst
   */
  export type slot_categoriesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_categories
     */
    select?: slot_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_categories
     */
    omit?: slot_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which slot_categories to fetch.
     */
    where?: slot_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of slot_categories to fetch.
     */
    orderBy?: slot_categoriesOrderByWithRelationInput | slot_categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for slot_categories.
     */
    cursor?: slot_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` slot_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` slot_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of slot_categories.
     */
    distinct?: Slot_categoriesScalarFieldEnum | Slot_categoriesScalarFieldEnum[]
  }

  /**
   * slot_categories findFirstOrThrow
   */
  export type slot_categoriesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_categories
     */
    select?: slot_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_categories
     */
    omit?: slot_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which slot_categories to fetch.
     */
    where?: slot_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of slot_categories to fetch.
     */
    orderBy?: slot_categoriesOrderByWithRelationInput | slot_categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for slot_categories.
     */
    cursor?: slot_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` slot_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` slot_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of slot_categories.
     */
    distinct?: Slot_categoriesScalarFieldEnum | Slot_categoriesScalarFieldEnum[]
  }

  /**
   * slot_categories findMany
   */
  export type slot_categoriesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_categories
     */
    select?: slot_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_categories
     */
    omit?: slot_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_categoriesInclude<ExtArgs> | null
    /**
     * Filter, which slot_categories to fetch.
     */
    where?: slot_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of slot_categories to fetch.
     */
    orderBy?: slot_categoriesOrderByWithRelationInput | slot_categoriesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing slot_categories.
     */
    cursor?: slot_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` slot_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` slot_categories.
     */
    skip?: number
    distinct?: Slot_categoriesScalarFieldEnum | Slot_categoriesScalarFieldEnum[]
  }

  /**
   * slot_categories create
   */
  export type slot_categoriesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_categories
     */
    select?: slot_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_categories
     */
    omit?: slot_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_categoriesInclude<ExtArgs> | null
    /**
     * The data needed to create a slot_categories.
     */
    data: XOR<slot_categoriesCreateInput, slot_categoriesUncheckedCreateInput>
  }

  /**
   * slot_categories createMany
   */
  export type slot_categoriesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many slot_categories.
     */
    data: slot_categoriesCreateManyInput | slot_categoriesCreateManyInput[]
  }

  /**
   * slot_categories createManyAndReturn
   */
  export type slot_categoriesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_categories
     */
    select?: slot_categoriesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the slot_categories
     */
    omit?: slot_categoriesOmit<ExtArgs> | null
    /**
     * The data used to create many slot_categories.
     */
    data: slot_categoriesCreateManyInput | slot_categoriesCreateManyInput[]
  }

  /**
   * slot_categories update
   */
  export type slot_categoriesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_categories
     */
    select?: slot_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_categories
     */
    omit?: slot_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_categoriesInclude<ExtArgs> | null
    /**
     * The data needed to update a slot_categories.
     */
    data: XOR<slot_categoriesUpdateInput, slot_categoriesUncheckedUpdateInput>
    /**
     * Choose, which slot_categories to update.
     */
    where: slot_categoriesWhereUniqueInput
  }

  /**
   * slot_categories updateMany
   */
  export type slot_categoriesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update slot_categories.
     */
    data: XOR<slot_categoriesUpdateManyMutationInput, slot_categoriesUncheckedUpdateManyInput>
    /**
     * Filter which slot_categories to update
     */
    where?: slot_categoriesWhereInput
    /**
     * Limit how many slot_categories to update.
     */
    limit?: number
  }

  /**
   * slot_categories updateManyAndReturn
   */
  export type slot_categoriesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_categories
     */
    select?: slot_categoriesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the slot_categories
     */
    omit?: slot_categoriesOmit<ExtArgs> | null
    /**
     * The data used to update slot_categories.
     */
    data: XOR<slot_categoriesUpdateManyMutationInput, slot_categoriesUncheckedUpdateManyInput>
    /**
     * Filter which slot_categories to update
     */
    where?: slot_categoriesWhereInput
    /**
     * Limit how many slot_categories to update.
     */
    limit?: number
  }

  /**
   * slot_categories upsert
   */
  export type slot_categoriesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_categories
     */
    select?: slot_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_categories
     */
    omit?: slot_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_categoriesInclude<ExtArgs> | null
    /**
     * The filter to search for the slot_categories to update in case it exists.
     */
    where: slot_categoriesWhereUniqueInput
    /**
     * In case the slot_categories found by the `where` argument doesn't exist, create a new slot_categories with this data.
     */
    create: XOR<slot_categoriesCreateInput, slot_categoriesUncheckedCreateInput>
    /**
     * In case the slot_categories was found with the provided `where` argument, update it with this data.
     */
    update: XOR<slot_categoriesUpdateInput, slot_categoriesUncheckedUpdateInput>
  }

  /**
   * slot_categories delete
   */
  export type slot_categoriesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_categories
     */
    select?: slot_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_categories
     */
    omit?: slot_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_categoriesInclude<ExtArgs> | null
    /**
     * Filter which slot_categories to delete.
     */
    where: slot_categoriesWhereUniqueInput
  }

  /**
   * slot_categories deleteMany
   */
  export type slot_categoriesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which slot_categories to delete
     */
    where?: slot_categoriesWhereInput
    /**
     * Limit how many slot_categories to delete.
     */
    limit?: number
  }

  /**
   * slot_categories.slots
   */
  export type slot_categories$slotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slots
     */
    select?: slotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slots
     */
    omit?: slotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slotsInclude<ExtArgs> | null
    where?: slotsWhereInput
    orderBy?: slotsOrderByWithRelationInput | slotsOrderByWithRelationInput[]
    cursor?: slotsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SlotsScalarFieldEnum | SlotsScalarFieldEnum[]
  }

  /**
   * slot_categories without action
   */
  export type slot_categoriesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_categories
     */
    select?: slot_categoriesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_categories
     */
    omit?: slot_categoriesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_categoriesInclude<ExtArgs> | null
  }


  /**
   * Model slots
   */

  export type AggregateSlots = {
    _count: SlotsCountAggregateOutputType | null
    _avg: SlotsAvgAggregateOutputType | null
    _sum: SlotsSumAggregateOutputType | null
    _min: SlotsMinAggregateOutputType | null
    _max: SlotsMaxAggregateOutputType | null
  }

  export type SlotsAvgAggregateOutputType = {
    rtp: number | null
    min_bet: number | null
    max_bet: number | null
    max_win: number | null
    paylines: number | null
    reels: number | null
    rows: number | null
  }

  export type SlotsSumAggregateOutputType = {
    rtp: number | null
    min_bet: number | null
    max_bet: number | null
    max_win: number | null
    paylines: number | null
    reels: number | null
    rows: number | null
  }

  export type SlotsMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    provider_id: string | null
    category_id: string | null
    theme_id: string | null
    rtp: number | null
    volatility: string | null
    min_bet: number | null
    max_bet: number | null
    max_win: number | null
    paylines: number | null
    reels: number | null
    rows: number | null
    has_free_spins: boolean | null
    has_bonus_game: boolean | null
    has_wild: boolean | null
    has_scatter: boolean | null
    has_multiplier: boolean | null
    description: string | null
    image_url: string | null
    demo_url: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SlotsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    provider_id: string | null
    category_id: string | null
    theme_id: string | null
    rtp: number | null
    volatility: string | null
    min_bet: number | null
    max_bet: number | null
    max_win: number | null
    paylines: number | null
    reels: number | null
    rows: number | null
    has_free_spins: boolean | null
    has_bonus_game: boolean | null
    has_wild: boolean | null
    has_scatter: boolean | null
    has_multiplier: boolean | null
    description: string | null
    image_url: string | null
    demo_url: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SlotsCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    provider_id: number
    category_id: number
    theme_id: number
    rtp: number
    volatility: number
    min_bet: number
    max_bet: number
    max_win: number
    paylines: number
    reels: number
    rows: number
    has_free_spins: number
    has_bonus_game: number
    has_wild: number
    has_scatter: number
    has_multiplier: number
    description: number
    image_url: number
    demo_url: number
    is_active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type SlotsAvgAggregateInputType = {
    rtp?: true
    min_bet?: true
    max_bet?: true
    max_win?: true
    paylines?: true
    reels?: true
    rows?: true
  }

  export type SlotsSumAggregateInputType = {
    rtp?: true
    min_bet?: true
    max_bet?: true
    max_win?: true
    paylines?: true
    reels?: true
    rows?: true
  }

  export type SlotsMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    provider_id?: true
    category_id?: true
    theme_id?: true
    rtp?: true
    volatility?: true
    min_bet?: true
    max_bet?: true
    max_win?: true
    paylines?: true
    reels?: true
    rows?: true
    has_free_spins?: true
    has_bonus_game?: true
    has_wild?: true
    has_scatter?: true
    has_multiplier?: true
    description?: true
    image_url?: true
    demo_url?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type SlotsMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    provider_id?: true
    category_id?: true
    theme_id?: true
    rtp?: true
    volatility?: true
    min_bet?: true
    max_bet?: true
    max_win?: true
    paylines?: true
    reels?: true
    rows?: true
    has_free_spins?: true
    has_bonus_game?: true
    has_wild?: true
    has_scatter?: true
    has_multiplier?: true
    description?: true
    image_url?: true
    demo_url?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type SlotsCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    provider_id?: true
    category_id?: true
    theme_id?: true
    rtp?: true
    volatility?: true
    min_bet?: true
    max_bet?: true
    max_win?: true
    paylines?: true
    reels?: true
    rows?: true
    has_free_spins?: true
    has_bonus_game?: true
    has_wild?: true
    has_scatter?: true
    has_multiplier?: true
    description?: true
    image_url?: true
    demo_url?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type SlotsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which slots to aggregate.
     */
    where?: slotsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of slots to fetch.
     */
    orderBy?: slotsOrderByWithRelationInput | slotsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: slotsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` slots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` slots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned slots
    **/
    _count?: true | SlotsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SlotsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SlotsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SlotsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SlotsMaxAggregateInputType
  }

  export type GetSlotsAggregateType<T extends SlotsAggregateArgs> = {
        [P in keyof T & keyof AggregateSlots]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSlots[P]>
      : GetScalarType<T[P], AggregateSlots[P]>
  }




  export type slotsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: slotsWhereInput
    orderBy?: slotsOrderByWithAggregationInput | slotsOrderByWithAggregationInput[]
    by: SlotsScalarFieldEnum[] | SlotsScalarFieldEnum
    having?: slotsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SlotsCountAggregateInputType | true
    _avg?: SlotsAvgAggregateInputType
    _sum?: SlotsSumAggregateInputType
    _min?: SlotsMinAggregateInputType
    _max?: SlotsMaxAggregateInputType
  }

  export type SlotsGroupByOutputType = {
    id: string
    name: string
    slug: string
    provider_id: string
    category_id: string
    theme_id: string | null
    rtp: number | null
    volatility: string | null
    min_bet: number | null
    max_bet: number | null
    max_win: number | null
    paylines: number | null
    reels: number | null
    rows: number | null
    has_free_spins: boolean
    has_bonus_game: boolean
    has_wild: boolean
    has_scatter: boolean
    has_multiplier: boolean
    description: string | null
    image_url: string | null
    demo_url: string | null
    is_active: boolean
    created_at: Date
    updated_at: Date
    _count: SlotsCountAggregateOutputType | null
    _avg: SlotsAvgAggregateOutputType | null
    _sum: SlotsSumAggregateOutputType | null
    _min: SlotsMinAggregateOutputType | null
    _max: SlotsMaxAggregateOutputType | null
  }

  type GetSlotsGroupByPayload<T extends slotsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SlotsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SlotsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SlotsGroupByOutputType[P]>
            : GetScalarType<T[P], SlotsGroupByOutputType[P]>
        }
      >
    >


  export type slotsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    provider_id?: boolean
    category_id?: boolean
    theme_id?: boolean
    rtp?: boolean
    volatility?: boolean
    min_bet?: boolean
    max_bet?: boolean
    max_win?: boolean
    paylines?: boolean
    reels?: boolean
    rows?: boolean
    has_free_spins?: boolean
    has_bonus_game?: boolean
    has_wild?: boolean
    has_scatter?: boolean
    has_multiplier?: boolean
    description?: boolean
    image_url?: boolean
    demo_url?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    provider?: boolean | providersDefaultArgs<ExtArgs>
    category?: boolean | slot_categoriesDefaultArgs<ExtArgs>
    theme?: boolean | slots$themeArgs<ExtArgs>
    slot_mechanics?: boolean | slots$slot_mechanicsArgs<ExtArgs>
    _count?: boolean | SlotsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["slots"]>

  export type slotsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    provider_id?: boolean
    category_id?: boolean
    theme_id?: boolean
    rtp?: boolean
    volatility?: boolean
    min_bet?: boolean
    max_bet?: boolean
    max_win?: boolean
    paylines?: boolean
    reels?: boolean
    rows?: boolean
    has_free_spins?: boolean
    has_bonus_game?: boolean
    has_wild?: boolean
    has_scatter?: boolean
    has_multiplier?: boolean
    description?: boolean
    image_url?: boolean
    demo_url?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    provider?: boolean | providersDefaultArgs<ExtArgs>
    category?: boolean | slot_categoriesDefaultArgs<ExtArgs>
    theme?: boolean | slots$themeArgs<ExtArgs>
  }, ExtArgs["result"]["slots"]>

  export type slotsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    provider_id?: boolean
    category_id?: boolean
    theme_id?: boolean
    rtp?: boolean
    volatility?: boolean
    min_bet?: boolean
    max_bet?: boolean
    max_win?: boolean
    paylines?: boolean
    reels?: boolean
    rows?: boolean
    has_free_spins?: boolean
    has_bonus_game?: boolean
    has_wild?: boolean
    has_scatter?: boolean
    has_multiplier?: boolean
    description?: boolean
    image_url?: boolean
    demo_url?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    provider?: boolean | providersDefaultArgs<ExtArgs>
    category?: boolean | slot_categoriesDefaultArgs<ExtArgs>
    theme?: boolean | slots$themeArgs<ExtArgs>
  }, ExtArgs["result"]["slots"]>

  export type slotsSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    provider_id?: boolean
    category_id?: boolean
    theme_id?: boolean
    rtp?: boolean
    volatility?: boolean
    min_bet?: boolean
    max_bet?: boolean
    max_win?: boolean
    paylines?: boolean
    reels?: boolean
    rows?: boolean
    has_free_spins?: boolean
    has_bonus_game?: boolean
    has_wild?: boolean
    has_scatter?: boolean
    has_multiplier?: boolean
    description?: boolean
    image_url?: boolean
    demo_url?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type slotsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "provider_id" | "category_id" | "theme_id" | "rtp" | "volatility" | "min_bet" | "max_bet" | "max_win" | "paylines" | "reels" | "rows" | "has_free_spins" | "has_bonus_game" | "has_wild" | "has_scatter" | "has_multiplier" | "description" | "image_url" | "demo_url" | "is_active" | "created_at" | "updated_at", ExtArgs["result"]["slots"]>
  export type slotsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provider?: boolean | providersDefaultArgs<ExtArgs>
    category?: boolean | slot_categoriesDefaultArgs<ExtArgs>
    theme?: boolean | slots$themeArgs<ExtArgs>
    slot_mechanics?: boolean | slots$slot_mechanicsArgs<ExtArgs>
    _count?: boolean | SlotsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type slotsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provider?: boolean | providersDefaultArgs<ExtArgs>
    category?: boolean | slot_categoriesDefaultArgs<ExtArgs>
    theme?: boolean | slots$themeArgs<ExtArgs>
  }
  export type slotsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    provider?: boolean | providersDefaultArgs<ExtArgs>
    category?: boolean | slot_categoriesDefaultArgs<ExtArgs>
    theme?: boolean | slots$themeArgs<ExtArgs>
  }

  export type $slotsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "slots"
    objects: {
      provider: Prisma.$providersPayload<ExtArgs>
      category: Prisma.$slot_categoriesPayload<ExtArgs>
      theme: Prisma.$themesPayload<ExtArgs> | null
      slot_mechanics: Prisma.$slot_mechanicsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      provider_id: string
      category_id: string
      theme_id: string | null
      rtp: number | null
      volatility: string | null
      min_bet: number | null
      max_bet: number | null
      max_win: number | null
      paylines: number | null
      reels: number | null
      rows: number | null
      has_free_spins: boolean
      has_bonus_game: boolean
      has_wild: boolean
      has_scatter: boolean
      has_multiplier: boolean
      description: string | null
      image_url: string | null
      demo_url: string | null
      is_active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["slots"]>
    composites: {}
  }

  type slotsGetPayload<S extends boolean | null | undefined | slotsDefaultArgs> = $Result.GetResult<Prisma.$slotsPayload, S>

  type slotsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<slotsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SlotsCountAggregateInputType | true
    }

  export interface slotsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['slots'], meta: { name: 'slots' } }
    /**
     * Find zero or one Slots that matches the filter.
     * @param {slotsFindUniqueArgs} args - Arguments to find a Slots
     * @example
     * // Get one Slots
     * const slots = await prisma.slots.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends slotsFindUniqueArgs>(args: SelectSubset<T, slotsFindUniqueArgs<ExtArgs>>): Prisma__slotsClient<$Result.GetResult<Prisma.$slotsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Slots that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {slotsFindUniqueOrThrowArgs} args - Arguments to find a Slots
     * @example
     * // Get one Slots
     * const slots = await prisma.slots.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends slotsFindUniqueOrThrowArgs>(args: SelectSubset<T, slotsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__slotsClient<$Result.GetResult<Prisma.$slotsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Slots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {slotsFindFirstArgs} args - Arguments to find a Slots
     * @example
     * // Get one Slots
     * const slots = await prisma.slots.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends slotsFindFirstArgs>(args?: SelectSubset<T, slotsFindFirstArgs<ExtArgs>>): Prisma__slotsClient<$Result.GetResult<Prisma.$slotsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Slots that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {slotsFindFirstOrThrowArgs} args - Arguments to find a Slots
     * @example
     * // Get one Slots
     * const slots = await prisma.slots.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends slotsFindFirstOrThrowArgs>(args?: SelectSubset<T, slotsFindFirstOrThrowArgs<ExtArgs>>): Prisma__slotsClient<$Result.GetResult<Prisma.$slotsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Slots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {slotsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Slots
     * const slots = await prisma.slots.findMany()
     * 
     * // Get first 10 Slots
     * const slots = await prisma.slots.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const slotsWithIdOnly = await prisma.slots.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends slotsFindManyArgs>(args?: SelectSubset<T, slotsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$slotsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Slots.
     * @param {slotsCreateArgs} args - Arguments to create a Slots.
     * @example
     * // Create one Slots
     * const Slots = await prisma.slots.create({
     *   data: {
     *     // ... data to create a Slots
     *   }
     * })
     * 
     */
    create<T extends slotsCreateArgs>(args: SelectSubset<T, slotsCreateArgs<ExtArgs>>): Prisma__slotsClient<$Result.GetResult<Prisma.$slotsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Slots.
     * @param {slotsCreateManyArgs} args - Arguments to create many Slots.
     * @example
     * // Create many Slots
     * const slots = await prisma.slots.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends slotsCreateManyArgs>(args?: SelectSubset<T, slotsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Slots and returns the data saved in the database.
     * @param {slotsCreateManyAndReturnArgs} args - Arguments to create many Slots.
     * @example
     * // Create many Slots
     * const slots = await prisma.slots.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Slots and only return the `id`
     * const slotsWithIdOnly = await prisma.slots.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends slotsCreateManyAndReturnArgs>(args?: SelectSubset<T, slotsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$slotsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Slots.
     * @param {slotsDeleteArgs} args - Arguments to delete one Slots.
     * @example
     * // Delete one Slots
     * const Slots = await prisma.slots.delete({
     *   where: {
     *     // ... filter to delete one Slots
     *   }
     * })
     * 
     */
    delete<T extends slotsDeleteArgs>(args: SelectSubset<T, slotsDeleteArgs<ExtArgs>>): Prisma__slotsClient<$Result.GetResult<Prisma.$slotsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Slots.
     * @param {slotsUpdateArgs} args - Arguments to update one Slots.
     * @example
     * // Update one Slots
     * const slots = await prisma.slots.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends slotsUpdateArgs>(args: SelectSubset<T, slotsUpdateArgs<ExtArgs>>): Prisma__slotsClient<$Result.GetResult<Prisma.$slotsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Slots.
     * @param {slotsDeleteManyArgs} args - Arguments to filter Slots to delete.
     * @example
     * // Delete a few Slots
     * const { count } = await prisma.slots.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends slotsDeleteManyArgs>(args?: SelectSubset<T, slotsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Slots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {slotsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Slots
     * const slots = await prisma.slots.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends slotsUpdateManyArgs>(args: SelectSubset<T, slotsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Slots and returns the data updated in the database.
     * @param {slotsUpdateManyAndReturnArgs} args - Arguments to update many Slots.
     * @example
     * // Update many Slots
     * const slots = await prisma.slots.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Slots and only return the `id`
     * const slotsWithIdOnly = await prisma.slots.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends slotsUpdateManyAndReturnArgs>(args: SelectSubset<T, slotsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$slotsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Slots.
     * @param {slotsUpsertArgs} args - Arguments to update or create a Slots.
     * @example
     * // Update or create a Slots
     * const slots = await prisma.slots.upsert({
     *   create: {
     *     // ... data to create a Slots
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Slots we want to update
     *   }
     * })
     */
    upsert<T extends slotsUpsertArgs>(args: SelectSubset<T, slotsUpsertArgs<ExtArgs>>): Prisma__slotsClient<$Result.GetResult<Prisma.$slotsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Slots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {slotsCountArgs} args - Arguments to filter Slots to count.
     * @example
     * // Count the number of Slots
     * const count = await prisma.slots.count({
     *   where: {
     *     // ... the filter for the Slots we want to count
     *   }
     * })
    **/
    count<T extends slotsCountArgs>(
      args?: Subset<T, slotsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SlotsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Slots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SlotsAggregateArgs>(args: Subset<T, SlotsAggregateArgs>): Prisma.PrismaPromise<GetSlotsAggregateType<T>>

    /**
     * Group by Slots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {slotsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends slotsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: slotsGroupByArgs['orderBy'] }
        : { orderBy?: slotsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, slotsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSlotsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the slots model
   */
  readonly fields: slotsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for slots.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__slotsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    provider<T extends providersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, providersDefaultArgs<ExtArgs>>): Prisma__providersClient<$Result.GetResult<Prisma.$providersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends slot_categoriesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, slot_categoriesDefaultArgs<ExtArgs>>): Prisma__slot_categoriesClient<$Result.GetResult<Prisma.$slot_categoriesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    theme<T extends slots$themeArgs<ExtArgs> = {}>(args?: Subset<T, slots$themeArgs<ExtArgs>>): Prisma__themesClient<$Result.GetResult<Prisma.$themesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    slot_mechanics<T extends slots$slot_mechanicsArgs<ExtArgs> = {}>(args?: Subset<T, slots$slot_mechanicsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$slot_mechanicsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the slots model
   */
  interface slotsFieldRefs {
    readonly id: FieldRef<"slots", 'String'>
    readonly name: FieldRef<"slots", 'String'>
    readonly slug: FieldRef<"slots", 'String'>
    readonly provider_id: FieldRef<"slots", 'String'>
    readonly category_id: FieldRef<"slots", 'String'>
    readonly theme_id: FieldRef<"slots", 'String'>
    readonly rtp: FieldRef<"slots", 'Float'>
    readonly volatility: FieldRef<"slots", 'String'>
    readonly min_bet: FieldRef<"slots", 'Float'>
    readonly max_bet: FieldRef<"slots", 'Float'>
    readonly max_win: FieldRef<"slots", 'Float'>
    readonly paylines: FieldRef<"slots", 'Int'>
    readonly reels: FieldRef<"slots", 'Int'>
    readonly rows: FieldRef<"slots", 'Int'>
    readonly has_free_spins: FieldRef<"slots", 'Boolean'>
    readonly has_bonus_game: FieldRef<"slots", 'Boolean'>
    readonly has_wild: FieldRef<"slots", 'Boolean'>
    readonly has_scatter: FieldRef<"slots", 'Boolean'>
    readonly has_multiplier: FieldRef<"slots", 'Boolean'>
    readonly description: FieldRef<"slots", 'String'>
    readonly image_url: FieldRef<"slots", 'String'>
    readonly demo_url: FieldRef<"slots", 'String'>
    readonly is_active: FieldRef<"slots", 'Boolean'>
    readonly created_at: FieldRef<"slots", 'DateTime'>
    readonly updated_at: FieldRef<"slots", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * slots findUnique
   */
  export type slotsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slots
     */
    select?: slotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slots
     */
    omit?: slotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slotsInclude<ExtArgs> | null
    /**
     * Filter, which slots to fetch.
     */
    where: slotsWhereUniqueInput
  }

  /**
   * slots findUniqueOrThrow
   */
  export type slotsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slots
     */
    select?: slotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slots
     */
    omit?: slotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slotsInclude<ExtArgs> | null
    /**
     * Filter, which slots to fetch.
     */
    where: slotsWhereUniqueInput
  }

  /**
   * slots findFirst
   */
  export type slotsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slots
     */
    select?: slotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slots
     */
    omit?: slotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slotsInclude<ExtArgs> | null
    /**
     * Filter, which slots to fetch.
     */
    where?: slotsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of slots to fetch.
     */
    orderBy?: slotsOrderByWithRelationInput | slotsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for slots.
     */
    cursor?: slotsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` slots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` slots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of slots.
     */
    distinct?: SlotsScalarFieldEnum | SlotsScalarFieldEnum[]
  }

  /**
   * slots findFirstOrThrow
   */
  export type slotsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slots
     */
    select?: slotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slots
     */
    omit?: slotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slotsInclude<ExtArgs> | null
    /**
     * Filter, which slots to fetch.
     */
    where?: slotsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of slots to fetch.
     */
    orderBy?: slotsOrderByWithRelationInput | slotsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for slots.
     */
    cursor?: slotsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` slots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` slots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of slots.
     */
    distinct?: SlotsScalarFieldEnum | SlotsScalarFieldEnum[]
  }

  /**
   * slots findMany
   */
  export type slotsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slots
     */
    select?: slotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slots
     */
    omit?: slotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slotsInclude<ExtArgs> | null
    /**
     * Filter, which slots to fetch.
     */
    where?: slotsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of slots to fetch.
     */
    orderBy?: slotsOrderByWithRelationInput | slotsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing slots.
     */
    cursor?: slotsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` slots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` slots.
     */
    skip?: number
    distinct?: SlotsScalarFieldEnum | SlotsScalarFieldEnum[]
  }

  /**
   * slots create
   */
  export type slotsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slots
     */
    select?: slotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slots
     */
    omit?: slotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slotsInclude<ExtArgs> | null
    /**
     * The data needed to create a slots.
     */
    data: XOR<slotsCreateInput, slotsUncheckedCreateInput>
  }

  /**
   * slots createMany
   */
  export type slotsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many slots.
     */
    data: slotsCreateManyInput | slotsCreateManyInput[]
  }

  /**
   * slots createManyAndReturn
   */
  export type slotsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slots
     */
    select?: slotsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the slots
     */
    omit?: slotsOmit<ExtArgs> | null
    /**
     * The data used to create many slots.
     */
    data: slotsCreateManyInput | slotsCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slotsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * slots update
   */
  export type slotsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slots
     */
    select?: slotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slots
     */
    omit?: slotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slotsInclude<ExtArgs> | null
    /**
     * The data needed to update a slots.
     */
    data: XOR<slotsUpdateInput, slotsUncheckedUpdateInput>
    /**
     * Choose, which slots to update.
     */
    where: slotsWhereUniqueInput
  }

  /**
   * slots updateMany
   */
  export type slotsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update slots.
     */
    data: XOR<slotsUpdateManyMutationInput, slotsUncheckedUpdateManyInput>
    /**
     * Filter which slots to update
     */
    where?: slotsWhereInput
    /**
     * Limit how many slots to update.
     */
    limit?: number
  }

  /**
   * slots updateManyAndReturn
   */
  export type slotsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slots
     */
    select?: slotsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the slots
     */
    omit?: slotsOmit<ExtArgs> | null
    /**
     * The data used to update slots.
     */
    data: XOR<slotsUpdateManyMutationInput, slotsUncheckedUpdateManyInput>
    /**
     * Filter which slots to update
     */
    where?: slotsWhereInput
    /**
     * Limit how many slots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slotsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * slots upsert
   */
  export type slotsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slots
     */
    select?: slotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slots
     */
    omit?: slotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slotsInclude<ExtArgs> | null
    /**
     * The filter to search for the slots to update in case it exists.
     */
    where: slotsWhereUniqueInput
    /**
     * In case the slots found by the `where` argument doesn't exist, create a new slots with this data.
     */
    create: XOR<slotsCreateInput, slotsUncheckedCreateInput>
    /**
     * In case the slots was found with the provided `where` argument, update it with this data.
     */
    update: XOR<slotsUpdateInput, slotsUncheckedUpdateInput>
  }

  /**
   * slots delete
   */
  export type slotsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slots
     */
    select?: slotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slots
     */
    omit?: slotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slotsInclude<ExtArgs> | null
    /**
     * Filter which slots to delete.
     */
    where: slotsWhereUniqueInput
  }

  /**
   * slots deleteMany
   */
  export type slotsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which slots to delete
     */
    where?: slotsWhereInput
    /**
     * Limit how many slots to delete.
     */
    limit?: number
  }

  /**
   * slots.theme
   */
  export type slots$themeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the themes
     */
    select?: themesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the themes
     */
    omit?: themesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: themesInclude<ExtArgs> | null
    where?: themesWhereInput
  }

  /**
   * slots.slot_mechanics
   */
  export type slots$slot_mechanicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_mechanics
     */
    select?: slot_mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_mechanics
     */
    omit?: slot_mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_mechanicsInclude<ExtArgs> | null
    where?: slot_mechanicsWhereInput
    orderBy?: slot_mechanicsOrderByWithRelationInput | slot_mechanicsOrderByWithRelationInput[]
    cursor?: slot_mechanicsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Slot_mechanicsScalarFieldEnum | Slot_mechanicsScalarFieldEnum[]
  }

  /**
   * slots without action
   */
  export type slotsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slots
     */
    select?: slotsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slots
     */
    omit?: slotsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slotsInclude<ExtArgs> | null
  }


  /**
   * Model slot_mechanics
   */

  export type AggregateSlot_mechanics = {
    _count: Slot_mechanicsCountAggregateOutputType | null
    _min: Slot_mechanicsMinAggregateOutputType | null
    _max: Slot_mechanicsMaxAggregateOutputType | null
  }

  export type Slot_mechanicsMinAggregateOutputType = {
    id: string | null
    slot_id: string | null
    mechanic_id: string | null
    created_at: Date | null
  }

  export type Slot_mechanicsMaxAggregateOutputType = {
    id: string | null
    slot_id: string | null
    mechanic_id: string | null
    created_at: Date | null
  }

  export type Slot_mechanicsCountAggregateOutputType = {
    id: number
    slot_id: number
    mechanic_id: number
    created_at: number
    _all: number
  }


  export type Slot_mechanicsMinAggregateInputType = {
    id?: true
    slot_id?: true
    mechanic_id?: true
    created_at?: true
  }

  export type Slot_mechanicsMaxAggregateInputType = {
    id?: true
    slot_id?: true
    mechanic_id?: true
    created_at?: true
  }

  export type Slot_mechanicsCountAggregateInputType = {
    id?: true
    slot_id?: true
    mechanic_id?: true
    created_at?: true
    _all?: true
  }

  export type Slot_mechanicsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which slot_mechanics to aggregate.
     */
    where?: slot_mechanicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of slot_mechanics to fetch.
     */
    orderBy?: slot_mechanicsOrderByWithRelationInput | slot_mechanicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: slot_mechanicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` slot_mechanics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` slot_mechanics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned slot_mechanics
    **/
    _count?: true | Slot_mechanicsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Slot_mechanicsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Slot_mechanicsMaxAggregateInputType
  }

  export type GetSlot_mechanicsAggregateType<T extends Slot_mechanicsAggregateArgs> = {
        [P in keyof T & keyof AggregateSlot_mechanics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSlot_mechanics[P]>
      : GetScalarType<T[P], AggregateSlot_mechanics[P]>
  }




  export type slot_mechanicsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: slot_mechanicsWhereInput
    orderBy?: slot_mechanicsOrderByWithAggregationInput | slot_mechanicsOrderByWithAggregationInput[]
    by: Slot_mechanicsScalarFieldEnum[] | Slot_mechanicsScalarFieldEnum
    having?: slot_mechanicsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Slot_mechanicsCountAggregateInputType | true
    _min?: Slot_mechanicsMinAggregateInputType
    _max?: Slot_mechanicsMaxAggregateInputType
  }

  export type Slot_mechanicsGroupByOutputType = {
    id: string
    slot_id: string
    mechanic_id: string
    created_at: Date
    _count: Slot_mechanicsCountAggregateOutputType | null
    _min: Slot_mechanicsMinAggregateOutputType | null
    _max: Slot_mechanicsMaxAggregateOutputType | null
  }

  type GetSlot_mechanicsGroupByPayload<T extends slot_mechanicsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Slot_mechanicsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Slot_mechanicsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Slot_mechanicsGroupByOutputType[P]>
            : GetScalarType<T[P], Slot_mechanicsGroupByOutputType[P]>
        }
      >
    >


  export type slot_mechanicsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slot_id?: boolean
    mechanic_id?: boolean
    created_at?: boolean
    slot?: boolean | slotsDefaultArgs<ExtArgs>
    mechanic?: boolean | mechanicsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["slot_mechanics"]>

  export type slot_mechanicsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slot_id?: boolean
    mechanic_id?: boolean
    created_at?: boolean
    slot?: boolean | slotsDefaultArgs<ExtArgs>
    mechanic?: boolean | mechanicsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["slot_mechanics"]>

  export type slot_mechanicsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slot_id?: boolean
    mechanic_id?: boolean
    created_at?: boolean
    slot?: boolean | slotsDefaultArgs<ExtArgs>
    mechanic?: boolean | mechanicsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["slot_mechanics"]>

  export type slot_mechanicsSelectScalar = {
    id?: boolean
    slot_id?: boolean
    mechanic_id?: boolean
    created_at?: boolean
  }

  export type slot_mechanicsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slot_id" | "mechanic_id" | "created_at", ExtArgs["result"]["slot_mechanics"]>
  export type slot_mechanicsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slot?: boolean | slotsDefaultArgs<ExtArgs>
    mechanic?: boolean | mechanicsDefaultArgs<ExtArgs>
  }
  export type slot_mechanicsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slot?: boolean | slotsDefaultArgs<ExtArgs>
    mechanic?: boolean | mechanicsDefaultArgs<ExtArgs>
  }
  export type slot_mechanicsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    slot?: boolean | slotsDefaultArgs<ExtArgs>
    mechanic?: boolean | mechanicsDefaultArgs<ExtArgs>
  }

  export type $slot_mechanicsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "slot_mechanics"
    objects: {
      slot: Prisma.$slotsPayload<ExtArgs>
      mechanic: Prisma.$mechanicsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slot_id: string
      mechanic_id: string
      created_at: Date
    }, ExtArgs["result"]["slot_mechanics"]>
    composites: {}
  }

  type slot_mechanicsGetPayload<S extends boolean | null | undefined | slot_mechanicsDefaultArgs> = $Result.GetResult<Prisma.$slot_mechanicsPayload, S>

  type slot_mechanicsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<slot_mechanicsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Slot_mechanicsCountAggregateInputType | true
    }

  export interface slot_mechanicsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['slot_mechanics'], meta: { name: 'slot_mechanics' } }
    /**
     * Find zero or one Slot_mechanics that matches the filter.
     * @param {slot_mechanicsFindUniqueArgs} args - Arguments to find a Slot_mechanics
     * @example
     * // Get one Slot_mechanics
     * const slot_mechanics = await prisma.slot_mechanics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends slot_mechanicsFindUniqueArgs>(args: SelectSubset<T, slot_mechanicsFindUniqueArgs<ExtArgs>>): Prisma__slot_mechanicsClient<$Result.GetResult<Prisma.$slot_mechanicsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Slot_mechanics that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {slot_mechanicsFindUniqueOrThrowArgs} args - Arguments to find a Slot_mechanics
     * @example
     * // Get one Slot_mechanics
     * const slot_mechanics = await prisma.slot_mechanics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends slot_mechanicsFindUniqueOrThrowArgs>(args: SelectSubset<T, slot_mechanicsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__slot_mechanicsClient<$Result.GetResult<Prisma.$slot_mechanicsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Slot_mechanics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {slot_mechanicsFindFirstArgs} args - Arguments to find a Slot_mechanics
     * @example
     * // Get one Slot_mechanics
     * const slot_mechanics = await prisma.slot_mechanics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends slot_mechanicsFindFirstArgs>(args?: SelectSubset<T, slot_mechanicsFindFirstArgs<ExtArgs>>): Prisma__slot_mechanicsClient<$Result.GetResult<Prisma.$slot_mechanicsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Slot_mechanics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {slot_mechanicsFindFirstOrThrowArgs} args - Arguments to find a Slot_mechanics
     * @example
     * // Get one Slot_mechanics
     * const slot_mechanics = await prisma.slot_mechanics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends slot_mechanicsFindFirstOrThrowArgs>(args?: SelectSubset<T, slot_mechanicsFindFirstOrThrowArgs<ExtArgs>>): Prisma__slot_mechanicsClient<$Result.GetResult<Prisma.$slot_mechanicsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Slot_mechanics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {slot_mechanicsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Slot_mechanics
     * const slot_mechanics = await prisma.slot_mechanics.findMany()
     * 
     * // Get first 10 Slot_mechanics
     * const slot_mechanics = await prisma.slot_mechanics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const slot_mechanicsWithIdOnly = await prisma.slot_mechanics.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends slot_mechanicsFindManyArgs>(args?: SelectSubset<T, slot_mechanicsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$slot_mechanicsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Slot_mechanics.
     * @param {slot_mechanicsCreateArgs} args - Arguments to create a Slot_mechanics.
     * @example
     * // Create one Slot_mechanics
     * const Slot_mechanics = await prisma.slot_mechanics.create({
     *   data: {
     *     // ... data to create a Slot_mechanics
     *   }
     * })
     * 
     */
    create<T extends slot_mechanicsCreateArgs>(args: SelectSubset<T, slot_mechanicsCreateArgs<ExtArgs>>): Prisma__slot_mechanicsClient<$Result.GetResult<Prisma.$slot_mechanicsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Slot_mechanics.
     * @param {slot_mechanicsCreateManyArgs} args - Arguments to create many Slot_mechanics.
     * @example
     * // Create many Slot_mechanics
     * const slot_mechanics = await prisma.slot_mechanics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends slot_mechanicsCreateManyArgs>(args?: SelectSubset<T, slot_mechanicsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Slot_mechanics and returns the data saved in the database.
     * @param {slot_mechanicsCreateManyAndReturnArgs} args - Arguments to create many Slot_mechanics.
     * @example
     * // Create many Slot_mechanics
     * const slot_mechanics = await prisma.slot_mechanics.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Slot_mechanics and only return the `id`
     * const slot_mechanicsWithIdOnly = await prisma.slot_mechanics.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends slot_mechanicsCreateManyAndReturnArgs>(args?: SelectSubset<T, slot_mechanicsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$slot_mechanicsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Slot_mechanics.
     * @param {slot_mechanicsDeleteArgs} args - Arguments to delete one Slot_mechanics.
     * @example
     * // Delete one Slot_mechanics
     * const Slot_mechanics = await prisma.slot_mechanics.delete({
     *   where: {
     *     // ... filter to delete one Slot_mechanics
     *   }
     * })
     * 
     */
    delete<T extends slot_mechanicsDeleteArgs>(args: SelectSubset<T, slot_mechanicsDeleteArgs<ExtArgs>>): Prisma__slot_mechanicsClient<$Result.GetResult<Prisma.$slot_mechanicsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Slot_mechanics.
     * @param {slot_mechanicsUpdateArgs} args - Arguments to update one Slot_mechanics.
     * @example
     * // Update one Slot_mechanics
     * const slot_mechanics = await prisma.slot_mechanics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends slot_mechanicsUpdateArgs>(args: SelectSubset<T, slot_mechanicsUpdateArgs<ExtArgs>>): Prisma__slot_mechanicsClient<$Result.GetResult<Prisma.$slot_mechanicsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Slot_mechanics.
     * @param {slot_mechanicsDeleteManyArgs} args - Arguments to filter Slot_mechanics to delete.
     * @example
     * // Delete a few Slot_mechanics
     * const { count } = await prisma.slot_mechanics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends slot_mechanicsDeleteManyArgs>(args?: SelectSubset<T, slot_mechanicsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Slot_mechanics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {slot_mechanicsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Slot_mechanics
     * const slot_mechanics = await prisma.slot_mechanics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends slot_mechanicsUpdateManyArgs>(args: SelectSubset<T, slot_mechanicsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Slot_mechanics and returns the data updated in the database.
     * @param {slot_mechanicsUpdateManyAndReturnArgs} args - Arguments to update many Slot_mechanics.
     * @example
     * // Update many Slot_mechanics
     * const slot_mechanics = await prisma.slot_mechanics.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Slot_mechanics and only return the `id`
     * const slot_mechanicsWithIdOnly = await prisma.slot_mechanics.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends slot_mechanicsUpdateManyAndReturnArgs>(args: SelectSubset<T, slot_mechanicsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$slot_mechanicsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Slot_mechanics.
     * @param {slot_mechanicsUpsertArgs} args - Arguments to update or create a Slot_mechanics.
     * @example
     * // Update or create a Slot_mechanics
     * const slot_mechanics = await prisma.slot_mechanics.upsert({
     *   create: {
     *     // ... data to create a Slot_mechanics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Slot_mechanics we want to update
     *   }
     * })
     */
    upsert<T extends slot_mechanicsUpsertArgs>(args: SelectSubset<T, slot_mechanicsUpsertArgs<ExtArgs>>): Prisma__slot_mechanicsClient<$Result.GetResult<Prisma.$slot_mechanicsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Slot_mechanics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {slot_mechanicsCountArgs} args - Arguments to filter Slot_mechanics to count.
     * @example
     * // Count the number of Slot_mechanics
     * const count = await prisma.slot_mechanics.count({
     *   where: {
     *     // ... the filter for the Slot_mechanics we want to count
     *   }
     * })
    **/
    count<T extends slot_mechanicsCountArgs>(
      args?: Subset<T, slot_mechanicsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Slot_mechanicsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Slot_mechanics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Slot_mechanicsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Slot_mechanicsAggregateArgs>(args: Subset<T, Slot_mechanicsAggregateArgs>): Prisma.PrismaPromise<GetSlot_mechanicsAggregateType<T>>

    /**
     * Group by Slot_mechanics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {slot_mechanicsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends slot_mechanicsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: slot_mechanicsGroupByArgs['orderBy'] }
        : { orderBy?: slot_mechanicsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, slot_mechanicsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSlot_mechanicsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the slot_mechanics model
   */
  readonly fields: slot_mechanicsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for slot_mechanics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__slot_mechanicsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    slot<T extends slotsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, slotsDefaultArgs<ExtArgs>>): Prisma__slotsClient<$Result.GetResult<Prisma.$slotsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    mechanic<T extends mechanicsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, mechanicsDefaultArgs<ExtArgs>>): Prisma__mechanicsClient<$Result.GetResult<Prisma.$mechanicsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the slot_mechanics model
   */
  interface slot_mechanicsFieldRefs {
    readonly id: FieldRef<"slot_mechanics", 'String'>
    readonly slot_id: FieldRef<"slot_mechanics", 'String'>
    readonly mechanic_id: FieldRef<"slot_mechanics", 'String'>
    readonly created_at: FieldRef<"slot_mechanics", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * slot_mechanics findUnique
   */
  export type slot_mechanicsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_mechanics
     */
    select?: slot_mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_mechanics
     */
    omit?: slot_mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_mechanicsInclude<ExtArgs> | null
    /**
     * Filter, which slot_mechanics to fetch.
     */
    where: slot_mechanicsWhereUniqueInput
  }

  /**
   * slot_mechanics findUniqueOrThrow
   */
  export type slot_mechanicsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_mechanics
     */
    select?: slot_mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_mechanics
     */
    omit?: slot_mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_mechanicsInclude<ExtArgs> | null
    /**
     * Filter, which slot_mechanics to fetch.
     */
    where: slot_mechanicsWhereUniqueInput
  }

  /**
   * slot_mechanics findFirst
   */
  export type slot_mechanicsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_mechanics
     */
    select?: slot_mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_mechanics
     */
    omit?: slot_mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_mechanicsInclude<ExtArgs> | null
    /**
     * Filter, which slot_mechanics to fetch.
     */
    where?: slot_mechanicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of slot_mechanics to fetch.
     */
    orderBy?: slot_mechanicsOrderByWithRelationInput | slot_mechanicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for slot_mechanics.
     */
    cursor?: slot_mechanicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` slot_mechanics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` slot_mechanics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of slot_mechanics.
     */
    distinct?: Slot_mechanicsScalarFieldEnum | Slot_mechanicsScalarFieldEnum[]
  }

  /**
   * slot_mechanics findFirstOrThrow
   */
  export type slot_mechanicsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_mechanics
     */
    select?: slot_mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_mechanics
     */
    omit?: slot_mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_mechanicsInclude<ExtArgs> | null
    /**
     * Filter, which slot_mechanics to fetch.
     */
    where?: slot_mechanicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of slot_mechanics to fetch.
     */
    orderBy?: slot_mechanicsOrderByWithRelationInput | slot_mechanicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for slot_mechanics.
     */
    cursor?: slot_mechanicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` slot_mechanics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` slot_mechanics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of slot_mechanics.
     */
    distinct?: Slot_mechanicsScalarFieldEnum | Slot_mechanicsScalarFieldEnum[]
  }

  /**
   * slot_mechanics findMany
   */
  export type slot_mechanicsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_mechanics
     */
    select?: slot_mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_mechanics
     */
    omit?: slot_mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_mechanicsInclude<ExtArgs> | null
    /**
     * Filter, which slot_mechanics to fetch.
     */
    where?: slot_mechanicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of slot_mechanics to fetch.
     */
    orderBy?: slot_mechanicsOrderByWithRelationInput | slot_mechanicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing slot_mechanics.
     */
    cursor?: slot_mechanicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` slot_mechanics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` slot_mechanics.
     */
    skip?: number
    distinct?: Slot_mechanicsScalarFieldEnum | Slot_mechanicsScalarFieldEnum[]
  }

  /**
   * slot_mechanics create
   */
  export type slot_mechanicsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_mechanics
     */
    select?: slot_mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_mechanics
     */
    omit?: slot_mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_mechanicsInclude<ExtArgs> | null
    /**
     * The data needed to create a slot_mechanics.
     */
    data: XOR<slot_mechanicsCreateInput, slot_mechanicsUncheckedCreateInput>
  }

  /**
   * slot_mechanics createMany
   */
  export type slot_mechanicsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many slot_mechanics.
     */
    data: slot_mechanicsCreateManyInput | slot_mechanicsCreateManyInput[]
  }

  /**
   * slot_mechanics createManyAndReturn
   */
  export type slot_mechanicsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_mechanics
     */
    select?: slot_mechanicsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the slot_mechanics
     */
    omit?: slot_mechanicsOmit<ExtArgs> | null
    /**
     * The data used to create many slot_mechanics.
     */
    data: slot_mechanicsCreateManyInput | slot_mechanicsCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_mechanicsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * slot_mechanics update
   */
  export type slot_mechanicsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_mechanics
     */
    select?: slot_mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_mechanics
     */
    omit?: slot_mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_mechanicsInclude<ExtArgs> | null
    /**
     * The data needed to update a slot_mechanics.
     */
    data: XOR<slot_mechanicsUpdateInput, slot_mechanicsUncheckedUpdateInput>
    /**
     * Choose, which slot_mechanics to update.
     */
    where: slot_mechanicsWhereUniqueInput
  }

  /**
   * slot_mechanics updateMany
   */
  export type slot_mechanicsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update slot_mechanics.
     */
    data: XOR<slot_mechanicsUpdateManyMutationInput, slot_mechanicsUncheckedUpdateManyInput>
    /**
     * Filter which slot_mechanics to update
     */
    where?: slot_mechanicsWhereInput
    /**
     * Limit how many slot_mechanics to update.
     */
    limit?: number
  }

  /**
   * slot_mechanics updateManyAndReturn
   */
  export type slot_mechanicsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_mechanics
     */
    select?: slot_mechanicsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the slot_mechanics
     */
    omit?: slot_mechanicsOmit<ExtArgs> | null
    /**
     * The data used to update slot_mechanics.
     */
    data: XOR<slot_mechanicsUpdateManyMutationInput, slot_mechanicsUncheckedUpdateManyInput>
    /**
     * Filter which slot_mechanics to update
     */
    where?: slot_mechanicsWhereInput
    /**
     * Limit how many slot_mechanics to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_mechanicsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * slot_mechanics upsert
   */
  export type slot_mechanicsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_mechanics
     */
    select?: slot_mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_mechanics
     */
    omit?: slot_mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_mechanicsInclude<ExtArgs> | null
    /**
     * The filter to search for the slot_mechanics to update in case it exists.
     */
    where: slot_mechanicsWhereUniqueInput
    /**
     * In case the slot_mechanics found by the `where` argument doesn't exist, create a new slot_mechanics with this data.
     */
    create: XOR<slot_mechanicsCreateInput, slot_mechanicsUncheckedCreateInput>
    /**
     * In case the slot_mechanics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<slot_mechanicsUpdateInput, slot_mechanicsUncheckedUpdateInput>
  }

  /**
   * slot_mechanics delete
   */
  export type slot_mechanicsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_mechanics
     */
    select?: slot_mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_mechanics
     */
    omit?: slot_mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_mechanicsInclude<ExtArgs> | null
    /**
     * Filter which slot_mechanics to delete.
     */
    where: slot_mechanicsWhereUniqueInput
  }

  /**
   * slot_mechanics deleteMany
   */
  export type slot_mechanicsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which slot_mechanics to delete
     */
    where?: slot_mechanicsWhereInput
    /**
     * Limit how many slot_mechanics to delete.
     */
    limit?: number
  }

  /**
   * slot_mechanics without action
   */
  export type slot_mechanicsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the slot_mechanics
     */
    select?: slot_mechanicsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the slot_mechanics
     */
    omit?: slot_mechanicsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: slot_mechanicsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProvidersScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    logo_url: 'logo_url',
    website_url: 'website_url',
    founded_year: 'founded_year',
    country: 'country',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_recommended: 'is_recommended'
  };

  export type ProvidersScalarFieldEnum = (typeof ProvidersScalarFieldEnum)[keyof typeof ProvidersScalarFieldEnum]


  export const MechanicsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type MechanicsScalarFieldEnum = (typeof MechanicsScalarFieldEnum)[keyof typeof MechanicsScalarFieldEnum]


  export const ThemesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ThemesScalarFieldEnum = (typeof ThemesScalarFieldEnum)[keyof typeof ThemesScalarFieldEnum]


  export const Slot_categoriesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Slot_categoriesScalarFieldEnum = (typeof Slot_categoriesScalarFieldEnum)[keyof typeof Slot_categoriesScalarFieldEnum]


  export const SlotsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    provider_id: 'provider_id',
    category_id: 'category_id',
    theme_id: 'theme_id',
    rtp: 'rtp',
    volatility: 'volatility',
    min_bet: 'min_bet',
    max_bet: 'max_bet',
    max_win: 'max_win',
    paylines: 'paylines',
    reels: 'reels',
    rows: 'rows',
    has_free_spins: 'has_free_spins',
    has_bonus_game: 'has_bonus_game',
    has_wild: 'has_wild',
    has_scatter: 'has_scatter',
    has_multiplier: 'has_multiplier',
    description: 'description',
    image_url: 'image_url',
    demo_url: 'demo_url',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type SlotsScalarFieldEnum = (typeof SlotsScalarFieldEnum)[keyof typeof SlotsScalarFieldEnum]


  export const Slot_mechanicsScalarFieldEnum: {
    id: 'id',
    slot_id: 'slot_id',
    mechanic_id: 'mechanic_id',
    created_at: 'created_at'
  };

  export type Slot_mechanicsScalarFieldEnum = (typeof Slot_mechanicsScalarFieldEnum)[keyof typeof Slot_mechanicsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type providersWhereInput = {
    AND?: providersWhereInput | providersWhereInput[]
    OR?: providersWhereInput[]
    NOT?: providersWhereInput | providersWhereInput[]
    id?: StringFilter<"providers"> | string
    name?: StringFilter<"providers"> | string
    slug?: StringFilter<"providers"> | string
    description?: StringNullableFilter<"providers"> | string | null
    logo_url?: StringNullableFilter<"providers"> | string | null
    website_url?: StringNullableFilter<"providers"> | string | null
    founded_year?: IntNullableFilter<"providers"> | number | null
    country?: StringNullableFilter<"providers"> | string | null
    is_active?: BoolFilter<"providers"> | boolean
    created_at?: DateTimeFilter<"providers"> | Date | string
    updated_at?: DateTimeFilter<"providers"> | Date | string
    is_recommended?: BoolFilter<"providers"> | boolean
    slots?: SlotsListRelationFilter
  }

  export type providersOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    logo_url?: SortOrderInput | SortOrder
    website_url?: SortOrderInput | SortOrder
    founded_year?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_recommended?: SortOrder
    slots?: slotsOrderByRelationAggregateInput
  }

  export type providersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    slug?: string
    AND?: providersWhereInput | providersWhereInput[]
    OR?: providersWhereInput[]
    NOT?: providersWhereInput | providersWhereInput[]
    description?: StringNullableFilter<"providers"> | string | null
    logo_url?: StringNullableFilter<"providers"> | string | null
    website_url?: StringNullableFilter<"providers"> | string | null
    founded_year?: IntNullableFilter<"providers"> | number | null
    country?: StringNullableFilter<"providers"> | string | null
    is_active?: BoolFilter<"providers"> | boolean
    created_at?: DateTimeFilter<"providers"> | Date | string
    updated_at?: DateTimeFilter<"providers"> | Date | string
    is_recommended?: BoolFilter<"providers"> | boolean
    slots?: SlotsListRelationFilter
  }, "id" | "name" | "slug">

  export type providersOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    logo_url?: SortOrderInput | SortOrder
    website_url?: SortOrderInput | SortOrder
    founded_year?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_recommended?: SortOrder
    _count?: providersCountOrderByAggregateInput
    _avg?: providersAvgOrderByAggregateInput
    _max?: providersMaxOrderByAggregateInput
    _min?: providersMinOrderByAggregateInput
    _sum?: providersSumOrderByAggregateInput
  }

  export type providersScalarWhereWithAggregatesInput = {
    AND?: providersScalarWhereWithAggregatesInput | providersScalarWhereWithAggregatesInput[]
    OR?: providersScalarWhereWithAggregatesInput[]
    NOT?: providersScalarWhereWithAggregatesInput | providersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"providers"> | string
    name?: StringWithAggregatesFilter<"providers"> | string
    slug?: StringWithAggregatesFilter<"providers"> | string
    description?: StringNullableWithAggregatesFilter<"providers"> | string | null
    logo_url?: StringNullableWithAggregatesFilter<"providers"> | string | null
    website_url?: StringNullableWithAggregatesFilter<"providers"> | string | null
    founded_year?: IntNullableWithAggregatesFilter<"providers"> | number | null
    country?: StringNullableWithAggregatesFilter<"providers"> | string | null
    is_active?: BoolWithAggregatesFilter<"providers"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"providers"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"providers"> | Date | string
    is_recommended?: BoolWithAggregatesFilter<"providers"> | boolean
  }

  export type mechanicsWhereInput = {
    AND?: mechanicsWhereInput | mechanicsWhereInput[]
    OR?: mechanicsWhereInput[]
    NOT?: mechanicsWhereInput | mechanicsWhereInput[]
    id?: StringFilter<"mechanics"> | string
    name?: StringFilter<"mechanics"> | string
    slug?: StringFilter<"mechanics"> | string
    description?: StringNullableFilter<"mechanics"> | string | null
    created_at?: DateTimeFilter<"mechanics"> | Date | string
    updated_at?: DateTimeFilter<"mechanics"> | Date | string
    slot_mechanics?: Slot_mechanicsListRelationFilter
  }

  export type mechanicsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    slot_mechanics?: slot_mechanicsOrderByRelationAggregateInput
  }

  export type mechanicsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    slug?: string
    AND?: mechanicsWhereInput | mechanicsWhereInput[]
    OR?: mechanicsWhereInput[]
    NOT?: mechanicsWhereInput | mechanicsWhereInput[]
    description?: StringNullableFilter<"mechanics"> | string | null
    created_at?: DateTimeFilter<"mechanics"> | Date | string
    updated_at?: DateTimeFilter<"mechanics"> | Date | string
    slot_mechanics?: Slot_mechanicsListRelationFilter
  }, "id" | "name" | "slug">

  export type mechanicsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: mechanicsCountOrderByAggregateInput
    _max?: mechanicsMaxOrderByAggregateInput
    _min?: mechanicsMinOrderByAggregateInput
  }

  export type mechanicsScalarWhereWithAggregatesInput = {
    AND?: mechanicsScalarWhereWithAggregatesInput | mechanicsScalarWhereWithAggregatesInput[]
    OR?: mechanicsScalarWhereWithAggregatesInput[]
    NOT?: mechanicsScalarWhereWithAggregatesInput | mechanicsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"mechanics"> | string
    name?: StringWithAggregatesFilter<"mechanics"> | string
    slug?: StringWithAggregatesFilter<"mechanics"> | string
    description?: StringNullableWithAggregatesFilter<"mechanics"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"mechanics"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"mechanics"> | Date | string
  }

  export type themesWhereInput = {
    AND?: themesWhereInput | themesWhereInput[]
    OR?: themesWhereInput[]
    NOT?: themesWhereInput | themesWhereInput[]
    id?: StringFilter<"themes"> | string
    name?: StringFilter<"themes"> | string
    slug?: StringFilter<"themes"> | string
    created_at?: DateTimeFilter<"themes"> | Date | string
    updated_at?: DateTimeFilter<"themes"> | Date | string
    slots?: SlotsListRelationFilter
  }

  export type themesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    slots?: slotsOrderByRelationAggregateInput
  }

  export type themesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    slug?: string
    AND?: themesWhereInput | themesWhereInput[]
    OR?: themesWhereInput[]
    NOT?: themesWhereInput | themesWhereInput[]
    created_at?: DateTimeFilter<"themes"> | Date | string
    updated_at?: DateTimeFilter<"themes"> | Date | string
    slots?: SlotsListRelationFilter
  }, "id" | "name" | "slug">

  export type themesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: themesCountOrderByAggregateInput
    _max?: themesMaxOrderByAggregateInput
    _min?: themesMinOrderByAggregateInput
  }

  export type themesScalarWhereWithAggregatesInput = {
    AND?: themesScalarWhereWithAggregatesInput | themesScalarWhereWithAggregatesInput[]
    OR?: themesScalarWhereWithAggregatesInput[]
    NOT?: themesScalarWhereWithAggregatesInput | themesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"themes"> | string
    name?: StringWithAggregatesFilter<"themes"> | string
    slug?: StringWithAggregatesFilter<"themes"> | string
    created_at?: DateTimeWithAggregatesFilter<"themes"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"themes"> | Date | string
  }

  export type slot_categoriesWhereInput = {
    AND?: slot_categoriesWhereInput | slot_categoriesWhereInput[]
    OR?: slot_categoriesWhereInput[]
    NOT?: slot_categoriesWhereInput | slot_categoriesWhereInput[]
    id?: StringFilter<"slot_categories"> | string
    name?: StringFilter<"slot_categories"> | string
    slug?: StringFilter<"slot_categories"> | string
    created_at?: DateTimeFilter<"slot_categories"> | Date | string
    updated_at?: DateTimeFilter<"slot_categories"> | Date | string
    slots?: SlotsListRelationFilter
  }

  export type slot_categoriesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    slots?: slotsOrderByRelationAggregateInput
  }

  export type slot_categoriesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    slug?: string
    AND?: slot_categoriesWhereInput | slot_categoriesWhereInput[]
    OR?: slot_categoriesWhereInput[]
    NOT?: slot_categoriesWhereInput | slot_categoriesWhereInput[]
    created_at?: DateTimeFilter<"slot_categories"> | Date | string
    updated_at?: DateTimeFilter<"slot_categories"> | Date | string
    slots?: SlotsListRelationFilter
  }, "id" | "name" | "slug">

  export type slot_categoriesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: slot_categoriesCountOrderByAggregateInput
    _max?: slot_categoriesMaxOrderByAggregateInput
    _min?: slot_categoriesMinOrderByAggregateInput
  }

  export type slot_categoriesScalarWhereWithAggregatesInput = {
    AND?: slot_categoriesScalarWhereWithAggregatesInput | slot_categoriesScalarWhereWithAggregatesInput[]
    OR?: slot_categoriesScalarWhereWithAggregatesInput[]
    NOT?: slot_categoriesScalarWhereWithAggregatesInput | slot_categoriesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"slot_categories"> | string
    name?: StringWithAggregatesFilter<"slot_categories"> | string
    slug?: StringWithAggregatesFilter<"slot_categories"> | string
    created_at?: DateTimeWithAggregatesFilter<"slot_categories"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"slot_categories"> | Date | string
  }

  export type slotsWhereInput = {
    AND?: slotsWhereInput | slotsWhereInput[]
    OR?: slotsWhereInput[]
    NOT?: slotsWhereInput | slotsWhereInput[]
    id?: StringFilter<"slots"> | string
    name?: StringFilter<"slots"> | string
    slug?: StringFilter<"slots"> | string
    provider_id?: StringFilter<"slots"> | string
    category_id?: StringFilter<"slots"> | string
    theme_id?: StringNullableFilter<"slots"> | string | null
    rtp?: FloatNullableFilter<"slots"> | number | null
    volatility?: StringNullableFilter<"slots"> | string | null
    min_bet?: FloatNullableFilter<"slots"> | number | null
    max_bet?: FloatNullableFilter<"slots"> | number | null
    max_win?: FloatNullableFilter<"slots"> | number | null
    paylines?: IntNullableFilter<"slots"> | number | null
    reels?: IntNullableFilter<"slots"> | number | null
    rows?: IntNullableFilter<"slots"> | number | null
    has_free_spins?: BoolFilter<"slots"> | boolean
    has_bonus_game?: BoolFilter<"slots"> | boolean
    has_wild?: BoolFilter<"slots"> | boolean
    has_scatter?: BoolFilter<"slots"> | boolean
    has_multiplier?: BoolFilter<"slots"> | boolean
    description?: StringNullableFilter<"slots"> | string | null
    image_url?: StringNullableFilter<"slots"> | string | null
    demo_url?: StringNullableFilter<"slots"> | string | null
    is_active?: BoolFilter<"slots"> | boolean
    created_at?: DateTimeFilter<"slots"> | Date | string
    updated_at?: DateTimeFilter<"slots"> | Date | string
    provider?: XOR<ProvidersScalarRelationFilter, providersWhereInput>
    category?: XOR<Slot_categoriesScalarRelationFilter, slot_categoriesWhereInput>
    theme?: XOR<ThemesNullableScalarRelationFilter, themesWhereInput> | null
    slot_mechanics?: Slot_mechanicsListRelationFilter
  }

  export type slotsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    provider_id?: SortOrder
    category_id?: SortOrder
    theme_id?: SortOrderInput | SortOrder
    rtp?: SortOrderInput | SortOrder
    volatility?: SortOrderInput | SortOrder
    min_bet?: SortOrderInput | SortOrder
    max_bet?: SortOrderInput | SortOrder
    max_win?: SortOrderInput | SortOrder
    paylines?: SortOrderInput | SortOrder
    reels?: SortOrderInput | SortOrder
    rows?: SortOrderInput | SortOrder
    has_free_spins?: SortOrder
    has_bonus_game?: SortOrder
    has_wild?: SortOrder
    has_scatter?: SortOrder
    has_multiplier?: SortOrder
    description?: SortOrderInput | SortOrder
    image_url?: SortOrderInput | SortOrder
    demo_url?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    provider?: providersOrderByWithRelationInput
    category?: slot_categoriesOrderByWithRelationInput
    theme?: themesOrderByWithRelationInput
    slot_mechanics?: slot_mechanicsOrderByRelationAggregateInput
  }

  export type slotsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: slotsWhereInput | slotsWhereInput[]
    OR?: slotsWhereInput[]
    NOT?: slotsWhereInput | slotsWhereInput[]
    name?: StringFilter<"slots"> | string
    provider_id?: StringFilter<"slots"> | string
    category_id?: StringFilter<"slots"> | string
    theme_id?: StringNullableFilter<"slots"> | string | null
    rtp?: FloatNullableFilter<"slots"> | number | null
    volatility?: StringNullableFilter<"slots"> | string | null
    min_bet?: FloatNullableFilter<"slots"> | number | null
    max_bet?: FloatNullableFilter<"slots"> | number | null
    max_win?: FloatNullableFilter<"slots"> | number | null
    paylines?: IntNullableFilter<"slots"> | number | null
    reels?: IntNullableFilter<"slots"> | number | null
    rows?: IntNullableFilter<"slots"> | number | null
    has_free_spins?: BoolFilter<"slots"> | boolean
    has_bonus_game?: BoolFilter<"slots"> | boolean
    has_wild?: BoolFilter<"slots"> | boolean
    has_scatter?: BoolFilter<"slots"> | boolean
    has_multiplier?: BoolFilter<"slots"> | boolean
    description?: StringNullableFilter<"slots"> | string | null
    image_url?: StringNullableFilter<"slots"> | string | null
    demo_url?: StringNullableFilter<"slots"> | string | null
    is_active?: BoolFilter<"slots"> | boolean
    created_at?: DateTimeFilter<"slots"> | Date | string
    updated_at?: DateTimeFilter<"slots"> | Date | string
    provider?: XOR<ProvidersScalarRelationFilter, providersWhereInput>
    category?: XOR<Slot_categoriesScalarRelationFilter, slot_categoriesWhereInput>
    theme?: XOR<ThemesNullableScalarRelationFilter, themesWhereInput> | null
    slot_mechanics?: Slot_mechanicsListRelationFilter
  }, "id" | "slug">

  export type slotsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    provider_id?: SortOrder
    category_id?: SortOrder
    theme_id?: SortOrderInput | SortOrder
    rtp?: SortOrderInput | SortOrder
    volatility?: SortOrderInput | SortOrder
    min_bet?: SortOrderInput | SortOrder
    max_bet?: SortOrderInput | SortOrder
    max_win?: SortOrderInput | SortOrder
    paylines?: SortOrderInput | SortOrder
    reels?: SortOrderInput | SortOrder
    rows?: SortOrderInput | SortOrder
    has_free_spins?: SortOrder
    has_bonus_game?: SortOrder
    has_wild?: SortOrder
    has_scatter?: SortOrder
    has_multiplier?: SortOrder
    description?: SortOrderInput | SortOrder
    image_url?: SortOrderInput | SortOrder
    demo_url?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: slotsCountOrderByAggregateInput
    _avg?: slotsAvgOrderByAggregateInput
    _max?: slotsMaxOrderByAggregateInput
    _min?: slotsMinOrderByAggregateInput
    _sum?: slotsSumOrderByAggregateInput
  }

  export type slotsScalarWhereWithAggregatesInput = {
    AND?: slotsScalarWhereWithAggregatesInput | slotsScalarWhereWithAggregatesInput[]
    OR?: slotsScalarWhereWithAggregatesInput[]
    NOT?: slotsScalarWhereWithAggregatesInput | slotsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"slots"> | string
    name?: StringWithAggregatesFilter<"slots"> | string
    slug?: StringWithAggregatesFilter<"slots"> | string
    provider_id?: StringWithAggregatesFilter<"slots"> | string
    category_id?: StringWithAggregatesFilter<"slots"> | string
    theme_id?: StringNullableWithAggregatesFilter<"slots"> | string | null
    rtp?: FloatNullableWithAggregatesFilter<"slots"> | number | null
    volatility?: StringNullableWithAggregatesFilter<"slots"> | string | null
    min_bet?: FloatNullableWithAggregatesFilter<"slots"> | number | null
    max_bet?: FloatNullableWithAggregatesFilter<"slots"> | number | null
    max_win?: FloatNullableWithAggregatesFilter<"slots"> | number | null
    paylines?: IntNullableWithAggregatesFilter<"slots"> | number | null
    reels?: IntNullableWithAggregatesFilter<"slots"> | number | null
    rows?: IntNullableWithAggregatesFilter<"slots"> | number | null
    has_free_spins?: BoolWithAggregatesFilter<"slots"> | boolean
    has_bonus_game?: BoolWithAggregatesFilter<"slots"> | boolean
    has_wild?: BoolWithAggregatesFilter<"slots"> | boolean
    has_scatter?: BoolWithAggregatesFilter<"slots"> | boolean
    has_multiplier?: BoolWithAggregatesFilter<"slots"> | boolean
    description?: StringNullableWithAggregatesFilter<"slots"> | string | null
    image_url?: StringNullableWithAggregatesFilter<"slots"> | string | null
    demo_url?: StringNullableWithAggregatesFilter<"slots"> | string | null
    is_active?: BoolWithAggregatesFilter<"slots"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"slots"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"slots"> | Date | string
  }

  export type slot_mechanicsWhereInput = {
    AND?: slot_mechanicsWhereInput | slot_mechanicsWhereInput[]
    OR?: slot_mechanicsWhereInput[]
    NOT?: slot_mechanicsWhereInput | slot_mechanicsWhereInput[]
    id?: StringFilter<"slot_mechanics"> | string
    slot_id?: StringFilter<"slot_mechanics"> | string
    mechanic_id?: StringFilter<"slot_mechanics"> | string
    created_at?: DateTimeFilter<"slot_mechanics"> | Date | string
    slot?: XOR<SlotsScalarRelationFilter, slotsWhereInput>
    mechanic?: XOR<MechanicsScalarRelationFilter, mechanicsWhereInput>
  }

  export type slot_mechanicsOrderByWithRelationInput = {
    id?: SortOrder
    slot_id?: SortOrder
    mechanic_id?: SortOrder
    created_at?: SortOrder
    slot?: slotsOrderByWithRelationInput
    mechanic?: mechanicsOrderByWithRelationInput
  }

  export type slot_mechanicsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slot_id_mechanic_id?: slot_mechanicsSlot_idMechanic_idCompoundUniqueInput
    AND?: slot_mechanicsWhereInput | slot_mechanicsWhereInput[]
    OR?: slot_mechanicsWhereInput[]
    NOT?: slot_mechanicsWhereInput | slot_mechanicsWhereInput[]
    slot_id?: StringFilter<"slot_mechanics"> | string
    mechanic_id?: StringFilter<"slot_mechanics"> | string
    created_at?: DateTimeFilter<"slot_mechanics"> | Date | string
    slot?: XOR<SlotsScalarRelationFilter, slotsWhereInput>
    mechanic?: XOR<MechanicsScalarRelationFilter, mechanicsWhereInput>
  }, "id" | "slot_id_mechanic_id">

  export type slot_mechanicsOrderByWithAggregationInput = {
    id?: SortOrder
    slot_id?: SortOrder
    mechanic_id?: SortOrder
    created_at?: SortOrder
    _count?: slot_mechanicsCountOrderByAggregateInput
    _max?: slot_mechanicsMaxOrderByAggregateInput
    _min?: slot_mechanicsMinOrderByAggregateInput
  }

  export type slot_mechanicsScalarWhereWithAggregatesInput = {
    AND?: slot_mechanicsScalarWhereWithAggregatesInput | slot_mechanicsScalarWhereWithAggregatesInput[]
    OR?: slot_mechanicsScalarWhereWithAggregatesInput[]
    NOT?: slot_mechanicsScalarWhereWithAggregatesInput | slot_mechanicsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"slot_mechanics"> | string
    slot_id?: StringWithAggregatesFilter<"slot_mechanics"> | string
    mechanic_id?: StringWithAggregatesFilter<"slot_mechanics"> | string
    created_at?: DateTimeWithAggregatesFilter<"slot_mechanics"> | Date | string
  }

  export type providersCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    logo_url?: string | null
    website_url?: string | null
    founded_year?: number | null
    country?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    is_recommended?: boolean
    slots?: slotsCreateNestedManyWithoutProviderInput
  }

  export type providersUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    logo_url?: string | null
    website_url?: string | null
    founded_year?: number | null
    country?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    is_recommended?: boolean
    slots?: slotsUncheckedCreateNestedManyWithoutProviderInput
  }

  export type providersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    website_url?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_recommended?: BoolFieldUpdateOperationsInput | boolean
    slots?: slotsUpdateManyWithoutProviderNestedInput
  }

  export type providersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    website_url?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_recommended?: BoolFieldUpdateOperationsInput | boolean
    slots?: slotsUncheckedUpdateManyWithoutProviderNestedInput
  }

  export type providersCreateManyInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    logo_url?: string | null
    website_url?: string | null
    founded_year?: number | null
    country?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    is_recommended?: boolean
  }

  export type providersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    website_url?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_recommended?: BoolFieldUpdateOperationsInput | boolean
  }

  export type providersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    website_url?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_recommended?: BoolFieldUpdateOperationsInput | boolean
  }

  export type mechanicsCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    slot_mechanics?: slot_mechanicsCreateNestedManyWithoutMechanicInput
  }

  export type mechanicsUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    slot_mechanics?: slot_mechanicsUncheckedCreateNestedManyWithoutMechanicInput
  }

  export type mechanicsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    slot_mechanics?: slot_mechanicsUpdateManyWithoutMechanicNestedInput
  }

  export type mechanicsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    slot_mechanics?: slot_mechanicsUncheckedUpdateManyWithoutMechanicNestedInput
  }

  export type mechanicsCreateManyInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type mechanicsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type mechanicsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type themesCreateInput = {
    id?: string
    name: string
    slug: string
    created_at?: Date | string
    updated_at?: Date | string
    slots?: slotsCreateNestedManyWithoutThemeInput
  }

  export type themesUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    created_at?: Date | string
    updated_at?: Date | string
    slots?: slotsUncheckedCreateNestedManyWithoutThemeInput
  }

  export type themesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    slots?: slotsUpdateManyWithoutThemeNestedInput
  }

  export type themesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    slots?: slotsUncheckedUpdateManyWithoutThemeNestedInput
  }

  export type themesCreateManyInput = {
    id?: string
    name: string
    slug: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type themesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type themesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type slot_categoriesCreateInput = {
    id?: string
    name: string
    slug: string
    created_at?: Date | string
    updated_at?: Date | string
    slots?: slotsCreateNestedManyWithoutCategoryInput
  }

  export type slot_categoriesUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    created_at?: Date | string
    updated_at?: Date | string
    slots?: slotsUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type slot_categoriesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    slots?: slotsUpdateManyWithoutCategoryNestedInput
  }

  export type slot_categoriesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    slots?: slotsUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type slot_categoriesCreateManyInput = {
    id?: string
    name: string
    slug: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type slot_categoriesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type slot_categoriesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type slotsCreateInput = {
    id?: string
    name: string
    slug: string
    rtp?: number | null
    volatility?: string | null
    min_bet?: number | null
    max_bet?: number | null
    max_win?: number | null
    paylines?: number | null
    reels?: number | null
    rows?: number | null
    has_free_spins?: boolean
    has_bonus_game?: boolean
    has_wild?: boolean
    has_scatter?: boolean
    has_multiplier?: boolean
    description?: string | null
    image_url?: string | null
    demo_url?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    provider: providersCreateNestedOneWithoutSlotsInput
    category: slot_categoriesCreateNestedOneWithoutSlotsInput
    theme?: themesCreateNestedOneWithoutSlotsInput
    slot_mechanics?: slot_mechanicsCreateNestedManyWithoutSlotInput
  }

  export type slotsUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    provider_id: string
    category_id: string
    theme_id?: string | null
    rtp?: number | null
    volatility?: string | null
    min_bet?: number | null
    max_bet?: number | null
    max_win?: number | null
    paylines?: number | null
    reels?: number | null
    rows?: number | null
    has_free_spins?: boolean
    has_bonus_game?: boolean
    has_wild?: boolean
    has_scatter?: boolean
    has_multiplier?: boolean
    description?: string | null
    image_url?: string | null
    demo_url?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    slot_mechanics?: slot_mechanicsUncheckedCreateNestedManyWithoutSlotInput
  }

  export type slotsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    rtp?: NullableFloatFieldUpdateOperationsInput | number | null
    volatility?: NullableStringFieldUpdateOperationsInput | string | null
    min_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_win?: NullableFloatFieldUpdateOperationsInput | number | null
    paylines?: NullableIntFieldUpdateOperationsInput | number | null
    reels?: NullableIntFieldUpdateOperationsInput | number | null
    rows?: NullableIntFieldUpdateOperationsInput | number | null
    has_free_spins?: BoolFieldUpdateOperationsInput | boolean
    has_bonus_game?: BoolFieldUpdateOperationsInput | boolean
    has_wild?: BoolFieldUpdateOperationsInput | boolean
    has_scatter?: BoolFieldUpdateOperationsInput | boolean
    has_multiplier?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    demo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: providersUpdateOneRequiredWithoutSlotsNestedInput
    category?: slot_categoriesUpdateOneRequiredWithoutSlotsNestedInput
    theme?: themesUpdateOneWithoutSlotsNestedInput
    slot_mechanics?: slot_mechanicsUpdateManyWithoutSlotNestedInput
  }

  export type slotsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    provider_id?: StringFieldUpdateOperationsInput | string
    category_id?: StringFieldUpdateOperationsInput | string
    theme_id?: NullableStringFieldUpdateOperationsInput | string | null
    rtp?: NullableFloatFieldUpdateOperationsInput | number | null
    volatility?: NullableStringFieldUpdateOperationsInput | string | null
    min_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_win?: NullableFloatFieldUpdateOperationsInput | number | null
    paylines?: NullableIntFieldUpdateOperationsInput | number | null
    reels?: NullableIntFieldUpdateOperationsInput | number | null
    rows?: NullableIntFieldUpdateOperationsInput | number | null
    has_free_spins?: BoolFieldUpdateOperationsInput | boolean
    has_bonus_game?: BoolFieldUpdateOperationsInput | boolean
    has_wild?: BoolFieldUpdateOperationsInput | boolean
    has_scatter?: BoolFieldUpdateOperationsInput | boolean
    has_multiplier?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    demo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    slot_mechanics?: slot_mechanicsUncheckedUpdateManyWithoutSlotNestedInput
  }

  export type slotsCreateManyInput = {
    id?: string
    name: string
    slug: string
    provider_id: string
    category_id: string
    theme_id?: string | null
    rtp?: number | null
    volatility?: string | null
    min_bet?: number | null
    max_bet?: number | null
    max_win?: number | null
    paylines?: number | null
    reels?: number | null
    rows?: number | null
    has_free_spins?: boolean
    has_bonus_game?: boolean
    has_wild?: boolean
    has_scatter?: boolean
    has_multiplier?: boolean
    description?: string | null
    image_url?: string | null
    demo_url?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type slotsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    rtp?: NullableFloatFieldUpdateOperationsInput | number | null
    volatility?: NullableStringFieldUpdateOperationsInput | string | null
    min_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_win?: NullableFloatFieldUpdateOperationsInput | number | null
    paylines?: NullableIntFieldUpdateOperationsInput | number | null
    reels?: NullableIntFieldUpdateOperationsInput | number | null
    rows?: NullableIntFieldUpdateOperationsInput | number | null
    has_free_spins?: BoolFieldUpdateOperationsInput | boolean
    has_bonus_game?: BoolFieldUpdateOperationsInput | boolean
    has_wild?: BoolFieldUpdateOperationsInput | boolean
    has_scatter?: BoolFieldUpdateOperationsInput | boolean
    has_multiplier?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    demo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type slotsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    provider_id?: StringFieldUpdateOperationsInput | string
    category_id?: StringFieldUpdateOperationsInput | string
    theme_id?: NullableStringFieldUpdateOperationsInput | string | null
    rtp?: NullableFloatFieldUpdateOperationsInput | number | null
    volatility?: NullableStringFieldUpdateOperationsInput | string | null
    min_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_win?: NullableFloatFieldUpdateOperationsInput | number | null
    paylines?: NullableIntFieldUpdateOperationsInput | number | null
    reels?: NullableIntFieldUpdateOperationsInput | number | null
    rows?: NullableIntFieldUpdateOperationsInput | number | null
    has_free_spins?: BoolFieldUpdateOperationsInput | boolean
    has_bonus_game?: BoolFieldUpdateOperationsInput | boolean
    has_wild?: BoolFieldUpdateOperationsInput | boolean
    has_scatter?: BoolFieldUpdateOperationsInput | boolean
    has_multiplier?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    demo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type slot_mechanicsCreateInput = {
    id?: string
    created_at?: Date | string
    slot: slotsCreateNestedOneWithoutSlot_mechanicsInput
    mechanic: mechanicsCreateNestedOneWithoutSlot_mechanicsInput
  }

  export type slot_mechanicsUncheckedCreateInput = {
    id?: string
    slot_id: string
    mechanic_id: string
    created_at?: Date | string
  }

  export type slot_mechanicsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    slot?: slotsUpdateOneRequiredWithoutSlot_mechanicsNestedInput
    mechanic?: mechanicsUpdateOneRequiredWithoutSlot_mechanicsNestedInput
  }

  export type slot_mechanicsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slot_id?: StringFieldUpdateOperationsInput | string
    mechanic_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type slot_mechanicsCreateManyInput = {
    id?: string
    slot_id: string
    mechanic_id: string
    created_at?: Date | string
  }

  export type slot_mechanicsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type slot_mechanicsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slot_id?: StringFieldUpdateOperationsInput | string
    mechanic_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SlotsListRelationFilter = {
    every?: slotsWhereInput
    some?: slotsWhereInput
    none?: slotsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type slotsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type providersCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    logo_url?: SortOrder
    website_url?: SortOrder
    founded_year?: SortOrder
    country?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_recommended?: SortOrder
  }

  export type providersAvgOrderByAggregateInput = {
    founded_year?: SortOrder
  }

  export type providersMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    logo_url?: SortOrder
    website_url?: SortOrder
    founded_year?: SortOrder
    country?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_recommended?: SortOrder
  }

  export type providersMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    logo_url?: SortOrder
    website_url?: SortOrder
    founded_year?: SortOrder
    country?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_recommended?: SortOrder
  }

  export type providersSumOrderByAggregateInput = {
    founded_year?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type Slot_mechanicsListRelationFilter = {
    every?: slot_mechanicsWhereInput
    some?: slot_mechanicsWhereInput
    none?: slot_mechanicsWhereInput
  }

  export type slot_mechanicsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type mechanicsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type mechanicsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type mechanicsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type themesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type themesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type themesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type slot_categoriesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type slot_categoriesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type slot_categoriesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ProvidersScalarRelationFilter = {
    is?: providersWhereInput
    isNot?: providersWhereInput
  }

  export type Slot_categoriesScalarRelationFilter = {
    is?: slot_categoriesWhereInput
    isNot?: slot_categoriesWhereInput
  }

  export type ThemesNullableScalarRelationFilter = {
    is?: themesWhereInput | null
    isNot?: themesWhereInput | null
  }

  export type slotsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    provider_id?: SortOrder
    category_id?: SortOrder
    theme_id?: SortOrder
    rtp?: SortOrder
    volatility?: SortOrder
    min_bet?: SortOrder
    max_bet?: SortOrder
    max_win?: SortOrder
    paylines?: SortOrder
    reels?: SortOrder
    rows?: SortOrder
    has_free_spins?: SortOrder
    has_bonus_game?: SortOrder
    has_wild?: SortOrder
    has_scatter?: SortOrder
    has_multiplier?: SortOrder
    description?: SortOrder
    image_url?: SortOrder
    demo_url?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type slotsAvgOrderByAggregateInput = {
    rtp?: SortOrder
    min_bet?: SortOrder
    max_bet?: SortOrder
    max_win?: SortOrder
    paylines?: SortOrder
    reels?: SortOrder
    rows?: SortOrder
  }

  export type slotsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    provider_id?: SortOrder
    category_id?: SortOrder
    theme_id?: SortOrder
    rtp?: SortOrder
    volatility?: SortOrder
    min_bet?: SortOrder
    max_bet?: SortOrder
    max_win?: SortOrder
    paylines?: SortOrder
    reels?: SortOrder
    rows?: SortOrder
    has_free_spins?: SortOrder
    has_bonus_game?: SortOrder
    has_wild?: SortOrder
    has_scatter?: SortOrder
    has_multiplier?: SortOrder
    description?: SortOrder
    image_url?: SortOrder
    demo_url?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type slotsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    provider_id?: SortOrder
    category_id?: SortOrder
    theme_id?: SortOrder
    rtp?: SortOrder
    volatility?: SortOrder
    min_bet?: SortOrder
    max_bet?: SortOrder
    max_win?: SortOrder
    paylines?: SortOrder
    reels?: SortOrder
    rows?: SortOrder
    has_free_spins?: SortOrder
    has_bonus_game?: SortOrder
    has_wild?: SortOrder
    has_scatter?: SortOrder
    has_multiplier?: SortOrder
    description?: SortOrder
    image_url?: SortOrder
    demo_url?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type slotsSumOrderByAggregateInput = {
    rtp?: SortOrder
    min_bet?: SortOrder
    max_bet?: SortOrder
    max_win?: SortOrder
    paylines?: SortOrder
    reels?: SortOrder
    rows?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type SlotsScalarRelationFilter = {
    is?: slotsWhereInput
    isNot?: slotsWhereInput
  }

  export type MechanicsScalarRelationFilter = {
    is?: mechanicsWhereInput
    isNot?: mechanicsWhereInput
  }

  export type slot_mechanicsSlot_idMechanic_idCompoundUniqueInput = {
    slot_id: string
    mechanic_id: string
  }

  export type slot_mechanicsCountOrderByAggregateInput = {
    id?: SortOrder
    slot_id?: SortOrder
    mechanic_id?: SortOrder
    created_at?: SortOrder
  }

  export type slot_mechanicsMaxOrderByAggregateInput = {
    id?: SortOrder
    slot_id?: SortOrder
    mechanic_id?: SortOrder
    created_at?: SortOrder
  }

  export type slot_mechanicsMinOrderByAggregateInput = {
    id?: SortOrder
    slot_id?: SortOrder
    mechanic_id?: SortOrder
    created_at?: SortOrder
  }

  export type slotsCreateNestedManyWithoutProviderInput = {
    create?: XOR<slotsCreateWithoutProviderInput, slotsUncheckedCreateWithoutProviderInput> | slotsCreateWithoutProviderInput[] | slotsUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: slotsCreateOrConnectWithoutProviderInput | slotsCreateOrConnectWithoutProviderInput[]
    createMany?: slotsCreateManyProviderInputEnvelope
    connect?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
  }

  export type slotsUncheckedCreateNestedManyWithoutProviderInput = {
    create?: XOR<slotsCreateWithoutProviderInput, slotsUncheckedCreateWithoutProviderInput> | slotsCreateWithoutProviderInput[] | slotsUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: slotsCreateOrConnectWithoutProviderInput | slotsCreateOrConnectWithoutProviderInput[]
    createMany?: slotsCreateManyProviderInputEnvelope
    connect?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type slotsUpdateManyWithoutProviderNestedInput = {
    create?: XOR<slotsCreateWithoutProviderInput, slotsUncheckedCreateWithoutProviderInput> | slotsCreateWithoutProviderInput[] | slotsUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: slotsCreateOrConnectWithoutProviderInput | slotsCreateOrConnectWithoutProviderInput[]
    upsert?: slotsUpsertWithWhereUniqueWithoutProviderInput | slotsUpsertWithWhereUniqueWithoutProviderInput[]
    createMany?: slotsCreateManyProviderInputEnvelope
    set?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    disconnect?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    delete?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    connect?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    update?: slotsUpdateWithWhereUniqueWithoutProviderInput | slotsUpdateWithWhereUniqueWithoutProviderInput[]
    updateMany?: slotsUpdateManyWithWhereWithoutProviderInput | slotsUpdateManyWithWhereWithoutProviderInput[]
    deleteMany?: slotsScalarWhereInput | slotsScalarWhereInput[]
  }

  export type slotsUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: XOR<slotsCreateWithoutProviderInput, slotsUncheckedCreateWithoutProviderInput> | slotsCreateWithoutProviderInput[] | slotsUncheckedCreateWithoutProviderInput[]
    connectOrCreate?: slotsCreateOrConnectWithoutProviderInput | slotsCreateOrConnectWithoutProviderInput[]
    upsert?: slotsUpsertWithWhereUniqueWithoutProviderInput | slotsUpsertWithWhereUniqueWithoutProviderInput[]
    createMany?: slotsCreateManyProviderInputEnvelope
    set?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    disconnect?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    delete?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    connect?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    update?: slotsUpdateWithWhereUniqueWithoutProviderInput | slotsUpdateWithWhereUniqueWithoutProviderInput[]
    updateMany?: slotsUpdateManyWithWhereWithoutProviderInput | slotsUpdateManyWithWhereWithoutProviderInput[]
    deleteMany?: slotsScalarWhereInput | slotsScalarWhereInput[]
  }

  export type slot_mechanicsCreateNestedManyWithoutMechanicInput = {
    create?: XOR<slot_mechanicsCreateWithoutMechanicInput, slot_mechanicsUncheckedCreateWithoutMechanicInput> | slot_mechanicsCreateWithoutMechanicInput[] | slot_mechanicsUncheckedCreateWithoutMechanicInput[]
    connectOrCreate?: slot_mechanicsCreateOrConnectWithoutMechanicInput | slot_mechanicsCreateOrConnectWithoutMechanicInput[]
    createMany?: slot_mechanicsCreateManyMechanicInputEnvelope
    connect?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
  }

  export type slot_mechanicsUncheckedCreateNestedManyWithoutMechanicInput = {
    create?: XOR<slot_mechanicsCreateWithoutMechanicInput, slot_mechanicsUncheckedCreateWithoutMechanicInput> | slot_mechanicsCreateWithoutMechanicInput[] | slot_mechanicsUncheckedCreateWithoutMechanicInput[]
    connectOrCreate?: slot_mechanicsCreateOrConnectWithoutMechanicInput | slot_mechanicsCreateOrConnectWithoutMechanicInput[]
    createMany?: slot_mechanicsCreateManyMechanicInputEnvelope
    connect?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
  }

  export type slot_mechanicsUpdateManyWithoutMechanicNestedInput = {
    create?: XOR<slot_mechanicsCreateWithoutMechanicInput, slot_mechanicsUncheckedCreateWithoutMechanicInput> | slot_mechanicsCreateWithoutMechanicInput[] | slot_mechanicsUncheckedCreateWithoutMechanicInput[]
    connectOrCreate?: slot_mechanicsCreateOrConnectWithoutMechanicInput | slot_mechanicsCreateOrConnectWithoutMechanicInput[]
    upsert?: slot_mechanicsUpsertWithWhereUniqueWithoutMechanicInput | slot_mechanicsUpsertWithWhereUniqueWithoutMechanicInput[]
    createMany?: slot_mechanicsCreateManyMechanicInputEnvelope
    set?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
    disconnect?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
    delete?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
    connect?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
    update?: slot_mechanicsUpdateWithWhereUniqueWithoutMechanicInput | slot_mechanicsUpdateWithWhereUniqueWithoutMechanicInput[]
    updateMany?: slot_mechanicsUpdateManyWithWhereWithoutMechanicInput | slot_mechanicsUpdateManyWithWhereWithoutMechanicInput[]
    deleteMany?: slot_mechanicsScalarWhereInput | slot_mechanicsScalarWhereInput[]
  }

  export type slot_mechanicsUncheckedUpdateManyWithoutMechanicNestedInput = {
    create?: XOR<slot_mechanicsCreateWithoutMechanicInput, slot_mechanicsUncheckedCreateWithoutMechanicInput> | slot_mechanicsCreateWithoutMechanicInput[] | slot_mechanicsUncheckedCreateWithoutMechanicInput[]
    connectOrCreate?: slot_mechanicsCreateOrConnectWithoutMechanicInput | slot_mechanicsCreateOrConnectWithoutMechanicInput[]
    upsert?: slot_mechanicsUpsertWithWhereUniqueWithoutMechanicInput | slot_mechanicsUpsertWithWhereUniqueWithoutMechanicInput[]
    createMany?: slot_mechanicsCreateManyMechanicInputEnvelope
    set?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
    disconnect?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
    delete?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
    connect?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
    update?: slot_mechanicsUpdateWithWhereUniqueWithoutMechanicInput | slot_mechanicsUpdateWithWhereUniqueWithoutMechanicInput[]
    updateMany?: slot_mechanicsUpdateManyWithWhereWithoutMechanicInput | slot_mechanicsUpdateManyWithWhereWithoutMechanicInput[]
    deleteMany?: slot_mechanicsScalarWhereInput | slot_mechanicsScalarWhereInput[]
  }

  export type slotsCreateNestedManyWithoutThemeInput = {
    create?: XOR<slotsCreateWithoutThemeInput, slotsUncheckedCreateWithoutThemeInput> | slotsCreateWithoutThemeInput[] | slotsUncheckedCreateWithoutThemeInput[]
    connectOrCreate?: slotsCreateOrConnectWithoutThemeInput | slotsCreateOrConnectWithoutThemeInput[]
    createMany?: slotsCreateManyThemeInputEnvelope
    connect?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
  }

  export type slotsUncheckedCreateNestedManyWithoutThemeInput = {
    create?: XOR<slotsCreateWithoutThemeInput, slotsUncheckedCreateWithoutThemeInput> | slotsCreateWithoutThemeInput[] | slotsUncheckedCreateWithoutThemeInput[]
    connectOrCreate?: slotsCreateOrConnectWithoutThemeInput | slotsCreateOrConnectWithoutThemeInput[]
    createMany?: slotsCreateManyThemeInputEnvelope
    connect?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
  }

  export type slotsUpdateManyWithoutThemeNestedInput = {
    create?: XOR<slotsCreateWithoutThemeInput, slotsUncheckedCreateWithoutThemeInput> | slotsCreateWithoutThemeInput[] | slotsUncheckedCreateWithoutThemeInput[]
    connectOrCreate?: slotsCreateOrConnectWithoutThemeInput | slotsCreateOrConnectWithoutThemeInput[]
    upsert?: slotsUpsertWithWhereUniqueWithoutThemeInput | slotsUpsertWithWhereUniqueWithoutThemeInput[]
    createMany?: slotsCreateManyThemeInputEnvelope
    set?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    disconnect?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    delete?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    connect?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    update?: slotsUpdateWithWhereUniqueWithoutThemeInput | slotsUpdateWithWhereUniqueWithoutThemeInput[]
    updateMany?: slotsUpdateManyWithWhereWithoutThemeInput | slotsUpdateManyWithWhereWithoutThemeInput[]
    deleteMany?: slotsScalarWhereInput | slotsScalarWhereInput[]
  }

  export type slotsUncheckedUpdateManyWithoutThemeNestedInput = {
    create?: XOR<slotsCreateWithoutThemeInput, slotsUncheckedCreateWithoutThemeInput> | slotsCreateWithoutThemeInput[] | slotsUncheckedCreateWithoutThemeInput[]
    connectOrCreate?: slotsCreateOrConnectWithoutThemeInput | slotsCreateOrConnectWithoutThemeInput[]
    upsert?: slotsUpsertWithWhereUniqueWithoutThemeInput | slotsUpsertWithWhereUniqueWithoutThemeInput[]
    createMany?: slotsCreateManyThemeInputEnvelope
    set?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    disconnect?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    delete?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    connect?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    update?: slotsUpdateWithWhereUniqueWithoutThemeInput | slotsUpdateWithWhereUniqueWithoutThemeInput[]
    updateMany?: slotsUpdateManyWithWhereWithoutThemeInput | slotsUpdateManyWithWhereWithoutThemeInput[]
    deleteMany?: slotsScalarWhereInput | slotsScalarWhereInput[]
  }

  export type slotsCreateNestedManyWithoutCategoryInput = {
    create?: XOR<slotsCreateWithoutCategoryInput, slotsUncheckedCreateWithoutCategoryInput> | slotsCreateWithoutCategoryInput[] | slotsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: slotsCreateOrConnectWithoutCategoryInput | slotsCreateOrConnectWithoutCategoryInput[]
    createMany?: slotsCreateManyCategoryInputEnvelope
    connect?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
  }

  export type slotsUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<slotsCreateWithoutCategoryInput, slotsUncheckedCreateWithoutCategoryInput> | slotsCreateWithoutCategoryInput[] | slotsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: slotsCreateOrConnectWithoutCategoryInput | slotsCreateOrConnectWithoutCategoryInput[]
    createMany?: slotsCreateManyCategoryInputEnvelope
    connect?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
  }

  export type slotsUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<slotsCreateWithoutCategoryInput, slotsUncheckedCreateWithoutCategoryInput> | slotsCreateWithoutCategoryInput[] | slotsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: slotsCreateOrConnectWithoutCategoryInput | slotsCreateOrConnectWithoutCategoryInput[]
    upsert?: slotsUpsertWithWhereUniqueWithoutCategoryInput | slotsUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: slotsCreateManyCategoryInputEnvelope
    set?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    disconnect?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    delete?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    connect?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    update?: slotsUpdateWithWhereUniqueWithoutCategoryInput | slotsUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: slotsUpdateManyWithWhereWithoutCategoryInput | slotsUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: slotsScalarWhereInput | slotsScalarWhereInput[]
  }

  export type slotsUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<slotsCreateWithoutCategoryInput, slotsUncheckedCreateWithoutCategoryInput> | slotsCreateWithoutCategoryInput[] | slotsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: slotsCreateOrConnectWithoutCategoryInput | slotsCreateOrConnectWithoutCategoryInput[]
    upsert?: slotsUpsertWithWhereUniqueWithoutCategoryInput | slotsUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: slotsCreateManyCategoryInputEnvelope
    set?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    disconnect?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    delete?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    connect?: slotsWhereUniqueInput | slotsWhereUniqueInput[]
    update?: slotsUpdateWithWhereUniqueWithoutCategoryInput | slotsUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: slotsUpdateManyWithWhereWithoutCategoryInput | slotsUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: slotsScalarWhereInput | slotsScalarWhereInput[]
  }

  export type providersCreateNestedOneWithoutSlotsInput = {
    create?: XOR<providersCreateWithoutSlotsInput, providersUncheckedCreateWithoutSlotsInput>
    connectOrCreate?: providersCreateOrConnectWithoutSlotsInput
    connect?: providersWhereUniqueInput
  }

  export type slot_categoriesCreateNestedOneWithoutSlotsInput = {
    create?: XOR<slot_categoriesCreateWithoutSlotsInput, slot_categoriesUncheckedCreateWithoutSlotsInput>
    connectOrCreate?: slot_categoriesCreateOrConnectWithoutSlotsInput
    connect?: slot_categoriesWhereUniqueInput
  }

  export type themesCreateNestedOneWithoutSlotsInput = {
    create?: XOR<themesCreateWithoutSlotsInput, themesUncheckedCreateWithoutSlotsInput>
    connectOrCreate?: themesCreateOrConnectWithoutSlotsInput
    connect?: themesWhereUniqueInput
  }

  export type slot_mechanicsCreateNestedManyWithoutSlotInput = {
    create?: XOR<slot_mechanicsCreateWithoutSlotInput, slot_mechanicsUncheckedCreateWithoutSlotInput> | slot_mechanicsCreateWithoutSlotInput[] | slot_mechanicsUncheckedCreateWithoutSlotInput[]
    connectOrCreate?: slot_mechanicsCreateOrConnectWithoutSlotInput | slot_mechanicsCreateOrConnectWithoutSlotInput[]
    createMany?: slot_mechanicsCreateManySlotInputEnvelope
    connect?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
  }

  export type slot_mechanicsUncheckedCreateNestedManyWithoutSlotInput = {
    create?: XOR<slot_mechanicsCreateWithoutSlotInput, slot_mechanicsUncheckedCreateWithoutSlotInput> | slot_mechanicsCreateWithoutSlotInput[] | slot_mechanicsUncheckedCreateWithoutSlotInput[]
    connectOrCreate?: slot_mechanicsCreateOrConnectWithoutSlotInput | slot_mechanicsCreateOrConnectWithoutSlotInput[]
    createMany?: slot_mechanicsCreateManySlotInputEnvelope
    connect?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type providersUpdateOneRequiredWithoutSlotsNestedInput = {
    create?: XOR<providersCreateWithoutSlotsInput, providersUncheckedCreateWithoutSlotsInput>
    connectOrCreate?: providersCreateOrConnectWithoutSlotsInput
    upsert?: providersUpsertWithoutSlotsInput
    connect?: providersWhereUniqueInput
    update?: XOR<XOR<providersUpdateToOneWithWhereWithoutSlotsInput, providersUpdateWithoutSlotsInput>, providersUncheckedUpdateWithoutSlotsInput>
  }

  export type slot_categoriesUpdateOneRequiredWithoutSlotsNestedInput = {
    create?: XOR<slot_categoriesCreateWithoutSlotsInput, slot_categoriesUncheckedCreateWithoutSlotsInput>
    connectOrCreate?: slot_categoriesCreateOrConnectWithoutSlotsInput
    upsert?: slot_categoriesUpsertWithoutSlotsInput
    connect?: slot_categoriesWhereUniqueInput
    update?: XOR<XOR<slot_categoriesUpdateToOneWithWhereWithoutSlotsInput, slot_categoriesUpdateWithoutSlotsInput>, slot_categoriesUncheckedUpdateWithoutSlotsInput>
  }

  export type themesUpdateOneWithoutSlotsNestedInput = {
    create?: XOR<themesCreateWithoutSlotsInput, themesUncheckedCreateWithoutSlotsInput>
    connectOrCreate?: themesCreateOrConnectWithoutSlotsInput
    upsert?: themesUpsertWithoutSlotsInput
    disconnect?: themesWhereInput | boolean
    delete?: themesWhereInput | boolean
    connect?: themesWhereUniqueInput
    update?: XOR<XOR<themesUpdateToOneWithWhereWithoutSlotsInput, themesUpdateWithoutSlotsInput>, themesUncheckedUpdateWithoutSlotsInput>
  }

  export type slot_mechanicsUpdateManyWithoutSlotNestedInput = {
    create?: XOR<slot_mechanicsCreateWithoutSlotInput, slot_mechanicsUncheckedCreateWithoutSlotInput> | slot_mechanicsCreateWithoutSlotInput[] | slot_mechanicsUncheckedCreateWithoutSlotInput[]
    connectOrCreate?: slot_mechanicsCreateOrConnectWithoutSlotInput | slot_mechanicsCreateOrConnectWithoutSlotInput[]
    upsert?: slot_mechanicsUpsertWithWhereUniqueWithoutSlotInput | slot_mechanicsUpsertWithWhereUniqueWithoutSlotInput[]
    createMany?: slot_mechanicsCreateManySlotInputEnvelope
    set?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
    disconnect?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
    delete?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
    connect?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
    update?: slot_mechanicsUpdateWithWhereUniqueWithoutSlotInput | slot_mechanicsUpdateWithWhereUniqueWithoutSlotInput[]
    updateMany?: slot_mechanicsUpdateManyWithWhereWithoutSlotInput | slot_mechanicsUpdateManyWithWhereWithoutSlotInput[]
    deleteMany?: slot_mechanicsScalarWhereInput | slot_mechanicsScalarWhereInput[]
  }

  export type slot_mechanicsUncheckedUpdateManyWithoutSlotNestedInput = {
    create?: XOR<slot_mechanicsCreateWithoutSlotInput, slot_mechanicsUncheckedCreateWithoutSlotInput> | slot_mechanicsCreateWithoutSlotInput[] | slot_mechanicsUncheckedCreateWithoutSlotInput[]
    connectOrCreate?: slot_mechanicsCreateOrConnectWithoutSlotInput | slot_mechanicsCreateOrConnectWithoutSlotInput[]
    upsert?: slot_mechanicsUpsertWithWhereUniqueWithoutSlotInput | slot_mechanicsUpsertWithWhereUniqueWithoutSlotInput[]
    createMany?: slot_mechanicsCreateManySlotInputEnvelope
    set?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
    disconnect?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
    delete?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
    connect?: slot_mechanicsWhereUniqueInput | slot_mechanicsWhereUniqueInput[]
    update?: slot_mechanicsUpdateWithWhereUniqueWithoutSlotInput | slot_mechanicsUpdateWithWhereUniqueWithoutSlotInput[]
    updateMany?: slot_mechanicsUpdateManyWithWhereWithoutSlotInput | slot_mechanicsUpdateManyWithWhereWithoutSlotInput[]
    deleteMany?: slot_mechanicsScalarWhereInput | slot_mechanicsScalarWhereInput[]
  }

  export type slotsCreateNestedOneWithoutSlot_mechanicsInput = {
    create?: XOR<slotsCreateWithoutSlot_mechanicsInput, slotsUncheckedCreateWithoutSlot_mechanicsInput>
    connectOrCreate?: slotsCreateOrConnectWithoutSlot_mechanicsInput
    connect?: slotsWhereUniqueInput
  }

  export type mechanicsCreateNestedOneWithoutSlot_mechanicsInput = {
    create?: XOR<mechanicsCreateWithoutSlot_mechanicsInput, mechanicsUncheckedCreateWithoutSlot_mechanicsInput>
    connectOrCreate?: mechanicsCreateOrConnectWithoutSlot_mechanicsInput
    connect?: mechanicsWhereUniqueInput
  }

  export type slotsUpdateOneRequiredWithoutSlot_mechanicsNestedInput = {
    create?: XOR<slotsCreateWithoutSlot_mechanicsInput, slotsUncheckedCreateWithoutSlot_mechanicsInput>
    connectOrCreate?: slotsCreateOrConnectWithoutSlot_mechanicsInput
    upsert?: slotsUpsertWithoutSlot_mechanicsInput
    connect?: slotsWhereUniqueInput
    update?: XOR<XOR<slotsUpdateToOneWithWhereWithoutSlot_mechanicsInput, slotsUpdateWithoutSlot_mechanicsInput>, slotsUncheckedUpdateWithoutSlot_mechanicsInput>
  }

  export type mechanicsUpdateOneRequiredWithoutSlot_mechanicsNestedInput = {
    create?: XOR<mechanicsCreateWithoutSlot_mechanicsInput, mechanicsUncheckedCreateWithoutSlot_mechanicsInput>
    connectOrCreate?: mechanicsCreateOrConnectWithoutSlot_mechanicsInput
    upsert?: mechanicsUpsertWithoutSlot_mechanicsInput
    connect?: mechanicsWhereUniqueInput
    update?: XOR<XOR<mechanicsUpdateToOneWithWhereWithoutSlot_mechanicsInput, mechanicsUpdateWithoutSlot_mechanicsInput>, mechanicsUncheckedUpdateWithoutSlot_mechanicsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type slotsCreateWithoutProviderInput = {
    id?: string
    name: string
    slug: string
    rtp?: number | null
    volatility?: string | null
    min_bet?: number | null
    max_bet?: number | null
    max_win?: number | null
    paylines?: number | null
    reels?: number | null
    rows?: number | null
    has_free_spins?: boolean
    has_bonus_game?: boolean
    has_wild?: boolean
    has_scatter?: boolean
    has_multiplier?: boolean
    description?: string | null
    image_url?: string | null
    demo_url?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    category: slot_categoriesCreateNestedOneWithoutSlotsInput
    theme?: themesCreateNestedOneWithoutSlotsInput
    slot_mechanics?: slot_mechanicsCreateNestedManyWithoutSlotInput
  }

  export type slotsUncheckedCreateWithoutProviderInput = {
    id?: string
    name: string
    slug: string
    category_id: string
    theme_id?: string | null
    rtp?: number | null
    volatility?: string | null
    min_bet?: number | null
    max_bet?: number | null
    max_win?: number | null
    paylines?: number | null
    reels?: number | null
    rows?: number | null
    has_free_spins?: boolean
    has_bonus_game?: boolean
    has_wild?: boolean
    has_scatter?: boolean
    has_multiplier?: boolean
    description?: string | null
    image_url?: string | null
    demo_url?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    slot_mechanics?: slot_mechanicsUncheckedCreateNestedManyWithoutSlotInput
  }

  export type slotsCreateOrConnectWithoutProviderInput = {
    where: slotsWhereUniqueInput
    create: XOR<slotsCreateWithoutProviderInput, slotsUncheckedCreateWithoutProviderInput>
  }

  export type slotsCreateManyProviderInputEnvelope = {
    data: slotsCreateManyProviderInput | slotsCreateManyProviderInput[]
  }

  export type slotsUpsertWithWhereUniqueWithoutProviderInput = {
    where: slotsWhereUniqueInput
    update: XOR<slotsUpdateWithoutProviderInput, slotsUncheckedUpdateWithoutProviderInput>
    create: XOR<slotsCreateWithoutProviderInput, slotsUncheckedCreateWithoutProviderInput>
  }

  export type slotsUpdateWithWhereUniqueWithoutProviderInput = {
    where: slotsWhereUniqueInput
    data: XOR<slotsUpdateWithoutProviderInput, slotsUncheckedUpdateWithoutProviderInput>
  }

  export type slotsUpdateManyWithWhereWithoutProviderInput = {
    where: slotsScalarWhereInput
    data: XOR<slotsUpdateManyMutationInput, slotsUncheckedUpdateManyWithoutProviderInput>
  }

  export type slotsScalarWhereInput = {
    AND?: slotsScalarWhereInput | slotsScalarWhereInput[]
    OR?: slotsScalarWhereInput[]
    NOT?: slotsScalarWhereInput | slotsScalarWhereInput[]
    id?: StringFilter<"slots"> | string
    name?: StringFilter<"slots"> | string
    slug?: StringFilter<"slots"> | string
    provider_id?: StringFilter<"slots"> | string
    category_id?: StringFilter<"slots"> | string
    theme_id?: StringNullableFilter<"slots"> | string | null
    rtp?: FloatNullableFilter<"slots"> | number | null
    volatility?: StringNullableFilter<"slots"> | string | null
    min_bet?: FloatNullableFilter<"slots"> | number | null
    max_bet?: FloatNullableFilter<"slots"> | number | null
    max_win?: FloatNullableFilter<"slots"> | number | null
    paylines?: IntNullableFilter<"slots"> | number | null
    reels?: IntNullableFilter<"slots"> | number | null
    rows?: IntNullableFilter<"slots"> | number | null
    has_free_spins?: BoolFilter<"slots"> | boolean
    has_bonus_game?: BoolFilter<"slots"> | boolean
    has_wild?: BoolFilter<"slots"> | boolean
    has_scatter?: BoolFilter<"slots"> | boolean
    has_multiplier?: BoolFilter<"slots"> | boolean
    description?: StringNullableFilter<"slots"> | string | null
    image_url?: StringNullableFilter<"slots"> | string | null
    demo_url?: StringNullableFilter<"slots"> | string | null
    is_active?: BoolFilter<"slots"> | boolean
    created_at?: DateTimeFilter<"slots"> | Date | string
    updated_at?: DateTimeFilter<"slots"> | Date | string
  }

  export type slot_mechanicsCreateWithoutMechanicInput = {
    id?: string
    created_at?: Date | string
    slot: slotsCreateNestedOneWithoutSlot_mechanicsInput
  }

  export type slot_mechanicsUncheckedCreateWithoutMechanicInput = {
    id?: string
    slot_id: string
    created_at?: Date | string
  }

  export type slot_mechanicsCreateOrConnectWithoutMechanicInput = {
    where: slot_mechanicsWhereUniqueInput
    create: XOR<slot_mechanicsCreateWithoutMechanicInput, slot_mechanicsUncheckedCreateWithoutMechanicInput>
  }

  export type slot_mechanicsCreateManyMechanicInputEnvelope = {
    data: slot_mechanicsCreateManyMechanicInput | slot_mechanicsCreateManyMechanicInput[]
  }

  export type slot_mechanicsUpsertWithWhereUniqueWithoutMechanicInput = {
    where: slot_mechanicsWhereUniqueInput
    update: XOR<slot_mechanicsUpdateWithoutMechanicInput, slot_mechanicsUncheckedUpdateWithoutMechanicInput>
    create: XOR<slot_mechanicsCreateWithoutMechanicInput, slot_mechanicsUncheckedCreateWithoutMechanicInput>
  }

  export type slot_mechanicsUpdateWithWhereUniqueWithoutMechanicInput = {
    where: slot_mechanicsWhereUniqueInput
    data: XOR<slot_mechanicsUpdateWithoutMechanicInput, slot_mechanicsUncheckedUpdateWithoutMechanicInput>
  }

  export type slot_mechanicsUpdateManyWithWhereWithoutMechanicInput = {
    where: slot_mechanicsScalarWhereInput
    data: XOR<slot_mechanicsUpdateManyMutationInput, slot_mechanicsUncheckedUpdateManyWithoutMechanicInput>
  }

  export type slot_mechanicsScalarWhereInput = {
    AND?: slot_mechanicsScalarWhereInput | slot_mechanicsScalarWhereInput[]
    OR?: slot_mechanicsScalarWhereInput[]
    NOT?: slot_mechanicsScalarWhereInput | slot_mechanicsScalarWhereInput[]
    id?: StringFilter<"slot_mechanics"> | string
    slot_id?: StringFilter<"slot_mechanics"> | string
    mechanic_id?: StringFilter<"slot_mechanics"> | string
    created_at?: DateTimeFilter<"slot_mechanics"> | Date | string
  }

  export type slotsCreateWithoutThemeInput = {
    id?: string
    name: string
    slug: string
    rtp?: number | null
    volatility?: string | null
    min_bet?: number | null
    max_bet?: number | null
    max_win?: number | null
    paylines?: number | null
    reels?: number | null
    rows?: number | null
    has_free_spins?: boolean
    has_bonus_game?: boolean
    has_wild?: boolean
    has_scatter?: boolean
    has_multiplier?: boolean
    description?: string | null
    image_url?: string | null
    demo_url?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    provider: providersCreateNestedOneWithoutSlotsInput
    category: slot_categoriesCreateNestedOneWithoutSlotsInput
    slot_mechanics?: slot_mechanicsCreateNestedManyWithoutSlotInput
  }

  export type slotsUncheckedCreateWithoutThemeInput = {
    id?: string
    name: string
    slug: string
    provider_id: string
    category_id: string
    rtp?: number | null
    volatility?: string | null
    min_bet?: number | null
    max_bet?: number | null
    max_win?: number | null
    paylines?: number | null
    reels?: number | null
    rows?: number | null
    has_free_spins?: boolean
    has_bonus_game?: boolean
    has_wild?: boolean
    has_scatter?: boolean
    has_multiplier?: boolean
    description?: string | null
    image_url?: string | null
    demo_url?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    slot_mechanics?: slot_mechanicsUncheckedCreateNestedManyWithoutSlotInput
  }

  export type slotsCreateOrConnectWithoutThemeInput = {
    where: slotsWhereUniqueInput
    create: XOR<slotsCreateWithoutThemeInput, slotsUncheckedCreateWithoutThemeInput>
  }

  export type slotsCreateManyThemeInputEnvelope = {
    data: slotsCreateManyThemeInput | slotsCreateManyThemeInput[]
  }

  export type slotsUpsertWithWhereUniqueWithoutThemeInput = {
    where: slotsWhereUniqueInput
    update: XOR<slotsUpdateWithoutThemeInput, slotsUncheckedUpdateWithoutThemeInput>
    create: XOR<slotsCreateWithoutThemeInput, slotsUncheckedCreateWithoutThemeInput>
  }

  export type slotsUpdateWithWhereUniqueWithoutThemeInput = {
    where: slotsWhereUniqueInput
    data: XOR<slotsUpdateWithoutThemeInput, slotsUncheckedUpdateWithoutThemeInput>
  }

  export type slotsUpdateManyWithWhereWithoutThemeInput = {
    where: slotsScalarWhereInput
    data: XOR<slotsUpdateManyMutationInput, slotsUncheckedUpdateManyWithoutThemeInput>
  }

  export type slotsCreateWithoutCategoryInput = {
    id?: string
    name: string
    slug: string
    rtp?: number | null
    volatility?: string | null
    min_bet?: number | null
    max_bet?: number | null
    max_win?: number | null
    paylines?: number | null
    reels?: number | null
    rows?: number | null
    has_free_spins?: boolean
    has_bonus_game?: boolean
    has_wild?: boolean
    has_scatter?: boolean
    has_multiplier?: boolean
    description?: string | null
    image_url?: string | null
    demo_url?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    provider: providersCreateNestedOneWithoutSlotsInput
    theme?: themesCreateNestedOneWithoutSlotsInput
    slot_mechanics?: slot_mechanicsCreateNestedManyWithoutSlotInput
  }

  export type slotsUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    slug: string
    provider_id: string
    theme_id?: string | null
    rtp?: number | null
    volatility?: string | null
    min_bet?: number | null
    max_bet?: number | null
    max_win?: number | null
    paylines?: number | null
    reels?: number | null
    rows?: number | null
    has_free_spins?: boolean
    has_bonus_game?: boolean
    has_wild?: boolean
    has_scatter?: boolean
    has_multiplier?: boolean
    description?: string | null
    image_url?: string | null
    demo_url?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    slot_mechanics?: slot_mechanicsUncheckedCreateNestedManyWithoutSlotInput
  }

  export type slotsCreateOrConnectWithoutCategoryInput = {
    where: slotsWhereUniqueInput
    create: XOR<slotsCreateWithoutCategoryInput, slotsUncheckedCreateWithoutCategoryInput>
  }

  export type slotsCreateManyCategoryInputEnvelope = {
    data: slotsCreateManyCategoryInput | slotsCreateManyCategoryInput[]
  }

  export type slotsUpsertWithWhereUniqueWithoutCategoryInput = {
    where: slotsWhereUniqueInput
    update: XOR<slotsUpdateWithoutCategoryInput, slotsUncheckedUpdateWithoutCategoryInput>
    create: XOR<slotsCreateWithoutCategoryInput, slotsUncheckedCreateWithoutCategoryInput>
  }

  export type slotsUpdateWithWhereUniqueWithoutCategoryInput = {
    where: slotsWhereUniqueInput
    data: XOR<slotsUpdateWithoutCategoryInput, slotsUncheckedUpdateWithoutCategoryInput>
  }

  export type slotsUpdateManyWithWhereWithoutCategoryInput = {
    where: slotsScalarWhereInput
    data: XOR<slotsUpdateManyMutationInput, slotsUncheckedUpdateManyWithoutCategoryInput>
  }

  export type providersCreateWithoutSlotsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    logo_url?: string | null
    website_url?: string | null
    founded_year?: number | null
    country?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    is_recommended?: boolean
  }

  export type providersUncheckedCreateWithoutSlotsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    logo_url?: string | null
    website_url?: string | null
    founded_year?: number | null
    country?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    is_recommended?: boolean
  }

  export type providersCreateOrConnectWithoutSlotsInput = {
    where: providersWhereUniqueInput
    create: XOR<providersCreateWithoutSlotsInput, providersUncheckedCreateWithoutSlotsInput>
  }

  export type slot_categoriesCreateWithoutSlotsInput = {
    id?: string
    name: string
    slug: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type slot_categoriesUncheckedCreateWithoutSlotsInput = {
    id?: string
    name: string
    slug: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type slot_categoriesCreateOrConnectWithoutSlotsInput = {
    where: slot_categoriesWhereUniqueInput
    create: XOR<slot_categoriesCreateWithoutSlotsInput, slot_categoriesUncheckedCreateWithoutSlotsInput>
  }

  export type themesCreateWithoutSlotsInput = {
    id?: string
    name: string
    slug: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type themesUncheckedCreateWithoutSlotsInput = {
    id?: string
    name: string
    slug: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type themesCreateOrConnectWithoutSlotsInput = {
    where: themesWhereUniqueInput
    create: XOR<themesCreateWithoutSlotsInput, themesUncheckedCreateWithoutSlotsInput>
  }

  export type slot_mechanicsCreateWithoutSlotInput = {
    id?: string
    created_at?: Date | string
    mechanic: mechanicsCreateNestedOneWithoutSlot_mechanicsInput
  }

  export type slot_mechanicsUncheckedCreateWithoutSlotInput = {
    id?: string
    mechanic_id: string
    created_at?: Date | string
  }

  export type slot_mechanicsCreateOrConnectWithoutSlotInput = {
    where: slot_mechanicsWhereUniqueInput
    create: XOR<slot_mechanicsCreateWithoutSlotInput, slot_mechanicsUncheckedCreateWithoutSlotInput>
  }

  export type slot_mechanicsCreateManySlotInputEnvelope = {
    data: slot_mechanicsCreateManySlotInput | slot_mechanicsCreateManySlotInput[]
  }

  export type providersUpsertWithoutSlotsInput = {
    update: XOR<providersUpdateWithoutSlotsInput, providersUncheckedUpdateWithoutSlotsInput>
    create: XOR<providersCreateWithoutSlotsInput, providersUncheckedCreateWithoutSlotsInput>
    where?: providersWhereInput
  }

  export type providersUpdateToOneWithWhereWithoutSlotsInput = {
    where?: providersWhereInput
    data: XOR<providersUpdateWithoutSlotsInput, providersUncheckedUpdateWithoutSlotsInput>
  }

  export type providersUpdateWithoutSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    website_url?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_recommended?: BoolFieldUpdateOperationsInput | boolean
  }

  export type providersUncheckedUpdateWithoutSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    website_url?: NullableStringFieldUpdateOperationsInput | string | null
    founded_year?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_recommended?: BoolFieldUpdateOperationsInput | boolean
  }

  export type slot_categoriesUpsertWithoutSlotsInput = {
    update: XOR<slot_categoriesUpdateWithoutSlotsInput, slot_categoriesUncheckedUpdateWithoutSlotsInput>
    create: XOR<slot_categoriesCreateWithoutSlotsInput, slot_categoriesUncheckedCreateWithoutSlotsInput>
    where?: slot_categoriesWhereInput
  }

  export type slot_categoriesUpdateToOneWithWhereWithoutSlotsInput = {
    where?: slot_categoriesWhereInput
    data: XOR<slot_categoriesUpdateWithoutSlotsInput, slot_categoriesUncheckedUpdateWithoutSlotsInput>
  }

  export type slot_categoriesUpdateWithoutSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type slot_categoriesUncheckedUpdateWithoutSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type themesUpsertWithoutSlotsInput = {
    update: XOR<themesUpdateWithoutSlotsInput, themesUncheckedUpdateWithoutSlotsInput>
    create: XOR<themesCreateWithoutSlotsInput, themesUncheckedCreateWithoutSlotsInput>
    where?: themesWhereInput
  }

  export type themesUpdateToOneWithWhereWithoutSlotsInput = {
    where?: themesWhereInput
    data: XOR<themesUpdateWithoutSlotsInput, themesUncheckedUpdateWithoutSlotsInput>
  }

  export type themesUpdateWithoutSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type themesUncheckedUpdateWithoutSlotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type slot_mechanicsUpsertWithWhereUniqueWithoutSlotInput = {
    where: slot_mechanicsWhereUniqueInput
    update: XOR<slot_mechanicsUpdateWithoutSlotInput, slot_mechanicsUncheckedUpdateWithoutSlotInput>
    create: XOR<slot_mechanicsCreateWithoutSlotInput, slot_mechanicsUncheckedCreateWithoutSlotInput>
  }

  export type slot_mechanicsUpdateWithWhereUniqueWithoutSlotInput = {
    where: slot_mechanicsWhereUniqueInput
    data: XOR<slot_mechanicsUpdateWithoutSlotInput, slot_mechanicsUncheckedUpdateWithoutSlotInput>
  }

  export type slot_mechanicsUpdateManyWithWhereWithoutSlotInput = {
    where: slot_mechanicsScalarWhereInput
    data: XOR<slot_mechanicsUpdateManyMutationInput, slot_mechanicsUncheckedUpdateManyWithoutSlotInput>
  }

  export type slotsCreateWithoutSlot_mechanicsInput = {
    id?: string
    name: string
    slug: string
    rtp?: number | null
    volatility?: string | null
    min_bet?: number | null
    max_bet?: number | null
    max_win?: number | null
    paylines?: number | null
    reels?: number | null
    rows?: number | null
    has_free_spins?: boolean
    has_bonus_game?: boolean
    has_wild?: boolean
    has_scatter?: boolean
    has_multiplier?: boolean
    description?: string | null
    image_url?: string | null
    demo_url?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    provider: providersCreateNestedOneWithoutSlotsInput
    category: slot_categoriesCreateNestedOneWithoutSlotsInput
    theme?: themesCreateNestedOneWithoutSlotsInput
  }

  export type slotsUncheckedCreateWithoutSlot_mechanicsInput = {
    id?: string
    name: string
    slug: string
    provider_id: string
    category_id: string
    theme_id?: string | null
    rtp?: number | null
    volatility?: string | null
    min_bet?: number | null
    max_bet?: number | null
    max_win?: number | null
    paylines?: number | null
    reels?: number | null
    rows?: number | null
    has_free_spins?: boolean
    has_bonus_game?: boolean
    has_wild?: boolean
    has_scatter?: boolean
    has_multiplier?: boolean
    description?: string | null
    image_url?: string | null
    demo_url?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type slotsCreateOrConnectWithoutSlot_mechanicsInput = {
    where: slotsWhereUniqueInput
    create: XOR<slotsCreateWithoutSlot_mechanicsInput, slotsUncheckedCreateWithoutSlot_mechanicsInput>
  }

  export type mechanicsCreateWithoutSlot_mechanicsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type mechanicsUncheckedCreateWithoutSlot_mechanicsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type mechanicsCreateOrConnectWithoutSlot_mechanicsInput = {
    where: mechanicsWhereUniqueInput
    create: XOR<mechanicsCreateWithoutSlot_mechanicsInput, mechanicsUncheckedCreateWithoutSlot_mechanicsInput>
  }

  export type slotsUpsertWithoutSlot_mechanicsInput = {
    update: XOR<slotsUpdateWithoutSlot_mechanicsInput, slotsUncheckedUpdateWithoutSlot_mechanicsInput>
    create: XOR<slotsCreateWithoutSlot_mechanicsInput, slotsUncheckedCreateWithoutSlot_mechanicsInput>
    where?: slotsWhereInput
  }

  export type slotsUpdateToOneWithWhereWithoutSlot_mechanicsInput = {
    where?: slotsWhereInput
    data: XOR<slotsUpdateWithoutSlot_mechanicsInput, slotsUncheckedUpdateWithoutSlot_mechanicsInput>
  }

  export type slotsUpdateWithoutSlot_mechanicsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    rtp?: NullableFloatFieldUpdateOperationsInput | number | null
    volatility?: NullableStringFieldUpdateOperationsInput | string | null
    min_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_win?: NullableFloatFieldUpdateOperationsInput | number | null
    paylines?: NullableIntFieldUpdateOperationsInput | number | null
    reels?: NullableIntFieldUpdateOperationsInput | number | null
    rows?: NullableIntFieldUpdateOperationsInput | number | null
    has_free_spins?: BoolFieldUpdateOperationsInput | boolean
    has_bonus_game?: BoolFieldUpdateOperationsInput | boolean
    has_wild?: BoolFieldUpdateOperationsInput | boolean
    has_scatter?: BoolFieldUpdateOperationsInput | boolean
    has_multiplier?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    demo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: providersUpdateOneRequiredWithoutSlotsNestedInput
    category?: slot_categoriesUpdateOneRequiredWithoutSlotsNestedInput
    theme?: themesUpdateOneWithoutSlotsNestedInput
  }

  export type slotsUncheckedUpdateWithoutSlot_mechanicsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    provider_id?: StringFieldUpdateOperationsInput | string
    category_id?: StringFieldUpdateOperationsInput | string
    theme_id?: NullableStringFieldUpdateOperationsInput | string | null
    rtp?: NullableFloatFieldUpdateOperationsInput | number | null
    volatility?: NullableStringFieldUpdateOperationsInput | string | null
    min_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_win?: NullableFloatFieldUpdateOperationsInput | number | null
    paylines?: NullableIntFieldUpdateOperationsInput | number | null
    reels?: NullableIntFieldUpdateOperationsInput | number | null
    rows?: NullableIntFieldUpdateOperationsInput | number | null
    has_free_spins?: BoolFieldUpdateOperationsInput | boolean
    has_bonus_game?: BoolFieldUpdateOperationsInput | boolean
    has_wild?: BoolFieldUpdateOperationsInput | boolean
    has_scatter?: BoolFieldUpdateOperationsInput | boolean
    has_multiplier?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    demo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type mechanicsUpsertWithoutSlot_mechanicsInput = {
    update: XOR<mechanicsUpdateWithoutSlot_mechanicsInput, mechanicsUncheckedUpdateWithoutSlot_mechanicsInput>
    create: XOR<mechanicsCreateWithoutSlot_mechanicsInput, mechanicsUncheckedCreateWithoutSlot_mechanicsInput>
    where?: mechanicsWhereInput
  }

  export type mechanicsUpdateToOneWithWhereWithoutSlot_mechanicsInput = {
    where?: mechanicsWhereInput
    data: XOR<mechanicsUpdateWithoutSlot_mechanicsInput, mechanicsUncheckedUpdateWithoutSlot_mechanicsInput>
  }

  export type mechanicsUpdateWithoutSlot_mechanicsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type mechanicsUncheckedUpdateWithoutSlot_mechanicsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type slotsCreateManyProviderInput = {
    id?: string
    name: string
    slug: string
    category_id: string
    theme_id?: string | null
    rtp?: number | null
    volatility?: string | null
    min_bet?: number | null
    max_bet?: number | null
    max_win?: number | null
    paylines?: number | null
    reels?: number | null
    rows?: number | null
    has_free_spins?: boolean
    has_bonus_game?: boolean
    has_wild?: boolean
    has_scatter?: boolean
    has_multiplier?: boolean
    description?: string | null
    image_url?: string | null
    demo_url?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type slotsUpdateWithoutProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    rtp?: NullableFloatFieldUpdateOperationsInput | number | null
    volatility?: NullableStringFieldUpdateOperationsInput | string | null
    min_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_win?: NullableFloatFieldUpdateOperationsInput | number | null
    paylines?: NullableIntFieldUpdateOperationsInput | number | null
    reels?: NullableIntFieldUpdateOperationsInput | number | null
    rows?: NullableIntFieldUpdateOperationsInput | number | null
    has_free_spins?: BoolFieldUpdateOperationsInput | boolean
    has_bonus_game?: BoolFieldUpdateOperationsInput | boolean
    has_wild?: BoolFieldUpdateOperationsInput | boolean
    has_scatter?: BoolFieldUpdateOperationsInput | boolean
    has_multiplier?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    demo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: slot_categoriesUpdateOneRequiredWithoutSlotsNestedInput
    theme?: themesUpdateOneWithoutSlotsNestedInput
    slot_mechanics?: slot_mechanicsUpdateManyWithoutSlotNestedInput
  }

  export type slotsUncheckedUpdateWithoutProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category_id?: StringFieldUpdateOperationsInput | string
    theme_id?: NullableStringFieldUpdateOperationsInput | string | null
    rtp?: NullableFloatFieldUpdateOperationsInput | number | null
    volatility?: NullableStringFieldUpdateOperationsInput | string | null
    min_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_win?: NullableFloatFieldUpdateOperationsInput | number | null
    paylines?: NullableIntFieldUpdateOperationsInput | number | null
    reels?: NullableIntFieldUpdateOperationsInput | number | null
    rows?: NullableIntFieldUpdateOperationsInput | number | null
    has_free_spins?: BoolFieldUpdateOperationsInput | boolean
    has_bonus_game?: BoolFieldUpdateOperationsInput | boolean
    has_wild?: BoolFieldUpdateOperationsInput | boolean
    has_scatter?: BoolFieldUpdateOperationsInput | boolean
    has_multiplier?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    demo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    slot_mechanics?: slot_mechanicsUncheckedUpdateManyWithoutSlotNestedInput
  }

  export type slotsUncheckedUpdateManyWithoutProviderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category_id?: StringFieldUpdateOperationsInput | string
    theme_id?: NullableStringFieldUpdateOperationsInput | string | null
    rtp?: NullableFloatFieldUpdateOperationsInput | number | null
    volatility?: NullableStringFieldUpdateOperationsInput | string | null
    min_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_win?: NullableFloatFieldUpdateOperationsInput | number | null
    paylines?: NullableIntFieldUpdateOperationsInput | number | null
    reels?: NullableIntFieldUpdateOperationsInput | number | null
    rows?: NullableIntFieldUpdateOperationsInput | number | null
    has_free_spins?: BoolFieldUpdateOperationsInput | boolean
    has_bonus_game?: BoolFieldUpdateOperationsInput | boolean
    has_wild?: BoolFieldUpdateOperationsInput | boolean
    has_scatter?: BoolFieldUpdateOperationsInput | boolean
    has_multiplier?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    demo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type slot_mechanicsCreateManyMechanicInput = {
    id?: string
    slot_id: string
    created_at?: Date | string
  }

  export type slot_mechanicsUpdateWithoutMechanicInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    slot?: slotsUpdateOneRequiredWithoutSlot_mechanicsNestedInput
  }

  export type slot_mechanicsUncheckedUpdateWithoutMechanicInput = {
    id?: StringFieldUpdateOperationsInput | string
    slot_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type slot_mechanicsUncheckedUpdateManyWithoutMechanicInput = {
    id?: StringFieldUpdateOperationsInput | string
    slot_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type slotsCreateManyThemeInput = {
    id?: string
    name: string
    slug: string
    provider_id: string
    category_id: string
    rtp?: number | null
    volatility?: string | null
    min_bet?: number | null
    max_bet?: number | null
    max_win?: number | null
    paylines?: number | null
    reels?: number | null
    rows?: number | null
    has_free_spins?: boolean
    has_bonus_game?: boolean
    has_wild?: boolean
    has_scatter?: boolean
    has_multiplier?: boolean
    description?: string | null
    image_url?: string | null
    demo_url?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type slotsUpdateWithoutThemeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    rtp?: NullableFloatFieldUpdateOperationsInput | number | null
    volatility?: NullableStringFieldUpdateOperationsInput | string | null
    min_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_win?: NullableFloatFieldUpdateOperationsInput | number | null
    paylines?: NullableIntFieldUpdateOperationsInput | number | null
    reels?: NullableIntFieldUpdateOperationsInput | number | null
    rows?: NullableIntFieldUpdateOperationsInput | number | null
    has_free_spins?: BoolFieldUpdateOperationsInput | boolean
    has_bonus_game?: BoolFieldUpdateOperationsInput | boolean
    has_wild?: BoolFieldUpdateOperationsInput | boolean
    has_scatter?: BoolFieldUpdateOperationsInput | boolean
    has_multiplier?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    demo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: providersUpdateOneRequiredWithoutSlotsNestedInput
    category?: slot_categoriesUpdateOneRequiredWithoutSlotsNestedInput
    slot_mechanics?: slot_mechanicsUpdateManyWithoutSlotNestedInput
  }

  export type slotsUncheckedUpdateWithoutThemeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    provider_id?: StringFieldUpdateOperationsInput | string
    category_id?: StringFieldUpdateOperationsInput | string
    rtp?: NullableFloatFieldUpdateOperationsInput | number | null
    volatility?: NullableStringFieldUpdateOperationsInput | string | null
    min_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_win?: NullableFloatFieldUpdateOperationsInput | number | null
    paylines?: NullableIntFieldUpdateOperationsInput | number | null
    reels?: NullableIntFieldUpdateOperationsInput | number | null
    rows?: NullableIntFieldUpdateOperationsInput | number | null
    has_free_spins?: BoolFieldUpdateOperationsInput | boolean
    has_bonus_game?: BoolFieldUpdateOperationsInput | boolean
    has_wild?: BoolFieldUpdateOperationsInput | boolean
    has_scatter?: BoolFieldUpdateOperationsInput | boolean
    has_multiplier?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    demo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    slot_mechanics?: slot_mechanicsUncheckedUpdateManyWithoutSlotNestedInput
  }

  export type slotsUncheckedUpdateManyWithoutThemeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    provider_id?: StringFieldUpdateOperationsInput | string
    category_id?: StringFieldUpdateOperationsInput | string
    rtp?: NullableFloatFieldUpdateOperationsInput | number | null
    volatility?: NullableStringFieldUpdateOperationsInput | string | null
    min_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_win?: NullableFloatFieldUpdateOperationsInput | number | null
    paylines?: NullableIntFieldUpdateOperationsInput | number | null
    reels?: NullableIntFieldUpdateOperationsInput | number | null
    rows?: NullableIntFieldUpdateOperationsInput | number | null
    has_free_spins?: BoolFieldUpdateOperationsInput | boolean
    has_bonus_game?: BoolFieldUpdateOperationsInput | boolean
    has_wild?: BoolFieldUpdateOperationsInput | boolean
    has_scatter?: BoolFieldUpdateOperationsInput | boolean
    has_multiplier?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    demo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type slotsCreateManyCategoryInput = {
    id?: string
    name: string
    slug: string
    provider_id: string
    theme_id?: string | null
    rtp?: number | null
    volatility?: string | null
    min_bet?: number | null
    max_bet?: number | null
    max_win?: number | null
    paylines?: number | null
    reels?: number | null
    rows?: number | null
    has_free_spins?: boolean
    has_bonus_game?: boolean
    has_wild?: boolean
    has_scatter?: boolean
    has_multiplier?: boolean
    description?: string | null
    image_url?: string | null
    demo_url?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type slotsUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    rtp?: NullableFloatFieldUpdateOperationsInput | number | null
    volatility?: NullableStringFieldUpdateOperationsInput | string | null
    min_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_win?: NullableFloatFieldUpdateOperationsInput | number | null
    paylines?: NullableIntFieldUpdateOperationsInput | number | null
    reels?: NullableIntFieldUpdateOperationsInput | number | null
    rows?: NullableIntFieldUpdateOperationsInput | number | null
    has_free_spins?: BoolFieldUpdateOperationsInput | boolean
    has_bonus_game?: BoolFieldUpdateOperationsInput | boolean
    has_wild?: BoolFieldUpdateOperationsInput | boolean
    has_scatter?: BoolFieldUpdateOperationsInput | boolean
    has_multiplier?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    demo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: providersUpdateOneRequiredWithoutSlotsNestedInput
    theme?: themesUpdateOneWithoutSlotsNestedInput
    slot_mechanics?: slot_mechanicsUpdateManyWithoutSlotNestedInput
  }

  export type slotsUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    provider_id?: StringFieldUpdateOperationsInput | string
    theme_id?: NullableStringFieldUpdateOperationsInput | string | null
    rtp?: NullableFloatFieldUpdateOperationsInput | number | null
    volatility?: NullableStringFieldUpdateOperationsInput | string | null
    min_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_win?: NullableFloatFieldUpdateOperationsInput | number | null
    paylines?: NullableIntFieldUpdateOperationsInput | number | null
    reels?: NullableIntFieldUpdateOperationsInput | number | null
    rows?: NullableIntFieldUpdateOperationsInput | number | null
    has_free_spins?: BoolFieldUpdateOperationsInput | boolean
    has_bonus_game?: BoolFieldUpdateOperationsInput | boolean
    has_wild?: BoolFieldUpdateOperationsInput | boolean
    has_scatter?: BoolFieldUpdateOperationsInput | boolean
    has_multiplier?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    demo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    slot_mechanics?: slot_mechanicsUncheckedUpdateManyWithoutSlotNestedInput
  }

  export type slotsUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    provider_id?: StringFieldUpdateOperationsInput | string
    theme_id?: NullableStringFieldUpdateOperationsInput | string | null
    rtp?: NullableFloatFieldUpdateOperationsInput | number | null
    volatility?: NullableStringFieldUpdateOperationsInput | string | null
    min_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_bet?: NullableFloatFieldUpdateOperationsInput | number | null
    max_win?: NullableFloatFieldUpdateOperationsInput | number | null
    paylines?: NullableIntFieldUpdateOperationsInput | number | null
    reels?: NullableIntFieldUpdateOperationsInput | number | null
    rows?: NullableIntFieldUpdateOperationsInput | number | null
    has_free_spins?: BoolFieldUpdateOperationsInput | boolean
    has_bonus_game?: BoolFieldUpdateOperationsInput | boolean
    has_wild?: BoolFieldUpdateOperationsInput | boolean
    has_scatter?: BoolFieldUpdateOperationsInput | boolean
    has_multiplier?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    demo_url?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type slot_mechanicsCreateManySlotInput = {
    id?: string
    mechanic_id: string
    created_at?: Date | string
  }

  export type slot_mechanicsUpdateWithoutSlotInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    mechanic?: mechanicsUpdateOneRequiredWithoutSlot_mechanicsNestedInput
  }

  export type slot_mechanicsUncheckedUpdateWithoutSlotInput = {
    id?: StringFieldUpdateOperationsInput | string
    mechanic_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type slot_mechanicsUncheckedUpdateManyWithoutSlotInput = {
    id?: StringFieldUpdateOperationsInput | string
    mechanic_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}