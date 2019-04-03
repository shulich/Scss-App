export class Result{
    isAddNewItem:boolean;
    item:any;

    constructor(isAddNewItem?: boolean, item?:any)
    {
        this.isAddNewItem = isAddNewItem;
        this.item = item;
    }
}
