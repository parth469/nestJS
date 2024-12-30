import { PrismaClient } from '@prisma/client';
import { PERMISSIONS } from '../constant/permission';

const prisma = new PrismaClient();

async function permissionUpsert() {
  try {
    console.log('Starting permission upsert...');

    const permissionPromises = PERMISSIONS.map((permission) =>
      prisma.permission.upsert({
        where: { identifier: permission.identifier },
        update: { group: permission.group },
        create: {
          group: permission.group,
          identifier: permission.identifier,
        },
      }),
    );

    const results = await Promise.all(permissionPromises);
    console.log(`Successfully upserted ${results.length} permissions`);

    await prisma.$disconnect();
  } catch (error) {
    console.error('Failed to upsert permissions:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

permissionUpsert()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
