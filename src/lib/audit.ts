import { prisma } from '@/lib/prisma'

export interface AuditLogParams {
  action: 'CREATE' | 'UPDATE' | 'DELETE'
  entityType: string
  entityId: string
  userId: string
  userName: string
  userRole: string
  oldData?: any
  newData?: any
  changes?: any
  ipAddress?: string
  userAgent?: string
}

export class AuditLogger {
  static async log(params: AuditLogParams) {
    try {
      // Verificar se o modelo AuditLog está disponível
      if (!(prisma as any).auditLog) {
        console.log('Auditoria: Modelo AuditLog não disponível, pulando log:', params)
        return
      }

      await (prisma as any).auditLog.create({
        data: {
          action: params.action,
          entityType: params.entityType,
          entityId: params.entityId,
          userId: params.userId,
          userName: params.userName,
          userRole: params.userRole,
          oldData: params.oldData ? JSON.parse(JSON.stringify(params.oldData)) : null,
          newData: params.newData ? JSON.parse(JSON.stringify(params.newData)) : null,
          changes: params.changes ? JSON.parse(JSON.stringify(params.changes)) : null,
          ipAddress: params.ipAddress,
          userAgent: params.userAgent,
        },
      })
    } catch (error) {
      console.error('Erro ao salvar log de auditoria:', error)
      // Não lança erro para não quebrar a aplicação
    }
  }

  static calculateChanges(oldData: any, newData: any): any {
    if (!oldData || !newData) return null

    const changes: any = {}
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

  static async logCreate(params: Omit<AuditLogParams, 'action' | 'oldData' | 'changes'>) {
    await this.log({
      ...params,
      action: 'CREATE',
    })
  }

  static async logUpdate(params: Omit<AuditLogParams, 'action'> & { oldData: any; newData: any }) {
    const changes = this.calculateChanges(params.oldData, params.newData)
    
    await this.log({
      ...params,
      action: 'UPDATE',
      changes,
    })
  }

  static async logDelete(params: Omit<AuditLogParams, 'action' | 'newData' | 'changes'>) {
    await this.log({
      ...params,
      action: 'DELETE',
    })
  }
}
