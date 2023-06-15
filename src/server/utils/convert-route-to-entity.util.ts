const mapping: Record<string, string> = {
  appointments: 'appointment',
  customers: 'customer',
  salons: 'salon',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
