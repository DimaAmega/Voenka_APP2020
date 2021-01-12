let state = winFrame.SM.getStateByNumber('em7hu2')
// console.log(state)
// state.Radiostation = "Used"
// state.Cap_of_PPO = 'Open'
// state.ppo_button = 'Static'
state.B_start = 'Push'
state.CPClamp4 = 'Static'
// console.log(winFrame.SM.getNumberByState(state))
// state.Cap_of_PPO = 'Static'
// state.CpcAnvil = "Move4"
// state.Support1 = 'Static'
// state.Support2 = 'Static'
// state.Support3 = 'Static'
// state.Support4 = 'Static'
console.log(winFrame.SM.getNumberByState(state))
state.TPK_small_very = 'Static'
console.log(winFrame.SM.getNumberByState(state))
state.CPClamp2 = 'Emissive'
// state.CPClamp2 = 'Static'
// state.CPClamp4 = 'Emissive'
console.log(winFrame.SM.getNumberByState(state))

console.log(winFrame.SM.getNumberByState(state))
state.lamp4 = 'Emissive'
console.log(winFrame.SM.getNumberByState(state))