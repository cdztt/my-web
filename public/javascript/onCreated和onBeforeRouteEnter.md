# onCreated和onBeforeRouteEnter

onCreated和onBeforeRouteEnter在vue3的composition api里*不*存在。因为在setup的时候，就在执行这两个钩子。

> Note that the setup() hook of Composition API is called before any Options API hooks, even beforeCreate().来自[文档](https://vuejs.org/api/options-lifecycle.html#beforecreate)
