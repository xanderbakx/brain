const net = new brain.NeuralNetwork({
  hiddenLayers: [3]
})

let data = [{"input":{"temp":0.54},"output":{"jacket":1,"tshirt":0}},{"input":{"temp":"0.28"},"output":{"jacket":1,"tshirt":0}},{"input":{"temp":"0.14"},"output":{"jacket":1,"tshirt":0}},{"input":{"temp":"0.67"},"output":{"tshirt":1,"jacket":0}},{"input":{"temp":"0.78"},"output":{"tshirt":1,"jacket":0}},{"input":{"temp":"0.60"},"output":{"tshirt":1,"jacket":0}},{"input":{"temp":"0.07"},"output":{"jacket":1,"tshirt":0}}]

net.train(data)

const diagram = document.getElementById('diagram')
diagram.innerHTML = brain.utilities.toSVG(net)

const temp = document.getElementById('temp')
const clothing = document.getElementById('clothing')
const jacketButton = document.getElementById('jacket')
const tshirtButton = document.getElementById('tshirt')
const certainty = document.getElementById('certainty')

jacketButton.addEventListener('click', () => {
  helpGuesser({"jacket": 1, "tshirt": 0})
})

tshirtButton.addEventListener('click', () => {
  helpGuesser({"tshirt": 1, "jacket": 0})
})

function helpGuesser(val) {
  data.push({
    input: temperature,
    output: val
  })
  randomTemp()
}

let temperature
function randomTemp() {
  temperature = {temp: Math.random().toFixed(2)}
  const guess = net.run(temperature)
  console.log('guess', guess)
  let img
  if (guess.tshirt < guess.jacket) {
    img = './jacket.jpg'
  } else {
    img = './tshirt.jpg'
  }
  clothing.src = img
  temp.innerText = `Current Temperature: ${temperature.temp * 100}`
  certainty.innerText = `Jacket: ${(guess.jacket*100).toFixed(2)}% --- Tshirt: ${(guess.tshirt*100).toFixed(2)}%`
  console.log('------------------------------')
  console.log(JSON.stringify(data))
  console.log('------------------------------')
}

randomTemp()