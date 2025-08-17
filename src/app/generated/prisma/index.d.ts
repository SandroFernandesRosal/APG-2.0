
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model New
 * 
 */
export type New = $Result.DefaultSelection<Prisma.$NewPayload>
/**
 * Model Ministerio
 * 
 */
export type Ministerio = $Result.DefaultSelection<Prisma.$MinisterioPayload>
/**
 * Model Agenda
 * 
 */
export type Agenda = $Result.DefaultSelection<Prisma.$AgendaPayload>
/**
 * Model Doacao
 * 
 */
export type Doacao = $Result.DefaultSelection<Prisma.$DoacaoPayload>
/**
 * Model Endereco
 * 
 */
export type Endereco = $Result.DefaultSelection<Prisma.$EnderecoPayload>
/**
 * Model Contato
 * 
 */
export type Contato = $Result.DefaultSelection<Prisma.$ContatoPayload>
/**
 * Model Sobre
 * 
 */
export type Sobre = $Result.DefaultSelection<Prisma.$SobrePayload>
/**
 * Model SobreLider
 * 
 */
export type SobreLider = $Result.DefaultSelection<Prisma.$SobreLiderPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model PasswordResetToken
 * 
 */
export type PasswordResetToken = $Result.DefaultSelection<Prisma.$PasswordResetTokenPayload>
/**
 * Model Testemunho
 * 
 */
export type Testemunho = $Result.DefaultSelection<Prisma.$TestemunhoPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  SUPERADMIN: 'SUPERADMIN',
  ADMIN: 'ADMIN',
  MEMBRO: 'MEMBRO'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const MinistryRole: {
  VILADAPENHA: 'VILADAPENHA',
  TOMAZINHO: 'TOMAZINHO',
  MARIAHELENA: 'MARIAHELENA'
};

export type MinistryRole = (typeof MinistryRole)[keyof typeof MinistryRole]


export const CargoRole: {
  PASTOR: 'PASTOR',
  DIACONO: 'DIACONO',
  PRESBITERO: 'PRESBITERO',
  EVANGELISTA: 'EVANGELISTA',
  MISSIONARIO: 'MISSIONARIO',
  SECRETARIO: 'SECRETARIO',
  TESOUREIRO: 'TESOUREIRO',
  PASTOR_PRESIDENTE: 'PASTOR_PRESIDENTE',
  PASTOR_DIRIGENTE: 'PASTOR_DIRIGENTE',
  MUSICO: 'MUSICO',
  AUXILIAR: 'AUXILIAR'
};

export type CargoRole = (typeof CargoRole)[keyof typeof CargoRole]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type MinistryRole = $Enums.MinistryRole

export const MinistryRole: typeof $Enums.MinistryRole

export type CargoRole = $Enums.CargoRole

export const CargoRole: typeof $Enums.CargoRole

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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.new`: Exposes CRUD operations for the **New** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more News
    * const news = await prisma.new.findMany()
    * ```
    */
  get new(): Prisma.NewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ministerio`: Exposes CRUD operations for the **Ministerio** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ministerios
    * const ministerios = await prisma.ministerio.findMany()
    * ```
    */
  get ministerio(): Prisma.MinisterioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agenda`: Exposes CRUD operations for the **Agenda** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agenda
    * const agenda = await prisma.agenda.findMany()
    * ```
    */
  get agenda(): Prisma.AgendaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.doacao`: Exposes CRUD operations for the **Doacao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Doacaos
    * const doacaos = await prisma.doacao.findMany()
    * ```
    */
  get doacao(): Prisma.DoacaoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.endereco`: Exposes CRUD operations for the **Endereco** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Enderecos
    * const enderecos = await prisma.endereco.findMany()
    * ```
    */
  get endereco(): Prisma.EnderecoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contato`: Exposes CRUD operations for the **Contato** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contatoes
    * const contatoes = await prisma.contato.findMany()
    * ```
    */
  get contato(): Prisma.ContatoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sobre`: Exposes CRUD operations for the **Sobre** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sobres
    * const sobres = await prisma.sobre.findMany()
    * ```
    */
  get sobre(): Prisma.SobreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sobreLider`: Exposes CRUD operations for the **SobreLider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SobreLiders
    * const sobreLiders = await prisma.sobreLider.findMany()
    * ```
    */
  get sobreLider(): Prisma.SobreLiderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.passwordResetToken`: Exposes CRUD operations for the **PasswordResetToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PasswordResetTokens
    * const passwordResetTokens = await prisma.passwordResetToken.findMany()
    * ```
    */
  get passwordResetToken(): Prisma.PasswordResetTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testemunho`: Exposes CRUD operations for the **Testemunho** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Testemunhos
    * const testemunhos = await prisma.testemunho.findMany()
    * ```
    */
  get testemunho(): Prisma.TestemunhoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
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
    User: 'User',
    New: 'New',
    Ministerio: 'Ministerio',
    Agenda: 'Agenda',
    Doacao: 'Doacao',
    Endereco: 'Endereco',
    Contato: 'Contato',
    Sobre: 'Sobre',
    SobreLider: 'SobreLider',
    RefreshToken: 'RefreshToken',
    PasswordResetToken: 'PasswordResetToken',
    Testemunho: 'Testemunho',
    AuditLog: 'AuditLog'
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
      modelProps: "user" | "new" | "ministerio" | "agenda" | "doacao" | "endereco" | "contato" | "sobre" | "sobreLider" | "refreshToken" | "passwordResetToken" | "testemunho" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      New: {
        payload: Prisma.$NewPayload<ExtArgs>
        fields: Prisma.NewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewPayload>
          }
          findFirst: {
            args: Prisma.NewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewPayload>
          }
          findMany: {
            args: Prisma.NewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewPayload>[]
          }
          create: {
            args: Prisma.NewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewPayload>
          }
          createMany: {
            args: Prisma.NewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewPayload>[]
          }
          delete: {
            args: Prisma.NewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewPayload>
          }
          update: {
            args: Prisma.NewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewPayload>
          }
          deleteMany: {
            args: Prisma.NewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewPayload>[]
          }
          upsert: {
            args: Prisma.NewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewPayload>
          }
          aggregate: {
            args: Prisma.NewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNew>
          }
          groupBy: {
            args: Prisma.NewGroupByArgs<ExtArgs>
            result: $Utils.Optional<NewGroupByOutputType>[]
          }
          count: {
            args: Prisma.NewCountArgs<ExtArgs>
            result: $Utils.Optional<NewCountAggregateOutputType> | number
          }
        }
      }
      Ministerio: {
        payload: Prisma.$MinisterioPayload<ExtArgs>
        fields: Prisma.MinisterioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MinisterioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinisterioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MinisterioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinisterioPayload>
          }
          findFirst: {
            args: Prisma.MinisterioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinisterioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MinisterioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinisterioPayload>
          }
          findMany: {
            args: Prisma.MinisterioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinisterioPayload>[]
          }
          create: {
            args: Prisma.MinisterioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinisterioPayload>
          }
          createMany: {
            args: Prisma.MinisterioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MinisterioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinisterioPayload>[]
          }
          delete: {
            args: Prisma.MinisterioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinisterioPayload>
          }
          update: {
            args: Prisma.MinisterioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinisterioPayload>
          }
          deleteMany: {
            args: Prisma.MinisterioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MinisterioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MinisterioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinisterioPayload>[]
          }
          upsert: {
            args: Prisma.MinisterioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MinisterioPayload>
          }
          aggregate: {
            args: Prisma.MinisterioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMinisterio>
          }
          groupBy: {
            args: Prisma.MinisterioGroupByArgs<ExtArgs>
            result: $Utils.Optional<MinisterioGroupByOutputType>[]
          }
          count: {
            args: Prisma.MinisterioCountArgs<ExtArgs>
            result: $Utils.Optional<MinisterioCountAggregateOutputType> | number
          }
        }
      }
      Agenda: {
        payload: Prisma.$AgendaPayload<ExtArgs>
        fields: Prisma.AgendaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgendaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgendaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaPayload>
          }
          findFirst: {
            args: Prisma.AgendaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgendaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaPayload>
          }
          findMany: {
            args: Prisma.AgendaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaPayload>[]
          }
          create: {
            args: Prisma.AgendaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaPayload>
          }
          createMany: {
            args: Prisma.AgendaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgendaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaPayload>[]
          }
          delete: {
            args: Prisma.AgendaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaPayload>
          }
          update: {
            args: Prisma.AgendaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaPayload>
          }
          deleteMany: {
            args: Prisma.AgendaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgendaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgendaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaPayload>[]
          }
          upsert: {
            args: Prisma.AgendaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgendaPayload>
          }
          aggregate: {
            args: Prisma.AgendaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgenda>
          }
          groupBy: {
            args: Prisma.AgendaGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgendaGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgendaCountArgs<ExtArgs>
            result: $Utils.Optional<AgendaCountAggregateOutputType> | number
          }
        }
      }
      Doacao: {
        payload: Prisma.$DoacaoPayload<ExtArgs>
        fields: Prisma.DoacaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DoacaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DoacaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload>
          }
          findFirst: {
            args: Prisma.DoacaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DoacaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload>
          }
          findMany: {
            args: Prisma.DoacaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload>[]
          }
          create: {
            args: Prisma.DoacaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload>
          }
          createMany: {
            args: Prisma.DoacaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DoacaoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload>[]
          }
          delete: {
            args: Prisma.DoacaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload>
          }
          update: {
            args: Prisma.DoacaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload>
          }
          deleteMany: {
            args: Prisma.DoacaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DoacaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DoacaoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload>[]
          }
          upsert: {
            args: Prisma.DoacaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoacaoPayload>
          }
          aggregate: {
            args: Prisma.DoacaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDoacao>
          }
          groupBy: {
            args: Prisma.DoacaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<DoacaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.DoacaoCountArgs<ExtArgs>
            result: $Utils.Optional<DoacaoCountAggregateOutputType> | number
          }
        }
      }
      Endereco: {
        payload: Prisma.$EnderecoPayload<ExtArgs>
        fields: Prisma.EnderecoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EnderecoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EnderecoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>
          }
          findFirst: {
            args: Prisma.EnderecoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EnderecoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>
          }
          findMany: {
            args: Prisma.EnderecoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>[]
          }
          create: {
            args: Prisma.EnderecoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>
          }
          createMany: {
            args: Prisma.EnderecoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EnderecoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>[]
          }
          delete: {
            args: Prisma.EnderecoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>
          }
          update: {
            args: Prisma.EnderecoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>
          }
          deleteMany: {
            args: Prisma.EnderecoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EnderecoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EnderecoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>[]
          }
          upsert: {
            args: Prisma.EnderecoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnderecoPayload>
          }
          aggregate: {
            args: Prisma.EnderecoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEndereco>
          }
          groupBy: {
            args: Prisma.EnderecoGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnderecoGroupByOutputType>[]
          }
          count: {
            args: Prisma.EnderecoCountArgs<ExtArgs>
            result: $Utils.Optional<EnderecoCountAggregateOutputType> | number
          }
        }
      }
      Contato: {
        payload: Prisma.$ContatoPayload<ExtArgs>
        fields: Prisma.ContatoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContatoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContatoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoPayload>
          }
          findFirst: {
            args: Prisma.ContatoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContatoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoPayload>
          }
          findMany: {
            args: Prisma.ContatoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoPayload>[]
          }
          create: {
            args: Prisma.ContatoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoPayload>
          }
          createMany: {
            args: Prisma.ContatoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContatoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoPayload>[]
          }
          delete: {
            args: Prisma.ContatoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoPayload>
          }
          update: {
            args: Prisma.ContatoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoPayload>
          }
          deleteMany: {
            args: Prisma.ContatoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContatoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContatoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoPayload>[]
          }
          upsert: {
            args: Prisma.ContatoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContatoPayload>
          }
          aggregate: {
            args: Prisma.ContatoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContato>
          }
          groupBy: {
            args: Prisma.ContatoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContatoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContatoCountArgs<ExtArgs>
            result: $Utils.Optional<ContatoCountAggregateOutputType> | number
          }
        }
      }
      Sobre: {
        payload: Prisma.$SobrePayload<ExtArgs>
        fields: Prisma.SobreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SobreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobrePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SobreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobrePayload>
          }
          findFirst: {
            args: Prisma.SobreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobrePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SobreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobrePayload>
          }
          findMany: {
            args: Prisma.SobreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobrePayload>[]
          }
          create: {
            args: Prisma.SobreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobrePayload>
          }
          createMany: {
            args: Prisma.SobreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SobreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobrePayload>[]
          }
          delete: {
            args: Prisma.SobreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobrePayload>
          }
          update: {
            args: Prisma.SobreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobrePayload>
          }
          deleteMany: {
            args: Prisma.SobreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SobreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SobreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobrePayload>[]
          }
          upsert: {
            args: Prisma.SobreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobrePayload>
          }
          aggregate: {
            args: Prisma.SobreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSobre>
          }
          groupBy: {
            args: Prisma.SobreGroupByArgs<ExtArgs>
            result: $Utils.Optional<SobreGroupByOutputType>[]
          }
          count: {
            args: Prisma.SobreCountArgs<ExtArgs>
            result: $Utils.Optional<SobreCountAggregateOutputType> | number
          }
        }
      }
      SobreLider: {
        payload: Prisma.$SobreLiderPayload<ExtArgs>
        fields: Prisma.SobreLiderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SobreLiderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobreLiderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SobreLiderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobreLiderPayload>
          }
          findFirst: {
            args: Prisma.SobreLiderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobreLiderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SobreLiderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobreLiderPayload>
          }
          findMany: {
            args: Prisma.SobreLiderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobreLiderPayload>[]
          }
          create: {
            args: Prisma.SobreLiderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobreLiderPayload>
          }
          createMany: {
            args: Prisma.SobreLiderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SobreLiderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobreLiderPayload>[]
          }
          delete: {
            args: Prisma.SobreLiderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobreLiderPayload>
          }
          update: {
            args: Prisma.SobreLiderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobreLiderPayload>
          }
          deleteMany: {
            args: Prisma.SobreLiderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SobreLiderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SobreLiderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobreLiderPayload>[]
          }
          upsert: {
            args: Prisma.SobreLiderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SobreLiderPayload>
          }
          aggregate: {
            args: Prisma.SobreLiderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSobreLider>
          }
          groupBy: {
            args: Prisma.SobreLiderGroupByArgs<ExtArgs>
            result: $Utils.Optional<SobreLiderGroupByOutputType>[]
          }
          count: {
            args: Prisma.SobreLiderCountArgs<ExtArgs>
            result: $Utils.Optional<SobreLiderCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      PasswordResetToken: {
        payload: Prisma.$PasswordResetTokenPayload<ExtArgs>
        fields: Prisma.PasswordResetTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PasswordResetTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findFirst: {
            args: Prisma.PasswordResetTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          findMany: {
            args: Prisma.PasswordResetTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          create: {
            args: Prisma.PasswordResetTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          createMany: {
            args: Prisma.PasswordResetTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          delete: {
            args: Prisma.PasswordResetTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          update: {
            args: Prisma.PasswordResetTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          deleteMany: {
            args: Prisma.PasswordResetTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PasswordResetTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[]
          }
          upsert: {
            args: Prisma.PasswordResetTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>
          }
          aggregate: {
            args: Prisma.PasswordResetTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePasswordResetToken>
          }
          groupBy: {
            args: Prisma.PasswordResetTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.PasswordResetTokenCountArgs<ExtArgs>
            result: $Utils.Optional<PasswordResetTokenCountAggregateOutputType> | number
          }
        }
      }
      Testemunho: {
        payload: Prisma.$TestemunhoPayload<ExtArgs>
        fields: Prisma.TestemunhoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestemunhoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestemunhoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestemunhoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestemunhoPayload>
          }
          findFirst: {
            args: Prisma.TestemunhoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestemunhoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestemunhoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestemunhoPayload>
          }
          findMany: {
            args: Prisma.TestemunhoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestemunhoPayload>[]
          }
          create: {
            args: Prisma.TestemunhoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestemunhoPayload>
          }
          createMany: {
            args: Prisma.TestemunhoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestemunhoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestemunhoPayload>[]
          }
          delete: {
            args: Prisma.TestemunhoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestemunhoPayload>
          }
          update: {
            args: Prisma.TestemunhoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestemunhoPayload>
          }
          deleteMany: {
            args: Prisma.TestemunhoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestemunhoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestemunhoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestemunhoPayload>[]
          }
          upsert: {
            args: Prisma.TestemunhoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestemunhoPayload>
          }
          aggregate: {
            args: Prisma.TestemunhoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestemunho>
          }
          groupBy: {
            args: Prisma.TestemunhoGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestemunhoGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestemunhoCountArgs<ExtArgs>
            result: $Utils.Optional<TestemunhoCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
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
    user?: UserOmit
    new?: NewOmit
    ministerio?: MinisterioOmit
    agenda?: AgendaOmit
    doacao?: DoacaoOmit
    endereco?: EnderecoOmit
    contato?: ContatoOmit
    sobre?: SobreOmit
    sobreLider?: SobreLiderOmit
    refreshToken?: RefreshTokenOmit
    passwordResetToken?: PasswordResetTokenOmit
    testemunho?: TestemunhoOmit
    auditLog?: AuditLogOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    agenda: number
    contato: number
    doacao: number
    endereco: number
    ministerio: number
    news: number
    PasswordResetToken: number
    refreshToken: number
    sobre: number
    sobreLider: number
    testemunhos: number
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agenda?: boolean | UserCountOutputTypeCountAgendaArgs
    contato?: boolean | UserCountOutputTypeCountContatoArgs
    doacao?: boolean | UserCountOutputTypeCountDoacaoArgs
    endereco?: boolean | UserCountOutputTypeCountEnderecoArgs
    ministerio?: boolean | UserCountOutputTypeCountMinisterioArgs
    news?: boolean | UserCountOutputTypeCountNewsArgs
    PasswordResetToken?: boolean | UserCountOutputTypeCountPasswordResetTokenArgs
    refreshToken?: boolean | UserCountOutputTypeCountRefreshTokenArgs
    sobre?: boolean | UserCountOutputTypeCountSobreArgs
    sobreLider?: boolean | UserCountOutputTypeCountSobreLiderArgs
    testemunhos?: boolean | UserCountOutputTypeCountTestemunhosArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAgendaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgendaWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountContatoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContatoWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDoacaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoacaoWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEnderecoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnderecoWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMinisterioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MinisterioWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPasswordResetTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefreshTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSobreArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SobreWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSobreLiderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SobreLiderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTestemunhosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestemunhoWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Models
   */

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
    login: string | null
    name: string | null
    avatarUrl: string | null
    password: string | null
    role: $Enums.UserRole | null
    ministryRole: $Enums.MinistryRole | null
    expires: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    login: string | null
    name: string | null
    avatarUrl: string | null
    password: string | null
    role: $Enums.UserRole | null
    ministryRole: $Enums.MinistryRole | null
    expires: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    login: number
    name: number
    avatarUrl: number
    password: number
    role: number
    ministryRole: number
    expires: number
    cargo: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    login?: true
    name?: true
    avatarUrl?: true
    password?: true
    role?: true
    ministryRole?: true
    expires?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    login?: true
    name?: true
    avatarUrl?: true
    password?: true
    role?: true
    ministryRole?: true
    expires?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    login?: true
    name?: true
    avatarUrl?: true
    password?: true
    role?: true
    ministryRole?: true
    expires?: true
    cargo?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    login: string
    name: string | null
    avatarUrl: string | null
    password: string
    role: $Enums.UserRole
    ministryRole: $Enums.MinistryRole | null
    expires: Date | null
    cargo: $Enums.CargoRole[]
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    login?: boolean
    name?: boolean
    avatarUrl?: boolean
    password?: boolean
    role?: boolean
    ministryRole?: boolean
    expires?: boolean
    cargo?: boolean
    agenda?: boolean | User$agendaArgs<ExtArgs>
    contato?: boolean | User$contatoArgs<ExtArgs>
    doacao?: boolean | User$doacaoArgs<ExtArgs>
    endereco?: boolean | User$enderecoArgs<ExtArgs>
    ministerio?: boolean | User$ministerioArgs<ExtArgs>
    news?: boolean | User$newsArgs<ExtArgs>
    PasswordResetToken?: boolean | User$PasswordResetTokenArgs<ExtArgs>
    refreshToken?: boolean | User$refreshTokenArgs<ExtArgs>
    sobre?: boolean | User$sobreArgs<ExtArgs>
    sobreLider?: boolean | User$sobreLiderArgs<ExtArgs>
    testemunhos?: boolean | User$testemunhosArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    login?: boolean
    name?: boolean
    avatarUrl?: boolean
    password?: boolean
    role?: boolean
    ministryRole?: boolean
    expires?: boolean
    cargo?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    login?: boolean
    name?: boolean
    avatarUrl?: boolean
    password?: boolean
    role?: boolean
    ministryRole?: boolean
    expires?: boolean
    cargo?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    login?: boolean
    name?: boolean
    avatarUrl?: boolean
    password?: boolean
    role?: boolean
    ministryRole?: boolean
    expires?: boolean
    cargo?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "login" | "name" | "avatarUrl" | "password" | "role" | "ministryRole" | "expires" | "cargo", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agenda?: boolean | User$agendaArgs<ExtArgs>
    contato?: boolean | User$contatoArgs<ExtArgs>
    doacao?: boolean | User$doacaoArgs<ExtArgs>
    endereco?: boolean | User$enderecoArgs<ExtArgs>
    ministerio?: boolean | User$ministerioArgs<ExtArgs>
    news?: boolean | User$newsArgs<ExtArgs>
    PasswordResetToken?: boolean | User$PasswordResetTokenArgs<ExtArgs>
    refreshToken?: boolean | User$refreshTokenArgs<ExtArgs>
    sobre?: boolean | User$sobreArgs<ExtArgs>
    sobreLider?: boolean | User$sobreLiderArgs<ExtArgs>
    testemunhos?: boolean | User$testemunhosArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      agenda: Prisma.$AgendaPayload<ExtArgs>[]
      contato: Prisma.$ContatoPayload<ExtArgs>[]
      doacao: Prisma.$DoacaoPayload<ExtArgs>[]
      endereco: Prisma.$EnderecoPayload<ExtArgs>[]
      ministerio: Prisma.$MinisterioPayload<ExtArgs>[]
      news: Prisma.$NewPayload<ExtArgs>[]
      PasswordResetToken: Prisma.$PasswordResetTokenPayload<ExtArgs>[]
      refreshToken: Prisma.$RefreshTokenPayload<ExtArgs>[]
      sobre: Prisma.$SobrePayload<ExtArgs>[]
      sobreLider: Prisma.$SobreLiderPayload<ExtArgs>[]
      testemunhos: Prisma.$TestemunhoPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      login: string
      name: string | null
      avatarUrl: string | null
      password: string
      role: $Enums.UserRole
      ministryRole: $Enums.MinistryRole | null
      expires: Date | null
      cargo: $Enums.CargoRole[]
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
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
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
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
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
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
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agenda<T extends User$agendaArgs<ExtArgs> = {}>(args?: Subset<T, User$agendaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgendaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    contato<T extends User$contatoArgs<ExtArgs> = {}>(args?: Subset<T, User$contatoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContatoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    doacao<T extends User$doacaoArgs<ExtArgs> = {}>(args?: Subset<T, User$doacaoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    endereco<T extends User$enderecoArgs<ExtArgs> = {}>(args?: Subset<T, User$enderecoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ministerio<T extends User$ministerioArgs<ExtArgs> = {}>(args?: Subset<T, User$ministerioArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MinisterioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    news<T extends User$newsArgs<ExtArgs> = {}>(args?: Subset<T, User$newsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    PasswordResetToken<T extends User$PasswordResetTokenArgs<ExtArgs> = {}>(args?: Subset<T, User$PasswordResetTokenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refreshToken<T extends User$refreshTokenArgs<ExtArgs> = {}>(args?: Subset<T, User$refreshTokenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sobre<T extends User$sobreArgs<ExtArgs> = {}>(args?: Subset<T, User$sobreArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SobrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sobreLider<T extends User$sobreLiderArgs<ExtArgs> = {}>(args?: Subset<T, User$sobreLiderArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SobreLiderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    testemunhos<T extends User$testemunhosArgs<ExtArgs> = {}>(args?: Subset<T, User$testemunhosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestemunhoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly login: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly ministryRole: FieldRef<"User", 'MinistryRole'>
    readonly expires: FieldRef<"User", 'DateTime'>
    readonly cargo: FieldRef<"User", 'CargoRole[]'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.agenda
   */
  export type User$agendaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agenda
     */
    select?: AgendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agenda
     */
    omit?: AgendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaInclude<ExtArgs> | null
    where?: AgendaWhereInput
    orderBy?: AgendaOrderByWithRelationInput | AgendaOrderByWithRelationInput[]
    cursor?: AgendaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgendaScalarFieldEnum | AgendaScalarFieldEnum[]
  }

  /**
   * User.contato
   */
  export type User$contatoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contato
     */
    select?: ContatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contato
     */
    omit?: ContatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoInclude<ExtArgs> | null
    where?: ContatoWhereInput
    orderBy?: ContatoOrderByWithRelationInput | ContatoOrderByWithRelationInput[]
    cursor?: ContatoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContatoScalarFieldEnum | ContatoScalarFieldEnum[]
  }

  /**
   * User.doacao
   */
  export type User$doacaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    where?: DoacaoWhereInput
    orderBy?: DoacaoOrderByWithRelationInput | DoacaoOrderByWithRelationInput[]
    cursor?: DoacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoacaoScalarFieldEnum | DoacaoScalarFieldEnum[]
  }

  /**
   * User.endereco
   */
  export type User$enderecoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    where?: EnderecoWhereInput
    orderBy?: EnderecoOrderByWithRelationInput | EnderecoOrderByWithRelationInput[]
    cursor?: EnderecoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnderecoScalarFieldEnum | EnderecoScalarFieldEnum[]
  }

  /**
   * User.ministerio
   */
  export type User$ministerioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministerio
     */
    select?: MinisterioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministerio
     */
    omit?: MinisterioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinisterioInclude<ExtArgs> | null
    where?: MinisterioWhereInput
    orderBy?: MinisterioOrderByWithRelationInput | MinisterioOrderByWithRelationInput[]
    cursor?: MinisterioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MinisterioScalarFieldEnum | MinisterioScalarFieldEnum[]
  }

  /**
   * User.news
   */
  export type User$newsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the New
     */
    select?: NewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the New
     */
    omit?: NewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewInclude<ExtArgs> | null
    where?: NewWhereInput
    orderBy?: NewOrderByWithRelationInput | NewOrderByWithRelationInput[]
    cursor?: NewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NewScalarFieldEnum | NewScalarFieldEnum[]
  }

  /**
   * User.PasswordResetToken
   */
  export type User$PasswordResetTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    cursor?: PasswordResetTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * User.refreshToken
   */
  export type User$refreshTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * User.sobre
   */
  export type User$sobreArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sobre
     */
    select?: SobreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sobre
     */
    omit?: SobreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreInclude<ExtArgs> | null
    where?: SobreWhereInput
    orderBy?: SobreOrderByWithRelationInput | SobreOrderByWithRelationInput[]
    cursor?: SobreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SobreScalarFieldEnum | SobreScalarFieldEnum[]
  }

  /**
   * User.sobreLider
   */
  export type User$sobreLiderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SobreLider
     */
    select?: SobreLiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SobreLider
     */
    omit?: SobreLiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreLiderInclude<ExtArgs> | null
    where?: SobreLiderWhereInput
    orderBy?: SobreLiderOrderByWithRelationInput | SobreLiderOrderByWithRelationInput[]
    cursor?: SobreLiderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SobreLiderScalarFieldEnum | SobreLiderScalarFieldEnum[]
  }

  /**
   * User.testemunhos
   */
  export type User$testemunhosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testemunho
     */
    select?: TestemunhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testemunho
     */
    omit?: TestemunhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestemunhoInclude<ExtArgs> | null
    where?: TestemunhoWhereInput
    orderBy?: TestemunhoOrderByWithRelationInput | TestemunhoOrderByWithRelationInput[]
    cursor?: TestemunhoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestemunhoScalarFieldEnum | TestemunhoScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model New
   */

  export type AggregateNew = {
    _count: NewCountAggregateOutputType | null
    _min: NewMinAggregateOutputType | null
    _max: NewMaxAggregateOutputType | null
  }

  export type NewMinAggregateOutputType = {
    id: string | null
    userId: string | null
    coverUrl: string | null
    videoUrl: string | null
    content: string | null
    title: string | null
    createdAt: Date | null
    isPublic: boolean | null
    page: string | null
    updatedAt: Date | null
    destaque: boolean | null
    url: string | null
    role: $Enums.MinistryRole | null
  }

  export type NewMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    coverUrl: string | null
    videoUrl: string | null
    content: string | null
    title: string | null
    createdAt: Date | null
    isPublic: boolean | null
    page: string | null
    updatedAt: Date | null
    destaque: boolean | null
    url: string | null
    role: $Enums.MinistryRole | null
  }

  export type NewCountAggregateOutputType = {
    id: number
    userId: number
    coverUrl: number
    videoUrl: number
    content: number
    title: number
    createdAt: number
    isPublic: number
    page: number
    updatedAt: number
    destaque: number
    url: number
    role: number
    _all: number
  }


  export type NewMinAggregateInputType = {
    id?: true
    userId?: true
    coverUrl?: true
    videoUrl?: true
    content?: true
    title?: true
    createdAt?: true
    isPublic?: true
    page?: true
    updatedAt?: true
    destaque?: true
    url?: true
    role?: true
  }

  export type NewMaxAggregateInputType = {
    id?: true
    userId?: true
    coverUrl?: true
    videoUrl?: true
    content?: true
    title?: true
    createdAt?: true
    isPublic?: true
    page?: true
    updatedAt?: true
    destaque?: true
    url?: true
    role?: true
  }

  export type NewCountAggregateInputType = {
    id?: true
    userId?: true
    coverUrl?: true
    videoUrl?: true
    content?: true
    title?: true
    createdAt?: true
    isPublic?: true
    page?: true
    updatedAt?: true
    destaque?: true
    url?: true
    role?: true
    _all?: true
  }

  export type NewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which New to aggregate.
     */
    where?: NewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of News to fetch.
     */
    orderBy?: NewOrderByWithRelationInput | NewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` News from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` News.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned News
    **/
    _count?: true | NewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NewMaxAggregateInputType
  }

  export type GetNewAggregateType<T extends NewAggregateArgs> = {
        [P in keyof T & keyof AggregateNew]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNew[P]>
      : GetScalarType<T[P], AggregateNew[P]>
  }




  export type NewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewWhereInput
    orderBy?: NewOrderByWithAggregationInput | NewOrderByWithAggregationInput[]
    by: NewScalarFieldEnum[] | NewScalarFieldEnum
    having?: NewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NewCountAggregateInputType | true
    _min?: NewMinAggregateInputType
    _max?: NewMaxAggregateInputType
  }

  export type NewGroupByOutputType = {
    id: string
    userId: string
    coverUrl: string | null
    videoUrl: string | null
    content: string
    title: string
    createdAt: Date
    isPublic: boolean
    page: string
    updatedAt: Date
    destaque: boolean
    url: string
    role: $Enums.MinistryRole
    _count: NewCountAggregateOutputType | null
    _min: NewMinAggregateOutputType | null
    _max: NewMaxAggregateOutputType | null
  }

  type GetNewGroupByPayload<T extends NewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NewGroupByOutputType[P]>
            : GetScalarType<T[P], NewGroupByOutputType[P]>
        }
      >
    >


  export type NewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    coverUrl?: boolean
    videoUrl?: boolean
    content?: boolean
    title?: boolean
    createdAt?: boolean
    isPublic?: boolean
    page?: boolean
    updatedAt?: boolean
    destaque?: boolean
    url?: boolean
    role?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["new"]>

  export type NewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    coverUrl?: boolean
    videoUrl?: boolean
    content?: boolean
    title?: boolean
    createdAt?: boolean
    isPublic?: boolean
    page?: boolean
    updatedAt?: boolean
    destaque?: boolean
    url?: boolean
    role?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["new"]>

  export type NewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    coverUrl?: boolean
    videoUrl?: boolean
    content?: boolean
    title?: boolean
    createdAt?: boolean
    isPublic?: boolean
    page?: boolean
    updatedAt?: boolean
    destaque?: boolean
    url?: boolean
    role?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["new"]>

  export type NewSelectScalar = {
    id?: boolean
    userId?: boolean
    coverUrl?: boolean
    videoUrl?: boolean
    content?: boolean
    title?: boolean
    createdAt?: boolean
    isPublic?: boolean
    page?: boolean
    updatedAt?: boolean
    destaque?: boolean
    url?: boolean
    role?: boolean
  }

  export type NewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "coverUrl" | "videoUrl" | "content" | "title" | "createdAt" | "isPublic" | "page" | "updatedAt" | "destaque" | "url" | "role", ExtArgs["result"]["new"]>
  export type NewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "New"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      coverUrl: string | null
      videoUrl: string | null
      content: string
      title: string
      createdAt: Date
      isPublic: boolean
      page: string
      updatedAt: Date
      destaque: boolean
      url: string
      role: $Enums.MinistryRole
    }, ExtArgs["result"]["new"]>
    composites: {}
  }

  type NewGetPayload<S extends boolean | null | undefined | NewDefaultArgs> = $Result.GetResult<Prisma.$NewPayload, S>

  type NewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NewCountAggregateInputType | true
    }

  export interface NewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['New'], meta: { name: 'New' } }
    /**
     * Find zero or one New that matches the filter.
     * @param {NewFindUniqueArgs} args - Arguments to find a New
     * @example
     * // Get one New
     * const new = await prisma.new.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NewFindUniqueArgs>(args: SelectSubset<T, NewFindUniqueArgs<ExtArgs>>): Prisma__NewClient<$Result.GetResult<Prisma.$NewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one New that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NewFindUniqueOrThrowArgs} args - Arguments to find a New
     * @example
     * // Get one New
     * const new = await prisma.new.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NewFindUniqueOrThrowArgs>(args: SelectSubset<T, NewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NewClient<$Result.GetResult<Prisma.$NewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first New that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewFindFirstArgs} args - Arguments to find a New
     * @example
     * // Get one New
     * const new = await prisma.new.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NewFindFirstArgs>(args?: SelectSubset<T, NewFindFirstArgs<ExtArgs>>): Prisma__NewClient<$Result.GetResult<Prisma.$NewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first New that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewFindFirstOrThrowArgs} args - Arguments to find a New
     * @example
     * // Get one New
     * const new = await prisma.new.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NewFindFirstOrThrowArgs>(args?: SelectSubset<T, NewFindFirstOrThrowArgs<ExtArgs>>): Prisma__NewClient<$Result.GetResult<Prisma.$NewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more News that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all News
     * const news = await prisma.new.findMany()
     * 
     * // Get first 10 News
     * const news = await prisma.new.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const newWithIdOnly = await prisma.new.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NewFindManyArgs>(args?: SelectSubset<T, NewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a New.
     * @param {NewCreateArgs} args - Arguments to create a New.
     * @example
     * // Create one New
     * const New = await prisma.new.create({
     *   data: {
     *     // ... data to create a New
     *   }
     * })
     * 
     */
    create<T extends NewCreateArgs>(args: SelectSubset<T, NewCreateArgs<ExtArgs>>): Prisma__NewClient<$Result.GetResult<Prisma.$NewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many News.
     * @param {NewCreateManyArgs} args - Arguments to create many News.
     * @example
     * // Create many News
     * const new = await prisma.new.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NewCreateManyArgs>(args?: SelectSubset<T, NewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many News and returns the data saved in the database.
     * @param {NewCreateManyAndReturnArgs} args - Arguments to create many News.
     * @example
     * // Create many News
     * const new = await prisma.new.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many News and only return the `id`
     * const newWithIdOnly = await prisma.new.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NewCreateManyAndReturnArgs>(args?: SelectSubset<T, NewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a New.
     * @param {NewDeleteArgs} args - Arguments to delete one New.
     * @example
     * // Delete one New
     * const New = await prisma.new.delete({
     *   where: {
     *     // ... filter to delete one New
     *   }
     * })
     * 
     */
    delete<T extends NewDeleteArgs>(args: SelectSubset<T, NewDeleteArgs<ExtArgs>>): Prisma__NewClient<$Result.GetResult<Prisma.$NewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one New.
     * @param {NewUpdateArgs} args - Arguments to update one New.
     * @example
     * // Update one New
     * const new = await prisma.new.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NewUpdateArgs>(args: SelectSubset<T, NewUpdateArgs<ExtArgs>>): Prisma__NewClient<$Result.GetResult<Prisma.$NewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more News.
     * @param {NewDeleteManyArgs} args - Arguments to filter News to delete.
     * @example
     * // Delete a few News
     * const { count } = await prisma.new.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NewDeleteManyArgs>(args?: SelectSubset<T, NewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more News.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many News
     * const new = await prisma.new.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NewUpdateManyArgs>(args: SelectSubset<T, NewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more News and returns the data updated in the database.
     * @param {NewUpdateManyAndReturnArgs} args - Arguments to update many News.
     * @example
     * // Update many News
     * const new = await prisma.new.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more News and only return the `id`
     * const newWithIdOnly = await prisma.new.updateManyAndReturn({
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
    updateManyAndReturn<T extends NewUpdateManyAndReturnArgs>(args: SelectSubset<T, NewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one New.
     * @param {NewUpsertArgs} args - Arguments to update or create a New.
     * @example
     * // Update or create a New
     * const new = await prisma.new.upsert({
     *   create: {
     *     // ... data to create a New
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the New we want to update
     *   }
     * })
     */
    upsert<T extends NewUpsertArgs>(args: SelectSubset<T, NewUpsertArgs<ExtArgs>>): Prisma__NewClient<$Result.GetResult<Prisma.$NewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of News.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewCountArgs} args - Arguments to filter News to count.
     * @example
     * // Count the number of News
     * const count = await prisma.new.count({
     *   where: {
     *     // ... the filter for the News we want to count
     *   }
     * })
    **/
    count<T extends NewCountArgs>(
      args?: Subset<T, NewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a New.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NewAggregateArgs>(args: Subset<T, NewAggregateArgs>): Prisma.PrismaPromise<GetNewAggregateType<T>>

    /**
     * Group by New.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewGroupByArgs} args - Group by arguments.
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
      T extends NewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NewGroupByArgs['orderBy'] }
        : { orderBy?: NewGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the New model
   */
  readonly fields: NewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for New.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the New model
   */
  interface NewFieldRefs {
    readonly id: FieldRef<"New", 'String'>
    readonly userId: FieldRef<"New", 'String'>
    readonly coverUrl: FieldRef<"New", 'String'>
    readonly videoUrl: FieldRef<"New", 'String'>
    readonly content: FieldRef<"New", 'String'>
    readonly title: FieldRef<"New", 'String'>
    readonly createdAt: FieldRef<"New", 'DateTime'>
    readonly isPublic: FieldRef<"New", 'Boolean'>
    readonly page: FieldRef<"New", 'String'>
    readonly updatedAt: FieldRef<"New", 'DateTime'>
    readonly destaque: FieldRef<"New", 'Boolean'>
    readonly url: FieldRef<"New", 'String'>
    readonly role: FieldRef<"New", 'MinistryRole'>
  }
    

  // Custom InputTypes
  /**
   * New findUnique
   */
  export type NewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the New
     */
    select?: NewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the New
     */
    omit?: NewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewInclude<ExtArgs> | null
    /**
     * Filter, which New to fetch.
     */
    where: NewWhereUniqueInput
  }

  /**
   * New findUniqueOrThrow
   */
  export type NewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the New
     */
    select?: NewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the New
     */
    omit?: NewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewInclude<ExtArgs> | null
    /**
     * Filter, which New to fetch.
     */
    where: NewWhereUniqueInput
  }

  /**
   * New findFirst
   */
  export type NewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the New
     */
    select?: NewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the New
     */
    omit?: NewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewInclude<ExtArgs> | null
    /**
     * Filter, which New to fetch.
     */
    where?: NewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of News to fetch.
     */
    orderBy?: NewOrderByWithRelationInput | NewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for News.
     */
    cursor?: NewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` News from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` News.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of News.
     */
    distinct?: NewScalarFieldEnum | NewScalarFieldEnum[]
  }

  /**
   * New findFirstOrThrow
   */
  export type NewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the New
     */
    select?: NewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the New
     */
    omit?: NewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewInclude<ExtArgs> | null
    /**
     * Filter, which New to fetch.
     */
    where?: NewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of News to fetch.
     */
    orderBy?: NewOrderByWithRelationInput | NewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for News.
     */
    cursor?: NewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` News from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` News.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of News.
     */
    distinct?: NewScalarFieldEnum | NewScalarFieldEnum[]
  }

  /**
   * New findMany
   */
  export type NewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the New
     */
    select?: NewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the New
     */
    omit?: NewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewInclude<ExtArgs> | null
    /**
     * Filter, which News to fetch.
     */
    where?: NewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of News to fetch.
     */
    orderBy?: NewOrderByWithRelationInput | NewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing News.
     */
    cursor?: NewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` News from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` News.
     */
    skip?: number
    distinct?: NewScalarFieldEnum | NewScalarFieldEnum[]
  }

  /**
   * New create
   */
  export type NewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the New
     */
    select?: NewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the New
     */
    omit?: NewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewInclude<ExtArgs> | null
    /**
     * The data needed to create a New.
     */
    data: XOR<NewCreateInput, NewUncheckedCreateInput>
  }

  /**
   * New createMany
   */
  export type NewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many News.
     */
    data: NewCreateManyInput | NewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * New createManyAndReturn
   */
  export type NewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the New
     */
    select?: NewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the New
     */
    omit?: NewOmit<ExtArgs> | null
    /**
     * The data used to create many News.
     */
    data: NewCreateManyInput | NewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * New update
   */
  export type NewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the New
     */
    select?: NewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the New
     */
    omit?: NewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewInclude<ExtArgs> | null
    /**
     * The data needed to update a New.
     */
    data: XOR<NewUpdateInput, NewUncheckedUpdateInput>
    /**
     * Choose, which New to update.
     */
    where: NewWhereUniqueInput
  }

  /**
   * New updateMany
   */
  export type NewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update News.
     */
    data: XOR<NewUpdateManyMutationInput, NewUncheckedUpdateManyInput>
    /**
     * Filter which News to update
     */
    where?: NewWhereInput
    /**
     * Limit how many News to update.
     */
    limit?: number
  }

  /**
   * New updateManyAndReturn
   */
  export type NewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the New
     */
    select?: NewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the New
     */
    omit?: NewOmit<ExtArgs> | null
    /**
     * The data used to update News.
     */
    data: XOR<NewUpdateManyMutationInput, NewUncheckedUpdateManyInput>
    /**
     * Filter which News to update
     */
    where?: NewWhereInput
    /**
     * Limit how many News to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * New upsert
   */
  export type NewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the New
     */
    select?: NewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the New
     */
    omit?: NewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewInclude<ExtArgs> | null
    /**
     * The filter to search for the New to update in case it exists.
     */
    where: NewWhereUniqueInput
    /**
     * In case the New found by the `where` argument doesn't exist, create a new New with this data.
     */
    create: XOR<NewCreateInput, NewUncheckedCreateInput>
    /**
     * In case the New was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NewUpdateInput, NewUncheckedUpdateInput>
  }

  /**
   * New delete
   */
  export type NewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the New
     */
    select?: NewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the New
     */
    omit?: NewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewInclude<ExtArgs> | null
    /**
     * Filter which New to delete.
     */
    where: NewWhereUniqueInput
  }

  /**
   * New deleteMany
   */
  export type NewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which News to delete
     */
    where?: NewWhereInput
    /**
     * Limit how many News to delete.
     */
    limit?: number
  }

  /**
   * New without action
   */
  export type NewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the New
     */
    select?: NewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the New
     */
    omit?: NewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NewInclude<ExtArgs> | null
  }


  /**
   * Model Ministerio
   */

  export type AggregateMinisterio = {
    _count: MinisterioCountAggregateOutputType | null
    _min: MinisterioMinAggregateOutputType | null
    _max: MinisterioMaxAggregateOutputType | null
  }

  export type MinisterioMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    title: string | null
    local: string | null
    isPublic: boolean | null
    createdAt: Date | null
    coverUrl: string | null
    updatedAt: Date | null
    role: $Enums.MinistryRole | null
  }

  export type MinisterioMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    title: string | null
    local: string | null
    isPublic: boolean | null
    createdAt: Date | null
    coverUrl: string | null
    updatedAt: Date | null
    role: $Enums.MinistryRole | null
  }

  export type MinisterioCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    title: number
    local: number
    isPublic: number
    createdAt: number
    coverUrl: number
    updatedAt: number
    role: number
    _all: number
  }


  export type MinisterioMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    title?: true
    local?: true
    isPublic?: true
    createdAt?: true
    coverUrl?: true
    updatedAt?: true
    role?: true
  }

  export type MinisterioMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    title?: true
    local?: true
    isPublic?: true
    createdAt?: true
    coverUrl?: true
    updatedAt?: true
    role?: true
  }

  export type MinisterioCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    title?: true
    local?: true
    isPublic?: true
    createdAt?: true
    coverUrl?: true
    updatedAt?: true
    role?: true
    _all?: true
  }

  export type MinisterioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ministerio to aggregate.
     */
    where?: MinisterioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ministerios to fetch.
     */
    orderBy?: MinisterioOrderByWithRelationInput | MinisterioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MinisterioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ministerios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ministerios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ministerios
    **/
    _count?: true | MinisterioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MinisterioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MinisterioMaxAggregateInputType
  }

  export type GetMinisterioAggregateType<T extends MinisterioAggregateArgs> = {
        [P in keyof T & keyof AggregateMinisterio]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMinisterio[P]>
      : GetScalarType<T[P], AggregateMinisterio[P]>
  }




  export type MinisterioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MinisterioWhereInput
    orderBy?: MinisterioOrderByWithAggregationInput | MinisterioOrderByWithAggregationInput[]
    by: MinisterioScalarFieldEnum[] | MinisterioScalarFieldEnum
    having?: MinisterioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MinisterioCountAggregateInputType | true
    _min?: MinisterioMinAggregateInputType
    _max?: MinisterioMaxAggregateInputType
  }

  export type MinisterioGroupByOutputType = {
    id: string
    userId: string
    name: string
    title: string
    local: string
    isPublic: boolean
    createdAt: Date
    coverUrl: string
    updatedAt: Date
    role: $Enums.MinistryRole
    _count: MinisterioCountAggregateOutputType | null
    _min: MinisterioMinAggregateOutputType | null
    _max: MinisterioMaxAggregateOutputType | null
  }

  type GetMinisterioGroupByPayload<T extends MinisterioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MinisterioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MinisterioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MinisterioGroupByOutputType[P]>
            : GetScalarType<T[P], MinisterioGroupByOutputType[P]>
        }
      >
    >


  export type MinisterioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    title?: boolean
    local?: boolean
    isPublic?: boolean
    createdAt?: boolean
    coverUrl?: boolean
    updatedAt?: boolean
    role?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ministerio"]>

  export type MinisterioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    title?: boolean
    local?: boolean
    isPublic?: boolean
    createdAt?: boolean
    coverUrl?: boolean
    updatedAt?: boolean
    role?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ministerio"]>

  export type MinisterioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    title?: boolean
    local?: boolean
    isPublic?: boolean
    createdAt?: boolean
    coverUrl?: boolean
    updatedAt?: boolean
    role?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ministerio"]>

  export type MinisterioSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    title?: boolean
    local?: boolean
    isPublic?: boolean
    createdAt?: boolean
    coverUrl?: boolean
    updatedAt?: boolean
    role?: boolean
  }

  export type MinisterioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "title" | "local" | "isPublic" | "createdAt" | "coverUrl" | "updatedAt" | "role", ExtArgs["result"]["ministerio"]>
  export type MinisterioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MinisterioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MinisterioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MinisterioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ministerio"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      title: string
      local: string
      isPublic: boolean
      createdAt: Date
      coverUrl: string
      updatedAt: Date
      role: $Enums.MinistryRole
    }, ExtArgs["result"]["ministerio"]>
    composites: {}
  }

  type MinisterioGetPayload<S extends boolean | null | undefined | MinisterioDefaultArgs> = $Result.GetResult<Prisma.$MinisterioPayload, S>

  type MinisterioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MinisterioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MinisterioCountAggregateInputType | true
    }

  export interface MinisterioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ministerio'], meta: { name: 'Ministerio' } }
    /**
     * Find zero or one Ministerio that matches the filter.
     * @param {MinisterioFindUniqueArgs} args - Arguments to find a Ministerio
     * @example
     * // Get one Ministerio
     * const ministerio = await prisma.ministerio.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MinisterioFindUniqueArgs>(args: SelectSubset<T, MinisterioFindUniqueArgs<ExtArgs>>): Prisma__MinisterioClient<$Result.GetResult<Prisma.$MinisterioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ministerio that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MinisterioFindUniqueOrThrowArgs} args - Arguments to find a Ministerio
     * @example
     * // Get one Ministerio
     * const ministerio = await prisma.ministerio.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MinisterioFindUniqueOrThrowArgs>(args: SelectSubset<T, MinisterioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MinisterioClient<$Result.GetResult<Prisma.$MinisterioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ministerio that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinisterioFindFirstArgs} args - Arguments to find a Ministerio
     * @example
     * // Get one Ministerio
     * const ministerio = await prisma.ministerio.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MinisterioFindFirstArgs>(args?: SelectSubset<T, MinisterioFindFirstArgs<ExtArgs>>): Prisma__MinisterioClient<$Result.GetResult<Prisma.$MinisterioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ministerio that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinisterioFindFirstOrThrowArgs} args - Arguments to find a Ministerio
     * @example
     * // Get one Ministerio
     * const ministerio = await prisma.ministerio.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MinisterioFindFirstOrThrowArgs>(args?: SelectSubset<T, MinisterioFindFirstOrThrowArgs<ExtArgs>>): Prisma__MinisterioClient<$Result.GetResult<Prisma.$MinisterioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ministerios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinisterioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ministerios
     * const ministerios = await prisma.ministerio.findMany()
     * 
     * // Get first 10 Ministerios
     * const ministerios = await prisma.ministerio.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ministerioWithIdOnly = await prisma.ministerio.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MinisterioFindManyArgs>(args?: SelectSubset<T, MinisterioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MinisterioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ministerio.
     * @param {MinisterioCreateArgs} args - Arguments to create a Ministerio.
     * @example
     * // Create one Ministerio
     * const Ministerio = await prisma.ministerio.create({
     *   data: {
     *     // ... data to create a Ministerio
     *   }
     * })
     * 
     */
    create<T extends MinisterioCreateArgs>(args: SelectSubset<T, MinisterioCreateArgs<ExtArgs>>): Prisma__MinisterioClient<$Result.GetResult<Prisma.$MinisterioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ministerios.
     * @param {MinisterioCreateManyArgs} args - Arguments to create many Ministerios.
     * @example
     * // Create many Ministerios
     * const ministerio = await prisma.ministerio.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MinisterioCreateManyArgs>(args?: SelectSubset<T, MinisterioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ministerios and returns the data saved in the database.
     * @param {MinisterioCreateManyAndReturnArgs} args - Arguments to create many Ministerios.
     * @example
     * // Create many Ministerios
     * const ministerio = await prisma.ministerio.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ministerios and only return the `id`
     * const ministerioWithIdOnly = await prisma.ministerio.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MinisterioCreateManyAndReturnArgs>(args?: SelectSubset<T, MinisterioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MinisterioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ministerio.
     * @param {MinisterioDeleteArgs} args - Arguments to delete one Ministerio.
     * @example
     * // Delete one Ministerio
     * const Ministerio = await prisma.ministerio.delete({
     *   where: {
     *     // ... filter to delete one Ministerio
     *   }
     * })
     * 
     */
    delete<T extends MinisterioDeleteArgs>(args: SelectSubset<T, MinisterioDeleteArgs<ExtArgs>>): Prisma__MinisterioClient<$Result.GetResult<Prisma.$MinisterioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ministerio.
     * @param {MinisterioUpdateArgs} args - Arguments to update one Ministerio.
     * @example
     * // Update one Ministerio
     * const ministerio = await prisma.ministerio.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MinisterioUpdateArgs>(args: SelectSubset<T, MinisterioUpdateArgs<ExtArgs>>): Prisma__MinisterioClient<$Result.GetResult<Prisma.$MinisterioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ministerios.
     * @param {MinisterioDeleteManyArgs} args - Arguments to filter Ministerios to delete.
     * @example
     * // Delete a few Ministerios
     * const { count } = await prisma.ministerio.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MinisterioDeleteManyArgs>(args?: SelectSubset<T, MinisterioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ministerios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinisterioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ministerios
     * const ministerio = await prisma.ministerio.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MinisterioUpdateManyArgs>(args: SelectSubset<T, MinisterioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ministerios and returns the data updated in the database.
     * @param {MinisterioUpdateManyAndReturnArgs} args - Arguments to update many Ministerios.
     * @example
     * // Update many Ministerios
     * const ministerio = await prisma.ministerio.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ministerios and only return the `id`
     * const ministerioWithIdOnly = await prisma.ministerio.updateManyAndReturn({
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
    updateManyAndReturn<T extends MinisterioUpdateManyAndReturnArgs>(args: SelectSubset<T, MinisterioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MinisterioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ministerio.
     * @param {MinisterioUpsertArgs} args - Arguments to update or create a Ministerio.
     * @example
     * // Update or create a Ministerio
     * const ministerio = await prisma.ministerio.upsert({
     *   create: {
     *     // ... data to create a Ministerio
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ministerio we want to update
     *   }
     * })
     */
    upsert<T extends MinisterioUpsertArgs>(args: SelectSubset<T, MinisterioUpsertArgs<ExtArgs>>): Prisma__MinisterioClient<$Result.GetResult<Prisma.$MinisterioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ministerios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinisterioCountArgs} args - Arguments to filter Ministerios to count.
     * @example
     * // Count the number of Ministerios
     * const count = await prisma.ministerio.count({
     *   where: {
     *     // ... the filter for the Ministerios we want to count
     *   }
     * })
    **/
    count<T extends MinisterioCountArgs>(
      args?: Subset<T, MinisterioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MinisterioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ministerio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinisterioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MinisterioAggregateArgs>(args: Subset<T, MinisterioAggregateArgs>): Prisma.PrismaPromise<GetMinisterioAggregateType<T>>

    /**
     * Group by Ministerio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MinisterioGroupByArgs} args - Group by arguments.
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
      T extends MinisterioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MinisterioGroupByArgs['orderBy'] }
        : { orderBy?: MinisterioGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MinisterioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMinisterioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ministerio model
   */
  readonly fields: MinisterioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ministerio.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MinisterioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Ministerio model
   */
  interface MinisterioFieldRefs {
    readonly id: FieldRef<"Ministerio", 'String'>
    readonly userId: FieldRef<"Ministerio", 'String'>
    readonly name: FieldRef<"Ministerio", 'String'>
    readonly title: FieldRef<"Ministerio", 'String'>
    readonly local: FieldRef<"Ministerio", 'String'>
    readonly isPublic: FieldRef<"Ministerio", 'Boolean'>
    readonly createdAt: FieldRef<"Ministerio", 'DateTime'>
    readonly coverUrl: FieldRef<"Ministerio", 'String'>
    readonly updatedAt: FieldRef<"Ministerio", 'DateTime'>
    readonly role: FieldRef<"Ministerio", 'MinistryRole'>
  }
    

  // Custom InputTypes
  /**
   * Ministerio findUnique
   */
  export type MinisterioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministerio
     */
    select?: MinisterioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministerio
     */
    omit?: MinisterioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinisterioInclude<ExtArgs> | null
    /**
     * Filter, which Ministerio to fetch.
     */
    where: MinisterioWhereUniqueInput
  }

  /**
   * Ministerio findUniqueOrThrow
   */
  export type MinisterioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministerio
     */
    select?: MinisterioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministerio
     */
    omit?: MinisterioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinisterioInclude<ExtArgs> | null
    /**
     * Filter, which Ministerio to fetch.
     */
    where: MinisterioWhereUniqueInput
  }

  /**
   * Ministerio findFirst
   */
  export type MinisterioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministerio
     */
    select?: MinisterioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministerio
     */
    omit?: MinisterioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinisterioInclude<ExtArgs> | null
    /**
     * Filter, which Ministerio to fetch.
     */
    where?: MinisterioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ministerios to fetch.
     */
    orderBy?: MinisterioOrderByWithRelationInput | MinisterioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ministerios.
     */
    cursor?: MinisterioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ministerios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ministerios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ministerios.
     */
    distinct?: MinisterioScalarFieldEnum | MinisterioScalarFieldEnum[]
  }

  /**
   * Ministerio findFirstOrThrow
   */
  export type MinisterioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministerio
     */
    select?: MinisterioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministerio
     */
    omit?: MinisterioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinisterioInclude<ExtArgs> | null
    /**
     * Filter, which Ministerio to fetch.
     */
    where?: MinisterioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ministerios to fetch.
     */
    orderBy?: MinisterioOrderByWithRelationInput | MinisterioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ministerios.
     */
    cursor?: MinisterioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ministerios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ministerios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ministerios.
     */
    distinct?: MinisterioScalarFieldEnum | MinisterioScalarFieldEnum[]
  }

  /**
   * Ministerio findMany
   */
  export type MinisterioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministerio
     */
    select?: MinisterioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministerio
     */
    omit?: MinisterioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinisterioInclude<ExtArgs> | null
    /**
     * Filter, which Ministerios to fetch.
     */
    where?: MinisterioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ministerios to fetch.
     */
    orderBy?: MinisterioOrderByWithRelationInput | MinisterioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ministerios.
     */
    cursor?: MinisterioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ministerios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ministerios.
     */
    skip?: number
    distinct?: MinisterioScalarFieldEnum | MinisterioScalarFieldEnum[]
  }

  /**
   * Ministerio create
   */
  export type MinisterioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministerio
     */
    select?: MinisterioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministerio
     */
    omit?: MinisterioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinisterioInclude<ExtArgs> | null
    /**
     * The data needed to create a Ministerio.
     */
    data: XOR<MinisterioCreateInput, MinisterioUncheckedCreateInput>
  }

  /**
   * Ministerio createMany
   */
  export type MinisterioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ministerios.
     */
    data: MinisterioCreateManyInput | MinisterioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ministerio createManyAndReturn
   */
  export type MinisterioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministerio
     */
    select?: MinisterioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ministerio
     */
    omit?: MinisterioOmit<ExtArgs> | null
    /**
     * The data used to create many Ministerios.
     */
    data: MinisterioCreateManyInput | MinisterioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinisterioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ministerio update
   */
  export type MinisterioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministerio
     */
    select?: MinisterioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministerio
     */
    omit?: MinisterioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinisterioInclude<ExtArgs> | null
    /**
     * The data needed to update a Ministerio.
     */
    data: XOR<MinisterioUpdateInput, MinisterioUncheckedUpdateInput>
    /**
     * Choose, which Ministerio to update.
     */
    where: MinisterioWhereUniqueInput
  }

  /**
   * Ministerio updateMany
   */
  export type MinisterioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ministerios.
     */
    data: XOR<MinisterioUpdateManyMutationInput, MinisterioUncheckedUpdateManyInput>
    /**
     * Filter which Ministerios to update
     */
    where?: MinisterioWhereInput
    /**
     * Limit how many Ministerios to update.
     */
    limit?: number
  }

  /**
   * Ministerio updateManyAndReturn
   */
  export type MinisterioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministerio
     */
    select?: MinisterioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ministerio
     */
    omit?: MinisterioOmit<ExtArgs> | null
    /**
     * The data used to update Ministerios.
     */
    data: XOR<MinisterioUpdateManyMutationInput, MinisterioUncheckedUpdateManyInput>
    /**
     * Filter which Ministerios to update
     */
    where?: MinisterioWhereInput
    /**
     * Limit how many Ministerios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinisterioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ministerio upsert
   */
  export type MinisterioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministerio
     */
    select?: MinisterioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministerio
     */
    omit?: MinisterioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinisterioInclude<ExtArgs> | null
    /**
     * The filter to search for the Ministerio to update in case it exists.
     */
    where: MinisterioWhereUniqueInput
    /**
     * In case the Ministerio found by the `where` argument doesn't exist, create a new Ministerio with this data.
     */
    create: XOR<MinisterioCreateInput, MinisterioUncheckedCreateInput>
    /**
     * In case the Ministerio was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MinisterioUpdateInput, MinisterioUncheckedUpdateInput>
  }

  /**
   * Ministerio delete
   */
  export type MinisterioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministerio
     */
    select?: MinisterioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministerio
     */
    omit?: MinisterioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinisterioInclude<ExtArgs> | null
    /**
     * Filter which Ministerio to delete.
     */
    where: MinisterioWhereUniqueInput
  }

  /**
   * Ministerio deleteMany
   */
  export type MinisterioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ministerios to delete
     */
    where?: MinisterioWhereInput
    /**
     * Limit how many Ministerios to delete.
     */
    limit?: number
  }

  /**
   * Ministerio without action
   */
  export type MinisterioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ministerio
     */
    select?: MinisterioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ministerio
     */
    omit?: MinisterioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MinisterioInclude<ExtArgs> | null
  }


  /**
   * Model Agenda
   */

  export type AggregateAgenda = {
    _count: AgendaCountAggregateOutputType | null
    _min: AgendaMinAggregateOutputType | null
    _max: AgendaMaxAggregateOutputType | null
  }

  export type AgendaMinAggregateOutputType = {
    id: string | null
    userId: string | null
    day: string | null
    name: string | null
    hour: string | null
    isPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    destaque: boolean | null
    role: $Enums.MinistryRole | null
  }

  export type AgendaMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    day: string | null
    name: string | null
    hour: string | null
    isPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    destaque: boolean | null
    role: $Enums.MinistryRole | null
  }

  export type AgendaCountAggregateOutputType = {
    id: number
    userId: number
    day: number
    name: number
    hour: number
    isPublic: number
    createdAt: number
    updatedAt: number
    destaque: number
    role: number
    _all: number
  }


  export type AgendaMinAggregateInputType = {
    id?: true
    userId?: true
    day?: true
    name?: true
    hour?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
    destaque?: true
    role?: true
  }

  export type AgendaMaxAggregateInputType = {
    id?: true
    userId?: true
    day?: true
    name?: true
    hour?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
    destaque?: true
    role?: true
  }

  export type AgendaCountAggregateInputType = {
    id?: true
    userId?: true
    day?: true
    name?: true
    hour?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
    destaque?: true
    role?: true
    _all?: true
  }

  export type AgendaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agenda to aggregate.
     */
    where?: AgendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agenda to fetch.
     */
    orderBy?: AgendaOrderByWithRelationInput | AgendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agenda from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agenda.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Agenda
    **/
    _count?: true | AgendaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgendaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgendaMaxAggregateInputType
  }

  export type GetAgendaAggregateType<T extends AgendaAggregateArgs> = {
        [P in keyof T & keyof AggregateAgenda]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgenda[P]>
      : GetScalarType<T[P], AggregateAgenda[P]>
  }




  export type AgendaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgendaWhereInput
    orderBy?: AgendaOrderByWithAggregationInput | AgendaOrderByWithAggregationInput[]
    by: AgendaScalarFieldEnum[] | AgendaScalarFieldEnum
    having?: AgendaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgendaCountAggregateInputType | true
    _min?: AgendaMinAggregateInputType
    _max?: AgendaMaxAggregateInputType
  }

  export type AgendaGroupByOutputType = {
    id: string
    userId: string
    day: string
    name: string
    hour: string
    isPublic: boolean
    createdAt: Date
    updatedAt: Date
    destaque: boolean
    role: $Enums.MinistryRole
    _count: AgendaCountAggregateOutputType | null
    _min: AgendaMinAggregateOutputType | null
    _max: AgendaMaxAggregateOutputType | null
  }

  type GetAgendaGroupByPayload<T extends AgendaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgendaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgendaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgendaGroupByOutputType[P]>
            : GetScalarType<T[P], AgendaGroupByOutputType[P]>
        }
      >
    >


  export type AgendaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    day?: boolean
    name?: boolean
    hour?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    destaque?: boolean
    role?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agenda"]>

  export type AgendaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    day?: boolean
    name?: boolean
    hour?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    destaque?: boolean
    role?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agenda"]>

  export type AgendaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    day?: boolean
    name?: boolean
    hour?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    destaque?: boolean
    role?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agenda"]>

  export type AgendaSelectScalar = {
    id?: boolean
    userId?: boolean
    day?: boolean
    name?: boolean
    hour?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    destaque?: boolean
    role?: boolean
  }

  export type AgendaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "day" | "name" | "hour" | "isPublic" | "createdAt" | "updatedAt" | "destaque" | "role", ExtArgs["result"]["agenda"]>
  export type AgendaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AgendaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AgendaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AgendaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Agenda"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      day: string
      name: string
      hour: string
      isPublic: boolean
      createdAt: Date
      updatedAt: Date
      destaque: boolean
      role: $Enums.MinistryRole
    }, ExtArgs["result"]["agenda"]>
    composites: {}
  }

  type AgendaGetPayload<S extends boolean | null | undefined | AgendaDefaultArgs> = $Result.GetResult<Prisma.$AgendaPayload, S>

  type AgendaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgendaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgendaCountAggregateInputType | true
    }

  export interface AgendaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Agenda'], meta: { name: 'Agenda' } }
    /**
     * Find zero or one Agenda that matches the filter.
     * @param {AgendaFindUniqueArgs} args - Arguments to find a Agenda
     * @example
     * // Get one Agenda
     * const agenda = await prisma.agenda.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgendaFindUniqueArgs>(args: SelectSubset<T, AgendaFindUniqueArgs<ExtArgs>>): Prisma__AgendaClient<$Result.GetResult<Prisma.$AgendaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agenda that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgendaFindUniqueOrThrowArgs} args - Arguments to find a Agenda
     * @example
     * // Get one Agenda
     * const agenda = await prisma.agenda.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgendaFindUniqueOrThrowArgs>(args: SelectSubset<T, AgendaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgendaClient<$Result.GetResult<Prisma.$AgendaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agenda that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendaFindFirstArgs} args - Arguments to find a Agenda
     * @example
     * // Get one Agenda
     * const agenda = await prisma.agenda.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgendaFindFirstArgs>(args?: SelectSubset<T, AgendaFindFirstArgs<ExtArgs>>): Prisma__AgendaClient<$Result.GetResult<Prisma.$AgendaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agenda that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendaFindFirstOrThrowArgs} args - Arguments to find a Agenda
     * @example
     * // Get one Agenda
     * const agenda = await prisma.agenda.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgendaFindFirstOrThrowArgs>(args?: SelectSubset<T, AgendaFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgendaClient<$Result.GetResult<Prisma.$AgendaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agenda that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agenda
     * const agenda = await prisma.agenda.findMany()
     * 
     * // Get first 10 Agenda
     * const agenda = await prisma.agenda.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agendaWithIdOnly = await prisma.agenda.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgendaFindManyArgs>(args?: SelectSubset<T, AgendaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgendaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agenda.
     * @param {AgendaCreateArgs} args - Arguments to create a Agenda.
     * @example
     * // Create one Agenda
     * const Agenda = await prisma.agenda.create({
     *   data: {
     *     // ... data to create a Agenda
     *   }
     * })
     * 
     */
    create<T extends AgendaCreateArgs>(args: SelectSubset<T, AgendaCreateArgs<ExtArgs>>): Prisma__AgendaClient<$Result.GetResult<Prisma.$AgendaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agenda.
     * @param {AgendaCreateManyArgs} args - Arguments to create many Agenda.
     * @example
     * // Create many Agenda
     * const agenda = await prisma.agenda.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgendaCreateManyArgs>(args?: SelectSubset<T, AgendaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agenda and returns the data saved in the database.
     * @param {AgendaCreateManyAndReturnArgs} args - Arguments to create many Agenda.
     * @example
     * // Create many Agenda
     * const agenda = await prisma.agenda.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agenda and only return the `id`
     * const agendaWithIdOnly = await prisma.agenda.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgendaCreateManyAndReturnArgs>(args?: SelectSubset<T, AgendaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgendaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Agenda.
     * @param {AgendaDeleteArgs} args - Arguments to delete one Agenda.
     * @example
     * // Delete one Agenda
     * const Agenda = await prisma.agenda.delete({
     *   where: {
     *     // ... filter to delete one Agenda
     *   }
     * })
     * 
     */
    delete<T extends AgendaDeleteArgs>(args: SelectSubset<T, AgendaDeleteArgs<ExtArgs>>): Prisma__AgendaClient<$Result.GetResult<Prisma.$AgendaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agenda.
     * @param {AgendaUpdateArgs} args - Arguments to update one Agenda.
     * @example
     * // Update one Agenda
     * const agenda = await prisma.agenda.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgendaUpdateArgs>(args: SelectSubset<T, AgendaUpdateArgs<ExtArgs>>): Prisma__AgendaClient<$Result.GetResult<Prisma.$AgendaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agenda.
     * @param {AgendaDeleteManyArgs} args - Arguments to filter Agenda to delete.
     * @example
     * // Delete a few Agenda
     * const { count } = await prisma.agenda.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgendaDeleteManyArgs>(args?: SelectSubset<T, AgendaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agenda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agenda
     * const agenda = await prisma.agenda.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgendaUpdateManyArgs>(args: SelectSubset<T, AgendaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agenda and returns the data updated in the database.
     * @param {AgendaUpdateManyAndReturnArgs} args - Arguments to update many Agenda.
     * @example
     * // Update many Agenda
     * const agenda = await prisma.agenda.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agenda and only return the `id`
     * const agendaWithIdOnly = await prisma.agenda.updateManyAndReturn({
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
    updateManyAndReturn<T extends AgendaUpdateManyAndReturnArgs>(args: SelectSubset<T, AgendaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgendaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Agenda.
     * @param {AgendaUpsertArgs} args - Arguments to update or create a Agenda.
     * @example
     * // Update or create a Agenda
     * const agenda = await prisma.agenda.upsert({
     *   create: {
     *     // ... data to create a Agenda
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agenda we want to update
     *   }
     * })
     */
    upsert<T extends AgendaUpsertArgs>(args: SelectSubset<T, AgendaUpsertArgs<ExtArgs>>): Prisma__AgendaClient<$Result.GetResult<Prisma.$AgendaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agenda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendaCountArgs} args - Arguments to filter Agenda to count.
     * @example
     * // Count the number of Agenda
     * const count = await prisma.agenda.count({
     *   where: {
     *     // ... the filter for the Agenda we want to count
     *   }
     * })
    **/
    count<T extends AgendaCountArgs>(
      args?: Subset<T, AgendaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgendaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agenda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AgendaAggregateArgs>(args: Subset<T, AgendaAggregateArgs>): Prisma.PrismaPromise<GetAgendaAggregateType<T>>

    /**
     * Group by Agenda.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgendaGroupByArgs} args - Group by arguments.
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
      T extends AgendaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgendaGroupByArgs['orderBy'] }
        : { orderBy?: AgendaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AgendaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgendaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Agenda model
   */
  readonly fields: AgendaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Agenda.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgendaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Agenda model
   */
  interface AgendaFieldRefs {
    readonly id: FieldRef<"Agenda", 'String'>
    readonly userId: FieldRef<"Agenda", 'String'>
    readonly day: FieldRef<"Agenda", 'String'>
    readonly name: FieldRef<"Agenda", 'String'>
    readonly hour: FieldRef<"Agenda", 'String'>
    readonly isPublic: FieldRef<"Agenda", 'Boolean'>
    readonly createdAt: FieldRef<"Agenda", 'DateTime'>
    readonly updatedAt: FieldRef<"Agenda", 'DateTime'>
    readonly destaque: FieldRef<"Agenda", 'Boolean'>
    readonly role: FieldRef<"Agenda", 'MinistryRole'>
  }
    

  // Custom InputTypes
  /**
   * Agenda findUnique
   */
  export type AgendaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agenda
     */
    select?: AgendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agenda
     */
    omit?: AgendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaInclude<ExtArgs> | null
    /**
     * Filter, which Agenda to fetch.
     */
    where: AgendaWhereUniqueInput
  }

  /**
   * Agenda findUniqueOrThrow
   */
  export type AgendaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agenda
     */
    select?: AgendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agenda
     */
    omit?: AgendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaInclude<ExtArgs> | null
    /**
     * Filter, which Agenda to fetch.
     */
    where: AgendaWhereUniqueInput
  }

  /**
   * Agenda findFirst
   */
  export type AgendaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agenda
     */
    select?: AgendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agenda
     */
    omit?: AgendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaInclude<ExtArgs> | null
    /**
     * Filter, which Agenda to fetch.
     */
    where?: AgendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agenda to fetch.
     */
    orderBy?: AgendaOrderByWithRelationInput | AgendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agenda.
     */
    cursor?: AgendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agenda from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agenda.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agenda.
     */
    distinct?: AgendaScalarFieldEnum | AgendaScalarFieldEnum[]
  }

  /**
   * Agenda findFirstOrThrow
   */
  export type AgendaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agenda
     */
    select?: AgendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agenda
     */
    omit?: AgendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaInclude<ExtArgs> | null
    /**
     * Filter, which Agenda to fetch.
     */
    where?: AgendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agenda to fetch.
     */
    orderBy?: AgendaOrderByWithRelationInput | AgendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agenda.
     */
    cursor?: AgendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agenda from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agenda.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agenda.
     */
    distinct?: AgendaScalarFieldEnum | AgendaScalarFieldEnum[]
  }

  /**
   * Agenda findMany
   */
  export type AgendaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agenda
     */
    select?: AgendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agenda
     */
    omit?: AgendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaInclude<ExtArgs> | null
    /**
     * Filter, which Agenda to fetch.
     */
    where?: AgendaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agenda to fetch.
     */
    orderBy?: AgendaOrderByWithRelationInput | AgendaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Agenda.
     */
    cursor?: AgendaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agenda from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agenda.
     */
    skip?: number
    distinct?: AgendaScalarFieldEnum | AgendaScalarFieldEnum[]
  }

  /**
   * Agenda create
   */
  export type AgendaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agenda
     */
    select?: AgendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agenda
     */
    omit?: AgendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaInclude<ExtArgs> | null
    /**
     * The data needed to create a Agenda.
     */
    data: XOR<AgendaCreateInput, AgendaUncheckedCreateInput>
  }

  /**
   * Agenda createMany
   */
  export type AgendaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Agenda.
     */
    data: AgendaCreateManyInput | AgendaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Agenda createManyAndReturn
   */
  export type AgendaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agenda
     */
    select?: AgendaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agenda
     */
    omit?: AgendaOmit<ExtArgs> | null
    /**
     * The data used to create many Agenda.
     */
    data: AgendaCreateManyInput | AgendaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Agenda update
   */
  export type AgendaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agenda
     */
    select?: AgendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agenda
     */
    omit?: AgendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaInclude<ExtArgs> | null
    /**
     * The data needed to update a Agenda.
     */
    data: XOR<AgendaUpdateInput, AgendaUncheckedUpdateInput>
    /**
     * Choose, which Agenda to update.
     */
    where: AgendaWhereUniqueInput
  }

  /**
   * Agenda updateMany
   */
  export type AgendaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Agenda.
     */
    data: XOR<AgendaUpdateManyMutationInput, AgendaUncheckedUpdateManyInput>
    /**
     * Filter which Agenda to update
     */
    where?: AgendaWhereInput
    /**
     * Limit how many Agenda to update.
     */
    limit?: number
  }

  /**
   * Agenda updateManyAndReturn
   */
  export type AgendaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agenda
     */
    select?: AgendaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agenda
     */
    omit?: AgendaOmit<ExtArgs> | null
    /**
     * The data used to update Agenda.
     */
    data: XOR<AgendaUpdateManyMutationInput, AgendaUncheckedUpdateManyInput>
    /**
     * Filter which Agenda to update
     */
    where?: AgendaWhereInput
    /**
     * Limit how many Agenda to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Agenda upsert
   */
  export type AgendaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agenda
     */
    select?: AgendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agenda
     */
    omit?: AgendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaInclude<ExtArgs> | null
    /**
     * The filter to search for the Agenda to update in case it exists.
     */
    where: AgendaWhereUniqueInput
    /**
     * In case the Agenda found by the `where` argument doesn't exist, create a new Agenda with this data.
     */
    create: XOR<AgendaCreateInput, AgendaUncheckedCreateInput>
    /**
     * In case the Agenda was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgendaUpdateInput, AgendaUncheckedUpdateInput>
  }

  /**
   * Agenda delete
   */
  export type AgendaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agenda
     */
    select?: AgendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agenda
     */
    omit?: AgendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaInclude<ExtArgs> | null
    /**
     * Filter which Agenda to delete.
     */
    where: AgendaWhereUniqueInput
  }

  /**
   * Agenda deleteMany
   */
  export type AgendaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agenda to delete
     */
    where?: AgendaWhereInput
    /**
     * Limit how many Agenda to delete.
     */
    limit?: number
  }

  /**
   * Agenda without action
   */
  export type AgendaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agenda
     */
    select?: AgendaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agenda
     */
    omit?: AgendaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgendaInclude<ExtArgs> | null
  }


  /**
   * Model Doacao
   */

  export type AggregateDoacao = {
    _count: DoacaoCountAggregateOutputType | null
    _min: DoacaoMinAggregateOutputType | null
    _max: DoacaoMaxAggregateOutputType | null
  }

  export type DoacaoMinAggregateOutputType = {
    id: string | null
    userId: string | null
    local: string | null
    banco: string | null
    conta: string | null
    agencia: string | null
    nomebanco: string | null
    pix: string | null
    nomepix: string | null
    isPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DoacaoMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    local: string | null
    banco: string | null
    conta: string | null
    agencia: string | null
    nomebanco: string | null
    pix: string | null
    nomepix: string | null
    isPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DoacaoCountAggregateOutputType = {
    id: number
    userId: number
    local: number
    banco: number
    conta: number
    agencia: number
    nomebanco: number
    pix: number
    nomepix: number
    isPublic: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DoacaoMinAggregateInputType = {
    id?: true
    userId?: true
    local?: true
    banco?: true
    conta?: true
    agencia?: true
    nomebanco?: true
    pix?: true
    nomepix?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DoacaoMaxAggregateInputType = {
    id?: true
    userId?: true
    local?: true
    banco?: true
    conta?: true
    agencia?: true
    nomebanco?: true
    pix?: true
    nomepix?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DoacaoCountAggregateInputType = {
    id?: true
    userId?: true
    local?: true
    banco?: true
    conta?: true
    agencia?: true
    nomebanco?: true
    pix?: true
    nomepix?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DoacaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doacao to aggregate.
     */
    where?: DoacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doacaos to fetch.
     */
    orderBy?: DoacaoOrderByWithRelationInput | DoacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DoacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Doacaos
    **/
    _count?: true | DoacaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DoacaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DoacaoMaxAggregateInputType
  }

  export type GetDoacaoAggregateType<T extends DoacaoAggregateArgs> = {
        [P in keyof T & keyof AggregateDoacao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDoacao[P]>
      : GetScalarType<T[P], AggregateDoacao[P]>
  }




  export type DoacaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoacaoWhereInput
    orderBy?: DoacaoOrderByWithAggregationInput | DoacaoOrderByWithAggregationInput[]
    by: DoacaoScalarFieldEnum[] | DoacaoScalarFieldEnum
    having?: DoacaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DoacaoCountAggregateInputType | true
    _min?: DoacaoMinAggregateInputType
    _max?: DoacaoMaxAggregateInputType
  }

  export type DoacaoGroupByOutputType = {
    id: string
    userId: string
    local: string
    banco: string
    conta: string
    agencia: string
    nomebanco: string
    pix: string
    nomepix: string
    isPublic: boolean
    createdAt: Date
    updatedAt: Date
    _count: DoacaoCountAggregateOutputType | null
    _min: DoacaoMinAggregateOutputType | null
    _max: DoacaoMaxAggregateOutputType | null
  }

  type GetDoacaoGroupByPayload<T extends DoacaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DoacaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DoacaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DoacaoGroupByOutputType[P]>
            : GetScalarType<T[P], DoacaoGroupByOutputType[P]>
        }
      >
    >


  export type DoacaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    local?: boolean
    banco?: boolean
    conta?: boolean
    agencia?: boolean
    nomebanco?: boolean
    pix?: boolean
    nomepix?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doacao"]>

  export type DoacaoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    local?: boolean
    banco?: boolean
    conta?: boolean
    agencia?: boolean
    nomebanco?: boolean
    pix?: boolean
    nomepix?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doacao"]>

  export type DoacaoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    local?: boolean
    banco?: boolean
    conta?: boolean
    agencia?: boolean
    nomebanco?: boolean
    pix?: boolean
    nomepix?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doacao"]>

  export type DoacaoSelectScalar = {
    id?: boolean
    userId?: boolean
    local?: boolean
    banco?: boolean
    conta?: boolean
    agencia?: boolean
    nomebanco?: boolean
    pix?: boolean
    nomepix?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DoacaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "local" | "banco" | "conta" | "agencia" | "nomebanco" | "pix" | "nomepix" | "isPublic" | "createdAt" | "updatedAt", ExtArgs["result"]["doacao"]>
  export type DoacaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DoacaoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DoacaoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DoacaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Doacao"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      local: string
      banco: string
      conta: string
      agencia: string
      nomebanco: string
      pix: string
      nomepix: string
      isPublic: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["doacao"]>
    composites: {}
  }

  type DoacaoGetPayload<S extends boolean | null | undefined | DoacaoDefaultArgs> = $Result.GetResult<Prisma.$DoacaoPayload, S>

  type DoacaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DoacaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DoacaoCountAggregateInputType | true
    }

  export interface DoacaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Doacao'], meta: { name: 'Doacao' } }
    /**
     * Find zero or one Doacao that matches the filter.
     * @param {DoacaoFindUniqueArgs} args - Arguments to find a Doacao
     * @example
     * // Get one Doacao
     * const doacao = await prisma.doacao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoacaoFindUniqueArgs>(args: SelectSubset<T, DoacaoFindUniqueArgs<ExtArgs>>): Prisma__DoacaoClient<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Doacao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoacaoFindUniqueOrThrowArgs} args - Arguments to find a Doacao
     * @example
     * // Get one Doacao
     * const doacao = await prisma.doacao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoacaoFindUniqueOrThrowArgs>(args: SelectSubset<T, DoacaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DoacaoClient<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Doacao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoacaoFindFirstArgs} args - Arguments to find a Doacao
     * @example
     * // Get one Doacao
     * const doacao = await prisma.doacao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoacaoFindFirstArgs>(args?: SelectSubset<T, DoacaoFindFirstArgs<ExtArgs>>): Prisma__DoacaoClient<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Doacao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoacaoFindFirstOrThrowArgs} args - Arguments to find a Doacao
     * @example
     * // Get one Doacao
     * const doacao = await prisma.doacao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoacaoFindFirstOrThrowArgs>(args?: SelectSubset<T, DoacaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__DoacaoClient<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Doacaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoacaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Doacaos
     * const doacaos = await prisma.doacao.findMany()
     * 
     * // Get first 10 Doacaos
     * const doacaos = await prisma.doacao.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const doacaoWithIdOnly = await prisma.doacao.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DoacaoFindManyArgs>(args?: SelectSubset<T, DoacaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Doacao.
     * @param {DoacaoCreateArgs} args - Arguments to create a Doacao.
     * @example
     * // Create one Doacao
     * const Doacao = await prisma.doacao.create({
     *   data: {
     *     // ... data to create a Doacao
     *   }
     * })
     * 
     */
    create<T extends DoacaoCreateArgs>(args: SelectSubset<T, DoacaoCreateArgs<ExtArgs>>): Prisma__DoacaoClient<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Doacaos.
     * @param {DoacaoCreateManyArgs} args - Arguments to create many Doacaos.
     * @example
     * // Create many Doacaos
     * const doacao = await prisma.doacao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DoacaoCreateManyArgs>(args?: SelectSubset<T, DoacaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Doacaos and returns the data saved in the database.
     * @param {DoacaoCreateManyAndReturnArgs} args - Arguments to create many Doacaos.
     * @example
     * // Create many Doacaos
     * const doacao = await prisma.doacao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Doacaos and only return the `id`
     * const doacaoWithIdOnly = await prisma.doacao.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DoacaoCreateManyAndReturnArgs>(args?: SelectSubset<T, DoacaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Doacao.
     * @param {DoacaoDeleteArgs} args - Arguments to delete one Doacao.
     * @example
     * // Delete one Doacao
     * const Doacao = await prisma.doacao.delete({
     *   where: {
     *     // ... filter to delete one Doacao
     *   }
     * })
     * 
     */
    delete<T extends DoacaoDeleteArgs>(args: SelectSubset<T, DoacaoDeleteArgs<ExtArgs>>): Prisma__DoacaoClient<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Doacao.
     * @param {DoacaoUpdateArgs} args - Arguments to update one Doacao.
     * @example
     * // Update one Doacao
     * const doacao = await prisma.doacao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DoacaoUpdateArgs>(args: SelectSubset<T, DoacaoUpdateArgs<ExtArgs>>): Prisma__DoacaoClient<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Doacaos.
     * @param {DoacaoDeleteManyArgs} args - Arguments to filter Doacaos to delete.
     * @example
     * // Delete a few Doacaos
     * const { count } = await prisma.doacao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DoacaoDeleteManyArgs>(args?: SelectSubset<T, DoacaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Doacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoacaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Doacaos
     * const doacao = await prisma.doacao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DoacaoUpdateManyArgs>(args: SelectSubset<T, DoacaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Doacaos and returns the data updated in the database.
     * @param {DoacaoUpdateManyAndReturnArgs} args - Arguments to update many Doacaos.
     * @example
     * // Update many Doacaos
     * const doacao = await prisma.doacao.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Doacaos and only return the `id`
     * const doacaoWithIdOnly = await prisma.doacao.updateManyAndReturn({
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
    updateManyAndReturn<T extends DoacaoUpdateManyAndReturnArgs>(args: SelectSubset<T, DoacaoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Doacao.
     * @param {DoacaoUpsertArgs} args - Arguments to update or create a Doacao.
     * @example
     * // Update or create a Doacao
     * const doacao = await prisma.doacao.upsert({
     *   create: {
     *     // ... data to create a Doacao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Doacao we want to update
     *   }
     * })
     */
    upsert<T extends DoacaoUpsertArgs>(args: SelectSubset<T, DoacaoUpsertArgs<ExtArgs>>): Prisma__DoacaoClient<$Result.GetResult<Prisma.$DoacaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Doacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoacaoCountArgs} args - Arguments to filter Doacaos to count.
     * @example
     * // Count the number of Doacaos
     * const count = await prisma.doacao.count({
     *   where: {
     *     // ... the filter for the Doacaos we want to count
     *   }
     * })
    **/
    count<T extends DoacaoCountArgs>(
      args?: Subset<T, DoacaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DoacaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Doacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoacaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DoacaoAggregateArgs>(args: Subset<T, DoacaoAggregateArgs>): Prisma.PrismaPromise<GetDoacaoAggregateType<T>>

    /**
     * Group by Doacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoacaoGroupByArgs} args - Group by arguments.
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
      T extends DoacaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DoacaoGroupByArgs['orderBy'] }
        : { orderBy?: DoacaoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DoacaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoacaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Doacao model
   */
  readonly fields: DoacaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Doacao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DoacaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Doacao model
   */
  interface DoacaoFieldRefs {
    readonly id: FieldRef<"Doacao", 'String'>
    readonly userId: FieldRef<"Doacao", 'String'>
    readonly local: FieldRef<"Doacao", 'String'>
    readonly banco: FieldRef<"Doacao", 'String'>
    readonly conta: FieldRef<"Doacao", 'String'>
    readonly agencia: FieldRef<"Doacao", 'String'>
    readonly nomebanco: FieldRef<"Doacao", 'String'>
    readonly pix: FieldRef<"Doacao", 'String'>
    readonly nomepix: FieldRef<"Doacao", 'String'>
    readonly isPublic: FieldRef<"Doacao", 'Boolean'>
    readonly createdAt: FieldRef<"Doacao", 'DateTime'>
    readonly updatedAt: FieldRef<"Doacao", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Doacao findUnique
   */
  export type DoacaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    /**
     * Filter, which Doacao to fetch.
     */
    where: DoacaoWhereUniqueInput
  }

  /**
   * Doacao findUniqueOrThrow
   */
  export type DoacaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    /**
     * Filter, which Doacao to fetch.
     */
    where: DoacaoWhereUniqueInput
  }

  /**
   * Doacao findFirst
   */
  export type DoacaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    /**
     * Filter, which Doacao to fetch.
     */
    where?: DoacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doacaos to fetch.
     */
    orderBy?: DoacaoOrderByWithRelationInput | DoacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doacaos.
     */
    cursor?: DoacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doacaos.
     */
    distinct?: DoacaoScalarFieldEnum | DoacaoScalarFieldEnum[]
  }

  /**
   * Doacao findFirstOrThrow
   */
  export type DoacaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    /**
     * Filter, which Doacao to fetch.
     */
    where?: DoacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doacaos to fetch.
     */
    orderBy?: DoacaoOrderByWithRelationInput | DoacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doacaos.
     */
    cursor?: DoacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doacaos.
     */
    distinct?: DoacaoScalarFieldEnum | DoacaoScalarFieldEnum[]
  }

  /**
   * Doacao findMany
   */
  export type DoacaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    /**
     * Filter, which Doacaos to fetch.
     */
    where?: DoacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doacaos to fetch.
     */
    orderBy?: DoacaoOrderByWithRelationInput | DoacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Doacaos.
     */
    cursor?: DoacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doacaos.
     */
    skip?: number
    distinct?: DoacaoScalarFieldEnum | DoacaoScalarFieldEnum[]
  }

  /**
   * Doacao create
   */
  export type DoacaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    /**
     * The data needed to create a Doacao.
     */
    data: XOR<DoacaoCreateInput, DoacaoUncheckedCreateInput>
  }

  /**
   * Doacao createMany
   */
  export type DoacaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Doacaos.
     */
    data: DoacaoCreateManyInput | DoacaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Doacao createManyAndReturn
   */
  export type DoacaoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * The data used to create many Doacaos.
     */
    data: DoacaoCreateManyInput | DoacaoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Doacao update
   */
  export type DoacaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    /**
     * The data needed to update a Doacao.
     */
    data: XOR<DoacaoUpdateInput, DoacaoUncheckedUpdateInput>
    /**
     * Choose, which Doacao to update.
     */
    where: DoacaoWhereUniqueInput
  }

  /**
   * Doacao updateMany
   */
  export type DoacaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Doacaos.
     */
    data: XOR<DoacaoUpdateManyMutationInput, DoacaoUncheckedUpdateManyInput>
    /**
     * Filter which Doacaos to update
     */
    where?: DoacaoWhereInput
    /**
     * Limit how many Doacaos to update.
     */
    limit?: number
  }

  /**
   * Doacao updateManyAndReturn
   */
  export type DoacaoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * The data used to update Doacaos.
     */
    data: XOR<DoacaoUpdateManyMutationInput, DoacaoUncheckedUpdateManyInput>
    /**
     * Filter which Doacaos to update
     */
    where?: DoacaoWhereInput
    /**
     * Limit how many Doacaos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Doacao upsert
   */
  export type DoacaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    /**
     * The filter to search for the Doacao to update in case it exists.
     */
    where: DoacaoWhereUniqueInput
    /**
     * In case the Doacao found by the `where` argument doesn't exist, create a new Doacao with this data.
     */
    create: XOR<DoacaoCreateInput, DoacaoUncheckedCreateInput>
    /**
     * In case the Doacao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DoacaoUpdateInput, DoacaoUncheckedUpdateInput>
  }

  /**
   * Doacao delete
   */
  export type DoacaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
    /**
     * Filter which Doacao to delete.
     */
    where: DoacaoWhereUniqueInput
  }

  /**
   * Doacao deleteMany
   */
  export type DoacaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doacaos to delete
     */
    where?: DoacaoWhereInput
    /**
     * Limit how many Doacaos to delete.
     */
    limit?: number
  }

  /**
   * Doacao without action
   */
  export type DoacaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doacao
     */
    select?: DoacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doacao
     */
    omit?: DoacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoacaoInclude<ExtArgs> | null
  }


  /**
   * Model Endereco
   */

  export type AggregateEndereco = {
    _count: EnderecoCountAggregateOutputType | null
    _min: EnderecoMinAggregateOutputType | null
    _max: EnderecoMaxAggregateOutputType | null
  }

  export type EnderecoMinAggregateOutputType = {
    id: string | null
    userId: string | null
    local: string | null
    rua: string | null
    cep: string | null
    isPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    numero: string | null
    cidade: string | null
  }

  export type EnderecoMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    local: string | null
    rua: string | null
    cep: string | null
    isPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    numero: string | null
    cidade: string | null
  }

  export type EnderecoCountAggregateOutputType = {
    id: number
    userId: number
    local: number
    rua: number
    cep: number
    isPublic: number
    createdAt: number
    updatedAt: number
    numero: number
    cidade: number
    _all: number
  }


  export type EnderecoMinAggregateInputType = {
    id?: true
    userId?: true
    local?: true
    rua?: true
    cep?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
    numero?: true
    cidade?: true
  }

  export type EnderecoMaxAggregateInputType = {
    id?: true
    userId?: true
    local?: true
    rua?: true
    cep?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
    numero?: true
    cidade?: true
  }

  export type EnderecoCountAggregateInputType = {
    id?: true
    userId?: true
    local?: true
    rua?: true
    cep?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
    numero?: true
    cidade?: true
    _all?: true
  }

  export type EnderecoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Endereco to aggregate.
     */
    where?: EnderecoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enderecos to fetch.
     */
    orderBy?: EnderecoOrderByWithRelationInput | EnderecoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EnderecoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enderecos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enderecos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Enderecos
    **/
    _count?: true | EnderecoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnderecoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnderecoMaxAggregateInputType
  }

  export type GetEnderecoAggregateType<T extends EnderecoAggregateArgs> = {
        [P in keyof T & keyof AggregateEndereco]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEndereco[P]>
      : GetScalarType<T[P], AggregateEndereco[P]>
  }




  export type EnderecoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnderecoWhereInput
    orderBy?: EnderecoOrderByWithAggregationInput | EnderecoOrderByWithAggregationInput[]
    by: EnderecoScalarFieldEnum[] | EnderecoScalarFieldEnum
    having?: EnderecoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnderecoCountAggregateInputType | true
    _min?: EnderecoMinAggregateInputType
    _max?: EnderecoMaxAggregateInputType
  }

  export type EnderecoGroupByOutputType = {
    id: string
    userId: string
    local: string
    rua: string
    cep: string
    isPublic: boolean
    createdAt: Date
    updatedAt: Date
    numero: string | null
    cidade: string | null
    _count: EnderecoCountAggregateOutputType | null
    _min: EnderecoMinAggregateOutputType | null
    _max: EnderecoMaxAggregateOutputType | null
  }

  type GetEnderecoGroupByPayload<T extends EnderecoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnderecoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnderecoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnderecoGroupByOutputType[P]>
            : GetScalarType<T[P], EnderecoGroupByOutputType[P]>
        }
      >
    >


  export type EnderecoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    local?: boolean
    rua?: boolean
    cep?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    numero?: boolean
    cidade?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["endereco"]>

  export type EnderecoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    local?: boolean
    rua?: boolean
    cep?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    numero?: boolean
    cidade?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["endereco"]>

  export type EnderecoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    local?: boolean
    rua?: boolean
    cep?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    numero?: boolean
    cidade?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["endereco"]>

  export type EnderecoSelectScalar = {
    id?: boolean
    userId?: boolean
    local?: boolean
    rua?: boolean
    cep?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    numero?: boolean
    cidade?: boolean
  }

  export type EnderecoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "local" | "rua" | "cep" | "isPublic" | "createdAt" | "updatedAt" | "numero" | "cidade", ExtArgs["result"]["endereco"]>
  export type EnderecoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EnderecoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type EnderecoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EnderecoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Endereco"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      local: string
      rua: string
      cep: string
      isPublic: boolean
      createdAt: Date
      updatedAt: Date
      numero: string | null
      cidade: string | null
    }, ExtArgs["result"]["endereco"]>
    composites: {}
  }

  type EnderecoGetPayload<S extends boolean | null | undefined | EnderecoDefaultArgs> = $Result.GetResult<Prisma.$EnderecoPayload, S>

  type EnderecoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EnderecoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EnderecoCountAggregateInputType | true
    }

  export interface EnderecoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Endereco'], meta: { name: 'Endereco' } }
    /**
     * Find zero or one Endereco that matches the filter.
     * @param {EnderecoFindUniqueArgs} args - Arguments to find a Endereco
     * @example
     * // Get one Endereco
     * const endereco = await prisma.endereco.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EnderecoFindUniqueArgs>(args: SelectSubset<T, EnderecoFindUniqueArgs<ExtArgs>>): Prisma__EnderecoClient<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Endereco that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EnderecoFindUniqueOrThrowArgs} args - Arguments to find a Endereco
     * @example
     * // Get one Endereco
     * const endereco = await prisma.endereco.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EnderecoFindUniqueOrThrowArgs>(args: SelectSubset<T, EnderecoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EnderecoClient<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Endereco that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoFindFirstArgs} args - Arguments to find a Endereco
     * @example
     * // Get one Endereco
     * const endereco = await prisma.endereco.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EnderecoFindFirstArgs>(args?: SelectSubset<T, EnderecoFindFirstArgs<ExtArgs>>): Prisma__EnderecoClient<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Endereco that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoFindFirstOrThrowArgs} args - Arguments to find a Endereco
     * @example
     * // Get one Endereco
     * const endereco = await prisma.endereco.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EnderecoFindFirstOrThrowArgs>(args?: SelectSubset<T, EnderecoFindFirstOrThrowArgs<ExtArgs>>): Prisma__EnderecoClient<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Enderecos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Enderecos
     * const enderecos = await prisma.endereco.findMany()
     * 
     * // Get first 10 Enderecos
     * const enderecos = await prisma.endereco.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const enderecoWithIdOnly = await prisma.endereco.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EnderecoFindManyArgs>(args?: SelectSubset<T, EnderecoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Endereco.
     * @param {EnderecoCreateArgs} args - Arguments to create a Endereco.
     * @example
     * // Create one Endereco
     * const Endereco = await prisma.endereco.create({
     *   data: {
     *     // ... data to create a Endereco
     *   }
     * })
     * 
     */
    create<T extends EnderecoCreateArgs>(args: SelectSubset<T, EnderecoCreateArgs<ExtArgs>>): Prisma__EnderecoClient<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Enderecos.
     * @param {EnderecoCreateManyArgs} args - Arguments to create many Enderecos.
     * @example
     * // Create many Enderecos
     * const endereco = await prisma.endereco.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EnderecoCreateManyArgs>(args?: SelectSubset<T, EnderecoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Enderecos and returns the data saved in the database.
     * @param {EnderecoCreateManyAndReturnArgs} args - Arguments to create many Enderecos.
     * @example
     * // Create many Enderecos
     * const endereco = await prisma.endereco.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Enderecos and only return the `id`
     * const enderecoWithIdOnly = await prisma.endereco.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EnderecoCreateManyAndReturnArgs>(args?: SelectSubset<T, EnderecoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Endereco.
     * @param {EnderecoDeleteArgs} args - Arguments to delete one Endereco.
     * @example
     * // Delete one Endereco
     * const Endereco = await prisma.endereco.delete({
     *   where: {
     *     // ... filter to delete one Endereco
     *   }
     * })
     * 
     */
    delete<T extends EnderecoDeleteArgs>(args: SelectSubset<T, EnderecoDeleteArgs<ExtArgs>>): Prisma__EnderecoClient<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Endereco.
     * @param {EnderecoUpdateArgs} args - Arguments to update one Endereco.
     * @example
     * // Update one Endereco
     * const endereco = await prisma.endereco.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EnderecoUpdateArgs>(args: SelectSubset<T, EnderecoUpdateArgs<ExtArgs>>): Prisma__EnderecoClient<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Enderecos.
     * @param {EnderecoDeleteManyArgs} args - Arguments to filter Enderecos to delete.
     * @example
     * // Delete a few Enderecos
     * const { count } = await prisma.endereco.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EnderecoDeleteManyArgs>(args?: SelectSubset<T, EnderecoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enderecos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Enderecos
     * const endereco = await prisma.endereco.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EnderecoUpdateManyArgs>(args: SelectSubset<T, EnderecoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enderecos and returns the data updated in the database.
     * @param {EnderecoUpdateManyAndReturnArgs} args - Arguments to update many Enderecos.
     * @example
     * // Update many Enderecos
     * const endereco = await prisma.endereco.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Enderecos and only return the `id`
     * const enderecoWithIdOnly = await prisma.endereco.updateManyAndReturn({
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
    updateManyAndReturn<T extends EnderecoUpdateManyAndReturnArgs>(args: SelectSubset<T, EnderecoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Endereco.
     * @param {EnderecoUpsertArgs} args - Arguments to update or create a Endereco.
     * @example
     * // Update or create a Endereco
     * const endereco = await prisma.endereco.upsert({
     *   create: {
     *     // ... data to create a Endereco
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Endereco we want to update
     *   }
     * })
     */
    upsert<T extends EnderecoUpsertArgs>(args: SelectSubset<T, EnderecoUpsertArgs<ExtArgs>>): Prisma__EnderecoClient<$Result.GetResult<Prisma.$EnderecoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Enderecos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoCountArgs} args - Arguments to filter Enderecos to count.
     * @example
     * // Count the number of Enderecos
     * const count = await prisma.endereco.count({
     *   where: {
     *     // ... the filter for the Enderecos we want to count
     *   }
     * })
    **/
    count<T extends EnderecoCountArgs>(
      args?: Subset<T, EnderecoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnderecoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Endereco.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EnderecoAggregateArgs>(args: Subset<T, EnderecoAggregateArgs>): Prisma.PrismaPromise<GetEnderecoAggregateType<T>>

    /**
     * Group by Endereco.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnderecoGroupByArgs} args - Group by arguments.
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
      T extends EnderecoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnderecoGroupByArgs['orderBy'] }
        : { orderBy?: EnderecoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EnderecoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnderecoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Endereco model
   */
  readonly fields: EnderecoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Endereco.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EnderecoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Endereco model
   */
  interface EnderecoFieldRefs {
    readonly id: FieldRef<"Endereco", 'String'>
    readonly userId: FieldRef<"Endereco", 'String'>
    readonly local: FieldRef<"Endereco", 'String'>
    readonly rua: FieldRef<"Endereco", 'String'>
    readonly cep: FieldRef<"Endereco", 'String'>
    readonly isPublic: FieldRef<"Endereco", 'Boolean'>
    readonly createdAt: FieldRef<"Endereco", 'DateTime'>
    readonly updatedAt: FieldRef<"Endereco", 'DateTime'>
    readonly numero: FieldRef<"Endereco", 'String'>
    readonly cidade: FieldRef<"Endereco", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Endereco findUnique
   */
  export type EnderecoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    /**
     * Filter, which Endereco to fetch.
     */
    where: EnderecoWhereUniqueInput
  }

  /**
   * Endereco findUniqueOrThrow
   */
  export type EnderecoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    /**
     * Filter, which Endereco to fetch.
     */
    where: EnderecoWhereUniqueInput
  }

  /**
   * Endereco findFirst
   */
  export type EnderecoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    /**
     * Filter, which Endereco to fetch.
     */
    where?: EnderecoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enderecos to fetch.
     */
    orderBy?: EnderecoOrderByWithRelationInput | EnderecoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enderecos.
     */
    cursor?: EnderecoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enderecos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enderecos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enderecos.
     */
    distinct?: EnderecoScalarFieldEnum | EnderecoScalarFieldEnum[]
  }

  /**
   * Endereco findFirstOrThrow
   */
  export type EnderecoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    /**
     * Filter, which Endereco to fetch.
     */
    where?: EnderecoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enderecos to fetch.
     */
    orderBy?: EnderecoOrderByWithRelationInput | EnderecoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enderecos.
     */
    cursor?: EnderecoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enderecos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enderecos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enderecos.
     */
    distinct?: EnderecoScalarFieldEnum | EnderecoScalarFieldEnum[]
  }

  /**
   * Endereco findMany
   */
  export type EnderecoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    /**
     * Filter, which Enderecos to fetch.
     */
    where?: EnderecoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enderecos to fetch.
     */
    orderBy?: EnderecoOrderByWithRelationInput | EnderecoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Enderecos.
     */
    cursor?: EnderecoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enderecos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enderecos.
     */
    skip?: number
    distinct?: EnderecoScalarFieldEnum | EnderecoScalarFieldEnum[]
  }

  /**
   * Endereco create
   */
  export type EnderecoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    /**
     * The data needed to create a Endereco.
     */
    data: XOR<EnderecoCreateInput, EnderecoUncheckedCreateInput>
  }

  /**
   * Endereco createMany
   */
  export type EnderecoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Enderecos.
     */
    data: EnderecoCreateManyInput | EnderecoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Endereco createManyAndReturn
   */
  export type EnderecoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * The data used to create many Enderecos.
     */
    data: EnderecoCreateManyInput | EnderecoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Endereco update
   */
  export type EnderecoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    /**
     * The data needed to update a Endereco.
     */
    data: XOR<EnderecoUpdateInput, EnderecoUncheckedUpdateInput>
    /**
     * Choose, which Endereco to update.
     */
    where: EnderecoWhereUniqueInput
  }

  /**
   * Endereco updateMany
   */
  export type EnderecoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Enderecos.
     */
    data: XOR<EnderecoUpdateManyMutationInput, EnderecoUncheckedUpdateManyInput>
    /**
     * Filter which Enderecos to update
     */
    where?: EnderecoWhereInput
    /**
     * Limit how many Enderecos to update.
     */
    limit?: number
  }

  /**
   * Endereco updateManyAndReturn
   */
  export type EnderecoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * The data used to update Enderecos.
     */
    data: XOR<EnderecoUpdateManyMutationInput, EnderecoUncheckedUpdateManyInput>
    /**
     * Filter which Enderecos to update
     */
    where?: EnderecoWhereInput
    /**
     * Limit how many Enderecos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Endereco upsert
   */
  export type EnderecoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    /**
     * The filter to search for the Endereco to update in case it exists.
     */
    where: EnderecoWhereUniqueInput
    /**
     * In case the Endereco found by the `where` argument doesn't exist, create a new Endereco with this data.
     */
    create: XOR<EnderecoCreateInput, EnderecoUncheckedCreateInput>
    /**
     * In case the Endereco was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EnderecoUpdateInput, EnderecoUncheckedUpdateInput>
  }

  /**
   * Endereco delete
   */
  export type EnderecoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
    /**
     * Filter which Endereco to delete.
     */
    where: EnderecoWhereUniqueInput
  }

  /**
   * Endereco deleteMany
   */
  export type EnderecoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enderecos to delete
     */
    where?: EnderecoWhereInput
    /**
     * Limit how many Enderecos to delete.
     */
    limit?: number
  }

  /**
   * Endereco without action
   */
  export type EnderecoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Endereco
     */
    select?: EnderecoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Endereco
     */
    omit?: EnderecoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnderecoInclude<ExtArgs> | null
  }


  /**
   * Model Contato
   */

  export type AggregateContato = {
    _count: ContatoCountAggregateOutputType | null
    _min: ContatoMinAggregateOutputType | null
    _max: ContatoMaxAggregateOutputType | null
  }

  export type ContatoMinAggregateOutputType = {
    id: string | null
    userId: string | null
    local: string | null
    whatsapp: string | null
    facebook: string | null
    isPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    instagram: string | null
  }

  export type ContatoMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    local: string | null
    whatsapp: string | null
    facebook: string | null
    isPublic: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    instagram: string | null
  }

  export type ContatoCountAggregateOutputType = {
    id: number
    userId: number
    local: number
    whatsapp: number
    facebook: number
    isPublic: number
    createdAt: number
    updatedAt: number
    instagram: number
    _all: number
  }


  export type ContatoMinAggregateInputType = {
    id?: true
    userId?: true
    local?: true
    whatsapp?: true
    facebook?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
    instagram?: true
  }

  export type ContatoMaxAggregateInputType = {
    id?: true
    userId?: true
    local?: true
    whatsapp?: true
    facebook?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
    instagram?: true
  }

  export type ContatoCountAggregateInputType = {
    id?: true
    userId?: true
    local?: true
    whatsapp?: true
    facebook?: true
    isPublic?: true
    createdAt?: true
    updatedAt?: true
    instagram?: true
    _all?: true
  }

  export type ContatoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contato to aggregate.
     */
    where?: ContatoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contatoes to fetch.
     */
    orderBy?: ContatoOrderByWithRelationInput | ContatoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContatoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contatoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contatoes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contatoes
    **/
    _count?: true | ContatoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContatoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContatoMaxAggregateInputType
  }

  export type GetContatoAggregateType<T extends ContatoAggregateArgs> = {
        [P in keyof T & keyof AggregateContato]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContato[P]>
      : GetScalarType<T[P], AggregateContato[P]>
  }




  export type ContatoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContatoWhereInput
    orderBy?: ContatoOrderByWithAggregationInput | ContatoOrderByWithAggregationInput[]
    by: ContatoScalarFieldEnum[] | ContatoScalarFieldEnum
    having?: ContatoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContatoCountAggregateInputType | true
    _min?: ContatoMinAggregateInputType
    _max?: ContatoMaxAggregateInputType
  }

  export type ContatoGroupByOutputType = {
    id: string
    userId: string
    local: string
    whatsapp: string
    facebook: string
    isPublic: boolean
    createdAt: Date
    updatedAt: Date
    instagram: string
    _count: ContatoCountAggregateOutputType | null
    _min: ContatoMinAggregateOutputType | null
    _max: ContatoMaxAggregateOutputType | null
  }

  type GetContatoGroupByPayload<T extends ContatoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContatoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContatoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContatoGroupByOutputType[P]>
            : GetScalarType<T[P], ContatoGroupByOutputType[P]>
        }
      >
    >


  export type ContatoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    local?: boolean
    whatsapp?: boolean
    facebook?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instagram?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contato"]>

  export type ContatoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    local?: boolean
    whatsapp?: boolean
    facebook?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instagram?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contato"]>

  export type ContatoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    local?: boolean
    whatsapp?: boolean
    facebook?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instagram?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contato"]>

  export type ContatoSelectScalar = {
    id?: boolean
    userId?: boolean
    local?: boolean
    whatsapp?: boolean
    facebook?: boolean
    isPublic?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instagram?: boolean
  }

  export type ContatoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "local" | "whatsapp" | "facebook" | "isPublic" | "createdAt" | "updatedAt" | "instagram", ExtArgs["result"]["contato"]>
  export type ContatoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ContatoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ContatoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ContatoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contato"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      local: string
      whatsapp: string
      facebook: string
      isPublic: boolean
      createdAt: Date
      updatedAt: Date
      instagram: string
    }, ExtArgs["result"]["contato"]>
    composites: {}
  }

  type ContatoGetPayload<S extends boolean | null | undefined | ContatoDefaultArgs> = $Result.GetResult<Prisma.$ContatoPayload, S>

  type ContatoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContatoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContatoCountAggregateInputType | true
    }

  export interface ContatoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contato'], meta: { name: 'Contato' } }
    /**
     * Find zero or one Contato that matches the filter.
     * @param {ContatoFindUniqueArgs} args - Arguments to find a Contato
     * @example
     * // Get one Contato
     * const contato = await prisma.contato.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContatoFindUniqueArgs>(args: SelectSubset<T, ContatoFindUniqueArgs<ExtArgs>>): Prisma__ContatoClient<$Result.GetResult<Prisma.$ContatoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Contato that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContatoFindUniqueOrThrowArgs} args - Arguments to find a Contato
     * @example
     * // Get one Contato
     * const contato = await prisma.contato.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContatoFindUniqueOrThrowArgs>(args: SelectSubset<T, ContatoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContatoClient<$Result.GetResult<Prisma.$ContatoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contato that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoFindFirstArgs} args - Arguments to find a Contato
     * @example
     * // Get one Contato
     * const contato = await prisma.contato.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContatoFindFirstArgs>(args?: SelectSubset<T, ContatoFindFirstArgs<ExtArgs>>): Prisma__ContatoClient<$Result.GetResult<Prisma.$ContatoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contato that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoFindFirstOrThrowArgs} args - Arguments to find a Contato
     * @example
     * // Get one Contato
     * const contato = await prisma.contato.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContatoFindFirstOrThrowArgs>(args?: SelectSubset<T, ContatoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContatoClient<$Result.GetResult<Prisma.$ContatoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contatoes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contatoes
     * const contatoes = await prisma.contato.findMany()
     * 
     * // Get first 10 Contatoes
     * const contatoes = await prisma.contato.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contatoWithIdOnly = await prisma.contato.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContatoFindManyArgs>(args?: SelectSubset<T, ContatoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContatoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Contato.
     * @param {ContatoCreateArgs} args - Arguments to create a Contato.
     * @example
     * // Create one Contato
     * const Contato = await prisma.contato.create({
     *   data: {
     *     // ... data to create a Contato
     *   }
     * })
     * 
     */
    create<T extends ContatoCreateArgs>(args: SelectSubset<T, ContatoCreateArgs<ExtArgs>>): Prisma__ContatoClient<$Result.GetResult<Prisma.$ContatoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contatoes.
     * @param {ContatoCreateManyArgs} args - Arguments to create many Contatoes.
     * @example
     * // Create many Contatoes
     * const contato = await prisma.contato.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContatoCreateManyArgs>(args?: SelectSubset<T, ContatoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contatoes and returns the data saved in the database.
     * @param {ContatoCreateManyAndReturnArgs} args - Arguments to create many Contatoes.
     * @example
     * // Create many Contatoes
     * const contato = await prisma.contato.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contatoes and only return the `id`
     * const contatoWithIdOnly = await prisma.contato.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContatoCreateManyAndReturnArgs>(args?: SelectSubset<T, ContatoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContatoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Contato.
     * @param {ContatoDeleteArgs} args - Arguments to delete one Contato.
     * @example
     * // Delete one Contato
     * const Contato = await prisma.contato.delete({
     *   where: {
     *     // ... filter to delete one Contato
     *   }
     * })
     * 
     */
    delete<T extends ContatoDeleteArgs>(args: SelectSubset<T, ContatoDeleteArgs<ExtArgs>>): Prisma__ContatoClient<$Result.GetResult<Prisma.$ContatoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Contato.
     * @param {ContatoUpdateArgs} args - Arguments to update one Contato.
     * @example
     * // Update one Contato
     * const contato = await prisma.contato.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContatoUpdateArgs>(args: SelectSubset<T, ContatoUpdateArgs<ExtArgs>>): Prisma__ContatoClient<$Result.GetResult<Prisma.$ContatoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contatoes.
     * @param {ContatoDeleteManyArgs} args - Arguments to filter Contatoes to delete.
     * @example
     * // Delete a few Contatoes
     * const { count } = await prisma.contato.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContatoDeleteManyArgs>(args?: SelectSubset<T, ContatoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contatoes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contatoes
     * const contato = await prisma.contato.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContatoUpdateManyArgs>(args: SelectSubset<T, ContatoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contatoes and returns the data updated in the database.
     * @param {ContatoUpdateManyAndReturnArgs} args - Arguments to update many Contatoes.
     * @example
     * // Update many Contatoes
     * const contato = await prisma.contato.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Contatoes and only return the `id`
     * const contatoWithIdOnly = await prisma.contato.updateManyAndReturn({
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
    updateManyAndReturn<T extends ContatoUpdateManyAndReturnArgs>(args: SelectSubset<T, ContatoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContatoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Contato.
     * @param {ContatoUpsertArgs} args - Arguments to update or create a Contato.
     * @example
     * // Update or create a Contato
     * const contato = await prisma.contato.upsert({
     *   create: {
     *     // ... data to create a Contato
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contato we want to update
     *   }
     * })
     */
    upsert<T extends ContatoUpsertArgs>(args: SelectSubset<T, ContatoUpsertArgs<ExtArgs>>): Prisma__ContatoClient<$Result.GetResult<Prisma.$ContatoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contatoes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoCountArgs} args - Arguments to filter Contatoes to count.
     * @example
     * // Count the number of Contatoes
     * const count = await prisma.contato.count({
     *   where: {
     *     // ... the filter for the Contatoes we want to count
     *   }
     * })
    **/
    count<T extends ContatoCountArgs>(
      args?: Subset<T, ContatoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContatoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contato.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContatoAggregateArgs>(args: Subset<T, ContatoAggregateArgs>): Prisma.PrismaPromise<GetContatoAggregateType<T>>

    /**
     * Group by Contato.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContatoGroupByArgs} args - Group by arguments.
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
      T extends ContatoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContatoGroupByArgs['orderBy'] }
        : { orderBy?: ContatoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ContatoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContatoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contato model
   */
  readonly fields: ContatoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contato.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContatoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Contato model
   */
  interface ContatoFieldRefs {
    readonly id: FieldRef<"Contato", 'String'>
    readonly userId: FieldRef<"Contato", 'String'>
    readonly local: FieldRef<"Contato", 'String'>
    readonly whatsapp: FieldRef<"Contato", 'String'>
    readonly facebook: FieldRef<"Contato", 'String'>
    readonly isPublic: FieldRef<"Contato", 'Boolean'>
    readonly createdAt: FieldRef<"Contato", 'DateTime'>
    readonly updatedAt: FieldRef<"Contato", 'DateTime'>
    readonly instagram: FieldRef<"Contato", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Contato findUnique
   */
  export type ContatoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contato
     */
    select?: ContatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contato
     */
    omit?: ContatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoInclude<ExtArgs> | null
    /**
     * Filter, which Contato to fetch.
     */
    where: ContatoWhereUniqueInput
  }

  /**
   * Contato findUniqueOrThrow
   */
  export type ContatoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contato
     */
    select?: ContatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contato
     */
    omit?: ContatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoInclude<ExtArgs> | null
    /**
     * Filter, which Contato to fetch.
     */
    where: ContatoWhereUniqueInput
  }

  /**
   * Contato findFirst
   */
  export type ContatoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contato
     */
    select?: ContatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contato
     */
    omit?: ContatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoInclude<ExtArgs> | null
    /**
     * Filter, which Contato to fetch.
     */
    where?: ContatoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contatoes to fetch.
     */
    orderBy?: ContatoOrderByWithRelationInput | ContatoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contatoes.
     */
    cursor?: ContatoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contatoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contatoes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contatoes.
     */
    distinct?: ContatoScalarFieldEnum | ContatoScalarFieldEnum[]
  }

  /**
   * Contato findFirstOrThrow
   */
  export type ContatoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contato
     */
    select?: ContatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contato
     */
    omit?: ContatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoInclude<ExtArgs> | null
    /**
     * Filter, which Contato to fetch.
     */
    where?: ContatoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contatoes to fetch.
     */
    orderBy?: ContatoOrderByWithRelationInput | ContatoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contatoes.
     */
    cursor?: ContatoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contatoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contatoes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contatoes.
     */
    distinct?: ContatoScalarFieldEnum | ContatoScalarFieldEnum[]
  }

  /**
   * Contato findMany
   */
  export type ContatoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contato
     */
    select?: ContatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contato
     */
    omit?: ContatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoInclude<ExtArgs> | null
    /**
     * Filter, which Contatoes to fetch.
     */
    where?: ContatoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contatoes to fetch.
     */
    orderBy?: ContatoOrderByWithRelationInput | ContatoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contatoes.
     */
    cursor?: ContatoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contatoes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contatoes.
     */
    skip?: number
    distinct?: ContatoScalarFieldEnum | ContatoScalarFieldEnum[]
  }

  /**
   * Contato create
   */
  export type ContatoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contato
     */
    select?: ContatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contato
     */
    omit?: ContatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoInclude<ExtArgs> | null
    /**
     * The data needed to create a Contato.
     */
    data: XOR<ContatoCreateInput, ContatoUncheckedCreateInput>
  }

  /**
   * Contato createMany
   */
  export type ContatoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contatoes.
     */
    data: ContatoCreateManyInput | ContatoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contato createManyAndReturn
   */
  export type ContatoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contato
     */
    select?: ContatoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contato
     */
    omit?: ContatoOmit<ExtArgs> | null
    /**
     * The data used to create many Contatoes.
     */
    data: ContatoCreateManyInput | ContatoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Contato update
   */
  export type ContatoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contato
     */
    select?: ContatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contato
     */
    omit?: ContatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoInclude<ExtArgs> | null
    /**
     * The data needed to update a Contato.
     */
    data: XOR<ContatoUpdateInput, ContatoUncheckedUpdateInput>
    /**
     * Choose, which Contato to update.
     */
    where: ContatoWhereUniqueInput
  }

  /**
   * Contato updateMany
   */
  export type ContatoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contatoes.
     */
    data: XOR<ContatoUpdateManyMutationInput, ContatoUncheckedUpdateManyInput>
    /**
     * Filter which Contatoes to update
     */
    where?: ContatoWhereInput
    /**
     * Limit how many Contatoes to update.
     */
    limit?: number
  }

  /**
   * Contato updateManyAndReturn
   */
  export type ContatoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contato
     */
    select?: ContatoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contato
     */
    omit?: ContatoOmit<ExtArgs> | null
    /**
     * The data used to update Contatoes.
     */
    data: XOR<ContatoUpdateManyMutationInput, ContatoUncheckedUpdateManyInput>
    /**
     * Filter which Contatoes to update
     */
    where?: ContatoWhereInput
    /**
     * Limit how many Contatoes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Contato upsert
   */
  export type ContatoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contato
     */
    select?: ContatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contato
     */
    omit?: ContatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoInclude<ExtArgs> | null
    /**
     * The filter to search for the Contato to update in case it exists.
     */
    where: ContatoWhereUniqueInput
    /**
     * In case the Contato found by the `where` argument doesn't exist, create a new Contato with this data.
     */
    create: XOR<ContatoCreateInput, ContatoUncheckedCreateInput>
    /**
     * In case the Contato was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContatoUpdateInput, ContatoUncheckedUpdateInput>
  }

  /**
   * Contato delete
   */
  export type ContatoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contato
     */
    select?: ContatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contato
     */
    omit?: ContatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoInclude<ExtArgs> | null
    /**
     * Filter which Contato to delete.
     */
    where: ContatoWhereUniqueInput
  }

  /**
   * Contato deleteMany
   */
  export type ContatoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contatoes to delete
     */
    where?: ContatoWhereInput
    /**
     * Limit how many Contatoes to delete.
     */
    limit?: number
  }

  /**
   * Contato without action
   */
  export type ContatoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contato
     */
    select?: ContatoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contato
     */
    omit?: ContatoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContatoInclude<ExtArgs> | null
  }


  /**
   * Model Sobre
   */

  export type AggregateSobre = {
    _count: SobreCountAggregateOutputType | null
    _min: SobreMinAggregateOutputType | null
    _max: SobreMaxAggregateOutputType | null
  }

  export type SobreMinAggregateOutputType = {
    id: string | null
    userId: string | null
    coverUrl: string | null
    content: string | null
    title: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isPublic: boolean | null
  }

  export type SobreMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    coverUrl: string | null
    content: string | null
    title: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isPublic: boolean | null
  }

  export type SobreCountAggregateOutputType = {
    id: number
    userId: number
    coverUrl: number
    content: number
    title: number
    createdAt: number
    updatedAt: number
    isPublic: number
    _all: number
  }


  export type SobreMinAggregateInputType = {
    id?: true
    userId?: true
    coverUrl?: true
    content?: true
    title?: true
    createdAt?: true
    updatedAt?: true
    isPublic?: true
  }

  export type SobreMaxAggregateInputType = {
    id?: true
    userId?: true
    coverUrl?: true
    content?: true
    title?: true
    createdAt?: true
    updatedAt?: true
    isPublic?: true
  }

  export type SobreCountAggregateInputType = {
    id?: true
    userId?: true
    coverUrl?: true
    content?: true
    title?: true
    createdAt?: true
    updatedAt?: true
    isPublic?: true
    _all?: true
  }

  export type SobreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sobre to aggregate.
     */
    where?: SobreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sobres to fetch.
     */
    orderBy?: SobreOrderByWithRelationInput | SobreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SobreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sobres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sobres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sobres
    **/
    _count?: true | SobreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SobreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SobreMaxAggregateInputType
  }

  export type GetSobreAggregateType<T extends SobreAggregateArgs> = {
        [P in keyof T & keyof AggregateSobre]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSobre[P]>
      : GetScalarType<T[P], AggregateSobre[P]>
  }




  export type SobreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SobreWhereInput
    orderBy?: SobreOrderByWithAggregationInput | SobreOrderByWithAggregationInput[]
    by: SobreScalarFieldEnum[] | SobreScalarFieldEnum
    having?: SobreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SobreCountAggregateInputType | true
    _min?: SobreMinAggregateInputType
    _max?: SobreMaxAggregateInputType
  }

  export type SobreGroupByOutputType = {
    id: string
    userId: string
    coverUrl: string
    content: string
    title: string
    createdAt: Date
    updatedAt: Date
    isPublic: boolean
    _count: SobreCountAggregateOutputType | null
    _min: SobreMinAggregateOutputType | null
    _max: SobreMaxAggregateOutputType | null
  }

  type GetSobreGroupByPayload<T extends SobreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SobreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SobreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SobreGroupByOutputType[P]>
            : GetScalarType<T[P], SobreGroupByOutputType[P]>
        }
      >
    >


  export type SobreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    coverUrl?: boolean
    content?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isPublic?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sobre"]>

  export type SobreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    coverUrl?: boolean
    content?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isPublic?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sobre"]>

  export type SobreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    coverUrl?: boolean
    content?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isPublic?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sobre"]>

  export type SobreSelectScalar = {
    id?: boolean
    userId?: boolean
    coverUrl?: boolean
    content?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isPublic?: boolean
  }

  export type SobreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "coverUrl" | "content" | "title" | "createdAt" | "updatedAt" | "isPublic", ExtArgs["result"]["sobre"]>
  export type SobreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SobreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SobreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SobrePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sobre"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      coverUrl: string
      content: string
      title: string
      createdAt: Date
      updatedAt: Date
      isPublic: boolean
    }, ExtArgs["result"]["sobre"]>
    composites: {}
  }

  type SobreGetPayload<S extends boolean | null | undefined | SobreDefaultArgs> = $Result.GetResult<Prisma.$SobrePayload, S>

  type SobreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SobreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SobreCountAggregateInputType | true
    }

  export interface SobreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sobre'], meta: { name: 'Sobre' } }
    /**
     * Find zero or one Sobre that matches the filter.
     * @param {SobreFindUniqueArgs} args - Arguments to find a Sobre
     * @example
     * // Get one Sobre
     * const sobre = await prisma.sobre.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SobreFindUniqueArgs>(args: SelectSubset<T, SobreFindUniqueArgs<ExtArgs>>): Prisma__SobreClient<$Result.GetResult<Prisma.$SobrePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sobre that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SobreFindUniqueOrThrowArgs} args - Arguments to find a Sobre
     * @example
     * // Get one Sobre
     * const sobre = await prisma.sobre.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SobreFindUniqueOrThrowArgs>(args: SelectSubset<T, SobreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SobreClient<$Result.GetResult<Prisma.$SobrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sobre that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SobreFindFirstArgs} args - Arguments to find a Sobre
     * @example
     * // Get one Sobre
     * const sobre = await prisma.sobre.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SobreFindFirstArgs>(args?: SelectSubset<T, SobreFindFirstArgs<ExtArgs>>): Prisma__SobreClient<$Result.GetResult<Prisma.$SobrePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sobre that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SobreFindFirstOrThrowArgs} args - Arguments to find a Sobre
     * @example
     * // Get one Sobre
     * const sobre = await prisma.sobre.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SobreFindFirstOrThrowArgs>(args?: SelectSubset<T, SobreFindFirstOrThrowArgs<ExtArgs>>): Prisma__SobreClient<$Result.GetResult<Prisma.$SobrePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sobres that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SobreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sobres
     * const sobres = await prisma.sobre.findMany()
     * 
     * // Get first 10 Sobres
     * const sobres = await prisma.sobre.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sobreWithIdOnly = await prisma.sobre.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SobreFindManyArgs>(args?: SelectSubset<T, SobreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SobrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sobre.
     * @param {SobreCreateArgs} args - Arguments to create a Sobre.
     * @example
     * // Create one Sobre
     * const Sobre = await prisma.sobre.create({
     *   data: {
     *     // ... data to create a Sobre
     *   }
     * })
     * 
     */
    create<T extends SobreCreateArgs>(args: SelectSubset<T, SobreCreateArgs<ExtArgs>>): Prisma__SobreClient<$Result.GetResult<Prisma.$SobrePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sobres.
     * @param {SobreCreateManyArgs} args - Arguments to create many Sobres.
     * @example
     * // Create many Sobres
     * const sobre = await prisma.sobre.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SobreCreateManyArgs>(args?: SelectSubset<T, SobreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sobres and returns the data saved in the database.
     * @param {SobreCreateManyAndReturnArgs} args - Arguments to create many Sobres.
     * @example
     * // Create many Sobres
     * const sobre = await prisma.sobre.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sobres and only return the `id`
     * const sobreWithIdOnly = await prisma.sobre.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SobreCreateManyAndReturnArgs>(args?: SelectSubset<T, SobreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SobrePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sobre.
     * @param {SobreDeleteArgs} args - Arguments to delete one Sobre.
     * @example
     * // Delete one Sobre
     * const Sobre = await prisma.sobre.delete({
     *   where: {
     *     // ... filter to delete one Sobre
     *   }
     * })
     * 
     */
    delete<T extends SobreDeleteArgs>(args: SelectSubset<T, SobreDeleteArgs<ExtArgs>>): Prisma__SobreClient<$Result.GetResult<Prisma.$SobrePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sobre.
     * @param {SobreUpdateArgs} args - Arguments to update one Sobre.
     * @example
     * // Update one Sobre
     * const sobre = await prisma.sobre.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SobreUpdateArgs>(args: SelectSubset<T, SobreUpdateArgs<ExtArgs>>): Prisma__SobreClient<$Result.GetResult<Prisma.$SobrePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sobres.
     * @param {SobreDeleteManyArgs} args - Arguments to filter Sobres to delete.
     * @example
     * // Delete a few Sobres
     * const { count } = await prisma.sobre.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SobreDeleteManyArgs>(args?: SelectSubset<T, SobreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sobres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SobreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sobres
     * const sobre = await prisma.sobre.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SobreUpdateManyArgs>(args: SelectSubset<T, SobreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sobres and returns the data updated in the database.
     * @param {SobreUpdateManyAndReturnArgs} args - Arguments to update many Sobres.
     * @example
     * // Update many Sobres
     * const sobre = await prisma.sobre.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sobres and only return the `id`
     * const sobreWithIdOnly = await prisma.sobre.updateManyAndReturn({
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
    updateManyAndReturn<T extends SobreUpdateManyAndReturnArgs>(args: SelectSubset<T, SobreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SobrePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sobre.
     * @param {SobreUpsertArgs} args - Arguments to update or create a Sobre.
     * @example
     * // Update or create a Sobre
     * const sobre = await prisma.sobre.upsert({
     *   create: {
     *     // ... data to create a Sobre
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sobre we want to update
     *   }
     * })
     */
    upsert<T extends SobreUpsertArgs>(args: SelectSubset<T, SobreUpsertArgs<ExtArgs>>): Prisma__SobreClient<$Result.GetResult<Prisma.$SobrePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sobres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SobreCountArgs} args - Arguments to filter Sobres to count.
     * @example
     * // Count the number of Sobres
     * const count = await prisma.sobre.count({
     *   where: {
     *     // ... the filter for the Sobres we want to count
     *   }
     * })
    **/
    count<T extends SobreCountArgs>(
      args?: Subset<T, SobreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SobreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sobre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SobreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SobreAggregateArgs>(args: Subset<T, SobreAggregateArgs>): Prisma.PrismaPromise<GetSobreAggregateType<T>>

    /**
     * Group by Sobre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SobreGroupByArgs} args - Group by arguments.
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
      T extends SobreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SobreGroupByArgs['orderBy'] }
        : { orderBy?: SobreGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SobreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSobreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sobre model
   */
  readonly fields: SobreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sobre.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SobreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Sobre model
   */
  interface SobreFieldRefs {
    readonly id: FieldRef<"Sobre", 'String'>
    readonly userId: FieldRef<"Sobre", 'String'>
    readonly coverUrl: FieldRef<"Sobre", 'String'>
    readonly content: FieldRef<"Sobre", 'String'>
    readonly title: FieldRef<"Sobre", 'String'>
    readonly createdAt: FieldRef<"Sobre", 'DateTime'>
    readonly updatedAt: FieldRef<"Sobre", 'DateTime'>
    readonly isPublic: FieldRef<"Sobre", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Sobre findUnique
   */
  export type SobreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sobre
     */
    select?: SobreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sobre
     */
    omit?: SobreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreInclude<ExtArgs> | null
    /**
     * Filter, which Sobre to fetch.
     */
    where: SobreWhereUniqueInput
  }

  /**
   * Sobre findUniqueOrThrow
   */
  export type SobreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sobre
     */
    select?: SobreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sobre
     */
    omit?: SobreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreInclude<ExtArgs> | null
    /**
     * Filter, which Sobre to fetch.
     */
    where: SobreWhereUniqueInput
  }

  /**
   * Sobre findFirst
   */
  export type SobreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sobre
     */
    select?: SobreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sobre
     */
    omit?: SobreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreInclude<ExtArgs> | null
    /**
     * Filter, which Sobre to fetch.
     */
    where?: SobreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sobres to fetch.
     */
    orderBy?: SobreOrderByWithRelationInput | SobreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sobres.
     */
    cursor?: SobreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sobres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sobres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sobres.
     */
    distinct?: SobreScalarFieldEnum | SobreScalarFieldEnum[]
  }

  /**
   * Sobre findFirstOrThrow
   */
  export type SobreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sobre
     */
    select?: SobreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sobre
     */
    omit?: SobreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreInclude<ExtArgs> | null
    /**
     * Filter, which Sobre to fetch.
     */
    where?: SobreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sobres to fetch.
     */
    orderBy?: SobreOrderByWithRelationInput | SobreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sobres.
     */
    cursor?: SobreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sobres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sobres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sobres.
     */
    distinct?: SobreScalarFieldEnum | SobreScalarFieldEnum[]
  }

  /**
   * Sobre findMany
   */
  export type SobreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sobre
     */
    select?: SobreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sobre
     */
    omit?: SobreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreInclude<ExtArgs> | null
    /**
     * Filter, which Sobres to fetch.
     */
    where?: SobreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sobres to fetch.
     */
    orderBy?: SobreOrderByWithRelationInput | SobreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sobres.
     */
    cursor?: SobreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sobres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sobres.
     */
    skip?: number
    distinct?: SobreScalarFieldEnum | SobreScalarFieldEnum[]
  }

  /**
   * Sobre create
   */
  export type SobreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sobre
     */
    select?: SobreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sobre
     */
    omit?: SobreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreInclude<ExtArgs> | null
    /**
     * The data needed to create a Sobre.
     */
    data: XOR<SobreCreateInput, SobreUncheckedCreateInput>
  }

  /**
   * Sobre createMany
   */
  export type SobreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sobres.
     */
    data: SobreCreateManyInput | SobreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sobre createManyAndReturn
   */
  export type SobreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sobre
     */
    select?: SobreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sobre
     */
    omit?: SobreOmit<ExtArgs> | null
    /**
     * The data used to create many Sobres.
     */
    data: SobreCreateManyInput | SobreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sobre update
   */
  export type SobreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sobre
     */
    select?: SobreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sobre
     */
    omit?: SobreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreInclude<ExtArgs> | null
    /**
     * The data needed to update a Sobre.
     */
    data: XOR<SobreUpdateInput, SobreUncheckedUpdateInput>
    /**
     * Choose, which Sobre to update.
     */
    where: SobreWhereUniqueInput
  }

  /**
   * Sobre updateMany
   */
  export type SobreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sobres.
     */
    data: XOR<SobreUpdateManyMutationInput, SobreUncheckedUpdateManyInput>
    /**
     * Filter which Sobres to update
     */
    where?: SobreWhereInput
    /**
     * Limit how many Sobres to update.
     */
    limit?: number
  }

  /**
   * Sobre updateManyAndReturn
   */
  export type SobreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sobre
     */
    select?: SobreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sobre
     */
    omit?: SobreOmit<ExtArgs> | null
    /**
     * The data used to update Sobres.
     */
    data: XOR<SobreUpdateManyMutationInput, SobreUncheckedUpdateManyInput>
    /**
     * Filter which Sobres to update
     */
    where?: SobreWhereInput
    /**
     * Limit how many Sobres to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Sobre upsert
   */
  export type SobreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sobre
     */
    select?: SobreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sobre
     */
    omit?: SobreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreInclude<ExtArgs> | null
    /**
     * The filter to search for the Sobre to update in case it exists.
     */
    where: SobreWhereUniqueInput
    /**
     * In case the Sobre found by the `where` argument doesn't exist, create a new Sobre with this data.
     */
    create: XOR<SobreCreateInput, SobreUncheckedCreateInput>
    /**
     * In case the Sobre was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SobreUpdateInput, SobreUncheckedUpdateInput>
  }

  /**
   * Sobre delete
   */
  export type SobreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sobre
     */
    select?: SobreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sobre
     */
    omit?: SobreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreInclude<ExtArgs> | null
    /**
     * Filter which Sobre to delete.
     */
    where: SobreWhereUniqueInput
  }

  /**
   * Sobre deleteMany
   */
  export type SobreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sobres to delete
     */
    where?: SobreWhereInput
    /**
     * Limit how many Sobres to delete.
     */
    limit?: number
  }

  /**
   * Sobre without action
   */
  export type SobreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sobre
     */
    select?: SobreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sobre
     */
    omit?: SobreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreInclude<ExtArgs> | null
  }


  /**
   * Model SobreLider
   */

  export type AggregateSobreLider = {
    _count: SobreLiderCountAggregateOutputType | null
    _min: SobreLiderMinAggregateOutputType | null
    _max: SobreLiderMaxAggregateOutputType | null
  }

  export type SobreLiderMinAggregateOutputType = {
    id: string | null
    userId: string | null
    coverUrl: string | null
    name: string | null
    title: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isPublic: boolean | null
  }

  export type SobreLiderMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    coverUrl: string | null
    name: string | null
    title: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isPublic: boolean | null
  }

  export type SobreLiderCountAggregateOutputType = {
    id: number
    userId: number
    coverUrl: number
    name: number
    title: number
    createdAt: number
    updatedAt: number
    isPublic: number
    _all: number
  }


  export type SobreLiderMinAggregateInputType = {
    id?: true
    userId?: true
    coverUrl?: true
    name?: true
    title?: true
    createdAt?: true
    updatedAt?: true
    isPublic?: true
  }

  export type SobreLiderMaxAggregateInputType = {
    id?: true
    userId?: true
    coverUrl?: true
    name?: true
    title?: true
    createdAt?: true
    updatedAt?: true
    isPublic?: true
  }

  export type SobreLiderCountAggregateInputType = {
    id?: true
    userId?: true
    coverUrl?: true
    name?: true
    title?: true
    createdAt?: true
    updatedAt?: true
    isPublic?: true
    _all?: true
  }

  export type SobreLiderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SobreLider to aggregate.
     */
    where?: SobreLiderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SobreLiders to fetch.
     */
    orderBy?: SobreLiderOrderByWithRelationInput | SobreLiderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SobreLiderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SobreLiders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SobreLiders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SobreLiders
    **/
    _count?: true | SobreLiderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SobreLiderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SobreLiderMaxAggregateInputType
  }

  export type GetSobreLiderAggregateType<T extends SobreLiderAggregateArgs> = {
        [P in keyof T & keyof AggregateSobreLider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSobreLider[P]>
      : GetScalarType<T[P], AggregateSobreLider[P]>
  }




  export type SobreLiderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SobreLiderWhereInput
    orderBy?: SobreLiderOrderByWithAggregationInput | SobreLiderOrderByWithAggregationInput[]
    by: SobreLiderScalarFieldEnum[] | SobreLiderScalarFieldEnum
    having?: SobreLiderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SobreLiderCountAggregateInputType | true
    _min?: SobreLiderMinAggregateInputType
    _max?: SobreLiderMaxAggregateInputType
  }

  export type SobreLiderGroupByOutputType = {
    id: string
    userId: string
    coverUrl: string
    name: string
    title: string
    createdAt: Date
    updatedAt: Date
    isPublic: boolean
    _count: SobreLiderCountAggregateOutputType | null
    _min: SobreLiderMinAggregateOutputType | null
    _max: SobreLiderMaxAggregateOutputType | null
  }

  type GetSobreLiderGroupByPayload<T extends SobreLiderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SobreLiderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SobreLiderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SobreLiderGroupByOutputType[P]>
            : GetScalarType<T[P], SobreLiderGroupByOutputType[P]>
        }
      >
    >


  export type SobreLiderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    coverUrl?: boolean
    name?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isPublic?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sobreLider"]>

  export type SobreLiderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    coverUrl?: boolean
    name?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isPublic?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sobreLider"]>

  export type SobreLiderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    coverUrl?: boolean
    name?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isPublic?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sobreLider"]>

  export type SobreLiderSelectScalar = {
    id?: boolean
    userId?: boolean
    coverUrl?: boolean
    name?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isPublic?: boolean
  }

  export type SobreLiderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "coverUrl" | "name" | "title" | "createdAt" | "updatedAt" | "isPublic", ExtArgs["result"]["sobreLider"]>
  export type SobreLiderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SobreLiderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SobreLiderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SobreLiderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SobreLider"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      coverUrl: string
      name: string
      title: string
      createdAt: Date
      updatedAt: Date
      isPublic: boolean
    }, ExtArgs["result"]["sobreLider"]>
    composites: {}
  }

  type SobreLiderGetPayload<S extends boolean | null | undefined | SobreLiderDefaultArgs> = $Result.GetResult<Prisma.$SobreLiderPayload, S>

  type SobreLiderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SobreLiderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SobreLiderCountAggregateInputType | true
    }

  export interface SobreLiderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SobreLider'], meta: { name: 'SobreLider' } }
    /**
     * Find zero or one SobreLider that matches the filter.
     * @param {SobreLiderFindUniqueArgs} args - Arguments to find a SobreLider
     * @example
     * // Get one SobreLider
     * const sobreLider = await prisma.sobreLider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SobreLiderFindUniqueArgs>(args: SelectSubset<T, SobreLiderFindUniqueArgs<ExtArgs>>): Prisma__SobreLiderClient<$Result.GetResult<Prisma.$SobreLiderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SobreLider that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SobreLiderFindUniqueOrThrowArgs} args - Arguments to find a SobreLider
     * @example
     * // Get one SobreLider
     * const sobreLider = await prisma.sobreLider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SobreLiderFindUniqueOrThrowArgs>(args: SelectSubset<T, SobreLiderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SobreLiderClient<$Result.GetResult<Prisma.$SobreLiderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SobreLider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SobreLiderFindFirstArgs} args - Arguments to find a SobreLider
     * @example
     * // Get one SobreLider
     * const sobreLider = await prisma.sobreLider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SobreLiderFindFirstArgs>(args?: SelectSubset<T, SobreLiderFindFirstArgs<ExtArgs>>): Prisma__SobreLiderClient<$Result.GetResult<Prisma.$SobreLiderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SobreLider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SobreLiderFindFirstOrThrowArgs} args - Arguments to find a SobreLider
     * @example
     * // Get one SobreLider
     * const sobreLider = await prisma.sobreLider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SobreLiderFindFirstOrThrowArgs>(args?: SelectSubset<T, SobreLiderFindFirstOrThrowArgs<ExtArgs>>): Prisma__SobreLiderClient<$Result.GetResult<Prisma.$SobreLiderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SobreLiders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SobreLiderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SobreLiders
     * const sobreLiders = await prisma.sobreLider.findMany()
     * 
     * // Get first 10 SobreLiders
     * const sobreLiders = await prisma.sobreLider.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sobreLiderWithIdOnly = await prisma.sobreLider.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SobreLiderFindManyArgs>(args?: SelectSubset<T, SobreLiderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SobreLiderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SobreLider.
     * @param {SobreLiderCreateArgs} args - Arguments to create a SobreLider.
     * @example
     * // Create one SobreLider
     * const SobreLider = await prisma.sobreLider.create({
     *   data: {
     *     // ... data to create a SobreLider
     *   }
     * })
     * 
     */
    create<T extends SobreLiderCreateArgs>(args: SelectSubset<T, SobreLiderCreateArgs<ExtArgs>>): Prisma__SobreLiderClient<$Result.GetResult<Prisma.$SobreLiderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SobreLiders.
     * @param {SobreLiderCreateManyArgs} args - Arguments to create many SobreLiders.
     * @example
     * // Create many SobreLiders
     * const sobreLider = await prisma.sobreLider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SobreLiderCreateManyArgs>(args?: SelectSubset<T, SobreLiderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SobreLiders and returns the data saved in the database.
     * @param {SobreLiderCreateManyAndReturnArgs} args - Arguments to create many SobreLiders.
     * @example
     * // Create many SobreLiders
     * const sobreLider = await prisma.sobreLider.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SobreLiders and only return the `id`
     * const sobreLiderWithIdOnly = await prisma.sobreLider.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SobreLiderCreateManyAndReturnArgs>(args?: SelectSubset<T, SobreLiderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SobreLiderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SobreLider.
     * @param {SobreLiderDeleteArgs} args - Arguments to delete one SobreLider.
     * @example
     * // Delete one SobreLider
     * const SobreLider = await prisma.sobreLider.delete({
     *   where: {
     *     // ... filter to delete one SobreLider
     *   }
     * })
     * 
     */
    delete<T extends SobreLiderDeleteArgs>(args: SelectSubset<T, SobreLiderDeleteArgs<ExtArgs>>): Prisma__SobreLiderClient<$Result.GetResult<Prisma.$SobreLiderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SobreLider.
     * @param {SobreLiderUpdateArgs} args - Arguments to update one SobreLider.
     * @example
     * // Update one SobreLider
     * const sobreLider = await prisma.sobreLider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SobreLiderUpdateArgs>(args: SelectSubset<T, SobreLiderUpdateArgs<ExtArgs>>): Prisma__SobreLiderClient<$Result.GetResult<Prisma.$SobreLiderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SobreLiders.
     * @param {SobreLiderDeleteManyArgs} args - Arguments to filter SobreLiders to delete.
     * @example
     * // Delete a few SobreLiders
     * const { count } = await prisma.sobreLider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SobreLiderDeleteManyArgs>(args?: SelectSubset<T, SobreLiderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SobreLiders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SobreLiderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SobreLiders
     * const sobreLider = await prisma.sobreLider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SobreLiderUpdateManyArgs>(args: SelectSubset<T, SobreLiderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SobreLiders and returns the data updated in the database.
     * @param {SobreLiderUpdateManyAndReturnArgs} args - Arguments to update many SobreLiders.
     * @example
     * // Update many SobreLiders
     * const sobreLider = await prisma.sobreLider.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SobreLiders and only return the `id`
     * const sobreLiderWithIdOnly = await prisma.sobreLider.updateManyAndReturn({
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
    updateManyAndReturn<T extends SobreLiderUpdateManyAndReturnArgs>(args: SelectSubset<T, SobreLiderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SobreLiderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SobreLider.
     * @param {SobreLiderUpsertArgs} args - Arguments to update or create a SobreLider.
     * @example
     * // Update or create a SobreLider
     * const sobreLider = await prisma.sobreLider.upsert({
     *   create: {
     *     // ... data to create a SobreLider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SobreLider we want to update
     *   }
     * })
     */
    upsert<T extends SobreLiderUpsertArgs>(args: SelectSubset<T, SobreLiderUpsertArgs<ExtArgs>>): Prisma__SobreLiderClient<$Result.GetResult<Prisma.$SobreLiderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SobreLiders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SobreLiderCountArgs} args - Arguments to filter SobreLiders to count.
     * @example
     * // Count the number of SobreLiders
     * const count = await prisma.sobreLider.count({
     *   where: {
     *     // ... the filter for the SobreLiders we want to count
     *   }
     * })
    **/
    count<T extends SobreLiderCountArgs>(
      args?: Subset<T, SobreLiderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SobreLiderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SobreLider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SobreLiderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SobreLiderAggregateArgs>(args: Subset<T, SobreLiderAggregateArgs>): Prisma.PrismaPromise<GetSobreLiderAggregateType<T>>

    /**
     * Group by SobreLider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SobreLiderGroupByArgs} args - Group by arguments.
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
      T extends SobreLiderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SobreLiderGroupByArgs['orderBy'] }
        : { orderBy?: SobreLiderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SobreLiderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSobreLiderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SobreLider model
   */
  readonly fields: SobreLiderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SobreLider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SobreLiderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the SobreLider model
   */
  interface SobreLiderFieldRefs {
    readonly id: FieldRef<"SobreLider", 'String'>
    readonly userId: FieldRef<"SobreLider", 'String'>
    readonly coverUrl: FieldRef<"SobreLider", 'String'>
    readonly name: FieldRef<"SobreLider", 'String'>
    readonly title: FieldRef<"SobreLider", 'String'>
    readonly createdAt: FieldRef<"SobreLider", 'DateTime'>
    readonly updatedAt: FieldRef<"SobreLider", 'DateTime'>
    readonly isPublic: FieldRef<"SobreLider", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * SobreLider findUnique
   */
  export type SobreLiderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SobreLider
     */
    select?: SobreLiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SobreLider
     */
    omit?: SobreLiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreLiderInclude<ExtArgs> | null
    /**
     * Filter, which SobreLider to fetch.
     */
    where: SobreLiderWhereUniqueInput
  }

  /**
   * SobreLider findUniqueOrThrow
   */
  export type SobreLiderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SobreLider
     */
    select?: SobreLiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SobreLider
     */
    omit?: SobreLiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreLiderInclude<ExtArgs> | null
    /**
     * Filter, which SobreLider to fetch.
     */
    where: SobreLiderWhereUniqueInput
  }

  /**
   * SobreLider findFirst
   */
  export type SobreLiderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SobreLider
     */
    select?: SobreLiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SobreLider
     */
    omit?: SobreLiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreLiderInclude<ExtArgs> | null
    /**
     * Filter, which SobreLider to fetch.
     */
    where?: SobreLiderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SobreLiders to fetch.
     */
    orderBy?: SobreLiderOrderByWithRelationInput | SobreLiderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SobreLiders.
     */
    cursor?: SobreLiderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SobreLiders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SobreLiders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SobreLiders.
     */
    distinct?: SobreLiderScalarFieldEnum | SobreLiderScalarFieldEnum[]
  }

  /**
   * SobreLider findFirstOrThrow
   */
  export type SobreLiderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SobreLider
     */
    select?: SobreLiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SobreLider
     */
    omit?: SobreLiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreLiderInclude<ExtArgs> | null
    /**
     * Filter, which SobreLider to fetch.
     */
    where?: SobreLiderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SobreLiders to fetch.
     */
    orderBy?: SobreLiderOrderByWithRelationInput | SobreLiderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SobreLiders.
     */
    cursor?: SobreLiderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SobreLiders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SobreLiders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SobreLiders.
     */
    distinct?: SobreLiderScalarFieldEnum | SobreLiderScalarFieldEnum[]
  }

  /**
   * SobreLider findMany
   */
  export type SobreLiderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SobreLider
     */
    select?: SobreLiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SobreLider
     */
    omit?: SobreLiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreLiderInclude<ExtArgs> | null
    /**
     * Filter, which SobreLiders to fetch.
     */
    where?: SobreLiderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SobreLiders to fetch.
     */
    orderBy?: SobreLiderOrderByWithRelationInput | SobreLiderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SobreLiders.
     */
    cursor?: SobreLiderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SobreLiders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SobreLiders.
     */
    skip?: number
    distinct?: SobreLiderScalarFieldEnum | SobreLiderScalarFieldEnum[]
  }

  /**
   * SobreLider create
   */
  export type SobreLiderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SobreLider
     */
    select?: SobreLiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SobreLider
     */
    omit?: SobreLiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreLiderInclude<ExtArgs> | null
    /**
     * The data needed to create a SobreLider.
     */
    data: XOR<SobreLiderCreateInput, SobreLiderUncheckedCreateInput>
  }

  /**
   * SobreLider createMany
   */
  export type SobreLiderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SobreLiders.
     */
    data: SobreLiderCreateManyInput | SobreLiderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SobreLider createManyAndReturn
   */
  export type SobreLiderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SobreLider
     */
    select?: SobreLiderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SobreLider
     */
    omit?: SobreLiderOmit<ExtArgs> | null
    /**
     * The data used to create many SobreLiders.
     */
    data: SobreLiderCreateManyInput | SobreLiderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreLiderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SobreLider update
   */
  export type SobreLiderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SobreLider
     */
    select?: SobreLiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SobreLider
     */
    omit?: SobreLiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreLiderInclude<ExtArgs> | null
    /**
     * The data needed to update a SobreLider.
     */
    data: XOR<SobreLiderUpdateInput, SobreLiderUncheckedUpdateInput>
    /**
     * Choose, which SobreLider to update.
     */
    where: SobreLiderWhereUniqueInput
  }

  /**
   * SobreLider updateMany
   */
  export type SobreLiderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SobreLiders.
     */
    data: XOR<SobreLiderUpdateManyMutationInput, SobreLiderUncheckedUpdateManyInput>
    /**
     * Filter which SobreLiders to update
     */
    where?: SobreLiderWhereInput
    /**
     * Limit how many SobreLiders to update.
     */
    limit?: number
  }

  /**
   * SobreLider updateManyAndReturn
   */
  export type SobreLiderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SobreLider
     */
    select?: SobreLiderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SobreLider
     */
    omit?: SobreLiderOmit<ExtArgs> | null
    /**
     * The data used to update SobreLiders.
     */
    data: XOR<SobreLiderUpdateManyMutationInput, SobreLiderUncheckedUpdateManyInput>
    /**
     * Filter which SobreLiders to update
     */
    where?: SobreLiderWhereInput
    /**
     * Limit how many SobreLiders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreLiderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SobreLider upsert
   */
  export type SobreLiderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SobreLider
     */
    select?: SobreLiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SobreLider
     */
    omit?: SobreLiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreLiderInclude<ExtArgs> | null
    /**
     * The filter to search for the SobreLider to update in case it exists.
     */
    where: SobreLiderWhereUniqueInput
    /**
     * In case the SobreLider found by the `where` argument doesn't exist, create a new SobreLider with this data.
     */
    create: XOR<SobreLiderCreateInput, SobreLiderUncheckedCreateInput>
    /**
     * In case the SobreLider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SobreLiderUpdateInput, SobreLiderUncheckedUpdateInput>
  }

  /**
   * SobreLider delete
   */
  export type SobreLiderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SobreLider
     */
    select?: SobreLiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SobreLider
     */
    omit?: SobreLiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreLiderInclude<ExtArgs> | null
    /**
     * Filter which SobreLider to delete.
     */
    where: SobreLiderWhereUniqueInput
  }

  /**
   * SobreLider deleteMany
   */
  export type SobreLiderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SobreLiders to delete
     */
    where?: SobreLiderWhereInput
    /**
     * Limit how many SobreLiders to delete.
     */
    limit?: number
  }

  /**
   * SobreLider without action
   */
  export type SobreLiderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SobreLider
     */
    select?: SobreLiderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SobreLider
     */
    omit?: SobreLiderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SobreLiderInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    token: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    token: string
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    token?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.updateManyAndReturn({
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
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
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
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly token: FieldRef<"RefreshToken", 'String'>
    readonly userId: FieldRef<"RefreshToken", 'String'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly updatedAt: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken updateManyAndReturn
   */
  export type RefreshTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model PasswordResetToken
   */

  export type AggregatePasswordResetToken = {
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  export type PasswordResetTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type PasswordResetTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type PasswordResetTokenCountAggregateOutputType = {
    id: number
    token: number
    userId: number
    createdAt: number
    expiresAt: number
    _all: number
  }


  export type PasswordResetTokenMinAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    createdAt?: true
    expiresAt?: true
  }

  export type PasswordResetTokenMaxAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    createdAt?: true
    expiresAt?: true
  }

  export type PasswordResetTokenCountAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    createdAt?: true
    expiresAt?: true
    _all?: true
  }

  export type PasswordResetTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetToken to aggregate.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PasswordResetTokens
    **/
    _count?: true | PasswordResetTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordResetTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type GetPasswordResetTokenAggregateType<T extends PasswordResetTokenAggregateArgs> = {
        [P in keyof T & keyof AggregatePasswordResetToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePasswordResetToken[P]>
      : GetScalarType<T[P], AggregatePasswordResetToken[P]>
  }




  export type PasswordResetTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PasswordResetTokenWhereInput
    orderBy?: PasswordResetTokenOrderByWithAggregationInput | PasswordResetTokenOrderByWithAggregationInput[]
    by: PasswordResetTokenScalarFieldEnum[] | PasswordResetTokenScalarFieldEnum
    having?: PasswordResetTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordResetTokenCountAggregateInputType | true
    _min?: PasswordResetTokenMinAggregateInputType
    _max?: PasswordResetTokenMaxAggregateInputType
  }

  export type PasswordResetTokenGroupByOutputType = {
    id: string
    token: string
    userId: string
    createdAt: Date
    expiresAt: Date
    _count: PasswordResetTokenCountAggregateOutputType | null
    _min: PasswordResetTokenMinAggregateOutputType | null
    _max: PasswordResetTokenMaxAggregateOutputType | null
  }

  type GetPasswordResetTokenGroupByPayload<T extends PasswordResetTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PasswordResetTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordResetTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordResetTokenGroupByOutputType[P]>
        }
      >
    >


  export type PasswordResetTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["passwordResetToken"]>

  export type PasswordResetTokenSelectScalar = {
    id?: boolean
    token?: boolean
    userId?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }

  export type PasswordResetTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "userId" | "createdAt" | "expiresAt", ExtArgs["result"]["passwordResetToken"]>
  export type PasswordResetTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PasswordResetTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PasswordResetTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PasswordResetToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      userId: string
      createdAt: Date
      expiresAt: Date
    }, ExtArgs["result"]["passwordResetToken"]>
    composites: {}
  }

  type PasswordResetTokenGetPayload<S extends boolean | null | undefined | PasswordResetTokenDefaultArgs> = $Result.GetResult<Prisma.$PasswordResetTokenPayload, S>

  type PasswordResetTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PasswordResetTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PasswordResetTokenCountAggregateInputType | true
    }

  export interface PasswordResetTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PasswordResetToken'], meta: { name: 'PasswordResetToken' } }
    /**
     * Find zero or one PasswordResetToken that matches the filter.
     * @param {PasswordResetTokenFindUniqueArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PasswordResetTokenFindUniqueArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PasswordResetToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PasswordResetTokenFindUniqueOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PasswordResetTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PasswordResetTokenFindFirstArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PasswordResetToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindFirstOrThrowArgs} args - Arguments to find a PasswordResetToken
     * @example
     * // Get one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PasswordResetTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PasswordResetTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany()
     * 
     * // Get first 10 PasswordResetTokens
     * const passwordResetTokens = await prisma.passwordResetToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PasswordResetTokenFindManyArgs>(args?: SelectSubset<T, PasswordResetTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PasswordResetToken.
     * @param {PasswordResetTokenCreateArgs} args - Arguments to create a PasswordResetToken.
     * @example
     * // Create one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.create({
     *   data: {
     *     // ... data to create a PasswordResetToken
     *   }
     * })
     * 
     */
    create<T extends PasswordResetTokenCreateArgs>(args: SelectSubset<T, PasswordResetTokenCreateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PasswordResetTokens.
     * @param {PasswordResetTokenCreateManyArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PasswordResetTokenCreateManyArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PasswordResetTokens and returns the data saved in the database.
     * @param {PasswordResetTokenCreateManyAndReturnArgs} args - Arguments to create many PasswordResetTokens.
     * @example
     * // Create many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PasswordResetTokens and only return the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PasswordResetTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PasswordResetToken.
     * @param {PasswordResetTokenDeleteArgs} args - Arguments to delete one PasswordResetToken.
     * @example
     * // Delete one PasswordResetToken
     * const PasswordResetToken = await prisma.passwordResetToken.delete({
     *   where: {
     *     // ... filter to delete one PasswordResetToken
     *   }
     * })
     * 
     */
    delete<T extends PasswordResetTokenDeleteArgs>(args: SelectSubset<T, PasswordResetTokenDeleteArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PasswordResetToken.
     * @param {PasswordResetTokenUpdateArgs} args - Arguments to update one PasswordResetToken.
     * @example
     * // Update one PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PasswordResetTokenUpdateArgs>(args: SelectSubset<T, PasswordResetTokenUpdateArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PasswordResetTokens.
     * @param {PasswordResetTokenDeleteManyArgs} args - Arguments to filter PasswordResetTokens to delete.
     * @example
     * // Delete a few PasswordResetTokens
     * const { count } = await prisma.passwordResetToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PasswordResetTokenDeleteManyArgs>(args?: SelectSubset<T, PasswordResetTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PasswordResetTokenUpdateManyArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PasswordResetTokens and returns the data updated in the database.
     * @param {PasswordResetTokenUpdateManyAndReturnArgs} args - Arguments to update many PasswordResetTokens.
     * @example
     * // Update many PasswordResetTokens
     * const passwordResetToken = await prisma.passwordResetToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PasswordResetTokens and only return the `id`
     * const passwordResetTokenWithIdOnly = await prisma.passwordResetToken.updateManyAndReturn({
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
    updateManyAndReturn<T extends PasswordResetTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PasswordResetToken.
     * @param {PasswordResetTokenUpsertArgs} args - Arguments to update or create a PasswordResetToken.
     * @example
     * // Update or create a PasswordResetToken
     * const passwordResetToken = await prisma.passwordResetToken.upsert({
     *   create: {
     *     // ... data to create a PasswordResetToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PasswordResetToken we want to update
     *   }
     * })
     */
    upsert<T extends PasswordResetTokenUpsertArgs>(args: SelectSubset<T, PasswordResetTokenUpsertArgs<ExtArgs>>): Prisma__PasswordResetTokenClient<$Result.GetResult<Prisma.$PasswordResetTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PasswordResetTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenCountArgs} args - Arguments to filter PasswordResetTokens to count.
     * @example
     * // Count the number of PasswordResetTokens
     * const count = await prisma.passwordResetToken.count({
     *   where: {
     *     // ... the filter for the PasswordResetTokens we want to count
     *   }
     * })
    **/
    count<T extends PasswordResetTokenCountArgs>(
      args?: Subset<T, PasswordResetTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordResetTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PasswordResetTokenAggregateArgs>(args: Subset<T, PasswordResetTokenAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetTokenAggregateType<T>>

    /**
     * Group by PasswordResetToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordResetTokenGroupByArgs} args - Group by arguments.
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
      T extends PasswordResetTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordResetTokenGroupByArgs['orderBy'] }
        : { orderBy?: PasswordResetTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PasswordResetTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PasswordResetToken model
   */
  readonly fields: PasswordResetTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PasswordResetToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PasswordResetTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PasswordResetToken model
   */
  interface PasswordResetTokenFieldRefs {
    readonly id: FieldRef<"PasswordResetToken", 'String'>
    readonly token: FieldRef<"PasswordResetToken", 'String'>
    readonly userId: FieldRef<"PasswordResetToken", 'String'>
    readonly createdAt: FieldRef<"PasswordResetToken", 'DateTime'>
    readonly expiresAt: FieldRef<"PasswordResetToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PasswordResetToken findUnique
   */
  export type PasswordResetTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findUniqueOrThrow
   */
  export type PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken findFirst
   */
  export type PasswordResetTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findFirstOrThrow
   */
  export type PasswordResetTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetToken to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PasswordResetTokens.
     */
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken findMany
   */
  export type PasswordResetTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter, which PasswordResetTokens to fetch.
     */
    where?: PasswordResetTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PasswordResetTokens to fetch.
     */
    orderBy?: PasswordResetTokenOrderByWithRelationInput | PasswordResetTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PasswordResetTokens.
     */
    cursor?: PasswordResetTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PasswordResetTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PasswordResetTokens.
     */
    skip?: number
    distinct?: PasswordResetTokenScalarFieldEnum | PasswordResetTokenScalarFieldEnum[]
  }

  /**
   * PasswordResetToken create
   */
  export type PasswordResetTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
  }

  /**
   * PasswordResetToken createMany
   */
  export type PasswordResetTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PasswordResetToken createManyAndReturn
   */
  export type PasswordResetTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data used to create many PasswordResetTokens.
     */
    data: PasswordResetTokenCreateManyInput | PasswordResetTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordResetToken update
   */
  export type PasswordResetTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a PasswordResetToken.
     */
    data: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
    /**
     * Choose, which PasswordResetToken to update.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken updateMany
   */
  export type PasswordResetTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
  }

  /**
   * PasswordResetToken updateManyAndReturn
   */
  export type PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * The data used to update PasswordResetTokens.
     */
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyInput>
    /**
     * Filter which PasswordResetTokens to update
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PasswordResetToken upsert
   */
  export type PasswordResetTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the PasswordResetToken to update in case it exists.
     */
    where: PasswordResetTokenWhereUniqueInput
    /**
     * In case the PasswordResetToken found by the `where` argument doesn't exist, create a new PasswordResetToken with this data.
     */
    create: XOR<PasswordResetTokenCreateInput, PasswordResetTokenUncheckedCreateInput>
    /**
     * In case the PasswordResetToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordResetTokenUpdateInput, PasswordResetTokenUncheckedUpdateInput>
  }

  /**
   * PasswordResetToken delete
   */
  export type PasswordResetTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
    /**
     * Filter which PasswordResetToken to delete.
     */
    where: PasswordResetTokenWhereUniqueInput
  }

  /**
   * PasswordResetToken deleteMany
   */
  export type PasswordResetTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PasswordResetTokens to delete
     */
    where?: PasswordResetTokenWhereInput
    /**
     * Limit how many PasswordResetTokens to delete.
     */
    limit?: number
  }

  /**
   * PasswordResetToken without action
   */
  export type PasswordResetTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PasswordResetToken
     */
    select?: PasswordResetTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PasswordResetToken
     */
    omit?: PasswordResetTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PasswordResetTokenInclude<ExtArgs> | null
  }


  /**
   * Model Testemunho
   */

  export type AggregateTestemunho = {
    _count: TestemunhoCountAggregateOutputType | null
    _min: TestemunhoMinAggregateOutputType | null
    _max: TestemunhoMaxAggregateOutputType | null
  }

  export type TestemunhoMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    avatarUrl: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isPublic: boolean | null
    coverUrl: string | null
    ministryRole: $Enums.MinistryRole | null
  }

  export type TestemunhoMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    avatarUrl: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    isPublic: boolean | null
    coverUrl: string | null
    ministryRole: $Enums.MinistryRole | null
  }

  export type TestemunhoCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    avatarUrl: number
    content: number
    createdAt: number
    updatedAt: number
    isPublic: number
    coverUrl: number
    ministryRole: number
    _all: number
  }


  export type TestemunhoMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    avatarUrl?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    isPublic?: true
    coverUrl?: true
    ministryRole?: true
  }

  export type TestemunhoMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    avatarUrl?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    isPublic?: true
    coverUrl?: true
    ministryRole?: true
  }

  export type TestemunhoCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    avatarUrl?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    isPublic?: true
    coverUrl?: true
    ministryRole?: true
    _all?: true
  }

  export type TestemunhoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Testemunho to aggregate.
     */
    where?: TestemunhoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testemunhos to fetch.
     */
    orderBy?: TestemunhoOrderByWithRelationInput | TestemunhoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestemunhoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testemunhos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testemunhos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Testemunhos
    **/
    _count?: true | TestemunhoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestemunhoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestemunhoMaxAggregateInputType
  }

  export type GetTestemunhoAggregateType<T extends TestemunhoAggregateArgs> = {
        [P in keyof T & keyof AggregateTestemunho]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestemunho[P]>
      : GetScalarType<T[P], AggregateTestemunho[P]>
  }




  export type TestemunhoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestemunhoWhereInput
    orderBy?: TestemunhoOrderByWithAggregationInput | TestemunhoOrderByWithAggregationInput[]
    by: TestemunhoScalarFieldEnum[] | TestemunhoScalarFieldEnum
    having?: TestemunhoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestemunhoCountAggregateInputType | true
    _min?: TestemunhoMinAggregateInputType
    _max?: TestemunhoMaxAggregateInputType
  }

  export type TestemunhoGroupByOutputType = {
    id: string
    userId: string
    name: string
    avatarUrl: string
    content: string
    createdAt: Date
    updatedAt: Date
    isPublic: boolean
    coverUrl: string | null
    ministryRole: $Enums.MinistryRole | null
    _count: TestemunhoCountAggregateOutputType | null
    _min: TestemunhoMinAggregateOutputType | null
    _max: TestemunhoMaxAggregateOutputType | null
  }

  type GetTestemunhoGroupByPayload<T extends TestemunhoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestemunhoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestemunhoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestemunhoGroupByOutputType[P]>
            : GetScalarType<T[P], TestemunhoGroupByOutputType[P]>
        }
      >
    >


  export type TestemunhoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    avatarUrl?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isPublic?: boolean
    coverUrl?: boolean
    ministryRole?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testemunho"]>

  export type TestemunhoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    avatarUrl?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isPublic?: boolean
    coverUrl?: boolean
    ministryRole?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testemunho"]>

  export type TestemunhoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    avatarUrl?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isPublic?: boolean
    coverUrl?: boolean
    ministryRole?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testemunho"]>

  export type TestemunhoSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    avatarUrl?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    isPublic?: boolean
    coverUrl?: boolean
    ministryRole?: boolean
  }

  export type TestemunhoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "avatarUrl" | "content" | "createdAt" | "updatedAt" | "isPublic" | "coverUrl" | "ministryRole", ExtArgs["result"]["testemunho"]>
  export type TestemunhoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TestemunhoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TestemunhoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TestemunhoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Testemunho"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      avatarUrl: string
      content: string
      createdAt: Date
      updatedAt: Date
      isPublic: boolean
      coverUrl: string | null
      ministryRole: $Enums.MinistryRole | null
    }, ExtArgs["result"]["testemunho"]>
    composites: {}
  }

  type TestemunhoGetPayload<S extends boolean | null | undefined | TestemunhoDefaultArgs> = $Result.GetResult<Prisma.$TestemunhoPayload, S>

  type TestemunhoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestemunhoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestemunhoCountAggregateInputType | true
    }

  export interface TestemunhoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Testemunho'], meta: { name: 'Testemunho' } }
    /**
     * Find zero or one Testemunho that matches the filter.
     * @param {TestemunhoFindUniqueArgs} args - Arguments to find a Testemunho
     * @example
     * // Get one Testemunho
     * const testemunho = await prisma.testemunho.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestemunhoFindUniqueArgs>(args: SelectSubset<T, TestemunhoFindUniqueArgs<ExtArgs>>): Prisma__TestemunhoClient<$Result.GetResult<Prisma.$TestemunhoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Testemunho that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestemunhoFindUniqueOrThrowArgs} args - Arguments to find a Testemunho
     * @example
     * // Get one Testemunho
     * const testemunho = await prisma.testemunho.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestemunhoFindUniqueOrThrowArgs>(args: SelectSubset<T, TestemunhoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestemunhoClient<$Result.GetResult<Prisma.$TestemunhoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Testemunho that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestemunhoFindFirstArgs} args - Arguments to find a Testemunho
     * @example
     * // Get one Testemunho
     * const testemunho = await prisma.testemunho.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestemunhoFindFirstArgs>(args?: SelectSubset<T, TestemunhoFindFirstArgs<ExtArgs>>): Prisma__TestemunhoClient<$Result.GetResult<Prisma.$TestemunhoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Testemunho that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestemunhoFindFirstOrThrowArgs} args - Arguments to find a Testemunho
     * @example
     * // Get one Testemunho
     * const testemunho = await prisma.testemunho.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestemunhoFindFirstOrThrowArgs>(args?: SelectSubset<T, TestemunhoFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestemunhoClient<$Result.GetResult<Prisma.$TestemunhoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Testemunhos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestemunhoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Testemunhos
     * const testemunhos = await prisma.testemunho.findMany()
     * 
     * // Get first 10 Testemunhos
     * const testemunhos = await prisma.testemunho.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testemunhoWithIdOnly = await prisma.testemunho.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestemunhoFindManyArgs>(args?: SelectSubset<T, TestemunhoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestemunhoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Testemunho.
     * @param {TestemunhoCreateArgs} args - Arguments to create a Testemunho.
     * @example
     * // Create one Testemunho
     * const Testemunho = await prisma.testemunho.create({
     *   data: {
     *     // ... data to create a Testemunho
     *   }
     * })
     * 
     */
    create<T extends TestemunhoCreateArgs>(args: SelectSubset<T, TestemunhoCreateArgs<ExtArgs>>): Prisma__TestemunhoClient<$Result.GetResult<Prisma.$TestemunhoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Testemunhos.
     * @param {TestemunhoCreateManyArgs} args - Arguments to create many Testemunhos.
     * @example
     * // Create many Testemunhos
     * const testemunho = await prisma.testemunho.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestemunhoCreateManyArgs>(args?: SelectSubset<T, TestemunhoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Testemunhos and returns the data saved in the database.
     * @param {TestemunhoCreateManyAndReturnArgs} args - Arguments to create many Testemunhos.
     * @example
     * // Create many Testemunhos
     * const testemunho = await prisma.testemunho.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Testemunhos and only return the `id`
     * const testemunhoWithIdOnly = await prisma.testemunho.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestemunhoCreateManyAndReturnArgs>(args?: SelectSubset<T, TestemunhoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestemunhoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Testemunho.
     * @param {TestemunhoDeleteArgs} args - Arguments to delete one Testemunho.
     * @example
     * // Delete one Testemunho
     * const Testemunho = await prisma.testemunho.delete({
     *   where: {
     *     // ... filter to delete one Testemunho
     *   }
     * })
     * 
     */
    delete<T extends TestemunhoDeleteArgs>(args: SelectSubset<T, TestemunhoDeleteArgs<ExtArgs>>): Prisma__TestemunhoClient<$Result.GetResult<Prisma.$TestemunhoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Testemunho.
     * @param {TestemunhoUpdateArgs} args - Arguments to update one Testemunho.
     * @example
     * // Update one Testemunho
     * const testemunho = await prisma.testemunho.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestemunhoUpdateArgs>(args: SelectSubset<T, TestemunhoUpdateArgs<ExtArgs>>): Prisma__TestemunhoClient<$Result.GetResult<Prisma.$TestemunhoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Testemunhos.
     * @param {TestemunhoDeleteManyArgs} args - Arguments to filter Testemunhos to delete.
     * @example
     * // Delete a few Testemunhos
     * const { count } = await prisma.testemunho.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestemunhoDeleteManyArgs>(args?: SelectSubset<T, TestemunhoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Testemunhos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestemunhoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Testemunhos
     * const testemunho = await prisma.testemunho.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestemunhoUpdateManyArgs>(args: SelectSubset<T, TestemunhoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Testemunhos and returns the data updated in the database.
     * @param {TestemunhoUpdateManyAndReturnArgs} args - Arguments to update many Testemunhos.
     * @example
     * // Update many Testemunhos
     * const testemunho = await prisma.testemunho.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Testemunhos and only return the `id`
     * const testemunhoWithIdOnly = await prisma.testemunho.updateManyAndReturn({
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
    updateManyAndReturn<T extends TestemunhoUpdateManyAndReturnArgs>(args: SelectSubset<T, TestemunhoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestemunhoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Testemunho.
     * @param {TestemunhoUpsertArgs} args - Arguments to update or create a Testemunho.
     * @example
     * // Update or create a Testemunho
     * const testemunho = await prisma.testemunho.upsert({
     *   create: {
     *     // ... data to create a Testemunho
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Testemunho we want to update
     *   }
     * })
     */
    upsert<T extends TestemunhoUpsertArgs>(args: SelectSubset<T, TestemunhoUpsertArgs<ExtArgs>>): Prisma__TestemunhoClient<$Result.GetResult<Prisma.$TestemunhoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Testemunhos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestemunhoCountArgs} args - Arguments to filter Testemunhos to count.
     * @example
     * // Count the number of Testemunhos
     * const count = await prisma.testemunho.count({
     *   where: {
     *     // ... the filter for the Testemunhos we want to count
     *   }
     * })
    **/
    count<T extends TestemunhoCountArgs>(
      args?: Subset<T, TestemunhoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestemunhoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Testemunho.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestemunhoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TestemunhoAggregateArgs>(args: Subset<T, TestemunhoAggregateArgs>): Prisma.PrismaPromise<GetTestemunhoAggregateType<T>>

    /**
     * Group by Testemunho.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestemunhoGroupByArgs} args - Group by arguments.
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
      T extends TestemunhoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestemunhoGroupByArgs['orderBy'] }
        : { orderBy?: TestemunhoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TestemunhoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestemunhoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Testemunho model
   */
  readonly fields: TestemunhoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Testemunho.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestemunhoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Testemunho model
   */
  interface TestemunhoFieldRefs {
    readonly id: FieldRef<"Testemunho", 'String'>
    readonly userId: FieldRef<"Testemunho", 'String'>
    readonly name: FieldRef<"Testemunho", 'String'>
    readonly avatarUrl: FieldRef<"Testemunho", 'String'>
    readonly content: FieldRef<"Testemunho", 'String'>
    readonly createdAt: FieldRef<"Testemunho", 'DateTime'>
    readonly updatedAt: FieldRef<"Testemunho", 'DateTime'>
    readonly isPublic: FieldRef<"Testemunho", 'Boolean'>
    readonly coverUrl: FieldRef<"Testemunho", 'String'>
    readonly ministryRole: FieldRef<"Testemunho", 'MinistryRole'>
  }
    

  // Custom InputTypes
  /**
   * Testemunho findUnique
   */
  export type TestemunhoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testemunho
     */
    select?: TestemunhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testemunho
     */
    omit?: TestemunhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestemunhoInclude<ExtArgs> | null
    /**
     * Filter, which Testemunho to fetch.
     */
    where: TestemunhoWhereUniqueInput
  }

  /**
   * Testemunho findUniqueOrThrow
   */
  export type TestemunhoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testemunho
     */
    select?: TestemunhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testemunho
     */
    omit?: TestemunhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestemunhoInclude<ExtArgs> | null
    /**
     * Filter, which Testemunho to fetch.
     */
    where: TestemunhoWhereUniqueInput
  }

  /**
   * Testemunho findFirst
   */
  export type TestemunhoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testemunho
     */
    select?: TestemunhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testemunho
     */
    omit?: TestemunhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestemunhoInclude<ExtArgs> | null
    /**
     * Filter, which Testemunho to fetch.
     */
    where?: TestemunhoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testemunhos to fetch.
     */
    orderBy?: TestemunhoOrderByWithRelationInput | TestemunhoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Testemunhos.
     */
    cursor?: TestemunhoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testemunhos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testemunhos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Testemunhos.
     */
    distinct?: TestemunhoScalarFieldEnum | TestemunhoScalarFieldEnum[]
  }

  /**
   * Testemunho findFirstOrThrow
   */
  export type TestemunhoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testemunho
     */
    select?: TestemunhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testemunho
     */
    omit?: TestemunhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestemunhoInclude<ExtArgs> | null
    /**
     * Filter, which Testemunho to fetch.
     */
    where?: TestemunhoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testemunhos to fetch.
     */
    orderBy?: TestemunhoOrderByWithRelationInput | TestemunhoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Testemunhos.
     */
    cursor?: TestemunhoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testemunhos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testemunhos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Testemunhos.
     */
    distinct?: TestemunhoScalarFieldEnum | TestemunhoScalarFieldEnum[]
  }

  /**
   * Testemunho findMany
   */
  export type TestemunhoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testemunho
     */
    select?: TestemunhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testemunho
     */
    omit?: TestemunhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestemunhoInclude<ExtArgs> | null
    /**
     * Filter, which Testemunhos to fetch.
     */
    where?: TestemunhoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testemunhos to fetch.
     */
    orderBy?: TestemunhoOrderByWithRelationInput | TestemunhoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Testemunhos.
     */
    cursor?: TestemunhoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testemunhos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testemunhos.
     */
    skip?: number
    distinct?: TestemunhoScalarFieldEnum | TestemunhoScalarFieldEnum[]
  }

  /**
   * Testemunho create
   */
  export type TestemunhoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testemunho
     */
    select?: TestemunhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testemunho
     */
    omit?: TestemunhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestemunhoInclude<ExtArgs> | null
    /**
     * The data needed to create a Testemunho.
     */
    data: XOR<TestemunhoCreateInput, TestemunhoUncheckedCreateInput>
  }

  /**
   * Testemunho createMany
   */
  export type TestemunhoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Testemunhos.
     */
    data: TestemunhoCreateManyInput | TestemunhoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Testemunho createManyAndReturn
   */
  export type TestemunhoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testemunho
     */
    select?: TestemunhoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Testemunho
     */
    omit?: TestemunhoOmit<ExtArgs> | null
    /**
     * The data used to create many Testemunhos.
     */
    data: TestemunhoCreateManyInput | TestemunhoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestemunhoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Testemunho update
   */
  export type TestemunhoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testemunho
     */
    select?: TestemunhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testemunho
     */
    omit?: TestemunhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestemunhoInclude<ExtArgs> | null
    /**
     * The data needed to update a Testemunho.
     */
    data: XOR<TestemunhoUpdateInput, TestemunhoUncheckedUpdateInput>
    /**
     * Choose, which Testemunho to update.
     */
    where: TestemunhoWhereUniqueInput
  }

  /**
   * Testemunho updateMany
   */
  export type TestemunhoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Testemunhos.
     */
    data: XOR<TestemunhoUpdateManyMutationInput, TestemunhoUncheckedUpdateManyInput>
    /**
     * Filter which Testemunhos to update
     */
    where?: TestemunhoWhereInput
    /**
     * Limit how many Testemunhos to update.
     */
    limit?: number
  }

  /**
   * Testemunho updateManyAndReturn
   */
  export type TestemunhoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testemunho
     */
    select?: TestemunhoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Testemunho
     */
    omit?: TestemunhoOmit<ExtArgs> | null
    /**
     * The data used to update Testemunhos.
     */
    data: XOR<TestemunhoUpdateManyMutationInput, TestemunhoUncheckedUpdateManyInput>
    /**
     * Filter which Testemunhos to update
     */
    where?: TestemunhoWhereInput
    /**
     * Limit how many Testemunhos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestemunhoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Testemunho upsert
   */
  export type TestemunhoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testemunho
     */
    select?: TestemunhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testemunho
     */
    omit?: TestemunhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestemunhoInclude<ExtArgs> | null
    /**
     * The filter to search for the Testemunho to update in case it exists.
     */
    where: TestemunhoWhereUniqueInput
    /**
     * In case the Testemunho found by the `where` argument doesn't exist, create a new Testemunho with this data.
     */
    create: XOR<TestemunhoCreateInput, TestemunhoUncheckedCreateInput>
    /**
     * In case the Testemunho was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestemunhoUpdateInput, TestemunhoUncheckedUpdateInput>
  }

  /**
   * Testemunho delete
   */
  export type TestemunhoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testemunho
     */
    select?: TestemunhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testemunho
     */
    omit?: TestemunhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestemunhoInclude<ExtArgs> | null
    /**
     * Filter which Testemunho to delete.
     */
    where: TestemunhoWhereUniqueInput
  }

  /**
   * Testemunho deleteMany
   */
  export type TestemunhoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Testemunhos to delete
     */
    where?: TestemunhoWhereInput
    /**
     * Limit how many Testemunhos to delete.
     */
    limit?: number
  }

  /**
   * Testemunho without action
   */
  export type TestemunhoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testemunho
     */
    select?: TestemunhoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testemunho
     */
    omit?: TestemunhoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestemunhoInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    userId: string | null
    userName: string | null
    userRole: string | null
    timestamp: Date | null
    ipAddress: string | null
    userAgent: string | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    userId: string | null
    userName: string | null
    userRole: string | null
    timestamp: Date | null
    ipAddress: string | null
    userAgent: string | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    action: number
    entityType: number
    entityId: number
    userId: number
    userName: number
    userRole: number
    oldData: number
    newData: number
    changes: number
    timestamp: number
    ipAddress: number
    userAgent: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    action?: true
    entityType?: true
    entityId?: true
    userId?: true
    userName?: true
    userRole?: true
    timestamp?: true
    ipAddress?: true
    userAgent?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    action?: true
    entityType?: true
    entityId?: true
    userId?: true
    userName?: true
    userRole?: true
    timestamp?: true
    ipAddress?: true
    userAgent?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    action?: true
    entityType?: true
    entityId?: true
    userId?: true
    userName?: true
    userRole?: true
    oldData?: true
    newData?: true
    changes?: true
    timestamp?: true
    ipAddress?: true
    userAgent?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    action: string
    entityType: string
    entityId: string
    userId: string
    userName: string
    userRole: string
    oldData: JsonValue | null
    newData: JsonValue | null
    changes: JsonValue | null
    timestamp: Date
    ipAddress: string | null
    userAgent: string | null
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    userId?: boolean
    userName?: boolean
    userRole?: boolean
    oldData?: boolean
    newData?: boolean
    changes?: boolean
    timestamp?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    userId?: boolean
    userName?: boolean
    userRole?: boolean
    oldData?: boolean
    newData?: boolean
    changes?: boolean
    timestamp?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    userId?: boolean
    userName?: boolean
    userRole?: boolean
    oldData?: boolean
    newData?: boolean
    changes?: boolean
    timestamp?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    userId?: boolean
    userName?: boolean
    userRole?: boolean
    oldData?: boolean
    newData?: boolean
    changes?: boolean
    timestamp?: boolean
    ipAddress?: boolean
    userAgent?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "action" | "entityType" | "entityId" | "userId" | "userName" | "userRole" | "oldData" | "newData" | "changes" | "timestamp" | "ipAddress" | "userAgent", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      action: string
      entityType: string
      entityId: string
      userId: string
      userName: string
      userRole: string
      oldData: Prisma.JsonValue | null
      newData: Prisma.JsonValue | null
      changes: Prisma.JsonValue | null
      timestamp: Date
      ipAddress: string | null
      userAgent: string | null
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
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
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entityType: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly userName: FieldRef<"AuditLog", 'String'>
    readonly userRole: FieldRef<"AuditLog", 'String'>
    readonly oldData: FieldRef<"AuditLog", 'Json'>
    readonly newData: FieldRef<"AuditLog", 'Json'>
    readonly changes: FieldRef<"AuditLog", 'Json'>
    readonly timestamp: FieldRef<"AuditLog", 'DateTime'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    login: 'login',
    name: 'name',
    avatarUrl: 'avatarUrl',
    password: 'password',
    role: 'role',
    ministryRole: 'ministryRole',
    expires: 'expires',
    cargo: 'cargo'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const NewScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    coverUrl: 'coverUrl',
    videoUrl: 'videoUrl',
    content: 'content',
    title: 'title',
    createdAt: 'createdAt',
    isPublic: 'isPublic',
    page: 'page',
    updatedAt: 'updatedAt',
    destaque: 'destaque',
    url: 'url',
    role: 'role'
  };

  export type NewScalarFieldEnum = (typeof NewScalarFieldEnum)[keyof typeof NewScalarFieldEnum]


  export const MinisterioScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    title: 'title',
    local: 'local',
    isPublic: 'isPublic',
    createdAt: 'createdAt',
    coverUrl: 'coverUrl',
    updatedAt: 'updatedAt',
    role: 'role'
  };

  export type MinisterioScalarFieldEnum = (typeof MinisterioScalarFieldEnum)[keyof typeof MinisterioScalarFieldEnum]


  export const AgendaScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    day: 'day',
    name: 'name',
    hour: 'hour',
    isPublic: 'isPublic',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    destaque: 'destaque',
    role: 'role'
  };

  export type AgendaScalarFieldEnum = (typeof AgendaScalarFieldEnum)[keyof typeof AgendaScalarFieldEnum]


  export const DoacaoScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    local: 'local',
    banco: 'banco',
    conta: 'conta',
    agencia: 'agencia',
    nomebanco: 'nomebanco',
    pix: 'pix',
    nomepix: 'nomepix',
    isPublic: 'isPublic',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DoacaoScalarFieldEnum = (typeof DoacaoScalarFieldEnum)[keyof typeof DoacaoScalarFieldEnum]


  export const EnderecoScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    local: 'local',
    rua: 'rua',
    cep: 'cep',
    isPublic: 'isPublic',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    numero: 'numero',
    cidade: 'cidade'
  };

  export type EnderecoScalarFieldEnum = (typeof EnderecoScalarFieldEnum)[keyof typeof EnderecoScalarFieldEnum]


  export const ContatoScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    local: 'local',
    whatsapp: 'whatsapp',
    facebook: 'facebook',
    isPublic: 'isPublic',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    instagram: 'instagram'
  };

  export type ContatoScalarFieldEnum = (typeof ContatoScalarFieldEnum)[keyof typeof ContatoScalarFieldEnum]


  export const SobreScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    coverUrl: 'coverUrl',
    content: 'content',
    title: 'title',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isPublic: 'isPublic'
  };

  export type SobreScalarFieldEnum = (typeof SobreScalarFieldEnum)[keyof typeof SobreScalarFieldEnum]


  export const SobreLiderScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    coverUrl: 'coverUrl',
    name: 'name',
    title: 'title',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isPublic: 'isPublic'
  };

  export type SobreLiderScalarFieldEnum = (typeof SobreLiderScalarFieldEnum)[keyof typeof SobreLiderScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const PasswordResetTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    userId: 'userId',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
  };

  export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum]


  export const TestemunhoScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    avatarUrl: 'avatarUrl',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    isPublic: 'isPublic',
    coverUrl: 'coverUrl',
    ministryRole: 'ministryRole'
  };

  export type TestemunhoScalarFieldEnum = (typeof TestemunhoScalarFieldEnum)[keyof typeof TestemunhoScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    userId: 'userId',
    userName: 'userName',
    userRole: 'userRole',
    oldData: 'oldData',
    newData: 'newData',
    changes: 'changes',
    timestamp: 'timestamp',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'MinistryRole'
   */
  export type EnumMinistryRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MinistryRole'>
    


  /**
   * Reference to a field of type 'MinistryRole[]'
   */
  export type ListEnumMinistryRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MinistryRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'CargoRole[]'
   */
  export type ListEnumCargoRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CargoRole[]'>
    


  /**
   * Reference to a field of type 'CargoRole'
   */
  export type EnumCargoRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CargoRole'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    login?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    ministryRole?: EnumMinistryRoleNullableFilter<"User"> | $Enums.MinistryRole | null
    expires?: DateTimeNullableFilter<"User"> | Date | string | null
    cargo?: EnumCargoRoleNullableListFilter<"User">
    agenda?: AgendaListRelationFilter
    contato?: ContatoListRelationFilter
    doacao?: DoacaoListRelationFilter
    endereco?: EnderecoListRelationFilter
    ministerio?: MinisterioListRelationFilter
    news?: NewListRelationFilter
    PasswordResetToken?: PasswordResetTokenListRelationFilter
    refreshToken?: RefreshTokenListRelationFilter
    sobre?: SobreListRelationFilter
    sobreLider?: SobreLiderListRelationFilter
    testemunhos?: TestemunhoListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    login?: SortOrder
    name?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    ministryRole?: SortOrderInput | SortOrder
    expires?: SortOrderInput | SortOrder
    cargo?: SortOrder
    agenda?: AgendaOrderByRelationAggregateInput
    contato?: ContatoOrderByRelationAggregateInput
    doacao?: DoacaoOrderByRelationAggregateInput
    endereco?: EnderecoOrderByRelationAggregateInput
    ministerio?: MinisterioOrderByRelationAggregateInput
    news?: NewOrderByRelationAggregateInput
    PasswordResetToken?: PasswordResetTokenOrderByRelationAggregateInput
    refreshToken?: RefreshTokenOrderByRelationAggregateInput
    sobre?: SobreOrderByRelationAggregateInput
    sobreLider?: SobreLiderOrderByRelationAggregateInput
    testemunhos?: TestemunhoOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    login?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    ministryRole?: EnumMinistryRoleNullableFilter<"User"> | $Enums.MinistryRole | null
    expires?: DateTimeNullableFilter<"User"> | Date | string | null
    cargo?: EnumCargoRoleNullableListFilter<"User">
    agenda?: AgendaListRelationFilter
    contato?: ContatoListRelationFilter
    doacao?: DoacaoListRelationFilter
    endereco?: EnderecoListRelationFilter
    ministerio?: MinisterioListRelationFilter
    news?: NewListRelationFilter
    PasswordResetToken?: PasswordResetTokenListRelationFilter
    refreshToken?: RefreshTokenListRelationFilter
    sobre?: SobreListRelationFilter
    sobreLider?: SobreLiderListRelationFilter
    testemunhos?: TestemunhoListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "login">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    login?: SortOrder
    name?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    ministryRole?: SortOrderInput | SortOrder
    expires?: SortOrderInput | SortOrder
    cargo?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    login?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    ministryRole?: EnumMinistryRoleNullableWithAggregatesFilter<"User"> | $Enums.MinistryRole | null
    expires?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    cargo?: EnumCargoRoleNullableListFilter<"User">
  }

  export type NewWhereInput = {
    AND?: NewWhereInput | NewWhereInput[]
    OR?: NewWhereInput[]
    NOT?: NewWhereInput | NewWhereInput[]
    id?: StringFilter<"New"> | string
    userId?: StringFilter<"New"> | string
    coverUrl?: StringNullableFilter<"New"> | string | null
    videoUrl?: StringNullableFilter<"New"> | string | null
    content?: StringFilter<"New"> | string
    title?: StringFilter<"New"> | string
    createdAt?: DateTimeFilter<"New"> | Date | string
    isPublic?: BoolFilter<"New"> | boolean
    page?: StringFilter<"New"> | string
    updatedAt?: DateTimeFilter<"New"> | Date | string
    destaque?: BoolFilter<"New"> | boolean
    url?: StringFilter<"New"> | string
    role?: EnumMinistryRoleFilter<"New"> | $Enums.MinistryRole
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NewOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    coverUrl?: SortOrderInput | SortOrder
    videoUrl?: SortOrderInput | SortOrder
    content?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    isPublic?: SortOrder
    page?: SortOrder
    updatedAt?: SortOrder
    destaque?: SortOrder
    url?: SortOrder
    role?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    url?: string
    AND?: NewWhereInput | NewWhereInput[]
    OR?: NewWhereInput[]
    NOT?: NewWhereInput | NewWhereInput[]
    userId?: StringFilter<"New"> | string
    coverUrl?: StringNullableFilter<"New"> | string | null
    videoUrl?: StringNullableFilter<"New"> | string | null
    content?: StringFilter<"New"> | string
    title?: StringFilter<"New"> | string
    createdAt?: DateTimeFilter<"New"> | Date | string
    isPublic?: BoolFilter<"New"> | boolean
    page?: StringFilter<"New"> | string
    updatedAt?: DateTimeFilter<"New"> | Date | string
    destaque?: BoolFilter<"New"> | boolean
    role?: EnumMinistryRoleFilter<"New"> | $Enums.MinistryRole
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "url">

  export type NewOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    coverUrl?: SortOrderInput | SortOrder
    videoUrl?: SortOrderInput | SortOrder
    content?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    isPublic?: SortOrder
    page?: SortOrder
    updatedAt?: SortOrder
    destaque?: SortOrder
    url?: SortOrder
    role?: SortOrder
    _count?: NewCountOrderByAggregateInput
    _max?: NewMaxOrderByAggregateInput
    _min?: NewMinOrderByAggregateInput
  }

  export type NewScalarWhereWithAggregatesInput = {
    AND?: NewScalarWhereWithAggregatesInput | NewScalarWhereWithAggregatesInput[]
    OR?: NewScalarWhereWithAggregatesInput[]
    NOT?: NewScalarWhereWithAggregatesInput | NewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"New"> | string
    userId?: StringWithAggregatesFilter<"New"> | string
    coverUrl?: StringNullableWithAggregatesFilter<"New"> | string | null
    videoUrl?: StringNullableWithAggregatesFilter<"New"> | string | null
    content?: StringWithAggregatesFilter<"New"> | string
    title?: StringWithAggregatesFilter<"New"> | string
    createdAt?: DateTimeWithAggregatesFilter<"New"> | Date | string
    isPublic?: BoolWithAggregatesFilter<"New"> | boolean
    page?: StringWithAggregatesFilter<"New"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"New"> | Date | string
    destaque?: BoolWithAggregatesFilter<"New"> | boolean
    url?: StringWithAggregatesFilter<"New"> | string
    role?: EnumMinistryRoleWithAggregatesFilter<"New"> | $Enums.MinistryRole
  }

  export type MinisterioWhereInput = {
    AND?: MinisterioWhereInput | MinisterioWhereInput[]
    OR?: MinisterioWhereInput[]
    NOT?: MinisterioWhereInput | MinisterioWhereInput[]
    id?: StringFilter<"Ministerio"> | string
    userId?: StringFilter<"Ministerio"> | string
    name?: StringFilter<"Ministerio"> | string
    title?: StringFilter<"Ministerio"> | string
    local?: StringFilter<"Ministerio"> | string
    isPublic?: BoolFilter<"Ministerio"> | boolean
    createdAt?: DateTimeFilter<"Ministerio"> | Date | string
    coverUrl?: StringFilter<"Ministerio"> | string
    updatedAt?: DateTimeFilter<"Ministerio"> | Date | string
    role?: EnumMinistryRoleFilter<"Ministerio"> | $Enums.MinistryRole
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MinisterioOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    title?: SortOrder
    local?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    coverUrl?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type MinisterioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MinisterioWhereInput | MinisterioWhereInput[]
    OR?: MinisterioWhereInput[]
    NOT?: MinisterioWhereInput | MinisterioWhereInput[]
    userId?: StringFilter<"Ministerio"> | string
    name?: StringFilter<"Ministerio"> | string
    title?: StringFilter<"Ministerio"> | string
    local?: StringFilter<"Ministerio"> | string
    isPublic?: BoolFilter<"Ministerio"> | boolean
    createdAt?: DateTimeFilter<"Ministerio"> | Date | string
    coverUrl?: StringFilter<"Ministerio"> | string
    updatedAt?: DateTimeFilter<"Ministerio"> | Date | string
    role?: EnumMinistryRoleFilter<"Ministerio"> | $Enums.MinistryRole
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MinisterioOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    title?: SortOrder
    local?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    coverUrl?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
    _count?: MinisterioCountOrderByAggregateInput
    _max?: MinisterioMaxOrderByAggregateInput
    _min?: MinisterioMinOrderByAggregateInput
  }

  export type MinisterioScalarWhereWithAggregatesInput = {
    AND?: MinisterioScalarWhereWithAggregatesInput | MinisterioScalarWhereWithAggregatesInput[]
    OR?: MinisterioScalarWhereWithAggregatesInput[]
    NOT?: MinisterioScalarWhereWithAggregatesInput | MinisterioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Ministerio"> | string
    userId?: StringWithAggregatesFilter<"Ministerio"> | string
    name?: StringWithAggregatesFilter<"Ministerio"> | string
    title?: StringWithAggregatesFilter<"Ministerio"> | string
    local?: StringWithAggregatesFilter<"Ministerio"> | string
    isPublic?: BoolWithAggregatesFilter<"Ministerio"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Ministerio"> | Date | string
    coverUrl?: StringWithAggregatesFilter<"Ministerio"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"Ministerio"> | Date | string
    role?: EnumMinistryRoleWithAggregatesFilter<"Ministerio"> | $Enums.MinistryRole
  }

  export type AgendaWhereInput = {
    AND?: AgendaWhereInput | AgendaWhereInput[]
    OR?: AgendaWhereInput[]
    NOT?: AgendaWhereInput | AgendaWhereInput[]
    id?: StringFilter<"Agenda"> | string
    userId?: StringFilter<"Agenda"> | string
    day?: StringFilter<"Agenda"> | string
    name?: StringFilter<"Agenda"> | string
    hour?: StringFilter<"Agenda"> | string
    isPublic?: BoolFilter<"Agenda"> | boolean
    createdAt?: DateTimeFilter<"Agenda"> | Date | string
    updatedAt?: DateTimeFilter<"Agenda"> | Date | string
    destaque?: BoolFilter<"Agenda"> | boolean
    role?: EnumMinistryRoleFilter<"Agenda"> | $Enums.MinistryRole
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AgendaOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    day?: SortOrder
    name?: SortOrder
    hour?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    destaque?: SortOrder
    role?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AgendaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AgendaWhereInput | AgendaWhereInput[]
    OR?: AgendaWhereInput[]
    NOT?: AgendaWhereInput | AgendaWhereInput[]
    userId?: StringFilter<"Agenda"> | string
    day?: StringFilter<"Agenda"> | string
    name?: StringFilter<"Agenda"> | string
    hour?: StringFilter<"Agenda"> | string
    isPublic?: BoolFilter<"Agenda"> | boolean
    createdAt?: DateTimeFilter<"Agenda"> | Date | string
    updatedAt?: DateTimeFilter<"Agenda"> | Date | string
    destaque?: BoolFilter<"Agenda"> | boolean
    role?: EnumMinistryRoleFilter<"Agenda"> | $Enums.MinistryRole
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AgendaOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    day?: SortOrder
    name?: SortOrder
    hour?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    destaque?: SortOrder
    role?: SortOrder
    _count?: AgendaCountOrderByAggregateInput
    _max?: AgendaMaxOrderByAggregateInput
    _min?: AgendaMinOrderByAggregateInput
  }

  export type AgendaScalarWhereWithAggregatesInput = {
    AND?: AgendaScalarWhereWithAggregatesInput | AgendaScalarWhereWithAggregatesInput[]
    OR?: AgendaScalarWhereWithAggregatesInput[]
    NOT?: AgendaScalarWhereWithAggregatesInput | AgendaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Agenda"> | string
    userId?: StringWithAggregatesFilter<"Agenda"> | string
    day?: StringWithAggregatesFilter<"Agenda"> | string
    name?: StringWithAggregatesFilter<"Agenda"> | string
    hour?: StringWithAggregatesFilter<"Agenda"> | string
    isPublic?: BoolWithAggregatesFilter<"Agenda"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Agenda"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Agenda"> | Date | string
    destaque?: BoolWithAggregatesFilter<"Agenda"> | boolean
    role?: EnumMinistryRoleWithAggregatesFilter<"Agenda"> | $Enums.MinistryRole
  }

  export type DoacaoWhereInput = {
    AND?: DoacaoWhereInput | DoacaoWhereInput[]
    OR?: DoacaoWhereInput[]
    NOT?: DoacaoWhereInput | DoacaoWhereInput[]
    id?: StringFilter<"Doacao"> | string
    userId?: StringFilter<"Doacao"> | string
    local?: StringFilter<"Doacao"> | string
    banco?: StringFilter<"Doacao"> | string
    conta?: StringFilter<"Doacao"> | string
    agencia?: StringFilter<"Doacao"> | string
    nomebanco?: StringFilter<"Doacao"> | string
    pix?: StringFilter<"Doacao"> | string
    nomepix?: StringFilter<"Doacao"> | string
    isPublic?: BoolFilter<"Doacao"> | boolean
    createdAt?: DateTimeFilter<"Doacao"> | Date | string
    updatedAt?: DateTimeFilter<"Doacao"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type DoacaoOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    local?: SortOrder
    banco?: SortOrder
    conta?: SortOrder
    agencia?: SortOrder
    nomebanco?: SortOrder
    pix?: SortOrder
    nomepix?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type DoacaoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DoacaoWhereInput | DoacaoWhereInput[]
    OR?: DoacaoWhereInput[]
    NOT?: DoacaoWhereInput | DoacaoWhereInput[]
    userId?: StringFilter<"Doacao"> | string
    local?: StringFilter<"Doacao"> | string
    banco?: StringFilter<"Doacao"> | string
    conta?: StringFilter<"Doacao"> | string
    agencia?: StringFilter<"Doacao"> | string
    nomebanco?: StringFilter<"Doacao"> | string
    pix?: StringFilter<"Doacao"> | string
    nomepix?: StringFilter<"Doacao"> | string
    isPublic?: BoolFilter<"Doacao"> | boolean
    createdAt?: DateTimeFilter<"Doacao"> | Date | string
    updatedAt?: DateTimeFilter<"Doacao"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type DoacaoOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    local?: SortOrder
    banco?: SortOrder
    conta?: SortOrder
    agencia?: SortOrder
    nomebanco?: SortOrder
    pix?: SortOrder
    nomepix?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DoacaoCountOrderByAggregateInput
    _max?: DoacaoMaxOrderByAggregateInput
    _min?: DoacaoMinOrderByAggregateInput
  }

  export type DoacaoScalarWhereWithAggregatesInput = {
    AND?: DoacaoScalarWhereWithAggregatesInput | DoacaoScalarWhereWithAggregatesInput[]
    OR?: DoacaoScalarWhereWithAggregatesInput[]
    NOT?: DoacaoScalarWhereWithAggregatesInput | DoacaoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Doacao"> | string
    userId?: StringWithAggregatesFilter<"Doacao"> | string
    local?: StringWithAggregatesFilter<"Doacao"> | string
    banco?: StringWithAggregatesFilter<"Doacao"> | string
    conta?: StringWithAggregatesFilter<"Doacao"> | string
    agencia?: StringWithAggregatesFilter<"Doacao"> | string
    nomebanco?: StringWithAggregatesFilter<"Doacao"> | string
    pix?: StringWithAggregatesFilter<"Doacao"> | string
    nomepix?: StringWithAggregatesFilter<"Doacao"> | string
    isPublic?: BoolWithAggregatesFilter<"Doacao"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Doacao"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Doacao"> | Date | string
  }

  export type EnderecoWhereInput = {
    AND?: EnderecoWhereInput | EnderecoWhereInput[]
    OR?: EnderecoWhereInput[]
    NOT?: EnderecoWhereInput | EnderecoWhereInput[]
    id?: StringFilter<"Endereco"> | string
    userId?: StringFilter<"Endereco"> | string
    local?: StringFilter<"Endereco"> | string
    rua?: StringFilter<"Endereco"> | string
    cep?: StringFilter<"Endereco"> | string
    isPublic?: BoolFilter<"Endereco"> | boolean
    createdAt?: DateTimeFilter<"Endereco"> | Date | string
    updatedAt?: DateTimeFilter<"Endereco"> | Date | string
    numero?: StringNullableFilter<"Endereco"> | string | null
    cidade?: StringNullableFilter<"Endereco"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type EnderecoOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    local?: SortOrder
    rua?: SortOrder
    cep?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    numero?: SortOrderInput | SortOrder
    cidade?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type EnderecoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EnderecoWhereInput | EnderecoWhereInput[]
    OR?: EnderecoWhereInput[]
    NOT?: EnderecoWhereInput | EnderecoWhereInput[]
    userId?: StringFilter<"Endereco"> | string
    local?: StringFilter<"Endereco"> | string
    rua?: StringFilter<"Endereco"> | string
    cep?: StringFilter<"Endereco"> | string
    isPublic?: BoolFilter<"Endereco"> | boolean
    createdAt?: DateTimeFilter<"Endereco"> | Date | string
    updatedAt?: DateTimeFilter<"Endereco"> | Date | string
    numero?: StringNullableFilter<"Endereco"> | string | null
    cidade?: StringNullableFilter<"Endereco"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type EnderecoOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    local?: SortOrder
    rua?: SortOrder
    cep?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    numero?: SortOrderInput | SortOrder
    cidade?: SortOrderInput | SortOrder
    _count?: EnderecoCountOrderByAggregateInput
    _max?: EnderecoMaxOrderByAggregateInput
    _min?: EnderecoMinOrderByAggregateInput
  }

  export type EnderecoScalarWhereWithAggregatesInput = {
    AND?: EnderecoScalarWhereWithAggregatesInput | EnderecoScalarWhereWithAggregatesInput[]
    OR?: EnderecoScalarWhereWithAggregatesInput[]
    NOT?: EnderecoScalarWhereWithAggregatesInput | EnderecoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Endereco"> | string
    userId?: StringWithAggregatesFilter<"Endereco"> | string
    local?: StringWithAggregatesFilter<"Endereco"> | string
    rua?: StringWithAggregatesFilter<"Endereco"> | string
    cep?: StringWithAggregatesFilter<"Endereco"> | string
    isPublic?: BoolWithAggregatesFilter<"Endereco"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Endereco"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Endereco"> | Date | string
    numero?: StringNullableWithAggregatesFilter<"Endereco"> | string | null
    cidade?: StringNullableWithAggregatesFilter<"Endereco"> | string | null
  }

  export type ContatoWhereInput = {
    AND?: ContatoWhereInput | ContatoWhereInput[]
    OR?: ContatoWhereInput[]
    NOT?: ContatoWhereInput | ContatoWhereInput[]
    id?: StringFilter<"Contato"> | string
    userId?: StringFilter<"Contato"> | string
    local?: StringFilter<"Contato"> | string
    whatsapp?: StringFilter<"Contato"> | string
    facebook?: StringFilter<"Contato"> | string
    isPublic?: BoolFilter<"Contato"> | boolean
    createdAt?: DateTimeFilter<"Contato"> | Date | string
    updatedAt?: DateTimeFilter<"Contato"> | Date | string
    instagram?: StringFilter<"Contato"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ContatoOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    local?: SortOrder
    whatsapp?: SortOrder
    facebook?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    instagram?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ContatoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContatoWhereInput | ContatoWhereInput[]
    OR?: ContatoWhereInput[]
    NOT?: ContatoWhereInput | ContatoWhereInput[]
    userId?: StringFilter<"Contato"> | string
    local?: StringFilter<"Contato"> | string
    whatsapp?: StringFilter<"Contato"> | string
    facebook?: StringFilter<"Contato"> | string
    isPublic?: BoolFilter<"Contato"> | boolean
    createdAt?: DateTimeFilter<"Contato"> | Date | string
    updatedAt?: DateTimeFilter<"Contato"> | Date | string
    instagram?: StringFilter<"Contato"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ContatoOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    local?: SortOrder
    whatsapp?: SortOrder
    facebook?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    instagram?: SortOrder
    _count?: ContatoCountOrderByAggregateInput
    _max?: ContatoMaxOrderByAggregateInput
    _min?: ContatoMinOrderByAggregateInput
  }

  export type ContatoScalarWhereWithAggregatesInput = {
    AND?: ContatoScalarWhereWithAggregatesInput | ContatoScalarWhereWithAggregatesInput[]
    OR?: ContatoScalarWhereWithAggregatesInput[]
    NOT?: ContatoScalarWhereWithAggregatesInput | ContatoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Contato"> | string
    userId?: StringWithAggregatesFilter<"Contato"> | string
    local?: StringWithAggregatesFilter<"Contato"> | string
    whatsapp?: StringWithAggregatesFilter<"Contato"> | string
    facebook?: StringWithAggregatesFilter<"Contato"> | string
    isPublic?: BoolWithAggregatesFilter<"Contato"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Contato"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Contato"> | Date | string
    instagram?: StringWithAggregatesFilter<"Contato"> | string
  }

  export type SobreWhereInput = {
    AND?: SobreWhereInput | SobreWhereInput[]
    OR?: SobreWhereInput[]
    NOT?: SobreWhereInput | SobreWhereInput[]
    id?: StringFilter<"Sobre"> | string
    userId?: StringFilter<"Sobre"> | string
    coverUrl?: StringFilter<"Sobre"> | string
    content?: StringFilter<"Sobre"> | string
    title?: StringFilter<"Sobre"> | string
    createdAt?: DateTimeFilter<"Sobre"> | Date | string
    updatedAt?: DateTimeFilter<"Sobre"> | Date | string
    isPublic?: BoolFilter<"Sobre"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SobreOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    coverUrl?: SortOrder
    content?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPublic?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SobreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SobreWhereInput | SobreWhereInput[]
    OR?: SobreWhereInput[]
    NOT?: SobreWhereInput | SobreWhereInput[]
    userId?: StringFilter<"Sobre"> | string
    coverUrl?: StringFilter<"Sobre"> | string
    content?: StringFilter<"Sobre"> | string
    title?: StringFilter<"Sobre"> | string
    createdAt?: DateTimeFilter<"Sobre"> | Date | string
    updatedAt?: DateTimeFilter<"Sobre"> | Date | string
    isPublic?: BoolFilter<"Sobre"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type SobreOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    coverUrl?: SortOrder
    content?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPublic?: SortOrder
    _count?: SobreCountOrderByAggregateInput
    _max?: SobreMaxOrderByAggregateInput
    _min?: SobreMinOrderByAggregateInput
  }

  export type SobreScalarWhereWithAggregatesInput = {
    AND?: SobreScalarWhereWithAggregatesInput | SobreScalarWhereWithAggregatesInput[]
    OR?: SobreScalarWhereWithAggregatesInput[]
    NOT?: SobreScalarWhereWithAggregatesInput | SobreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Sobre"> | string
    userId?: StringWithAggregatesFilter<"Sobre"> | string
    coverUrl?: StringWithAggregatesFilter<"Sobre"> | string
    content?: StringWithAggregatesFilter<"Sobre"> | string
    title?: StringWithAggregatesFilter<"Sobre"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Sobre"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Sobre"> | Date | string
    isPublic?: BoolWithAggregatesFilter<"Sobre"> | boolean
  }

  export type SobreLiderWhereInput = {
    AND?: SobreLiderWhereInput | SobreLiderWhereInput[]
    OR?: SobreLiderWhereInput[]
    NOT?: SobreLiderWhereInput | SobreLiderWhereInput[]
    id?: StringFilter<"SobreLider"> | string
    userId?: StringFilter<"SobreLider"> | string
    coverUrl?: StringFilter<"SobreLider"> | string
    name?: StringFilter<"SobreLider"> | string
    title?: StringFilter<"SobreLider"> | string
    createdAt?: DateTimeFilter<"SobreLider"> | Date | string
    updatedAt?: DateTimeFilter<"SobreLider"> | Date | string
    isPublic?: BoolFilter<"SobreLider"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SobreLiderOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    coverUrl?: SortOrder
    name?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPublic?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SobreLiderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SobreLiderWhereInput | SobreLiderWhereInput[]
    OR?: SobreLiderWhereInput[]
    NOT?: SobreLiderWhereInput | SobreLiderWhereInput[]
    userId?: StringFilter<"SobreLider"> | string
    coverUrl?: StringFilter<"SobreLider"> | string
    name?: StringFilter<"SobreLider"> | string
    title?: StringFilter<"SobreLider"> | string
    createdAt?: DateTimeFilter<"SobreLider"> | Date | string
    updatedAt?: DateTimeFilter<"SobreLider"> | Date | string
    isPublic?: BoolFilter<"SobreLider"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type SobreLiderOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    coverUrl?: SortOrder
    name?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPublic?: SortOrder
    _count?: SobreLiderCountOrderByAggregateInput
    _max?: SobreLiderMaxOrderByAggregateInput
    _min?: SobreLiderMinOrderByAggregateInput
  }

  export type SobreLiderScalarWhereWithAggregatesInput = {
    AND?: SobreLiderScalarWhereWithAggregatesInput | SobreLiderScalarWhereWithAggregatesInput[]
    OR?: SobreLiderScalarWhereWithAggregatesInput[]
    NOT?: SobreLiderScalarWhereWithAggregatesInput | SobreLiderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SobreLider"> | string
    userId?: StringWithAggregatesFilter<"SobreLider"> | string
    coverUrl?: StringWithAggregatesFilter<"SobreLider"> | string
    name?: StringWithAggregatesFilter<"SobreLider"> | string
    title?: StringWithAggregatesFilter<"SobreLider"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SobreLider"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SobreLider"> | Date | string
    isPublic?: BoolWithAggregatesFilter<"SobreLider"> | boolean
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    userId?: StringFilter<"RefreshToken"> | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    updatedAt?: DateTimeFilter<"RefreshToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    userId?: StringFilter<"RefreshToken"> | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    updatedAt?: DateTimeFilter<"RefreshToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefreshToken"> | string
    token?: StringWithAggregatesFilter<"RefreshToken"> | string
    userId?: StringWithAggregatesFilter<"RefreshToken"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
  }

  export type PasswordResetTokenWhereInput = {
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    token?: StringFilter<"PasswordResetToken"> | string
    userId?: StringFilter<"PasswordResetToken"> | string
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PasswordResetTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PasswordResetTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    OR?: PasswordResetTokenWhereInput[]
    NOT?: PasswordResetTokenWhereInput | PasswordResetTokenWhereInput[]
    userId?: StringFilter<"PasswordResetToken"> | string
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type PasswordResetTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    _count?: PasswordResetTokenCountOrderByAggregateInput
    _max?: PasswordResetTokenMaxOrderByAggregateInput
    _min?: PasswordResetTokenMinOrderByAggregateInput
  }

  export type PasswordResetTokenScalarWhereWithAggregatesInput = {
    AND?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    OR?: PasswordResetTokenScalarWhereWithAggregatesInput[]
    NOT?: PasswordResetTokenScalarWhereWithAggregatesInput | PasswordResetTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    token?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    userId?: StringWithAggregatesFilter<"PasswordResetToken"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"PasswordResetToken"> | Date | string
  }

  export type TestemunhoWhereInput = {
    AND?: TestemunhoWhereInput | TestemunhoWhereInput[]
    OR?: TestemunhoWhereInput[]
    NOT?: TestemunhoWhereInput | TestemunhoWhereInput[]
    id?: StringFilter<"Testemunho"> | string
    userId?: StringFilter<"Testemunho"> | string
    name?: StringFilter<"Testemunho"> | string
    avatarUrl?: StringFilter<"Testemunho"> | string
    content?: StringFilter<"Testemunho"> | string
    createdAt?: DateTimeFilter<"Testemunho"> | Date | string
    updatedAt?: DateTimeFilter<"Testemunho"> | Date | string
    isPublic?: BoolFilter<"Testemunho"> | boolean
    coverUrl?: StringNullableFilter<"Testemunho"> | string | null
    ministryRole?: EnumMinistryRoleNullableFilter<"Testemunho"> | $Enums.MinistryRole | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TestemunhoOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPublic?: SortOrder
    coverUrl?: SortOrderInput | SortOrder
    ministryRole?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TestemunhoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TestemunhoWhereInput | TestemunhoWhereInput[]
    OR?: TestemunhoWhereInput[]
    NOT?: TestemunhoWhereInput | TestemunhoWhereInput[]
    userId?: StringFilter<"Testemunho"> | string
    name?: StringFilter<"Testemunho"> | string
    avatarUrl?: StringFilter<"Testemunho"> | string
    content?: StringFilter<"Testemunho"> | string
    createdAt?: DateTimeFilter<"Testemunho"> | Date | string
    updatedAt?: DateTimeFilter<"Testemunho"> | Date | string
    isPublic?: BoolFilter<"Testemunho"> | boolean
    coverUrl?: StringNullableFilter<"Testemunho"> | string | null
    ministryRole?: EnumMinistryRoleNullableFilter<"Testemunho"> | $Enums.MinistryRole | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TestemunhoOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPublic?: SortOrder
    coverUrl?: SortOrderInput | SortOrder
    ministryRole?: SortOrderInput | SortOrder
    _count?: TestemunhoCountOrderByAggregateInput
    _max?: TestemunhoMaxOrderByAggregateInput
    _min?: TestemunhoMinOrderByAggregateInput
  }

  export type TestemunhoScalarWhereWithAggregatesInput = {
    AND?: TestemunhoScalarWhereWithAggregatesInput | TestemunhoScalarWhereWithAggregatesInput[]
    OR?: TestemunhoScalarWhereWithAggregatesInput[]
    NOT?: TestemunhoScalarWhereWithAggregatesInput | TestemunhoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Testemunho"> | string
    userId?: StringWithAggregatesFilter<"Testemunho"> | string
    name?: StringWithAggregatesFilter<"Testemunho"> | string
    avatarUrl?: StringWithAggregatesFilter<"Testemunho"> | string
    content?: StringWithAggregatesFilter<"Testemunho"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Testemunho"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Testemunho"> | Date | string
    isPublic?: BoolWithAggregatesFilter<"Testemunho"> | boolean
    coverUrl?: StringNullableWithAggregatesFilter<"Testemunho"> | string | null
    ministryRole?: EnumMinistryRoleNullableWithAggregatesFilter<"Testemunho"> | $Enums.MinistryRole | null
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    userId?: StringFilter<"AuditLog"> | string
    userName?: StringFilter<"AuditLog"> | string
    userRole?: StringFilter<"AuditLog"> | string
    oldData?: JsonNullableFilter<"AuditLog">
    newData?: JsonNullableFilter<"AuditLog">
    changes?: JsonNullableFilter<"AuditLog">
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    userRole?: SortOrder
    oldData?: SortOrderInput | SortOrder
    newData?: SortOrderInput | SortOrder
    changes?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    userId?: StringFilter<"AuditLog"> | string
    userName?: StringFilter<"AuditLog"> | string
    userRole?: StringFilter<"AuditLog"> | string
    oldData?: JsonNullableFilter<"AuditLog">
    newData?: JsonNullableFilter<"AuditLog">
    changes?: JsonNullableFilter<"AuditLog">
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    userRole?: SortOrder
    oldData?: SortOrderInput | SortOrder
    newData?: SortOrderInput | SortOrder
    changes?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entityType?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringWithAggregatesFilter<"AuditLog"> | string
    userName?: StringWithAggregatesFilter<"AuditLog"> | string
    userRole?: StringWithAggregatesFilter<"AuditLog"> | string
    oldData?: JsonNullableWithAggregatesFilter<"AuditLog">
    newData?: JsonNullableWithAggregatesFilter<"AuditLog">
    changes?: JsonNullableWithAggregatesFilter<"AuditLog">
    timestamp?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaCreateNestedManyWithoutUserInput
    contato?: ContatoCreateNestedManyWithoutUserInput
    doacao?: DoacaoCreateNestedManyWithoutUserInput
    endereco?: EnderecoCreateNestedManyWithoutUserInput
    ministerio?: MinisterioCreateNestedManyWithoutUserInput
    news?: NewCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenCreateNestedManyWithoutUserInput
    sobre?: SobreCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedCreateNestedManyWithoutUserInput
    contato?: ContatoUncheckedCreateNestedManyWithoutUserInput
    doacao?: DoacaoUncheckedCreateNestedManyWithoutUserInput
    endereco?: EnderecoUncheckedCreateNestedManyWithoutUserInput
    ministerio?: MinisterioUncheckedCreateNestedManyWithoutUserInput
    news?: NewUncheckedCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    sobre?: SobreUncheckedCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderUncheckedCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUpdateManyWithoutUserNestedInput
    contato?: ContatoUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUpdateManyWithoutUserNestedInput
    news?: NewUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput
    sobre?: SobreUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedUpdateManyWithoutUserNestedInput
    contato?: ContatoUncheckedUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUncheckedUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUncheckedUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUncheckedUpdateManyWithoutUserNestedInput
    news?: NewUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    sobre?: SobreUncheckedUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUncheckedUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
  }

  export type NewCreateInput = {
    id?: string
    coverUrl?: string | null
    videoUrl?: string | null
    content: string
    title: string
    createdAt?: Date | string
    isPublic?: boolean
    page: string
    updatedAt?: Date | string
    destaque?: boolean
    url: string
    role: $Enums.MinistryRole
    user: UserCreateNestedOneWithoutNewsInput
  }

  export type NewUncheckedCreateInput = {
    id?: string
    userId: string
    coverUrl?: string | null
    videoUrl?: string | null
    content: string
    title: string
    createdAt?: Date | string
    isPublic?: boolean
    page: string
    updatedAt?: Date | string
    destaque?: boolean
    url: string
    role: $Enums.MinistryRole
  }

  export type NewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    page?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    destaque?: BoolFieldUpdateOperationsInput | boolean
    url?: StringFieldUpdateOperationsInput | string
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
    user?: UserUpdateOneRequiredWithoutNewsNestedInput
  }

  export type NewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    page?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    destaque?: BoolFieldUpdateOperationsInput | boolean
    url?: StringFieldUpdateOperationsInput | string
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
  }

  export type NewCreateManyInput = {
    id?: string
    userId: string
    coverUrl?: string | null
    videoUrl?: string | null
    content: string
    title: string
    createdAt?: Date | string
    isPublic?: boolean
    page: string
    updatedAt?: Date | string
    destaque?: boolean
    url: string
    role: $Enums.MinistryRole
  }

  export type NewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    page?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    destaque?: BoolFieldUpdateOperationsInput | boolean
    url?: StringFieldUpdateOperationsInput | string
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
  }

  export type NewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    page?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    destaque?: BoolFieldUpdateOperationsInput | boolean
    url?: StringFieldUpdateOperationsInput | string
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
  }

  export type MinisterioCreateInput = {
    id?: string
    name: string
    title: string
    local: string
    isPublic?: boolean
    createdAt?: Date | string
    coverUrl: string
    updatedAt?: Date | string
    role: $Enums.MinistryRole
    user: UserCreateNestedOneWithoutMinisterioInput
  }

  export type MinisterioUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    title: string
    local: string
    isPublic?: boolean
    createdAt?: Date | string
    coverUrl: string
    updatedAt?: Date | string
    role: $Enums.MinistryRole
  }

  export type MinisterioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
    user?: UserUpdateOneRequiredWithoutMinisterioNestedInput
  }

  export type MinisterioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
  }

  export type MinisterioCreateManyInput = {
    id?: string
    userId: string
    name: string
    title: string
    local: string
    isPublic?: boolean
    createdAt?: Date | string
    coverUrl: string
    updatedAt?: Date | string
    role: $Enums.MinistryRole
  }

  export type MinisterioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
  }

  export type MinisterioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
  }

  export type AgendaCreateInput = {
    id?: string
    day: string
    name: string
    hour: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    destaque?: boolean
    role: $Enums.MinistryRole
    user: UserCreateNestedOneWithoutAgendaInput
  }

  export type AgendaUncheckedCreateInput = {
    id?: string
    userId: string
    day: string
    name: string
    hour: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    destaque?: boolean
    role: $Enums.MinistryRole
  }

  export type AgendaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    day?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    hour?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    destaque?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
    user?: UserUpdateOneRequiredWithoutAgendaNestedInput
  }

  export type AgendaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    day?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    hour?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    destaque?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
  }

  export type AgendaCreateManyInput = {
    id?: string
    userId: string
    day: string
    name: string
    hour: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    destaque?: boolean
    role: $Enums.MinistryRole
  }

  export type AgendaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    day?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    hour?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    destaque?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
  }

  export type AgendaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    day?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    hour?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    destaque?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
  }

  export type DoacaoCreateInput = {
    id?: string
    local: string
    banco: string
    conta: string
    agencia: string
    nomebanco: string
    pix: string
    nomepix: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDoacaoInput
  }

  export type DoacaoUncheckedCreateInput = {
    id?: string
    userId: string
    local: string
    banco: string
    conta: string
    agencia: string
    nomebanco: string
    pix: string
    nomepix: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoacaoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    banco?: StringFieldUpdateOperationsInput | string
    conta?: StringFieldUpdateOperationsInput | string
    agencia?: StringFieldUpdateOperationsInput | string
    nomebanco?: StringFieldUpdateOperationsInput | string
    pix?: StringFieldUpdateOperationsInput | string
    nomepix?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDoacaoNestedInput
  }

  export type DoacaoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    banco?: StringFieldUpdateOperationsInput | string
    conta?: StringFieldUpdateOperationsInput | string
    agencia?: StringFieldUpdateOperationsInput | string
    nomebanco?: StringFieldUpdateOperationsInput | string
    pix?: StringFieldUpdateOperationsInput | string
    nomepix?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoacaoCreateManyInput = {
    id?: string
    userId: string
    local: string
    banco: string
    conta: string
    agencia: string
    nomebanco: string
    pix: string
    nomepix: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoacaoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    banco?: StringFieldUpdateOperationsInput | string
    conta?: StringFieldUpdateOperationsInput | string
    agencia?: StringFieldUpdateOperationsInput | string
    nomebanco?: StringFieldUpdateOperationsInput | string
    pix?: StringFieldUpdateOperationsInput | string
    nomepix?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoacaoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    banco?: StringFieldUpdateOperationsInput | string
    conta?: StringFieldUpdateOperationsInput | string
    agencia?: StringFieldUpdateOperationsInput | string
    nomebanco?: StringFieldUpdateOperationsInput | string
    pix?: StringFieldUpdateOperationsInput | string
    nomepix?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnderecoCreateInput = {
    id?: string
    local: string
    rua: string
    cep: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    numero?: string | null
    cidade?: string | null
    user: UserCreateNestedOneWithoutEnderecoInput
  }

  export type EnderecoUncheckedCreateInput = {
    id?: string
    userId: string
    local: string
    rua: string
    cep: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    numero?: string | null
    cidade?: string | null
  }

  export type EnderecoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    cep?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutEnderecoNestedInput
  }

  export type EnderecoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    cep?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnderecoCreateManyInput = {
    id?: string
    userId: string
    local: string
    rua: string
    cep: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    numero?: string | null
    cidade?: string | null
  }

  export type EnderecoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    cep?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnderecoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    cep?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ContatoCreateInput = {
    id?: string
    local: string
    whatsapp: string
    facebook: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    instagram: string
    user: UserCreateNestedOneWithoutContatoInput
  }

  export type ContatoUncheckedCreateInput = {
    id?: string
    userId: string
    local: string
    whatsapp: string
    facebook: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    instagram: string
  }

  export type ContatoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    facebook?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instagram?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutContatoNestedInput
  }

  export type ContatoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    facebook?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instagram?: StringFieldUpdateOperationsInput | string
  }

  export type ContatoCreateManyInput = {
    id?: string
    userId: string
    local: string
    whatsapp: string
    facebook: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    instagram: string
  }

  export type ContatoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    facebook?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instagram?: StringFieldUpdateOperationsInput | string
  }

  export type ContatoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    facebook?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instagram?: StringFieldUpdateOperationsInput | string
  }

  export type SobreCreateInput = {
    id?: string
    coverUrl: string
    content: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPublic?: boolean
    user: UserCreateNestedOneWithoutSobreInput
  }

  export type SobreUncheckedCreateInput = {
    id?: string
    userId: string
    coverUrl: string
    content: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPublic?: boolean
  }

  export type SobreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutSobreNestedInput
  }

  export type SobreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SobreCreateManyInput = {
    id?: string
    userId: string
    coverUrl: string
    content: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPublic?: boolean
  }

  export type SobreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SobreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SobreLiderCreateInput = {
    id?: string
    coverUrl: string
    name: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPublic?: boolean
    user: UserCreateNestedOneWithoutSobreLiderInput
  }

  export type SobreLiderUncheckedCreateInput = {
    id?: string
    userId: string
    coverUrl: string
    name: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPublic?: boolean
  }

  export type SobreLiderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutSobreLiderNestedInput
  }

  export type SobreLiderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SobreLiderCreateManyInput = {
    id?: string
    userId: string
    coverUrl: string
    name: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPublic?: boolean
  }

  export type SobreLiderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SobreLiderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RefreshTokenCreateInput = {
    id?: string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRefreshTokenInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    token: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRefreshTokenNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    token: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateInput = {
    id?: string
    token: string
    createdAt?: Date | string
    expiresAt: Date | string
    user: UserCreateNestedOneWithoutPasswordResetTokenInput
  }

  export type PasswordResetTokenUncheckedCreateInput = {
    id?: string
    token: string
    userId: string
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type PasswordResetTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPasswordResetTokenNestedInput
  }

  export type PasswordResetTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenCreateManyInput = {
    id?: string
    token: string
    userId: string
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type PasswordResetTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestemunhoCreateInput = {
    id?: string
    name: string
    avatarUrl: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPublic?: boolean
    coverUrl?: string | null
    ministryRole?: $Enums.MinistryRole | null
    user: UserCreateNestedOneWithoutTestemunhosInput
  }

  export type TestemunhoUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    avatarUrl: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPublic?: boolean
    coverUrl?: string | null
    ministryRole?: $Enums.MinistryRole | null
  }

  export type TestemunhoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    user?: UserUpdateOneRequiredWithoutTestemunhosNestedInput
  }

  export type TestemunhoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
  }

  export type TestemunhoCreateManyInput = {
    id?: string
    userId: string
    name: string
    avatarUrl: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPublic?: boolean
    coverUrl?: string | null
    ministryRole?: $Enums.MinistryRole | null
  }

  export type TestemunhoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
  }

  export type TestemunhoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    entityType: string
    entityId: string
    userName: string
    userRole: string
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    user: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    action: string
    entityType: string
    entityId: string
    userId: string
    userName: string
    userRole: string
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userRole?: StringFieldUpdateOperationsInput | string
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userRole?: StringFieldUpdateOperationsInput | string
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogCreateManyInput = {
    id?: string
    action: string
    entityType: string
    entityId: string
    userId: string
    userName: string
    userRole: string
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userRole?: StringFieldUpdateOperationsInput | string
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userRole?: StringFieldUpdateOperationsInput | string
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type EnumMinistryRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.MinistryRole | EnumMinistryRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.MinistryRole[] | ListEnumMinistryRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MinistryRole[] | ListEnumMinistryRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMinistryRoleNullableFilter<$PrismaModel> | $Enums.MinistryRole | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumCargoRoleNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.CargoRole[] | ListEnumCargoRoleFieldRefInput<$PrismaModel> | null
    has?: $Enums.CargoRole | EnumCargoRoleFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.CargoRole[] | ListEnumCargoRoleFieldRefInput<$PrismaModel>
    hasSome?: $Enums.CargoRole[] | ListEnumCargoRoleFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type AgendaListRelationFilter = {
    every?: AgendaWhereInput
    some?: AgendaWhereInput
    none?: AgendaWhereInput
  }

  export type ContatoListRelationFilter = {
    every?: ContatoWhereInput
    some?: ContatoWhereInput
    none?: ContatoWhereInput
  }

  export type DoacaoListRelationFilter = {
    every?: DoacaoWhereInput
    some?: DoacaoWhereInput
    none?: DoacaoWhereInput
  }

  export type EnderecoListRelationFilter = {
    every?: EnderecoWhereInput
    some?: EnderecoWhereInput
    none?: EnderecoWhereInput
  }

  export type MinisterioListRelationFilter = {
    every?: MinisterioWhereInput
    some?: MinisterioWhereInput
    none?: MinisterioWhereInput
  }

  export type NewListRelationFilter = {
    every?: NewWhereInput
    some?: NewWhereInput
    none?: NewWhereInput
  }

  export type PasswordResetTokenListRelationFilter = {
    every?: PasswordResetTokenWhereInput
    some?: PasswordResetTokenWhereInput
    none?: PasswordResetTokenWhereInput
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type SobreListRelationFilter = {
    every?: SobreWhereInput
    some?: SobreWhereInput
    none?: SobreWhereInput
  }

  export type SobreLiderListRelationFilter = {
    every?: SobreLiderWhereInput
    some?: SobreLiderWhereInput
    none?: SobreLiderWhereInput
  }

  export type TestemunhoListRelationFilter = {
    every?: TestemunhoWhereInput
    some?: TestemunhoWhereInput
    none?: TestemunhoWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AgendaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContatoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DoacaoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EnderecoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MinisterioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PasswordResetTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SobreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SobreLiderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TestemunhoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    login?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    password?: SortOrder
    role?: SortOrder
    ministryRole?: SortOrder
    expires?: SortOrder
    cargo?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    login?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    password?: SortOrder
    role?: SortOrder
    ministryRole?: SortOrder
    expires?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    login?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    password?: SortOrder
    role?: SortOrder
    ministryRole?: SortOrder
    expires?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type EnumMinistryRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MinistryRole | EnumMinistryRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.MinistryRole[] | ListEnumMinistryRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MinistryRole[] | ListEnumMinistryRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMinistryRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.MinistryRole | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumMinistryRoleNullableFilter<$PrismaModel>
    _max?: NestedEnumMinistryRoleNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumMinistryRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.MinistryRole | EnumMinistryRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MinistryRole[] | ListEnumMinistryRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MinistryRole[] | ListEnumMinistryRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMinistryRoleFilter<$PrismaModel> | $Enums.MinistryRole
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type NewCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    coverUrl?: SortOrder
    videoUrl?: SortOrder
    content?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    isPublic?: SortOrder
    page?: SortOrder
    updatedAt?: SortOrder
    destaque?: SortOrder
    url?: SortOrder
    role?: SortOrder
  }

  export type NewMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    coverUrl?: SortOrder
    videoUrl?: SortOrder
    content?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    isPublic?: SortOrder
    page?: SortOrder
    updatedAt?: SortOrder
    destaque?: SortOrder
    url?: SortOrder
    role?: SortOrder
  }

  export type NewMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    coverUrl?: SortOrder
    videoUrl?: SortOrder
    content?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    isPublic?: SortOrder
    page?: SortOrder
    updatedAt?: SortOrder
    destaque?: SortOrder
    url?: SortOrder
    role?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumMinistryRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MinistryRole | EnumMinistryRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MinistryRole[] | ListEnumMinistryRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MinistryRole[] | ListEnumMinistryRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMinistryRoleWithAggregatesFilter<$PrismaModel> | $Enums.MinistryRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMinistryRoleFilter<$PrismaModel>
    _max?: NestedEnumMinistryRoleFilter<$PrismaModel>
  }

  export type MinisterioCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    title?: SortOrder
    local?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    coverUrl?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
  }

  export type MinisterioMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    title?: SortOrder
    local?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    coverUrl?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
  }

  export type MinisterioMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    title?: SortOrder
    local?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    coverUrl?: SortOrder
    updatedAt?: SortOrder
    role?: SortOrder
  }

  export type AgendaCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    day?: SortOrder
    name?: SortOrder
    hour?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    destaque?: SortOrder
    role?: SortOrder
  }

  export type AgendaMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    day?: SortOrder
    name?: SortOrder
    hour?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    destaque?: SortOrder
    role?: SortOrder
  }

  export type AgendaMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    day?: SortOrder
    name?: SortOrder
    hour?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    destaque?: SortOrder
    role?: SortOrder
  }

  export type DoacaoCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    local?: SortOrder
    banco?: SortOrder
    conta?: SortOrder
    agencia?: SortOrder
    nomebanco?: SortOrder
    pix?: SortOrder
    nomepix?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoacaoMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    local?: SortOrder
    banco?: SortOrder
    conta?: SortOrder
    agencia?: SortOrder
    nomebanco?: SortOrder
    pix?: SortOrder
    nomepix?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoacaoMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    local?: SortOrder
    banco?: SortOrder
    conta?: SortOrder
    agencia?: SortOrder
    nomebanco?: SortOrder
    pix?: SortOrder
    nomepix?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnderecoCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    local?: SortOrder
    rua?: SortOrder
    cep?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    numero?: SortOrder
    cidade?: SortOrder
  }

  export type EnderecoMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    local?: SortOrder
    rua?: SortOrder
    cep?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    numero?: SortOrder
    cidade?: SortOrder
  }

  export type EnderecoMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    local?: SortOrder
    rua?: SortOrder
    cep?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    numero?: SortOrder
    cidade?: SortOrder
  }

  export type ContatoCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    local?: SortOrder
    whatsapp?: SortOrder
    facebook?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    instagram?: SortOrder
  }

  export type ContatoMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    local?: SortOrder
    whatsapp?: SortOrder
    facebook?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    instagram?: SortOrder
  }

  export type ContatoMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    local?: SortOrder
    whatsapp?: SortOrder
    facebook?: SortOrder
    isPublic?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    instagram?: SortOrder
  }

  export type SobreCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    coverUrl?: SortOrder
    content?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPublic?: SortOrder
  }

  export type SobreMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    coverUrl?: SortOrder
    content?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPublic?: SortOrder
  }

  export type SobreMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    coverUrl?: SortOrder
    content?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPublic?: SortOrder
  }

  export type SobreLiderCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    coverUrl?: SortOrder
    name?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPublic?: SortOrder
  }

  export type SobreLiderMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    coverUrl?: SortOrder
    name?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPublic?: SortOrder
  }

  export type SobreLiderMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    coverUrl?: SortOrder
    name?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPublic?: SortOrder
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PasswordResetTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type PasswordResetTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type PasswordResetTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type TestemunhoCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPublic?: SortOrder
    coverUrl?: SortOrder
    ministryRole?: SortOrder
  }

  export type TestemunhoMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPublic?: SortOrder
    coverUrl?: SortOrder
    ministryRole?: SortOrder
  }

  export type TestemunhoMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    isPublic?: SortOrder
    coverUrl?: SortOrder
    ministryRole?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    userRole?: SortOrder
    oldData?: SortOrder
    newData?: SortOrder
    changes?: SortOrder
    timestamp?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    userRole?: SortOrder
    timestamp?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    userId?: SortOrder
    userName?: SortOrder
    userRole?: SortOrder
    timestamp?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type UserCreatecargoInput = {
    set: $Enums.CargoRole[]
  }

  export type AgendaCreateNestedManyWithoutUserInput = {
    create?: XOR<AgendaCreateWithoutUserInput, AgendaUncheckedCreateWithoutUserInput> | AgendaCreateWithoutUserInput[] | AgendaUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgendaCreateOrConnectWithoutUserInput | AgendaCreateOrConnectWithoutUserInput[]
    createMany?: AgendaCreateManyUserInputEnvelope
    connect?: AgendaWhereUniqueInput | AgendaWhereUniqueInput[]
  }

  export type ContatoCreateNestedManyWithoutUserInput = {
    create?: XOR<ContatoCreateWithoutUserInput, ContatoUncheckedCreateWithoutUserInput> | ContatoCreateWithoutUserInput[] | ContatoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContatoCreateOrConnectWithoutUserInput | ContatoCreateOrConnectWithoutUserInput[]
    createMany?: ContatoCreateManyUserInputEnvelope
    connect?: ContatoWhereUniqueInput | ContatoWhereUniqueInput[]
  }

  export type DoacaoCreateNestedManyWithoutUserInput = {
    create?: XOR<DoacaoCreateWithoutUserInput, DoacaoUncheckedCreateWithoutUserInput> | DoacaoCreateWithoutUserInput[] | DoacaoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DoacaoCreateOrConnectWithoutUserInput | DoacaoCreateOrConnectWithoutUserInput[]
    createMany?: DoacaoCreateManyUserInputEnvelope
    connect?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
  }

  export type EnderecoCreateNestedManyWithoutUserInput = {
    create?: XOR<EnderecoCreateWithoutUserInput, EnderecoUncheckedCreateWithoutUserInput> | EnderecoCreateWithoutUserInput[] | EnderecoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EnderecoCreateOrConnectWithoutUserInput | EnderecoCreateOrConnectWithoutUserInput[]
    createMany?: EnderecoCreateManyUserInputEnvelope
    connect?: EnderecoWhereUniqueInput | EnderecoWhereUniqueInput[]
  }

  export type MinisterioCreateNestedManyWithoutUserInput = {
    create?: XOR<MinisterioCreateWithoutUserInput, MinisterioUncheckedCreateWithoutUserInput> | MinisterioCreateWithoutUserInput[] | MinisterioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MinisterioCreateOrConnectWithoutUserInput | MinisterioCreateOrConnectWithoutUserInput[]
    createMany?: MinisterioCreateManyUserInputEnvelope
    connect?: MinisterioWhereUniqueInput | MinisterioWhereUniqueInput[]
  }

  export type NewCreateNestedManyWithoutUserInput = {
    create?: XOR<NewCreateWithoutUserInput, NewUncheckedCreateWithoutUserInput> | NewCreateWithoutUserInput[] | NewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NewCreateOrConnectWithoutUserInput | NewCreateOrConnectWithoutUserInput[]
    createMany?: NewCreateManyUserInputEnvelope
    connect?: NewWhereUniqueInput | NewWhereUniqueInput[]
  }

  export type PasswordResetTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
  }

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type SobreCreateNestedManyWithoutUserInput = {
    create?: XOR<SobreCreateWithoutUserInput, SobreUncheckedCreateWithoutUserInput> | SobreCreateWithoutUserInput[] | SobreUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SobreCreateOrConnectWithoutUserInput | SobreCreateOrConnectWithoutUserInput[]
    createMany?: SobreCreateManyUserInputEnvelope
    connect?: SobreWhereUniqueInput | SobreWhereUniqueInput[]
  }

  export type SobreLiderCreateNestedManyWithoutUserInput = {
    create?: XOR<SobreLiderCreateWithoutUserInput, SobreLiderUncheckedCreateWithoutUserInput> | SobreLiderCreateWithoutUserInput[] | SobreLiderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SobreLiderCreateOrConnectWithoutUserInput | SobreLiderCreateOrConnectWithoutUserInput[]
    createMany?: SobreLiderCreateManyUserInputEnvelope
    connect?: SobreLiderWhereUniqueInput | SobreLiderWhereUniqueInput[]
  }

  export type TestemunhoCreateNestedManyWithoutUserInput = {
    create?: XOR<TestemunhoCreateWithoutUserInput, TestemunhoUncheckedCreateWithoutUserInput> | TestemunhoCreateWithoutUserInput[] | TestemunhoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TestemunhoCreateOrConnectWithoutUserInput | TestemunhoCreateOrConnectWithoutUserInput[]
    createMany?: TestemunhoCreateManyUserInputEnvelope
    connect?: TestemunhoWhereUniqueInput | TestemunhoWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type AgendaUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AgendaCreateWithoutUserInput, AgendaUncheckedCreateWithoutUserInput> | AgendaCreateWithoutUserInput[] | AgendaUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgendaCreateOrConnectWithoutUserInput | AgendaCreateOrConnectWithoutUserInput[]
    createMany?: AgendaCreateManyUserInputEnvelope
    connect?: AgendaWhereUniqueInput | AgendaWhereUniqueInput[]
  }

  export type ContatoUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ContatoCreateWithoutUserInput, ContatoUncheckedCreateWithoutUserInput> | ContatoCreateWithoutUserInput[] | ContatoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContatoCreateOrConnectWithoutUserInput | ContatoCreateOrConnectWithoutUserInput[]
    createMany?: ContatoCreateManyUserInputEnvelope
    connect?: ContatoWhereUniqueInput | ContatoWhereUniqueInput[]
  }

  export type DoacaoUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DoacaoCreateWithoutUserInput, DoacaoUncheckedCreateWithoutUserInput> | DoacaoCreateWithoutUserInput[] | DoacaoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DoacaoCreateOrConnectWithoutUserInput | DoacaoCreateOrConnectWithoutUserInput[]
    createMany?: DoacaoCreateManyUserInputEnvelope
    connect?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
  }

  export type EnderecoUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EnderecoCreateWithoutUserInput, EnderecoUncheckedCreateWithoutUserInput> | EnderecoCreateWithoutUserInput[] | EnderecoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EnderecoCreateOrConnectWithoutUserInput | EnderecoCreateOrConnectWithoutUserInput[]
    createMany?: EnderecoCreateManyUserInputEnvelope
    connect?: EnderecoWhereUniqueInput | EnderecoWhereUniqueInput[]
  }

  export type MinisterioUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MinisterioCreateWithoutUserInput, MinisterioUncheckedCreateWithoutUserInput> | MinisterioCreateWithoutUserInput[] | MinisterioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MinisterioCreateOrConnectWithoutUserInput | MinisterioCreateOrConnectWithoutUserInput[]
    createMany?: MinisterioCreateManyUserInputEnvelope
    connect?: MinisterioWhereUniqueInput | MinisterioWhereUniqueInput[]
  }

  export type NewUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NewCreateWithoutUserInput, NewUncheckedCreateWithoutUserInput> | NewCreateWithoutUserInput[] | NewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NewCreateOrConnectWithoutUserInput | NewCreateOrConnectWithoutUserInput[]
    createMany?: NewCreateManyUserInputEnvelope
    connect?: NewWhereUniqueInput | NewWhereUniqueInput[]
  }

  export type PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type SobreUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SobreCreateWithoutUserInput, SobreUncheckedCreateWithoutUserInput> | SobreCreateWithoutUserInput[] | SobreUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SobreCreateOrConnectWithoutUserInput | SobreCreateOrConnectWithoutUserInput[]
    createMany?: SobreCreateManyUserInputEnvelope
    connect?: SobreWhereUniqueInput | SobreWhereUniqueInput[]
  }

  export type SobreLiderUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SobreLiderCreateWithoutUserInput, SobreLiderUncheckedCreateWithoutUserInput> | SobreLiderCreateWithoutUserInput[] | SobreLiderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SobreLiderCreateOrConnectWithoutUserInput | SobreLiderCreateOrConnectWithoutUserInput[]
    createMany?: SobreLiderCreateManyUserInputEnvelope
    connect?: SobreLiderWhereUniqueInput | SobreLiderWhereUniqueInput[]
  }

  export type TestemunhoUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TestemunhoCreateWithoutUserInput, TestemunhoUncheckedCreateWithoutUserInput> | TestemunhoCreateWithoutUserInput[] | TestemunhoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TestemunhoCreateOrConnectWithoutUserInput | TestemunhoCreateOrConnectWithoutUserInput[]
    createMany?: TestemunhoCreateManyUserInputEnvelope
    connect?: TestemunhoWhereUniqueInput | TestemunhoWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableEnumMinistryRoleFieldUpdateOperationsInput = {
    set?: $Enums.MinistryRole | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdatecargoInput = {
    set?: $Enums.CargoRole[]
    push?: $Enums.CargoRole | $Enums.CargoRole[]
  }

  export type AgendaUpdateManyWithoutUserNestedInput = {
    create?: XOR<AgendaCreateWithoutUserInput, AgendaUncheckedCreateWithoutUserInput> | AgendaCreateWithoutUserInput[] | AgendaUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgendaCreateOrConnectWithoutUserInput | AgendaCreateOrConnectWithoutUserInput[]
    upsert?: AgendaUpsertWithWhereUniqueWithoutUserInput | AgendaUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AgendaCreateManyUserInputEnvelope
    set?: AgendaWhereUniqueInput | AgendaWhereUniqueInput[]
    disconnect?: AgendaWhereUniqueInput | AgendaWhereUniqueInput[]
    delete?: AgendaWhereUniqueInput | AgendaWhereUniqueInput[]
    connect?: AgendaWhereUniqueInput | AgendaWhereUniqueInput[]
    update?: AgendaUpdateWithWhereUniqueWithoutUserInput | AgendaUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AgendaUpdateManyWithWhereWithoutUserInput | AgendaUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AgendaScalarWhereInput | AgendaScalarWhereInput[]
  }

  export type ContatoUpdateManyWithoutUserNestedInput = {
    create?: XOR<ContatoCreateWithoutUserInput, ContatoUncheckedCreateWithoutUserInput> | ContatoCreateWithoutUserInput[] | ContatoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContatoCreateOrConnectWithoutUserInput | ContatoCreateOrConnectWithoutUserInput[]
    upsert?: ContatoUpsertWithWhereUniqueWithoutUserInput | ContatoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ContatoCreateManyUserInputEnvelope
    set?: ContatoWhereUniqueInput | ContatoWhereUniqueInput[]
    disconnect?: ContatoWhereUniqueInput | ContatoWhereUniqueInput[]
    delete?: ContatoWhereUniqueInput | ContatoWhereUniqueInput[]
    connect?: ContatoWhereUniqueInput | ContatoWhereUniqueInput[]
    update?: ContatoUpdateWithWhereUniqueWithoutUserInput | ContatoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ContatoUpdateManyWithWhereWithoutUserInput | ContatoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ContatoScalarWhereInput | ContatoScalarWhereInput[]
  }

  export type DoacaoUpdateManyWithoutUserNestedInput = {
    create?: XOR<DoacaoCreateWithoutUserInput, DoacaoUncheckedCreateWithoutUserInput> | DoacaoCreateWithoutUserInput[] | DoacaoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DoacaoCreateOrConnectWithoutUserInput | DoacaoCreateOrConnectWithoutUserInput[]
    upsert?: DoacaoUpsertWithWhereUniqueWithoutUserInput | DoacaoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DoacaoCreateManyUserInputEnvelope
    set?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    disconnect?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    delete?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    connect?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    update?: DoacaoUpdateWithWhereUniqueWithoutUserInput | DoacaoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DoacaoUpdateManyWithWhereWithoutUserInput | DoacaoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DoacaoScalarWhereInput | DoacaoScalarWhereInput[]
  }

  export type EnderecoUpdateManyWithoutUserNestedInput = {
    create?: XOR<EnderecoCreateWithoutUserInput, EnderecoUncheckedCreateWithoutUserInput> | EnderecoCreateWithoutUserInput[] | EnderecoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EnderecoCreateOrConnectWithoutUserInput | EnderecoCreateOrConnectWithoutUserInput[]
    upsert?: EnderecoUpsertWithWhereUniqueWithoutUserInput | EnderecoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EnderecoCreateManyUserInputEnvelope
    set?: EnderecoWhereUniqueInput | EnderecoWhereUniqueInput[]
    disconnect?: EnderecoWhereUniqueInput | EnderecoWhereUniqueInput[]
    delete?: EnderecoWhereUniqueInput | EnderecoWhereUniqueInput[]
    connect?: EnderecoWhereUniqueInput | EnderecoWhereUniqueInput[]
    update?: EnderecoUpdateWithWhereUniqueWithoutUserInput | EnderecoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EnderecoUpdateManyWithWhereWithoutUserInput | EnderecoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EnderecoScalarWhereInput | EnderecoScalarWhereInput[]
  }

  export type MinisterioUpdateManyWithoutUserNestedInput = {
    create?: XOR<MinisterioCreateWithoutUserInput, MinisterioUncheckedCreateWithoutUserInput> | MinisterioCreateWithoutUserInput[] | MinisterioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MinisterioCreateOrConnectWithoutUserInput | MinisterioCreateOrConnectWithoutUserInput[]
    upsert?: MinisterioUpsertWithWhereUniqueWithoutUserInput | MinisterioUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MinisterioCreateManyUserInputEnvelope
    set?: MinisterioWhereUniqueInput | MinisterioWhereUniqueInput[]
    disconnect?: MinisterioWhereUniqueInput | MinisterioWhereUniqueInput[]
    delete?: MinisterioWhereUniqueInput | MinisterioWhereUniqueInput[]
    connect?: MinisterioWhereUniqueInput | MinisterioWhereUniqueInput[]
    update?: MinisterioUpdateWithWhereUniqueWithoutUserInput | MinisterioUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MinisterioUpdateManyWithWhereWithoutUserInput | MinisterioUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MinisterioScalarWhereInput | MinisterioScalarWhereInput[]
  }

  export type NewUpdateManyWithoutUserNestedInput = {
    create?: XOR<NewCreateWithoutUserInput, NewUncheckedCreateWithoutUserInput> | NewCreateWithoutUserInput[] | NewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NewCreateOrConnectWithoutUserInput | NewCreateOrConnectWithoutUserInput[]
    upsert?: NewUpsertWithWhereUniqueWithoutUserInput | NewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NewCreateManyUserInputEnvelope
    set?: NewWhereUniqueInput | NewWhereUniqueInput[]
    disconnect?: NewWhereUniqueInput | NewWhereUniqueInput[]
    delete?: NewWhereUniqueInput | NewWhereUniqueInput[]
    connect?: NewWhereUniqueInput | NewWhereUniqueInput[]
    update?: NewUpdateWithWhereUniqueWithoutUserInput | NewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NewUpdateManyWithWhereWithoutUserInput | NewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NewScalarWhereInput | NewScalarWhereInput[]
  }

  export type PasswordResetTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput | PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    set?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    disconnect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    delete?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    update?: PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput | PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetTokenUpdateManyWithWhereWithoutUserInput | PasswordResetTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
  }

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type SobreUpdateManyWithoutUserNestedInput = {
    create?: XOR<SobreCreateWithoutUserInput, SobreUncheckedCreateWithoutUserInput> | SobreCreateWithoutUserInput[] | SobreUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SobreCreateOrConnectWithoutUserInput | SobreCreateOrConnectWithoutUserInput[]
    upsert?: SobreUpsertWithWhereUniqueWithoutUserInput | SobreUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SobreCreateManyUserInputEnvelope
    set?: SobreWhereUniqueInput | SobreWhereUniqueInput[]
    disconnect?: SobreWhereUniqueInput | SobreWhereUniqueInput[]
    delete?: SobreWhereUniqueInput | SobreWhereUniqueInput[]
    connect?: SobreWhereUniqueInput | SobreWhereUniqueInput[]
    update?: SobreUpdateWithWhereUniqueWithoutUserInput | SobreUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SobreUpdateManyWithWhereWithoutUserInput | SobreUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SobreScalarWhereInput | SobreScalarWhereInput[]
  }

  export type SobreLiderUpdateManyWithoutUserNestedInput = {
    create?: XOR<SobreLiderCreateWithoutUserInput, SobreLiderUncheckedCreateWithoutUserInput> | SobreLiderCreateWithoutUserInput[] | SobreLiderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SobreLiderCreateOrConnectWithoutUserInput | SobreLiderCreateOrConnectWithoutUserInput[]
    upsert?: SobreLiderUpsertWithWhereUniqueWithoutUserInput | SobreLiderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SobreLiderCreateManyUserInputEnvelope
    set?: SobreLiderWhereUniqueInput | SobreLiderWhereUniqueInput[]
    disconnect?: SobreLiderWhereUniqueInput | SobreLiderWhereUniqueInput[]
    delete?: SobreLiderWhereUniqueInput | SobreLiderWhereUniqueInput[]
    connect?: SobreLiderWhereUniqueInput | SobreLiderWhereUniqueInput[]
    update?: SobreLiderUpdateWithWhereUniqueWithoutUserInput | SobreLiderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SobreLiderUpdateManyWithWhereWithoutUserInput | SobreLiderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SobreLiderScalarWhereInput | SobreLiderScalarWhereInput[]
  }

  export type TestemunhoUpdateManyWithoutUserNestedInput = {
    create?: XOR<TestemunhoCreateWithoutUserInput, TestemunhoUncheckedCreateWithoutUserInput> | TestemunhoCreateWithoutUserInput[] | TestemunhoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TestemunhoCreateOrConnectWithoutUserInput | TestemunhoCreateOrConnectWithoutUserInput[]
    upsert?: TestemunhoUpsertWithWhereUniqueWithoutUserInput | TestemunhoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TestemunhoCreateManyUserInputEnvelope
    set?: TestemunhoWhereUniqueInput | TestemunhoWhereUniqueInput[]
    disconnect?: TestemunhoWhereUniqueInput | TestemunhoWhereUniqueInput[]
    delete?: TestemunhoWhereUniqueInput | TestemunhoWhereUniqueInput[]
    connect?: TestemunhoWhereUniqueInput | TestemunhoWhereUniqueInput[]
    update?: TestemunhoUpdateWithWhereUniqueWithoutUserInput | TestemunhoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TestemunhoUpdateManyWithWhereWithoutUserInput | TestemunhoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TestemunhoScalarWhereInput | TestemunhoScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type AgendaUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AgendaCreateWithoutUserInput, AgendaUncheckedCreateWithoutUserInput> | AgendaCreateWithoutUserInput[] | AgendaUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgendaCreateOrConnectWithoutUserInput | AgendaCreateOrConnectWithoutUserInput[]
    upsert?: AgendaUpsertWithWhereUniqueWithoutUserInput | AgendaUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AgendaCreateManyUserInputEnvelope
    set?: AgendaWhereUniqueInput | AgendaWhereUniqueInput[]
    disconnect?: AgendaWhereUniqueInput | AgendaWhereUniqueInput[]
    delete?: AgendaWhereUniqueInput | AgendaWhereUniqueInput[]
    connect?: AgendaWhereUniqueInput | AgendaWhereUniqueInput[]
    update?: AgendaUpdateWithWhereUniqueWithoutUserInput | AgendaUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AgendaUpdateManyWithWhereWithoutUserInput | AgendaUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AgendaScalarWhereInput | AgendaScalarWhereInput[]
  }

  export type ContatoUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ContatoCreateWithoutUserInput, ContatoUncheckedCreateWithoutUserInput> | ContatoCreateWithoutUserInput[] | ContatoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContatoCreateOrConnectWithoutUserInput | ContatoCreateOrConnectWithoutUserInput[]
    upsert?: ContatoUpsertWithWhereUniqueWithoutUserInput | ContatoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ContatoCreateManyUserInputEnvelope
    set?: ContatoWhereUniqueInput | ContatoWhereUniqueInput[]
    disconnect?: ContatoWhereUniqueInput | ContatoWhereUniqueInput[]
    delete?: ContatoWhereUniqueInput | ContatoWhereUniqueInput[]
    connect?: ContatoWhereUniqueInput | ContatoWhereUniqueInput[]
    update?: ContatoUpdateWithWhereUniqueWithoutUserInput | ContatoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ContatoUpdateManyWithWhereWithoutUserInput | ContatoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ContatoScalarWhereInput | ContatoScalarWhereInput[]
  }

  export type DoacaoUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DoacaoCreateWithoutUserInput, DoacaoUncheckedCreateWithoutUserInput> | DoacaoCreateWithoutUserInput[] | DoacaoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DoacaoCreateOrConnectWithoutUserInput | DoacaoCreateOrConnectWithoutUserInput[]
    upsert?: DoacaoUpsertWithWhereUniqueWithoutUserInput | DoacaoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DoacaoCreateManyUserInputEnvelope
    set?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    disconnect?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    delete?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    connect?: DoacaoWhereUniqueInput | DoacaoWhereUniqueInput[]
    update?: DoacaoUpdateWithWhereUniqueWithoutUserInput | DoacaoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DoacaoUpdateManyWithWhereWithoutUserInput | DoacaoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DoacaoScalarWhereInput | DoacaoScalarWhereInput[]
  }

  export type EnderecoUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EnderecoCreateWithoutUserInput, EnderecoUncheckedCreateWithoutUserInput> | EnderecoCreateWithoutUserInput[] | EnderecoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EnderecoCreateOrConnectWithoutUserInput | EnderecoCreateOrConnectWithoutUserInput[]
    upsert?: EnderecoUpsertWithWhereUniqueWithoutUserInput | EnderecoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EnderecoCreateManyUserInputEnvelope
    set?: EnderecoWhereUniqueInput | EnderecoWhereUniqueInput[]
    disconnect?: EnderecoWhereUniqueInput | EnderecoWhereUniqueInput[]
    delete?: EnderecoWhereUniqueInput | EnderecoWhereUniqueInput[]
    connect?: EnderecoWhereUniqueInput | EnderecoWhereUniqueInput[]
    update?: EnderecoUpdateWithWhereUniqueWithoutUserInput | EnderecoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EnderecoUpdateManyWithWhereWithoutUserInput | EnderecoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EnderecoScalarWhereInput | EnderecoScalarWhereInput[]
  }

  export type MinisterioUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MinisterioCreateWithoutUserInput, MinisterioUncheckedCreateWithoutUserInput> | MinisterioCreateWithoutUserInput[] | MinisterioUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MinisterioCreateOrConnectWithoutUserInput | MinisterioCreateOrConnectWithoutUserInput[]
    upsert?: MinisterioUpsertWithWhereUniqueWithoutUserInput | MinisterioUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MinisterioCreateManyUserInputEnvelope
    set?: MinisterioWhereUniqueInput | MinisterioWhereUniqueInput[]
    disconnect?: MinisterioWhereUniqueInput | MinisterioWhereUniqueInput[]
    delete?: MinisterioWhereUniqueInput | MinisterioWhereUniqueInput[]
    connect?: MinisterioWhereUniqueInput | MinisterioWhereUniqueInput[]
    update?: MinisterioUpdateWithWhereUniqueWithoutUserInput | MinisterioUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MinisterioUpdateManyWithWhereWithoutUserInput | MinisterioUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MinisterioScalarWhereInput | MinisterioScalarWhereInput[]
  }

  export type NewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NewCreateWithoutUserInput, NewUncheckedCreateWithoutUserInput> | NewCreateWithoutUserInput[] | NewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NewCreateOrConnectWithoutUserInput | NewCreateOrConnectWithoutUserInput[]
    upsert?: NewUpsertWithWhereUniqueWithoutUserInput | NewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NewCreateManyUserInputEnvelope
    set?: NewWhereUniqueInput | NewWhereUniqueInput[]
    disconnect?: NewWhereUniqueInput | NewWhereUniqueInput[]
    delete?: NewWhereUniqueInput | NewWhereUniqueInput[]
    connect?: NewWhereUniqueInput | NewWhereUniqueInput[]
    update?: NewUpdateWithWhereUniqueWithoutUserInput | NewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NewUpdateManyWithWhereWithoutUserInput | NewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NewScalarWhereInput | NewScalarWhereInput[]
  }

  export type PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput> | PasswordResetTokenCreateWithoutUserInput[] | PasswordResetTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PasswordResetTokenCreateOrConnectWithoutUserInput | PasswordResetTokenCreateOrConnectWithoutUserInput[]
    upsert?: PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput | PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PasswordResetTokenCreateManyUserInputEnvelope
    set?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    disconnect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    delete?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    connect?: PasswordResetTokenWhereUniqueInput | PasswordResetTokenWhereUniqueInput[]
    update?: PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput | PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PasswordResetTokenUpdateManyWithWhereWithoutUserInput | PasswordResetTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type SobreUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SobreCreateWithoutUserInput, SobreUncheckedCreateWithoutUserInput> | SobreCreateWithoutUserInput[] | SobreUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SobreCreateOrConnectWithoutUserInput | SobreCreateOrConnectWithoutUserInput[]
    upsert?: SobreUpsertWithWhereUniqueWithoutUserInput | SobreUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SobreCreateManyUserInputEnvelope
    set?: SobreWhereUniqueInput | SobreWhereUniqueInput[]
    disconnect?: SobreWhereUniqueInput | SobreWhereUniqueInput[]
    delete?: SobreWhereUniqueInput | SobreWhereUniqueInput[]
    connect?: SobreWhereUniqueInput | SobreWhereUniqueInput[]
    update?: SobreUpdateWithWhereUniqueWithoutUserInput | SobreUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SobreUpdateManyWithWhereWithoutUserInput | SobreUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SobreScalarWhereInput | SobreScalarWhereInput[]
  }

  export type SobreLiderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SobreLiderCreateWithoutUserInput, SobreLiderUncheckedCreateWithoutUserInput> | SobreLiderCreateWithoutUserInput[] | SobreLiderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SobreLiderCreateOrConnectWithoutUserInput | SobreLiderCreateOrConnectWithoutUserInput[]
    upsert?: SobreLiderUpsertWithWhereUniqueWithoutUserInput | SobreLiderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SobreLiderCreateManyUserInputEnvelope
    set?: SobreLiderWhereUniqueInput | SobreLiderWhereUniqueInput[]
    disconnect?: SobreLiderWhereUniqueInput | SobreLiderWhereUniqueInput[]
    delete?: SobreLiderWhereUniqueInput | SobreLiderWhereUniqueInput[]
    connect?: SobreLiderWhereUniqueInput | SobreLiderWhereUniqueInput[]
    update?: SobreLiderUpdateWithWhereUniqueWithoutUserInput | SobreLiderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SobreLiderUpdateManyWithWhereWithoutUserInput | SobreLiderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SobreLiderScalarWhereInput | SobreLiderScalarWhereInput[]
  }

  export type TestemunhoUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TestemunhoCreateWithoutUserInput, TestemunhoUncheckedCreateWithoutUserInput> | TestemunhoCreateWithoutUserInput[] | TestemunhoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TestemunhoCreateOrConnectWithoutUserInput | TestemunhoCreateOrConnectWithoutUserInput[]
    upsert?: TestemunhoUpsertWithWhereUniqueWithoutUserInput | TestemunhoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TestemunhoCreateManyUserInputEnvelope
    set?: TestemunhoWhereUniqueInput | TestemunhoWhereUniqueInput[]
    disconnect?: TestemunhoWhereUniqueInput | TestemunhoWhereUniqueInput[]
    delete?: TestemunhoWhereUniqueInput | TestemunhoWhereUniqueInput[]
    connect?: TestemunhoWhereUniqueInput | TestemunhoWhereUniqueInput[]
    update?: TestemunhoUpdateWithWhereUniqueWithoutUserInput | TestemunhoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TestemunhoUpdateManyWithWhereWithoutUserInput | TestemunhoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TestemunhoScalarWhereInput | TestemunhoScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutNewsInput = {
    create?: XOR<UserCreateWithoutNewsInput, UserUncheckedCreateWithoutNewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNewsInput
    connect?: UserWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumMinistryRoleFieldUpdateOperationsInput = {
    set?: $Enums.MinistryRole
  }

  export type UserUpdateOneRequiredWithoutNewsNestedInput = {
    create?: XOR<UserCreateWithoutNewsInput, UserUncheckedCreateWithoutNewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNewsInput
    upsert?: UserUpsertWithoutNewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNewsInput, UserUpdateWithoutNewsInput>, UserUncheckedUpdateWithoutNewsInput>
  }

  export type UserCreateNestedOneWithoutMinisterioInput = {
    create?: XOR<UserCreateWithoutMinisterioInput, UserUncheckedCreateWithoutMinisterioInput>
    connectOrCreate?: UserCreateOrConnectWithoutMinisterioInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutMinisterioNestedInput = {
    create?: XOR<UserCreateWithoutMinisterioInput, UserUncheckedCreateWithoutMinisterioInput>
    connectOrCreate?: UserCreateOrConnectWithoutMinisterioInput
    upsert?: UserUpsertWithoutMinisterioInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMinisterioInput, UserUpdateWithoutMinisterioInput>, UserUncheckedUpdateWithoutMinisterioInput>
  }

  export type UserCreateNestedOneWithoutAgendaInput = {
    create?: XOR<UserCreateWithoutAgendaInput, UserUncheckedCreateWithoutAgendaInput>
    connectOrCreate?: UserCreateOrConnectWithoutAgendaInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAgendaNestedInput = {
    create?: XOR<UserCreateWithoutAgendaInput, UserUncheckedCreateWithoutAgendaInput>
    connectOrCreate?: UserCreateOrConnectWithoutAgendaInput
    upsert?: UserUpsertWithoutAgendaInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAgendaInput, UserUpdateWithoutAgendaInput>, UserUncheckedUpdateWithoutAgendaInput>
  }

  export type UserCreateNestedOneWithoutDoacaoInput = {
    create?: XOR<UserCreateWithoutDoacaoInput, UserUncheckedCreateWithoutDoacaoInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoacaoInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutDoacaoNestedInput = {
    create?: XOR<UserCreateWithoutDoacaoInput, UserUncheckedCreateWithoutDoacaoInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoacaoInput
    upsert?: UserUpsertWithoutDoacaoInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDoacaoInput, UserUpdateWithoutDoacaoInput>, UserUncheckedUpdateWithoutDoacaoInput>
  }

  export type UserCreateNestedOneWithoutEnderecoInput = {
    create?: XOR<UserCreateWithoutEnderecoInput, UserUncheckedCreateWithoutEnderecoInput>
    connectOrCreate?: UserCreateOrConnectWithoutEnderecoInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutEnderecoNestedInput = {
    create?: XOR<UserCreateWithoutEnderecoInput, UserUncheckedCreateWithoutEnderecoInput>
    connectOrCreate?: UserCreateOrConnectWithoutEnderecoInput
    upsert?: UserUpsertWithoutEnderecoInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEnderecoInput, UserUpdateWithoutEnderecoInput>, UserUncheckedUpdateWithoutEnderecoInput>
  }

  export type UserCreateNestedOneWithoutContatoInput = {
    create?: XOR<UserCreateWithoutContatoInput, UserUncheckedCreateWithoutContatoInput>
    connectOrCreate?: UserCreateOrConnectWithoutContatoInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutContatoNestedInput = {
    create?: XOR<UserCreateWithoutContatoInput, UserUncheckedCreateWithoutContatoInput>
    connectOrCreate?: UserCreateOrConnectWithoutContatoInput
    upsert?: UserUpsertWithoutContatoInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutContatoInput, UserUpdateWithoutContatoInput>, UserUncheckedUpdateWithoutContatoInput>
  }

  export type UserCreateNestedOneWithoutSobreInput = {
    create?: XOR<UserCreateWithoutSobreInput, UserUncheckedCreateWithoutSobreInput>
    connectOrCreate?: UserCreateOrConnectWithoutSobreInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSobreNestedInput = {
    create?: XOR<UserCreateWithoutSobreInput, UserUncheckedCreateWithoutSobreInput>
    connectOrCreate?: UserCreateOrConnectWithoutSobreInput
    upsert?: UserUpsertWithoutSobreInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSobreInput, UserUpdateWithoutSobreInput>, UserUncheckedUpdateWithoutSobreInput>
  }

  export type UserCreateNestedOneWithoutSobreLiderInput = {
    create?: XOR<UserCreateWithoutSobreLiderInput, UserUncheckedCreateWithoutSobreLiderInput>
    connectOrCreate?: UserCreateOrConnectWithoutSobreLiderInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSobreLiderNestedInput = {
    create?: XOR<UserCreateWithoutSobreLiderInput, UserUncheckedCreateWithoutSobreLiderInput>
    connectOrCreate?: UserCreateOrConnectWithoutSobreLiderInput
    upsert?: UserUpsertWithoutSobreLiderInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSobreLiderInput, UserUpdateWithoutSobreLiderInput>, UserUncheckedUpdateWithoutSobreLiderInput>
  }

  export type UserCreateNestedOneWithoutRefreshTokenInput = {
    create?: XOR<UserCreateWithoutRefreshTokenInput, UserUncheckedCreateWithoutRefreshTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokenInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRefreshTokenNestedInput = {
    create?: XOR<UserCreateWithoutRefreshTokenInput, UserUncheckedCreateWithoutRefreshTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokenInput
    upsert?: UserUpsertWithoutRefreshTokenInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefreshTokenInput, UserUpdateWithoutRefreshTokenInput>, UserUncheckedUpdateWithoutRefreshTokenInput>
  }

  export type UserCreateNestedOneWithoutPasswordResetTokenInput = {
    create?: XOR<UserCreateWithoutPasswordResetTokenInput, UserUncheckedCreateWithoutPasswordResetTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetTokenInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPasswordResetTokenNestedInput = {
    create?: XOR<UserCreateWithoutPasswordResetTokenInput, UserUncheckedCreateWithoutPasswordResetTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordResetTokenInput
    upsert?: UserUpsertWithoutPasswordResetTokenInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPasswordResetTokenInput, UserUpdateWithoutPasswordResetTokenInput>, UserUncheckedUpdateWithoutPasswordResetTokenInput>
  }

  export type UserCreateNestedOneWithoutTestemunhosInput = {
    create?: XOR<UserCreateWithoutTestemunhosInput, UserUncheckedCreateWithoutTestemunhosInput>
    connectOrCreate?: UserCreateOrConnectWithoutTestemunhosInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTestemunhosNestedInput = {
    create?: XOR<UserCreateWithoutTestemunhosInput, UserUncheckedCreateWithoutTestemunhosInput>
    connectOrCreate?: UserCreateOrConnectWithoutTestemunhosInput
    upsert?: UserUpsertWithoutTestemunhosInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTestemunhosInput, UserUpdateWithoutTestemunhosInput>, UserUncheckedUpdateWithoutTestemunhosInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedEnumMinistryRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.MinistryRole | EnumMinistryRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.MinistryRole[] | ListEnumMinistryRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MinistryRole[] | ListEnumMinistryRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMinistryRoleNullableFilter<$PrismaModel> | $Enums.MinistryRole | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
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

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedEnumMinistryRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MinistryRole | EnumMinistryRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.MinistryRole[] | ListEnumMinistryRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.MinistryRole[] | ListEnumMinistryRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumMinistryRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.MinistryRole | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumMinistryRoleNullableFilter<$PrismaModel>
    _max?: NestedEnumMinistryRoleNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumMinistryRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.MinistryRole | EnumMinistryRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MinistryRole[] | ListEnumMinistryRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MinistryRole[] | ListEnumMinistryRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMinistryRoleFilter<$PrismaModel> | $Enums.MinistryRole
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumMinistryRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MinistryRole | EnumMinistryRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MinistryRole[] | ListEnumMinistryRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MinistryRole[] | ListEnumMinistryRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMinistryRoleWithAggregatesFilter<$PrismaModel> | $Enums.MinistryRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMinistryRoleFilter<$PrismaModel>
    _max?: NestedEnumMinistryRoleFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AgendaCreateWithoutUserInput = {
    id?: string
    day: string
    name: string
    hour: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    destaque?: boolean
    role: $Enums.MinistryRole
  }

  export type AgendaUncheckedCreateWithoutUserInput = {
    id?: string
    day: string
    name: string
    hour: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    destaque?: boolean
    role: $Enums.MinistryRole
  }

  export type AgendaCreateOrConnectWithoutUserInput = {
    where: AgendaWhereUniqueInput
    create: XOR<AgendaCreateWithoutUserInput, AgendaUncheckedCreateWithoutUserInput>
  }

  export type AgendaCreateManyUserInputEnvelope = {
    data: AgendaCreateManyUserInput | AgendaCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ContatoCreateWithoutUserInput = {
    id?: string
    local: string
    whatsapp: string
    facebook: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    instagram: string
  }

  export type ContatoUncheckedCreateWithoutUserInput = {
    id?: string
    local: string
    whatsapp: string
    facebook: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    instagram: string
  }

  export type ContatoCreateOrConnectWithoutUserInput = {
    where: ContatoWhereUniqueInput
    create: XOR<ContatoCreateWithoutUserInput, ContatoUncheckedCreateWithoutUserInput>
  }

  export type ContatoCreateManyUserInputEnvelope = {
    data: ContatoCreateManyUserInput | ContatoCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DoacaoCreateWithoutUserInput = {
    id?: string
    local: string
    banco: string
    conta: string
    agencia: string
    nomebanco: string
    pix: string
    nomepix: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoacaoUncheckedCreateWithoutUserInput = {
    id?: string
    local: string
    banco: string
    conta: string
    agencia: string
    nomebanco: string
    pix: string
    nomepix: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoacaoCreateOrConnectWithoutUserInput = {
    where: DoacaoWhereUniqueInput
    create: XOR<DoacaoCreateWithoutUserInput, DoacaoUncheckedCreateWithoutUserInput>
  }

  export type DoacaoCreateManyUserInputEnvelope = {
    data: DoacaoCreateManyUserInput | DoacaoCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EnderecoCreateWithoutUserInput = {
    id?: string
    local: string
    rua: string
    cep: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    numero?: string | null
    cidade?: string | null
  }

  export type EnderecoUncheckedCreateWithoutUserInput = {
    id?: string
    local: string
    rua: string
    cep: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    numero?: string | null
    cidade?: string | null
  }

  export type EnderecoCreateOrConnectWithoutUserInput = {
    where: EnderecoWhereUniqueInput
    create: XOR<EnderecoCreateWithoutUserInput, EnderecoUncheckedCreateWithoutUserInput>
  }

  export type EnderecoCreateManyUserInputEnvelope = {
    data: EnderecoCreateManyUserInput | EnderecoCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MinisterioCreateWithoutUserInput = {
    id?: string
    name: string
    title: string
    local: string
    isPublic?: boolean
    createdAt?: Date | string
    coverUrl: string
    updatedAt?: Date | string
    role: $Enums.MinistryRole
  }

  export type MinisterioUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    title: string
    local: string
    isPublic?: boolean
    createdAt?: Date | string
    coverUrl: string
    updatedAt?: Date | string
    role: $Enums.MinistryRole
  }

  export type MinisterioCreateOrConnectWithoutUserInput = {
    where: MinisterioWhereUniqueInput
    create: XOR<MinisterioCreateWithoutUserInput, MinisterioUncheckedCreateWithoutUserInput>
  }

  export type MinisterioCreateManyUserInputEnvelope = {
    data: MinisterioCreateManyUserInput | MinisterioCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NewCreateWithoutUserInput = {
    id?: string
    coverUrl?: string | null
    videoUrl?: string | null
    content: string
    title: string
    createdAt?: Date | string
    isPublic?: boolean
    page: string
    updatedAt?: Date | string
    destaque?: boolean
    url: string
    role: $Enums.MinistryRole
  }

  export type NewUncheckedCreateWithoutUserInput = {
    id?: string
    coverUrl?: string | null
    videoUrl?: string | null
    content: string
    title: string
    createdAt?: Date | string
    isPublic?: boolean
    page: string
    updatedAt?: Date | string
    destaque?: boolean
    url: string
    role: $Enums.MinistryRole
  }

  export type NewCreateOrConnectWithoutUserInput = {
    where: NewWhereUniqueInput
    create: XOR<NewCreateWithoutUserInput, NewUncheckedCreateWithoutUserInput>
  }

  export type NewCreateManyUserInputEnvelope = {
    data: NewCreateManyUserInput | NewCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PasswordResetTokenCreateWithoutUserInput = {
    id?: string
    token: string
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type PasswordResetTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type PasswordResetTokenCreateOrConnectWithoutUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    create: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetTokenCreateManyUserInputEnvelope = {
    data: PasswordResetTokenCreateManyUserInput | PasswordResetTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SobreCreateWithoutUserInput = {
    id?: string
    coverUrl: string
    content: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPublic?: boolean
  }

  export type SobreUncheckedCreateWithoutUserInput = {
    id?: string
    coverUrl: string
    content: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPublic?: boolean
  }

  export type SobreCreateOrConnectWithoutUserInput = {
    where: SobreWhereUniqueInput
    create: XOR<SobreCreateWithoutUserInput, SobreUncheckedCreateWithoutUserInput>
  }

  export type SobreCreateManyUserInputEnvelope = {
    data: SobreCreateManyUserInput | SobreCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SobreLiderCreateWithoutUserInput = {
    id?: string
    coverUrl: string
    name: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPublic?: boolean
  }

  export type SobreLiderUncheckedCreateWithoutUserInput = {
    id?: string
    coverUrl: string
    name: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPublic?: boolean
  }

  export type SobreLiderCreateOrConnectWithoutUserInput = {
    where: SobreLiderWhereUniqueInput
    create: XOR<SobreLiderCreateWithoutUserInput, SobreLiderUncheckedCreateWithoutUserInput>
  }

  export type SobreLiderCreateManyUserInputEnvelope = {
    data: SobreLiderCreateManyUserInput | SobreLiderCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TestemunhoCreateWithoutUserInput = {
    id?: string
    name: string
    avatarUrl: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPublic?: boolean
    coverUrl?: string | null
    ministryRole?: $Enums.MinistryRole | null
  }

  export type TestemunhoUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    avatarUrl: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPublic?: boolean
    coverUrl?: string | null
    ministryRole?: $Enums.MinistryRole | null
  }

  export type TestemunhoCreateOrConnectWithoutUserInput = {
    where: TestemunhoWhereUniqueInput
    create: XOR<TestemunhoCreateWithoutUserInput, TestemunhoUncheckedCreateWithoutUserInput>
  }

  export type TestemunhoCreateManyUserInputEnvelope = {
    data: TestemunhoCreateManyUserInput | TestemunhoCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    action: string
    entityType: string
    entityId: string
    userName: string
    userRole: string
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: string
    entityType: string
    entityId: string
    userName: string
    userRole: string
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AgendaUpsertWithWhereUniqueWithoutUserInput = {
    where: AgendaWhereUniqueInput
    update: XOR<AgendaUpdateWithoutUserInput, AgendaUncheckedUpdateWithoutUserInput>
    create: XOR<AgendaCreateWithoutUserInput, AgendaUncheckedCreateWithoutUserInput>
  }

  export type AgendaUpdateWithWhereUniqueWithoutUserInput = {
    where: AgendaWhereUniqueInput
    data: XOR<AgendaUpdateWithoutUserInput, AgendaUncheckedUpdateWithoutUserInput>
  }

  export type AgendaUpdateManyWithWhereWithoutUserInput = {
    where: AgendaScalarWhereInput
    data: XOR<AgendaUpdateManyMutationInput, AgendaUncheckedUpdateManyWithoutUserInput>
  }

  export type AgendaScalarWhereInput = {
    AND?: AgendaScalarWhereInput | AgendaScalarWhereInput[]
    OR?: AgendaScalarWhereInput[]
    NOT?: AgendaScalarWhereInput | AgendaScalarWhereInput[]
    id?: StringFilter<"Agenda"> | string
    userId?: StringFilter<"Agenda"> | string
    day?: StringFilter<"Agenda"> | string
    name?: StringFilter<"Agenda"> | string
    hour?: StringFilter<"Agenda"> | string
    isPublic?: BoolFilter<"Agenda"> | boolean
    createdAt?: DateTimeFilter<"Agenda"> | Date | string
    updatedAt?: DateTimeFilter<"Agenda"> | Date | string
    destaque?: BoolFilter<"Agenda"> | boolean
    role?: EnumMinistryRoleFilter<"Agenda"> | $Enums.MinistryRole
  }

  export type ContatoUpsertWithWhereUniqueWithoutUserInput = {
    where: ContatoWhereUniqueInput
    update: XOR<ContatoUpdateWithoutUserInput, ContatoUncheckedUpdateWithoutUserInput>
    create: XOR<ContatoCreateWithoutUserInput, ContatoUncheckedCreateWithoutUserInput>
  }

  export type ContatoUpdateWithWhereUniqueWithoutUserInput = {
    where: ContatoWhereUniqueInput
    data: XOR<ContatoUpdateWithoutUserInput, ContatoUncheckedUpdateWithoutUserInput>
  }

  export type ContatoUpdateManyWithWhereWithoutUserInput = {
    where: ContatoScalarWhereInput
    data: XOR<ContatoUpdateManyMutationInput, ContatoUncheckedUpdateManyWithoutUserInput>
  }

  export type ContatoScalarWhereInput = {
    AND?: ContatoScalarWhereInput | ContatoScalarWhereInput[]
    OR?: ContatoScalarWhereInput[]
    NOT?: ContatoScalarWhereInput | ContatoScalarWhereInput[]
    id?: StringFilter<"Contato"> | string
    userId?: StringFilter<"Contato"> | string
    local?: StringFilter<"Contato"> | string
    whatsapp?: StringFilter<"Contato"> | string
    facebook?: StringFilter<"Contato"> | string
    isPublic?: BoolFilter<"Contato"> | boolean
    createdAt?: DateTimeFilter<"Contato"> | Date | string
    updatedAt?: DateTimeFilter<"Contato"> | Date | string
    instagram?: StringFilter<"Contato"> | string
  }

  export type DoacaoUpsertWithWhereUniqueWithoutUserInput = {
    where: DoacaoWhereUniqueInput
    update: XOR<DoacaoUpdateWithoutUserInput, DoacaoUncheckedUpdateWithoutUserInput>
    create: XOR<DoacaoCreateWithoutUserInput, DoacaoUncheckedCreateWithoutUserInput>
  }

  export type DoacaoUpdateWithWhereUniqueWithoutUserInput = {
    where: DoacaoWhereUniqueInput
    data: XOR<DoacaoUpdateWithoutUserInput, DoacaoUncheckedUpdateWithoutUserInput>
  }

  export type DoacaoUpdateManyWithWhereWithoutUserInput = {
    where: DoacaoScalarWhereInput
    data: XOR<DoacaoUpdateManyMutationInput, DoacaoUncheckedUpdateManyWithoutUserInput>
  }

  export type DoacaoScalarWhereInput = {
    AND?: DoacaoScalarWhereInput | DoacaoScalarWhereInput[]
    OR?: DoacaoScalarWhereInput[]
    NOT?: DoacaoScalarWhereInput | DoacaoScalarWhereInput[]
    id?: StringFilter<"Doacao"> | string
    userId?: StringFilter<"Doacao"> | string
    local?: StringFilter<"Doacao"> | string
    banco?: StringFilter<"Doacao"> | string
    conta?: StringFilter<"Doacao"> | string
    agencia?: StringFilter<"Doacao"> | string
    nomebanco?: StringFilter<"Doacao"> | string
    pix?: StringFilter<"Doacao"> | string
    nomepix?: StringFilter<"Doacao"> | string
    isPublic?: BoolFilter<"Doacao"> | boolean
    createdAt?: DateTimeFilter<"Doacao"> | Date | string
    updatedAt?: DateTimeFilter<"Doacao"> | Date | string
  }

  export type EnderecoUpsertWithWhereUniqueWithoutUserInput = {
    where: EnderecoWhereUniqueInput
    update: XOR<EnderecoUpdateWithoutUserInput, EnderecoUncheckedUpdateWithoutUserInput>
    create: XOR<EnderecoCreateWithoutUserInput, EnderecoUncheckedCreateWithoutUserInput>
  }

  export type EnderecoUpdateWithWhereUniqueWithoutUserInput = {
    where: EnderecoWhereUniqueInput
    data: XOR<EnderecoUpdateWithoutUserInput, EnderecoUncheckedUpdateWithoutUserInput>
  }

  export type EnderecoUpdateManyWithWhereWithoutUserInput = {
    where: EnderecoScalarWhereInput
    data: XOR<EnderecoUpdateManyMutationInput, EnderecoUncheckedUpdateManyWithoutUserInput>
  }

  export type EnderecoScalarWhereInput = {
    AND?: EnderecoScalarWhereInput | EnderecoScalarWhereInput[]
    OR?: EnderecoScalarWhereInput[]
    NOT?: EnderecoScalarWhereInput | EnderecoScalarWhereInput[]
    id?: StringFilter<"Endereco"> | string
    userId?: StringFilter<"Endereco"> | string
    local?: StringFilter<"Endereco"> | string
    rua?: StringFilter<"Endereco"> | string
    cep?: StringFilter<"Endereco"> | string
    isPublic?: BoolFilter<"Endereco"> | boolean
    createdAt?: DateTimeFilter<"Endereco"> | Date | string
    updatedAt?: DateTimeFilter<"Endereco"> | Date | string
    numero?: StringNullableFilter<"Endereco"> | string | null
    cidade?: StringNullableFilter<"Endereco"> | string | null
  }

  export type MinisterioUpsertWithWhereUniqueWithoutUserInput = {
    where: MinisterioWhereUniqueInput
    update: XOR<MinisterioUpdateWithoutUserInput, MinisterioUncheckedUpdateWithoutUserInput>
    create: XOR<MinisterioCreateWithoutUserInput, MinisterioUncheckedCreateWithoutUserInput>
  }

  export type MinisterioUpdateWithWhereUniqueWithoutUserInput = {
    where: MinisterioWhereUniqueInput
    data: XOR<MinisterioUpdateWithoutUserInput, MinisterioUncheckedUpdateWithoutUserInput>
  }

  export type MinisterioUpdateManyWithWhereWithoutUserInput = {
    where: MinisterioScalarWhereInput
    data: XOR<MinisterioUpdateManyMutationInput, MinisterioUncheckedUpdateManyWithoutUserInput>
  }

  export type MinisterioScalarWhereInput = {
    AND?: MinisterioScalarWhereInput | MinisterioScalarWhereInput[]
    OR?: MinisterioScalarWhereInput[]
    NOT?: MinisterioScalarWhereInput | MinisterioScalarWhereInput[]
    id?: StringFilter<"Ministerio"> | string
    userId?: StringFilter<"Ministerio"> | string
    name?: StringFilter<"Ministerio"> | string
    title?: StringFilter<"Ministerio"> | string
    local?: StringFilter<"Ministerio"> | string
    isPublic?: BoolFilter<"Ministerio"> | boolean
    createdAt?: DateTimeFilter<"Ministerio"> | Date | string
    coverUrl?: StringFilter<"Ministerio"> | string
    updatedAt?: DateTimeFilter<"Ministerio"> | Date | string
    role?: EnumMinistryRoleFilter<"Ministerio"> | $Enums.MinistryRole
  }

  export type NewUpsertWithWhereUniqueWithoutUserInput = {
    where: NewWhereUniqueInput
    update: XOR<NewUpdateWithoutUserInput, NewUncheckedUpdateWithoutUserInput>
    create: XOR<NewCreateWithoutUserInput, NewUncheckedCreateWithoutUserInput>
  }

  export type NewUpdateWithWhereUniqueWithoutUserInput = {
    where: NewWhereUniqueInput
    data: XOR<NewUpdateWithoutUserInput, NewUncheckedUpdateWithoutUserInput>
  }

  export type NewUpdateManyWithWhereWithoutUserInput = {
    where: NewScalarWhereInput
    data: XOR<NewUpdateManyMutationInput, NewUncheckedUpdateManyWithoutUserInput>
  }

  export type NewScalarWhereInput = {
    AND?: NewScalarWhereInput | NewScalarWhereInput[]
    OR?: NewScalarWhereInput[]
    NOT?: NewScalarWhereInput | NewScalarWhereInput[]
    id?: StringFilter<"New"> | string
    userId?: StringFilter<"New"> | string
    coverUrl?: StringNullableFilter<"New"> | string | null
    videoUrl?: StringNullableFilter<"New"> | string | null
    content?: StringFilter<"New"> | string
    title?: StringFilter<"New"> | string
    createdAt?: DateTimeFilter<"New"> | Date | string
    isPublic?: BoolFilter<"New"> | boolean
    page?: StringFilter<"New"> | string
    updatedAt?: DateTimeFilter<"New"> | Date | string
    destaque?: BoolFilter<"New"> | boolean
    url?: StringFilter<"New"> | string
    role?: EnumMinistryRoleFilter<"New"> | $Enums.MinistryRole
  }

  export type PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    update: XOR<PasswordResetTokenUpdateWithoutUserInput, PasswordResetTokenUncheckedUpdateWithoutUserInput>
    create: XOR<PasswordResetTokenCreateWithoutUserInput, PasswordResetTokenUncheckedCreateWithoutUserInput>
  }

  export type PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: PasswordResetTokenWhereUniqueInput
    data: XOR<PasswordResetTokenUpdateWithoutUserInput, PasswordResetTokenUncheckedUpdateWithoutUserInput>
  }

  export type PasswordResetTokenUpdateManyWithWhereWithoutUserInput = {
    where: PasswordResetTokenScalarWhereInput
    data: XOR<PasswordResetTokenUpdateManyMutationInput, PasswordResetTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type PasswordResetTokenScalarWhereInput = {
    AND?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
    OR?: PasswordResetTokenScalarWhereInput[]
    NOT?: PasswordResetTokenScalarWhereInput | PasswordResetTokenScalarWhereInput[]
    id?: StringFilter<"PasswordResetToken"> | string
    token?: StringFilter<"PasswordResetToken"> | string
    userId?: StringFilter<"PasswordResetToken"> | string
    createdAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
    expiresAt?: DateTimeFilter<"PasswordResetToken"> | Date | string
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    userId?: StringFilter<"RefreshToken"> | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    updatedAt?: DateTimeFilter<"RefreshToken"> | Date | string
  }

  export type SobreUpsertWithWhereUniqueWithoutUserInput = {
    where: SobreWhereUniqueInput
    update: XOR<SobreUpdateWithoutUserInput, SobreUncheckedUpdateWithoutUserInput>
    create: XOR<SobreCreateWithoutUserInput, SobreUncheckedCreateWithoutUserInput>
  }

  export type SobreUpdateWithWhereUniqueWithoutUserInput = {
    where: SobreWhereUniqueInput
    data: XOR<SobreUpdateWithoutUserInput, SobreUncheckedUpdateWithoutUserInput>
  }

  export type SobreUpdateManyWithWhereWithoutUserInput = {
    where: SobreScalarWhereInput
    data: XOR<SobreUpdateManyMutationInput, SobreUncheckedUpdateManyWithoutUserInput>
  }

  export type SobreScalarWhereInput = {
    AND?: SobreScalarWhereInput | SobreScalarWhereInput[]
    OR?: SobreScalarWhereInput[]
    NOT?: SobreScalarWhereInput | SobreScalarWhereInput[]
    id?: StringFilter<"Sobre"> | string
    userId?: StringFilter<"Sobre"> | string
    coverUrl?: StringFilter<"Sobre"> | string
    content?: StringFilter<"Sobre"> | string
    title?: StringFilter<"Sobre"> | string
    createdAt?: DateTimeFilter<"Sobre"> | Date | string
    updatedAt?: DateTimeFilter<"Sobre"> | Date | string
    isPublic?: BoolFilter<"Sobre"> | boolean
  }

  export type SobreLiderUpsertWithWhereUniqueWithoutUserInput = {
    where: SobreLiderWhereUniqueInput
    update: XOR<SobreLiderUpdateWithoutUserInput, SobreLiderUncheckedUpdateWithoutUserInput>
    create: XOR<SobreLiderCreateWithoutUserInput, SobreLiderUncheckedCreateWithoutUserInput>
  }

  export type SobreLiderUpdateWithWhereUniqueWithoutUserInput = {
    where: SobreLiderWhereUniqueInput
    data: XOR<SobreLiderUpdateWithoutUserInput, SobreLiderUncheckedUpdateWithoutUserInput>
  }

  export type SobreLiderUpdateManyWithWhereWithoutUserInput = {
    where: SobreLiderScalarWhereInput
    data: XOR<SobreLiderUpdateManyMutationInput, SobreLiderUncheckedUpdateManyWithoutUserInput>
  }

  export type SobreLiderScalarWhereInput = {
    AND?: SobreLiderScalarWhereInput | SobreLiderScalarWhereInput[]
    OR?: SobreLiderScalarWhereInput[]
    NOT?: SobreLiderScalarWhereInput | SobreLiderScalarWhereInput[]
    id?: StringFilter<"SobreLider"> | string
    userId?: StringFilter<"SobreLider"> | string
    coverUrl?: StringFilter<"SobreLider"> | string
    name?: StringFilter<"SobreLider"> | string
    title?: StringFilter<"SobreLider"> | string
    createdAt?: DateTimeFilter<"SobreLider"> | Date | string
    updatedAt?: DateTimeFilter<"SobreLider"> | Date | string
    isPublic?: BoolFilter<"SobreLider"> | boolean
  }

  export type TestemunhoUpsertWithWhereUniqueWithoutUserInput = {
    where: TestemunhoWhereUniqueInput
    update: XOR<TestemunhoUpdateWithoutUserInput, TestemunhoUncheckedUpdateWithoutUserInput>
    create: XOR<TestemunhoCreateWithoutUserInput, TestemunhoUncheckedCreateWithoutUserInput>
  }

  export type TestemunhoUpdateWithWhereUniqueWithoutUserInput = {
    where: TestemunhoWhereUniqueInput
    data: XOR<TestemunhoUpdateWithoutUserInput, TestemunhoUncheckedUpdateWithoutUserInput>
  }

  export type TestemunhoUpdateManyWithWhereWithoutUserInput = {
    where: TestemunhoScalarWhereInput
    data: XOR<TestemunhoUpdateManyMutationInput, TestemunhoUncheckedUpdateManyWithoutUserInput>
  }

  export type TestemunhoScalarWhereInput = {
    AND?: TestemunhoScalarWhereInput | TestemunhoScalarWhereInput[]
    OR?: TestemunhoScalarWhereInput[]
    NOT?: TestemunhoScalarWhereInput | TestemunhoScalarWhereInput[]
    id?: StringFilter<"Testemunho"> | string
    userId?: StringFilter<"Testemunho"> | string
    name?: StringFilter<"Testemunho"> | string
    avatarUrl?: StringFilter<"Testemunho"> | string
    content?: StringFilter<"Testemunho"> | string
    createdAt?: DateTimeFilter<"Testemunho"> | Date | string
    updatedAt?: DateTimeFilter<"Testemunho"> | Date | string
    isPublic?: BoolFilter<"Testemunho"> | boolean
    coverUrl?: StringNullableFilter<"Testemunho"> | string | null
    ministryRole?: EnumMinistryRoleNullableFilter<"Testemunho"> | $Enums.MinistryRole | null
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    userId?: StringFilter<"AuditLog"> | string
    userName?: StringFilter<"AuditLog"> | string
    userRole?: StringFilter<"AuditLog"> | string
    oldData?: JsonNullableFilter<"AuditLog">
    newData?: JsonNullableFilter<"AuditLog">
    changes?: JsonNullableFilter<"AuditLog">
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
  }

  export type UserCreateWithoutNewsInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaCreateNestedManyWithoutUserInput
    contato?: ContatoCreateNestedManyWithoutUserInput
    doacao?: DoacaoCreateNestedManyWithoutUserInput
    endereco?: EnderecoCreateNestedManyWithoutUserInput
    ministerio?: MinisterioCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenCreateNestedManyWithoutUserInput
    sobre?: SobreCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNewsInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedCreateNestedManyWithoutUserInput
    contato?: ContatoUncheckedCreateNestedManyWithoutUserInput
    doacao?: DoacaoUncheckedCreateNestedManyWithoutUserInput
    endereco?: EnderecoUncheckedCreateNestedManyWithoutUserInput
    ministerio?: MinisterioUncheckedCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    sobre?: SobreUncheckedCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderUncheckedCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNewsInput, UserUncheckedCreateWithoutNewsInput>
  }

  export type UserUpsertWithoutNewsInput = {
    update: XOR<UserUpdateWithoutNewsInput, UserUncheckedUpdateWithoutNewsInput>
    create: XOR<UserCreateWithoutNewsInput, UserUncheckedCreateWithoutNewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNewsInput, UserUncheckedUpdateWithoutNewsInput>
  }

  export type UserUpdateWithoutNewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUpdateManyWithoutUserNestedInput
    contato?: ContatoUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput
    sobre?: SobreUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedUpdateManyWithoutUserNestedInput
    contato?: ContatoUncheckedUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUncheckedUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUncheckedUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    sobre?: SobreUncheckedUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUncheckedUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutMinisterioInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaCreateNestedManyWithoutUserInput
    contato?: ContatoCreateNestedManyWithoutUserInput
    doacao?: DoacaoCreateNestedManyWithoutUserInput
    endereco?: EnderecoCreateNestedManyWithoutUserInput
    news?: NewCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenCreateNestedManyWithoutUserInput
    sobre?: SobreCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMinisterioInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedCreateNestedManyWithoutUserInput
    contato?: ContatoUncheckedCreateNestedManyWithoutUserInput
    doacao?: DoacaoUncheckedCreateNestedManyWithoutUserInput
    endereco?: EnderecoUncheckedCreateNestedManyWithoutUserInput
    news?: NewUncheckedCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    sobre?: SobreUncheckedCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderUncheckedCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMinisterioInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMinisterioInput, UserUncheckedCreateWithoutMinisterioInput>
  }

  export type UserUpsertWithoutMinisterioInput = {
    update: XOR<UserUpdateWithoutMinisterioInput, UserUncheckedUpdateWithoutMinisterioInput>
    create: XOR<UserCreateWithoutMinisterioInput, UserUncheckedCreateWithoutMinisterioInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMinisterioInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMinisterioInput, UserUncheckedUpdateWithoutMinisterioInput>
  }

  export type UserUpdateWithoutMinisterioInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUpdateManyWithoutUserNestedInput
    contato?: ContatoUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUpdateManyWithoutUserNestedInput
    news?: NewUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput
    sobre?: SobreUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMinisterioInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedUpdateManyWithoutUserNestedInput
    contato?: ContatoUncheckedUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUncheckedUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUncheckedUpdateManyWithoutUserNestedInput
    news?: NewUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    sobre?: SobreUncheckedUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUncheckedUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAgendaInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    contato?: ContatoCreateNestedManyWithoutUserInput
    doacao?: DoacaoCreateNestedManyWithoutUserInput
    endereco?: EnderecoCreateNestedManyWithoutUserInput
    ministerio?: MinisterioCreateNestedManyWithoutUserInput
    news?: NewCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenCreateNestedManyWithoutUserInput
    sobre?: SobreCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAgendaInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    contato?: ContatoUncheckedCreateNestedManyWithoutUserInput
    doacao?: DoacaoUncheckedCreateNestedManyWithoutUserInput
    endereco?: EnderecoUncheckedCreateNestedManyWithoutUserInput
    ministerio?: MinisterioUncheckedCreateNestedManyWithoutUserInput
    news?: NewUncheckedCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    sobre?: SobreUncheckedCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderUncheckedCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAgendaInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAgendaInput, UserUncheckedCreateWithoutAgendaInput>
  }

  export type UserUpsertWithoutAgendaInput = {
    update: XOR<UserUpdateWithoutAgendaInput, UserUncheckedUpdateWithoutAgendaInput>
    create: XOR<UserCreateWithoutAgendaInput, UserUncheckedCreateWithoutAgendaInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAgendaInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAgendaInput, UserUncheckedUpdateWithoutAgendaInput>
  }

  export type UserUpdateWithoutAgendaInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    contato?: ContatoUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUpdateManyWithoutUserNestedInput
    news?: NewUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput
    sobre?: SobreUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAgendaInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    contato?: ContatoUncheckedUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUncheckedUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUncheckedUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUncheckedUpdateManyWithoutUserNestedInput
    news?: NewUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    sobre?: SobreUncheckedUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUncheckedUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutDoacaoInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaCreateNestedManyWithoutUserInput
    contato?: ContatoCreateNestedManyWithoutUserInput
    endereco?: EnderecoCreateNestedManyWithoutUserInput
    ministerio?: MinisterioCreateNestedManyWithoutUserInput
    news?: NewCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenCreateNestedManyWithoutUserInput
    sobre?: SobreCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDoacaoInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedCreateNestedManyWithoutUserInput
    contato?: ContatoUncheckedCreateNestedManyWithoutUserInput
    endereco?: EnderecoUncheckedCreateNestedManyWithoutUserInput
    ministerio?: MinisterioUncheckedCreateNestedManyWithoutUserInput
    news?: NewUncheckedCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    sobre?: SobreUncheckedCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderUncheckedCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDoacaoInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDoacaoInput, UserUncheckedCreateWithoutDoacaoInput>
  }

  export type UserUpsertWithoutDoacaoInput = {
    update: XOR<UserUpdateWithoutDoacaoInput, UserUncheckedUpdateWithoutDoacaoInput>
    create: XOR<UserCreateWithoutDoacaoInput, UserUncheckedCreateWithoutDoacaoInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDoacaoInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDoacaoInput, UserUncheckedUpdateWithoutDoacaoInput>
  }

  export type UserUpdateWithoutDoacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUpdateManyWithoutUserNestedInput
    contato?: ContatoUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUpdateManyWithoutUserNestedInput
    news?: NewUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput
    sobre?: SobreUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDoacaoInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedUpdateManyWithoutUserNestedInput
    contato?: ContatoUncheckedUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUncheckedUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUncheckedUpdateManyWithoutUserNestedInput
    news?: NewUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    sobre?: SobreUncheckedUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUncheckedUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutEnderecoInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaCreateNestedManyWithoutUserInput
    contato?: ContatoCreateNestedManyWithoutUserInput
    doacao?: DoacaoCreateNestedManyWithoutUserInput
    ministerio?: MinisterioCreateNestedManyWithoutUserInput
    news?: NewCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenCreateNestedManyWithoutUserInput
    sobre?: SobreCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEnderecoInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedCreateNestedManyWithoutUserInput
    contato?: ContatoUncheckedCreateNestedManyWithoutUserInput
    doacao?: DoacaoUncheckedCreateNestedManyWithoutUserInput
    ministerio?: MinisterioUncheckedCreateNestedManyWithoutUserInput
    news?: NewUncheckedCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    sobre?: SobreUncheckedCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderUncheckedCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEnderecoInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEnderecoInput, UserUncheckedCreateWithoutEnderecoInput>
  }

  export type UserUpsertWithoutEnderecoInput = {
    update: XOR<UserUpdateWithoutEnderecoInput, UserUncheckedUpdateWithoutEnderecoInput>
    create: XOR<UserCreateWithoutEnderecoInput, UserUncheckedCreateWithoutEnderecoInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEnderecoInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEnderecoInput, UserUncheckedUpdateWithoutEnderecoInput>
  }

  export type UserUpdateWithoutEnderecoInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUpdateManyWithoutUserNestedInput
    contato?: ContatoUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUpdateManyWithoutUserNestedInput
    news?: NewUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput
    sobre?: SobreUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEnderecoInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedUpdateManyWithoutUserNestedInput
    contato?: ContatoUncheckedUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUncheckedUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUncheckedUpdateManyWithoutUserNestedInput
    news?: NewUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    sobre?: SobreUncheckedUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUncheckedUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutContatoInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaCreateNestedManyWithoutUserInput
    doacao?: DoacaoCreateNestedManyWithoutUserInput
    endereco?: EnderecoCreateNestedManyWithoutUserInput
    ministerio?: MinisterioCreateNestedManyWithoutUserInput
    news?: NewCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenCreateNestedManyWithoutUserInput
    sobre?: SobreCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutContatoInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedCreateNestedManyWithoutUserInput
    doacao?: DoacaoUncheckedCreateNestedManyWithoutUserInput
    endereco?: EnderecoUncheckedCreateNestedManyWithoutUserInput
    ministerio?: MinisterioUncheckedCreateNestedManyWithoutUserInput
    news?: NewUncheckedCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    sobre?: SobreUncheckedCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderUncheckedCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutContatoInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutContatoInput, UserUncheckedCreateWithoutContatoInput>
  }

  export type UserUpsertWithoutContatoInput = {
    update: XOR<UserUpdateWithoutContatoInput, UserUncheckedUpdateWithoutContatoInput>
    create: XOR<UserCreateWithoutContatoInput, UserUncheckedCreateWithoutContatoInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutContatoInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutContatoInput, UserUncheckedUpdateWithoutContatoInput>
  }

  export type UserUpdateWithoutContatoInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUpdateManyWithoutUserNestedInput
    news?: NewUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput
    sobre?: SobreUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutContatoInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUncheckedUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUncheckedUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUncheckedUpdateManyWithoutUserNestedInput
    news?: NewUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    sobre?: SobreUncheckedUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUncheckedUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSobreInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaCreateNestedManyWithoutUserInput
    contato?: ContatoCreateNestedManyWithoutUserInput
    doacao?: DoacaoCreateNestedManyWithoutUserInput
    endereco?: EnderecoCreateNestedManyWithoutUserInput
    ministerio?: MinisterioCreateNestedManyWithoutUserInput
    news?: NewCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSobreInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedCreateNestedManyWithoutUserInput
    contato?: ContatoUncheckedCreateNestedManyWithoutUserInput
    doacao?: DoacaoUncheckedCreateNestedManyWithoutUserInput
    endereco?: EnderecoUncheckedCreateNestedManyWithoutUserInput
    ministerio?: MinisterioUncheckedCreateNestedManyWithoutUserInput
    news?: NewUncheckedCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderUncheckedCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSobreInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSobreInput, UserUncheckedCreateWithoutSobreInput>
  }

  export type UserUpsertWithoutSobreInput = {
    update: XOR<UserUpdateWithoutSobreInput, UserUncheckedUpdateWithoutSobreInput>
    create: XOR<UserCreateWithoutSobreInput, UserUncheckedCreateWithoutSobreInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSobreInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSobreInput, UserUncheckedUpdateWithoutSobreInput>
  }

  export type UserUpdateWithoutSobreInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUpdateManyWithoutUserNestedInput
    contato?: ContatoUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUpdateManyWithoutUserNestedInput
    news?: NewUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSobreInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedUpdateManyWithoutUserNestedInput
    contato?: ContatoUncheckedUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUncheckedUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUncheckedUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUncheckedUpdateManyWithoutUserNestedInput
    news?: NewUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUncheckedUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSobreLiderInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaCreateNestedManyWithoutUserInput
    contato?: ContatoCreateNestedManyWithoutUserInput
    doacao?: DoacaoCreateNestedManyWithoutUserInput
    endereco?: EnderecoCreateNestedManyWithoutUserInput
    ministerio?: MinisterioCreateNestedManyWithoutUserInput
    news?: NewCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenCreateNestedManyWithoutUserInput
    sobre?: SobreCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSobreLiderInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedCreateNestedManyWithoutUserInput
    contato?: ContatoUncheckedCreateNestedManyWithoutUserInput
    doacao?: DoacaoUncheckedCreateNestedManyWithoutUserInput
    endereco?: EnderecoUncheckedCreateNestedManyWithoutUserInput
    ministerio?: MinisterioUncheckedCreateNestedManyWithoutUserInput
    news?: NewUncheckedCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    sobre?: SobreUncheckedCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSobreLiderInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSobreLiderInput, UserUncheckedCreateWithoutSobreLiderInput>
  }

  export type UserUpsertWithoutSobreLiderInput = {
    update: XOR<UserUpdateWithoutSobreLiderInput, UserUncheckedUpdateWithoutSobreLiderInput>
    create: XOR<UserCreateWithoutSobreLiderInput, UserUncheckedCreateWithoutSobreLiderInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSobreLiderInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSobreLiderInput, UserUncheckedUpdateWithoutSobreLiderInput>
  }

  export type UserUpdateWithoutSobreLiderInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUpdateManyWithoutUserNestedInput
    contato?: ContatoUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUpdateManyWithoutUserNestedInput
    news?: NewUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput
    sobre?: SobreUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSobreLiderInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedUpdateManyWithoutUserNestedInput
    contato?: ContatoUncheckedUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUncheckedUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUncheckedUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUncheckedUpdateManyWithoutUserNestedInput
    news?: NewUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    sobre?: SobreUncheckedUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutRefreshTokenInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaCreateNestedManyWithoutUserInput
    contato?: ContatoCreateNestedManyWithoutUserInput
    doacao?: DoacaoCreateNestedManyWithoutUserInput
    endereco?: EnderecoCreateNestedManyWithoutUserInput
    ministerio?: MinisterioCreateNestedManyWithoutUserInput
    news?: NewCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenCreateNestedManyWithoutUserInput
    sobre?: SobreCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRefreshTokenInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedCreateNestedManyWithoutUserInput
    contato?: ContatoUncheckedCreateNestedManyWithoutUserInput
    doacao?: DoacaoUncheckedCreateNestedManyWithoutUserInput
    endereco?: EnderecoUncheckedCreateNestedManyWithoutUserInput
    ministerio?: MinisterioUncheckedCreateNestedManyWithoutUserInput
    news?: NewUncheckedCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    sobre?: SobreUncheckedCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderUncheckedCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRefreshTokenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshTokenInput, UserUncheckedCreateWithoutRefreshTokenInput>
  }

  export type UserUpsertWithoutRefreshTokenInput = {
    update: XOR<UserUpdateWithoutRefreshTokenInput, UserUncheckedUpdateWithoutRefreshTokenInput>
    create: XOR<UserCreateWithoutRefreshTokenInput, UserUncheckedCreateWithoutRefreshTokenInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefreshTokenInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefreshTokenInput, UserUncheckedUpdateWithoutRefreshTokenInput>
  }

  export type UserUpdateWithoutRefreshTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUpdateManyWithoutUserNestedInput
    contato?: ContatoUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUpdateManyWithoutUserNestedInput
    news?: NewUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    sobre?: SobreUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRefreshTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedUpdateManyWithoutUserNestedInput
    contato?: ContatoUncheckedUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUncheckedUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUncheckedUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUncheckedUpdateManyWithoutUserNestedInput
    news?: NewUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    sobre?: SobreUncheckedUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUncheckedUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPasswordResetTokenInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaCreateNestedManyWithoutUserInput
    contato?: ContatoCreateNestedManyWithoutUserInput
    doacao?: DoacaoCreateNestedManyWithoutUserInput
    endereco?: EnderecoCreateNestedManyWithoutUserInput
    ministerio?: MinisterioCreateNestedManyWithoutUserInput
    news?: NewCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenCreateNestedManyWithoutUserInput
    sobre?: SobreCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPasswordResetTokenInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedCreateNestedManyWithoutUserInput
    contato?: ContatoUncheckedCreateNestedManyWithoutUserInput
    doacao?: DoacaoUncheckedCreateNestedManyWithoutUserInput
    endereco?: EnderecoUncheckedCreateNestedManyWithoutUserInput
    ministerio?: MinisterioUncheckedCreateNestedManyWithoutUserInput
    news?: NewUncheckedCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    sobre?: SobreUncheckedCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderUncheckedCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPasswordResetTokenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPasswordResetTokenInput, UserUncheckedCreateWithoutPasswordResetTokenInput>
  }

  export type UserUpsertWithoutPasswordResetTokenInput = {
    update: XOR<UserUpdateWithoutPasswordResetTokenInput, UserUncheckedUpdateWithoutPasswordResetTokenInput>
    create: XOR<UserCreateWithoutPasswordResetTokenInput, UserUncheckedCreateWithoutPasswordResetTokenInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPasswordResetTokenInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPasswordResetTokenInput, UserUncheckedUpdateWithoutPasswordResetTokenInput>
  }

  export type UserUpdateWithoutPasswordResetTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUpdateManyWithoutUserNestedInput
    contato?: ContatoUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUpdateManyWithoutUserNestedInput
    news?: NewUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput
    sobre?: SobreUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPasswordResetTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedUpdateManyWithoutUserNestedInput
    contato?: ContatoUncheckedUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUncheckedUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUncheckedUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUncheckedUpdateManyWithoutUserNestedInput
    news?: NewUncheckedUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    sobre?: SobreUncheckedUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUncheckedUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutTestemunhosInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaCreateNestedManyWithoutUserInput
    contato?: ContatoCreateNestedManyWithoutUserInput
    doacao?: DoacaoCreateNestedManyWithoutUserInput
    endereco?: EnderecoCreateNestedManyWithoutUserInput
    ministerio?: MinisterioCreateNestedManyWithoutUserInput
    news?: NewCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenCreateNestedManyWithoutUserInput
    sobre?: SobreCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTestemunhosInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedCreateNestedManyWithoutUserInput
    contato?: ContatoUncheckedCreateNestedManyWithoutUserInput
    doacao?: DoacaoUncheckedCreateNestedManyWithoutUserInput
    endereco?: EnderecoUncheckedCreateNestedManyWithoutUserInput
    ministerio?: MinisterioUncheckedCreateNestedManyWithoutUserInput
    news?: NewUncheckedCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    sobre?: SobreUncheckedCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTestemunhosInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTestemunhosInput, UserUncheckedCreateWithoutTestemunhosInput>
  }

  export type UserUpsertWithoutTestemunhosInput = {
    update: XOR<UserUpdateWithoutTestemunhosInput, UserUncheckedUpdateWithoutTestemunhosInput>
    create: XOR<UserCreateWithoutTestemunhosInput, UserUncheckedCreateWithoutTestemunhosInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTestemunhosInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTestemunhosInput, UserUncheckedUpdateWithoutTestemunhosInput>
  }

  export type UserUpdateWithoutTestemunhosInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUpdateManyWithoutUserNestedInput
    contato?: ContatoUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUpdateManyWithoutUserNestedInput
    news?: NewUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput
    sobre?: SobreUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTestemunhosInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedUpdateManyWithoutUserNestedInput
    contato?: ContatoUncheckedUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUncheckedUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUncheckedUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUncheckedUpdateManyWithoutUserNestedInput
    news?: NewUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    sobre?: SobreUncheckedUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaCreateNestedManyWithoutUserInput
    contato?: ContatoCreateNestedManyWithoutUserInput
    doacao?: DoacaoCreateNestedManyWithoutUserInput
    endereco?: EnderecoCreateNestedManyWithoutUserInput
    ministerio?: MinisterioCreateNestedManyWithoutUserInput
    news?: NewCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenCreateNestedManyWithoutUserInput
    sobre?: SobreCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    login: string
    name?: string | null
    avatarUrl?: string | null
    password: string
    role?: $Enums.UserRole
    ministryRole?: $Enums.MinistryRole | null
    expires?: Date | string | null
    cargo?: UserCreatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedCreateNestedManyWithoutUserInput
    contato?: ContatoUncheckedCreateNestedManyWithoutUserInput
    doacao?: DoacaoUncheckedCreateNestedManyWithoutUserInput
    endereco?: EnderecoUncheckedCreateNestedManyWithoutUserInput
    ministerio?: MinisterioUncheckedCreateNestedManyWithoutUserInput
    news?: NewUncheckedCreateNestedManyWithoutUserInput
    PasswordResetToken?: PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput
    refreshToken?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    sobre?: SobreUncheckedCreateNestedManyWithoutUserInput
    sobreLider?: SobreLiderUncheckedCreateNestedManyWithoutUserInput
    testemunhos?: TestemunhoUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUpdateManyWithoutUserNestedInput
    contato?: ContatoUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUpdateManyWithoutUserNestedInput
    news?: NewUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput
    sobre?: SobreUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    login?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
    expires?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cargo?: UserUpdatecargoInput | $Enums.CargoRole[]
    agenda?: AgendaUncheckedUpdateManyWithoutUserNestedInput
    contato?: ContatoUncheckedUpdateManyWithoutUserNestedInput
    doacao?: DoacaoUncheckedUpdateManyWithoutUserNestedInput
    endereco?: EnderecoUncheckedUpdateManyWithoutUserNestedInput
    ministerio?: MinisterioUncheckedUpdateManyWithoutUserNestedInput
    news?: NewUncheckedUpdateManyWithoutUserNestedInput
    PasswordResetToken?: PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput
    refreshToken?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    sobre?: SobreUncheckedUpdateManyWithoutUserNestedInput
    sobreLider?: SobreLiderUncheckedUpdateManyWithoutUserNestedInput
    testemunhos?: TestemunhoUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AgendaCreateManyUserInput = {
    id?: string
    day: string
    name: string
    hour: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    destaque?: boolean
    role: $Enums.MinistryRole
  }

  export type ContatoCreateManyUserInput = {
    id?: string
    local: string
    whatsapp: string
    facebook: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    instagram: string
  }

  export type DoacaoCreateManyUserInput = {
    id?: string
    local: string
    banco: string
    conta: string
    agencia: string
    nomebanco: string
    pix: string
    nomepix: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EnderecoCreateManyUserInput = {
    id?: string
    local: string
    rua: string
    cep: string
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    numero?: string | null
    cidade?: string | null
  }

  export type MinisterioCreateManyUserInput = {
    id?: string
    name: string
    title: string
    local: string
    isPublic?: boolean
    createdAt?: Date | string
    coverUrl: string
    updatedAt?: Date | string
    role: $Enums.MinistryRole
  }

  export type NewCreateManyUserInput = {
    id?: string
    coverUrl?: string | null
    videoUrl?: string | null
    content: string
    title: string
    createdAt?: Date | string
    isPublic?: boolean
    page: string
    updatedAt?: Date | string
    destaque?: boolean
    url: string
    role: $Enums.MinistryRole
  }

  export type PasswordResetTokenCreateManyUserInput = {
    id?: string
    token: string
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type RefreshTokenCreateManyUserInput = {
    id?: string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SobreCreateManyUserInput = {
    id?: string
    coverUrl: string
    content: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPublic?: boolean
  }

  export type SobreLiderCreateManyUserInput = {
    id?: string
    coverUrl: string
    name: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPublic?: boolean
  }

  export type TestemunhoCreateManyUserInput = {
    id?: string
    name: string
    avatarUrl: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    isPublic?: boolean
    coverUrl?: string | null
    ministryRole?: $Enums.MinistryRole | null
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    action: string
    entityType: string
    entityId: string
    userName: string
    userRole: string
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type AgendaUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    day?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    hour?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    destaque?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
  }

  export type AgendaUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    day?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    hour?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    destaque?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
  }

  export type AgendaUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    day?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    hour?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    destaque?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
  }

  export type ContatoUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    facebook?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instagram?: StringFieldUpdateOperationsInput | string
  }

  export type ContatoUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    facebook?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instagram?: StringFieldUpdateOperationsInput | string
  }

  export type ContatoUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    whatsapp?: StringFieldUpdateOperationsInput | string
    facebook?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instagram?: StringFieldUpdateOperationsInput | string
  }

  export type DoacaoUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    banco?: StringFieldUpdateOperationsInput | string
    conta?: StringFieldUpdateOperationsInput | string
    agencia?: StringFieldUpdateOperationsInput | string
    nomebanco?: StringFieldUpdateOperationsInput | string
    pix?: StringFieldUpdateOperationsInput | string
    nomepix?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoacaoUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    banco?: StringFieldUpdateOperationsInput | string
    conta?: StringFieldUpdateOperationsInput | string
    agencia?: StringFieldUpdateOperationsInput | string
    nomebanco?: StringFieldUpdateOperationsInput | string
    pix?: StringFieldUpdateOperationsInput | string
    nomepix?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoacaoUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    banco?: StringFieldUpdateOperationsInput | string
    conta?: StringFieldUpdateOperationsInput | string
    agencia?: StringFieldUpdateOperationsInput | string
    nomebanco?: StringFieldUpdateOperationsInput | string
    pix?: StringFieldUpdateOperationsInput | string
    nomepix?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnderecoUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    cep?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnderecoUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    cep?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EnderecoUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    cep?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    numero?: NullableStringFieldUpdateOperationsInput | string | null
    cidade?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MinisterioUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
  }

  export type MinisterioUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
  }

  export type MinisterioUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
  }

  export type NewUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    page?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    destaque?: BoolFieldUpdateOperationsInput | boolean
    url?: StringFieldUpdateOperationsInput | string
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
  }

  export type NewUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    page?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    destaque?: BoolFieldUpdateOperationsInput | boolean
    url?: StringFieldUpdateOperationsInput | string
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
  }

  export type NewUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    page?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    destaque?: BoolFieldUpdateOperationsInput | boolean
    url?: StringFieldUpdateOperationsInput | string
    role?: EnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole
  }

  export type PasswordResetTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordResetTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SobreUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SobreUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SobreUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SobreLiderUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SobreLiderUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SobreLiderUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    coverUrl?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TestemunhoUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
  }

  export type TestemunhoUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
  }

  export type TestemunhoUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ministryRole?: NullableEnumMinistryRoleFieldUpdateOperationsInput | $Enums.MinistryRole | null
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userRole?: StringFieldUpdateOperationsInput | string
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userRole?: StringFieldUpdateOperationsInput | string
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    userRole?: StringFieldUpdateOperationsInput | string
    oldData?: NullableJsonNullValueInput | InputJsonValue
    newData?: NullableJsonNullValueInput | InputJsonValue
    changes?: NullableJsonNullValueInput | InputJsonValue
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
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