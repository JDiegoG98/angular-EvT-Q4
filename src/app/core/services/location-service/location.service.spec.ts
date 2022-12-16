import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import {environment} from "../../../../environments/environment";
import {ProductModel} from "../../../models/product.model";
import {PRODUCTSMOCK} from "../../mocks/product.mock";
import {ProvinceModel} from "../../../models/province.model";
import {PROVINCESMOCK} from "../../mocks/province.mock";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CityModel} from "../../../models/city.model";
import {CITIESMOCK} from "../../mocks/city.mock";

describe('LocationService', () => {
  let service: LocationService;
  const url = `${environment.api}/estado`;
  const mockProvinces: Array<ProvinceModel> = PROVINCESMOCK;
  const mockCities: Array<CityModel> = CITIESMOCK;

  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
      ],
      providers: [
        LocationService
      ]
    });
    service = TestBed.inject(LocationService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get provinces', () => {
    service.getProvinces().subscribe((provinces: ProvinceModel[]) => {
      expect(provinces).toEqual(mockProvinces)
    })

    const urlApi = `${url}/provincias`;
    const req = httpTestingController.expectOne(urlApi);

    expect(req.request.method).toEqual('GET');

    req.flush(mockProvinces);
  })

  it('get cities', () => {
    const provinceCode = 'AZ'
    service.getCities(provinceCode).subscribe((cities: CityModel[]) => {
      expect(cities).toEqual(mockCities)
    })

    const urlApi = `${url}/provincias/${provinceCode}`;
    const req = httpTestingController.expectOne(urlApi);

    expect(req.request.method).toEqual('GET');

    req.flush(mockProvinces);
  })
});
