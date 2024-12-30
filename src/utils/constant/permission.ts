export interface Permission {
  identifier: string;
  group: string;
}

export const PERMISSIONS: Permission[] = [
  {
    group: 'user',
    identifier: 'user:create',
  },
  {
    group: 'user',
    identifier: 'user:update',
  },
  {
    group: 'user',
    identifier: 'user:delete',
  },
  {
    group: 'user',
    identifier: 'user:view',
  },
  {
    group: 'role',
    identifier: 'role:create',
  },
  {
    group: 'role',
    identifier: 'role:update',
  },
  {
    group: 'role',
    identifier: 'role:delete',
  },
  {
    group: 'role',
    identifier: 'role:view',
  },
];
