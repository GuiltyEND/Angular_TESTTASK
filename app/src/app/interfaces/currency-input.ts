import { ChangedComponent } from '../utils/changedComponent';

export interface CurrencyInput {
  code: string  // USD
  value: number // 5
  compId: string 
  changed: ChangedComponent
  byUser: boolean
}
