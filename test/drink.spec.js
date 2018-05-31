/*
동전을 넣어서 음료를 뽑을 수 있고, 남은 금액을 환전을 받을 수 있다. 
그리고 재고의 개념을 적용해서 재고가 없으면 음료를 구매할 수 없다. 

// 음료를 뽑을 수 있다.
// 콜라, 사이다, 오렌지 주스, 사과 주스 중 원하는 음료를 뽑을 수 있다.
동전을 넣을 수 있다. 
지폐를 넣을 수 있다.
거스름 돈을 환전 받을 수 있다.
재고를 관리할 수 있다.
*/

class VendingMachine {
  constructor() {
    this.drinkList = new Map();
  }

  buy(sBeverage) {
    if (this._hasSelectedDrink(sBeverage)) {
      return null;
		}
	
		const getDecreaseSelectedStockBy = (key) => {
			let currentDrinkStock = this.drinkList.get(key);
			currentDrinkStock -= 1;
			return currentDrinkStock;
		}

		const updateDrinkStockBy = (key, stock) => {
			this.drinkList.set(key, stock);				
		}

		const getSelectedDrinkName = (key) => {
			const drinksNames = this.drinkList.keys();

			for (let name of drinksNames) {
				if (name === key) {
					return name;
				}
			}
		}

		updateDrinkStockBy(
			sBeverage, 
			getDecreaseSelectedStockBy(sBeverage)
		);
		
		return getSelectedDrinkName(sBeverage);
	}

	_hasSelectedDrink(sBeverage) {
		return this.drinkList.get(sBeverage) < 1 || !(this.drinkList.get(sBeverage));
	};
	
	

  supply(...drinkList) {
    for(let [drink, count] of drinkList) {
      this.drinkList.set(drink, count);
    }
  }
}

let oVendingMachine = null;

let testObj = {
	VendingMachine: {
		setup() {
			oVendingMachine = new VendingMachine();
		},
		teardown : function(){
			/* 리소스 정리 */
			oVendingMachine = null;
		}
	}
}

describe('음료 자판기 구매 기능 테스트', () => {
	
	describe('자판기 가동', () => {
		test('자판기를 가동시키고 자판기가 맞는지 확인한다.', () => {
			// Given - 어떤 상황
			testObj.VendingMachine.setup();
			// When - 어떻게 동작
			const isStartVendingMachine = oVendingMachine instanceof VendingMachine;
			// Then - 동작에 대한 결과가 어떠해야 하나
			expect(isStartVendingMachine).toBe(true);
		});
	})

	describe('음료 구매', () => {
		test('자판기에서 콜라, 사이다, 오렌지 주스, 사과 주스 중 원하는 음료를 뽑을 수 있다.', () => {
			// Given
			oVendingMachine.supply(
				['Coke', 1],
				['Sprite', 1],
				['Orange Juice', 1],
				['Apple Juice', 1],
			);
			// When
			const sBeverage1 = oVendingMachine.buy("Coke");
			const sBeverage2 = oVendingMachine.buy("Sprite");
			const sBeverage3 = oVendingMachine.buy("Orange Juice");
			const sBeverage4 = oVendingMachine.buy("Apple Juice");
				
			// Then
			expect(sBeverage1).toBe('Coke');
			expect(sBeverage2).toBe('Sprite');
			expect(sBeverage3).toBe('Orange Juice');
			expect(sBeverage4).toBe('Apple Juice');			
		});		

		test('콜라, 사이다, 오렌지 주스, 사과 주스만 뽑을 수 있다', () => {
			// Given
			// When
			const sBeverage1 = oVendingMachine.buy("Coffee");
			const sBeverage2 = oVendingMachine.buy("Milk");
			// Then
			expect(sBeverage1).not.toBe('Coffee');
			expect(sBeverage2).not.toBe('Milk');
		});
	});	
	
	describe('자판기 재고 관리', () => {
	
		test('재고가 있는 음료만 뽑을 수 있다.', () => {
			// given
			oVendingMachine.supply(
				['NonExistingDrink', 0]
			);
			// when
			const sBeverage1 = oVendingMachine.buy("NonExistingDrink");
			// then		
			expect(sBeverage1)
				.toBe(null);
		});
	
	});

});




/** 자판기 사용 시나리오
 * 1. 어떤 사람이 와서 콜라를 뽑아갔다
 * 2. 재고가 떨어졌다
 * 3. 자판기에 품절이라는 불이 들어온다. O
 * 4. 콜라가 먹고 싶어 자판기 버튼을 누르지만 콜라는 나오지 않는다 O
 */
// TDD는 단순히 테스트를 위한 메서드를 만드는 것은 권장하지 않는다. - 불필요한것 제외


// 테스트 코드 통합
/* 
test('자판기에서 원하는 음료를 뽑을 수 있다', () => {
	// Given - 어떤 상황
	// When - 어떻게 동작
	const sBeverage1 = oVendingMachine.buy('Sprite');
	const sBeverage2 = oVendingMachine.buy("Orange Juice");
	const sBeverage3 = oVendingMachine.buy("Apple Juice");
	const sBeverage4 = oVendingMachine.buy("Coffee");
	// Then - 동작에 대한 결과가 어떠해야 하나
	expect(sBeverage1).toBe('Sprite');
	expect(sBeverage2).toBe('Orange Juice');
	expect(sBeverage3).toBe('Apple Juice');

	expect(sBeverage4).not.toBe('Coffee');
	expect(sBeverage4).not.toBe('Milk');
});
*/

