export default class VendingMachine {
	constructor() {
		this.drinkList = new Map([
			['Coke', 'Coke'],
			['Sprite', 'Sprite'],
			['Orange Juice', 'Orange Juice'],
			['Apple Juice', 'Apple Juice'],
		]);
	}

	buy(sBeverage) {	
		return this.drinkList.get(sBeverage);
	}
};