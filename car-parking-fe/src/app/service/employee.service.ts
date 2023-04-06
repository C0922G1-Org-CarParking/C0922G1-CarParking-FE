import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Employee} from "../model/employee";


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private apiList = 'http://localhost:8080/api/admin/list-employee';
  private apiDelete = 'http://localhost:8080/api/admin/';


  constructor(private http: HttpClient) {
  }

  /**
   * Created by: DinhNTC
   * Date created: 04/03/2023
   * Function: add employee by call api back-end
   * @return status Ok
   */
  addEmployee(employee: Employee) {
    return this.http.post('http://localhost:8080/api/admin/create-employee', employee);
  }

  /**
   * Created by: DinhNTC
   * Date created: 04/03/2023
   * Function: find employee Id by call api back-end
   * @return id
   */
  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>('http://localhost:8080/api/admin/' + id);
  }

  /**
   * Created by: DinhNTC
   * Date created: 04/03/2023
   * Function: edit employee by call api back-end
   * @return status Ok
   */
  editEmployee(value: any) {
    return this.http.patch('http://localhost:8080/api/admin/update-employee/' + value.id, value);
  }


  /**
   * Created by: DinhNTC
   * Date created: 04/03/2023
   * Function: get all province by api online
   * @return data Province
   */
  getAllProvince(): Observable<any> {
    return this.http.get<any>('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1');
  }

  /**
   * Created by: DinhNTC
   * Date created: 04/03/2023
   * Function: get all district by call api back-end
   * @return data Distric
   */
  getAllDistrict(province: number): Observable<any> {
    return this.http.get<any>('https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=' + province + '&limit=-1');
  }

  /**
   * Created by: DinhNTC
   * Date created: 4/03/2023
   * Function: get  all commune by call api back-end
   * @return data commune
   */
  getAllCommune(district: number): Observable<any> {
    return this.http.get<any>('https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=' + district + '&limit=-1');
  }


  /**
   * Created by:TaiLH
   * Date created: 04/03/2023
   * Function: get list employee and search all field
   * @return status OK
   */
  getAllEmployee(
    page: number = 0,
    size: number,
    nameSearch: string = '',
    startDate: string = '',
    endDate: string = '',
    street: string = '',
    province: number
  ): Observable<Employee[]> {
    console.log(province)
    debugger
    return this.http.get<Employee[]>(
      this.apiList +
      '?page=' +
      page +
      '&size=' +
      size +
      '&name=' +
      nameSearch +
      '&startDate=' +
      startDate +
      '&endDate=' +
      endDate +
      '&street=' +
      street +
      '&province=' +
      province
    );
  }

  /**
   * Created by:TaiLH
   * Date created: 04/03/2023
   * Function: delete employee by id
   * @return status OK
   */
  deleteById(id: number) {
    return this.http.delete(this.apiDelete + id);
  }

  listEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:8080/api/user/ticket/listEmployee');
  }
}
