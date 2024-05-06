let currentStep = 1
const form = document.querySelector('.app-container')
const btnConfirm = document.getElementById('button-confirm')
const btnNextStep = document.getElementById('button-next-step')
const btnGoBack = document.getElementById('button-go-back')
const stepButtons = document.querySelectorAll('.button-step')
const plans = document.querySelectorAll('.plan-item')
const billing = document.getElementById('billing')
const btnChangePlan = document.getElementById('button-change-plan')

const showStep = (stepNumber) => {
    const steps = document.querySelectorAll('.step')
    currentStep = parseInt(stepNumber)

    steps.forEach(step => {
        if (step.id !== `step-${currentStep}`)
            step.classList.add('hidden')
        else
            step.classList.remove('hidden')
    })

    if (currentStep == 1)
        btnGoBack.classList.add('invisible')
    else
        btnGoBack.classList.remove('invisible')

    if (currentStep == 4) {
        btnNextStep.classList.add('hidden')
        btnConfirm.classList.remove('hidden')
    } else {
        btnNextStep.classList.remove('hidden')
        btnConfirm.classList.add('hidden')
    }
}

const handleStep = (event) => {
    event.preventDefault()

    stepButtons.forEach(stepButton => {
        stepButton.dataset.stepActive = 'false'
    })

    event.target.dataset.stepActive = 'true'

    showStep(event.target.value)
}

const handleNextStep = (event) => {
    event.preventDefault()

    if (currentStep >= 1 && currentStep < 4) {
        currentStep++
        stepButtons.forEach(button => {
            if (button.value == currentStep) {
                button.dispatchEvent(new Event('click'))
                return
            }
        })
    }
}

const handleGoBack = (event) => {
    event.preventDefault()

    if (currentStep > 1 && currentStep <= 4) {
        currentStep--
        stepButtons.forEach(button => {
            if (button.value == currentStep) {
                button.dispatchEvent(new Event('click'))
                return
            }
        })
    }
}

const handleSelectedPlan = (event) => {
    event.preventDefault()

    plans.forEach(plan => {
        plan.dataset.planSelected = 'false'
    })

    event.currentTarget.dataset.planSelected = 'true'
}

const handleBilling = (event) => {
    event.preventDefault()

    console.log(event.currentTarget.checked)
}

const handleChangePlan = (event) => {
    event.preventDefault()

    console.log(event.currentTarget)
}

const handleSubmit = (event) => {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.currentTarget))
    console.log(data)
}

form.addEventListener('submit', handleSubmit)

btnNextStep.addEventListener('click', handleNextStep)

btnGoBack.addEventListener('click', handleGoBack)

stepButtons.forEach(stepButton => {
    stepButton.addEventListener('click', handleStep)
})

plans.forEach(plan => {
    plan.addEventListener('click', handleSelectedPlan)
})

billing.addEventListener('change', handleBilling)

btnChangePlan.addEventListener('click', handleChangePlan)
