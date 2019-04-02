import { FilterType } from './component/autocomplete/autocomplete.enum';

export function EnumsAware(constructor: Function) {
    constructor.prototype.FilterType = FilterType;
}

export class Enums {
    FilterType = FilterType;
}
