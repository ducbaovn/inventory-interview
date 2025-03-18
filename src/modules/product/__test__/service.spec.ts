import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '../../../application/configs/database.config';
import { OrderTypeEnum } from '../../../application/enum';
import { EntityNotFoundException } from '../../../application/exceptions/not_found.exception';
import { BrandEntity } from '../../brand/entity';
import { BrandStatusEnum } from '../../brand/enum';
import { BrandModule } from '../../brand/module';
import { BrandService } from '../../brand/service';
import { TestModule } from '../../test/module';
import { TestService } from '../../test/service';
import { ProductEntity } from '../entity';
import { ProductStatusEnum } from '../enum';
import { UpdateProductInput } from '../input/update_product.input';
import { ProductModule } from '../module';
import { ProductService } from '../service';
import { galaxyS7 } from './__mock__/galaxy_s7';
import { galaxyS8 } from './__mock__/galaxy_s8';
import { galaxyS9 } from './__mock__/galaxy_s9';
import { iphone12 } from './__mock__/iphone12';
import { iphone13 } from './__mock__/iphone13';

describe('ProductService', () => {
  let app: INestApplication;
  let service: ProductService;
  let brandService: BrandService;
  let samsung: BrandEntity;
  let apple: BrandEntity;
  let testService: TestService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(databaseConfig), BrandModule, ProductModule, TestModule],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication();
    service = app.get(ProductService);
    brandService = app.get(BrandService);
    testService = app.get(TestService);
    await testService.clearDb();
  });
  afterAll(async () => {
    await app.close();
  });
  beforeEach(async () => {
    samsung = await brandService.createBrand({
      name: 'Samsung',
      country: 'KOR',
      status: BrandStatusEnum.ACTIVE,
    });
    apple = await brandService.createBrand({
      name: 'Apple',
      country: 'USA',
      status: BrandStatusEnum.ACTIVE,
    });
  });
  afterEach(async () => {
    await testService.clearDb();
  });
  describe('createProduct', () => {
    it('should create Product successfully', async () => {
      const product = await service.createProduct({
        ...galaxyS8,
        brandId: samsung.id,
      });
      expect(product).toBeDefined();
      expect(product.id).toBeDefined();
      expect(product.name).toBe(galaxyS8.name);
      expect(product.brandId).toBe(samsung.id);
      expect(product.os).toBe(galaxyS8.os);
      expect(product.status).toBe(ProductStatusEnum.ACTIVE);
      expect(product.colors).toStrictEqual(galaxyS8.colors);
      expect(product.memoryCapacity).toBe(galaxyS8.memoryCapacity);
      expect(product.storageCapacity).toBe(galaxyS8.storageCapacity);
      expect(product.yearOfManufacture).toBe(galaxyS8.yearOfManufacture);

      const productDB = await service.getProduct(product.id);
      expect(productDB.id).toBe(product.id);
      expect(productDB.name).toBe(galaxyS8.name);
      expect(productDB.brandId).toBe(samsung.id);
      expect(productDB.os).toBe(galaxyS8.os);
      expect(productDB.status).toBe(ProductStatusEnum.ACTIVE);
      expect(productDB.colors).toStrictEqual(galaxyS8.colors);
      expect(productDB.memoryCapacity).toBe(galaxyS8.memoryCapacity);
      expect(productDB.storageCapacity).toBe(galaxyS8.storageCapacity);
      expect(productDB.yearOfManufacture).toBe(galaxyS8.yearOfManufacture);
    });
  });
  describe('updateProduct', () => {
    let product: ProductEntity;
    beforeEach(async () => {
      product = await service.createProduct({
        ...galaxyS8,
        brandId: samsung.id,
      });
    });
    it('should update Product successfully', async () => {
      const input = new UpdateProductInput();
      input.name = iphone12.name;
      input.brandId = apple.id;
      input.os = iphone12.os;
      input.colors = iphone12.colors;
      input.memoryCapacity = iphone12.memoryCapacity;
      input.storageCapacity = iphone12.storageCapacity;
      input.yearOfManufacture = iphone12.yearOfManufacture;
      const updatedProduct = await service.updateProduct(product.id, input);
      expect(updatedProduct).toBeDefined();
      expect(updatedProduct.id).toBe(product.id);
      expect(updatedProduct.name).toBe(iphone12.name);
      expect(updatedProduct.brandId).toBe(apple.id);
      expect(updatedProduct.os).toBe(iphone12.os);
      expect(updatedProduct.status).toBe(ProductStatusEnum.ACTIVE);
      expect(updatedProduct.colors).toStrictEqual(iphone12.colors);
      expect(updatedProduct.memoryCapacity).toBe(iphone12.memoryCapacity);
      expect(updatedProduct.storageCapacity).toBe(iphone12.storageCapacity);
      expect(updatedProduct.yearOfManufacture).toBe(iphone12.yearOfManufacture);

      const productDB = await service.getProduct(product.id);
      expect(productDB).toBeDefined();
      expect(productDB.id).toBe(product.id);
      expect(productDB.name).toBe(iphone12.name);
      expect(productDB.brandId).toBe(apple.id);
      expect(productDB.os).toBe(iphone12.os);
      expect(productDB.status).toBe(ProductStatusEnum.ACTIVE);
      expect(productDB.colors).toStrictEqual(iphone12.colors);
      expect(productDB.memoryCapacity).toBe(iphone12.memoryCapacity);
      expect(productDB.storageCapacity).toBe(iphone12.storageCapacity);
      expect(productDB.yearOfManufacture).toBe(iphone12.yearOfManufacture);
    });
    it('should throw ENTITY_NOT_FOUND exception', async () => {
      try {
        const input = new UpdateProductInput();
        input.name = 'iphone 12';
        const updatedProduct = await service.updateProduct(0, input);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(EntityNotFoundException);
      }
    });
  });
  describe('activateProduct', () => {
    let product: ProductEntity;
    beforeEach(async () => {
      product = await service.createProduct({
        ...galaxyS7,
        brandId: samsung.id,
      });
    });
    afterEach(async () => {
      await testService.clearDb();
    });
    it('should activate Product successfully', async () => {
      const updatedProduct = await service.activateProduct(product.id);
      expect(updatedProduct).toBeDefined();
      expect(updatedProduct.id).toBe(product.id);
      expect(updatedProduct.name).toBe(product.name);
      expect(updatedProduct.brandId).toBe(samsung.id);
      expect(updatedProduct.os).toBe(galaxyS7.os);
      expect(updatedProduct.status).toBe(ProductStatusEnum.ACTIVE);
      expect(updatedProduct.colors).toStrictEqual(galaxyS7.colors);
      expect(updatedProduct.memoryCapacity).toBe(galaxyS7.memoryCapacity);
      expect(updatedProduct.storageCapacity).toBe(galaxyS7.storageCapacity);
      expect(updatedProduct.yearOfManufacture).toBe(galaxyS7.yearOfManufacture);

      const productDB = await service.getProduct(product.id);
      expect(productDB).toBeDefined();
      expect(productDB.name).toBe(product.name);
      expect(productDB.brandId).toBe(samsung.id);
      expect(productDB.os).toBe(galaxyS7.os);
      expect(productDB.status).toBe(ProductStatusEnum.ACTIVE);
      expect(productDB.colors).toStrictEqual(galaxyS7.colors);
      expect(productDB.memoryCapacity).toBe(galaxyS7.memoryCapacity);
      expect(productDB.storageCapacity).toBe(galaxyS7.storageCapacity);
      expect(productDB.yearOfManufacture).toBe(galaxyS7.yearOfManufacture);
    });
    it('should throw ENTITY_NOT_FOUND exception', async () => {
      try {
        const updatedProduct = await service.activateProduct(0);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(EntityNotFoundException);
      }
    });
  });
  describe('deactivateProduct', () => {
    let product: ProductEntity;
    beforeEach(async () => {
      product = await service.createProduct({
        ...galaxyS8,
        brandId: samsung.id,
      });
    });
    afterEach(async () => {
      await testService.clearDb();
    });
    it('should deactivate Product successfully', async () => {
      const updatedProduct = await service.deactivateProduct(product.id);
      expect(updatedProduct).toBeDefined();
      expect(updatedProduct.id).toBe(product.id);
      expect(updatedProduct.name).toBe(product.name);
      expect(updatedProduct.brandId).toBe(samsung.id);
      expect(updatedProduct.os).toBe(galaxyS8.os);
      expect(updatedProduct.status).toBe(ProductStatusEnum.INACTIVE);
      expect(updatedProduct.colors).toStrictEqual(galaxyS8.colors);
      expect(updatedProduct.memoryCapacity).toBe(galaxyS8.memoryCapacity);
      expect(updatedProduct.storageCapacity).toBe(galaxyS8.storageCapacity);
      expect(updatedProduct.yearOfManufacture).toBe(galaxyS8.yearOfManufacture);

      const productDB = await service.getProduct(product.id);
      expect(productDB).toBeDefined();
      expect(productDB.name).toBe(product.name);
      expect(productDB.brandId).toBe(samsung.id);
      expect(productDB.os).toBe(galaxyS8.os);
      expect(productDB.status).toBe(ProductStatusEnum.INACTIVE);
      expect(productDB.colors).toStrictEqual(galaxyS8.colors);
      expect(productDB.memoryCapacity).toBe(galaxyS8.memoryCapacity);
      expect(productDB.storageCapacity).toBe(galaxyS8.storageCapacity);
      expect(productDB.yearOfManufacture).toBe(galaxyS8.yearOfManufacture);
    });
    it('should throw ENTITY_NOT_FOUND exception', async () => {
      try {
        const updatedProduct = await service.deactivateProduct(0);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(EntityNotFoundException);
      }
    });
  });
  describe('get list', () => {
    beforeEach(async () => {
      const inputs = [
        {
          ...galaxyS7,
          brandId: samsung.id,
        },
        {
          ...galaxyS8,
          brandId: samsung.id,
        },
        {
          ...galaxyS9,
          brandId: samsung.id,
        },
        {
          ...iphone12,
          brandId: apple.id,
        },
        {
          ...iphone13,
          brandId: apple.id,
        },
      ];
      for (const input of inputs) {
        await service.createProduct(input);
      }
    });
    describe('list Products', () => {
      it('limit=3, default orderBy, default orderType', async () => {
        const products = await service.listProducts({}, { limit: 3 });
        expect(products).toHaveLength(3);
        expect(products[0].name).toBe('iphone 13');
        expect(products[1].name).toBe('iphone 12');
        expect(products[2].name).toBe('Galaxy S9');
      });
      it('offset=3, default orderBy, default orderType', async () => {
        const products = await service.listProducts({}, { offset: 3 });
        expect(products).toHaveLength(2);
        expect(products[0].name).toBe('Galaxy S8');
        expect(products[1].name).toBe('Galaxy S7');
      });
      it('orderType=ASC, default orderBy', async () => {
        const products = await service.listProducts({}, { orderType: OrderTypeEnum.ASC });
        expect(products).toHaveLength(5);
        expect(products[0].name).toBe('Galaxy S7');
        expect(products[1].name).toBe('Galaxy S8');
        expect(products[2].name).toBe('Galaxy S9');
        expect(products[3].name).toBe('iphone 12');
        expect(products[4].name).toBe('iphone 13');
      });
      it('filter status=ACTIVE', async () => {
        const products = await service.listProducts({ status: ProductStatusEnum.ACTIVE }, {});
        expect(products).toHaveLength(4);
        expect(products[0].name).toBe('iphone 13');
        expect(products[1].name).toBe('iphone 12');
        expect(products[2].name).toBe('Galaxy S9');
        expect(products[3].name).toBe('Galaxy S8');
      });
      it('filter brand=apple', async () => {
        const products = await service.listProducts({ brandId: apple.id }, {});
        expect(products).toHaveLength(2);
        expect(products[0].name).toBe('iphone 13');
        expect(products[1].name).toBe('iphone 12');
      });
    });
    describe('count Products', () => {
      it('without filter', async () => {
        const count = await service.countProducts({});
        expect(count).toBe(5);
      });
      it('filter status=ACTIVE', async () => {
        const count = await service.countProducts({ status: ProductStatusEnum.ACTIVE });
        expect(count).toBe(4);
      });
      it('filter status=INACTIVE', async () => {
        const count = await service.countProducts({ status: ProductStatusEnum.INACTIVE });
        expect(count).toBe(1);
      });
    });
  });
});
