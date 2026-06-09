import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SessionAuthGuard } from 'src/auth/guards/session-auth.guard.js';
import { ProductsService } from './products.service.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @UseGuards(SessionAuthGuard)
  @Get('/')
  async getProdcuts(
    @Query('page', ParseIntPipe) page?: number,
    @Query('limit', ParseIntPipe) limit?: number,
  ) {
    return await this.productService.getAllProducts(
      page ? page : 1,
      limit ? limit : 20,
    );
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
