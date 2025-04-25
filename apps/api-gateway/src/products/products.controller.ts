import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { CreateProductDto, UpdateProductDto } from '@app/shared';

@Controller('products')
export class ProductsController {
  constructor(@Inject('PRODUCT_SERVICE') private readonly productClient: ClientKafka) {
    // 응답 토픽 구독 설정
    this.productClient.subscribeToResponseOf('createProduct');
    this.productClient.subscribeToResponseOf('findAllProducts');
    this.productClient.subscribeToResponseOf('findOneProduct');
    this.productClient.subscribeToResponseOf('updateProduct');
    this.productClient.subscribeToResponseOf('removeProduct');
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productClient.send('createProduct', createProductDto);
  }

  @Get()
  findAll() {
    return this.productClient.send('findAllProducts', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productClient.send('findOneProduct', +id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productClient.send('updateProduct', { id: +id, updateProductDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productClient.send('removeProduct', +id);
  }
}
