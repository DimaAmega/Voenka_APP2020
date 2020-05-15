import { timer } from "../Custom_Modules/timer";

class Controller {
  constructor(objectStateManager) {
    this.m_timer = new timer();
    this.m_objectStateManager = objectStateManager;
  }
  callback(result){
    console.log("Controller CB", result);
  }
}
export {Controller}