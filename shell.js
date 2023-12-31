// ----------
// author: https://github.com/au3nh3
// last modify: 2023/12/31 19:15
// ----------

const outputs = document.querySelector('#outputs')
const form_cmd = document.querySelector('#form_cmd')
const  prompt = document.querySelector('#prompt')
const  input = document.querySelector('#input')

var MAX_CMD_NUM = 5
var MAX_HIST_NUM = 8
var prompt_str = 'test@cmd$ '
//var cmd_in = document.createElement('span')
var prompt_span = '<span class="prompt">' + prompt_str + '</span>'
var prompt_div = '<div class="prompt">' + prompt_str + '</div>'
var banner_str = ' <div>Welcome! This is a testing page</div>'
var nav_str = " <div>go to <a href='/index.html'>home</a></div>"
var ncmd = 0
var hist_cmd = []
var hist_index = 0   

prompt.innerHTML = prompt_str
outputs.innerHTML = banner_str + nav_str

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
	let cmd = input.value.trim()
	hist_index = hist_cmd.length
	let div_in  = document.createElement('div')
	div_in.innerHTML = prompt_span + input.value
	if (ncmd >= MAX_CMD_NUM) {
		outputs.innerHTML = nav_str
		ncmd = 0
	}
	outputs.appendChild(div_in)
	if (!cmd) {
		ncmd += 0.5
		console.log(ncmd)
		return
	}
	if (cmd != hist_cmd[hist_index-1]) {
		if (hist_index >= MAX_HIST_NUM) {
		hist_cmd.shift()
		hist_index--
		}
		hist_cmd[hist_index++] = cmd
	}
	let res = ''
	if (cmd == 'clear' || cmd == 'cls') {
		outputs.innerHTML = nav_str
		ncmd = 0
	}
	else if (cmd == 'hist') {
		for (index in hist_cmd) {
		  res += index + '\t\t' + hist_cmd[index] + '\n'
		}
	}
	else {
		res = request_cmd(cmd)
	}
	let div_out = document.createElement('div')
	div_out.setAttribute("class", "out")
	div_out.innerHTML = res
	outputs.appendChild(div_out)
	input.value = ''
	ncmd++
	console.log(ncmd)
})
