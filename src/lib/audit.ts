import { prisma } from '@/lib/prisma'

export interface AuditLogParams {
  action: 'CREATE' | 'UPDATE' | 'DELETE'
  entityType: string
  entityId: string
  userId: string
  userName: string
  userRole: string
  oldData?: Record<string, unknown> | null
  newData?: Record<string, unknown> | null
  changes?: Record<string, { from: unknown; to: unknown }> | null
  ipAddress?: string
  userAgent?: string
}

export class AuditLogger {
  static async log(params: AuditLogParams) {
    try {
      // Verificar se o modelo AuditLog está disponível
      if (!(prisma as unknown as Record<string, unknown>).auditLog) {
        console.log(
          'Auditoria: Modelo AuditLog não disponível, pulando log:',
          params,
        )
        return
      }

      await (
        (prisma as unknown as Record<string, unknown>).auditLog as {
          create: (params: { data: unknown }) => Promise<unknown>
        }
      ).create({
        data: {
          action: params.action,
          entityType: params.entityType,
          entityId: params.entityId,
          userId: params.userId,
          userName: params.userName,
          userRole: params.userRole,
          oldData: params.oldData
            ? JSON.parse(JSON.stringify(params.oldData))
            : null,
          newData: params.newData
            ? JSON.parse(JSON.stringify(params.newData))
            : null,
          changes: params.changes
            ? JSON.parse(JSON.stringify(params.changes))
            : null,
          ipAddress: params.ipAddress,
          userAgent: params.userAgent,
        },
      })
    } catch (error) {
      console.error('Erro ao salvar log de auditoria:', error)
      // Não lança erro para não quebrar a aplicação
    }
  }

  static calculateChanges(
    oldData: Record<string, unknown> | null,
    newData: Record<string, unknown> | null,
  ): Record<string, { from: unknown; to: unknown }> | null {
    if (!oldData || !newData) return null

    const changes: Record<string, { from: unknown; to: unknown }> = {}
    const allKeys = new Set([...Object.keys(oldData), ...Object.keys(newData)])

    for (const key of allKeys) {
      // Ignora campos que não devem ser comparados
      if (['id', 'createdAt', 'updatedAt', 'password'].includes(key)) {
        continue
      }

      const oldValue = oldData[key]
      const newValue = newData[key]

      if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
        changes[key] = {
          from: oldValue,
          to: newValue,
        }
      }
    }

    return Object.keys(changes).length > 0 ? changes : null
  }

  static async logCreate(
    params: Omit<AuditLogParams, 'action' | 'oldData' | 'changes'>,
  ) {
    await this.log({
      ...params,
      action: 'CREATE',
    })
  }

  static async logUpdate(
    params: Omit<AuditLogParams, 'action'> & {
      oldData: Record<string, unknown> | null
      newData: Record<string, unknown> | null
    },
  ) {
    const changes = this.calculateChanges(params.oldData, params.newData)

    await this.log({
      ...params,
      action: 'UPDATE',
      changes,
    })
  }

  static async logDelete(
    params: Omit<AuditLogParams, 'action' | 'newData' | 'changes'>,
  ) {
    await this.log({
      ...params,
      action: 'DELETE',
    })
  }
}
