const on = (function () {
  if (!Vue.prototype.$isServer && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();


import Vue from 'vue';

// 所有绑定了clickoutside指令的元素的dom对象数组
const nodeList = [];
// 用来做存放于dom对象中clickoutside相关参数对象的key
const ctx = '@@clickoutsideContext';

let startClick;
let seed = 0;
// 鼠标按下时，记录此时事件信息
!Vue.prototype.$isServer && on(document, 'mousedown', e => (startClick = e));
// 鼠标松开时候，遍历绑定clickoutside的节点，进行判断是否在节点外部以触发回调
!Vue.prototype.$isServer && on(document, 'mouseup', e => {
  nodeList.forEach(node => {
    node[ctx].documentHandler(e, startClick)
  });
});

// 是否在特殊限定范围内
function ifInExact (exactElms, target1, taget2) {
  for (let i = 0; i < exactElms.length; i++) {
    let elm = exactElms[i];
    if (elm.contains(target1) || elm.contains(taget2) || elm === target1) return true
  }
  return false
}

// 是否有特殊限定范围
function ifHasExact (el, exactArea) {
  if (!exactArea) return false;
  return el.getElementsByClassName(exactArea)
}

function createDocumentHandler(el, binding, vnode) {
  return function (mouseup = {}, mousedown = {}) {
    if (!vnode ||
      !vnode.context ||
      !mouseup.target ||
      !mousedown.target ||
      (vnode.context.popperElm &&
        (vnode.context.popperElm.contains(mouseup.target) ||
          vnode.context.popperElm.contains(mousedown.target)))) return;
    let exactElms = ifHasExact(el, el[ctx].exactArea);
    // 如果是有特殊限定范围的，则进行判断当前点击是否在 限定范围内
    if (exactElms) {
      if (ifInExact(exactElms, mouseup.target, mousedown.target)) {
        return
      }
      // 无特殊限定范围，则判断点击是否在默认的指令所在范围内
    }
    else if (el.contains(mouseup.target) || el.contains(mousedown.target) || el === mouseup.target) {
      return
    }
    if (binding.expression &&
      el[ctx].methodName &&
      vnode.context[el[ctx].methodName]) {
      vnode.context[el[ctx].methodName]()
    } else {
      el[ctx].bindingFn && el[ctx].bindingFn()
    }
  }
}

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose">
 * ```
 */
export default {
  /**
   *指令的钩子函数
   *
   bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

   inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

   update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。
   但是你可以通过比较更新前后的值来忽略不必要的模板更新。

   componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。

   unbind：只调用一次，指令与元素解绑时调用。
   */
  bind(el, binding, vnode) {
    /**
     * 指令钩子函数会被传入以下参数：

     el：指令所绑定的元素，可以用来直接操作 DOM 。
     binding：一个对象，包含以下属性：
         name：指令名，不包括 v- 前缀。
         value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
         oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
         expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
         arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
         modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。

     vnode：Vue 编译生成的虚拟节点。
     oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
     */
    nodeList.push(el);
    const id = seed++;
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value,
      // 特殊限定范围的class，限定范围为该class的所有元素的并集
      exactArea: binding.arg
    };
  },

  update(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
    el[ctx].methodName = binding.expression;
    el[ctx].bindingFn = binding.value;
    // 附加 真正起作用部分
    el[ctx].exactArea = binding.arg
  },

  unbind(el) {
    let len = nodeList.length;

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    delete el[ctx];
  }
  /**
   *用法升级（点击A和B的外部才触发，点击A和B不触发）在A和B上添加相同类，在父级元素绑定指令，并加上相同类
   <div style="width:700px;height:700px;border:solid;" v-clickoutside:exactAreaClassName="handleClose">
       <div style="width:300px;height:300px;background:red;margin:20px;" class="exactAreaClassName">A</div>
       <div style="width:300px;height:300px;background:red;margin:20px;" class="exactAreaClassName">B</div>
   </div>
   */
};
