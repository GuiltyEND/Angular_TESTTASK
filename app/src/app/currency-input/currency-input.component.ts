import { Component, ElementRef, OnInit } from '@angular/core';
import { environment } from "../../environments/environment";
import { Input, Output, EventEmitter } from '@angular/core';
import { CurrencyInput } from "../interfaces/currency-input";
import { currencyRepository } from '../repositories/currencyRepository';
import { ChangedComponent } from '../utils/changedComponent';


@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss']
})

export class CurrencyInputComponent implements OnInit {
  
  codes: string[] = [];
  defaultCurrency = 'USD';
  
  prevValue: number = 0;
  prevCurrency: string = this.defaultCurrency;
  
  currencyInput: CurrencyInput = { //Input values
    code: this.defaultCurrency,
    value: 1,
    compId: "",
    changed: ChangedComponent.CURRENCY,
    byUser: false
  };

  @Input() set externalCurrencyInput(obj: CurrencyInput | null) {
    if (obj === null) {
      return
    }

    if (obj.code === this.currencyInput.code && obj.value === this.currencyInput.value) {
      return
    }    
  }

  @Output() onInputChange = new EventEmitter<CurrencyInput>();

  constructor(private currencyRepository: currencyRepository, private elementRef: ElementRef) {
    this.currencyInput.compId = this.elementRef.nativeElement.getAttribute('id');
  }

  ngOnInit(): void {    
    this.fetchCodes()
  }
  
  isNumeric(value: string) : boolean {
    return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())));
  }
  
  setValue(value: string, isUserAction: boolean) {
    this.currencyInput.value = parseFloat(value);
    this.currencyInput.changed = ChangedComponent.AMOUNT;
    this.currencyInput.byUser = isUserAction;
    //console.log(`In ${this.currencyInput.compId} byUser is set ${this.currencyInput.byUser}`);
    if(isUserAction) {
      this.onInputChange.emit(this.currencyInput)
    }
  }

  setCurrency(code: string, isUserAction: boolean) {
    this.currencyInput.code = code;
    this.currencyInput.changed = ChangedComponent.CURRENCY;
    this.currencyInput.byUser = isUserAction;
    if(isUserAction) {
      this.onInputChange.emit(this.currencyInput);
    }
  }

  getCurrency(): string {
    return this.currencyInput.code;
  }

  getValue(): number {
    return this.currencyInput.value;
  }
 
  fetchCodes() {
    this.currencyRepository.listAllCodes().subscribe({
      next: (response) => { //next() callback
        this.codes = response.supported_codes.map(function (arr: string[]) {
          return arr[0];
        }); 
      },
      error: (error) => { /*error() callback*/ },
      complete: () => { /*complete() callback*/}
    });       
  }

}
