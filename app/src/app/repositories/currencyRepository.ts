import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Currency } from "../interfaces/currency";

@Injectable()
export class currencyRepository {

  async convertBaseToAnotherCurrency(amount: number, baseCode: string, targetCode: string) {
    const url = `${environment.apiUrl}/pair/${baseCode}/${targetCode}/${amount}`;
    const resp = await fetch(url)
    return await resp.json(); //conversion_result
  }

  async usdCurrency() {
    const resp = await fetch(environment.apiUrl + '/latest/USD')
    return await resp.json()
  }

  async eurCurrency() {
    const resp = await fetch(environment.apiUrl + '/latest/EUR')
    return await resp.json()
  }

  async listAllCodes(): Promise<Currency[]> {
    return await fetch(environment.apiUrl + '/codes')
      .then(resp => {
        return resp.json()
      })
      .then(json => {
        return json.supported_codes.map(function (arr: any) {
          return arr[0]
        })
      })
      // .then(resp => {
      //   return resp.json()
      // })
      // .then(json => {
      //   return json.supported_codes.map(
      //     function (arr: any) {
      //       return { name: arr[0] }
      //     }
      //   ) as Promise<Currency[]>
      // })
  }

}

