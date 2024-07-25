// ----------
// author: https://github.com/au3nh3
// version:
// last modify:
// ----------

const outputs = document.querySelector('#outputs')
const form_cmd = document.querySelector('#form_cmd')
const  prompt = document.querySelector('#prompt')
const  input = document.querySelector('#input')

var author = "https://github.com/au3nh3/web-terminal"
var MAX_HIST_NUM = 20
var prompt_str = 'test@cmd$ '
//var cmd_in = document.createElement('span')
var prompt_span = '<span class="prompt">' + prompt_str + '</span>'
var prompt_div = '<div class="prompt">' + prompt_str + '</div>'
var banner_str = ' <div>Welcome! This is a testing page</div>'
var nav_str = " <div>go to <a href='/index.html'>home</a></div>"
var hist_cmd = []
var hist_index = 0
var MAX_SCREEN_BUFF = window.innerHeight * 2

prompt.innerHTML = prompt_str
outputs.innerHTML = banner_str + nav_str
console.log('visit', author, 'for help')

input.focus()
document.addEventListener('click', (event)=>{
	if (event.target.tagName == 'HTML' || event.target.id == 'footer-blank') {
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

/*
function request_cmd(cmd) {
	fetch('api.php')
	//res = 'your input cmd is: ' + cmd + '\nsuccess'
	//return res
}
*/
form_cmd.addEventListener('submit', (event)=>{
	event.preventDefault()
	let cmd = input.value.trim()
	hist_index = hist_cmd.length
	if (document.body.clientHeight >= MAX_SCREEN_BUFF) {
		outputs.innerHTML = nav_str
		if (!cmd) {return}
	}
	let div_in  = document.createElement('div')
	div_in.innerHTML = prompt_span + input.value
	outputs.appendChild(div_in)
	if (!cmd) {
		scrollTo(0, MAX_SCREEN_BUFF)
		return
	}
	if (cmd != hist_cmd[hist_index-1]) {
		if (hist_index >= MAX_HIST_NUM) {
		hist_cmd.shift()
		hist_index--
		}
		hist_cmd[hist_index++] = cmd
	}

	if (cmd == 'clear' || cmd == 'cls') {
		outputs.innerHTML = nav_str
		input.value = ''
		return
	}
	
	//
	let div_out = document.createElement('div')
	div_out.setAttribute("class", "out")
	outputs.appendChild(div_out)
	if (cmd == 'hist') {
		let res = ''
		for (index in hist_cmd) {
		  res += index + '\t\t' + hist_cmd[index] + '\n'
		}
		div_out.innerHTML = res
	}
	else {
		//res = request_cmd(cmd)
		//let data = new FormData(form_cmd)
		let data = new FormData()
		data.append('cmd', cmd)
		fetch('api.php', {method: 'post', body: data})
			.then(res => res.text())
			.then(text => {div_out.innerHTML = text})
		div_out.innerHTML = "running..."
	}
	
	input.value = ''
	scrollTo(0, MAX_SCREEN_BUFF)
	//input.focus()
	//console.log(ncmd)
})
