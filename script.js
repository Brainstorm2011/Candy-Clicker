let candy = 0;
let candyPerSecond = 0;
let clickPower = 1;

BigInt.prototype.toJSON = function () { return this.toString(); };

const CANDY = document.getElementById("candy");
const CANDY_DISPLAY = document.getElementById("candyDisplay");
const CLICK_POWER_DISPLAY = document.getElementById("clickPowerDisplay");
const CPS_DISPLAY = document.getElementById("cpsDisplay");

let upgradeData = [
  { name: "Bronze Cursor", displayCost: "25", cost: 25, cat: 1, displayPower: "1", power: 1, imgName: "Bronze Cursor.png" },
  { name: "Auto Candy", displayCost: "100", cost: 100, cat: 2, displayPower: "1", power: 1, imgName: "Auto Candy.png" },
  { name: "Candy Farm", displayCost: "500", cost: 500, cat: 2, displayPower: "10", power: 10, imgName: "Candy Farm.png" },
  { name: "Candy Mine", displayCost: "4.75K", cost: 4750, cat: 2, displayPower: "100", power: 100, imgName: "Candy Mine.png" },
  { name: "Silver Cursor", displayCost: "150K", cost: 150_000, cat: 1, displayPower: "2K", power: 2000, imgName: "Silver Cursor.png" },
  { name: "Candy Factory", displayCost: "2M", cost: 2_000_000, cat: 2, displayPower: "15K", power: 15_000, imgName: "Candy Factory.png" },
  { name: "Candy Lab", displayCost: "15M", cost: 15_000_000, cat: 2, displayPower: "125K", power: 125_000, imgName: "Candy Lab.png" },
  { name: "Candy Temple", displayCost: "125M", cost: 125_000_000, cat: 2, displayPower: "5M", power: 5_000_000, imgName: "Candy Temple.png" },
  { name: "Gold Cursor", displayCost: "400M", cost: 400_000_000, cat: 1, displayPower: "2M", power: 2_000_000, imgName: "Gold Cursor.png" },
  { name: "Candy Rocket", displayCost: "5B", cost: 5_000_000_000, cat: 2, displayPower: "100M", power: 100_000_000, imgName: "Candy Rocket.png" },
  { name: "Candy Man", displayCost: "100B", cost: 15_000_000, cat: 2, displayPower: "2.5B", power: 2_500_000_000, imgName: "Candy Man.png" },
  { name: "Candy King", displayCost: "2T", cost: 2_000_000_000, cat: 2, displayPower: "150B", power: 150_000_000_000, imgName: "Candy King.png" },
  { name: "Jade Cursor", displayCost: "150T", cost: 150_000_000_000_000, cat: 1, displayPower: "2T", power: 2_000_000_000_000, imgName: "Jade Cursor.png" },
  { name: "Candy Planet", displayCost: "10Q", cost: 10_000_000_000_000_000n, cat: 2, displayPower: "100T", power: 100_000_000_000_000, imgName: "Candy Planet.png" },
  { name: "Candy Star", displayCost: "75Q", cost: 75_000_000_000_000_000n, cat: 2, displayPower: "1Q", power: 1_000_000_000_000_000, imgName: "Candy Star.png" },
  { name: "Candy System", displayCost: "250Q", cost: 250_000_000_000_000_000n, cat: 2, displayPower: "10Q", power: 10_000_000_000_000_000n, imgName: "Candy System.png" },
  { name: "Illuminati Cursor", displayCost: "15Qi", cost: 15_000_000_000_000_000_000n, cat: 1, displayPower: "2Q", power: 2_000_000_000_000_000n, imgName: "Illuminati Cursor.png" },
  { name: "Candy Galaxy", displayCost: "75Qi", cost: 75_000_000_000_000_000_000n, cat: 2, displayPower: "50Q", power: 50_000_000_000_000_000n, imgName: "Candy Galaxy.png" },
  { name: "Candy Universe", displayCost: "250Qi", cost: 250_000_000_000_000_000_000n, cat: 2, displayPower: "800Q", power: 800_000_000_000_000_000n, imgName: "Candy Universe.png" },
  { name: "Candy Metaverse", displayCost: "10S", cost: 10_000_000_000_000_000_000_000n, cat: 2, displayPower: "150Qi", power: 150_000_000_000_000_000_000n, imgName: "Candy Multiverse.png" }
];

function loadUpgrades() {
    for (let i = 0; i < upgradeData.length; i++) {
     const box = document.createElement("div");
     box.className = "upgrade";
     
     const data = upgradeData[i];
     
     const img = document.createElement('img');
     img.className = 'upgradeImg';
     img.src = data.imgName;
     
     const textContainer = document.createElement('div');
     textContainer.className = 'upgradeTextContainer';
     
     const titleDiv = document.createElement('div');
     titleDiv.className = 'upgradeTitle';
     titleDiv.textContent = data.name;
     
     const costDiv = document.createElement('div');
     costDiv.className = 'upgradeCost';
     costDiv.textContent = `${data.displayCost} Candy`;
     
     const effectDiv = document.createElement('div');
     effectDiv.className = 'upgradeEffect';
     if (data.cat == 1) {
         effectDiv.textContent = `Increases click power by ${data.displayPower}`;
        } else {
            effectDiv.textContent = `Increases CPS by ${data.displayPower}`;
        }
        
        textContainer.appendChild(titleDiv);
        textContainer.appendChild(costDiv);
        textContainer.appendChild(effectDiv);
        
        box.appendChild(img);
        box.appendChild(textContainer);

        if (data.cat === 1) {
            box.addEventListener("click", () => {addClickPower(i)});
        } else {
            box.addEventListener("click", () => {addCPS(i)});
        }

        const holder = document.getElementById("holder");
        holder.appendChild(box);
    }
};


const resetButton = document.getElementById("reset");

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const maxTrackHeight = window.innerHeight - 50;
const numSuffixes = ['', 'K', 'M', 'B', 'T', 'Q', 'Qi', 'S', 'Sp', 'O', 'N', 'D', 'Un', 'Du', 'Tr', 'Qa'];
let candyTime = [0, 0, 0, 0, 0, 0];
let candySpawn = [createSpawns(0, 60), createSpawns(60, 120), createSpawns(120, 240), createSpawns(600, 900), createSpawns(40, 120), createSpawns(30, 100)];

function createSpawns(initial, final) {
    return ((Math.random() * (final - initial)) + initial);
}

CANDY.addEventListener("click", clickedCandy);
CANDY.addEventListener("mouseover", onHoverCandy);
CANDY.addEventListener("mouseout", offHoverCandy);

resetButton.addEventListener("mouseover", resetHover);
resetButton.addEventListener("mouseout", resetOff);
resetButton.addEventListener("click", resetGame);

if (localStorage.getItem("candy") !== null) {
    loadGame();
} 

function loadGame() {
    candy = parseInt(localStorage.getItem("candy"), 10);
    candyPerSecond = parseInt(localStorage.getItem("candyPerSecond"), 10);
    clickPower = parseInt(localStorage.getItem("clickPower"), 10);
    candyTime = JSON.parse(localStorage.getItem("candyTime"));
    candySpawn = JSON.parse(localStorage.getItem("candySpawn"));
    upgradeData = JSON.parse(localStorage.getItem("upgradePrices"));
}

function saveGame() {
    localStorage.setItem("candy", candy);
    localStorage.setItem("candyPerSecond", candyPerSecond);
    localStorage.setItem("clickPower", clickPower);
    localStorage.setItem("candyTime", JSON.stringify(candyTime));
    localStorage.setItem("candySpawn", JSON.stringify(candySpawn));
    localStorage.setItem("upgradePrices", JSON.stringify(upgradeData));
}

async function clickedCandy() {
    candy += clickPower;
    CANDY.style.filter = 'brightness(10)';
    CLICK_POWER_DISPLAY.innerHTML = "+" + splitNumber(clickPower);
    await delay(100);
    CANDY.style.filter = 'brightness(1)';
    CLICK_POWER_DISPLAY.innerHTML = "";
    refreshDisplay();
}

function onHoverCandy() {
    CANDY.style.width = "20%";
}

function offHoverCandy() {
    CANDY.style.width = "15%";
}

function refreshDisplay() {
    CANDY_DISPLAY.innerHTML = "Candy: " + splitNumber(candy);
    CPS_DISPLAY.innerHTML = "CPS: " + splitNumber(candyPerSecond);
}

function addClickPower(id) {
    const data = upgradeData[id];
    if (candy >= data.cost) {
        candy -= data.cost;
        data.cost = Math.floor(data.cost * 1.1);
        data.displayCost = splitNumber(data.cost);
        clickPower += data.power;
        const boxes = document.querySelectorAll('.upgrade');
        boxes[id].querySelector('.upgradeCost').textContent = `${upgradeData[id].displayCost} Candy`;
        refreshDisplay();
    }
}

function addCPS(id) {
    const data = upgradeData[id];
    if (candy >= data.cost) {
        candy -= data.cost;
        data.cost = Math.floor(data.cost * 1.1);
        data.displayCost = splitNumber(data.cost);
        candyPerSecond += data.power;
        const boxes = document.querySelectorAll('.upgrade');
        boxes[id].querySelector('.upgradeCost').textContent = `${upgradeData[id].displayCost} Candy`;
        refreshDisplay();
    }
}

async function runCPS() {
    while (true) {
        candy += candyPerSecond;
        for (let i = 0; i < candyTime.length; i++) {
            candyTime[i]++;
        }
        checkCandySpawns();
        refreshDisplay();
        saveGame();
        await delay(1000);
    }
}

function splitNumber(number) {
    const len = String(Math.abs(number)).length;
    if (len > 3 && Math.abs(number) != 0) {
        const power = Math.floor(Math.log10(Math.abs(number)) / 3);
        const dec = (Math.abs(number) / (10 ** (power * 3)));
        let x = '';
        if (String(dec).length >= 3) {
            let i = 0;
            while (String(dec)[i] != '.') {
                x += String(dec)[i];
                i++;
            }
            x += String(dec)[i];
            i++;
            x += String(dec)[i];
        } else {
            x = String(dec) + '.0';
        }
        if (number < 0) {
            return '-' + x + numSuffixes[power];
        } else {
            return x + numSuffixes[power];
        }
    } else {
        return number;
    }
}

function spawnRegularCandy() {
    const regCandy = document.createElement("img");
    regCandy.src = "Regular Candy.svg";
    regCandy.className = "regCandy";
    regCandy.addEventListener("animationend", () => {regCandy.remove();});
    regCandy.addEventListener("pointerdown", () => {addRegularCandy(event);});
    regCandy.style.top = `${Math.floor(Math.random() * maxTrackHeight)}px`;
    document.body.appendChild(regCandy);
}

function spawnGoldCandy() {
    const goldCandy = document.createElement("img");
    goldCandy.src = "Gold Candy.svg";
    goldCandy.className = "goldCandy";
    goldCandy.addEventListener("animationend", () => {goldCandy.remove();});
    goldCandy.addEventListener("pointerdown", () => {addGoldCandy(event);});
    goldCandy.style.top = `${Math.floor(Math.random() * maxTrackHeight)}px`;
    document.body.appendChild(goldCandy);
}

function spawnRainbowCandy() {
    const rainbowCandy = document.createElement("img");
    rainbowCandy.src = "Rainbow Candy.svg";
    rainbowCandy.className = "rainbowCandy";
    rainbowCandy.addEventListener("animationend", () => {rainbowCandy.remove();});
    rainbowCandy.addEventListener("pointerdown", () => {addRainbowCandy(event);});
    rainbowCandy.style.top = `${Math.floor(Math.random() * maxTrackHeight)}px`;
    document.body.appendChild(rainbowCandy);
}

function spawnDiamondCandy() {
    const diamondCandy = document.createElement("img");
    diamondCandy.src = "Diamond Candy.svg";
    diamondCandy.className = "diamondCandy";
    diamondCandy.addEventListener("animationend", () => {diamondCandy.remove();});
    diamondCandy.addEventListener("pointerdown", () => {addDiamondCandy(event);});
    diamondCandy.style.top = `${Math.floor(Math.random() * maxTrackHeight)}px`;
    document.body.appendChild(diamondCandy);
}

function spawnDemonCandy() {
    const demonCandy = document.createElement("img");
    demonCandy.src = "Demon Candy.svg";
    demonCandy.className = "demonCandy";
    demonCandy.addEventListener("animationend", () => {demonCandy.remove();});
    demonCandy.addEventListener("pointerdown", () => {addDemonCandy(event);});
    demonCandy.style.top = `${Math.floor(Math.random() * maxTrackHeight)}px`;
    document.body.appendChild(demonCandy);
}

function spawnRobberCandy() {
    const robberCandy = document.createElement("img");
    robberCandy.src = "Robber Candy.svg";
    robberCandy.className = "robberCandy";
    robberCandy.addEventListener("animationend", () => {addRobberCandy(event);});
    robberCandy.addEventListener("pointerdown", () => {robberCandy.remove();});
    robberCandy.style.top = `${Math.floor(Math.random() * maxTrackHeight)}px`;
    document.body.appendChild(robberCandy);
}

function addRegularCandy(event) {
    candy += clickPower * 10;
    event.currentTarget.remove();
    refreshDisplay();
}

function addGoldCandy(event) {
    candy += clickPower * 100;
    event.currentTarget.remove();
    refreshDisplay();
}

function addRainbowCandy(event) {
    candy += clickPower * 10_000;
    event.currentTarget.remove();
    refreshDisplay();
}

function addDiamondCandy(event) {
    candy += clickPower * 1_000_000_000;
    event.currentTarget.remove();
    refreshDisplay();
}

function addDemonCandy(event) {
    candy += clickPower * -500;
    event.currentTarget.remove();
    refreshDisplay();
}

function addRobberCandy(event) {
    candyPerSecond = Math.floor(candyPerSecond * 0.5);
    event.currentTarget.remove();
    refreshDisplay();
}

function checkCandySpawns() {
    if (candyTime[0] >= candySpawn[0]) {
        spawnRegularCandy();
        candySpawn[0] = (Math.random() * 60);
        candyTime[0] = 0;
    }
    if (candyTime[1] >= candySpawn[1]) {
        spawnGoldCandy();
        candySpawn[1] = (Math.random() * 60) + 60;
        candyTime[1] = 0;
    }
    if (candyTime[2] >= candySpawn[2]) {
        spawnRainbowCandy();
        candySpawn[2] = (Math.random() * 120) + 120;
        candyTime[2] = 0;
    }
    if (candyTime[3] >= candySpawn[3]) {
        spawnDiamondCandy();
        candySpawn[3] = (Math.random() * 300) + 600;
        candyTime[3] = 0;
    }
    if (candyTime[4] >= candySpawn[4]) {
        spawnDemonCandy();
        candySpawn[4] = (Math.random() * 80) + 40;
        candyTime[4] = 0;
    }
    if (candyTime[5] >= candySpawn[5]) {
        spawnRobberCandy();
        candySpawn[5] = (Math.random() * 70) + 30;
        candyTime[5] = 0;
    }
}

function resetHover() {
    resetButton.style.backgroundColor = "red";
    resetButton.style.border = "2px solid red";
}

function resetOff() {
    resetButton.style.backgroundColor = "black";
    resetButton.style.border = "2px solid black";
}

function resetGame() {
    if (confirm("Do you want to reset you game?")) {
        if (confirm("Are you sure?")) {
            if (confirm("Are you very sure - this is irreversible")) {
                candy = 0;
                clickPower = 1;
                candyPerSecond = 0;
                candySpawn = [createSpawns(0, 60), createSpawns(60, 120), createSpawns(120, 240), createSpawns(600, 900), createSpawns(40, 120), createSpawns(30, 100)];
                upgradeData = [
                    { name: "Bronze Cursor", displayCost: "25", cost: 25, cat: 1, displayPower: "1", power: 1, imgName: "Bronze Cursor.png" },
                    { name: "Auto Candy", displayCost: "100", cost: 100, cat: 2, displayPower: "1", power: 1, imgName: "Auto Candy.png" },
                    { name: "Candy Farm", displayCost: "500", cost: 500, cat: 2, displayPower: "10", power: 10, imgName: "Candy Farm.png" },
                    { name: "Candy Mine", displayCost: "4.75K", cost: 4750, cat: 2, displayPower: "100", power: 100, imgName: "Candy Mine.png" },
                    { name: "Silver Cursor", displayCost: "150K", cost: 150_000, cat: 1, displayPower: "2K", power: 2000, imgName: "Silver Cursor.png" },
                    { name: "Candy Factory", displayCost: "2M", cost: 2_000_000, cat: 2, displayPower: "15K", power: 15_000, imgName: "Candy Factory.png" },
                    { name: "Candy Lab", displayCost: "15M", cost: 15_000_000, cat: 2, displayPower: "125K", power: 125_000, imgName: "Candy Lab.png" },
                    { name: "Candy Temple", displayCost: "125M", cost: 125_000_000, cat: 2, displayPower: "5M", power: 5_000_000, imgName: "Candy Temple.png" },
                    { name: "Gold Cursor", displayCost: "400M", cost: 400_000_000, cat: 1, displayPower: "2M", power: 2_000_000, imgName: "Gold Cursor.png" },
                    { name: "Candy Rocket", displayCost: "5B", cost: 5_000_000_000, cat: 2, displayPower: "100M", power: 100_000_000, imgName: "Candy Rocket.png" },
                    { name: "Candy Man", displayCost: "100B", cost: 15_000_000, cat: 2, displayPower: "2.5B", power: 2_500_000_000, imgName: "Candy Man.png" },
                    { name: "Candy King", displayCost: "2T", cost: 2_000_000_000, cat: 2, displayPower: "150B", power: 150_000_000_000, imgName: "Candy King.png" },
                    { name: "Jade Cursor", displayCost: "150T", cost: 150_000_000_000_000, cat: 2, displayPower: "2T", power: 2_000_000_000_000, imgName: "Jade Cursor.png" },
                    { name: "Candy Planet", displayCost: "10Q", cost: 10_000_000_000_000_000n, cat: 2, displayPower: "100T", power: 100_000_000_000_000, imgName: "Candy Planet.png" },
                    { name: "Candy Star", displayCost: "75Q", cost: 75_000_000_000_000_000n, cat: 2, displayPower: "1Q", power: 1_000_000_000_000_000, imgName: "Candy Star.png" },
                    { name: "Candy System", displayCost: "250Q", cost: 250_000_000_000_000_000n, cat: 2, displayPower: "10Q", power: 10_000_000_000_000_000n, imgName: "Candy System.png" },
                    { name: "Illuminati Cursor", displayCost: "15Qi", cost: 15_000_000_000_000_000_000n, cat: 1, displayPower: "2Q", power: 2_000_000_000_000_000n, imgName: "Illuminati Cursor.png" },
                    { name: "Candy Galaxy", displayCost: "75Qi", cost: 75_000_000_000_000_000_000n, cat: 2, displayPower: "50Q", power: 50_000_000_000_000_000n, imgName: "Candy Galaxy.png" },
                    { name: "Candy Universe", displayCost: "250Qi", cost: 250_000_000_000_000_000_000n, cat: 2, displayPower: "800Q", power: 800_000_000_000_000_000n, imgName: "Candy Universe.png" },
                    { name: "Candy Metaverse", displayCost: "10S", cost: 10_000_000_000_000_000_000_000n, cat: 2, displayPower: "150Qi", power: 150_000_000_000_000_000_000n, imgName: "Candy Multiverse.png" }
                ];
            }
        }
    }
}

loadUpgrades()
runCPS();