import { Injectable } from '@nestjs/common';
import { ActionResponse, PaginatedProducts, Product } from '@org/lib';
import { DatabaseService } from 'src/database/database.service.js';
import { ProductDTO } from 'src/dtos/product.dto.js';

@Injectable()
export class ProductsService {
  constructor(private readonly db: DatabaseService) {}

  async getAllProducts(
    page = 1,
    limit = 20,
  ): Promise<ActionResponse<PaginatedProducts>> {
    try {
      const skip = (page - 1) * limit;
      const [items, total] = await this.db.$transaction([
        this.db.product.findMany({ skip, take: limit, orderBy: { id: 'asc' } }),
        this.db.product.count(),
      ]);
      const totalPages = Math.ceil(total / limit);

      return {
        status: true,
        data: {
          products: items as unknown as Product[],
          page,
          totalPages,
          hasNextPage: page < totalPages,
        },
      };
    } catch (error) {
      return {
        status: false,
        errors: {
          message: error instanceof Error ? error.message : 'Failed to load.',
        },
      };
    }
  }

  async getProductById(id: string): Promise<ActionResponse<ProductDTO>> {
    try {
      const product = await this.db.product.findUnique({ where: { id } });
      if (!product) {
        return { status: false, errors: { message: 'Product not found.' } };
      }
      return { status: true, data: product };
    } catch (error) {
      return {
        status: false,
        errors: {
          message: error instanceof Error ? error.message : 'Failed to load.',
        },
      };
    }
  }

  async getProductsByCategory(
    category: string,
    excludeId: string,
  ): Promise<ActionResponse<ProductDTO[]>> {
    try {
      const products = await this.db.product.findMany({
        where: { category, NOT: { id: excludeId } },
        take: 4,
      });
      return { status: true, data: products };
    } catch (error) {
      return {
        status: false,
        errors: {
          message: error instanceof Error ? error.message : 'Failed to load.',
        },
      };
    }
  }
}
