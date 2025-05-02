import { CreateProductDto, UpdateProductDto } from '@app/shared';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('createProduct')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern('findAllProducts')
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern('findOneProduct')
  findOne(@Payload() id: number) {
    return this.productsService.findOne(id);
  }

  @MessagePattern('updateProduct')
  update(@Payload() payload: { id: number; updateProductDto: UpdateProductDto }) {
    return this.productsService.update(payload.id, payload.updateProductDto);
  }

  @MessagePattern('removeProduct')
  remove(@Payload() id: number) {
    return this.productsService.remove(id);
  }
}
