
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  login: 'login',
  name: 'name',
  avatarUrl: 'avatarUrl',
  password: 'password',
  isAdmin: 'isAdmin',
  expires: 'expires',
  passwordResetToken: 'passwordResetToken'
};

exports.Prisma.UserIgrejaScalarFieldEnum = {
  id: 'id',
  login: 'login',
  name: 'name',
  avatarUrl: 'avatarUrl',
  password: 'password',
  passwordResetToken: 'passwordResetToken',
  expires: 'expires'
};

exports.Prisma.NewScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  coverUrl: 'coverUrl',
  content: 'content',
  title: 'title',
  createdAt: 'createdAt',
  isPublic: 'isPublic',
  page: 'page',
  updatedAt: 'updatedAt',
  destaque: 'destaque'
};

exports.Prisma.MinisterioScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  title: 'title',
  local: 'local',
  isPublic: 'isPublic',
  createdAt: 'createdAt',
  coverUrl: 'coverUrl',
  updatedAt: 'updatedAt'
};

exports.Prisma.AgendaScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  day: 'day',
  name: 'name',
  hour: 'hour',
  isPublic: 'isPublic',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  destaque: 'destaque'
};

exports.Prisma.NewTomazinhoScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  coverUrl: 'coverUrl',
  content: 'content',
  title: 'title',
  isPublic: 'isPublic',
  createdAt: 'createdAt',
  page: 'page',
  updatedAt: 'updatedAt',
  destaque: 'destaque'
};

exports.Prisma.MinisterioTomazinhoScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  title: 'title',
  local: 'local',
  isPublic: 'isPublic',
  createdAt: 'createdAt',
  coverUrl: 'coverUrl',
  updatedAt: 'updatedAt'
};

exports.Prisma.AgendaTomazinhoScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  day: 'day',
  name: 'name',
  hour: 'hour',
  isPublic: 'isPublic',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  destaque: 'destaque'
};

exports.Prisma.NewCaxiasScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  coverUrl: 'coverUrl',
  content: 'content',
  title: 'title',
  isPublic: 'isPublic',
  createdAt: 'createdAt',
  page: 'page',
  updatedAt: 'updatedAt',
  destaque: 'destaque'
};

exports.Prisma.MinisterioCaxiasScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  title: 'title',
  local: 'local',
  isPublic: 'isPublic',
  createdAt: 'createdAt',
  coverUrl: 'coverUrl',
  updatedAt: 'updatedAt'
};

exports.Prisma.AgendaCaxiasScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  day: 'day',
  name: 'name',
  hour: 'hour',
  isPublic: 'isPublic',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  destaque: 'destaque'
};

exports.Prisma.DoacaoScalarFieldEnum = {
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

exports.Prisma.EnderecoScalarFieldEnum = {
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

exports.Prisma.ContatoScalarFieldEnum = {
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

exports.Prisma.SobreScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  coverUrl: 'coverUrl',
  content: 'content',
  title: 'title',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isPublic: 'isPublic'
};

exports.Prisma.SobreLiderScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  coverUrl: 'coverUrl',
  name: 'name',
  title: 'title',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isPublic: 'isPublic'
};

exports.Prisma.RefreshTokenScalarFieldEnum = {
  id: 'id',
  token: 'token',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TestemunhoScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  avatarUrl: 'avatarUrl',
  content: 'content',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  isPublic: 'isPublic',
  coverUrl: 'coverUrl'
};

exports.Prisma.RefreshTokenIgrejaScalarFieldEnum = {
  id: 'id',
  token: 'token',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PasswordResetTokenIgrejaScalarFieldEnum = {
  id: 'id',
  token: 'token',
  userId: 'userId',
  createdAt: 'createdAt',
  expiresAt: 'expiresAt'
};

exports.Prisma.PasswordResetTokenScalarFieldEnum = {
  id: 'id',
  token: 'token',
  userId: 'userId',
  createdAt: 'createdAt',
  expiresAt: 'expiresAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  User: 'User',
  UserIgreja: 'UserIgreja',
  New: 'New',
  Ministerio: 'Ministerio',
  Agenda: 'Agenda',
  NewTomazinho: 'NewTomazinho',
  MinisterioTomazinho: 'MinisterioTomazinho',
  AgendaTomazinho: 'AgendaTomazinho',
  NewCaxias: 'NewCaxias',
  MinisterioCaxias: 'MinisterioCaxias',
  AgendaCaxias: 'AgendaCaxias',
  Doacao: 'Doacao',
  Endereco: 'Endereco',
  Contato: 'Contato',
  Sobre: 'Sobre',
  SobreLider: 'SobreLider',
  RefreshToken: 'RefreshToken',
  Testemunho: 'Testemunho',
  RefreshTokenIgreja: 'RefreshTokenIgreja',
  PasswordResetTokenIgreja: 'PasswordResetTokenIgreja',
  PasswordResetToken: 'PasswordResetToken'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
