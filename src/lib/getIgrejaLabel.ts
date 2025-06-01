export function getIgrejaLabel(role: string) {
  switch (role) {
    case 'VILADAPENHA':
      return 'Vila da Penha'
    case 'MARIAHELENA':
      return 'Vila Maria Helena'
    case 'TOMAZINHO':
      return 'Tomazinho'
    default:
      return role
  }
}
