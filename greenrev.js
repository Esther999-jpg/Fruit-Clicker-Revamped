// ===== PRESTIGE LOADING =====
function resetPrestige() {
    if (confirm('Are you sure you want to go back to the original game? This will reset your prestige progress.')) {
        localStorage.removeItem('hasPrestiged')
        localStorage.removeItem('currentPrestigeLevel')
        localStorage.removeItem('prestigeData')
        window.location.href = 'index.html'
    }
}

// Load prestige data when the page loads
window.addEventListener('load', function() {
    const prestigeData = localStorage.getItem('prestigeData')
    
    if (prestigeData) {
        const data = JSON.parse(prestigeData)
        console.log('Prestige Level:', data.prestigeLevel)
        console.log('Base Fruits:', data.baseFruits)
        
        // Store the prestige level permanently
        localStorage.setItem('currentPrestigeLevel', data.prestigeLevel)
        localStorage.setItem('hasPrestiged', 'true')
        
        // Clear the temporary prestige data after processing
        localStorage.removeItem('prestigeData')
    }
})

// ===== DOM REFERENCES =====
const dom = {
    // Fruit
    fruitCount: document.getElementById('fruitCounter'),
    fruit: document.getElementById('fruit'),
    passiveFruit: document.getElementById('passiveFruit'),
    // Shop buttons
    shopButton: document.getElementById('shopButton'),
    closeShop: document.getElementById('closeShop'),
    // Boost shop buttons
    clickerUpgrades: document.getElementById('clickerUpgrades'),
    closeClickerShop: document.getElementById('closeClickerShop'),
    // Achievement window buttons
    achievements: document.getElementById('achievements'),
    closeAchievements: document.getElementById('closeAchievementSection'),
    // Prestige button
    prestige: document.getElementById('prestige'),
}

// ===== CONSTANTS =====

// Game settings
const PRESTIGE_THRESHOLD = new Big(1000000000000000)
const MAX_UPGRADES = {
    FARMS: 100,
}
const PASSIVE_INTERVAL = 1000
const SAVE_INTERVAL = 10000

// Game properties
const SHOP_PROPERTIES = [
    'farms',
]
const BOOST_PROPERTIES = [
    'highYieldVarieties',
    'syntheticFertilizers',
    'pesticides',
    'herbicides',
    'largeScaleWaterProjects',
    'mechanization'
]

// Other constants
const FORMAT_THRESHOLDS = {
    QUADRILLION: 1000000000000000,
    TRILLION: 1000000000000,
    BILLION: 1000000000,
    MILLION: 1000000,
    THOUSAND: 1000
}

const BOOST_MULTIPLIERS = {
    HYV: 2,
    SYNTHETIC_FERTILIZERS: 3,
    PESTICIDES: 2.5,
    HERBICIDES: 2.5,
    WATER_PROJECTS: 3,
    MECHANIZATION: 4
}

const PRODUCTION_VALUES = {
    FARM: FORMAT_THRESHOLDS.MILLION
}

const SHOP_MULTIPLIERS = {
    FARM: 1.3
}

const BASE_COSTS = {
    FARM: 100 * FORMAT_THRESHOLDS.MILLION
}

const BOOST_COSTS = {
    HYV: 100 * FORMAT_THRESHOLDS.MILLION,
    SYNTHETIC_FERTILIZERS: 200 * FORMAT_THRESHOLDS.MILLION,
    PESTICIDES: 500 * FORMAT_THRESHOLDS.MILLION,
    HERBICIDES: 500 * FORMAT_THRESHOLDS.MILLION,
    WATER_PROJECTS: 5 * FORMAT_THRESHOLDS.BILLION,
    MECHANIZATION: 5 * FORMAT_THRESHOLDS.BILLION
}


// ===== GAME STATE =====
const state = {
    // Base fruits
    fruitCount: new Big(0),

    // Shop upgrades
    farms: 1,

    // Boosts
    highYieldVarieties: false,
    syntheticFertilizers: false,
    pesticides: false,
    herbicides: false,
    largeScaleWaterProjects: false,
    mechanization: false,

    // Prestige
    //prestige: 0,
}

// ===== SHOP UPGRADES =====
const shopUpgrades = [
    createShopUpgrade('farms', 'Farms', 'Images/farm.jpg', 'farms', BASE_COSTS.FARM, SHOP_MULTIPLIERS.FARM, 'farms')
]

// ===== BOOSTS =====
const boostUpgrades = [
    createBoostUpgrade('highYieldVarieties', 'High Yield Varieties', 'Images/highYieldVarieties.png', 'highYieldVarieties', BOOST_COSTS.HYV, 'highYieldVarieties'),
    createBoostUpgrade('syntheticFertilizers', 'Synthetic Fertilizers', 'Images/syntheticFertilizer.png', 'syntheticFertilizers', BOOST_COSTS.SYNTHETIC_FERTILIZERS, 'syntheticFertilizers'),
    createBoostUpgrade('pesticides', 'Pesticides', 'Images/pesticides.png', 'pesticides', BOOST_COSTS.PESTICIDES, 'pesticides'),
    createBoostUpgrade('herbicides', 'Herbicides', 'Images/herbicides.png', 'herbicides', BOOST_COSTS.HERBICIDES, 'herbicides'),
    createBoostUpgrade('largeScaleWaterProjects', 'Water Projects', 'Images/waterProject.jpg', 'largeScaleWaterProjects', BOOST_COSTS.WATER_PROJECTS, 'largeScaleWaterProjects'),
    createBoostUpgrade('mechanization', 'Mechanization', 'Images/mechanization.jpg', 'mechanization', BOOST_COSTS.MECHANIZATION, 'mechanization'),
]

// ===== ACHIEVEMENT DATA =====
const achievements = [
    // Achievements for fruit amounts
    createAchievement('hundredMillionFruits', 'Hundred Million Fruits', '100M Fruits!', 'Get 100M Fruits!', () => state.fruitCount.gt(100 * FORMAT_THRESHOLDS.MILLION)),
    createAchievement('billionFruits', 'Billion Fruits', '1B Fruits!', 'Get 1B Fruits!', () => state.fruitCount.gt(FORMAT_THRESHOLDS.BILLION)),
    createAchievement('tenBillionFruits', 'Ten Billion Fruits', '10B Fruits!', 'Get 10B Fruits!', () => state.fruitCount.gt(10 * FORMAT_THRESHOLDS.BILLION)),
    createAchievement('hundredBillionFruits', 'Hundred Billion Fruits', '100B Fruits!', 'Get 100B Fruits!', () => state.fruitCount.gt(100 * FORMAT_THRESHOLDS.BILLION)),
    createAchievement('trillionFruits', 'Trillion Fruits', '1T Fruits!', 'Get 1T Fruits!', () => state.fruitCount.gt(FORMAT_THRESHOLDS.TRILLION)),
    createAchievement('tenTrillionFruits', 'Ten Trillion Fruits', '10T Fruits!', 'Get 10T Fruits!', () => state.fruitCount.gt(10 * FORMAT_THRESHOLDS.TRILLION)),
    createAchievement('hundredTrillionFruits', 'Hundred Trillion Fruits', '100T Fruits!', 'Get 100T Fruits!', () => state.fruitCount.gt(100 * FORMAT_THRESHOLDS.TRILLION)),
    createAchievement('quadrillionFruits', 'Quadrillion Fruits', '1Qd Fruits!', 'Get 1Qd Fruits!', () => state.fruitCount.gt(FORMAT_THRESHOLDS.QUADRILLION)),
    
    // Achievements for upgrades
    createAchievement('firstFarm', 'First Farm', 'Your first farm!', 'Buy a farm!', () => state.farms > 0),

    // Achievements for boosts
    createAchievement('highYieldVarieties', 'High Yield Varieties', "You've researched HYV!", "Research HYV!", () => state.highYieldVarieties),
    createAchievement('syntheticFertilizers', 'Synthetic Fertilizers', "You've researched Synthetic Fertilizers!", "Research Synthetic Fertilizers!", () => state.syntheticFertilizers),
    createAchievement('pesticides', 'Pesticides', "You've researched Pesticides!!", "Research Pesticides!", () => state.pesticides),
    createAchievement('herbicides', 'Herbicides', "You've researched Herbicides!", 'Research Herbicides!', () => state.herbicides),
    createAchievement('largeScaleWaterProjects', 'Water Projects', "You've researched Large Scale Water Projects!!", 'Research Large Scale Water Projects!', () => state.largeScaleWaterProjects),
    createAchievement('mechanization', 'Mechanization', "You've researched Mechanization!!", 'Research Mechanization!', () => state.mechanization),
]

// ===== STATE MANAGEMENT =====
function loadState() {
    const savedState = localStorage.getItem('gameState')
    if (savedState) {
        const parsedState = JSON.parse(savedState)
        state.fruitCount = parsedState.fruitCount ? new Big(parsedState.fruitCount) : new Big(0)
        
        SHOP_PROPERTIES.forEach(prop => {
            state[prop] = parsedState[prop] || 1
        })
        
        BOOST_PROPERTIES.forEach(prop => {
            state[prop] = parsedState[prop] || false
        })
    }
}

function saveState() {
    const saveData = {
        ...state,
        fruitCount: state.fruitCount.toString()
    }
    localStorage.setItem('gameState', JSON.stringify(saveData))
}

function reset() {
    state.fruitCount = new Big(0)
    
    SHOP_PROPERTIES.forEach(prop => {
        state[prop] = 0
    })
    
    BOOST_PROPERTIES.forEach(prop => {
        state[prop] = false
    })
    
    updateUI()
}

// ===== UI FUNCTIONS =====
function updateUI() {
    dom.fruitCount.textContent = formatNumber(state.fruitCount)
    dom.passiveFruit.textContent = formatNumber(calculatePassiveIncome()) + '/s'

    // Dynamic shop upgrades
    shopUpgrades.forEach(upgrade => {
        const count = document.getElementById(`${upgrade.id}Count`)
        const cost = document.getElementById(`${upgrade.id}Cost`)
        const button = document.getElementById(`buy${upgrade.id.charAt(0).toUpperCase() + upgrade.id.slice(1)}`)

        if (count) {count.textContent = formatNumber(upgrade.getCount())}
        if (cost) {cost.textContent = formatNumber(upgrade.getCost())}

        // Check if maxed
        if (button) {
            const isMaxed = state[upgrade.id] >= MAX_UPGRADES[upgrade.id.toUpperCase()]
            button.disabled = isMaxed
            button.textContent = isMaxed ? 'Maxed' : 'Buy'
            button.style.backgroundColor = isMaxed ? '#cccccc' : '#4CAF50'
            button.style.cursor = isMaxed ? 'not-allowed' : 'pointer'
        }
    })

    // Dynamic boost upgrades
    boostUpgrades.forEach(boost => {
        const cost = document.getElementById(`${boost.id}Cost`)
        const button = document.getElementById(`buy${boost.id.charAt(0).toUpperCase() + boost.id.slice(1)}`)

        if (cost) cost.textContent = formatNumber(boost.getCost())
        if (button) {
            if (boost.isOwned()) {
                button.textContent = 'Owned'
                button.disabled = true
                button.style.backgroundColor = '#cccccc'
                button.style.cursor = 'not-allowed'
            } else {
                button.textContent = 'Buy'
                button.disabled = false
                button.style.backgroundColor = '#4CAF50'
                button.style.cursor = 'pointer'
            }
        }
    })


    // Achievement window
    achievementDisplay()
}

function showSection(type) {
    const section = document.getElementById(type)
    section.style.display = 'block'
    
    setTimeout(() => {
        section.style.opacity = '1'
        section.style.transform = 'scale(1)'
    }, 10)
}

function hideSection(type) {
    const section = document.getElementById(type)
    section.style.opacity = '0'
    section.style.transform = 'scale(0.9)'
    
    setTimeout(() => {
        section.style.display = 'none'
    }, 300)
}

// ===== MINOR FUNCTIONS =====
function formatNumber(num) {
    const value = num instanceof Big ? num.toNumber() : num
    
    if (value >= FORMAT_THRESHOLDS.QUADRILLION) {
        return (value / FORMAT_THRESHOLDS.QUADRILLION).toFixed(1).replace(/\.0$/, '') + 'Qd'
    } else if (value >= FORMAT_THRESHOLDS.TRILLION) {
        return (value / FORMAT_THRESHOLDS.TRILLION).toFixed(1).replace(/\.0$/, '') + 'T'
    } else if (value >= FORMAT_THRESHOLDS.BILLION) {
        return (value / FORMAT_THRESHOLDS.BILLION).toFixed(1).replace(/\.0$/, '') + 'B'
    } else if (value >= FORMAT_THRESHOLDS.MILLION) {
        return (value / FORMAT_THRESHOLDS.MILLION).toFixed(1).replace(/\.0$/, '') + 'M'
    } else if (value >= FORMAT_THRESHOLDS.THOUSAND) {
        return (value / FORMAT_THRESHOLDS.THOUSAND).toFixed(1).replace(/\.0$/, '') + 'K'
    } else {
        return value.toString()
    }
}

function passiveIncome() {
    const passiveAmount = calculatePassiveIncome()
    state.fruitCount = state.fruitCount.plus(passiveAmount)
    updateUI()
}

function calculatePassiveIncome() {
    let farmVal = state.farms * PRODUCTION_VALUES.FARM

    // Applying the boost multipliers...
    if (state.highYieldVarieties) farmVal *= BOOST_MULTIPLIERS.HYV
    if (state.syntheticFertilizers) farmVal *= BOOST_MULTIPLIERS.SYNTHETIC_FERTILIZERS
    if (state.pesticides) farmVal *= BOOST_MULTIPLIERS.PESTICIDES
    if (state.herbicides) farmVal *= BOOST_MULTIPLIERS.HERBICIDES
    if (state.largeScaleWaterProjects) farmVal *= BOOST_MULTIPLIERS.WATER_PROJECTS
    if (state.mechanization) farmVal *= BOOST_MULTIPLIERS.MECHANIZATION

    return new Big(farmVal)
}

function addFruit() {
    state.fruitCount = state.fruitCount.plus(1)
    updateUI()
}

// ===== UPGRADES =====
function calculateShopUpgrades(addType) {
    const upgrade = shopUpgrades.find(u => u.id === addType)
    const cost = upgrade.getCost()

    // Checks if maxed
    if (state[addType] >= MAX_UPGRADES[addType.toUpperCase()]) {
        return
    }
    
    if (state.fruitCount.gte(cost)) {
        state.fruitCount = state.fruitCount.minus(cost)
        state[addType]++
    }
}

function calculateBoosts(type) {
    const boost = boostUpgrades.find(b => b.id === type)
    const cost = boost.getCost()
    
    if (state.fruitCount.gte(cost) && !state[type]) {
        state.fruitCount = state.fruitCount.minus(cost)
        state[type] = true
    }
}

function generateUpgradeList(containerId, upgrades, isBoost = false) {
    const container = document.getElementById(containerId)
    container.innerHTML = ''

    upgrades.forEach(item => {
        // Making the div
        const div = document.createElement('div')
        div.className = 'upgradeItem'
        // Making the image
        const img = document.createElement('img')
        img.className = 'upgradeImages'
        img.src = item.image
        img.alt = item.alt
        // Making the name/count
        const p = document.createElement('p')
        if (isBoost) {
            p.textContent = item.name
        } else {
            p.innerHTML = `${item.name} [<span id="${item.id}Count">${item.getCount()}</span>]`
        }
        // Making the button
        const button = document.createElement('button')
        button.id = `buy${item.id.charAt(0).toUpperCase() + item.id.slice(1)}`
        button.className = 'buyButtons'
        button.textContent = isBoost && item.isOwned() ? 'Owned' : 'Buy'
        button.disabled = isBoost && item.isOwned()
        
        if (isBoost && item.isOwned()) {
            button.style.backgroundColor = '#cccccc'
            button.style.cursor = 'not-allowed'
        }
        
        button.addEventListener('click', () => {
            if (!isBoost || !item.isOwned()) {
                item.buy()
                updateUI()
            }
        })
        
        // Making the cost
        const costP = document.createElement('p')
        costP.className = 'message'
        costP.innerHTML = `Cost: <span id="${item.id}Cost">${item.getCost()}</span>`
        
        // Appending everything
        div.appendChild(img)
        div.appendChild(p)
        div.appendChild(button)
        div.appendChild(costP)
        container.appendChild(div)
    })
}

function generateShopUpgrades() {
    generateUpgradeList('shopUpgradesList', shopUpgrades, false)
}

function generateBoostUpgrades() {
    generateUpgradeList('boostUpgradesList', boostUpgrades, true)
}

function createShopUpgrade(id, name, image, alt, baseCost, multiplier, stateProperty) {
    return {
        id,
        name,
        image,
        alt,
        getCount: () => state[stateProperty],
        getCost: () => new Big(Math.floor(baseCost * Math.pow(multiplier, state[stateProperty]))),
        buy: () => calculateShopUpgrades(id)
    }
}

function createBoostUpgrade(id, name, image, alt, cost, stateProperty) {
    return {
        id,
        name,
        image,
        alt,
        getCost: () => new Big(cost),
        isOwned: () => state[stateProperty],
        buy: () => calculateBoosts(id)
    }
}

// ===== ACHIEVEMENT FUNCTIONS =====
function achievementDisplay() {
    const achievementContainer = document.getElementById('achievementList')
    achievementContainer.innerHTML = ''

    achievements.forEach(ach => {
        const unlocked = ach.isUnlocked()
        const div = document.createElement('div')
        div.className = 'upgradeItem'

        const img = document.createElement('img')
        img.className = 'upgradeImages'
        img.src = unlocked ? ach.unlockedImg : ach.lockedImg

        const p = document.createElement('p')
        p.className = 'message'
        p.textContent = unlocked ? ach.message : ach.lockedMessage

        div.appendChild(img)
        div.appendChild(p)
        achievementContainer.appendChild(div)
    })
}

function createAchievement (id, name, message, lockedMessage, isUnlocked) {
    return {
        id,
        name,
        message,
        lockedMessage,
        unlockedImg: 'Images/achievements.png',
        lockedImg: 'Images/lockedAchievement.png',
        isUnlocked
    }
}

// ===== PRESTIGE FUNCTIONALITY =====
function prestige() {
    if (state.fruitCount.gte(PRESTIGE_THRESHOLD)) {
        localStorage.setItem('prestigeData', JSON.stringify({
            prestigeLevel: state.prestige + 1,
            baseFruits: state.fruitCount.toString(),
        }))

        window.location.href = 'greenrev.html'
    } else {
        alert('You need at least 1B fruits to prestige!')
    }
}

function checkPrestigeRedirect() {
    const hasPrestiged = localStorage.getItem('hasPrestiged')
    if (hasPrestiged === 'true') {
        window.location.href = 'greenrev.html'
    }
}

// ===== EVENT HANDLERS =====
function eventHandlers() {
    // Fruit
    dom.fruit.addEventListener('click', addFruit)

    // Shops
    dom.shopButton.addEventListener('click', () => showSection('shopSection'))
    dom.closeShop.addEventListener('click', () => hideSection('shopSection'))
    dom.clickerUpgrades.addEventListener('click', () => showSection('clickerShop'))
    dom.closeClickerShop.addEventListener('click', () => hideSection('clickerShop'))

    // Achievement window
    dom.achievements.addEventListener('click', () => showSection('achievementSection'))
    dom.closeAchievements.addEventListener('click', () => hideSection('achievementSection'))

    // Prestige
    //dom.prestige.addEventListener('click', prestige)
}

// ===== INITIALIZATION =====
//checkPrestigeRedirect()
loadState()
eventHandlers()
generateShopUpgrades()
generateBoostUpgrades()
updateUI()

setInterval(passiveIncome, PASSIVE_INTERVAL)
setInterval(saveState, SAVE_INTERVAL)