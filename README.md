# javascript-racingcar-precourse

## 협력 모델 다이어그램

<img width="600px" src="image.png/">

- MVC 패턴에서 컨트롤러는 뷰와 모델 사이에서 데이터를 교환하는 책임을 가집니다.
- 각 객체는 자신이 맡은 책임을 자율적으로 수행합니다.
  - 경기 객체는 자동차 객체의 이동 방식에 대해서는 알지 못하고, 이동하라는 메시지만을 전달합니다. (Tell, Don't Ask 원칙)
- 각 객체는 스스로 처리할 수 없는 책임을 다른 객체에게 요청합니다.

  - 자동차 객체는 특정 조건에 따라 이동합니다. 하지만 이동 조건은 바뀔 수 있기 때문에 이동 전략 객체와 협력하여 이동 여부를 결정합니다.

## 객체지향적 설계의 장점

변경되는 부분(전략, 뷰)과 변경되지 않는 부분(도메인 로직)이 철저히 분리되어 있어 유지보수가 매우 쉬워집니다.

- 자동차의 이동 전략을 변경할 때 자동차 클래스의 코드를 수정하는 대신, 자동차 객체를 새로운 이동 전략 객체와 연결하면 됩니다.

- 입출력 요구사항이 콘솔에서 웹, CSV 등으로 바뀌어도 핵심 도메인 로직이 그대로 유지됩니다.

## 인터페이스 설계

JavaScript는 interface 기능을 제공하지는 않지만, 클래스의 접근제한자를 사용해 객체를 캡슐화할 수 있습니다.

협력 모델 다이어그램을 참고하여 테스트 파일에서 객체의 public 메서드에 대한 코드를 작성하며 인터페이스를 설계할 수 있었습니다.

## 구현

TDD 사이클을 따라 테스트 작성, 테스트 통과, 리팩토링으로 순서로 구현을 진행하였습니다.

리팩토링 단계에서 황준일 개발자님의 [자동차 경주 미션 피드백 정리](https://junilhwang.github.io/TIL/with-ai/code-review/woowacourse/racing-car/#with-ai-%E1%84%8C%E1%85%A1%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8E%E1%85%A1-%E1%84%80%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%AE-%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB-%E1%84%91%E1%85%B5%E1%84%83%E1%85%B3%E1%84%87%E1%85%A2%E1%86%A8-%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5)를 참고하여 다음 코드 패턴을 적용하였습니다.

### 커스텀 에러 클래스

```js
export class CarError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CarError';
  }
}

export class CarNameLengthError extends CarError {
  constructor(name, min, max) {
    super(
      `[ERROR] 자동차 이름 "${name}"의 길이는 ${min}~${max}자 사이여야 합니다.`
    );
    this.name = 'CarNameLengthError';
  }
}
```

```js
class GameController {
  // ...
  async play() {
    while (true) {
      try {
        // ...
        return;
      } catch (error) {
        if (
          error instanceof InputError ||
          error instanceof RaceError ||
          error instanceof CarError
        ) {
          this.#outputView.printErrorMessage(error.message);
        } else {
          throw error;
        }
      }
    }
  }
}
```

커스텀 에러 클래스를 활용하여 catch문 내부에서 조건문을 통해 예측 가능한 에러가 발생한다면 프로그램을 재실행하는 로직을 추가하였습니다.

### 전략 패턴 사용

```js
class Car {
  // ...
  static defaultMoveStrategy = () =>
    Random.pickNumberInRange(0, 9) >= Car.MOVEMENT.THRESHOLD;

  // ...
  move(strategy = Car.defaultMoveStrategy) {
    const isMovable = strategy();
    if (isMovable) {
      this.#position += Car.MOVEMENT.DISTANCE;
    }
  }
}
```

자동차 클래스의 수정 없이 변경된 전략을 주입하여 자동차가 다른 이동 조건을 가질 수 있습니다.

```js
test('자동차의 위치를 이동한다.', () => {
  const carName = 'pobi';
  const car = new Car(carName);
  const alwaysMoveStrategy = () => true;
  car.move(alwaysMoveStrategy);

  expect(car.getStatus().position).toBe(1);
});
```

테스트 상황에서 항상 이동하는 전략을 주입하여 객체의 행동에 대한 독립적인 단위 테스트를 진행할 수 있습니다.

### 도메인 상수 위치

```js
class Car {
  #name;
  #position;
  static NAME_LENGTH = { MIN: 1, MAX: 5 };
  // ...
  #validateName(name) {
    if (
      name.length < Car.NAME_LENGTH.MIN ||
      name.length > Car.NAME_LENGTH.MAX
    ) {
      throw new CarNameLengthError(
        name,
        Car.NAME_LENGTH.MIN,
        Car.NAME_LENGTH.MAX
      );
    }
  }

  // ...
}
```

매직 넘버들을 static을 사용해 가장 관련이 있는 클래스 내부에서 상수화하였습니다.

- 코드의 응집도를 높여 수정이 필요한 상수 값이 존재하는 파일을 빠르게 찾을 수 있습니다.

> 테스트 코드는 명세서 역할을 하기 때문에 상수 대신 요구 사항에 명시된 값을 그대로 사용하였습니다.

### 객체 스냅샷 전달

```js
class Race {
  #cars;
  #trialCount;

  // ...

  start(moveStrategy) {
    const results = [];
    for (let i = 0; i < this.#trialCount; i++) {
      this.#moveAllCars(moveStrategy);

      const roundResult = this.#cars.map((car) => car.getStatus());
      results.push(roundResult);
    }

    return results;
  }
}
```

```js
class Car {
  #name;
  #position;

  // ...

  getStatus() {
    return {
      name: this.#name,
      position: this.#position,
    };
  }
}
```

Race 객체가 게임 진행에 따른 모든 라운드 결과를 저장할 수 있도록 Car 객체가 현재 상태의 스냅샷(DTO)을 반환하도록 구현했습니다.

Car 객체는 새로운 객체를 반환함으로써 외부 수정으로부터 내부 멤버를 보호하는 효과도 얻을 수 있었습니다.

## 목표

- [ ] 이동 전략 주입에 함수 대신 객체 사용하기 (이동 전략이 복잡해질 경우를 대비)
  - [일급 컬렉션 (First Class Collection)의 소개와 써야할 이유](https://jojoldu.tistory.com/412)
- [ ] Cars 일급 콜랙션 사용하여 Race에서 자동차 이동 책임 분리하기
  - [전략 패턴](https://refactoring.guru/ko/design-patterns/strategy)
