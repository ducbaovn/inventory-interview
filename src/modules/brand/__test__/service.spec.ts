import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '../../../application/configs/database.config';
import { OrderTypeEnum } from '../../../application/enum';
import { EntityNotFoundException } from '../../../application/exceptions/not_found.exception';
import { TestModule } from '../../test/module';
import { TestService } from '../../test/service';
import { BrandEntity } from '../entity';
import { BrandStatusEnum } from '../enum';
import { CreateBrandInput } from '../input/create_brand.input';
import { UpdateBrandInput } from '../input/update_brand.input';
import { BrandModule } from '../module';
import { BrandService } from '../service';

describe('BrandService', () => {
  let app: INestApplication;
  let service: BrandService;
  let testService: TestService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(databaseConfig), BrandModule, TestModule],
      providers: [],
    }).compile();

    app = moduleRef.createNestApplication();
    service = app.get(BrandService);
    testService = app.get(TestService);
    await testService.clearDb();
  });
  afterAll(async () => {
    await app.close();
  });
  describe('createBrand', () => {
    afterEach(async () => {
      await testService.clearDb();
    });
    it('should create brand successfully', async () => {
      const input = new CreateBrandInput();
      input.name = 'Samsung';
      input.country = 'KOR';
      input.status = BrandStatusEnum.ACTIVE;
      const brand = await service.createBrand(input);
      expect(brand).toBeDefined();
      expect(brand.id).toBeDefined();
      expect(brand.name).toBe('Samsung');
      expect(brand.country).toBe('KOR');
      expect(brand.status).toBe(BrandStatusEnum.ACTIVE);

      const brandDB = await service.getBrand(brand.id);
      expect(brandDB).toBeDefined();
      expect(brandDB.id).toBe(brand.id);
      expect(brandDB.name).toBe('Samsung');
      expect(brandDB.country).toBe('KOR');
      expect(brandDB.status).toBe(BrandStatusEnum.ACTIVE);
    });
  });
  describe('updateBrand', () => {
    let brand: BrandEntity;
    beforeEach(async () => {
      const input = new CreateBrandInput();
      input.name = 'Samsung';
      input.country = 'KOR';
      input.status = BrandStatusEnum.ACTIVE;
      brand = await service.createBrand(input);
    });
    afterEach(async () => {
      await testService.clearDb();
    });
    it('should update brand successfully', async () => {
      const input = new UpdateBrandInput();
      input.name = 'Apple';
      input.country = 'USA';
      const updatedBrand = await service.updateBrand(brand.id, input);
      expect(updatedBrand).toBeDefined();
      expect(updatedBrand.id).toBe(brand.id);
      expect(updatedBrand.name).toBe('Apple');
      expect(updatedBrand.country).toBe('USA');
      expect(updatedBrand.status).toBe(BrandStatusEnum.ACTIVE);

      const brandDB = await service.getBrand(brand.id);
      expect(brandDB).toBeDefined();
      expect(brandDB.id).toBe(brand.id);
      expect(brandDB.name).toBe('Apple');
      expect(brandDB.country).toBe('USA');
      expect(brandDB.status).toBe(BrandStatusEnum.ACTIVE);
    });
    it('should throw ENTITY_NOT_FOUND exception', async () => {
      try {
        const input = new UpdateBrandInput();
        input.name = 'Apple';
        input.country = 'USA';
        const updatedBrand = await service.updateBrand(0, input);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(EntityNotFoundException);
      }
    });
  });
  describe('activateBrand', () => {
    let brand: BrandEntity;
    beforeEach(async () => {
      const input = new CreateBrandInput();
      input.name = 'Samsung';
      input.country = 'KOR';
      input.status = BrandStatusEnum.INACTIVE;
      brand = await service.createBrand(input);
    });
    afterEach(async () => {
      await testService.clearDb();
    });
    it('should activate brand successfully', async () => {
      const updatedBrand = await service.activateBrand(brand.id);
      expect(updatedBrand).toBeDefined();
      expect(updatedBrand.id).toBe(brand.id);
      expect(updatedBrand.name).toBe('Samsung');
      expect(updatedBrand.country).toBe('KOR');
      expect(updatedBrand.status).toBe(BrandStatusEnum.ACTIVE);

      const brandDB = await service.getBrand(brand.id);
      expect(brandDB).toBeDefined();
      expect(brandDB.id).toBe(brand.id);
      expect(brandDB.name).toBe('Samsung');
      expect(brandDB.country).toBe('KOR');
      expect(brandDB.status).toBe(BrandStatusEnum.ACTIVE);
    });
    it('should throw ENTITY_NOT_FOUND exception', async () => {
      try {
        const updatedBrand = await service.activateBrand(0);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(EntityNotFoundException);
      }
    });
  });
  describe('deactivateBrand', () => {
    let brand: BrandEntity;
    beforeEach(async () => {
      const input = new CreateBrandInput();
      input.name = 'Samsung';
      input.country = 'KOR';
      input.status = BrandStatusEnum.ACTIVE;
      brand = await service.createBrand(input);
    });
    afterEach(async () => {
      await testService.clearDb();
    });
    it('should activate brand successfully', async () => {
      const updatedBrand = await service.deactivateBrand(brand.id);
      expect(updatedBrand).toBeDefined();
      expect(updatedBrand.id).toBe(brand.id);
      expect(updatedBrand.name).toBe('Samsung');
      expect(updatedBrand.country).toBe('KOR');
      expect(updatedBrand.status).toBe(BrandStatusEnum.INACTIVE);

      const brandDB = await service.getBrand(brand.id);
      expect(brandDB).toBeDefined();
      expect(brandDB.id).toBe(brand.id);
      expect(brandDB.name).toBe('Samsung');
      expect(brandDB.country).toBe('KOR');
      expect(brandDB.status).toBe(BrandStatusEnum.INACTIVE);
    });
    it('should throw ENTITY_NOT_FOUND exception', async () => {
      try {
        const updatedBrand = await service.deactivateBrand(0);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(EntityNotFoundException);
      }
    });
  });
  describe('get list', () => {
    beforeAll(async () => {
      const inputs = [
        {
          name: 'Apple',
          country: 'USA',
          status: BrandStatusEnum.ACTIVE,
        },
        {
          name: 'Motorola',
          country: 'USA',
          status: BrandStatusEnum.INACTIVE,
        },
        {
          name: 'Samsung',
          country: 'KOR',
          status: BrandStatusEnum.ACTIVE,
        },
        {
          name: 'LG',
          country: 'KOR',
          status: BrandStatusEnum.INACTIVE,
        },
        {
          name: 'BKAV',
          country: 'VIE',
          status: BrandStatusEnum.INACTIVE,
        },
      ];
      for (const input of inputs) {
        await service.createBrand(input);
      }
    });
    afterAll(async () => {
      await testService.clearDb();
    });
    describe('list brands', () => {
      it('limit=3, default orderBy, default orderType', async () => {
        const brands = await service.listBrands({}, { limit: 3 });
        expect(brands).toHaveLength(3);
        expect(brands[0].name).toBe('BKAV');
        expect(brands[1].name).toBe('LG');
        expect(brands[2].name).toBe('Samsung');
      });
      it('offset=3, default orderBy, default orderType', async () => {
        const brands = await service.listBrands({}, { offset: 3 });
        expect(brands).toHaveLength(2);
        expect(brands[0].name).toBe('Motorola');
        expect(brands[1].name).toBe('Apple');
      });
      it('orderType=ASC, default orderBy', async () => {
        const brands = await service.listBrands({}, { orderType: OrderTypeEnum.ASC });
        expect(brands).toHaveLength(5);
        expect(brands[0].name).toBe('Apple');
        expect(brands[1].name).toBe('Motorola');
        expect(brands[2].name).toBe('Samsung');
        expect(brands[3].name).toBe('LG');
        expect(brands[4].name).toBe('BKAV');
      });
      it('filter status=ACTIVE', async () => {
        const brands = await service.listBrands({ status: BrandStatusEnum.ACTIVE }, {});
        expect(brands).toHaveLength(2);
        expect(brands[0].name).toBe('Samsung');
        expect(brands[1].name).toBe('Apple');
      });
    });
    describe('count brands', () => {
      it('without filter', async () => {
        const count = await service.countBrands({});
        expect(count).toBe(5);
      });
      it('filter status=ACTIVE', async () => {
        const count = await service.countBrands({ status: BrandStatusEnum.ACTIVE });
        expect(count).toBe(2);
      });
      it('filter status=INACTIVE', async () => {
        const count = await service.countBrands({ status: BrandStatusEnum.INACTIVE });
        expect(count).toBe(3);
      });
    });
  });
});
