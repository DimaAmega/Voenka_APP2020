import { timer } from "../Custom_Modules/timer";
let LEARNING = "learning";
let EXAM = "exam";

class Controller {
  constructor(objectStateManager) {
    this.m_timer = new timer();
    this.m_objectStateManager = objectStateManager;
    this.mode;
    this.finalStates;
    this.timeMarks;
    this.toolTips;
    this.currentMarkState;
  }
  launch(mode, finalStates, timeMarks, toolTips) {
    console.log("launch controller");
    this.m_timer.resetTimer();
    this.m_timer.stopTimer();
    tips.hide();
    if (mode === LEARNING) this.mode = LEARNING;
    if (mode === EXAM) this.mode = EXAM;
    this.finalStates = finalStates;
    if (!this.mode || !this.finalStates)
      throw `mode - ${this.mode}, finalStates - ${this.finalStates}`;
    if (this.mode === EXAM) {
      this.timeMarks = timeMarks;
      console.log(this.timeMarks);
      this.m_timer.startTimer();
    }
    if (this.mode === LEARNING){
      this.toolTips = toolTips;
      tips.setText(this.toolTips[this.m_objectStateManager.currentStateNumber]);
      this.currentMarkState = this.m_objectStateManager.currentStateNumber;
    }
  }
  getMark(time) {
    if (time <= this.timeMarks[0]) return 5;
    if (time <= this.timeMarks[1]) return 4;
    if (time <= this.timeMarks[2]) return 3;
    return 2;
  }
  callback(result) {
    console.log("Controller CB", result);
    switch (this.mode) {
      case EXAM:
        if (result === false){ 
          mw.setText(`<h3>ВЫ ДОПУСТИЛИ ОШИБКУ <br>
                      <h4>ВАША ОЦЕНКА 2
                      </h3>`).show();
          this.m_timer.stopTimer();
        }
        break;
      case LEARNING:
        if (result === true &&
           this.toolTips[this.m_objectStateManager.currentStateNumber] &&
           this.currentMarkState !== this.m_objectStateManager.currentStateNumber) {
          tips.setText(this.toolTips[this.m_objectStateManager.currentStateNumber]);
          this.currentMarkState = this.m_objectStateManager.currentStateNumber
        }
        if (result === false ) {
          tips.setText("<h3>НЕВЕРНОЕ ДЕЙСТВИЕ</h3>");
          setTimeout(()=>tips.setText(this.toolTips[this.currentMarkState]),2000)
        }
        break;

      default:
        throw "we dont have this mode in controller";
    }
    if (this.finalStates.includes(this.m_objectStateManager.currentStateNumber)) 
      switch (this.mode) {
        case EXAM:
          let time = this.m_timer.stopTimer();
          mw.setText(`<h3>РЕЖИМ ПРОЙДЕН<h3>
          <h4>ВАША ОЦЕНКА ${this.getMark(time)} </br>
            ВРЕМЯ ВЫПОЛНЕНИЯ ЗАДАНИЯ ${time} c.
          </h4>`).show();
          break;
        case LEARNING:
          mw.setText(`<h3>РЕЖИМ ОБУЧЕНИЯ ПРОЙДЕН<h3>`).show();
          break;
        default:
          break;
      }
  }
}
export { Controller };
