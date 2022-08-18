

const grid = document.querySelector('#grid')
const settings = document.querySelector('#settings')

// To be able to change the how we want to color the boxes, I created
// three boolean variables. The makeRandomColorDarker keeps track of how
// much the random color has to get darker.

let wantDefault = true
let wantRainbow = false
let wantRandomColor = false
let makeRandomColorDarker = 0

// These are the sliders and buttons that allows the user to change the
// way they want to color the boxes and the grid's size

let rangeLabel = document.createElement('label')
		rangeLabel.textContent = 'Grid Size'
		rangeLabel.setAttribute('for', 'rangeSize')

let rangeSize = document.createElement('input')
		rangeSize.setAttribute('id', 'rangeSize')
		rangeSize.type = 'range'
		rangeSize.min = 1
		rangeSize.max = 100
		rangeSize.value = 16
		rangeSize.addEventListener('change', () => {
			resetGrid()
			createGrid(rangeSize.value)
		})

let buttonDefault = document.createElement('button')
		buttonDefault.classList.add('isInvisible')
		buttonDefault.textContent = 'Default Color'
		buttonDefault.addEventListener('click', () => {
			if (wantDefault == false) {
				wantDefault = true
			}
			
			if (wantRainbow == true) {
				wantRainbow = false
			}
			
			if (wantRandomColor == true) {
				wantRandomColor = false
			}
			
			buttonDefault.classList.add('isInvisible')
		})
		
let buttonRainbow = document.createElement('button')
		buttonRainbow.textContent = 'Rainbow Color'
		buttonRainbow.addEventListener('click', () => {
			if (wantRainbow == false) {
				wantRainbow = true
			} else {
				wantRainbow = false
			}
			
			if (wantRandomColor == true) {
				wantRandomColor = false
			}
			
			buttonRainbow.classList.add('isInvisible')
		})
		
let buttonRandom = document.createElement('button')
		buttonRandom.textContent = 'Darker Color'
		buttonRandom.addEventListener('click', () => {
			if (wantRandomColor == false) {
				wantRandomColor = true
			} else {
				wantRandomColor = false
			}
			
			if (wantRainbow == true) {
				wantRainbow = false
			}
			
			buttonRandom.classList.add('isInvisible')
		})
		
let buttonReset = document.createElement('button')
		buttonReset.setAttribute('id', 'resetBtn')
		buttonReset.textContent = 'Reset'
		buttonReset.addEventListener('click', () => {
			resetGrid()
			createGrid(16)
		})
				
let settingsElements = [rangeLabel, rangeSize, buttonDefault, buttonRainbow, buttonRandom, buttonReset]
		settingsElements.forEach((el) => settings.appendChild(el))

// This function creates a new grid and changes the grid settings via
// CSS variables.

function createGrid(num) {	
	let gridSize = num * num
	
	for (let index = 0; index < gridSize; index++) {
		let gridBox = document.createElement('div')
				gridBox.classList.add('grid-box')
				
		grid.appendChild(gridBox)
	}
	
	document.documentElement.style.setProperty('--grid-box-number', num)
	addBoxEventListeners()
}

// This function resets the grid by removing everysingle one of the
// already present grid boxes.

function resetGrid() {
	while (grid.firstChild) {
		grid.removeChild(grid.lastChild)
	}
}

// This function adds a mouseover eventlistener to the grid boxes.
// Every time the grid gets generated anew, they need to be reinserted.

function addBoxEventListeners() {
	let gridBoxes = grid.querySelectorAll('.grid-box')
				gridBoxes.forEach((box) => {
					box.addEventListener('mouseover', () => {
						addColor(box)
					})
				})
}

// This function allows us to choose how to color the boxes.

function addColor(el) {
	if (wantRainbow == false && wantRandomColor == false && wantDefault == true) {
		el.style.backgroundColor = '#000000'
		buttonRainbow.classList.remove('isInvisible')
		buttonRandom.classList.remove('isInvisible')
	} else if (wantRainbow == true) {
		wantRandomColor = false
		wantDefault = false
		el.style.backgroundColor = `#${getRandomRainbowColor()}`
		buttonDefault.classList.remove('isInvisible')
		buttonRandom.classList.remove('isInvisible')
	} else if (wantRandomColor == true) {
		wantRainbow = false
		wantDefault = false
		el.style.backgroundColor = `hsl(${getRandomColor()})`
		console.log(`hsl(${getRandomColor()})`)
		buttonDefault.classList.remove('isInvisible')
		buttonRainbow.classList.remove('isInvisible')
	}
}

// This function generate a random rainbow color from a given array.

function getRandomRainbowColor() {
	const rainbowColors = ['9400D3', '4B0082', '0000FF', '00FF00', 'FFFF00', 'FF7F00', 'FF0000']
	return rainbowColors[Math.floor(Math.random() * rainbowColors.length)]
}

// This function generate a random value for generating a random hsl
// color.

function getRandomValue(value) {
	return Math.floor(Math.random() * value)
}

// This function generate a random hsl color and makes it darker every
// single time the mouse moves over a box in the grid.

function getRandomColor() {
	let hue = `${getRandomValue(360)}deg`
	let saturation = `${getRandomValue(100)}%`
	let lightness = `${makeRandomColorDarker}%`
	
	if (makeRandomColorDarker < 100) {
		makeRandomColorDarker += 10
	} else if (makeRandomColorDarker >= 100) {
		makeRandomColorDarker = 0
	}
	
	return `${hue} ${saturation} ${lightness}`
}


createGrid(16)
