当项目比较复杂，多个组件共享状态的时候，使用组件间通信的方式比较麻烦，而且不易维护，所以需要一种方式来解决这个问题，此时就可以使用**集中式的状态解决方案 Vuex**



## 组件内的状态管理流程

Vue 中最核心的两个功能分别是数据驱动和组件化，使用基于组件化的开发可以提高我们的开发效率，带来更好的可维护性。每个组件内部都可以管理自己的内部状态，模板我们可以称之为视图，每个组件都有自己的视图，把状态绑定到视图上，呈现给用户。当用户和视图交互的时候，可能会更改状态。

状态管理的组成：

- state，驱动应用的数据源
- view，以声明方式将 state 映射到视图
- actions，相应在 view 上的用户输入导致的状态变化

![](./image/1.jpg)

此处数据的流向是单向的，state 状态就是我们所说的数据，数据绑定到视图，展示给用户，当用户和视图交互，通过 actions 更改数据后，再把更改后的数据重新绑定到视图。单向的数据流程特别清晰，但是多个组件共享数据的时候，会破坏这种简单的结构。

------



## 组件间通信方式回顾

三种组件间通信方式

- 父组件给子组件传值：1、在子组件中通过 props 接收父组件传递的数据；2、在父组件中调用子组件的时候，通过相应属性进行传值

  ```vue
  <template>
  	<div>
          <h1>child</h1>
          <h2>{{ title }}</h2>
      </div>
  </template>
  <script>
  export default {
      // props: ['title'],
      props: {
          title: String
      }
  }
  </script>
  ```

  props 有两种用法，值可以是数组或者是对象，如果想约定传值的类型，可以用对象，当前约定了传来的 title 要是字符串类型。

  ```vue
  <template>
  	<div>
          <h1>parent</h1>
          <child title="My journey with vue"></child>
      </div>
  </template>
  <script>
  import child from './01-Child'
  export default {
      components: {
          child
      }
  }
  </script>
  ```
  
  
  
- 子组件给父组件传值：通过自定义事件给父组件传值，通过自定义事件可以把数据传递给父组件，第二个参数就是值！！

  ```vue
  <template>
  	<div>
          <h1 :style="{ fontSize: fontSize + 'em' }">child</h1>
          <button @click="handler">点我字体变大</button>
      </div>
  </template>
  <script>
  export default {
      props: {
          fontSize: Number //这里通过props接收父组件传递的默认字体大小，绑定到h标签的style上
      },
      methods: {
          handler(){
              this.$emit('enlargeText', 0.1)
              // 点击后触发自定义事件，让字体变大0.1。
          }
      }
  }
  </script>
  ```

  $event 是这个组件内部触发事件的时候，传递过来的。
  
  ```vue
  <template>
  	<div>
          <h1 :style="{ fontSize: hFontSize + 'em' }">Parent</h1>
          <child :fontSize="hFontSize" @enlargeText="enlargeText"></child>
          <child :fontSize="hFontSize" @enlargeText="enlargeText"></child>
          <child :fontSize="hFontSize" @enlargeText="hFontSize += $event"></child>
          <!-- 这个子组件直接通过这种方式注册事件，在行内获取自定义事件传递的数据时候，直接通过$event来获取。这个值就是触发事件时传递的 0.1 -->
      </div>
  </template>
  <script>
  import child from './01-Child'
  export default {
      components: {
          child
      },
      data(){
          return {
              hFontSize: 1
          }
      },
      methods: {
          // 这里的事件处理函数接收了传过来的参数
          enlargeText(size){
              this.hFontSize += size
          }
      }
  }
  </script>
  ```

  核心是：子组件触发事件的时候，携带参数，然后在父组件中注册子组件内部触发事件，并接收传递的数据，完成子向父的传值。在注册事件的时候，行内可以通过 $event 来获取事件传递的参数，在事件处理函数中是不能这么使用的。

  

  - 不相关组件之间传值：需要用到 eventchange，就是创建一个公共的 Vue 实例，这个 Vue 实例的作用是作为事件总线或者事件中心。
  
  ```vue
  <template>
  	<div>
          <h1>siblings-01</h1>
          <div @click="sub">-</div>
          <input type="text" :value="value" />
          <div @click="add">+</div>
      </div>
  </template>
  <script>
  import bus from './eventbus'
  export default {
      props: {
          num: Number // 接收了num数据，是文本框默认显示的商品个数
      },
      created(){
          this.value = this.num // 因为props的值不建议我们直接修改，所以存到了value中
      },
      data(){
          return {
              value: -1
          }
      },
      methods: {
          sub(){
              if(this.value>1){
                  this.value--
                  bus.$emit('numchange', this.value)
              }
          },
          add(){
              this.value++
              bus.$emit('numchange', this.value)
          }
      }
  }
  </script>
  ```
  
  ```vue
  <template>
  	<div>
          <h1>siblings-02</h1>
          <div>{{msg}}</div>
      </div>
  </template>
  <script>
  import bus from './eventbus' // 是一个js文件
  export default {
      data(){
          return {
              msg: ''
          }
      },
      created(){
          bus.$on('numchange', (value) => {
              this.msg = `您选择了${value}件商品`
          })
      }
  }
  </script>
  ```
  
  

### 其他常见的方式

这些不推荐

- $refs
- $root
- $parent
- $children

ref 两个作用

- 在普通 HTML 标签上使用 ref，获取到的是 DOM
- 在组件标签上使用 ref，获取到的是组件实例

```vue
<template>
	<div>
        <input ref="input" type="text" v-model="value" />
    </div>
</template>
<script>
import bus from './eventbus' // 这里可以省略.js
export default {
    data(){
        return {
            value: ''
        }
    },
    methods: {
        focus(){
            this.$refs.input.focus() // 其实this.$refs.input就是获取了input对象，然后调用它的focus方法.
            // ref="input"中input好像改名字也可以，然后这里也改就行
        }
    }
}
</script>
```

看起来像是子传父

```vue
<template>
	<div>
        <child ref="c"></child> 
    </div>
</template>
<script>
import child from './04-child' // 这里可以省略.vue
export default {
    components:{
        child
    },
    mounted (){
        // this.$refs.c 就是子组件对象 因为上面使用子组件的时候写的是c，拿到这个对象就可以到它属性和方法
        this.$refs.c.focus()
        this.$refs.c.value = 'hello'
    }
}
</script>
```

反正就是不推荐，滥用会导致状态管理混乱



多个组件之间互相传值很难跟踪到数据的变化，如果出现问题比较难定位到问题，当遇到多个组件要共享状态的时候，典型的常见如购物车，用之前的方案都不合适。

问题：

- 多个视图依赖同一个状态
- 来自不同视图的行为需要变更同一状态

父子组件的传值也可以实现，但比较脆弱，通常会导致无法维护的代码。为了解决这些问题，可以把不同组件之间的共享状态抽取出来，存储到一个全局对象中，并且将来使用的时候，要保证它是响应式的。这个对象创建好之后，我们的任何组件都可以获取或修改全局对象中的状态。我们可以把多个组件状态或者整个程序的状态放到一个集中的位置存储，并且可以检测到数据的更改。



------



## Vuex 概念回顾

- Vuex 是专门为 Vue.js 设计的状态管理库。从使用的角度，它就是 JavaScript 库。
- Vuex 采用集中式的方式存储需要共享的状态
- Vuex 的作用是进行状态管理，解决复杂组件通信，数据共享
- Vuex 集成到了 devtools 中，提供了 time-travel 时光旅行历史回滚功能

什么情况下使用 Vuex 

- 非必要的情况不要使用 Vuex
- 大型的单页应用程序
  - 多个视图依赖同一状态
  - 来自不同视图的行为需要变更同一状态

如果我们的项目不大，并且组件间状态共享不多的情况下，这个时候使用 Vuex 给我们带来的益处并没有付出的时间多。



------



##  Vuex 的核心概念

Store 仓库，Store 是使用 Vuex 应用程序的核心，每一个应用仅有一个 Store，Store 是一个容器，包含着应用中的大部分状态。当然，我们不能直接改变 Store 中的状态，我们要通过提交 mutation 的方式改变状态。

State 就是我们的状态，保存在 Store 中，因为是 Store 是唯一，所以状态也是唯一的，称为单一状态树。但是所有的状态都保存在 State中的话，会让程序难以维护，可以通过后续的模块解决该问题，注意这里的状态时响应式的。

Getter 就像是 Vuex 中的计算属性，方便从一个属性派生出其他的值，它内部可以对计算的结果进行缓存，只有当依赖的状态发生改变的时候，才会从新计算。

Mutation - 状态的变换必须要通过提交 Mutation来完成

Action 和 Mutation 类似，不同的是 Action 可以进行异步的操作，内部改变状态的时候都需要提交 Mutation

Module 模块，由于使用单一状态树，应用的所有状态会集中到一个比较大的对象上，当应用变得非常复杂时，Store 对象就有可能变得相当臃肿，为了解决以上问题 Vuex 允许我们将 store 分割成模块，每个模块拥有自己的 state、mutation、action、getter 甚至是嵌套的子模块。 



------



## Vuex 基本代码结构



```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex) // 注册插件
export default new Vuex.Store({
    state:{
        
    },
    mutations: {
        
    },
    actions: {
        
    },
    modules: {
        
    }
})
```

```js
// 在 main.js 中
import store from './store'

new Vue({
  router,
  store, // store注入到Vue实例中
  render: h => h(App)
}).$mount('#app')
```



------

### State

是单一状态树，里面集中存储所有的状态数据，并且 State 是响应式的，要获取数据的时候直接从 State 中获取。

我们在仓库中设置的所有状态，在任何组件中都可以直接使用

```js
// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex) // 注册插件
export default new Vuex.Store({
    state:{
        count: 0,
        msg: 'hello vuex'
    },
    mutations: {
        
    },
    actions: {
        
    },
    modules: {
        
    }
})
```

如果数据多，总会出现重复的 $store.state，用计算属性简化模板中的代码。mapState 会返回一个对象，包含两个计算属性对应的方法，当前的计算属性是 count 和 msg，这个计算属性的形式是 `count: state => state.count`，这里我们需要使用扩展运算符... 展开返回对象的成员给 computed。搞定之后我们就有 count 和 msg 两个计算属性。

使用这种方式的话可以让视图中的代码更简洁，但是还有个问题就是，如果当前组件中已经有 msg 和 count 两个属性，此时再使用这种方式的话就会有冲突，怎么解决呢？

mapState 除了可以传数组，也可以传对象，传对象的话可以去修改映射的计算属性的名字。对象的属性是最终生成的计算属性的名称，值是映射的状态属性。

```vue
<template>
	<div>
        count: {{ $store.state.count }} <br/>
        msg: {{ $store.state.msg }} <br/>
        <!-- count: {{ count }} <br/> -->
        <!-- count: msg: {{ msg }} <br/> -->
        count: {{ num }} <br/>
        msg: {{ message }} <br/>
        
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: {
        mapState(['count', 'msg']){
            // count: state => state.count
            // ...mapState(['count', 'msg'])
            ...mapState({ num: 'count', message: 'msg' })
        }
    }
}
</script>
```

未来在视图中使用 state 时候可以直接使用 mapState 的方式来简化视图中的调用。我发现后面用这种映射关系都没有改名。



------



### Getter

类似于组件中的计算属性，如果**<u>想要对 state 中的数据做简单的处理再展示（不是触发事件之类的，就是要简单处理一下，类似于有个 function 处理过后再 return），你要用处理后的数据就去getters里拿，原来state是没变的。</u>**，我们可以使用 getter ，比如把 msg 倒序输出，或者过滤商品数据。也可以在 vuex 内部处理，因为状态本身是属于vuex的，所以也应该在内部处理，增加个 getters。

```js
// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex) // 注册插件
export default new Vuex.Store({
    state:{
        count: 0,
        msg: 'hello vuex'
    },
    getters: {
        // state 是我们需要处理的状态数据
        reverseMsg (state){
            // 要返回最终处理完的结果 跟计算属性一样
            return state.msg.split('').reverse().join('')
        }
    },
    mutations: {
        
    },
    actions: {
        
    },
    modules: {
        
    }
})
```

简化 state 的调用我们使用的是 mapState，那简化 getters 的调用可以使用 mapGetters，使用方法类似。负责把 vuex 中的 getters 映射到组件中的计算属性，mapGetters 返回的是对象，所以跟使用 mapState 的时候一样，也需要使用 ... 把它展开。一样也是可以传数组和对象两种，这里就演示数组吧，用对象可以改名。

```vue
<template>
	<div>
        count: {{ num }} <br/>
        msg: {{ message }} <br/>
        reverseMsg: {{ $store.getters.reverseMsg }}
        reverseMsg: {{ reverseMsg }}
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
    computed: {
        mapState(['count', 'msg']){
            // count: state => state.count
            // ...mapState(['count', 'msg'])
            ...mapState({ num: 'count', message: 'msg' })
            ...mapGetters(['reverseMsg']) // 用数组，因为可能还有很多的getter需要映射进来 
        }
    }
}
</script>
```

当我们在视图中需要对状态数据做简单处理后再展示，此时可以使用计算属性。



------



### Mutation

在视图中如何**修改状态，必须通过提交 mutation ，mutation 必须是同步执行的，这样可以保证能够在 mutation 中收集到所有的状态修改**。相比于 getter，这个是改了 state里面的数据！！！ getter 没有改 state 的数据！

```js
// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex) // 注册插件
export default new Vuex.Store({
    state:{
        count: 0,
        msg: 'hello vuex'
    },
    getters: {
        reverseMsg (state){
            return state.msg.split('').reverse().join('')
        }
    },
    mutations: {
        // payload是调用mutation时候传递的额外参数 可以是对象
        increate(state, payload){
            state.count += payload
        }
    },
    actions: {
        
    },
    modules: {
        
    }
})
```



```vue
<template>
	<div>
        count: {{ num }} <br/>
        msg: {{ message }} <br/>
        reverseMsg: {{ $store.getters.reverseMsg }}
        reverseMsg: {{ reverseMsg }}
        
        <button @click="$store.commit('increate', 2)">mutation</button>
        <!-- 每次点击 count 就会加2 -->
        <button @click="increate(2)">mutation</button>
        
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
    computed: {
        mapState(['count', 'msg']){
            ...mapState({ num: 'count', message: 'msg' })
            ...mapGetters(['reverseMsg'])
        }
    },
    methods: {
        ...mapMutations(['increate']) // 它的作用是把this.increate方法映射为$store.commit()
    }
}
</script>
```

所有的状态必须要通过 mutation，这么做的目的是可以在 devtools 中方便调试。需要注意：不要在 mutation 中执行异步操作修改 state，否则的话调试工具无法正确观测到状态的变化。如果想要执行异步操作，需要使用 action。



------

### Action

在action 中可以执行异步操作，当异步操作结束后，如果需要更改状态，需要通过提交 mutation 来修改 state ，因为所有的状态更改都要通过 mutation。

```js
// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex) // 注册插件
export default new Vuex.Store({
    state:{
        count: 0,
        msg: 'hello vuex'
    },
    getters: {
        reverseMsg (state){
            return state.msg.split('').reverse().join('')
        }
    },
    mutations: {
        increate(state, payload){
            state.count += payload
        }
    },
    actions: {
        increateAsync (context, payload){
            setTimeout(() => {
                // context 是上下文（感觉就是操作mutation）
                context.commit('increate', payload) // 提交mutation 更改count 的值
            }, 2000)
        }
    },
    modules: {
        
    }
})
```

注意，action 的调用要通过 dispatch，即跟 mutation 要通过 commit 调用一样。

老规矩，依然是优化一下模板中的调用。

```vue
<template>
	<div>
        count: {{ num }} <br/>
        msg: {{ message }} <br/>
        reverseMsg: {{ $store.getters.reverseMsg }}
        reverseMsg: {{ reverseMsg }}
        
        <button @click="$store.commit('increate', 2)">mutation</button>
        <!-- 每次点击 count 就会加2 -->
        <button @click="increate(2)">mutation</button>
        
        <button @click="$store.dispatch('increateAsync', 5)">action</button>
        <!-- 写上action名 和每次添加多少 -->
        <button @click="increateAsync(5)">action</button>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    computed: {
        mapState(['count', 'msg']){
            ...mapState({ num: 'count', message: 'msg' })
            ...mapGetters(['reverseMsg'])
        }
    },
    methods: {
        ...mapMutations(['increate']), // 它的作用是把this.increate方法映射为$store.commit()
        ...mapActions(['increateAsync']) // 它的作用是把this.increateAsync方法映射为this.$store.dispatch('')
    }
}
</script>
```





------



### Module

可以让我们把单一状态树拆分成多个模块，每个模块都可以拥有自己的 state、mutation、action、getters 甚至嵌套子模块，当状态非常多的时候，此时就非常有用。

```js
// store/modules/products.js
const state = {
    products: [
        { id: 1, title: 'iphone11', price: 8000 },
        { id: 1, title: 'iphone12', price: 10000 }
    ]
}
const getters = {}
const mutations = {
    setProducts (state, payload) {
        state.products = payload
    }
}
const actions = {}
export default {
    namespaced: true, // 开启命名空间
    state,
    getters,
    mutations,
    actions
}
```

```js
// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

import products from './modules/products'
import cart from './modules/cart'

Vue.use(Vuex) // 注册插件
export default new Vuex.Store({
    state:{
        count: 0,
        msg: 'hello vuex'
    },
    getters: {
        reverseMsg (state){
            return state.msg.split('').reverse().join('')
        }
    },
    mutations: {
        increate(state, payload){
            state.count += payload
        }
    },
    actions: {
        increateAsync (context, payload){
            setTimeout(() => {
                context.commit('increate', payload) // 提交mutation 更改count 的值
            }, 2000)
        }
    },
    modules: {
        products,
        cart
        // 这个时候会把模块中的状态挂载到store.state中。可以通过store.state.products访问到products模块中的成员 等
    }
})
```

当开启命名空间之后，再使用 map 函数的时候，会更清晰。下面就可以直接 通过 products 展现数据。

```vue
<template>
	<div>
        count: {{ num }} <br/>
        msg: {{ message }} <br/>
        reverseMsg: {{ $store.getters.reverseMsg }}
        reverseMsg: {{ reverseMsg }}
        
        <button @click="$store.commit('increate', 2)">mutation</button>
        <!-- 每次点击 count 就会加2 -->
        <button @click="increate(2)">mutation</button>
        
        <button @click="$store.dispatch('increateAsync', 5)">action</button>
        <!-- 写上action名 和每次添加多少 -->
        <button @click="increateAsync(5)">action</button>
        
        products: {{$store.state.products.products}}
        <button @click="$store.commit('setProducts', [])">m</button> <!-- 把products数组设置为空数组 -->
        
        products: {{ products }}
        <button @click="setProducts([])">m</button> <!-- 把products数组设置为空数组 -->
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    computed: {
        mapState(['count', 'msg']){
            ...mapState({ num: 'count', message: 'msg' })
            ...mapGetters(['reverseMsg']),
            ...mapState('products', ['products']) // 第一个是命名空间的名字 在modules中写的模块的名字
            // 第二个参数依旧是数组或对象，是我们映射的属性。
        }
    },
    methods: {
        ...mapMutations(['increate']), // 它的作用是把this.increate方法映射为$store.commit()
        ...mapActions(['increateAsync']) // 它的作用是把this.increateAsync方法映射为this.$store.dispatch('')
        ...mapMutations('products', ['setProducts'])
    }
}
</script>
```

有了模块，我们可以把单一状态树划分成多个模块，方便管理状态。



------



### Vuex 严格模式

所以状态变更必须通过mutation，但这仅仅是约定，你想的话还是可以通过 this.$store.state.msg 进行修改，语法层面没问题，但破坏了 vuex 约定，devtools 无法跟踪到状态的修改。开启严格模式，如果你直接改就会报错

也就是 `strict: true`而已。严格模式会深度检查状态树，来检查不合规的状态改变，会影响性能。可以在开发环境启用严格，在生产环境关闭严格模式。

改成：`strict: process.env.NODE_ENV !== 'production'`就行



------

## 购物车案例（也可以直接看这里）

获取到数据之后，把结果存储到 state中，我们需要提交 mutation，我们直接直接调用 commit。

```js
// products.js
import axios from 'axios'
const state = {
    products: []
}
const getters = {}
const mutations = {
    setProducts (state, payload) {
        state.products = payload
    }
}
// 请求接口获取数据，异步获取数据
const actions = {
    // 它里面需要两个参数，第一个是context上下文，第二个是payload。
    // 我们可以直接把context中需要的内容给它解构出来，我们这只需要commit方法
    // 给这个方法加async，然后调用axios发生请求。我们把请求后的结果解构出来。
    getProducts ({ commit }) {
        const { data } = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:3000/products'
        })
        commit('setProducts', data)
    }
}
```



```vue
<!-- products.vue -->
<script>
import { mapState, mapActions } from 'vuex'
export default {
    computed: {
        // 1、命名空间 2、我们要映射过来的属性
        ...mapState('products', ['products'])
    },
    methods: {
        ...mapActions('products', ['getProducts'])
        // 1、命名空间 2、是我们要映射的action的名字
    },
    created () {
        this.getProducts() // 当组件创建完毕后，调用getProducts发送请求，获取商品数据。
    }
}
</script>
```



再加一个案例：

```vue
<template>
    <div>
        <p>mapState {{ username }}</p>
        <p>mapGetters {{ reverseUser }}</p>
        <button @click="changeFn('hhhhh')">mapMutations</button>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['username']),
    ...mapGetters(['reverseUser'])
  },
  methods: {
    ...mapMutations(['changeFn'])
  }
}
</script>
```





### 补充（vuex的插件）

- Vuex 的插件就是一个函数
- 这个函数接收一个 store 参数

在这个函数里面，我们可以注册一个函数，让他可以在 所有的 mutation 结束之后再执行！！

Vuex 插件的使用

```js
const myPlugin = store => {
    // 当 store 初始化后调用
    store.subscribe((mutation, state) => {
        // 每次mutation之后调用
        // mutation 的格式为 { type, payload }
    })
}
```

```js
// 插件应该在创建store之前来创建
const store = new Vuex.Store({
    plugins: [myPlugin]
})
```







