import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { SessionAuthGuard } from 'src/auth/guards/session-auth.guard.js';
import { ProductsService } from './products.service.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @UseGuards(SessionAuthGuard)
  @Get('/')
  async getProdcuts() {
    return await this.productService.getAllProducts();
  }

  @UseGuards(SessionAuthGuard)
  @Get('/related')
  async getRelatedProducts(
    @Query('category') category: string,
    @Query('excludeId') excludeId: string,
  ) {
    return await this.productService.getProductsByCategory(category, excludeId);
  }

  @UseGuards(SessionAuthGuard)
  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }
}
