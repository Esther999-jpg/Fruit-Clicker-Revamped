// ===== DOM REFERENCES =====
const dom = {
    // Fruit
    fruitCount: document.getElementById('fruitCounter'),
    fruit: document.getElementById('fruit'),
    // Reset button
    reset: document.getElementById('reset'),
    // Shop buttons
    shopButton: document.getElementById('shopButton'),
    closeShop: document.getElementById('closeShop'),
    // Boost shop buttons
    clickerUpgrades: document.getElementById('clickerUpgrades'),
    closeClickerShop: document.getElementById('closeClickerShop'),
    // Achievement window buttons
    achievements: document.getElementById('achievements'),
    closeAchievements: document.getElementById('closeAchievementSection'),
    // Mental health button
    mentalHealth: document.getElementById('mentalHealth'),


    // Fruit clickers
    buyClickers: document.getElementById('buyClickers'),
    clickers: document.getElementById('fruitClickers'),
    clickerCost: document.getElementById('clickerCost'),
    // Workers
    buyWorkers: document.getElementById('buyWorkers'),
    workers: document.getElementById('workers'),
    workerCost: document.getElementById('workerCost'),
    // Farms
    buyFarms: document.getElementById('buyFarms'),
    farms: document.getElementById('farms'),
    farmCost: document.getElementById('farmCost'),

    // Gloves
    buyGloves: document.getElementById('buyGloves'),
    glovesCost: document.getElementById('gloveCost'),
    // Gear
    buyGear: document.getElementById('buyGear'),
    gearCost: document.getElementById('gearCost'),
    // Plow
    buyPlow: document.getElementById('buyPlow'),
    plowCost: document.getElementById('plowCost'),
    // Irrigation
    buyIrrigation: document.getElementById('buyIrrigation'),
    irrigationCost: document.getElementById('irrigationCost'),
    // Roman Innovations
    buyRome: document.getElementById('buyRome'),
    romeCost: document.getElementById('romeCost'),
    // Europe's Three Field System
    buyEurope: document.getElementById('buyEurope'),
    europeCost: document.getElementById('europeCost'),
    // Terracing
    buyTerraces: document.getElementById('buyTerraces'),
    terraceCost: document.getElementById('terraceCost'),


    // Achievements
    firstClickImg: document.getElementById('firstClickImg'),
    firstClickMessage: document.getElementById('firstClickMessage'),
    firstClickerImg: document.getElementById('firstClickerImg'),
    firstClickerMessage: document.getElementById('firstClickerMessage'),
}

// ===== GAME STATE =====
const state = {
    // Base fruits
    fruitCount: 0,

    // Shop upgrades
    clickers: 0,
    clickerCost: 10,
    workers: 0,
    workerCost: 100,
    farms: 0,
    farmCost: 1000,

    // Boosts
    gloves: false,
    glovesCost: 100,
    gear: false,
    gearCost: 2500,
    plow: false,
    plowCost: 10000,
    irrigation: false,
    irrigationCost: 10000,
    rome: false,
    romeCost: 25000,
    europe: false,
    europeCost: 25000,
    terrace: false,
    terraceCost: 25000,
}

// ===== STATE MANAGEMENT =====
function loadState() {
    const savedState = localStorage.getItem('gameState')
    if (savedState) {
        const parsedState = JSON.parse(savedState)
        state.fruitCount = parsedState.fruitCount || 0

        // Shop upgrades
        state.clickers = parsedState.clickers || 0
        state.clickerCost = parsedState.clickerCost || 10
        state.workers = parsedState.workers || 0
        state.workerCost = parsedState.workerCost || 100
        state.farms = parsedState.farms || 0
        state.farmCost = parsedState.farmCost || 1000

        // Boosts
        state.gloves = parsedState.gloves || false
        state.glovesCost = parsedState.glovesCost || 100
        state.gear = parsedState.gear || false
        state.gearCost = parsedState.gearCost || 2500
        state.plow = parsedState.plow || false
        state.plowCost = parsedState.plowCost || 10000
        state.irrigation = parsedState.irrigation || false
        state.irrigationCost = parsedState.irrigationCost || 10000
        state.rome = parsedState.rome || false
        state.romeCost = parsedState.romeCost || 25000
        state.europe = parsedState.europe || false
        state.europeCost = parsedState.europeCost || 25000
        state.terrace = parsedState.terrace || false
        state.terraceCost = parsedState.terraceCost || 25000
    }
}

function saveState() {
    localStorage.setItem('gameState', JSON.stringify(state))
}

function reset() {
    state.fruitCount = 0

    // Shop upgrades
    state.clickers = 0
    state.clickerCost = 10
    state.workers = 0
    state.workerCost = 100
    state.farms = 0
    state.farmCost = 1000

    // Boosts
    state.gloves = false
    state.glovesCost = 100
    state.gear = false
    state.gearCost = 2500
    state.plow = false
    state.plowCost = 10000
    state.irrigation = false
    state.irrigationCost = 10000
    state.rome = false
    state.romeCost = 25000
    state.europe = false
    state.europeCost = 25000
    state.terrace = false
    state.terraceCost = 25000

    updateUI()
}

// ===== UI FUNCTIONS =====
function updateUI() {
    dom.fruitCount.textContent = formatNumber(state.fruitCount)

    // Shop upgrades
    dom.clickers.textContent = formatNumber(state.clickers)
    dom.clickerCost.textContent = formatNumber(state.clickerCost)
    dom.workers.textContent = formatNumber(state.workers)
    dom.workerCost.textContent = formatNumber(state.workerCost)
    dom.farms.textContent = formatNumber(state.farms)
    dom.farmCost.textContent = formatNumber(state.farmCost)

    // Boosts
    hideBoosts('gloves', 'buyGloves')
    hideBoosts('gear', 'buyGear')
    dom.gearCost.textContent = formatNumber(state.gearCost)
    hideBoosts('plow', 'buyPlow')
    dom.plowCost.textContent = formatNumber(state.plowCost)
    hideBoosts('irrigation', 'buyIrrigation')
    dom.irrigationCost.textContent = formatNumber(state.irrigationCost)
    hideBoosts('rome', 'buyRome')
    dom.romeCost.textContent = formatNumber(state.romeCost)
    hideBoosts('europe', 'buyEurope')
    dom.europeCost.textContent = formatNumber(state.europeCost)
    hideBoosts('terrace', 'buyTerraces')
    dom.terraceCost.textContent = formatNumber(state.terraceCost)

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

// ===== UTILITY FUNCTIONS =====
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B'
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    } else {
        return num.toString()
    }
}

function hideBoosts(type, buyType) {
    if (state[type]) {
        dom[buyType].disabled = true
        dom[buyType].textContent = 'Owned'
        dom[buyType].style.backgroundColor = '#cccccc'
        dom[buyType].style.cursor = 'not-allowed'
    } else {
        dom[buyType].disabled = false
        dom[buyType].textContent = 'Buy'
        dom[buyType].style.backgroundColor = '#4CAF50'
        dom[buyType].style.cursor = 'pointer'
    }
}

function checkBoosts(type, calcType) {
    if (!state[type]) {
        calculate(calcType)
        updateUI()
    }
}

function buyShopUpgrades(type) {
    calculate(type)
    updateUI()
}

// ===== GAME LOGIC =====
function passiveIncome() {
    let workersVal = state.workers * 10
    let farmVal = state.farms * 100
    if (state.plow) farmVal *= 2
    if (state.irrigation) farmVal *= 2
    if (state.rome) farmVal *= 5
    if (state.europe) farmVal *= 5
    if (state.terrace) farmVal *= 5
    state.fruitCount += state.clickers + workersVal + farmVal
    updateUI()
}

function calculate(type) {
    // Shop upgrades
    if (type === 'clicker') {calculateShopUpgrades('clickers', 'clickerCost')}
    if (type === 'worker') {calculateShopUpgrades('workers', 'workerCost')}
    if (type === 'farm') {calculateShopUpgrades('farms', 'farmCost')}

    // Boosts
    if (type === 'glove') {calculateBoosts('gloves', 'glovesCost')}
    if (type === 'gear') {calculateBoosts('gear', 'gearCost')}
    if (type === 'plow') {calculateBoosts('plow', 'plowCost')}
    if (type === 'irrigation') {calculateBoosts('irrigation', 'irrigationCost')}
    if (type === 'rome') {calculateBoosts('rome', 'romeCost')}
    if (type === 'europe') {calculateBoosts('europe', 'europeCost')}
    if (type === 'terrace') {calculateBoosts('terrace', 'terraceCost')}
}

function calculateShopUpgrades(addType, typeCost) {
    if (state.fruitCount >= state[typeCost]) {
        state.fruitCount -= state[typeCost]
        state[addType]++
        state[typeCost] = Math.floor(state[typeCost] * 1.2)
    }
}

function calculateBoosts(type, typeCost) {
    if (state.fruitCount >= state[typeCost] && !state[type]) {
        state.fruitCount -= state[typeCost]
        state[type] = true
    }
}

function addFruit() {
    if (state.gear && state.gloves) {
        state.fruitCount += 100
    } else if (state.gloves) {
        state.fruitCount += 10
    } else {
        state.fruitCount++
    }

    updateUI()
}

// ===== ACHIEVEMENT SECTION =====
function achievementDisplay() {
    // First click achievement
    if (state.fruitCount > 0) {
        dom.firstClickImg.src = 'Images/achievements.png'
        dom.firstClickMessage.textContent = "Your first click!"
    } else {
        dom.firstClickImg.src = 'Images/lockedAchievement.png'
        dom.firstClickMessage.textContent = "Just one click!"
    }

    // First clicker achievement
    if (state.clickers > 0) {
        dom.firstClickerImg.src = 'Images/achievements.png'
        dom.firstClickerMessage.textContent = "Your first fruit clicker!"
    } else {
        dom.firstClickerImg.src = 'Images/lockedAchievement.png'
        dom.firstClickerMessage.textContent = "Buy a fruit clicker!"
    }
}

// ===== EVENT HANDLERS =====
function eventHandlers() {
    // Fruit
    dom.fruit.addEventListener('click', () => addFruit())

    // Reset
    dom.reset.addEventListener('click', reset)

    // Shops
    dom.shopButton.addEventListener('click', () => showSection('shopSection'))
    dom.closeShop.addEventListener('click', () => hideSection('shopSection'))
    dom.clickerUpgrades.addEventListener('click', () => showSection('clickerShop'))
    dom.closeClickerShop.addEventListener('click', () => hideSection('clickerShop'))

    // Achievement window
    dom.achievements.addEventListener('click', () => showSection('achievementSection'))
    dom.closeAchievements.addEventListener('click', () => hideSection('achievementSection'))

    // Shop upgrades
    dom.buyClickers.addEventListener('click', () => buyShopUpgrades('clicker'))
    dom.buyWorkers.addEventListener('click', () => buyShopUpgrades('worker'))
    dom.buyFarms.addEventListener('click', () => buyShopUpgrades('farm'))

    // Boosts
    dom.buyGloves.addEventListener('click', () => checkBoosts('gloves', 'glove'))
    dom.buyGear.addEventListener('click', () => checkBoosts('gear', 'gear'))
    dom.buyPlow.addEventListener('click', () => checkBoosts('plow', 'plow'))
    dom.buyIrrigation.addEventListener('click', () => checkBoosts('irrigation', 'irrigation'))
    dom.buyRome.addEventListener('click', () => checkBoosts('rome', 'rome'))
    dom.buyEurope.addEventListener('click', () => checkBoosts('europe', 'europe'))
    dom.buyTerraces.addEventListener('click', () => checkBoosts('terrace', 'terrace'))

    // Mental health awareness
    dom.mentalHealth.addEventListener('click', () => {window.open('https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response', '_blank')})
}

// ===== INITIALIZATION =====
loadState()
eventHandlers()
updateUI()

setInterval(passiveIncome, 1000)
setInterval(saveState, 10000)