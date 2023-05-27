# ECMAScript 新特性

## ECMAScript（JavaScript的语言本身）

ECMAScript也是一门脚本语言，一般缩写为ES，通常我们会把他看做为JavaScript的标准化规范，但实际上JavaScript是ECMAScript的扩展语言，因为在ECMAScript当中只是提供了最基本的语法。即：约定了我们的代码该如何编写，例如我们如何定义变量和函数 或者实现分支循环之类的语句，那他只是停留在语言层面，并不能直接用来去完成我们应用中的实际功能开发。而我们经常使用的JavaScript它实现了ECMAScript的语言标准，并且在基础之上做了一些扩展。 使得我们可以在浏览器中操作DOM和BOM，在node环境中可以读写文件之类的一些操作。

在浏览器环境中，JavaScript就等于ECMAScript加上web所提供的的API（也就是我们说的DOM和BOM），在node环境中所使用的JavaScript实际上等于是ECMAScript加上node所提供的一系列API（如fs或者是net这样的，内置模块所提供的API）。

所以在JavaScript中，语言本身指的就是ECMAScript。那随着web应用模式深入发展，从2015年开始，ECMAScript就保持着每年一个大版本的迭代。那伴随着这些新版本的迭代，很多新特性陆续出现，那就导致了现如今JavaScript的这门语言的本身变得越来越高级，越来越便捷

————————————————————————————————————————————————————————————

ECMAScript 2015也可以叫做ES6，可以算是新时代ECMAScript标准的代表版本。一来：相比于上一个版本变化较大；二来从这个版本开始，它的命名规则发生了变化，更准确的缩写名称叫做ES2015。

Nodemon小工具：node环境中，修改完代码后自动执行代码 

```javascript
yarn add nodemon --dev //安装到项目中

yarn nodemon 文件名（xx.js） //执行完之后就会开始工作，监视我们的脚本文件，一旦文件发生变化，会立即重新执行脚本。
```

————————————————————————————————————————————————————————————

## 作用域：某个成员能够起作用的范围

在ES2015之前，ECMAScript中只有两种类型的作用域（全局作用域和函数作用域）。在ES2015中又新增了块级作用域，块就是在代码中用{}所包裹起来的范围，如if语句和for语句的{}都会产生我们所说的块，以前块是没有单独的作用域的，这就导致了我们在块中定义的成员，外部也可以访问得到。

————————————————————————————————————————————————————————————

```javascript
const obj = {};
obj.name = 'abc';
//这样是没问题的

obj = {}
//这样就会报错，因为这种赋值会改变obj的内存指向。
```

————————————————————————————————————————————————————————————

## 解构最好去看阮一峰的ES6，很详细

```javascript
//数组解构

const arr = [100, 200, 300]

//提取指定位置的成员
const [, , baz] = arr;
console.log(baz)  --> 300

//可以在解构位置的变量名之前去添加3个点，表示提取从当前位置开始往后的所有成员，那最终所有的结果会放到一个数组中
//**3个点的用法只能在我们解构位置的最后一个成员上使用
const [foo, ...rest] = arr
console.log(rest)  --> [200, 300]

const path  = '/foo/bar/baz'
//以前：
const tmp = path.split('/')
const rootdir = tmp[1]
//现在
const [, rootdir] = path.split('/')
console.log(rootdir)

```



对象的解构是根据属性名去匹配提取，而不是通过位置去提取。

```javascript
const {log} = console
log('foo')

const obj = { name: 'abc', age: 18}
const {name, age} = obj
console.log(name)

//不重名冲突,也可以添加默认值
const name = 'tom'
const { name: objName = 'jack' } = obj
console.log(objName)
```



————————————————————————————————————————————————————————————ES2015带标签的模板字符串

在定义模板字符串之前，去添加一个标签，那这个标签实际上是一个特殊的函数，添加这个标签就是调用这个函数。

```javascript
const str = tag`hello world`
const str = console.log`hello world` --> ['hello world']

const myName = 'Tom'
const gender = true
function myFn(strings) {
    console.log(strings, myName, gender)
}
const result = myFn`hey, ${myName} is a ${gender}`
// [ 'hey, ', ' is a ', '' ] Tom true

var name1 = 'bp'
var age = 12
var fn2 = function (strs, ...args) {
    console.log(strs)
    console.log(args)
}
fn2`name: ${name1}, age: ${age}`
```

————————————————————————————————————————————————————————————ES6提供的一组方法：includes(), startsWith(), endsWith()

```javascript
const message = 'Error: foo is not defined.'
console.log(message.startsWith('Error')) //true
console.log(message.endsWith('.')) //true
console.log(message.includes('foo')) //true
```

————————————————————————————————————————————————————————————

以前想要给函数的参数定义默认值，需要在函数体中通过逻辑代码实现。如下：

```javascript
function foo (enable){
    enable = enable || true
    console.log('foo invoke - enable')
    console.log(enable)
}
foo(true)
// foo invoke - enable
// true
// 这里有一个问题如果传入false也会打印true，即foo(false) --> true

//而应该是这样
function foo (enable){
    enable = enable== undefined ? true : enable
    console.log('foo invoke - enable')
    console.log(enable)
}
foo()
```



不过有了参数默认值这样的新功能之后，这一切就会变得简单多了，我们可以直接在形参的后面通过等号去设置一个默认值：

```javascript
function foo (enable = true){
    console.log('foo invoke - enable')
    console.log(enable)
}
foo()
```

这里所设置的默认值，它只会在我们调用时，没有传递实参或实参传递的时候是undefined的时候使用。

那需要注意的是：如果你有多个参数的话，那带有默认值的这种形参一定要出现在参数列表的最后。因为我们的参数是按次序传递的。如果我们带有默认值的这种参数不在最后的话，那我们的默认值将无法正常工作。即：

```javascript
function foo (bar, enable = true){
    console.log('foo invoke - enable')
    console.log(enable)
}
foo(false)
```

————————————————————————————————————————————————————————————

## 剩余参数

在ECMAScript中，很多方法都可以传递任意个数的参数，例如我们console对象的log方法，它就可以接收任意个数的参数，并且会把这些参数打印到同一行中。

那对于未知个数的参数，以前我们都是使用ECMAScript所提供的arguments对象去接收，那arguments对象实际上是一个伪数组。那在ES2015中新增了点点点（...）的操作符，那这种操作符有两个作用。这里我们需要用到它rest的作用，也就是剩余操作符。

```javascript
//以前
function fn(){
    console.log(arguments)
}
//现在
function foo(...args){
    console.log(args)
}
foo(1, 2, 3, 4)
// [1, 2, 3, 4]
function foo(first, ...args){
    console.log(args)
}
foo(1, 2, 3, 4)
// [2, 3, 4]
```

在形参前面家加...，此时这个形参就会以数组的形式去接收从当前这个参数位置开始往后的实参。这种方式就可以取代以前通过arguments对象去接收无限参数的这种操作。

那因为是接收所有的参数，这种操作符它只能出现在形参的最后一位，而且只可以使用1次。

————————————————————————————————————————————————————————————

## 展开数组

```javascript
const arr = ['foo', 'bar', 'baz']
console.log(
    arr[0],
    arr[1],
    arr[2],
)
// foo bar baz
```

若我们数组当中的元素个数是不固定的，那一个个传的方式就行不通了，就必须换一种方式。

```javascript
const arr = ['foo', 'bar', 'baz']
console.log.apply(console, arr)
// foo bar baz
```

而在ES2015当中，就没有必要这么麻烦了，我们可以直接去调用console对象的log方法，通过...的操作符展开我们的数组。

```javascript
const arr = ['foo', 'bar', 'baz']
console.log(...arr)
console.log('foo', 'bar', 'baz')
```

那...操作符就会自动把数组中的每一个成员按照次序传递到参数列表中。这样就大大简化了我们需要的操作。

————————————————————————————————————————————————————————————

## 箭头函数

```javascript
//function inc(num){
//    return num + 1
//}
const inc = n => n + 1
console.log(inc(100))
```

如：筛选出数组的奇数

```javascript
const arr = [1, 2, 3, 4, 5, 6, 7]
arr.filter(function(item){
    return item * 2
})
//用箭头函数
arr.filter(item => item % 2)
```



箭头函数this指向：在下面的方法中可以用this去获取当前对象，因为在**普通函数中，this始终会指向调用这个函数的对象**，我们把this里面的name打印出来

```javascript
const person = {
    name: 'tt',
    sayHi: function(){
        console.log(`hi, my name is ${this.name}`)
    }
}
person.sayHi()
//hi, my name is tom
const person = {
    name: 'tt',
    sayHi: ()=>{
        console.log(`hi, my name is ${this.name}`)
    }
}
person.sayHi()
//undefined
```

因为在箭头函数中，它没有this的机制，所以它不会改变this的指向。也就是说，在我们箭头函数的外面this是什么，那我们在里面this就是什么，任何情况下都不会改变。所以↑的箭头函数外面的this是window对象，所以才会undefined。



```javascript
const person = {
    name: 'tt',
    sayHiAsync: function(){
        setTimeout(function(){
            console.log(this.name)
        },1000)
    }
}
person.sayHiAsync()
//undefined
const person = {
    name: 'tt',
    sayHi: ()=>{
        console.log(`hi, my name is ${this.name}`)
    },
    sayHiAsync: function(){
        const _this = this
        setTimeout(function(){
            console.log(_this.name)
        },1000)
    }
}
person.sayHiAsync()
//tt
```

此时setTimeout这个函数传递进去的是一个普通函数的表达式，那在这个函数的内部就没有办法拿到我们当前作用域的this，**因为这个函数它在setTimeout里面 最终会放在全局对象上被调用**，所以说它里面是拿不到当前作用域里面的this对象，它拿到的应该是全局对象。

很多时候我们为了解决这样的问题，我们会定义一个下划线this变量去保存当前我们当前作用域中的this。借助于闭包这样的机制，去在内部使用下划线this.



那如果我们这里使用箭头函数的话，那就没有必要这么麻烦了。因为**在箭头函数中，this始终指向的是当前作用域里面的this**，与上面箭头函数undefined不矛盾。以后但凡代码中需要使用_this这种情况，你都可以使用箭头函数来去避免。

```javascript
const person = {
    name: 'tt',
    sayHi: ()=>{
        console.log(`hi, my name is ${this.name}`)
    },
    sayHiAsync: function(){
        setTimeout(() => {
            console.log(this.name)
        },1000)
    }
}
person.sayHi()
//tt
```

————————————————————————————————————————————————————————————

## 对象字面量增强

<u>**如果说我们的变量名与我们要添加到对象当中的属性名是一致的话，我们就可以省略掉冒号以及后面的变量名，这两种方式完全是等价的。**</u>

```javascript
const bar = '345'
const obj = {
    foo: 123,
    //传统
    //bar: bar
    //现在
    bar
}
console.log(obj)
```



除此之外，我们需要为对象添加一个普通的方法，传统的做法是通过如下方式，省略了冒号和function，以下两种完全等价。

```javascript
const bar = '345'
const obj = {
    foo: 123,
    bar,
    method1: function (){
        console.log('method111')
    }
}
console.log(obj)
//等价于：
const bar = '345'
const obj = {
    foo: 123,
    bar,
    method1(){
        console.log('method111')
        console.log(this)
    }
}
console.log(obj)
obj.method1()
```

需要注意的是，这种方法的背后，实际上就是普通的function。也就是说，我们通过对象去调用这个方法，那内部的this就会指向当前对象，即obj对象。



此外，可以使用表达式的返回值作为对象的属性名。以前我们需要为对象添加一个动态的属性名，只能在对象声明过后通过索引器的方式（方括号[]）来动态添加。

```javascript
const bar = '345'
const obj = {
    foo: 123,
    bar,
    method1(){
        console.log('method111')
        console.log(this)
    },
}
//以前只能这样：
obj[Math.random()] = 123
console.log(obj)
obj.method1()
```

**而在ES2015过后，对象字面量的属性名可以直接通过方括号直接去使用动态的值，叫做计算属性名。**具体的用法如下，把我们的属性名，位置用一对方括号包起来，在这对方括号里面就可以使用任意表达式了，这个表达式的执行结果将会作为这个属性的属性名。

```javascript
const bar = '345'
const obj = {
    foo: 123,
    bar,
    method1(){
        console.log('method111')
        console.log(this)
    },
    //现在
    //[Math.random()]: 123
    [bar] : 123
}
console.log(obj)
obj.method1()
```



————————————————————————————————————————————————————————————

## ES2015为object对象提供了一些扩展方法

### Object.assign()

可以**将多个源对象中的属性复制到一个目标对象中**，如果对象之间有相同的属性，那我们源对象中的属性就会覆盖掉目标对象中的属性。这里所说的源对象和目标对象其实都是普通对象，只不过用处不同，我们是从源对象里面取，往目标对象中放。

Object.assign方法支持传入任意个数的对象，其中第一个参数就是目标对象，即我们所有源对象中的属性都会复制到这个对象当中，那么这个方法的返回值也就是这个目标对象。

```javascript
const source1 = {
    a: 123,
    b: 123
}
const target = {
    a: 456,
    c: 456
}
const result = Object.assign(target, source1)
console.log(target)
//{a: 123, c: 456, b: 123}
console.log(result == target)
//true
```

由此可见Object.assign的**返回值就是第一个对象，完全相等**。

如果我们要传入多个源对象也是一样的

```javascript
const source1 = {
    a: 123,
    b: 123
}
const source2 = {
    a: 789,
    b: 789
}
const target = {
    a: 456,
    c: 456
}
const result = Object.assign(target, source1, source2)
console.log(target)
//{a: 789, c: 456, b: 789}
console.log(result == target)
//true
```

这个方法很常用，通常用这个方法去复制一个对象。如果我们在这个函数内部直接修改了这个对象参数的属性，那外界所对应的这个对象也同时会发生变化，因为他们应该指向同一个内存地址，也就是同一个数据。

```javascript
function func(obj){
    obj.name = 'func obj'
    console.log(obj)
}
const obj = { name: 'global obj' }
func(obj)
console.log(obj)
// {name : 'func obj' }
// {name : 'func obj' }
```



**那如果我们只是希望在这个函数的内部去修改这个对象，那我们就可以使用Object.assign()方法去把这个对象复制到一个全新的空对象上面，那这样的话我们内部的对象就是全新的对象，它的修改也就不会去影响到外部的数据了。**

```javascript
function func(obj){
    const funObj = Object.assign({}, obj)
    funObj.name = 'func obj'
    console.log(funObj)
}
const obj = { name: 'global obj' }
func(obj)
console.log(obj)
// {name : 'func obj' }
// {name : 'global obj' }
```

除此以外呢，Object.assign()用来为options对象参数去设置默认值

————————————————————————————————————————————————————————————

### Object.is()

用来去判断两个值是否相等（ES6小冷门）

以前判断两个值是否相等，用相等运算符（==）或严格相等运算符（===）来判断，不同就是==会在比较之前自动转换数据类型，就会导致我们0==false这种情况是成立的。而===就是严格去对比两者之间的数值是否相同，那因为0和FALSE他们的类型不同，所以是不会严格相等的。

但===也有两种特殊情况，首先就是对于数字0它的正负是没有办法区分的，也就是说在我们用===去比较+0和-0返回的结果是true，虽然说在我们应用开发来讲这种问题其实不需要关心，只有在我们去处理一些特殊的数学问题时才会有这种情况出现。其次是对于NaN，两个NaN === NaN 返回的是false，以前是任务NaN是一个非数字，也就是说有无限种可能，所以两个NaN是不相等的，但在今天看来NaN就是一个特别的值，所以说两个NaN它应该是完全相等的。所以在ES2015中就提出了一种新的同值比较的算法，即用Object.is()方法来解决这个问题，通过这个方法+0和-0就可以被区分开，而且NaN也是等于NaN。不过一般情况下，我们根本不会用到这个方法，大多数时候我们建议大家还是使用严格相等运算符===。

```javascript
console.log(Object.is(+0, -0))
// false
console.log(Object.is(NaN, NaN))
// true	
```

————————————————————————————————————————————————————————————

## Proxy代理对象

如果我们要**<u>监视某个对象中的属性读写</u>**，那我们可以使用ES5所提供的Object.defineProperty()这样的方法来去为我们的对象添加属性，那这样的话我们就可以捕获到我们对象当中属性的读写过程。这种方法其实应用的非常广泛，在VUE 3.0以前的版本就是使用这个方法来去实现数据相应，从而完成双向数据绑定。

那在ES2015中全新设计了一个叫Proxy的类型，它就是专门用来为对象设置访问代理器的。代理，可以想象成门卫，不管你想进去拿东西还是放东西，都必须要经过这样一个代理。那通过Proxy就可以轻松监视到对象的读写。

相比于Object.defineProperty()，Proxy的功能要更为强大，使用起来也更为方便。使用Proxy：

```javascript
const person = {
    name: 'zce',
    age: 20
}
const personProxy = new Proxy(person, {
    get (target, property){
        console.log(target, property)
        return 100
    },
    set (){
    }
})
console.log(personProxy.name)
// {name: 'zce', age: 20 } name
// 100
```

通过new Proxy的方式来为person创建一个代理对象。第一个参数就是需要代理的目标对象，第二个参数也是一个对象，可以把这个对象称之为代理的处理对象（一个叫handler的处理器对象），这个对象中可以通过get方法来监视我们属性的访问，通过set方法来去监视我们对象当中设置属性的过程。

get方法接收两个参数，第一个是我们所代理的目标对象，第二个就是外部所访问的属性的属性名。**<u>这个方法的返回值将会作为外部去访问这个属性所得到的结果</u>**，可以先试试收到返回个100，然后再尝试通过这个代理对象去访问实际对象中的name属性。

由输出可知，我们定义的get方法它确实监听到了属性的读取，而且第二个参数（也就是我们被访问的这个name）。除此之外，我们得到的结果也确实是get方法的返回值，那这个方法内部正常的逻辑应该是，先去判断我们代理目标对象当中是否存在这样的属性，如果存在的话就返回对应的值，反之不存在的话可以返回undefined或者是一个默认值，如下：

```javascript
const person = {
    name: 'zce',
    age: 20
}
const personProxy = new Proxy(person, {
    get(target, property){
        return property in target ? target[property] : 'default'
    },
    set (){}
})
console.log(personProxy.name)
console.log(personProxy.xxx)
// zce
// default
```



set方法默认接收3个参数，分别是代理目标对象、要写入的属性名称、要写入的属性值。

然后尝试通过这个代理对象为我们person写入一个gender属性

```javascript
const person = {
    name: 'zce',
    age: 20
}
const personProxy = new Proxy(person, {
    get (target, property){
        return property in target ? target[property] : 'default'
    },
    set (target, property, value){
        console.log(target, property, value)
    }
})
// 这里写入了一个新属性gender和值
personProxy.gender = trueconsole.log(personProxy.name)
console.log(personProxy.xxx)
// {name: 'zce', age: 20 } gender true
// zce
// default
```



那这个set方法内部正常的逻辑就应该是为我们的代理目标去设置指定的属性，我们可以先做一个数据校验，例如我们如果设置的是age，那么它的值就必须是一个数字，否则的话我们就报错

```javascript
const person = {
    name: 'zce',
    age: 20
}
const personProxy = new Proxy(person, {    
    //读取
    get (target, property){
        return property in target ? target[property] : 'default'
    },
    //写入或修改
    set (target, property, value){
        if(property == 'age'){
            if(!Number.isInteger(value)){
                throw new TypeError(`${value} is not an int`)
            }
        }
        target[property] = value
    }
})
//这里设置一个age等于字符串，就会报错
personProxy.age = 'hhh'
//这样就可以
personProxy.age = 100person
Proxy.gender = true
console.log(personProxy.name)
console.log(personProxy.xxx)
// {name: 'zce', age: 20 } gender true
// zce
// default
```

————————————————————————————————————————————————————————————

Object.defineProperty() **只能监视到对象读取和写入**，Proxy可以监视到更多的对象操作。

```js
const person = {
    name: 'zce',
    age: 20
}
const personProxy = new Proxy(person, {
    deleteProperty (target, prop){
        console.log('delete', prop)
        //删除目标属性
        delete target[prop]
    }
})
delete personProxy.age
console.log(person)
//delete age
// {name: 'zce'}
```

添加的这个 deleteProperty 方法，这个方法会在外部对当前这个代理对象进行 delete 操作时自动执行。参数：代理目标对象以及所要删除的这个属性名称。由上可知Object.defineProperty()这个方法做不到，当然，除此之外proxy还有其他对象操作都能被监视到。

| handler方法              | 触发方式                                                     |
| ------------------------ | ------------------------------------------------------------ |
| get                      | 读取某个属性                                                 |
| set                      | 写入某个属性                                                 |
| has                      | 拦截propName in proxy的操作，返回boolean。in操作符           |
| apply                    | 拦截proxy实例作为函数调用的操作，proxy(args)、proxy.call(...)、proxy.apply(..)。调用一个函数 |
| construct                | 拦截proxy作为构造函数调用的操作。用new调用一个函数           |
| ownKeys                  | 拦截获取proxy实例属性的操作，包括Object.getOwnPropertyNames、Object.getOwnPropertySymbols、Object.keys、for...in |
| deleteProperty           | 拦截delete proxy[propName]操作。delete操作符                 |
| defineProperty           | 拦截Objecet.defineProperty                                   |
| isExtensible             | 拦截Object.isExtensible操作                                  |
| preventExtensions        | 拦截Object.preventExtensions操作                             |
| getPrototypeOf           | 拦截Object.getPrototypeOf操作                                |
| setPrototypeOf           | 拦截Object.setPrototypeOf操作                                |
| getOwnPropertyDescriptor | 拦截Object.getOwnPropertyDescriptor操作                      |

第二点优势：Proxy更好的**支持数组对象**的监视

```js
const list = []
const listProxy = new Proxy(list, {
    //在处理对象上添加set方法用于监视数据的写入
    set(target, prop, val){
        //打印下数据的属性名和属性值
        console.log('set', prop, value)
        //设置一下目标对象中对应的属性
        target[prop] = val
        return true
        //表示写入成功
    }
})
listProxy.push(100)
//set 0 100   --> 0是数组的下标，100是0下标所对应的值
//set length 1
```

还有很多优势。

另外，相较于Object.defineProperty，Proxy 是以**非入侵的方式监管了整个对象的读写**。那就是说，一个已经定义好的对象，我们不需要对对象本身去做任何的操作，就可以监视到内部成员的读写，而 Object.defineProperty 的方式就要求我们必须要通过特点的方式单独去定义对象当中那些需要被监视的属性。那对于一个已经存在的对象，我们要监视它的属性，要去做很多额外的操作 

————————————————————————————————————————————————————————————

## Reflect

是ES2015中提供的一个全新的**内置对象**，是一个**静态类**，不能通过 ~~new Reflect()~~ 的方式去构建一个实例对象，只能去调用这个静态类中的静态方法。Reflect.get()，js中的Math对象也是这样的。

Reflect内部封装了一系列对对象的底层操作，具体有13个静态方法。里面的方法名和proxy对象中的处理对象成员是完全一致的，其实就是Proxy处理对象的默认实现。

```javascript
const obj = {
    foo: '123',
    bar: '456'
}
const proxy = new Proxy(obj, {
    get (target, prop){
        console.log('watch logic')
        return Reflect.get(target, prop)
    }
})
console.log(proxy.foo)
//watch logic
//123
```

如果没有去添加处理器对象的方法（如get、set），那么内部的get和set的执行是：proxy处理对象内部默认实现的逻辑就是调用了reflect对象当中所对应的方法，也就是说如果没有定义get方法 就等同于定义了一个get方法，然后在内部将参数原封不动交给Reflect.get方法，结果是一样的，如上。

也就是说我们在实现自定义的get或set这样的逻辑时，更标准的做法是先去实现自己所需要监视逻辑，再去通过reflect中对应的方法的调用结果。例如通过console.log模拟了自己所需要的监视逻辑，然后在外界访问这个代理对象的属性，结果是正常的。

**<u>Reflect对象最大的意义就是（提供了一套统一的用于操作对象的API）</u>**，在这之前我们去操作对象时，有可能时会有Object对象上的一些方法，也有可能使用的是像delete或in这样的操作符，这些对于新手来说太乱了，没有什么规律。那Reflect对象很好解决了这个问题，它统一了对象的操作方式。通过几个简单的例子看一下：

```js
const obj = {
    name: 'zce',
    age: 18
}
//传统方式要去判断对象当中是否存在某个属性，就需要用到 “属性名” in 对象（也可以用hasOwnProperty,但是这个只能判断是否是属于自身的属性，无法找到原型身上的属性。hasOwnProperty()只在属性存在于实例中时才返回true）判断自身属性是否存在！！！
console.log('name' in obj)
//删除name属性，用到delete
console.log(delete obj['age'])
//如果要获取对象中所有的属性名，又需要去使用Object.keys方法
console.log(Object.keys(obj))
//true
//true
//['name', 'age']
```

由此可见，同样都是去操作这个对象，一会要用操作符，一会又要用到某个对象中的方法。换作现在，reflect对象就提供了一个统一的方式：

```js
const obj = {
    name: 'zce',
    age: 18
}
console.log(Reflect.has(obj, 'name'))
console.log(Reflect.deleteProperty(obj, 'age'))
console.log(Reflect.ownKeys(obj))
```

- 判断对象是否存在某一个属性，使用Reflect.has方法。
- 删除某个属性，可以用deleteProperty方法。
- 想要获取对象所有的属性名，可以使用ownKeys方法。

这样的体验更为合理一些，当然这只是个人的感悟。

————————————————————————————————————————————————————————————

## Promise

Promise是ES2015中提供的一个内置对象，它提供了一种全新的异步编程解决方案，通过链式调用的方式解决了传统js在异步编程过程中回调函数嵌套过深的问题。

————————————————————————————————————————————————————————————

## class类

在此之前，ECMAScript中都是通过定义函数以及函数的原型对象来去实现类型。比如要定义一个Person的类型，首先要定义一个Person函数，作为这个类型的构造函数，在构造函数中我们可以通过this去访问当前的实例对象，如果我们需要在这个类型所有的实例之间去共享一些成员，可以借助函数对象的prototype 也就是通过原型去实现。

```js
function Person(name){
    this.name = name
}
Person.prototype.say = function(){
    console.log(`hi, my name is ${this.name}`)
}
```

那自从ES6开始，我们就可以使用一个class关键字来去声明一个类型，这种独立定义类型的语法相比较之前函数的方式，要更容易理解，结构也更加清晰一些。来通过class去复现一下这个Person类型：

如果需要在构造函数中做一些额外的逻辑，可以在里面添加一个叫做constructor的方法，这个方法就是当前这个类型的构造函数，同样可以在这个构造函数中使用this访问当前类型的实例对象。如果想要为这个类型去定义一些实例方法，只需要在这个类型里面添加对应的方法成员就可以了。完成以后同样可以用new关键词去创建这个person类型的实例，然后去调用实例里面提供的say方法。

```javascript
//用class来写：
class Person {
    constructor (name){
        this.name = name
    }
    say(){
        console.log(`hi, my name is ${this.name}`)
    }
}
const p = new Person('tom')
p.say() // hi, my name is tom
```



在类型中的方法，一般分为实例方法和静态方法。实例方法就是需要这个类型构造的实例对象去调用，而静态方法则是直接通过类型本身去调用。以前实现静态方法是直接在构造函数对象上来挂载方法来实现，因为在js中函数也是对象，它也可以去添加一些方法成员。而在ES6中就多了一个专门用来去甜添加静态方法的关键词家static

```js
class Person {
    constructor (name){
        this.name = name
    }
    say(){
        console.log(`hi, my name is ${this.name}`)
    }
    static create (name){
        return new Person (name)
    }
}
//调用静态方法就是直接通过类型.方法名 去使用
const tom = Person.create('tom')
tom.say()
```

这里需要注意的是，因为我们的静态方法是挂载到类型上面的，所以在静态方法内部它的this就不会去指向某一个实例对象，而是当前的类型。

————————————————————————————————————————————————————————————

## 类的继承

通过继承这种特性，我们就能够抽象出来相似相似类型之间重复的地方。在ES6之前大多数情况我们都会使用原型的方式去实现继承，而在ES6中，它实现了一个专门用于类型继承的关键词叫 extends 。

```js
class Person {
    constructor (name){
        this.name = name
    }
    say(){
        console.log(`hi, my name is ${this.name}`)
    }
}
class Student extends Person {
    constructor (name, number){
        super(name)
        this.number = number
    }
    hello (){
        super.say()
        console.log(`my school number is ${this.number}`)
    }
}
const s = new Student('Jack', '100')
s.hello()
```

Student类型就会拥有Person类型的所有成员了，在Student类型中我们接收两个参数，name在父类参数也需要用到，所以这里我们需要用到`super`对象，这个对象始终指向父类，调用它就是调用了父类的构造函数。然后可以定义这个类型特有的成员，那在hello方法中同样可以使用super对象去访问父类成员，如调用父类里面的say方法。

————————————————————————————————————————————————————————————

## Set

ES2015提供了一个叫Set的全新数据结构，可以把它理解为集合，与传统的数组很类似，不过Set内部的成员是不允许被重复的，也就是说每一个值在同一个Set中都是唯一的。它是一个类型，通过这个类型构造的实例就可以用来存放不重复的数据。`Set`本身是一个构造函数，用来生成 Set 数据结构。

可以通过这个实例的add方法来去忘集合中添加数据。由于这个add会返回这个集合本身，所以说我们可以链式调用，那如果我们在这个过程中添加了之前已经存在的值，那所添加的这个值就会忽略掉。那想要遍历集合中的数据，就可以使用集合对象的forEach方法，然后去传入一个回调函数，也可以使用ES6中所提供的for...of循环，这种循环是一种新的语法，它也可以去遍历普通的数组，它所遍历的i实际就是数组中每一个成员。

```js
const s = new Set()
s.add(1).add(2).add(3).add(4).add(2)
console.log(s)
// Set { 1, 2, 3, 4 }
s.forEach(i => console.log(i))
for(let i of s){
    console.log(i)
}
console.log(s.size)
```

除此之外，在Set方法还可以通过size来去获取整个集合的长度，这与数组中的length是相同的道理。常用的方法有has，用来判断集合中是否存在某一个特定的值。delete方法用来删除集合中某一个指定的值，删除成功的话将会返回一个true。clear方法可以清除当前集合的全部内容。

```js
const s = new Set()
s.add(1).add(2).add(3).add(4).add(2)
console.log(s.has(100))
//false
console.log(s.delete(3))
//true
console.log(s)
// Set { 1, 2, 4 }
s.clear()
console.log(s)
// Set {}
```

这种Set的数据结构最常用的应该场景就是来为数组中的元素去重：

```js
const arr = [1, 2, 1, 3, 4, 1]
const result = Array.from(new Set(arr))
//这里使用Array.from方法去把set再次转换为数组。
const result = [...new Set(arr)]
//也可以用...的方法在一个空数组中展开这个set
console.log(result)
```

————————————————————————————————————————————————————————————

## Map

Map数据结构与对象十分类似，本质上他们都是键值对集合，但是这种对象结构中的键它只能够是字符串类型，所以我们存放一些复杂结构的数据时，会有一些问题。这里重点要看的就是键（例子中有以布尔值、数字、对象作为键）。

```js
const obj = {}
obj[true] = 'value'
obj[123] = 'value'
obj[{a: 1}] = 'value'
//此时如果把键都打印出来，就能发现问题。先获取所有键console.log(Object.keys(obj))
// ['123', 'true', '[object Object]']
//打印出来之后 这些键都被转换成了字符串。即如果我们给对象添加的键不是字符串，内部就会将这个数据toString的结果作为键
console.log(obj['[object Object]'])
//value
```

假定我们要用对象去存储每个学生的考试成绩，那如果我们用学生对象为键，不管对象当中的属性有什么不同，那每一个对象toString默认的结果都是一样的（都是那个'[object Object]'），自然也就没办法做到区分，甚至使用方括号[]也能获取到对应的值，因为我们toString的结果就是这个字符串，那这就是问题。



在ES6中Map结构就是为了解决这个问题，那 map 才能算是**严格意义上的键值对集合**，用来映射两个任意类型数据之间的对应关系。

首先通过map构造函数去创建一个map实例，可以使用这个实例的set方法去存数据，那这里键就可以是任意类型的数据，也不用担心它转换成字符串。如果要获取其中的数据，我们也可以使用get方法。除此之外也可以用has方法去判断某一个键是否存在，delete方法去删除某个键，clear方法去清空所有的键值。

```js
const m = new Map()
const tom = {
    name: 'tom'
}
m.set(tom, 90)
console.log(m)
// Map(1) { { name: 'tom' } => 90 }
console.log(m.get(tom))
// 90
//m.has()
//m.delete()
//m.clear()
```

如果需要获取所有的键值，可以使用实例对象的forEach方法，在这个方法的回调函数中，第一个参数就是我们被遍历的值，第二个参数就是被遍历的键，可以分别打印出来。

```js
const m = new Map()
const tom = { name: 'tom'}
m.set(tom, 90)
m.forEach((value, key) => {
    console.log(value, key)
})
```

那 map 数据结构最大的特点就是它可以**用任意类型的数据作为键**，而**对象实际上只能使用字符串作为键**。



------

## Symbol

在ES6之前，对象的属性名都是字符串，而字符串是**有可能会重复的**，那如果重复的话就会产生冲突。例如我们定义一个用于存放数据缓存的对象，我们约定这个对象是全局共享的，这里为了更直观的展示，这里用注释去区分。

```js
const cache = {}
cache['foo'] = Math.random()
cache['foo'] = '123'
console.log(cache)
```

如果我们不知道cache对象之前就已经存在一个foo的键，也去使用foo作为键去存放另外一个数据，此时就会产生冲突。ES2015为了解决这个问题，它提供了一种全新的原始数据类型symbol，它的作用就是**表示一个独一无二的值**。



通过 symbol 函数去创建 symbol 类型的数据，而且这种数据 typeof 的结果是symbol，也就表示它确实是一个全新的类型。这种类型最大的特点就是独一无二，也就是说，我们通过 symbol 函数创建的每一个值都是唯一不重复。

```js
const s = Symbol()
console.log(s)
// Symbol()
console.log(typeof s)
// symbol
console.log(Symbol() == Symbol())
//false
Symbol('foo') == Symbol('foo')
//false
```



考虑到开发过程中的调试，symbol 函数**允许我们传入一个字符串作为这个值的描述文本**，那对于我们多次使用symbol的话就可以在控制台中去区分到底哪一个对应的symbol。自ES2015开始，对象可以直接去使用 symbol 类型的值作为属性名，即我们对象的属性名可以是两种类型，分别是string和symbol。

```js
console.log(Symbol('foo'))
//Symbol(foo)
console.log(Symbol('bar'))
//Symbol(bar)
console.log(Symbol('baz'))
//Symbol(baz)
```

创建一个对象，使用symbol值去作为键，为对象去添加两个成员。由于symbol的值都是独一无二的，就不用去担心可能会产生冲突的问题了。

```js
const obj = {}
obj[Symbol()] = '123'
obj[Symbol()] = '456'
console.log(obj)
// { [Symbol()]: '123', [Symbol()]: '456' }
```

这里我们也可以用计算属性名的方式直接在对象字面量中去使用symbol作为属性名，结果也是相同的。

```js
const obj = {
    [Symbol()]: 123
}
console.log(obj)
// { [Symbol()]: 123 }
```



另外，symbol除了可以用来去避免对象、属性名重复产生的问题，我们还可以借助于这种类型的特点去模拟实现对象的xiu成员。以前去定义私有成员都是靠约定，例如我们约定用下划线开头就表示私有成员，约定外界不允许对象当中下划线开头的成员。

那现在有了symbol之后，我们就可以使用symbol来去创建私有成员的属性名了，在这个对象的内部，我们可以使用创建属性时的symbol去拿到对应的属性成员。而在外部文件中，因为我们没有办法再去创建一个完全相同的symbol，所以我们就不能直接访问到这个成员，只能去调用这个对象中普通名称的成员，那这样就实现了所谓的私有成员。

```js
// a.js
const name = Symbol()
const person = {
    [name]: 'zce',
    say(){
        console.log(this[name])
    }
}
// b.jsperson.say()
```

这种类型的值目前最主要的作用就是为对象去添加独一无二的属性标识符，截止到ES2019标准，ECMAScript一共定义了6种原始数据类型+Object数据类型，共7种数据类型。未来还会新增一个BigInt的数据类型，用于去更长的数字，只不过目前这个类型还处在stage-4阶段，预计在下一个版本就能正式被标准化，到时候就一共8种数据类型了。



```js
// 没有参数的情况let s1 = Symbol();let s2 = Symbol();s1 === s2
// false
// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');
s1 === s2
// false
```

每次通过symbol函数去创建的值，一定是唯一的值，不管我们传入的描述文本是不是相同的，每次去调用symbol函数它得到的结果都是全新的一个值。如果我们要在全局复用一个相同的symbol值，可以使用全局变量的方式去实现，或使用symbol类型提供的静态方法去实现。就是symbol里面的for方法，这个方法可以接收一个字符串为参数，那相同的字符串就一定会返回相同symbol类型的值，这个方法内部维护了全局的注册表，为我们的字符串和symbol值提供了一个一一对应的关系。

需要注意的是在这个方法内部维护的是字符串和symbol之间的对应关系。也就是说，如果我们传入的不是字符串，那这个方法内部就会把它自动转换成字符串，这样就会导致我们传入布尔值的true和我们传入字符串的true结果拿到的都是一样的。

```js
const s1 = Symbol.for('foo')
const s2 = Symbol.for('foo')
console.log(s1 == s2)
//true
console.log(Symbol.for(true) == Symbol.for('true'))
//true
```

而且在symbol类型中，提供了很多内置的symbol常量，用来作为内部方法的标识，这些标识符可以让自定义对象去实现一些js当中内置的接口。例如我们定义一个obj对象，调用这个对象的toString方法，结果默认就是[object Object]，我们这种字符串叫做对象的toString标签。

如果我们要自定义这个对象的toString标签，就可以在这个对象中去添加一个特定的成员去标识，考虑到如果使用字符串去添加这种标识符，就有可能会跟内部的一些成员产生重复，所以ECMAScript要求我们使用Symbol值去实现这样的一个接口。

```js
const obj = {}
console.log(obj.toString())
//[object Object]
```

在我们对象中添加一个Symbol.toStringTag属性，让他等于XObject，此时toString标签就是我们自定义的Xobject。这里的toStringTag就是Symbol内置的常量，这种symbol后面为对象去实现迭代器时会经常用到。

```js
const obj = {
    [Symbol.toStringTag]: 'XObject'
}
console.log(obj.toString()) //[object XObject]
```



我们使用Symbol值去作为对象的属性名，这个属性通过传统的for in循环是无法拿到的，而且我们通过Object.keys也是获取不到Symbol类型的属性名。如果我们通过JSON.stringify去序列化我们的对象为JSON字符串的话，那Symbol属性也会被忽略掉。总之这些特性都使得symbol类型的属性特别适合对象的私有属性。要获取这种类型的属性名：可以使用**Object.getOwnPropertySymbols**方法，这个方法的作用类似于Object.keys方法，所不同的是Object.keys方法只能获取对象中所有的字符串属性名，而它获取到的全是symbol类型的属性名。

```js
const obj = {
    [Symbol()]: 'symbol value',
    foo: 'normal value'
}
for (var key in obj){
    console.log(key) // foo
}
console.log(Object.keys(obj))
// ['foo']
console.log(JSON.stringify(obj)) // {"foo": "normal value"}
console.log(Object.getOwnPropertySymbols(obj)) // [ Symbol() ]
```

------

## for...of 循环

for循环比较适合去遍历普通的数组，for...in循环比较适合去遍历键值对，再有就是一些函数式的遍历方法，如数组对象的forEach方法。这些各种各样遍历数据的方式都有一定的局限性，所以ES2015借鉴了很多其他的语言，引入了一种全新的遍历方式，叫for...of循环，这种遍历方式以后会作为遍历所有数据结构的统一方式，即 只要明白for..of内部工作的原理，就可以使用这种循环去遍历任何一种自定义的数据结构。

```js
//基本用法
const arr = [100, 200, 300, 400]
for(const item of arr){
    console.log(item)
}
arr.forEach(item => {
    console.log(item)
})
//都是
//100
//200
//300
//400
```

不同于传统的for..in循环，for..of循环拿到的就是数组中的每一个元素，而不是对应的下标。这种循环方式就可以取代数组实例当中的forEach方法，而且相比于forEach方法，for...of循环它可以使用break关键字随时去终止循环，而forEach方法是无法去终止遍历的。在以前我们为了随时可以终止遍历，必须要去使用数组实例的some或者every方法，在some方法的回调函数中返回true，在every方法的回调函数中返回false，都可以用来终止遍历，而在forEach方法中无论返回true/false都无法终止遍历。而在for..of直接使用break关键字去随时终止循环。

```js
const arr = [100, 200, 300, 400]
for(const item of arr){
    console.log(item)
    if(item > 100){
        break    
    }
}
//100
//200
arr.forEach()
// 不能跳出循环
```

此外，伪数组对象也是可以直接用for...of循环中遍历，如在函数中的arguments对象，或者是在dom操作时一些元素节点的列表，跟普通数组的遍历没有区别。



在ES2015新增的set和map对象，遍历set和遍历数组也没有什么区别，它每次迭代拿到的就是当前元素本身。

```js
const s = new Set(['foo', 'bar'])
for(const item of s){
    console.log(item)
}
// foo
// bar
```

通过map对象的set方法来去设置一些键值，紧接着我们就可以直接使用for...of循环去遍历这个map。结果可以看到，遍历map每次的得到的还是一个数组，而且这个数组当中都是两个成员，分别就是当前被遍历的键和值，因为我们遍历的是键值结构，一般键和值在循环体中都需要用到，所以这里它是以数组的形式提供键和值，这里就可以配合数组的解构语法直接拿到数组当中的键和值，这样的话，在遍历map的时候就可以直接去使用对应的键值了，这也就是我们去遍历map和遍历数组之间的细微差异。

```js
const m = new Map()
m.set('foo', '123')
m.set('bar', '345')
for(const item of m){
    console.log(item)
}
// ['foo', '123']
// ['bar', '345']
for(const [key, value] of m){
    console.log(key, value)
}
// foo 123
// bar 345
```



尝试用for...of去尝试遍历最普通的对象，发现它连最基本的普通对象都没法遍历，会报错。

```js
const obj ={ foo: 123, bar: 456}
for(let item of obj) {
    console.log(item)
}
//报错 TypeError: obj is not iterable
```

> 对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换。不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES5 没有 Map 结构，而 ES6 原生提供了。
>
> 一个对象如果要具备可被`for...of`循环调用的 Iterator 接口，就必须在`Symbol.iterator`的属性上部署遍历器生成方法（见下文遍历器/迭代器）。
>
> 总结：
>
> 一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有 iterator 接口，就可以用`for...of`循环遍历它的成员。也就是说，`for...of`循环内部调用的是数据结构的`Symbol.iterator`方法。
>
> `for...of`循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如`arguments`对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。

------

在ECMAScript中能够用于表示有结构的数据类型越来越多，从原来数组，对象到现在set，map，而且开发者可以组合使用这些类型，定义一些符合业务需求的数据结构，为了提供一种统一的遍历方式，ES6提出了一个叫Iterable的接口，意思是可以迭代的。接口的概念可以理解为一种规格标准，例如任意一种数据类型都有toString方法，这就是因为他们都实现了统一的规格标准，而在编程语言中更专业的说法就是他们都实现了统一的接口，那 可迭代接口就是一种可以被for...of循环统一遍历访问的规格标准。即只要这个数据结构实现了可迭代接口，就能够被for...of循环去遍历。

我们之前尝试能够直接被for...of循环遍历的数据类型，都已经在内部实现了这个接口。



## 迭代器（Iterator）

所有可以被for...of循环遍历的数据类型，它都必须要实现iterable的接口，即它在内部必须要挂载一个iterator的方法，这个方法需要返回一个带有next方法的对象，不断调用这个next方法就可以实现对内部所有数据的遍历。

把刚刚的尝试落实到set上，调用set对象的iterator方法，去得到这个对象的迭代器，通过迭代器的next方法去迭代set当中的数据了。

```js
const set = new Set(['foo', 'bar', 'baz'])
const iterator = set[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
// { value: 'foo', done: false }   
// { value: 'bar', done: false }   
// { value: 'baz', done: false }   
// { value: undefined, done: true }
// { value: undefined, done: true }
```

可见，set中的数据确实被正常遍历了，其实这也是for...of循环内部的工作原理，for...of循环内部就是按照这里的执行过程实现的遍历。其实也可以使用while循环来实现相同的遍历。

> Iterator 的遍历过程是这样的。
>
> （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
>
> （2）第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。
>
> （3）第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。
>
> （4）不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。
>
> 每一次调用`next`方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含`value`和`done`两个属性的对象。其中，`value`属性是当前成员的值，`done`属性是一个布尔值，表示遍历是否结束。



for...of可以作为遍历所有数据结构的统一方式，因为它内部就是去调用被调用对象的iterator方法得到一个迭代器，从而去遍历内部所有的数据，那这也是iterable接口所约定的内容。换句话说，只要我们的对象也实现了iterable接口，就可以实现使用for...of循环去遍历对象。实现iterable接口实际上就是在对象中去挂载iterator方法，在这个方法中去返回一个迭代器对象。



**实现可迭代接口（Iterable）**

自定义对象实现可迭代接口。在这个iterator方法的内部需要返回一个实现迭代器接口的对象，也就是说在这个对象中需要提供一个next方法用于实现向后迭代的逻辑，在next方法内部需要返回一个迭代结果对象，这个对象需要有两个成员，分别是value和done。value用来去表示当前被迭代到的数据，值可以是任意类型，还需要有一个done的布尔值，用来表示迭代有没有结束。

那整个对象我们叫iterable，中间带有next方法的对象叫iterator，里面这个对象叫iterationResult。

> Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即`for...of`循环（详见下文）。当使用`for...of`循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
>
> 一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。
>
> ES6 规定，默认的 Iterator 接口部署在数据结构的`Symbol.iterator`属性，或者说，一个数据结构只要具有`Symbol.iterator`属性，就可以认为是“可遍历的”（iterable）。`Symbol.iterator`属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名`Symbol.iterator`，它是一个表达式，返回`Symbol`对象的`iterator`属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内。

```js
const obj = {
    //这是symbol类型提供的常量，所以需要使用计算属性名的方式定义到字面量当中。
    [Symbol.iterator]: function (){       
        return {            
            next: function (){  
                return {                 
                    value: 'zce',               
                    done: true              
                }           
            }        
        }    
    }
}
for(let item of obj){   
    console.log('循环体')
}
//无报错，表面实现这个可迭代接口能够被for...of直接去遍历。只是这里的循环体并没有被执行，因为我们写死了next方法返回的结果，内部第一次调用next返回结果当中的done属性的值就是true，所以说就表示我们的循环结束了，我们的循环体自然就不会再执行了。
```

> 上面代码中，对象`obj`是可遍历的（iterable），因为具有`Symbol.iterator`属性。执行这个属性，会返回一个遍历器对象。该对象的根本特征就是具有`next`方法。每次调用`next`方法，都会返回一个代表当前成员的信息对象，具有`value`和`done`两个属性。

来修改一下这个对象

```js
const obj = {
    // 添加一个数组，用于去存放一些值得被遍历的数据，然后在next方法迭代这个数组
    store: ['foo', 'bar', 'baz'],
    [Symbol.iterator]: function () {   
        //这里需要维护一个下标，默认等于0。      
        //由于next函数中的this并不是obj对象，所以要定义一个self去接收当前的this       
        let index = 0
        const self = this
        return {
            next: function (){
                const result =  {
                    //在next方法中：
                    value: self.store[index],
                    done: index >= self.store.length
                }
                //让index++
                index++
                return result
            }
        }
    }
}
for(let item of obj){
    console.log('循环体')
}
// 循环体 foo
// 循环体 bar
// 循环体 baz
```

> ES6 的有些数据结构原生具备 Iterator 接口（比如数组），即不用任何处理，就可以被`for...of`循环遍历。原因在于，这些数据结构原生部署了`Symbol.iterator`属性（详见下文），另外一些数据结构没有（比如对象）。凡是部署了`Symbol.iterator`属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。

下面的例子是数组的`Symbol.iterator`属性。

```javascript
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();
iter.next()
// { value: 'a', done: false }
iter.next() 
// { value: 'b', done: false }
iter.next()
// { value: 'c', done: false }
iter.next()
// { value: undefined, done: true }
```

> 上面代码中，变量`arr`是一个数组，原生就具有遍历器接口，部署在`arr`的`Symbol.iterator`属性上面。所以，调用这个属性，就得到遍历器对象。数组原生具备`iterator`接口（即默认部署了`Symbol.iterator`属性），`for...of`循环本质上就是调用这个接口产生的遍历器。
>
> 对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，`for...of`循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的 Iterator 接口，都需要自己在`Symbol.iterator`属性上面部署，这样才会被`for...of`循环遍历。



**迭代器模式**

> 遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
>
> Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费。

使用迭代器的方式实现可迭代接口。添加一个iterator方法用于去实现可迭代接口，在这个方法中去使用ES6的...操作符将内部的3个数组展开为一个新的数组，使用let关键字定义一个index变量作为索引，最后再去返回一个迭代器对象。在迭代器对象next方法中去返回此次迭代的结果，那这里的value就应该是整体数组的index，done的值就是index是否大于等于整个数组的长度，使用完index过后要让他++，否则会产生死循环。

```js
const todos = {
    life: ['吃饭', '睡觉', '上厕所'],
    study: ['chinese', 'english', 'math'],
    work: ['drink tea'],
    // 这个函数接收外部的回调函数作为参数
    each: function(callback){
        // 在方法中去遍历内部所有的数据，把所有数组合并到一起。
        const all = [].concat(this.life, this.study, this.work)
        // 然后再去遍历他们，并且将每个数据都交个这个回调函数 
        for(let i of all){ 
            callback(i)  
            // 这样我就相当于对外提供了一个统一遍历的接口 
        } 
    },
    [Symbol.iterator]: function(){
        const all = [...this.life, ...this.study, ...this.work]
        let index = 0
        return {
            next: function(){
                return{
                    value: all[index],
                    done: index++ >= all.length 
                }
            }
        }
    }
}
todos.each(function(item){
    console.log(item)
})
for(const item of todos){
    console.log(item)
}
// 在外部就可以使用for...of循环来统一遍历todos对象了，效果是和each方法是一样的
```

这就是实现迭代器的意义，核心就是对外提供统一遍历接口，让外部不用再关心这个数据内部的结构是怎么样的。

这里的each方法只适用于我们当前这个对象结构，而ES6的iterator是语言层面是实现的迭代器模式，可以去适用于任何数据结构，只需要你通过代码去实现iterator的方法，实现它的迭代逻辑就可以了。

------

## 生成器（Generator）

> Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。
>
> 执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
>
> 形式上，Generator 函数是一个普通函数，但是有两个特征。一是，`function`关键字与函数名之间有一个星号；二是，函数体内部使用`yield`表达式，定义不同的内部状态（`yield`在英语里的意思就是“产出”）。

在ES6中还新增了一种生成器函数叫generator，引入这个新特性的目的就是为了能够在复杂的异步代码中减少回调函数嵌套产生的问题，从而去提供更好的异步编程解决方案。

语法及基本应用：在function关键字后面加一个*，这个函数就变成了生成器函数。因为生成器对象也实现了iterator接口，也就是遍历器接口的协议。

```js
function * foo (){
    console.log('abc')
    return 100
}
let result = foo()
console.log(result.next())
// abc
// {value: 100, done: true}
```



用yield关键字取代return 返回100，由于yield关键字并不会结束掉这个方法的执行，所以可以以此类推继续去打印全是2的字符串，然后yield一个200等，打印一下next方法的返回值。

```js
function * foo(){
    console.log('111')
    yield 100
    console.log('222')
    yield 200
    console.log('333')
    yield 300
}
const generator = foo()
console.log(generator.next())
// 111
// {value: 100, done: false}
console.log(generator.next())
// 222
// {value: 200, done: false}
console.log(generator.next())
// 333
// {value: 300, done: false}
console.log(generator.next())
// {value: undefined, done: true}
```

也就是说，函数中后面的yield语句还没有执行，因为如果执行了一定会打印后面的。再调用一次next方法，此时全是1全是2的都被执行了，再次调用next，就是都打印一遍了。

由此可见，生成器函数会自动返回一个生成器对象，调用这个对象的next方法才会让这个函数的函数体开始执行，执行过程中一旦遇到yield关键词，函数的执行就会被暂停，而且yield后面的值将会作为next的结果返回，如果我们继续调用生成器对象的next，函数就会从暂停的位置继续开始执行，周而复始，一直到函数完全结束，那next所返回done的值 也就变成了true。特点就是惰性执行。



**应用：**经常会需要用到自增的ID，而且每次调用这个ID都需要在原有的基础上去+1，这里如果使用生成器函数来去实现这个功能是最合适的。函数内先定义1个初始ID为1，再去使用一个死循环不断yield id++，在这里根本不需要担心死循环的问题，因为我们每次在yield过后，这个方法会被暂停，那这个循环自然也会暂停，直到下一次调用next，再去执行一次，又会被暂停下来。

外部就可以通过一个方法去创建一个生成器对象，可以把这个生成器理解成发号器，每次调用一下发号器的next方法，就能拿到一个自增的ID，当然这只是一个非常简单的需求。

```js
function * createIdMaker (){
    let id = 1
    while (true){
        yield id++
    }
}
const idMaker = createIdMaker()
console.log(idMaker.next().value)
// 1
console.log(idMaker.next().value)
// 2
console.log(idMaker.next().value)
// 3
console.log(idMaker.next().value)
// 4
```

还可以使用生成器函数去实现对象的iterator方法，因为生成器也实现了iterator接口，而且使用生成器函数去实现iterator方法会比之前的方式要简单很多，这里我们在原有的案例基础上使用生成器函数，来实现iterator方法。

```js
const todos = {
    life: ['吃饭', '睡觉', '上厕所'],
    study: ['chinese', 'english', 'math'],
    work: ['drink tea'],
    [Symbol.iterator]: function * (){
        const all = [...this.life, ...this.study, ...this.work]
        // 在这里我们就不用返回迭代器对象了，而是直接在iterator方法内部，直接去遍历所有的成员，然后通过yield去返回每一个被遍历到的对象就可以了
        for(const item of all){
            yield item 
        }
    }
}
for(const item of todos){
    console.log(item)
}
```

以上是生成器函数的一些简单应用，但是它最重要的目的还是为了解决异步编程中回调嵌套过深所导致的问题，详细可见**异步编程**里构造器的介绍。

------

## ES Modules

是ES2015中标准化的一套语言层面的模块化规范，会在模块化开发中详细介绍，会跟common JS以及一些其他的标准做一个统一的对比。

------

## ES2016（ECMAScript 2016）

发布于2016年6月。与ES2015相比，它只是一个小版本，仅包含两个小功能（includes和指数运算符）

### 1、数组的includes方法

用于检查数组中是否包含指定元素，在此之前要检查数组是否存在某个指定的元素，我们就必须要使用数组对象的`indexOf`方法实现。因为这个方法可以帮我们找到元素在数组中所对应的下标，在没有找到指定元素的情况下它会返回-1，但是这种方式去判断是否存在某一个元素，也会存在一个问题，就是他不能够用于去查找数组当中的NaN。那现在有了includes方法后，我们就可以直接去判断数组中是否存在某一个指定的元素了。

```js
const arr = ['foo', 1, NaN, false]
console.log(arr.indexOf('foo'))
// 0
console.log(arr.indexOf('bar'))
// -1
console.log(arr.indexOf(NaN))
// -1
console.log(arr.includes('foo'))
// true
console.log(arr.includes(NaN))
// true
```

includes方法它直接就返回一个布尔值去表示存在与否，而且includes方法相对于indexOf，它还可以用来去查找NaN这样的数值。

### 2、指数运算符

以前要进行指数运算，我们需要借助于Math对象中的power方法来去实现。在ES2016中的指数运算符就是语言本身的运算符，就像是我们之前使用的加减乘除运算符一样。

```js
// 2的10次方，2就是底数，10就是指数
console.log(Math.pow(2, 10))
//1024
// ES2016
console.log(2 ** 10)
// 1024
```

这种新的运算符对于数学密集型的应用是一个很好的补充，不过我们在日常的应用开发中很少会用到指数运算。

------

## ES2017（ECMAScript 2017）

是ECMAScript标准的第8个版本，发布于2017年6月。与ES2015相比，也只是一个小版本，但是它同样带来了一些非常有用的新功能。

### 1、Object.values

与之前ES5的Object.keys方法非常类似，但是keys方法返回的是对象当中所有键组成的一个数组。而values返回的是这个对象当中所有的值组成的数组。

```js
const obj = {
    foo: 'value1',
    bar: 'value2'
}
console.log(Object.values(obj))
// ['value1', 'value2']
```

### 2、Object.entries（挺有用）

是以数组的形式返回我们对象当中所有的键值对，使得我们可以直接使用for...of循环去遍历普通对象，就可以使用Object.entries先将这个**<u>对象</u>转换成<u>数组形式</u>的结构**，然后可以通过for...of循环去遍历他们。

```js
const obj = {
    foo: 'value1',
    bar: 'value2'
}
console.log(Object.entries(obj))
// [ [ 'foo', 'value1' ], [ 'bar', 'value2' ] ]
for(let [key, value] of Object.entries(obj)){
    console.log(key, value)
}
// foo value1
// bar value2
```

**因为map的构造函数需要的就是这种格式的数组**，所以我们就可以借助于entries方法**将一个对象去转换成一个map类型的对象**。

```js
const obj = {
    foo: 'value1',
    bar: 'value2'
}
console.log(new Map(Object.entries(obj)))
// Map(2) { 'foo' => 'value1', 'bar' => 'value2' }
```



有一个叫`getOwnPropertyDescriptors`的方法，这个方法实际上是用来去帮我们获取对象当中属性的完整描述信息，自从ES5过后就可以为对象去定义getter和setter属性，这种getter和setter属性不能够直接通过Object.assign方法去完全复制的。这是因为Object.assign在复制时把fullName当做一个普通属性去复制，所以说才会出现这种情况。

```js
const p1 = {
    firstName: 'Lei',
    lastName: 'Wang',
    get fullName (){
        return this.firstName + ' ' + this.lastName
    }
    // 这里定义的是getter属性，返回值就是属性值，这样就相当于为外界提供了一个只读属性
}
console.log(p1.fullName) // Lei Wang
//复制一个对象出来
const p2 = Object.assign({}, p1)
p2.firstName = 'zce'console.log(p2.fullName)
// Lei Wang（按道理应该输出的是zce）
```

这种情况下我们就可以使用`Obeject.getOwnPropertyDescriptors`方法去获取我们对象当中属性完整描述信息，再使用Obejct.defineProperties方法去将描述信息定义到一个新的对象中，这样的话我们对于getter和setter类型的属性就可以做到复制了。此时p2对象再修改掉它的firstName，那它的fullName也会跟着一起改，那这就是`getOwnPropertyDescriptors`的意义，它主要就是配合ES5所新增的getter和setter去使用。

```js
const p1 = {
    firstName: 'Lei',
    lastName: 'Wang',
    get fullName (){
        return this.firstName + ' ' + this.lastName
    }
}
const descriptors = Object.getOwnPropertyDescriptors(p1)
//console.log(descriptors)
//输出一个对象，该对象包含3个对象first、last、full
const p2 = Object.defineProperties({}, descriptors)
p2.firstName = 'zce'console.log(p2.fullName) // zce Wang
```



### 3、String.prototype.padStart / String.prototype.padEnd

另外，ES2017还新增了两个字符串填充方法，功能也很简单也很实用。比如可以用它为数字前面添加，或者我们可以用这种方法来对齐我们输出的字符串长度。

如果我们直接遍历输出这些数据，那控制台显示就会非常乱。更适合的方式就是使用字符串的pad方法去将我们输出的这些文本做一个对齐。这两个方法的效果用给定的字符串去填充目标字符串的开始或结束位置，直到字符串拿到指定长度位置。

```js
const books = {
    html: 5,
    css: 16,
    javascript: 128
}
for(let [name, count] of Object.entries(books)){
    console.log(name, count)
}
// html 5
// css 16
// javascript 128
for(let [name, count] of Object.entries(books)){
    //通过padEnd去固定为16个字符长度 对于空白的位置使用-去填充，用|去分割
    //count是数字，用toString转换成字符串，然后调用padStart方法为前面添加导0，这个数字保留3位长度
    console.log(`${name.padEnd(16, '-')}|${count.toString().padStart(3, '0')}`)
}
// html------------|005
// css-------------|016
// javascript------|128
```

### 4、函数的参数中添加尾逗号

ES2017还有一个非常小的变化，它允许函数的参数列表最后一位去添加一个结束的尾逗号，这是一个非常小的变化，原因也很简单。在我们定义数组或定义对象的时候，最后一个元素后面都会添加一个逗号，这里的原因也是一样的。

```js
const arr = [
    100,
    200,
    300,
    400,
]
```

好处：1、想手动调整顺序就很方便（Alt+↑/↓）；2、如果修改了数组中元素的个数，如添加了新的元素，此时只需要再去新建一行，因为如果原来最后一行没逗号，你就得在原来的最后一行去加逗号，对于源代码就得修改两行，所以允许加尾逗号（只是小变化，不影响任何实际功能层面的东西）。

ES2017只是允许我们在定义函数和调用函数的参数位置使用尾逗号罢了，目的都是一样的，并没有实际功能的变化。



### 5、Async / Await

ES2017最重要的功能，彻底解决了异步编程中回调函数嵌套过深所产生的问题，使我们的代码更加简洁易读，本质上就是使用Promise的一种语法糖而已，在异步编程会详细介绍。

提供了在不阻塞主线程的情况下 <u>使用同步代码</u> **异步访问资源**的能力。

