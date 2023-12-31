// ----------
// author: https://github.com/au3nh3
// ----------

const outputs = document.querySelector('#outputs')
const form_cmd = document.querySelector('#form_cmd')
const  prompt = document.querySelector('#prompt')
const  input = document.querySelector('#input')

var MAX_CMD_NUM = 15
var MAX_HIST_NUM = 20
var prompt_str = 'test@cmd$ '
//var cmd_in = document.createElement('span')
var prompt_span = '<span class="prompt">' + prompt_str + '</span>'
var banner_str = ' <div>Welcome! This is a testing page</div>'
var nav_str = " <div>go to <a href='/index.html'>home</a></div>"
var ncmd = 0
var hist_cmd = []
var hist_index = 0   

//form_cmd.prepend(prompt_span)
prompt.innerHTML = prompt_str
//form_cmd.innerHTML = prompt_span
outputs.innerHTML = banner_str + nav_str
//label_prompt.innerHTML = prompt_str

input.focus()
document.addEventListener('click', (event)=>{
  event_element = event.target.tagName
  if (event_element == 'HTML') {
	input.focus()
  }
  //console.log(event.target.tagName)
})

var curr_input = ''
input.addEventListener('keyup', (event)=>{
  let key = event.key
  //let curr_input = input.value
  if (key == 'ArrowUp') {
	//if (hist_index == hist_cmd.length) {
	//  curr_input = input.value
	//}
	if (hist_index > 0) {
	  input.value = hist_cmd[--hist_index]
	}
  }
  else if (key == 'ArrowDown') {
	if (hist_index == hist_cmd.length-1 && input.value){
	  input.value = curr_input
	  hist_index++
	}
	else if (hist_index < hist_cmd.length-1) {
	  input.value = hist_cmd[++hist_index]
	}
  }
  //else {
  //  var curr_input = input.value
  //}
  //console.log(hist_index, hist_cmd.length, curr_input)
})

function request_cmd(cmd) {
  return 'your input cmd is: ' + cmd
}
form_cmd.addEventListener('submit', (event)=>{
  event.preventDefault()
  let cmd = form_cmd.input.value.trim()
  hist_index = hist_cmd.length
  if (cmd && cmd != hist_cmd[hist_index-1]) {
	if (hist_index >= MAX_HIST_NUM) {
	  hist_cmd.shift()
	  hist_index--
	}
	hist_cmd[hist_index++] = cmd
  }
  if (ncmd >= MAX_CMD_NUM) {
	outputs.innerHTML = ''
	ncmd = 0
	if (!cmd) {return}
  }
  let div_in  = document.createElement('div')
  let div_out = document.createElement('div')
  //div_out.setAttribute("class", "out")
  let res = ' '
  if (cmd) {
	res += request_cmd(cmd)
  }
  div_in.innerHTML = prompt_span + form_cmd.input.value
  outputs.appendChild(div_in)
  div_out.innerHTML = res
  outputs.appendChild(div_out)
  ncmd++
})
