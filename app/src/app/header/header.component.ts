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
    this.usdCurrency = await this.currencyRepository.usdCurrency()
    this.eurCurrency = await this.currencyRepository.eurCurrency()
  }

}
