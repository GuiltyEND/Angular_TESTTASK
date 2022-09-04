import { Component, OnInit } from '@angular/core';
import {currencyRepository} from "../repositories/currencyRepository";
import {Currency} from "src/app/interfaces/currency";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  usdCurrency: Currency | null = null;
  eurCurrency: Currency | null = null;

  constructor(private currencyRepository: currencyRepository) { }

  ngOnInit(): void {
    this.fetchCurrencies()
  }

  private async fetchCurrencies() {
    this.currencyRepository.usdCurrency().subscribe({
      next: (response) => { //next() callback
        console.log('response received' + response)
        this.usdCurrency = response; 
      },
      error: (error) => { /*error() callback*/ },
      complete: () => { /*complete() callback*/ }
    });
    this.currencyRepository.eurCurrency().subscribe({
      next: (response) => { //next() callback
        console.log('response received' + response)
        this.eurCurrency = response; 
      },
      error: (error) => { /*error() callback*/ },
      complete: () => { /*complete() callback*/}
    });    
  }

}
