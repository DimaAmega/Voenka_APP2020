import { timer } from "./timer";

class Controller {
  constructor(SM) {
    this.SM = SM;
    this.mode;
    this.mark;
    this.finalStates;
    this.loseCount;
    this.timer = new timer();
  }
  setMode(mode) {
    this.mode = mode;
  }
  isInitialization() {
    return this.mode != undefined && this.SM != undefined;
  }
  launch(startStateNumber, transitions, finalStates) {
    if (!this.isInitialization()) {
      console.log("DONT HAVE MODE CONTROLLER OR STATE MANAGER");
      return false;
    }
    this.finalStates = finalStates;
    this.SM.transitions = transitions;
    this.SM.changeCurrentState(startStateNumber);

    switch (this.mode) {
      case "training":
        console.log("START TRAINING MODE");
        // SHOW WELCOME DIALOG WINDOW1, SHOW FIRST TIP
        break;
      case "exam":
        console.log("START EXAM MODE");
        // SHOW WELCOME DIALOG WINDOW2
        // START TIMER 
        break;
      default:
        console.log("NOT AVAILABEL MODE");
        return false;
    }
    return true;
  }
  transition(localName, localState) {
    if (this.SM.transition(localName, localState)) { /****WE CAN AND MOVE IN NEW STATE, RIGHT ACT****/
      switch (this.mode) {
        case "training":
          // SHOW DIALOG WITH " RIGHT, YOU ARE LUCKY SUN OF THE BITCH!", CHECK THAT WE WENT IN TO LAST STATE, SHOW NEXT TIP
          break;
        case "exam":
          // CHECK THAT WE WENT IN TO LAST STATE, IF WE DID, SHOW DIALOG WITH MARK AND TIME
          break;
        default:
          console.log("NOT AVAILABEL MODE");
          return false;
      }
    } else {                                        /****WE CAN'T MOVE IN NEW STATE, WRONG ACT****/
      switch (this.mode) {
        case "training":
          // SHOW DIALOG WITH " WRONG, BUT YOU CAN BETTER! (NO LOSER!) "
          break;
        case "exam":
          // INCREMENT LOSE COUNT, CHECK THAT WE CAN CONTINUE
          break;
        default:
          console.log("NOT AVAILABEL MODE");
          return ;
      }
    }
  }
}
export { Controller };
