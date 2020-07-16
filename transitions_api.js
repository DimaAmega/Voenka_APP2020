let state = winFrame.SM.getStateByNumber('12f8v')
console.log(state)
state.ppo_button = 'Push'
state.lamp5 = 'Static'
console.log(winFrame.SM.getNumberByState(state))
state.TPK_small_very = "GoUp"
console.log(winFrame.SM.getNumberByState(state))
state.lamp4 = 'Emissive'
console.log(winFrame.SM.getNumberByState(state))
console.log(winFrame.SM.getNumberByState(state))
state.lamp4 = 'Emissive'
console.log(winFrame.SM.getNumberByState(state))