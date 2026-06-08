import { PrismaPg } from '@prisma/adapter-pg';
import { PRODUCTS } from '../src/products/product.js';
import { PrismaClient } from './generated/client.js';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding products...');

  for (const product of PRODUCTS) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice ?? null,
        category: product.category,
        description: product.description,
        image: product.image,
        rating: product.rating,
        reviewCount: product.reviewCount,
        inStock: product.inStock,
        badge: product.badge ?? null,
      },
      create: {
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice ?? null,
        category: product.category,
        description: product.description,
        image: product.image,
        rating: product.rating,
        reviewCount: product.reviewCount,
        inStock: product.inStock,
        badge: product.badge ?? null,
      },
    });
  }

  console.log(`Seeded ${PRODUCTS.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
