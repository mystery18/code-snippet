// 看完下面的例子（分别是promise 和 async/await）
// 1、promise是一种异步编程的解决方案，我理解是：解决以前ajax回调嵌套过深的问题，可以使用链式调用的方法执行异步操作
// 2、async/await 是 promise 的一种语法糖，看起来写的就是同步的代码 来执行异步的操作

// promise
function pms() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('good')
		}, 5000)
	})
}
pms().then((val) => {
	setTimeout(() => {
		console.log(val)
	}, 1000)
})

// --------------------------- async/await
function fn1() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('fn1')
		}, 2000)
	})

}

function fn2(str) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(str)
		}, 1000)
	})
}

async function loadPage() {
	// 一旦遇到 await 就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句
	const res1 = await fn1() // await后面接一个会return new promise的函数并执行它
	const res2 = await fn2(res1)
	console.log(res2)
}
loadPage()

// 注意点:
// await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。
// await 命令只能用在 async 函数之中，如果用在普通函数，就会报错。
// async/await 给我们带来的最重要的好处是同步编程风格。
