
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions

export type PrismaPromise<T> = $Public.PrismaPromise<T>


export type MediaPayload = {
  objects: {}
  scalars: {
    name: string | null
    type: MediaType
    uri: string
    createdAt: Date
  }
  composites: {}
}

/**
 * Model Media
 * A media is a file used in a website or a template
 */
export type Media = runtime.Types.DefaultSelection<MediaPayload>
export type UserPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  objects: {
    /**
     * Websites and templates created by the user
     */
    websites: WebsitePayload<ExtArgs>[]
    templates: TemplatePayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    role: Role
    username: string
    email: string
    password: string
    firstName: string | null
    lastName: string | null
    membership: Membership
    lastLogin: Date | null
    createdAt: Date
  }, ExtArgs["result"]["user"]>
  composites: {}
}

/**
 * Model User
 * A user of the application
 */
export type User = runtime.Types.DefaultSelection<UserPayload>
export type WebsitePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  objects: {
    author: UserPayload<ExtArgs>
    /**
     * The template used in the website
     */
    template: TemplatePayload<ExtArgs> | null
  }
  scalars: $Extensions.GetResult<{
    id: string
    /**
     * The title of the website in the browser tab
     */
    title: string
    url: string
    /**
     * The JSON string representing the structure of the website
     */
    tree: string
    createdAt: Date
    authorId: string
    templateId: string | null
  }, ExtArgs["result"]["website"]>
  composites: {
    /**
     * Medias used in the website
     */
    medias: MediaPayload[]
  }
}

/**
 * Model Website
 * A website created by a user using the editor
 */
export type Website = runtime.Types.DefaultSelection<WebsitePayload>
export type TemplatePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  objects: {
    /**
     * Websites created using the template
     */
    websitesUsing: WebsitePayload<ExtArgs>[]
    author: UserPayload<ExtArgs> | null
  }
  scalars: $Extensions.GetResult<{
    id: string
    name: string
    /**
     * The title used when creating a website from the template
     */
    title: string
    /**
     * The JSON string representing the structure of the template
     */
    tree: string
    createdAt: Date
    /**
     * Number of likes the template has received
     */
    likes: number
    authorId: string | null
  }, ExtArgs["result"]["template"]>
  composites: {
    /**
     * Medias used in the template
     */
    medias: MediaPayload[]
  }
}

/**
 * Model Template
 * A template created by a user using the editor, and that can be used to create websites
 */
export type Template = runtime.Types.DefaultSelection<TemplatePayload>

/**
 * Enums
 */

export const Role: {
  user: 'user',
  admin: 'admin'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Membership: {
  free: 'free',
  premium: 'premium'
};

export type Membership = (typeof Membership)[keyof typeof Membership]


export const MediaType: {
  audio: 'audio',
  image: 'image',
  video: 'video'
};

export type MediaType = (typeof MediaType)[keyof typeof MediaType]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): Promise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => Promise<R>, options?: { maxWait?: number, timeout?: number }): Promise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.website`: Exposes CRUD operations for the **Website** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Websites
    * const websites = await prisma.website.findMany()
    * ```
    */
  get website(): Prisma.WebsiteDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.template`: Exposes CRUD operations for the **Template** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Templates
    * const templates = await prisma.template.findMany()
    * ```
    */
  get template(): Prisma.TemplateDelegate<GlobalReject, ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
  export type Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export type Args<T, F extends $Public.Operation> = $Public.Args<T, F>
  export type Payload<T, F extends $Public.Operation> = $Public.Payload<T, F>
  export type Result<T, A, F extends $Public.Operation> = $Public.Result<T, A, F>
  export type Exact<T, W> = $Public.Exact<T, W>

  /**
   * Prisma Client JS version: 4.16.0
   * Query Engine version: b20ead4d3ab9e78ac112966e242ded703f4a052c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

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
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Website: 'Website',
    Template: 'Template'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    database?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.Args}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
      meta: {
        modelProps: 'user' | 'website' | 'template'
        txIsolationLevel: never
      },
      model: {
      User: {
        findUnique: {
          args: Prisma.UserFindUniqueArgs<ExtArgs>,
          result: $Utils.OptionalFlat<User>
          payload: UserPayload<ExtArgs>
        }
        findUniqueOrThrow: {
          args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
          result: $Utils.OptionalFlat<User>
          payload: UserPayload<ExtArgs>
        }
        findFirst: {
          args: Prisma.UserFindFirstArgs<ExtArgs>,
          result: $Utils.OptionalFlat<User>
          payload: UserPayload<ExtArgs>
        }
        findFirstOrThrow: {
          args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
          result: $Utils.OptionalFlat<User>
          payload: UserPayload<ExtArgs>
        }
        findMany: {
          args: Prisma.UserFindManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<User>
          payload: UserPayload<ExtArgs>
        }
        create: {
          args: Prisma.UserCreateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<User>
          payload: UserPayload<ExtArgs>
        }
        createMany: {
          args: Prisma.UserCreateManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<User>
          payload: UserPayload<ExtArgs>
        }
        delete: {
          args: Prisma.UserDeleteArgs<ExtArgs>,
          result: $Utils.OptionalFlat<User>
          payload: UserPayload<ExtArgs>
        }
        update: {
          args: Prisma.UserUpdateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<User>
          payload: UserPayload<ExtArgs>
        }
        deleteMany: {
          args: Prisma.UserDeleteManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<User>
          payload: UserPayload<ExtArgs>
        }
        updateMany: {
          args: Prisma.UserUpdateManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<User>
          payload: UserPayload<ExtArgs>
        }
        upsert: {
          args: Prisma.UserUpsertArgs<ExtArgs>,
          result: $Utils.OptionalFlat<User>
          payload: UserPayload<ExtArgs>
        }
        aggregate: {
          args: Prisma.UserAggregateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<User>
          payload: UserPayload<ExtArgs>
        }
        groupBy: {
          args: Prisma.UserGroupByArgs<ExtArgs>,
          result: $Utils.OptionalFlat<User>
          payload: UserPayload<ExtArgs>
        }
        findRaw: {
          args: Prisma.UserFindRawArgs<ExtArgs>,
          result: $Utils.OptionalFlat<User>
          payload: UserPayload<ExtArgs>
        }
        aggregateRaw: {
          args: Prisma.UserAggregateRawArgs<ExtArgs>,
          result: $Utils.OptionalFlat<User>
          payload: UserPayload<ExtArgs>
        }
        count: {
          args: Prisma.UserCountArgs<ExtArgs>,
          result: $Utils.OptionalFlat<User>
          payload: UserPayload<ExtArgs>
        }
      }
      Website: {
        findUnique: {
          args: Prisma.WebsiteFindUniqueArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Website>
          payload: WebsitePayload<ExtArgs>
        }
        findUniqueOrThrow: {
          args: Prisma.WebsiteFindUniqueOrThrowArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Website>
          payload: WebsitePayload<ExtArgs>
        }
        findFirst: {
          args: Prisma.WebsiteFindFirstArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Website>
          payload: WebsitePayload<ExtArgs>
        }
        findFirstOrThrow: {
          args: Prisma.WebsiteFindFirstOrThrowArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Website>
          payload: WebsitePayload<ExtArgs>
        }
        findMany: {
          args: Prisma.WebsiteFindManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Website>
          payload: WebsitePayload<ExtArgs>
        }
        create: {
          args: Prisma.WebsiteCreateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Website>
          payload: WebsitePayload<ExtArgs>
        }
        createMany: {
          args: Prisma.WebsiteCreateManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Website>
          payload: WebsitePayload<ExtArgs>
        }
        delete: {
          args: Prisma.WebsiteDeleteArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Website>
          payload: WebsitePayload<ExtArgs>
        }
        update: {
          args: Prisma.WebsiteUpdateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Website>
          payload: WebsitePayload<ExtArgs>
        }
        deleteMany: {
          args: Prisma.WebsiteDeleteManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Website>
          payload: WebsitePayload<ExtArgs>
        }
        updateMany: {
          args: Prisma.WebsiteUpdateManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Website>
          payload: WebsitePayload<ExtArgs>
        }
        upsert: {
          args: Prisma.WebsiteUpsertArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Website>
          payload: WebsitePayload<ExtArgs>
        }
        aggregate: {
          args: Prisma.WebsiteAggregateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Website>
          payload: WebsitePayload<ExtArgs>
        }
        groupBy: {
          args: Prisma.WebsiteGroupByArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Website>
          payload: WebsitePayload<ExtArgs>
        }
        findRaw: {
          args: Prisma.WebsiteFindRawArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Website>
          payload: WebsitePayload<ExtArgs>
        }
        aggregateRaw: {
          args: Prisma.WebsiteAggregateRawArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Website>
          payload: WebsitePayload<ExtArgs>
        }
        count: {
          args: Prisma.WebsiteCountArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Website>
          payload: WebsitePayload<ExtArgs>
        }
      }
      Template: {
        findUnique: {
          args: Prisma.TemplateFindUniqueArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Template>
          payload: TemplatePayload<ExtArgs>
        }
        findUniqueOrThrow: {
          args: Prisma.TemplateFindUniqueOrThrowArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Template>
          payload: TemplatePayload<ExtArgs>
        }
        findFirst: {
          args: Prisma.TemplateFindFirstArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Template>
          payload: TemplatePayload<ExtArgs>
        }
        findFirstOrThrow: {
          args: Prisma.TemplateFindFirstOrThrowArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Template>
          payload: TemplatePayload<ExtArgs>
        }
        findMany: {
          args: Prisma.TemplateFindManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Template>
          payload: TemplatePayload<ExtArgs>
        }
        create: {
          args: Prisma.TemplateCreateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Template>
          payload: TemplatePayload<ExtArgs>
        }
        createMany: {
          args: Prisma.TemplateCreateManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Template>
          payload: TemplatePayload<ExtArgs>
        }
        delete: {
          args: Prisma.TemplateDeleteArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Template>
          payload: TemplatePayload<ExtArgs>
        }
        update: {
          args: Prisma.TemplateUpdateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Template>
          payload: TemplatePayload<ExtArgs>
        }
        deleteMany: {
          args: Prisma.TemplateDeleteManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Template>
          payload: TemplatePayload<ExtArgs>
        }
        updateMany: {
          args: Prisma.TemplateUpdateManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Template>
          payload: TemplatePayload<ExtArgs>
        }
        upsert: {
          args: Prisma.TemplateUpsertArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Template>
          payload: TemplatePayload<ExtArgs>
        }
        aggregate: {
          args: Prisma.TemplateAggregateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Template>
          payload: TemplatePayload<ExtArgs>
        }
        groupBy: {
          args: Prisma.TemplateGroupByArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Template>
          payload: TemplatePayload<ExtArgs>
        }
        findRaw: {
          args: Prisma.TemplateFindRawArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Template>
          payload: TemplatePayload<ExtArgs>
        }
        aggregateRaw: {
          args: Prisma.TemplateAggregateRawArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Template>
          payload: TemplatePayload<ExtArgs>
        }
        count: {
          args: Prisma.TemplateCountArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Template>
          payload: TemplatePayload<ExtArgs>
        }
      }
    }
  } & {
    other: {
      $runCommandRaw: {
        args: Prisma.InputJsonObject,
        result: Prisma.JsonObject
        payload: any
      }
    }
  }
    export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

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
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
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
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

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
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

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
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    websites: number
    templates: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    websites?: boolean | UserCountOutputTypeCountWebsitesArgs
    templates?: boolean | UserCountOutputTypeCountTemplatesArgs
  }

  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWebsitesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: WebsiteWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTemplatesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: TemplateWhereInput
  }



  /**
   * Count Type TemplateCountOutputType
   */


  export type TemplateCountOutputType = {
    websitesUsing: number
  }

  export type TemplateCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    websitesUsing?: boolean | TemplateCountOutputTypeCountWebsitesUsingArgs
  }

  // Custom InputTypes

  /**
   * TemplateCountOutputType without action
   */
  export type TemplateCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateCountOutputType
     */
    select?: TemplateCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * TemplateCountOutputType without action
   */
  export type TemplateCountOutputTypeCountWebsitesUsingArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: WebsiteWhereInput
  }



  /**
   * Models
   */

  /**
   * Model Media
   */





  export type MediaSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    type?: boolean
    uri?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["media"]>

  export type MediaSelectScalar = {
    name?: boolean
    type?: boolean
    uri?: boolean
    createdAt?: boolean
  }


  type MediaGetPayload<S extends boolean | null | undefined | MediaArgs> = $Types.GetResult<MediaPayload, S>





  // Custom InputTypes

  /**
   * Media without action
   */
  export type MediaArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
  }



  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    role: Role | null
    username: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    membership: Membership | null
    lastLogin: Date | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    role: Role | null
    username: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    membership: Membership | null
    lastLogin: Date | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    role: number
    username: number
    email: number
    password: number
    firstName: number
    lastName: number
    membership: number
    lastLogin: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    role?: true
    username?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    membership?: true
    lastLogin?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    role?: true
    username?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    membership?: true
    lastLogin?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    role?: true
    username?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    membership?: true
    lastLogin?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: UserScalarFieldEnum[]
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: string
    role: Role
    username: string
    email: string
    password: string
    firstName: string | null
    lastName: string | null
    membership: Membership
    lastLogin: Date | null
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    membership?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    websites?: boolean | User$websitesArgs<ExtArgs>
    templates?: boolean | User$templatesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    role?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    membership?: boolean
    lastLogin?: boolean
    createdAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    websites?: boolean | User$websitesArgs<ExtArgs>
    templates?: boolean | User$templatesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeArgs<ExtArgs>
  }


  type UserGetPayload<S extends boolean | null | undefined | UserArgs> = $Types.GetResult<UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<UserPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: UserFindRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: UserAggregateRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    websites<T extends User$websitesArgs<ExtArgs> = {}>(args?: Subset<T, User$websitesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<WebsitePayload<ExtArgs>, T, 'findMany', never>| Null>;

    templates<T extends User$templatesArgs<ExtArgs> = {}>(args?: Subset<T, User$templatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<TemplatePayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUnique
   */
  export interface UserFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User findFirst
   */
  export interface UserFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Enumerable<UserCreateManyInput>
  }


  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * User.websites
   */
  export type User$websitesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude<ExtArgs> | null
    where?: WebsiteWhereInput
    orderBy?: Enumerable<WebsiteOrderByWithRelationInput>
    cursor?: WebsiteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<WebsiteScalarFieldEnum>
  }


  /**
   * User.templates
   */
  export type User$templatesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TemplateInclude<ExtArgs> | null
    where?: TemplateWhereInput
    orderBy?: Enumerable<TemplateOrderByWithRelationInput>
    cursor?: TemplateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<TemplateScalarFieldEnum>
  }


  /**
   * User without action
   */
  export type UserArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
  }



  /**
   * Model Website
   */


  export type AggregateWebsite = {
    _count: WebsiteCountAggregateOutputType | null
    _min: WebsiteMinAggregateOutputType | null
    _max: WebsiteMaxAggregateOutputType | null
  }

  export type WebsiteMinAggregateOutputType = {
    id: string | null
    title: string | null
    url: string | null
    tree: string | null
    createdAt: Date | null
    authorId: string | null
    templateId: string | null
  }

  export type WebsiteMaxAggregateOutputType = {
    id: string | null
    title: string | null
    url: string | null
    tree: string | null
    createdAt: Date | null
    authorId: string | null
    templateId: string | null
  }

  export type WebsiteCountAggregateOutputType = {
    id: number
    title: number
    url: number
    tree: number
    createdAt: number
    authorId: number
    templateId: number
    _all: number
  }


  export type WebsiteMinAggregateInputType = {
    id?: true
    title?: true
    url?: true
    tree?: true
    createdAt?: true
    authorId?: true
    templateId?: true
  }

  export type WebsiteMaxAggregateInputType = {
    id?: true
    title?: true
    url?: true
    tree?: true
    createdAt?: true
    authorId?: true
    templateId?: true
  }

  export type WebsiteCountAggregateInputType = {
    id?: true
    title?: true
    url?: true
    tree?: true
    createdAt?: true
    authorId?: true
    templateId?: true
    _all?: true
  }

  export type WebsiteAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Website to aggregate.
     */
    where?: WebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Websites to fetch.
     */
    orderBy?: Enumerable<WebsiteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Websites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Websites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Websites
    **/
    _count?: true | WebsiteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebsiteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebsiteMaxAggregateInputType
  }

  export type GetWebsiteAggregateType<T extends WebsiteAggregateArgs> = {
        [P in keyof T & keyof AggregateWebsite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebsite[P]>
      : GetScalarType<T[P], AggregateWebsite[P]>
  }




  export type WebsiteGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: WebsiteWhereInput
    orderBy?: Enumerable<WebsiteOrderByWithAggregationInput>
    by: WebsiteScalarFieldEnum[]
    having?: WebsiteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebsiteCountAggregateInputType | true
    _min?: WebsiteMinAggregateInputType
    _max?: WebsiteMaxAggregateInputType
  }


  export type WebsiteGroupByOutputType = {
    id: string
    title: string
    url: string
    tree: string
    createdAt: Date
    authorId: string
    templateId: string | null
    _count: WebsiteCountAggregateOutputType | null
    _min: WebsiteMinAggregateOutputType | null
    _max: WebsiteMaxAggregateOutputType | null
  }

  type GetWebsiteGroupByPayload<T extends WebsiteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<WebsiteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebsiteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebsiteGroupByOutputType[P]>
            : GetScalarType<T[P], WebsiteGroupByOutputType[P]>
        }
      >
    >


  export type WebsiteSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    url?: boolean
    tree?: boolean
    createdAt?: boolean
    medias?: boolean | MediaArgs<ExtArgs>
    authorId?: boolean
    templateId?: boolean
    author?: boolean | UserArgs<ExtArgs>
    template?: boolean | TemplateArgs<ExtArgs>
  }, ExtArgs["result"]["website"]>

  export type WebsiteSelectScalar = {
    id?: boolean
    title?: boolean
    url?: boolean
    tree?: boolean
    createdAt?: boolean
    authorId?: boolean
    templateId?: boolean
  }

  export type WebsiteInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    author?: boolean | UserArgs<ExtArgs>
    template?: boolean | TemplateArgs<ExtArgs>
  }


  type WebsiteGetPayload<S extends boolean | null | undefined | WebsiteArgs> = $Types.GetResult<WebsitePayload, S>

  type WebsiteCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<WebsiteFindManyArgs, 'select' | 'include'> & {
      select?: WebsiteCountAggregateInputType | true
    }

  export interface WebsiteDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Website'], meta: { name: 'Website' } }
    /**
     * Find zero or one Website that matches the filter.
     * @param {WebsiteFindUniqueArgs} args - Arguments to find a Website
     * @example
     * // Get one Website
     * const website = await prisma.website.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends WebsiteFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, WebsiteFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Website'> extends True ? Prisma__WebsiteClient<$Types.GetResult<WebsitePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__WebsiteClient<$Types.GetResult<WebsitePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Website that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {WebsiteFindUniqueOrThrowArgs} args - Arguments to find a Website
     * @example
     * // Get one Website
     * const website = await prisma.website.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends WebsiteFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, WebsiteFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__WebsiteClient<$Types.GetResult<WebsitePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Website that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteFindFirstArgs} args - Arguments to find a Website
     * @example
     * // Get one Website
     * const website = await prisma.website.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends WebsiteFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, WebsiteFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Website'> extends True ? Prisma__WebsiteClient<$Types.GetResult<WebsitePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__WebsiteClient<$Types.GetResult<WebsitePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Website that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteFindFirstOrThrowArgs} args - Arguments to find a Website
     * @example
     * // Get one Website
     * const website = await prisma.website.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends WebsiteFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, WebsiteFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__WebsiteClient<$Types.GetResult<WebsitePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Websites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Websites
     * const websites = await prisma.website.findMany()
     * 
     * // Get first 10 Websites
     * const websites = await prisma.website.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const websiteWithIdOnly = await prisma.website.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends WebsiteFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WebsiteFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<WebsitePayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Website.
     * @param {WebsiteCreateArgs} args - Arguments to create a Website.
     * @example
     * // Create one Website
     * const Website = await prisma.website.create({
     *   data: {
     *     // ... data to create a Website
     *   }
     * })
     * 
    **/
    create<T extends WebsiteCreateArgs<ExtArgs>>(
      args: SelectSubset<T, WebsiteCreateArgs<ExtArgs>>
    ): Prisma__WebsiteClient<$Types.GetResult<WebsitePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Websites.
     *     @param {WebsiteCreateManyArgs} args - Arguments to create many Websites.
     *     @example
     *     // Create many Websites
     *     const website = await prisma.website.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends WebsiteCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WebsiteCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Website.
     * @param {WebsiteDeleteArgs} args - Arguments to delete one Website.
     * @example
     * // Delete one Website
     * const Website = await prisma.website.delete({
     *   where: {
     *     // ... filter to delete one Website
     *   }
     * })
     * 
    **/
    delete<T extends WebsiteDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, WebsiteDeleteArgs<ExtArgs>>
    ): Prisma__WebsiteClient<$Types.GetResult<WebsitePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Website.
     * @param {WebsiteUpdateArgs} args - Arguments to update one Website.
     * @example
     * // Update one Website
     * const website = await prisma.website.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends WebsiteUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, WebsiteUpdateArgs<ExtArgs>>
    ): Prisma__WebsiteClient<$Types.GetResult<WebsitePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Websites.
     * @param {WebsiteDeleteManyArgs} args - Arguments to filter Websites to delete.
     * @example
     * // Delete a few Websites
     * const { count } = await prisma.website.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends WebsiteDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, WebsiteDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Websites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Websites
     * const website = await prisma.website.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends WebsiteUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, WebsiteUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Website.
     * @param {WebsiteUpsertArgs} args - Arguments to update or create a Website.
     * @example
     * // Update or create a Website
     * const website = await prisma.website.upsert({
     *   create: {
     *     // ... data to create a Website
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Website we want to update
     *   }
     * })
    **/
    upsert<T extends WebsiteUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, WebsiteUpsertArgs<ExtArgs>>
    ): Prisma__WebsiteClient<$Types.GetResult<WebsitePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Find zero or more Websites that matches the filter.
     * @param {WebsiteFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const website = await prisma.website.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: WebsiteFindRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Website.
     * @param {WebsiteAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const website = await prisma.website.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: WebsiteAggregateRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Count the number of Websites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteCountArgs} args - Arguments to filter Websites to count.
     * @example
     * // Count the number of Websites
     * const count = await prisma.website.count({
     *   where: {
     *     // ... the filter for the Websites we want to count
     *   }
     * })
    **/
    count<T extends WebsiteCountArgs>(
      args?: Subset<T, WebsiteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebsiteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Website.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WebsiteAggregateArgs>(args: Subset<T, WebsiteAggregateArgs>): Prisma.PrismaPromise<GetWebsiteAggregateType<T>>

    /**
     * Group by Website.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebsiteGroupByArgs} args - Group by arguments.
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
      T extends WebsiteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebsiteGroupByArgs['orderBy'] }
        : { orderBy?: WebsiteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, WebsiteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebsiteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Website.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__WebsiteClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    author<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    template<T extends TemplateArgs<ExtArgs> = {}>(args?: Subset<T, TemplateArgs<ExtArgs>>): Prisma__TemplateClient<$Types.GetResult<TemplatePayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Website base type for findUnique actions
   */
  export type WebsiteFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude<ExtArgs> | null
    /**
     * Filter, which Website to fetch.
     */
    where: WebsiteWhereUniqueInput
  }

  /**
   * Website findUnique
   */
  export interface WebsiteFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends WebsiteFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Website findUniqueOrThrow
   */
  export type WebsiteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude<ExtArgs> | null
    /**
     * Filter, which Website to fetch.
     */
    where: WebsiteWhereUniqueInput
  }


  /**
   * Website base type for findFirst actions
   */
  export type WebsiteFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude<ExtArgs> | null
    /**
     * Filter, which Website to fetch.
     */
    where?: WebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Websites to fetch.
     */
    orderBy?: Enumerable<WebsiteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Websites.
     */
    cursor?: WebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Websites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Websites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Websites.
     */
    distinct?: Enumerable<WebsiteScalarFieldEnum>
  }

  /**
   * Website findFirst
   */
  export interface WebsiteFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends WebsiteFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Website findFirstOrThrow
   */
  export type WebsiteFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude<ExtArgs> | null
    /**
     * Filter, which Website to fetch.
     */
    where?: WebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Websites to fetch.
     */
    orderBy?: Enumerable<WebsiteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Websites.
     */
    cursor?: WebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Websites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Websites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Websites.
     */
    distinct?: Enumerable<WebsiteScalarFieldEnum>
  }


  /**
   * Website findMany
   */
  export type WebsiteFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude<ExtArgs> | null
    /**
     * Filter, which Websites to fetch.
     */
    where?: WebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Websites to fetch.
     */
    orderBy?: Enumerable<WebsiteOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Websites.
     */
    cursor?: WebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Websites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Websites.
     */
    skip?: number
    distinct?: Enumerable<WebsiteScalarFieldEnum>
  }


  /**
   * Website create
   */
  export type WebsiteCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude<ExtArgs> | null
    /**
     * The data needed to create a Website.
     */
    data: XOR<WebsiteCreateInput, WebsiteUncheckedCreateInput>
  }


  /**
   * Website createMany
   */
  export type WebsiteCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Websites.
     */
    data: Enumerable<WebsiteCreateManyInput>
  }


  /**
   * Website update
   */
  export type WebsiteUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude<ExtArgs> | null
    /**
     * The data needed to update a Website.
     */
    data: XOR<WebsiteUpdateInput, WebsiteUncheckedUpdateInput>
    /**
     * Choose, which Website to update.
     */
    where: WebsiteWhereUniqueInput
  }


  /**
   * Website updateMany
   */
  export type WebsiteUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Websites.
     */
    data: XOR<WebsiteUpdateManyMutationInput, WebsiteUncheckedUpdateManyInput>
    /**
     * Filter which Websites to update
     */
    where?: WebsiteWhereInput
  }


  /**
   * Website upsert
   */
  export type WebsiteUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude<ExtArgs> | null
    /**
     * The filter to search for the Website to update in case it exists.
     */
    where: WebsiteWhereUniqueInput
    /**
     * In case the Website found by the `where` argument doesn't exist, create a new Website with this data.
     */
    create: XOR<WebsiteCreateInput, WebsiteUncheckedCreateInput>
    /**
     * In case the Website was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebsiteUpdateInput, WebsiteUncheckedUpdateInput>
  }


  /**
   * Website delete
   */
  export type WebsiteDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude<ExtArgs> | null
    /**
     * Filter which Website to delete.
     */
    where: WebsiteWhereUniqueInput
  }


  /**
   * Website deleteMany
   */
  export type WebsiteDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Websites to delete
     */
    where?: WebsiteWhereInput
  }


  /**
   * Website findRaw
   */
  export type WebsiteFindRawArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * Website aggregateRaw
   */
  export type WebsiteAggregateRawArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * Website without action
   */
  export type WebsiteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude<ExtArgs> | null
  }



  /**
   * Model Template
   */


  export type AggregateTemplate = {
    _count: TemplateCountAggregateOutputType | null
    _avg: TemplateAvgAggregateOutputType | null
    _sum: TemplateSumAggregateOutputType | null
    _min: TemplateMinAggregateOutputType | null
    _max: TemplateMaxAggregateOutputType | null
  }

  export type TemplateAvgAggregateOutputType = {
    likes: number | null
  }

  export type TemplateSumAggregateOutputType = {
    likes: number | null
  }

  export type TemplateMinAggregateOutputType = {
    id: string | null
    name: string | null
    title: string | null
    tree: string | null
    createdAt: Date | null
    likes: number | null
    authorId: string | null
  }

  export type TemplateMaxAggregateOutputType = {
    id: string | null
    name: string | null
    title: string | null
    tree: string | null
    createdAt: Date | null
    likes: number | null
    authorId: string | null
  }

  export type TemplateCountAggregateOutputType = {
    id: number
    name: number
    title: number
    tree: number
    createdAt: number
    likes: number
    authorId: number
    _all: number
  }


  export type TemplateAvgAggregateInputType = {
    likes?: true
  }

  export type TemplateSumAggregateInputType = {
    likes?: true
  }

  export type TemplateMinAggregateInputType = {
    id?: true
    name?: true
    title?: true
    tree?: true
    createdAt?: true
    likes?: true
    authorId?: true
  }

  export type TemplateMaxAggregateInputType = {
    id?: true
    name?: true
    title?: true
    tree?: true
    createdAt?: true
    likes?: true
    authorId?: true
  }

  export type TemplateCountAggregateInputType = {
    id?: true
    name?: true
    title?: true
    tree?: true
    createdAt?: true
    likes?: true
    authorId?: true
    _all?: true
  }

  export type TemplateAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Template to aggregate.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: Enumerable<TemplateOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Templates
    **/
    _count?: true | TemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TemplateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TemplateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TemplateMaxAggregateInputType
  }

  export type GetTemplateAggregateType<T extends TemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTemplate[P]>
      : GetScalarType<T[P], AggregateTemplate[P]>
  }




  export type TemplateGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: TemplateWhereInput
    orderBy?: Enumerable<TemplateOrderByWithAggregationInput>
    by: TemplateScalarFieldEnum[]
    having?: TemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TemplateCountAggregateInputType | true
    _avg?: TemplateAvgAggregateInputType
    _sum?: TemplateSumAggregateInputType
    _min?: TemplateMinAggregateInputType
    _max?: TemplateMaxAggregateInputType
  }


  export type TemplateGroupByOutputType = {
    id: string
    name: string
    title: string
    tree: string
    createdAt: Date
    likes: number
    authorId: string | null
    _count: TemplateCountAggregateOutputType | null
    _avg: TemplateAvgAggregateOutputType | null
    _sum: TemplateSumAggregateOutputType | null
    _min: TemplateMinAggregateOutputType | null
    _max: TemplateMaxAggregateOutputType | null
  }

  type GetTemplateGroupByPayload<T extends TemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<TemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TemplateGroupByOutputType[P]>
            : GetScalarType<T[P], TemplateGroupByOutputType[P]>
        }
      >
    >


  export type TemplateSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    title?: boolean
    tree?: boolean
    createdAt?: boolean
    likes?: boolean
    medias?: boolean | MediaArgs<ExtArgs>
    authorId?: boolean
    websitesUsing?: boolean | Template$websitesUsingArgs<ExtArgs>
    author?: boolean | UserArgs<ExtArgs>
    _count?: boolean | TemplateCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["template"]>

  export type TemplateSelectScalar = {
    id?: boolean
    name?: boolean
    title?: boolean
    tree?: boolean
    createdAt?: boolean
    likes?: boolean
    authorId?: boolean
  }

  export type TemplateInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    websitesUsing?: boolean | Template$websitesUsingArgs<ExtArgs>
    author?: boolean | UserArgs<ExtArgs>
    _count?: boolean | TemplateCountOutputTypeArgs<ExtArgs>
  }


  type TemplateGetPayload<S extends boolean | null | undefined | TemplateArgs> = $Types.GetResult<TemplatePayload, S>

  type TemplateCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<TemplateFindManyArgs, 'select' | 'include'> & {
      select?: TemplateCountAggregateInputType | true
    }

  export interface TemplateDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Template'], meta: { name: 'Template' } }
    /**
     * Find zero or one Template that matches the filter.
     * @param {TemplateFindUniqueArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TemplateFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TemplateFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Template'> extends True ? Prisma__TemplateClient<$Types.GetResult<TemplatePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__TemplateClient<$Types.GetResult<TemplatePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Template that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TemplateFindUniqueOrThrowArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TemplateFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TemplateFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TemplateClient<$Types.GetResult<TemplatePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Template that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindFirstArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TemplateFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TemplateFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Template'> extends True ? Prisma__TemplateClient<$Types.GetResult<TemplatePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__TemplateClient<$Types.GetResult<TemplatePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Template that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindFirstOrThrowArgs} args - Arguments to find a Template
     * @example
     * // Get one Template
     * const template = await prisma.template.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TemplateFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TemplateFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TemplateClient<$Types.GetResult<TemplatePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Templates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Templates
     * const templates = await prisma.template.findMany()
     * 
     * // Get first 10 Templates
     * const templates = await prisma.template.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const templateWithIdOnly = await prisma.template.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TemplateFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TemplateFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<TemplatePayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Template.
     * @param {TemplateCreateArgs} args - Arguments to create a Template.
     * @example
     * // Create one Template
     * const Template = await prisma.template.create({
     *   data: {
     *     // ... data to create a Template
     *   }
     * })
     * 
    **/
    create<T extends TemplateCreateArgs<ExtArgs>>(
      args: SelectSubset<T, TemplateCreateArgs<ExtArgs>>
    ): Prisma__TemplateClient<$Types.GetResult<TemplatePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Templates.
     *     @param {TemplateCreateManyArgs} args - Arguments to create many Templates.
     *     @example
     *     // Create many Templates
     *     const template = await prisma.template.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TemplateCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TemplateCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Template.
     * @param {TemplateDeleteArgs} args - Arguments to delete one Template.
     * @example
     * // Delete one Template
     * const Template = await prisma.template.delete({
     *   where: {
     *     // ... filter to delete one Template
     *   }
     * })
     * 
    **/
    delete<T extends TemplateDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, TemplateDeleteArgs<ExtArgs>>
    ): Prisma__TemplateClient<$Types.GetResult<TemplatePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Template.
     * @param {TemplateUpdateArgs} args - Arguments to update one Template.
     * @example
     * // Update one Template
     * const template = await prisma.template.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TemplateUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, TemplateUpdateArgs<ExtArgs>>
    ): Prisma__TemplateClient<$Types.GetResult<TemplatePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Templates.
     * @param {TemplateDeleteManyArgs} args - Arguments to filter Templates to delete.
     * @example
     * // Delete a few Templates
     * const { count } = await prisma.template.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TemplateDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TemplateDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Templates
     * const template = await prisma.template.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TemplateUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, TemplateUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Template.
     * @param {TemplateUpsertArgs} args - Arguments to update or create a Template.
     * @example
     * // Update or create a Template
     * const template = await prisma.template.upsert({
     *   create: {
     *     // ... data to create a Template
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Template we want to update
     *   }
     * })
    **/
    upsert<T extends TemplateUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, TemplateUpsertArgs<ExtArgs>>
    ): Prisma__TemplateClient<$Types.GetResult<TemplatePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Find zero or more Templates that matches the filter.
     * @param {TemplateFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const template = await prisma.template.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: TemplateFindRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Template.
     * @param {TemplateAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const template = await prisma.template.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: TemplateAggregateRawArgs
    ): Prisma.PrismaPromise<JsonObject>

    /**
     * Count the number of Templates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateCountArgs} args - Arguments to filter Templates to count.
     * @example
     * // Count the number of Templates
     * const count = await prisma.template.count({
     *   where: {
     *     // ... the filter for the Templates we want to count
     *   }
     * })
    **/
    count<T extends TemplateCountArgs>(
      args?: Subset<T, TemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Template.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TemplateAggregateArgs>(args: Subset<T, TemplateAggregateArgs>): Prisma.PrismaPromise<GetTemplateAggregateType<T>>

    /**
     * Group by Template.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateGroupByArgs} args - Group by arguments.
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
      T extends TemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TemplateGroupByArgs['orderBy'] }
        : { orderBy?: TemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, TemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Template.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TemplateClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    websitesUsing<T extends Template$websitesUsingArgs<ExtArgs> = {}>(args?: Subset<T, Template$websitesUsingArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<WebsitePayload<ExtArgs>, T, 'findMany', never>| Null>;

    author<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Template base type for findUnique actions
   */
  export type TemplateFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where: TemplateWhereUniqueInput
  }

  /**
   * Template findUnique
   */
  export interface TemplateFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends TemplateFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Template findUniqueOrThrow
   */
  export type TemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where: TemplateWhereUniqueInput
  }


  /**
   * Template base type for findFirst actions
   */
  export type TemplateFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: Enumerable<TemplateOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Templates.
     */
    distinct?: Enumerable<TemplateScalarFieldEnum>
  }

  /**
   * Template findFirst
   */
  export interface TemplateFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends TemplateFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Template findFirstOrThrow
   */
  export type TemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Template to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: Enumerable<TemplateOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Templates.
     */
    distinct?: Enumerable<TemplateScalarFieldEnum>
  }


  /**
   * Template findMany
   */
  export type TemplateFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter, which Templates to fetch.
     */
    where?: TemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Templates to fetch.
     */
    orderBy?: Enumerable<TemplateOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Templates.
     */
    cursor?: TemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Templates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Templates.
     */
    skip?: number
    distinct?: Enumerable<TemplateScalarFieldEnum>
  }


  /**
   * Template create
   */
  export type TemplateCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * The data needed to create a Template.
     */
    data: XOR<TemplateCreateInput, TemplateUncheckedCreateInput>
  }


  /**
   * Template createMany
   */
  export type TemplateCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Templates.
     */
    data: Enumerable<TemplateCreateManyInput>
  }


  /**
   * Template update
   */
  export type TemplateUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * The data needed to update a Template.
     */
    data: XOR<TemplateUpdateInput, TemplateUncheckedUpdateInput>
    /**
     * Choose, which Template to update.
     */
    where: TemplateWhereUniqueInput
  }


  /**
   * Template updateMany
   */
  export type TemplateUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Templates.
     */
    data: XOR<TemplateUpdateManyMutationInput, TemplateUncheckedUpdateManyInput>
    /**
     * Filter which Templates to update
     */
    where?: TemplateWhereInput
  }


  /**
   * Template upsert
   */
  export type TemplateUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * The filter to search for the Template to update in case it exists.
     */
    where: TemplateWhereUniqueInput
    /**
     * In case the Template found by the `where` argument doesn't exist, create a new Template with this data.
     */
    create: XOR<TemplateCreateInput, TemplateUncheckedCreateInput>
    /**
     * In case the Template was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TemplateUpdateInput, TemplateUncheckedUpdateInput>
  }


  /**
   * Template delete
   */
  export type TemplateDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TemplateInclude<ExtArgs> | null
    /**
     * Filter which Template to delete.
     */
    where: TemplateWhereUniqueInput
  }


  /**
   * Template deleteMany
   */
  export type TemplateDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Templates to delete
     */
    where?: TemplateWhereInput
  }


  /**
   * Template findRaw
   */
  export type TemplateFindRawArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * Template aggregateRaw
   */
  export type TemplateAggregateRawArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }


  /**
   * Template.websitesUsing
   */
  export type Template$websitesUsingArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Website
     */
    select?: WebsiteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: WebsiteInclude<ExtArgs> | null
    where?: WebsiteWhereInput
    orderBy?: Enumerable<WebsiteOrderByWithRelationInput>
    cursor?: WebsiteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<WebsiteScalarFieldEnum>
  }


  /**
   * Template without action
   */
  export type TemplateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Template
     */
    select?: TemplateSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TemplateInclude<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const UserScalarFieldEnum: {
    id: 'id',
    role: 'role',
    username: 'username',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    membership: 'membership',
    lastLogin: 'lastLogin',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const WebsiteScalarFieldEnum: {
    id: 'id',
    title: 'title',
    url: 'url',
    tree: 'tree',
    createdAt: 'createdAt',
    authorId: 'authorId',
    templateId: 'templateId'
  };

  export type WebsiteScalarFieldEnum = (typeof WebsiteScalarFieldEnum)[keyof typeof WebsiteScalarFieldEnum]


  export const TemplateScalarFieldEnum: {
    id: 'id',
    name: 'name',
    title: 'title',
    tree: 'tree',
    createdAt: 'createdAt',
    likes: 'likes',
    authorId: 'authorId'
  };

  export type TemplateScalarFieldEnum = (typeof TemplateScalarFieldEnum)[keyof typeof TemplateScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    role?: EnumRoleFilter | Role
    username?: StringFilter | string
    email?: StringFilter | string
    password?: StringFilter | string
    firstName?: StringNullableFilter | string | null
    lastName?: StringNullableFilter | string | null
    membership?: EnumMembershipFilter | Membership
    lastLogin?: DateTimeNullableFilter | Date | string | null
    createdAt?: DateTimeFilter | Date | string
    websites?: WebsiteListRelationFilter
    templates?: TemplateListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    membership?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    websites?: WebsiteOrderByRelationAggregateInput
    templates?: TemplateOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: string
    username?: string
    email?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    membership?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    role?: EnumRoleWithAggregatesFilter | Role
    username?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    password?: StringWithAggregatesFilter | string
    firstName?: StringNullableWithAggregatesFilter | string | null
    lastName?: StringNullableWithAggregatesFilter | string | null
    membership?: EnumMembershipWithAggregatesFilter | Membership
    lastLogin?: DateTimeNullableWithAggregatesFilter | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type WebsiteWhereInput = {
    AND?: Enumerable<WebsiteWhereInput>
    OR?: Enumerable<WebsiteWhereInput>
    NOT?: Enumerable<WebsiteWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    url?: StringFilter | string
    tree?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    medias?: XOR<MediaCompositeListFilter, Enumerable<MediaObjectEqualityInput>>
    authorId?: StringFilter | string
    templateId?: StringNullableFilter | string | null
    author?: XOR<UserRelationFilter, UserWhereInput>
    template?: XOR<TemplateRelationFilter, TemplateWhereInput> | null
  }

  export type WebsiteOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    tree?: SortOrder
    createdAt?: SortOrder
    medias?: MediaOrderByCompositeAggregateInput
    authorId?: SortOrder
    templateId?: SortOrder
    author?: UserOrderByWithRelationInput
    template?: TemplateOrderByWithRelationInput
  }

  export type WebsiteWhereUniqueInput = {
    id?: string
    url?: string
  }

  export type WebsiteOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    tree?: SortOrder
    createdAt?: SortOrder
    authorId?: SortOrder
    templateId?: SortOrder
    _count?: WebsiteCountOrderByAggregateInput
    _max?: WebsiteMaxOrderByAggregateInput
    _min?: WebsiteMinOrderByAggregateInput
  }

  export type WebsiteScalarWhereWithAggregatesInput = {
    AND?: Enumerable<WebsiteScalarWhereWithAggregatesInput>
    OR?: Enumerable<WebsiteScalarWhereWithAggregatesInput>
    NOT?: Enumerable<WebsiteScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    url?: StringWithAggregatesFilter | string
    tree?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    authorId?: StringWithAggregatesFilter | string
    templateId?: StringNullableWithAggregatesFilter | string | null
  }

  export type TemplateWhereInput = {
    AND?: Enumerable<TemplateWhereInput>
    OR?: Enumerable<TemplateWhereInput>
    NOT?: Enumerable<TemplateWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    title?: StringFilter | string
    tree?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    likes?: IntFilter | number
    medias?: XOR<MediaCompositeListFilter, Enumerable<MediaObjectEqualityInput>>
    authorId?: StringNullableFilter | string | null
    websitesUsing?: WebsiteListRelationFilter
    author?: XOR<UserRelationFilter, UserWhereInput> | null
  }

  export type TemplateOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    tree?: SortOrder
    createdAt?: SortOrder
    likes?: SortOrder
    medias?: MediaOrderByCompositeAggregateInput
    authorId?: SortOrder
    websitesUsing?: WebsiteOrderByRelationAggregateInput
    author?: UserOrderByWithRelationInput
  }

  export type TemplateWhereUniqueInput = {
    id?: string
    name?: string
  }

  export type TemplateOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    tree?: SortOrder
    createdAt?: SortOrder
    likes?: SortOrder
    authorId?: SortOrder
    _count?: TemplateCountOrderByAggregateInput
    _avg?: TemplateAvgOrderByAggregateInput
    _max?: TemplateMaxOrderByAggregateInput
    _min?: TemplateMinOrderByAggregateInput
    _sum?: TemplateSumOrderByAggregateInput
  }

  export type TemplateScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TemplateScalarWhereWithAggregatesInput>
    OR?: Enumerable<TemplateScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TemplateScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    tree?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    likes?: IntWithAggregatesFilter | number
    authorId?: StringNullableWithAggregatesFilter | string | null
  }

  export type UserCreateInput = {
    id?: string
    role?: Role
    username: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    membership?: Membership
    lastLogin?: Date | string | null
    createdAt?: Date | string
    websites?: WebsiteCreateNestedManyWithoutAuthorInput
    templates?: TemplateCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    role?: Role
    username: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    membership?: Membership
    lastLogin?: Date | string | null
    createdAt?: Date | string
    websites?: WebsiteUncheckedCreateNestedManyWithoutAuthorInput
    templates?: TemplateUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserUpdateInput = {
    role?: EnumRoleFieldUpdateOperationsInput | Role
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    membership?: EnumMembershipFieldUpdateOperationsInput | Membership
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    websites?: WebsiteUpdateManyWithoutAuthorNestedInput
    templates?: TemplateUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    role?: EnumRoleFieldUpdateOperationsInput | Role
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    membership?: EnumMembershipFieldUpdateOperationsInput | Membership
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    websites?: WebsiteUncheckedUpdateManyWithoutAuthorNestedInput
    templates?: TemplateUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    role?: Role
    username: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    membership?: Membership
    lastLogin?: Date | string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    role?: EnumRoleFieldUpdateOperationsInput | Role
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    membership?: EnumMembershipFieldUpdateOperationsInput | Membership
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    role?: EnumRoleFieldUpdateOperationsInput | Role
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    membership?: EnumMembershipFieldUpdateOperationsInput | Membership
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebsiteCreateInput = {
    id?: string
    title?: string
    url: string
    tree: string
    createdAt?: Date | string
    medias?: XOR<MediaListCreateEnvelopeInput, Enumerable<MediaCreateInput>>
    author: UserCreateNestedOneWithoutWebsitesInput
    template?: TemplateCreateNestedOneWithoutWebsitesUsingInput
  }

  export type WebsiteUncheckedCreateInput = {
    id?: string
    title?: string
    url: string
    tree: string
    createdAt?: Date | string
    medias?: XOR<MediaListCreateEnvelopeInput, Enumerable<MediaCreateInput>>
    authorId: string
    templateId?: string | null
  }

  export type WebsiteUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    tree?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medias?: XOR<MediaListUpdateEnvelopeInput, Enumerable<MediaCreateInput>>
    author?: UserUpdateOneRequiredWithoutWebsitesNestedInput
    template?: TemplateUpdateOneWithoutWebsitesUsingNestedInput
  }

  export type WebsiteUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    tree?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medias?: XOR<MediaListUpdateEnvelopeInput, Enumerable<MediaCreateInput>>
    authorId?: StringFieldUpdateOperationsInput | string
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WebsiteCreateManyInput = {
    id?: string
    title?: string
    url: string
    tree: string
    createdAt?: Date | string
    medias?: XOR<MediaListCreateEnvelopeInput, Enumerable<MediaCreateInput>>
    authorId: string
    templateId?: string | null
  }

  export type WebsiteUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    tree?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medias?: XOR<MediaListUpdateEnvelopeInput, Enumerable<MediaCreateInput>>
  }

  export type WebsiteUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    tree?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medias?: XOR<MediaListUpdateEnvelopeInput, Enumerable<MediaCreateInput>>
    authorId?: StringFieldUpdateOperationsInput | string
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TemplateCreateInput = {
    id?: string
    name: string
    title?: string
    tree: string
    createdAt?: Date | string
    likes?: number
    medias?: XOR<MediaListCreateEnvelopeInput, Enumerable<MediaCreateInput>>
    websitesUsing?: WebsiteCreateNestedManyWithoutTemplateInput
    author?: UserCreateNestedOneWithoutTemplatesInput
  }

  export type TemplateUncheckedCreateInput = {
    id?: string
    name: string
    title?: string
    tree: string
    createdAt?: Date | string
    likes?: number
    medias?: XOR<MediaListCreateEnvelopeInput, Enumerable<MediaCreateInput>>
    authorId?: string | null
    websitesUsing?: WebsiteUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type TemplateUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    tree?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: IntFieldUpdateOperationsInput | number
    medias?: XOR<MediaListUpdateEnvelopeInput, Enumerable<MediaCreateInput>>
    websitesUsing?: WebsiteUpdateManyWithoutTemplateNestedInput
    author?: UserUpdateOneWithoutTemplatesNestedInput
  }

  export type TemplateUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    tree?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: IntFieldUpdateOperationsInput | number
    medias?: XOR<MediaListUpdateEnvelopeInput, Enumerable<MediaCreateInput>>
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    websitesUsing?: WebsiteUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type TemplateCreateManyInput = {
    id?: string
    name: string
    title?: string
    tree: string
    createdAt?: Date | string
    likes?: number
    medias?: XOR<MediaListCreateEnvelopeInput, Enumerable<MediaCreateInput>>
    authorId?: string | null
  }

  export type TemplateUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    tree?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: IntFieldUpdateOperationsInput | number
    medias?: XOR<MediaListUpdateEnvelopeInput, Enumerable<MediaCreateInput>>
  }

  export type TemplateUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    tree?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: IntFieldUpdateOperationsInput | number
    medias?: XOR<MediaListUpdateEnvelopeInput, Enumerable<MediaCreateInput>>
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type EnumRoleFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleFilter | Role
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
    isSet?: boolean
  }

  export type EnumMembershipFilter = {
    equals?: Membership
    in?: Enumerable<Membership>
    notIn?: Enumerable<Membership>
    not?: NestedEnumMembershipFilter | Membership
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
    isSet?: boolean
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type WebsiteListRelationFilter = {
    every?: WebsiteWhereInput
    some?: WebsiteWhereInput
    none?: WebsiteWhereInput
  }

  export type TemplateListRelationFilter = {
    every?: TemplateWhereInput
    some?: TemplateWhereInput
    none?: TemplateWhereInput
  }

  export type WebsiteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TemplateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    membership?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    membership?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    membership?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type EnumRoleWithAggregatesFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleWithAggregatesFilter | Role
    _count?: NestedIntFilter
    _min?: NestedEnumRoleFilter
    _max?: NestedEnumRoleFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
    isSet?: boolean
  }

  export type EnumMembershipWithAggregatesFilter = {
    equals?: Membership
    in?: Enumerable<Membership>
    notIn?: Enumerable<Membership>
    not?: NestedEnumMembershipWithAggregatesFilter | Membership
    _count?: NestedIntFilter
    _min?: NestedEnumMembershipFilter
    _max?: NestedEnumMembershipFilter
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
    isSet?: boolean
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type MediaCompositeListFilter = {
    equals?: Enumerable<MediaObjectEqualityInput>
    every?: MediaWhereInput
    some?: MediaWhereInput
    none?: MediaWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type MediaObjectEqualityInput = {
    name?: string | null
    type: MediaType
    uri: string
    createdAt: Date | string
  }

  export type UserRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TemplateRelationFilter = {
    is?: TemplateWhereInput | null
    isNot?: TemplateWhereInput | null
  }

  export type MediaOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type WebsiteCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    tree?: SortOrder
    createdAt?: SortOrder
    authorId?: SortOrder
    templateId?: SortOrder
  }

  export type WebsiteMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    tree?: SortOrder
    createdAt?: SortOrder
    authorId?: SortOrder
    templateId?: SortOrder
  }

  export type WebsiteMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    tree?: SortOrder
    createdAt?: SortOrder
    authorId?: SortOrder
    templateId?: SortOrder
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type TemplateCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    tree?: SortOrder
    createdAt?: SortOrder
    likes?: SortOrder
    authorId?: SortOrder
  }

  export type TemplateAvgOrderByAggregateInput = {
    likes?: SortOrder
  }

  export type TemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    tree?: SortOrder
    createdAt?: SortOrder
    likes?: SortOrder
    authorId?: SortOrder
  }

  export type TemplateMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    tree?: SortOrder
    createdAt?: SortOrder
    likes?: SortOrder
    authorId?: SortOrder
  }

  export type TemplateSumOrderByAggregateInput = {
    likes?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type WebsiteCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<WebsiteCreateWithoutAuthorInput>, Enumerable<WebsiteUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<WebsiteCreateOrConnectWithoutAuthorInput>
    createMany?: WebsiteCreateManyAuthorInputEnvelope
    connect?: Enumerable<WebsiteWhereUniqueInput>
  }

  export type TemplateCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<TemplateCreateWithoutAuthorInput>, Enumerable<TemplateUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<TemplateCreateOrConnectWithoutAuthorInput>
    createMany?: TemplateCreateManyAuthorInputEnvelope
    connect?: Enumerable<TemplateWhereUniqueInput>
  }

  export type WebsiteUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<WebsiteCreateWithoutAuthorInput>, Enumerable<WebsiteUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<WebsiteCreateOrConnectWithoutAuthorInput>
    createMany?: WebsiteCreateManyAuthorInputEnvelope
    connect?: Enumerable<WebsiteWhereUniqueInput>
  }

  export type TemplateUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<TemplateCreateWithoutAuthorInput>, Enumerable<TemplateUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<TemplateCreateOrConnectWithoutAuthorInput>
    createMany?: TemplateCreateManyAuthorInputEnvelope
    connect?: Enumerable<TemplateWhereUniqueInput>
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: Role
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type EnumMembershipFieldUpdateOperationsInput = {
    set?: Membership
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WebsiteUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<Enumerable<WebsiteCreateWithoutAuthorInput>, Enumerable<WebsiteUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<WebsiteCreateOrConnectWithoutAuthorInput>
    upsert?: Enumerable<WebsiteUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: WebsiteCreateManyAuthorInputEnvelope
    set?: Enumerable<WebsiteWhereUniqueInput>
    disconnect?: Enumerable<WebsiteWhereUniqueInput>
    delete?: Enumerable<WebsiteWhereUniqueInput>
    connect?: Enumerable<WebsiteWhereUniqueInput>
    update?: Enumerable<WebsiteUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<WebsiteUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<WebsiteScalarWhereInput>
  }

  export type TemplateUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<Enumerable<TemplateCreateWithoutAuthorInput>, Enumerable<TemplateUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<TemplateCreateOrConnectWithoutAuthorInput>
    upsert?: Enumerable<TemplateUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: TemplateCreateManyAuthorInputEnvelope
    set?: Enumerable<TemplateWhereUniqueInput>
    disconnect?: Enumerable<TemplateWhereUniqueInput>
    delete?: Enumerable<TemplateWhereUniqueInput>
    connect?: Enumerable<TemplateWhereUniqueInput>
    update?: Enumerable<TemplateUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<TemplateUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<TemplateScalarWhereInput>
  }

  export type WebsiteUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<Enumerable<WebsiteCreateWithoutAuthorInput>, Enumerable<WebsiteUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<WebsiteCreateOrConnectWithoutAuthorInput>
    upsert?: Enumerable<WebsiteUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: WebsiteCreateManyAuthorInputEnvelope
    set?: Enumerable<WebsiteWhereUniqueInput>
    disconnect?: Enumerable<WebsiteWhereUniqueInput>
    delete?: Enumerable<WebsiteWhereUniqueInput>
    connect?: Enumerable<WebsiteWhereUniqueInput>
    update?: Enumerable<WebsiteUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<WebsiteUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<WebsiteScalarWhereInput>
  }

  export type TemplateUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<Enumerable<TemplateCreateWithoutAuthorInput>, Enumerable<TemplateUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<TemplateCreateOrConnectWithoutAuthorInput>
    upsert?: Enumerable<TemplateUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: TemplateCreateManyAuthorInputEnvelope
    set?: Enumerable<TemplateWhereUniqueInput>
    disconnect?: Enumerable<TemplateWhereUniqueInput>
    delete?: Enumerable<TemplateWhereUniqueInput>
    connect?: Enumerable<TemplateWhereUniqueInput>
    update?: Enumerable<TemplateUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<TemplateUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<TemplateScalarWhereInput>
  }

  export type MediaListCreateEnvelopeInput = {
    set?: Enumerable<MediaCreateInput>
  }

  export type MediaCreateInput = {
    name?: string | null
    type: MediaType
    uri: string
    createdAt?: Date | string
  }

  export type UserCreateNestedOneWithoutWebsitesInput = {
    create?: XOR<UserCreateWithoutWebsitesInput, UserUncheckedCreateWithoutWebsitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutWebsitesInput
    connect?: UserWhereUniqueInput
  }

  export type TemplateCreateNestedOneWithoutWebsitesUsingInput = {
    create?: XOR<TemplateCreateWithoutWebsitesUsingInput, TemplateUncheckedCreateWithoutWebsitesUsingInput>
    connectOrCreate?: TemplateCreateOrConnectWithoutWebsitesUsingInput
    connect?: TemplateWhereUniqueInput
  }

  export type MediaListUpdateEnvelopeInput = {
    set?: Enumerable<MediaCreateInput>
    push?: Enumerable<MediaCreateInput>
    updateMany?: MediaUpdateManyInput
    deleteMany?: MediaDeleteManyInput
  }

  export type UserUpdateOneRequiredWithoutWebsitesNestedInput = {
    create?: XOR<UserCreateWithoutWebsitesInput, UserUncheckedCreateWithoutWebsitesInput>
    connectOrCreate?: UserCreateOrConnectWithoutWebsitesInput
    upsert?: UserUpsertWithoutWebsitesInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutWebsitesInput, UserUncheckedUpdateWithoutWebsitesInput>
  }

  export type TemplateUpdateOneWithoutWebsitesUsingNestedInput = {
    create?: XOR<TemplateCreateWithoutWebsitesUsingInput, TemplateUncheckedCreateWithoutWebsitesUsingInput>
    connectOrCreate?: TemplateCreateOrConnectWithoutWebsitesUsingInput
    upsert?: TemplateUpsertWithoutWebsitesUsingInput
    disconnect?: boolean
    delete?: boolean
    connect?: TemplateWhereUniqueInput
    update?: XOR<TemplateUpdateWithoutWebsitesUsingInput, TemplateUncheckedUpdateWithoutWebsitesUsingInput>
  }

  export type WebsiteCreateNestedManyWithoutTemplateInput = {
    create?: XOR<Enumerable<WebsiteCreateWithoutTemplateInput>, Enumerable<WebsiteUncheckedCreateWithoutTemplateInput>>
    connectOrCreate?: Enumerable<WebsiteCreateOrConnectWithoutTemplateInput>
    createMany?: WebsiteCreateManyTemplateInputEnvelope
    connect?: Enumerable<WebsiteWhereUniqueInput>
  }

  export type UserCreateNestedOneWithoutTemplatesInput = {
    create?: XOR<UserCreateWithoutTemplatesInput, UserUncheckedCreateWithoutTemplatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTemplatesInput
    connect?: UserWhereUniqueInput
  }

  export type WebsiteUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<Enumerable<WebsiteCreateWithoutTemplateInput>, Enumerable<WebsiteUncheckedCreateWithoutTemplateInput>>
    connectOrCreate?: Enumerable<WebsiteCreateOrConnectWithoutTemplateInput>
    createMany?: WebsiteCreateManyTemplateInputEnvelope
    connect?: Enumerable<WebsiteWhereUniqueInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type WebsiteUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<Enumerable<WebsiteCreateWithoutTemplateInput>, Enumerable<WebsiteUncheckedCreateWithoutTemplateInput>>
    connectOrCreate?: Enumerable<WebsiteCreateOrConnectWithoutTemplateInput>
    upsert?: Enumerable<WebsiteUpsertWithWhereUniqueWithoutTemplateInput>
    createMany?: WebsiteCreateManyTemplateInputEnvelope
    set?: Enumerable<WebsiteWhereUniqueInput>
    disconnect?: Enumerable<WebsiteWhereUniqueInput>
    delete?: Enumerable<WebsiteWhereUniqueInput>
    connect?: Enumerable<WebsiteWhereUniqueInput>
    update?: Enumerable<WebsiteUpdateWithWhereUniqueWithoutTemplateInput>
    updateMany?: Enumerable<WebsiteUpdateManyWithWhereWithoutTemplateInput>
    deleteMany?: Enumerable<WebsiteScalarWhereInput>
  }

  export type UserUpdateOneWithoutTemplatesNestedInput = {
    create?: XOR<UserCreateWithoutTemplatesInput, UserUncheckedCreateWithoutTemplatesInput>
    connectOrCreate?: UserCreateOrConnectWithoutTemplatesInput
    upsert?: UserUpsertWithoutTemplatesInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutTemplatesInput, UserUncheckedUpdateWithoutTemplatesInput>
  }

  export type WebsiteUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<Enumerable<WebsiteCreateWithoutTemplateInput>, Enumerable<WebsiteUncheckedCreateWithoutTemplateInput>>
    connectOrCreate?: Enumerable<WebsiteCreateOrConnectWithoutTemplateInput>
    upsert?: Enumerable<WebsiteUpsertWithWhereUniqueWithoutTemplateInput>
    createMany?: WebsiteCreateManyTemplateInputEnvelope
    set?: Enumerable<WebsiteWhereUniqueInput>
    disconnect?: Enumerable<WebsiteWhereUniqueInput>
    delete?: Enumerable<WebsiteWhereUniqueInput>
    connect?: Enumerable<WebsiteWhereUniqueInput>
    update?: Enumerable<WebsiteUpdateWithWhereUniqueWithoutTemplateInput>
    updateMany?: Enumerable<WebsiteUpdateManyWithWhereWithoutTemplateInput>
    deleteMany?: Enumerable<WebsiteScalarWhereInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedEnumRoleFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleFilter | Role
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
    isSet?: boolean
  }

  export type NestedEnumMembershipFilter = {
    equals?: Membership
    in?: Enumerable<Membership>
    notIn?: Enumerable<Membership>
    not?: NestedEnumMembershipFilter | Membership
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
    isSet?: boolean
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedEnumRoleWithAggregatesFilter = {
    equals?: Role
    in?: Enumerable<Role>
    notIn?: Enumerable<Role>
    not?: NestedEnumRoleWithAggregatesFilter | Role
    _count?: NestedIntFilter
    _min?: NestedEnumRoleFilter
    _max?: NestedEnumRoleFilter
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
    isSet?: boolean
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
    isSet?: boolean
  }

  export type NestedEnumMembershipWithAggregatesFilter = {
    equals?: Membership
    in?: Enumerable<Membership>
    notIn?: Enumerable<Membership>
    not?: NestedEnumMembershipWithAggregatesFilter | Membership
    _count?: NestedIntFilter
    _min?: NestedEnumMembershipFilter
    _max?: NestedEnumMembershipFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
    isSet?: boolean
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type MediaWhereInput = {
    AND?: Enumerable<MediaWhereInput>
    OR?: Enumerable<MediaWhereInput>
    NOT?: Enumerable<MediaWhereInput>
    name?: StringNullableFilter | string | null
    type?: EnumMediaTypeFilter | MediaType
    uri?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type WebsiteCreateWithoutAuthorInput = {
    id?: string
    title?: string
    url: string
    tree: string
    createdAt?: Date | string
    medias?: XOR<MediaListCreateEnvelopeInput, Enumerable<MediaCreateInput>>
    template?: TemplateCreateNestedOneWithoutWebsitesUsingInput
  }

  export type WebsiteUncheckedCreateWithoutAuthorInput = {
    id?: string
    title?: string
    url: string
    tree: string
    createdAt?: Date | string
    medias?: XOR<MediaListCreateEnvelopeInput, Enumerable<MediaCreateInput>>
    templateId?: string | null
  }

  export type WebsiteCreateOrConnectWithoutAuthorInput = {
    where: WebsiteWhereUniqueInput
    create: XOR<WebsiteCreateWithoutAuthorInput, WebsiteUncheckedCreateWithoutAuthorInput>
  }

  export type WebsiteCreateManyAuthorInputEnvelope = {
    data: Enumerable<WebsiteCreateManyAuthorInput>
  }

  export type TemplateCreateWithoutAuthorInput = {
    id?: string
    name: string
    title?: string
    tree: string
    createdAt?: Date | string
    likes?: number
    medias?: XOR<MediaListCreateEnvelopeInput, Enumerable<MediaCreateInput>>
    websitesUsing?: WebsiteCreateNestedManyWithoutTemplateInput
  }

  export type TemplateUncheckedCreateWithoutAuthorInput = {
    id?: string
    name: string
    title?: string
    tree: string
    createdAt?: Date | string
    likes?: number
    medias?: XOR<MediaListCreateEnvelopeInput, Enumerable<MediaCreateInput>>
    websitesUsing?: WebsiteUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type TemplateCreateOrConnectWithoutAuthorInput = {
    where: TemplateWhereUniqueInput
    create: XOR<TemplateCreateWithoutAuthorInput, TemplateUncheckedCreateWithoutAuthorInput>
  }

  export type TemplateCreateManyAuthorInputEnvelope = {
    data: Enumerable<TemplateCreateManyAuthorInput>
  }

  export type WebsiteUpsertWithWhereUniqueWithoutAuthorInput = {
    where: WebsiteWhereUniqueInput
    update: XOR<WebsiteUpdateWithoutAuthorInput, WebsiteUncheckedUpdateWithoutAuthorInput>
    create: XOR<WebsiteCreateWithoutAuthorInput, WebsiteUncheckedCreateWithoutAuthorInput>
  }

  export type WebsiteUpdateWithWhereUniqueWithoutAuthorInput = {
    where: WebsiteWhereUniqueInput
    data: XOR<WebsiteUpdateWithoutAuthorInput, WebsiteUncheckedUpdateWithoutAuthorInput>
  }

  export type WebsiteUpdateManyWithWhereWithoutAuthorInput = {
    where: WebsiteScalarWhereInput
    data: XOR<WebsiteUpdateManyMutationInput, WebsiteUncheckedUpdateManyWithoutWebsitesInput>
  }

  export type WebsiteScalarWhereInput = {
    AND?: Enumerable<WebsiteScalarWhereInput>
    OR?: Enumerable<WebsiteScalarWhereInput>
    NOT?: Enumerable<WebsiteScalarWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    url?: StringFilter | string
    tree?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    authorId?: StringFilter | string
    templateId?: StringNullableFilter | string | null
  }

  export type TemplateUpsertWithWhereUniqueWithoutAuthorInput = {
    where: TemplateWhereUniqueInput
    update: XOR<TemplateUpdateWithoutAuthorInput, TemplateUncheckedUpdateWithoutAuthorInput>
    create: XOR<TemplateCreateWithoutAuthorInput, TemplateUncheckedCreateWithoutAuthorInput>
  }

  export type TemplateUpdateWithWhereUniqueWithoutAuthorInput = {
    where: TemplateWhereUniqueInput
    data: XOR<TemplateUpdateWithoutAuthorInput, TemplateUncheckedUpdateWithoutAuthorInput>
  }

  export type TemplateUpdateManyWithWhereWithoutAuthorInput = {
    where: TemplateScalarWhereInput
    data: XOR<TemplateUpdateManyMutationInput, TemplateUncheckedUpdateManyWithoutTemplatesInput>
  }

  export type TemplateScalarWhereInput = {
    AND?: Enumerable<TemplateScalarWhereInput>
    OR?: Enumerable<TemplateScalarWhereInput>
    NOT?: Enumerable<TemplateScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    title?: StringFilter | string
    tree?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    likes?: IntFilter | number
    authorId?: StringNullableFilter | string | null
  }

  export type UserCreateWithoutWebsitesInput = {
    id?: string
    role?: Role
    username: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    membership?: Membership
    lastLogin?: Date | string | null
    createdAt?: Date | string
    templates?: TemplateCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutWebsitesInput = {
    id?: string
    role?: Role
    username: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    membership?: Membership
    lastLogin?: Date | string | null
    createdAt?: Date | string
    templates?: TemplateUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutWebsitesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWebsitesInput, UserUncheckedCreateWithoutWebsitesInput>
  }

  export type TemplateCreateWithoutWebsitesUsingInput = {
    id?: string
    name: string
    title?: string
    tree: string
    createdAt?: Date | string
    likes?: number
    medias?: XOR<MediaListCreateEnvelopeInput, Enumerable<MediaCreateInput>>
    author?: UserCreateNestedOneWithoutTemplatesInput
  }

  export type TemplateUncheckedCreateWithoutWebsitesUsingInput = {
    id?: string
    name: string
    title?: string
    tree: string
    createdAt?: Date | string
    likes?: number
    medias?: XOR<MediaListCreateEnvelopeInput, Enumerable<MediaCreateInput>>
    authorId?: string | null
  }

  export type TemplateCreateOrConnectWithoutWebsitesUsingInput = {
    where: TemplateWhereUniqueInput
    create: XOR<TemplateCreateWithoutWebsitesUsingInput, TemplateUncheckedCreateWithoutWebsitesUsingInput>
  }

  export type MediaUpdateManyInput = {
    where: MediaWhereInput
    data: MediaUpdateInput
  }

  export type MediaDeleteManyInput = {
    where: MediaWhereInput
  }

  export type UserUpsertWithoutWebsitesInput = {
    update: XOR<UserUpdateWithoutWebsitesInput, UserUncheckedUpdateWithoutWebsitesInput>
    create: XOR<UserCreateWithoutWebsitesInput, UserUncheckedCreateWithoutWebsitesInput>
  }

  export type UserUpdateWithoutWebsitesInput = {
    role?: EnumRoleFieldUpdateOperationsInput | Role
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    membership?: EnumMembershipFieldUpdateOperationsInput | Membership
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    templates?: TemplateUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutWebsitesInput = {
    role?: EnumRoleFieldUpdateOperationsInput | Role
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    membership?: EnumMembershipFieldUpdateOperationsInput | Membership
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    templates?: TemplateUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type TemplateUpsertWithoutWebsitesUsingInput = {
    update: XOR<TemplateUpdateWithoutWebsitesUsingInput, TemplateUncheckedUpdateWithoutWebsitesUsingInput>
    create: XOR<TemplateCreateWithoutWebsitesUsingInput, TemplateUncheckedCreateWithoutWebsitesUsingInput>
  }

  export type TemplateUpdateWithoutWebsitesUsingInput = {
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    tree?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: IntFieldUpdateOperationsInput | number
    medias?: XOR<MediaListUpdateEnvelopeInput, Enumerable<MediaCreateInput>>
    author?: UserUpdateOneWithoutTemplatesNestedInput
  }

  export type TemplateUncheckedUpdateWithoutWebsitesUsingInput = {
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    tree?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: IntFieldUpdateOperationsInput | number
    medias?: XOR<MediaListUpdateEnvelopeInput, Enumerable<MediaCreateInput>>
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WebsiteCreateWithoutTemplateInput = {
    id?: string
    title?: string
    url: string
    tree: string
    createdAt?: Date | string
    medias?: XOR<MediaListCreateEnvelopeInput, Enumerable<MediaCreateInput>>
    author: UserCreateNestedOneWithoutWebsitesInput
  }

  export type WebsiteUncheckedCreateWithoutTemplateInput = {
    id?: string
    title?: string
    url: string
    tree: string
    createdAt?: Date | string
    medias?: XOR<MediaListCreateEnvelopeInput, Enumerable<MediaCreateInput>>
    authorId: string
  }

  export type WebsiteCreateOrConnectWithoutTemplateInput = {
    where: WebsiteWhereUniqueInput
    create: XOR<WebsiteCreateWithoutTemplateInput, WebsiteUncheckedCreateWithoutTemplateInput>
  }

  export type WebsiteCreateManyTemplateInputEnvelope = {
    data: Enumerable<WebsiteCreateManyTemplateInput>
  }

  export type UserCreateWithoutTemplatesInput = {
    id?: string
    role?: Role
    username: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    membership?: Membership
    lastLogin?: Date | string | null
    createdAt?: Date | string
    websites?: WebsiteCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutTemplatesInput = {
    id?: string
    role?: Role
    username: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    membership?: Membership
    lastLogin?: Date | string | null
    createdAt?: Date | string
    websites?: WebsiteUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutTemplatesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTemplatesInput, UserUncheckedCreateWithoutTemplatesInput>
  }

  export type WebsiteUpsertWithWhereUniqueWithoutTemplateInput = {
    where: WebsiteWhereUniqueInput
    update: XOR<WebsiteUpdateWithoutTemplateInput, WebsiteUncheckedUpdateWithoutTemplateInput>
    create: XOR<WebsiteCreateWithoutTemplateInput, WebsiteUncheckedCreateWithoutTemplateInput>
  }

  export type WebsiteUpdateWithWhereUniqueWithoutTemplateInput = {
    where: WebsiteWhereUniqueInput
    data: XOR<WebsiteUpdateWithoutTemplateInput, WebsiteUncheckedUpdateWithoutTemplateInput>
  }

  export type WebsiteUpdateManyWithWhereWithoutTemplateInput = {
    where: WebsiteScalarWhereInput
    data: XOR<WebsiteUpdateManyMutationInput, WebsiteUncheckedUpdateManyWithoutWebsitesUsingInput>
  }

  export type UserUpsertWithoutTemplatesInput = {
    update: XOR<UserUpdateWithoutTemplatesInput, UserUncheckedUpdateWithoutTemplatesInput>
    create: XOR<UserCreateWithoutTemplatesInput, UserUncheckedCreateWithoutTemplatesInput>
  }

  export type UserUpdateWithoutTemplatesInput = {
    role?: EnumRoleFieldUpdateOperationsInput | Role
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    membership?: EnumMembershipFieldUpdateOperationsInput | Membership
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    websites?: WebsiteUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutTemplatesInput = {
    role?: EnumRoleFieldUpdateOperationsInput | Role
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    membership?: EnumMembershipFieldUpdateOperationsInput | Membership
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    websites?: WebsiteUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type EnumMediaTypeFilter = {
    equals?: MediaType
    in?: Enumerable<MediaType>
    notIn?: Enumerable<MediaType>
    not?: NestedEnumMediaTypeFilter | MediaType
  }

  export type WebsiteCreateManyAuthorInput = {
    id?: string
    title?: string
    url: string
    tree: string
    createdAt?: Date | string
    medias?: XOR<MediaListCreateEnvelopeInput, Enumerable<MediaCreateInput>>
    templateId?: string | null
  }

  export type TemplateCreateManyAuthorInput = {
    id?: string
    name: string
    title?: string
    tree: string
    createdAt?: Date | string
    likes?: number
    medias?: XOR<MediaListCreateEnvelopeInput, Enumerable<MediaCreateInput>>
  }

  export type WebsiteUpdateWithoutAuthorInput = {
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    tree?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medias?: XOR<MediaListUpdateEnvelopeInput, Enumerable<MediaCreateInput>>
    template?: TemplateUpdateOneWithoutWebsitesUsingNestedInput
  }

  export type WebsiteUncheckedUpdateWithoutAuthorInput = {
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    tree?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medias?: XOR<MediaListUpdateEnvelopeInput, Enumerable<MediaCreateInput>>
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type WebsiteUncheckedUpdateManyWithoutWebsitesInput = {
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    tree?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medias?: XOR<MediaListUpdateEnvelopeInput, Enumerable<MediaCreateInput>>
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TemplateUpdateWithoutAuthorInput = {
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    tree?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: IntFieldUpdateOperationsInput | number
    medias?: XOR<MediaListUpdateEnvelopeInput, Enumerable<MediaCreateInput>>
    websitesUsing?: WebsiteUpdateManyWithoutTemplateNestedInput
  }

  export type TemplateUncheckedUpdateWithoutAuthorInput = {
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    tree?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: IntFieldUpdateOperationsInput | number
    medias?: XOR<MediaListUpdateEnvelopeInput, Enumerable<MediaCreateInput>>
    websitesUsing?: WebsiteUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type TemplateUncheckedUpdateManyWithoutTemplatesInput = {
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    tree?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: IntFieldUpdateOperationsInput | number
    medias?: XOR<MediaListUpdateEnvelopeInput, Enumerable<MediaCreateInput>>
  }

  export type MediaUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumMediaTypeFieldUpdateOperationsInput | MediaType
    uri?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebsiteCreateManyTemplateInput = {
    id?: string
    title?: string
    url: string
    tree: string
    createdAt?: Date | string
    medias?: XOR<MediaListCreateEnvelopeInput, Enumerable<MediaCreateInput>>
    authorId: string
  }

  export type WebsiteUpdateWithoutTemplateInput = {
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    tree?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medias?: XOR<MediaListUpdateEnvelopeInput, Enumerable<MediaCreateInput>>
    author?: UserUpdateOneRequiredWithoutWebsitesNestedInput
  }

  export type WebsiteUncheckedUpdateWithoutTemplateInput = {
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    tree?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medias?: XOR<MediaListUpdateEnvelopeInput, Enumerable<MediaCreateInput>>
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type WebsiteUncheckedUpdateManyWithoutWebsitesUsingInput = {
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    tree?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medias?: XOR<MediaListUpdateEnvelopeInput, Enumerable<MediaCreateInput>>
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type NestedEnumMediaTypeFilter = {
    equals?: MediaType
    in?: Enumerable<MediaType>
    notIn?: Enumerable<MediaType>
    not?: NestedEnumMediaTypeFilter | MediaType
  }

  export type EnumMediaTypeFieldUpdateOperationsInput = {
    set?: MediaType
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