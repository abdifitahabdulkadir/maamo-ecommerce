import { PrismaPg } from '@prisma/adapter-pg';
import {
  generateProductBatch,
  TOTAL_PRODUCTS,
} from '../src/products/product.js';
import { PrismaClient } from './generated/client.js';

const BATCH_SIZE = 10_000;

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(`Seeding ${TOTAL_PRODUCTS.toLocaleString()} products...`);

  for (let start = 0; start < TOTAL_PRODUCTS; start += BATCH_SIZE) {
    const count = Math.min(BATCH_SIZE, TOTAL_PRODUCTS - start);
    const batch = generateProductBatch(start, count);

    await prisma.product.createMany({
      data: batch.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        originalPrice: p.originalPrice ?? null,
        category: p.category,
        description: p.description,
        image: p.image,
        rating: p.rating,
        reviewCount: p.reviewCount,
        inStock: p.inStock,
        badge: p.badge ?? null,
      })),
      skipDuplicates: true,
    });

    const seeded = start + count;
    if (seeded % 500_000 === 0 || seeded === TOTAL_PRODUCTS) {
      const pct = Math.round((seeded / TOTAL_PRODUCTS) * 100);
      console.log(
        `  ${seeded.toLocaleString()} / ${TOTAL_PRODUCTS.toLocaleString()} (${pct}%)`,
      );
    }
  }

  console.log('Done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
