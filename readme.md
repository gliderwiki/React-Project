# React-Project

https://facebook.github.io/react/docs/hello-world.html


## npm 버전 확인 
` $ node -v `

` $ npm -v `

` $ npm install -g npm `

## react install
$ sudo npm install -g webpack webpack-dev-server

$ npm install --save react react-dom

$ npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react

$ npm install --save-dev react-hot-loader webpack webpack-dev-server

$ npm run dev-server

$ npm install --save react-addons-update

$ npm install --save redux react-redux


# React.js

## 기본 문법
```bash
import React from 'react';

class App extends React.Component {
    render(){

        return (
                <h1>Hello Velopert</h1>
        );
    }
}

export default App;
```

` render() 메소드 안에서 컴포넌트에 렌더링될 데이터를 정의한다. `

` 컴포넌트에서 여러 Element를 렌더링 해야 할 때 그 element들은 필수적으로 container element 안에 작성해야 한다. `
```
return  (
            <div>
                <h1> Hello Velopert </h1>
                <h2> Welcome </h2>
            </div>
        );
```

### Javascript Expression 
`{ }` 구문으로 변수를 감싸준다 

### 임의 메소드 생성 및 사용하기 
```
sayHey(){
    alert("hey");
}

render(){
    let text = "Dev-Server"
    return  (
        <div>
            <h1> Hello Velopert </h1>
            <h2> Welcome to {text}</h2>
            <button onClick={this.sayHey}>Click Me</button>
        </div>
    );
}
```
    
` if, else 구문은 사용할 수 없다 `

` Inline Style 구문은 camelCase로 작성한다. ` 

` 모든 React Component 은 첫 문자가 대문자인 CamelCase 로 작성한다. `

작성한 컴포넌트는 `export default 컴포넌트명` 구문으로 외부화 하고 `import` 구문을 통해 불러올 수 있다  


### props

parent 컴포넌트에서 child 컴포넌트에 데이터를 전달할 때 사용 (변경되지 않는 값)

기본값 설정 : props값을 임의로 지정해주지 않았을 때는 ` className.defaultProps = { propName : value }` 형태로 삽입하면 된다.

컴포넌트에서 immutable (변하지 않는)  데이터가 필요 할 땐,render() 메소드의 내부에 안에 { this.props.propsName } 형식으로 넣고, 
컴포넌트를 사용 할 때, < > 괄호 안에 propsName="value" 를 넣어 값을 설정한다. 


#### 전달시 
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
 
const rootElement = document.getElementById('root');    
ReactDOM.render(<App headerTitle = "Welcome!"
                     contentTitle = "Stranger,"
                     contentBody = "Welcome to example app"/>, rootElement);
```                     


#### 사용시 
```
import React from 'react';
import Header from './Header';
import Content from './Content';

class App extends React.Component {
    render(){
        return  (
            <div>
                <Header title={ this.props.headerTitle }/>
                <Content title={ this.props.contentTitle }
                          body={ this.props.contentBody }/>
            </div>
        );
    }
}

export default App;
```

### State 
컴포넌트에서 유동적인 데이터를 다뤄야 할 때 사용한다. 


* state 의 초기 값을 설정 할 때는 constructor(생성자) 메소드에서 this.state= { } 를 통하여 설정한다 

* state 를 렌더링 할 때는 { this.state.stateName } 을 사용한다.

* state 를 업데이트 할 때는 this.setState() 메소드를 한다. ES6 class에선 auto binding이 되지 않으므로, setState 메소드를 사용 하게 될 메소드를 bind 해주어야 함. (bind 하지 않으면 React Component 가 가지고있는 멤버 함수 및 객체에 접근 할 수 없음.) 

state 의 내부 데이터는 직접 수정할 수 없다. 만약 state 내부의 배열을 처리 하기 위해 push를 사용하기 보다는 cancat을 사용하여 기존 배열을 놔두고 새 배열을 복사해온다.
다른 방법으로는 Immutable helper (페이스북의 immutable.js 라이브러리의 일부 기능들을 사용할 수 있게 만든 React addons 이다.) 를 사용하여 불변객체이 내부 값을 새로운 상태로 대입하여 변경해야 한다.

아래 처럼 설치한다.

``` npm install --save react-addons-update ```

소스에서 import update from ‘react-addons-update’ 로 호출한다  



|--------------------------특성--------------------------| props | state |

|- parent 컴포넌트에 의해 값이 변경 될 수 있는가? -| - OK - | - NO - | 

|------- 컴포넌트 내부에서 변경 될 수 있는가? -------| - NO - | - OK - |

#### state 안의 array에 원소 삽입/제거/수정 해야 할 경우 
` this.setState() ` 를 이용하여 수정 

```
this.setState({
    list: this.state.list.concat(newObj)
})
```

이와 같이 연산 후 재할당의 방식으로 처리 해야 한다. 
위의 설명처럼 Immutable helper 를 이용할 경우 아래와 같다 

```
this.setState({
    list: update(
          this.state.list, // 처리할 배열 
          {
              $push: [newObj, newObj2]  // push 로 추가할 배열 
          }
});
```

원소를 제거 할 경우 아래와 같이 처리한다. 
```
this.setState({
    list: update(
          this.state.list, 
          {
              $splice: [[index, 1]]
          }
});
```

원소를 수정 할 경우 아래와 같이 처리할 수 있다. 
```
this.setState({
    list: update(
              this.state.list, 
              {
                  [index]: {
                      field: { $set: "value" },
                      field2: { $set: "value2" }
                  }
              }
});

```

### 유용한 연산자
#### map()
파라미터로 전달 된 함수를 통하여 배열 내의 각 요소를 프로세싱 하여 그 결과로 새로운 배열을 생성한다. 

```
var numbers = [1, 2, 3, 4, 5];

var processed = numbers.map(function(num){
    return num*num;
});

결과 : [1, 4, 9, 16, 25]
```

#### ES6 변환 
```
let numbers = [1, 2, 3, 4, 5];

let result = numbers.map((num) => {return num*num});
```

#### ES6 Spread 연산

전개연산자 - 값을 Copy 하여 쉽게 연결하기 위해 쓰임 

```bash
var parts = ['shoulders', 'knees'];
var lyrics = ['head', ...parts, 'and', 'toes']; // ["head", "shoulders", "knees", "and", "toes"]
``` 

아래와 같이 배열을 복사 할 수 있다 
```bash
var arr = [1, 2, 3];
var arr2 = [...arr]; // arr.slice()와 유사하게 복사하기
arr2.push(4); // [1, 2, 3, 4]
// arr는 어떤 영향도 받지 않았다.
```

### Component LifeCycle API
 1. componentWillMount : 렌더링이 되기 전 실행 (컴포넌트가 DOM위에 만들어지기 전에 실행되므로 DOM처리는 할수없다)
 2. componentDidMount : 렌더링이 된 다음 실행 (setTimeout, DOM처리, AJAX처리등)
 3. componentWillReceiveProps : 새로운 Props 를 받았을 때 실행 
 4. shouldComponentUpdate : props/state가 변경 되었을 때 리 렌더링을 할지 말지 정한다  
 5. componentWillUpdate : 컴포넌트가 업데이트 되기 전 실행 (setState를 사용하면 안된다) 
 6. componentDidUpdate : 컴포넌트가 업데이트 된 다음 실행 (setState를 사용하면 안된다) 
 7. componentWillUnmount : 컴포넌트가 제거될 때 실행 (DOM에서 사라진 다음에 실행이 된다) 

### ref를 이용한 DOM처리 
ref는 다음과 같은 경우에 유용하게 된다.

컴포넌트에 의해 렌더 된 DOM 에 직접 어떠한 처리를 해야 할 경우
큰 프로젝트에 React 컴포넌트를 사용하는 경우 (예: 다른 웹프레임워크와 혼용)

```
class Hello extends React.Component {
    handleClick() {
        this.input.value = "";
        this.input.focus();
    } 
    
    render() {
  	return (
        <div> 
            <input ref={ref=> this.input = ref}/>
            <button onClick={this.handleClick.bind(this)}>Click Me</button>
        </div>
    );        
  }
}
```

### Redux
JavaScript 어플리케이션에서 data-state 와 ui-state를 관리해주는 도구 
* store: React.js 프로젝트에서 사용하는 모든 동적 데이터들을 담아두는 곳.
* action: 어떤 변화가 일어나야 할 지 나타내는 객체.
* reducer: action 객체를 받았을 때, 데이터를 어떻게 바꿀지 처리할지 정의하는 객체.

Store에 데이터를 담고 view 는 action을 접근하고 action은 dispatch를 통해 store를 조작한다. 
(state 읽기전용으 어플리케이션에서 직접 변경할 수 없고 action이 dispatch 되어야 한다) 

### Store
 어플리케이션의 현재 상태를 지니고 있음
* dispatch (action) : action을 reducer에 전송
* getState : 현재 상태를 반환
* subscribe (listener) : 상태가 바뀔때마다 실행할 함수를 등록
 * unsubscribe : 더 이상 상태를 반환하지 않음
* replaceReducer(nextReducer) : hot reloading 구현시 사용

### reducer
순수 함스로 작성되어야 한다 
* 외부 네트워크 혹은 데이터베이스에 접근하지 않아야한다.
* return 값은 오직 parameter 값에만 의존되어야한다.
* 인수는 변경되지 않아야한다.
* 같은 인수로 실행된 함수는 언제나 같은 결과를 반환해야한다.
* 순수하지 않은 API 호출을 하지 말아야 한다. (Date 및 Math 의 함수 등)

### react-redux

view layer 바인딩 도구

### react-router

$ npm install --save react-router@next
