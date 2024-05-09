const form = document.querySelector('.app-container')
const btnConfirm = document.getElementById('button-confirm')
const btnNextStep = document.getElementById('button-next-step')
const btnGoBack = document.getElementById('button-go-back')
const stepButtons = document.querySelectorAll('.button-step')
const plans = document.querySelectorAll('.plan-item')
const billing = document.getElementById('billing')
const planItems = document.querySelectorAll('.plan-item-info')
const planArcadePrice = document.getElementById('plan-arcade-price')
const planAdvancedPrice = document.getElementById('plan-advanced-price')
const planProPrice = document.getElementById('plan-pro-price')
const onlineService = document.getElementById('online-service')
const largerStorage = document.getElementById('larger-storage')
const customProfile = document.getElementById('custom-profile')
const addOnInputs = document.querySelectorAll('.addon-item-input')
const dynamicPlanContainer = document.querySelector('.dynamic-plan-container')
const footerStep = document.querySelector('.footer-step')

let currentStep = 1

billing.checked = false
addOnInputs.forEach(addOn => addOn.checked = false)

const formData = {
    name: '',
    email: '',
    tel: '',
    plans: {
        arcade: false,
        advanced: false,
        pro: false,
    },
    billing: {
        monthly: true,
        yearly: false,
    },
    planValues: {
        arcade: {
            monthly: 9,
            yearly: 90
        },
        advanced: {
            monthly: 12,
            yearly: 120
        },
        pro: {
            monthly: 15,
            yearly: 150
        },
    },
    addons: [],
}

const resetAddOns = () => {
    addOnInputs.forEach(addOn => addOn.checked = false)
    formData.addons = []
}

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

    if (currentStep == 3) {
        const addonItem1 = document.getElementById('addon-item-online-service')
        const addonItem2 = document.getElementById('addon-item-larger-storage')
        const addonItem3 = document.getElementById('addon-item-custom-profile')

        if (formData.billing.yearly) {
            addonItem1.textContent = '+$10/yr'
            addonItem2.textContent = '+$20/yr'
            addonItem3.textContent = '+$20/yr'
        } else {
            addonItem1.textContent = '+$1/mo'
            addonItem2.textContent = '+$2/mo'
            addonItem3.textContent = '+$2/mo'
        }
    }

    if (currentStep == 4) {
        btnNextStep.classList.add('hidden')
        btnConfirm.classList.remove('hidden')

        let selectedPlan = ''
        let selectedPlanValue = ''
        let selectedBilling = ''

        for (const plan in formData.plans) {
            if (formData.plans[plan]) {
                selectedPlan = plan
            }
        }

        for (const bill in formData.billing) {
            if (formData.billing[bill]) {
                selectedBilling = bill
            }
        }

        selectedPlanValue = formData.planValues[selectedPlan][selectedBilling]

        dynamicPlanContainer.innerHTML = `
            <div class="plan-container">
                <div class="resume-plan-container">
                    <div>
                        <h3 id="selected-plan">
                            <span class="capitalize">${selectedPlan}</span>
                            <span class="capitalize"> (${selectedBilling})</span>
                        </h3>
                        <button id="button-change-plan">Change</button>
                    </div>
                    <span>$${selectedPlanValue}/${selectedBilling === 'yearly' ? 'yr' : 'mo'}</span>
                </div>
                <div class="resume-addons-container"></div>
            </div>

            <p class="total-resume"></p>
        `

        const btnChangePlan = document.getElementById('button-change-plan')
        btnChangePlan.addEventListener('click', handleChangePlan)

        let total = 0

        for (const addon of formData.addons) {
            const container = document.querySelector('.resume-addons-container')
            const p = document.createElement('p')

            let title = ''
            let plus = 0

            if (addon === 'online-service') {
                title = 'Online Service'
                plus = 1
            }
            else if (addon === 'larger-storage') {
                title = 'Larger Storage'
                plus = 2
            }
            else if (addon === 'custom-profile') {
                title = 'Customizable Profile'
                plus = 2
            }

            if (selectedBilling === 'yearly')
                plus *= 10

            total += plus

            p.innerHTML = `
                ${title}<span>+${plus}/${selectedBilling === 'yearly' ? 'yr' : 'mo'}</span>
            `
            container.appendChild(p)
        }

        total += parseInt(selectedPlanValue)

        const totalResume = document.querySelector('.total-resume')
        totalResume.innerHTML = `
            Total (per ${selectedBilling})
            <span>+${total}/${selectedBilling === 'yearly' ? 'yr' : 'mo'}</span>
        `
    } else {
        btnNextStep.classList.remove('hidden')
        btnConfirm.classList.add('hidden')
    }

    if (currentStep == 5) {
        footerStep.classList.add('hidden')
    }
}

const handleGoBack = (event) => {
    event.preventDefault()

    if (currentStep > 1 && currentStep <= 4) {
        currentStep -= 2

        stepButtons.forEach(stepButton => {
            stepButton.dataset.stepActive = 'false'
        })

        stepButtons[currentStep].dataset.stepActive = 'true'

        showStep(stepButtons[currentStep].getAttribute('value'))
    }
}

const handleSelectedPlan = (event) => {
    event.preventDefault()

    plans.forEach(plan => {
        plan.dataset.planSelected = 'false'
    })

    event.currentTarget.dataset.planSelected = 'true'

    for (const plan in formData.plans) {
        if (plan === event.currentTarget.id.split('-')[1])
            formData.plans[plan] = true
        else
            formData.plans[plan] = false
    }
}

const handleBilling = (event) => {
    event.preventDefault()

    resetAddOns()

    if (event.currentTarget.checked) {
        formData.billing.monthly = false
        formData.billing.yearly = true
        planItems.forEach(item => {
            item.children[2].style.display = 'inline-block'
        })
        planArcadePrice.textContent = '$90/yr'
        planAdvancedPrice.textContent = '$120/yr'
        planProPrice.textContent = '$150/yr'
    } else {
        formData.billing.monthly = true
        formData.billing.yearly = false
        planItems.forEach(item => {
            item.children[2].style.display = 'none'
        })
        planArcadePrice.textContent = '$9/mo'
        planAdvancedPrice.textContent = '$12/mo'
        planProPrice.textContent = '$15/mo'
    }
}

const handleAddOns = (event) => {
    if (event.currentTarget.checked) {
        if (!formData.addons.includes(event.currentTarget.id))
            formData.addons.push(event.currentTarget.id)
    } else {
        if (formData.addons.includes(event.currentTarget.id)) {
            const items = formData.addons.filter(item => item !== (event.currentTarget.id))
            formData.addons = items
        }
    }
}

const handleChangePlan = (event) => {
    event.preventDefault()

    resetAddOns()

    stepButtons.forEach(stepButton => {
        stepButton.dataset.stepActive = 'false'
    })

    stepButtons[1].dataset.stepActive = 'true'

    showStep(2)
}

const emailIsValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    return emailRegex.test(email)
}

const telIsValid = (tel) => {
    const telRegex = /^[\+]?([0-9]{1,3}[\s]?)([0-9]{1,3}[\s]?)?([0-9]{3}[\s]?)([0-9]{3}[\s]?)([0-9]{3,4})$/

    return telRegex.test(tel)
}

const errorInput = (input, required, text) => {
    required.classList.remove('hidden')
    required.textContent = text
    input.style.borderColor = 'var(--strawberryRed)'
    return false
}

const resetInput = (input, required) => {
    required.classList.add('hidden')
    input.style.borderColor = 'var(--lightGray)'
    return true
}

const validateEmail = (input, required) => {
    if (emailIsValid(input.value.trim()))
        return resetInput(input, required)

    return errorInput(input, required, 'Input a valid email')
}

const validateTel = (input, required) => {
    if (telIsValid(input.value.trim()))
        return resetInput(input, required)

    return errorInput(input, required, 'Input a valid phone')
}

const validateInputStep1 = () => {
    const step1 = document.getElementById('step-1')
    const inputs = step1.querySelectorAll('.input')
    let isValidName = false
    let isValidEmail = false
    let isValidPhone = false

    inputs.forEach(input => {
        const required = input.labels[0].querySelector('.field-required')
        resetInput(input, required)

        if (!input.value.trim()) {
            required.classList.remove('hidden')
            required.textContent = 'This field is required'
            input.style.borderColor = 'var(--strawberryRed)'
            return false
        }

        if (input.id === 'name')
            isValidName = true
        else if (input.id === 'email')
            isValidEmail = validateEmail(input, required)
        else if (input.id === 'tel')
            isValidPhone = validateTel(input, required)
    })

    if (!isValidName || !isValidEmail || !isValidPhone)
        return false

    formData.name = inputs[0].value
    formData.email = inputs[1].value
    formData.tel = inputs[2].value

    return true
}

const validateInputStep2 = () => {
    let isValidPlan = false
    let isValidBilling = false

    for (const plan in formData.plans) {
        if (formData.plans[plan])
            isValidPlan = true
    }

    for (const bill in formData.billing) {
        if (formData.billing[bill])
            isValidBilling = true
    }

    if (!isValidPlan || !isValidBilling)
        return false

    return true
}

const validateInputStep3 = () => {
    return formData.addons.length > 0
}

const validateInputStep4 = () => {
    return formData.addons.length > 0
}

const handleSubmit = (event) => {
    event.preventDefault()

    if (currentStep == 1) {
        const isValid = validateInputStep1()

        if (!isValid) return false

        stepButtons.forEach(stepButton => {
            stepButton.dataset.stepActive = 'false'
        })

        stepButtons[1].dataset.stepActive = 'true'

        showStep(stepButtons[1].getAttribute('value'))
    }
    else if (currentStep == 2) {
        const isValid = validateInputStep2()

        if (!isValid) return false

        stepButtons.forEach(stepButton => {
            stepButton.dataset.stepActive = 'false'
        })

        stepButtons[2].dataset.stepActive = 'true'

        showStep(stepButtons[2].getAttribute('value'))
    }
    else if (currentStep == 3) {
        const isValid = validateInputStep3()

        if (!isValid) return false

        stepButtons.forEach(stepButton => {
            stepButton.dataset.stepActive = 'false'
        })

        stepButtons[3].dataset.stepActive = 'true'

        showStep(stepButtons[3].getAttribute('value'))
    }
    else if (currentStep == 4) {
        showStep(5)
    }

    return true
}

const handleStepButton = (event) => {
    event.preventDefault()
}

form.addEventListener('submit', handleSubmit)

stepButtons.forEach(button => button.addEventListener('click', handleStepButton))

btnGoBack.addEventListener('click', handleGoBack)

plans.forEach(plan => {
    plan.addEventListener('click', handleSelectedPlan)
})

billing.addEventListener('change', handleBilling)

addOnInputs.forEach(input => {
    input.addEventListener('click', handleAddOns)
})
