import { Component, ViewChild,
  AfterViewInit,
  ElementRef, 
  ViewChildren,
  QueryList} from '@angular/core';
import {CurrencyInput} from "./interfaces/currency-input";
import {currencyRepository} from "./repositories/currencyRepository";
import {CurrencyInputComponent} from "./currency-input/currency-input.component"
import { ChangedComponent } from './utils/changedComponent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit{
  title = 'app';
  externalCurrencyInput: CurrencyInput|null = null;  
  childrenCompList!: CurrencyInputComponent[];  

  @ViewChildren(CurrencyInputComponent) private childInputCompList!: QueryList<CurrencyInputComponent>;

  constructor(private currencyRepository: currencyRepository) { }

  ngAfterViewInit() {
    this.childrenCompList = this.childInputCompList.toArray();    
  }
  
  getChildrenValuesState(): string[] {
    let newState: any[] = [];
    this.childrenCompList.forEach(el => {
      newState = [ ...newState,
         el.getCurrency(),
         el.getValue(),
         el.currencyInput.changed,
         el.currencyInput.byUser ]      
    });
    return newState;
  }
  
  convertBaseToTargetCurrency(amount: number,
      baseCode: string,
      targetCode: string,
      reverseConvertion: boolean) {

    this.currencyRepository.convertBaseToAnotherCurrency(
      amount, baseCode, targetCode, 
    ).subscribe({
      next: (response) => { //next() callback
        let index = (reverseConvertion) ? 0 : 1;
        this.childrenCompList[index].setValue(response.conversion_result, false);
      },
      error: (error) => { /*error() callback*/ },
      complete: () => { /*complete() callback*/}
    });
  }

  async updateInput(externalCurrencyInput: CurrencyInput) {
    this.externalCurrencyInput = externalCurrencyInput
    let newState = this.getChildrenValuesState(); /*ex: ['USD', 1, 0, false, 'UAH', 2.9153, 0, true]*/ 
     
    if (newState[3] && Number(newState[2]) === 1) {
      this.convertBaseToTargetCurrency(parseFloat(newState[1]), newState[0], newState[4], false);    
      return;
    }

    if (newState[3] && Number(newState[2]) === 0) {
      if(Number(newState[6]) !== 1) {
        this.convertBaseToTargetCurrency(parseFloat(newState[1]), newState[0], newState[4], false);
        return;
      }
      if(!newState[7]) {
        this.convertBaseToTargetCurrency(parseFloat(newState[1]), newState[0], newState[4], false);
        return;
      }
    } 
    
    if (newState[7] && Number(newState[6]) === 1) {
      this.convertBaseToTargetCurrency(parseFloat(newState[5]), newState[4], newState[0], true);        
      return;
    }

    if (newState[7] && Number(newState[6]) === 0) {
      this.convertBaseToTargetCurrency(parseFloat(newState[1]), newState[0], newState[4], false);    
      return;
    }
  }
}