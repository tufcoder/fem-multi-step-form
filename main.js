let step = 1
const form = document.querySelector('.app-container')
const btnConfirm = document.getElementById('button-confirm')
const btnNextStep = document.getElementById('button-next-step')
const btnGoBack = document.getElementById('button-go-back')

const handleNextStep = () => {
    if (step >= 1 && step < 4) step++
    console.log(step)
    return step
}

const handleGoBack = () => {
    if (step > 1 && step <= 4) step--
    console.log(step)
    return step
}

const handleSubmit = (event) => {
    event.preventDefault()
}

form.addEventListener('submit', handleSubmit)
btnNextStep.addEventListener('click', handleNextStep)
btnGoBack.addEventListener('click', handleGoBack)
