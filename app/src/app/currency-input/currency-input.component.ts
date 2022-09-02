import { Component, ElementRef, OnInit } from '@angular/core';
import { environment } from "../../environments/environment";
import { Input, Output, EventEmitter } from '@angular/core';
import { CurrencyInput } from "../interfaces/currency-input";
import { currencyRepository } from '../repositories/currencyRepository';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss']
})

export class CurrencyInputComponent implements OnInit {
  
  codes: any = []
  defaultCurrency = 'USD'  
  currencyInput: CurrencyInput = { //Input values
    code: this.defaultCurrency,
    value: 1,
    compId: ""
  }

  constructor(private currencyRepository: currencyRepository, private elementRef: ElementRef) {
    this.currencyInput.compId = this.elementRef.nativeElement.getAttribute('id');
   }

  @Input() set externalCurrencyInput(obj: CurrencyInput | null) {
    if (obj === null) {
      return
    }

    if (obj.code === this.currencyInput.code && obj.value === this.currencyInput.value) {
      return
    }
    //UAH 5 * 37.17   USD 5

    //TODO
    // 1) API request https://www.exchangerate-api.com/docs/pair-conversion-requests
    // https://v6.exchangerate-api.com/v6/:token/pair/USD/UAH
    // 2) Multiply obj.value with "conversion_rate" from request
    // console.log("Input " + obj)
  }

  @Output() onInputChange = new EventEmitter<CurrencyInput>();

  setValue(value: string) {
    this.currencyInput.value = parseFloat(value)
    this.onInputChange.emit(this.currencyInput)
    // console.log(value)
  }

  setCurrency(code: string) {
    this.currencyInput.code = code
    this.onInputChange.emit(this.currencyInput)
    // console.log(code)
  }

  getCurrency(): string {
    return this.currencyInput.code;
  }
 
  ngOnInit(): void {    
    this.fetchCodes()
  }

  async fetchCodes() {
    this.codes = await this.currencyRepository.listAllCodes();
  }


}
