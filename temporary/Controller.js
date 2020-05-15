import { timer } from "../Custom_Modules/timer";
let LEARNING = 'learning'
let EXAM = 'exam'

class Controller {
  constructor(objectStateManager) {
    this.m_timer = new timer();
    this.m_objectStateManager = objectStateManager;
    this.mode;
    this.finalStates
  }
  launch(mode,finalStates) {
    console.log("launch controller");
    if (mode === LEARNING) this.mode = LEARNING;
    if (mode === EXAM) this.mode = EXAM;
    this.finalStates = finalStates;  
    if (!this.mode || !this.finalStates) throw `mode - ${this.mode}, finalStates - ${this.finalStates}`;
    this.m_timer.resetTimer();
    this.m_timer.startTimer();
  }
  callback(result){
    console.log("Controller CB", result);
    if (this.finalStates.includes(this.m_objectStateManager.currentStateNumber))
    alert(`End sequence with your time is ${this.m_timer.stopTimer()} seconds`)
  }
}
export {Controller}