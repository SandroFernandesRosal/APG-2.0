import { AuditLogger } from '@/lib/audit'

export function useAudit() {
  const logAction = async (params: {
    action: 'CREATE' | 'UPDATE' | 'DELETE'
    entityType: string
    entityId: string
    userId: string
    userName: string
    userRole: string
    oldData?: Record<string, unknown>
    newData?: Record<string, unknown>
    ipAddress?: string
    userAgent?: string
  }) => {
    try {
      switch (params.action) {
        case 'CREATE':
          await AuditLogger.logCreate({
            entityType: params.entityType,
            entityId: params.entityId,
            userId: params.userId,
            userName: params.userName,
            userRole: params.userRole,
            newData: params.newData,
            ipAddress: params.ipAddress,
            userAgent: params.userAgent,
          })
          break

        case 'UPDATE':
          if (params.oldData && params.newData) {
            await AuditLogger.logUpdate({
              entityType: params.entityType,
              entityId: params.entityId,
              userId: params.userId,
              userName: params.userName,
              userRole: params.userRole,
              oldData: params.oldData,
              newData: params.newData,
              ipAddress: params.ipAddress,
              userAgent: params.userAgent,
            })
          }
          break

        case 'DELETE':
          await AuditLogger.logDelete({
            entityType: params.entityType,
            entityId: params.entityId,
            userId: params.userId,
            userName: params.userName,
            userRole: params.userRole,
            oldData: params.oldData,
            ipAddress: params.ipAddress,
            userAgent: params.userAgent,
          })
          break
      }
    } catch (error) {
      console.error('Erro ao registrar ação de auditoria:', error)
      // Não lança erro para não quebrar a aplicação
    }
  }

  return { logAction }
}
