import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Currency } from "../interfaces/currency";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';


@Injectable()
export class currencyRepository {
  constructor(private http: HttpClient) { }

  convertBaseToAnotherCurrency(
      amount: number,
      baseCode: string,
      targetCode: string): Observable<any> {
    const url = `${environment.apiUrl}/pair/${baseCode}/${targetCode}/${amount}`;
    return this.http.get(url);
  }

  usdCurrency(): Observable<any> {
    return this.http.get(environment.apiUrl + '/latest/USD')    
  }

  eurCurrency(): Observable<any> {
    return this.http.get(environment.apiUrl + '/latest/EUR')    
  }

  listAllCodes(): Observable<any> {
    return this.http.get(environment.apiUrl + '/codes')
  }

}

