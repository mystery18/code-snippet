const images = document.querySelectorAll('img')

const callback = entries => {
  // console.log(entries)
  entries.forEach(entry => {
    // 可以拿到每个元素 里面有个属性是 是否进入可视区域
    if (entry.isIntersecting) {
      // 如果你进入了可视区域的话
      const image = entry.target // 获取这个目标元素
      const data_src = image.getAttribute('data-src') // 的属性
      image.setAttribute('src', data_src) // 赋值给真实src
      // 图片加载后取消观察，但不是取消监听滚动
      observer.unobserve(image)
      console.log('触发！')
    }
  })
}
const observer = new IntersectionObserver(callback)
images.forEach(image => {
  // 在每次循环的时候，使用observer实例中的observe方法来观察每一个image节点
  observer.observe(image)
})
