import { Component, ViewChild,
  AfterViewInit,
  ElementRef } from '@angular/core';
import {CurrencyInput} from "./interfaces/currency-input";
import {currencyRepository} from "./repositories/currencyRepository";
import {CurrencyInputComponent} from "./currency-input/currency-input.component"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'app';
  externalCurrencyInput: CurrencyInput|null = null;
  baseExtCurrency!: CurrencyInput;
  targetExtCurrency!: CurrencyInput;
  baseCompId = "baseCurrencyCompId";
  targetCompId = "targetCurrencyCompId";
  leftSelectCompChanged = "";
  rightSelectCompChanged = "";
  defaultBaseCurrencySelectCode!: string;
  defaultTargetCurrencySelectCode!: string;

  constructor(private currencyRepository: currencyRepository) { }
  @ViewChild('baseCurrencyComp') baseCurrencyCompRef!: CurrencyInputComponent;
  @ViewChild('targetCurrencyComp') targetCurrencyCompRef!: CurrencyInputComponent;
  
  ngAfterViewInit() {
    this.defaultBaseCurrencySelectCode = this.baseCurrencyCompRef.getCurrency();
    this.defaultTargetCurrencySelectCode = this.targetCurrencyCompRef.getCurrency();
    // console.log(`LLLL ${defaultBaseCurrencySelectCode} == ${defaultTargetCurrencySelectCode} LLLL`);
  }

  async updateInput(externalCurrencyInput: CurrencyInput) {
    this.externalCurrencyInput = externalCurrencyInput
    // console.log(this.externalCurrencyInput.compId +  " Selected currency =  " + externalCurrencyInput.code + " " + externalCurrencyInput.value);
    if (this.externalCurrencyInput.compId == this.baseCompId) {
      if(this.externalCurrencyInput.code != this.leftSelectCompChanged) {
        let result = await this.currencyRepository.convertBaseToAnotherCurrency(
          this.externalCurrencyInput.value,
          this.externalCurrencyInput.code,
          this.defaultTargetCurrencySelectCode
        );
        this.targetCurrencyCompRef.setValue(result.conversion_result);

        this.leftSelectCompChanged = externalCurrencyInput.code; //@todo
        this.baseExtCurrency = this.externalCurrencyInput;
        console.log(result.conversion_result);
      }
    }
    if (this.externalCurrencyInput.compId == this.targetCompId) {
      if(this.externalCurrencyInput.code != this.rightSelectCompChanged) {
        let result = await this.currencyRepository.convertBaseToAnotherCurrency(
          this.externalCurrencyInput.value,
          this.externalCurrencyInput.code,
          this.defaultBaseCurrencySelectCode // this.baseExtCurrency.code
        );
        this.baseCurrencyCompRef.setValue(result.conversion_result);
        this.rightSelectCompChanged = externalCurrencyInput.code; //@todo
        this.targetExtCurrency = this.externalCurrencyInput;
        console.log(result.conversion_result);
      }
    }

    // if(externalCurrencyInput.compId == this.baseCompId) {
    //   this.baseExtCurrency = externalCurrencyInput;
    //   this.firstCompChanged = this.baseCompId;      
    //   console.log("Left comp updated")
    // }
    // if(this.firstCompChanged == this.baseCompId && externalCurrencyInput.compId == this.targetCompId) {
    //   console.log("CONVERT")
    //   console.log("AMOUNT = " + this.baseExtCurrency.value);
    //   console.log("TARGET = " + this.externalCurrencyInput.code);
    //   console.log("BASE = " + this.baseExtCurrency.code);
    //   let result = await this.currencyRepository.convertBaseToAnotherCurrency(
    //     this.baseExtCurrency.value,
    //     this.externalCurrencyInput.code,
    //     this.baseExtCurrency.code
    //   );
    //   this.targetCurrencyCompRef.setValue(result.conversion_result)
    //   console.log(result.conversion_result);
    //   this.firstCompChanged =""
    // }

    // if(externalCurrencyInput.compId == this.targetCompId) {
    //   this.baseExtCurrency = externalCurrencyInput;
    //   this.firstCompChanged = this.targetCompId;      
    //   console.log("Right comp updated")
    // }
    // if(this.firstCompChanged == this.targetCompId && externalCurrencyInput.compId == this.baseCompId) {
    //   console.log("CONVERT")
    //   console.log("AMOUNT = " + this.targetExtCurrency.value);
    //   console.log("TARGET = " + this.externalCurrencyInput.code);
    //   console.log("BASE = " + this.targetExtCurrency.code);
    //   let result = await this.currencyRepository.convertBaseToAnotherCurrency(
    //     this.targetExtCurrency.value,
    //     this.externalCurrencyInput.code,
    //     this.targetExtCurrency.code
    //   );
    //   this.baseCurrencyCompRef.setValue(result.conversion_result)
    //   console.log(result.conversion_result);
    //   this.firstCompChanged =""
    // }
    // if(externalCurrencyInput.compId == this.targetCompId) {
    //   this.targetExtCurrency = externalCurrencyInput;
    //   this.firstCompChanged = this.targetCompId;
    //   console.log("First need to be updated")      
    // }
    // if(this.lastCompChanged == this.baseCompId) {
    //   console.log("AMOUNT = " + this.baseExtCurrency.value);
    //   console.log("TARGET = " + this.defaultTargetCurrencySelectCode);
    //   console.log("BASE = " + this.baseExtCurrency.code);
    //   // this.currencyRepository.convertBaseToAnotherCurrency(this.baseExtCurrency.value, this.targetExtCurrency.code, this.baseExtCurrency.code);
    // }
    
    
  }
}
