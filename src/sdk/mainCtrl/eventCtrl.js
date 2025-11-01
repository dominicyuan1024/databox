import EventEmitter from "wolfy87-eventemitter";
export const eventCtrl = {};
const eventBus = new EventEmitter();
//内置事件注册列表
const eventList = {
  drawCtrl_complete: 0,
  drawCtrl_update: 0,
  creatLayer_complete: 0
};

//用户自定义地图事件
const userEventList = {};

const handleList = {};
/**
 * 监听事件
 * @param  eventName  String 要监听的事件名称
 * @param listener   function 监听器,事件触发时执行的方法,参数 res, 事件触发后的返回值
 * @returns  none
 */
eventCtrl.on = function(eventName, listener) {
  if (eventList[eventName]) {
    eventList[eventName] += 1;
  } else {
    if (!userEventList[eventName]) {
      userEventList[eventName] = 0;
    }
    userEventList[eventName] += 1;
  }
  eventBus.on(eventName, listener);
};
/**
 * 监听一次性事件
 * @param  eventName  String 要触发的事件名称
 * @param listener   function 监听器,事件触发时执行的方法,参数 res, 事件触发后的返回值。触发一次后失效
 * @returns  none
 */
eventCtrl.once = function(eventName, listener) {
  eventBus.once(eventName, listener);
};

/**
 * 触发事件
 * @param  eventName  String 要监听的事件名称
 * @param paramOBJ   Object 触发后的返回的结果 用key值标明内容
 * @returns  none
 */
eventCtrl.emit = function(eventName, paramOBJ) {
  eventBus.emit(eventName, paramOBJ);
};

/**
 * 移除监听
 * @param  eventName  String 要移除的事件名称
 * @param listener   function 要移除监听器
 * @returns  none
 */
eventCtrl.remove = function(eventName, listener) {
  eventBus.removeListener(eventName, listener);
};

/**
 * 获取用户自定义事件列表
 * @returns  object
 */
eventCtrl.getUserEventList = function() {
  return userEventList;
};

/**
 * 组件实例事件注册
 * @param  handleName  组件实例名称
 * @param handle 组件实例监听实例
 * @returns  none
 */
eventCtrl.addHandle = function(handleName, handle) {
  handleList[handleName] = handle;
};

/**
 * 组件实例事件移除
 * @param  handleName  组件实例名称
 * @returns  none
 */
eventCtrl.removeHandle = function(handleName) {
  handleList[handleName].remove();
  delete handleList[handleName];
};

/**
 * 组件实例事件列表获取
 * @returns  object
 */
eventCtrl.getHandleList = function() {
  return handleList;
};
