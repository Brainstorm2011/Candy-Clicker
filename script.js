let candy = 0;
let candyPerSecond = 0;
let clickPower = 1;
let demonSpawnChance = 1;
let robberSpawnChance = 1;
let devastationSpawnChance = 1;
let threshold = 1_000_000;
rebirth = 1;

let mouseY = 0;
let mouseX = 0;

BigInt.prototype.toJSON = function () { return this.toString(); };

const CANDY = document.getElementById("candy");
const CANDY_DISPLAY = document.getElementById("candyDisplay");
const CLICK_POWER_DISPLAY = document.getElementById("clickPowerDisplay");
const CPS_DISPLAY = document.getElementById("cpsDisplay");

let candiesCaught = 0;

const UPGRADE_DATA = [
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
  { name: "Candy Multiverse", displayCost: "10S", cost: 10_000_000_000_000_000_000_000n, cat: 2, displayPower: "150Qi", power: 150_000_000_000_000_000_000n, imgName: "Candy Multiverse.png" },
  { name: "Epic Cursor", displayCost: "250S", cost: 250_000_000_000_000_000_000_000n, cat: 1, displayPower: "2S", power: 2_000_000_000_000_000_000_000n, imgName: "Epic Cursor.png" },
  { name: "Candy Metaverse", displayCost: "100Se", cost: 100_000_000_000_000_000_000_000_000n, cat: 2, displayPower: "100S", power: 100_000_000_000_000_000_000_000n, imgName: "Candy Metaverse.png" },
  { name: "Candy Xenoverse", displayCost: "350Se", cost: 350_000_000_000_000_000_000_000_000n, cat: 2, displayPower: "1Se", power: 1_000_000_000_000_000_000_000_000n, imgName: "Candy Xenoverse.png" },
  { name: "Candy Gigaverse", displayCost: "1O", cost: 1_000_000_000_000_000_000_000_000_000n, cat: 2, displayPower: "100Se", power: 100_000_000_000_000_000_000_000_000n, imgName: "Candy Gigaverse.png" },
  { name: "Legendary Cursor", displayCost: "150O", cost: 150_000_000_000_000_000_000_000_000_000n, cat: 1, displayPower: "2O", power: 2_000_000_000_000_000_000_000_000_000n, imgName: "Legendary Cursor.png" },
  { name: "Candy Omniverse", displayCost: "2N", cost: 2_000_000_000_000_000_000_000_000_000_000n, cat: 2, displayPower: "100O", power: 100_000_000_000_000_000_000_000_000_000n, imgName: "Candy Omniverse.png" },
  { name: "Demon Slayer", displayCost: "10D", cost: 10_000_000_000_000_000_000_000_000_000_000_000n, cat: 3, displayPower: "-", power: 0, imgName: "Demon Slayer.png" },
  { name: "The Blessing", displayCost: "10D", cost: 10_000_000_000_000_000_000_000_000_000_000_000n, cat: 4, displayPower: "-", power: 0, imgName: "The Blessing.png" },
  { name: "The Candykeeper", displayCost: "10D", cost: 10_000_000_000_000_000_000_000_000_000_000_000n, cat: 5, displayPower: "-", power: 0, imgName: "The Candykeeper.png" },
  { name: "The GUT of Candy", displayCost: "1.5U", cost: 1_500_000_000_000_000_000_000_000_000_000_000_000n, cat: 2, displayPower: "100D", power: 100_000_000_000_000_000_000_000_000_000_000_000n, imgName: "GUT of Candy.png" }
];

function loadUpgrades() {
    for (let i = 0; i < UPGRADE_DATA.length; i++) {
        const box = document.createElement("div");
        box.className = "upgrade";
        
        const data = UPGRADE_DATA[i];
        
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
        } else if (data.cat == 2) {
            effectDiv.textContent = `Increases CPS by ${data.displayPower}`;
        } else if (data.cat == 3) {
            effectDiv.textContent = `Reduces the chance of demon candies spawning`;
        } else if (data.cat == 4) {
            effectDiv.textContent = `Reduces the chance of devastation candies spawning`;
        } else {
            effectDiv.textContent = `Reduces the chance of robber candies spawning`;
        }
            
        textContainer.appendChild(titleDiv);
        textContainer.appendChild(costDiv);
        textContainer.appendChild(effectDiv);
        
        box.appendChild(img);
        box.appendChild(textContainer);

        if (data.cat === 1) {
            box.addEventListener("click", () => {addClickPower(i)});
        } else if (data.cat == 2) {
            box.addEventListener("click", () => {addCPS(i)});
        } else if (data.cat == 3) {
            box.addEventListener("click", () => {decreaseDemonSpawn(i)});
        } else if (data.cat == 4) {
            box.addEventListener("click", () => {decreaseDevastationSpawn(i)});
        } else {
            box.addEventListener("click", () => {decreaseRobberSpawn(i)});
        }

        const holder = document.getElementById("holder");
        holder.appendChild(box);

        if (i > rebirth * 4 - 1) {
            box.style.display = "none";
        }
    }
};


const RESET_BUTTON = document.getElementById("reset");
const PRESTIGE_BUTTON = document.getElementById("prestige");

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const maxTrackHeight = window.innerHeight - 50;
const numSuffixes = ['', 'K', 'M', 'B', 'T', 'Q', 'Qi', 'S', 'Sp', 'O', 'N', 'D', 'Un', 'Du', 'Tr', 'Qa'];
let candyTime = [0, 0, 0, 0, 0, 0, 0];
let candySpawn = [createSpawns(0, 60), createSpawns(60, 120), createSpawns(120, 240), createSpawns(600, 900), createSpawns(40, 120), createSpawns(30, 100), createSpawns(80, 240)];

function createSpawns(initial, final) {
    return ((Math.random() * (final - initial)) + initial);
}

CANDY.addEventListener("click", clickedCandy);
CANDY.addEventListener("mouseover", onHoverCandy);
CANDY.addEventListener("mouseout", offHoverCandy);

RESET_BUTTON.addEventListener("mouseover", resetHover);
RESET_BUTTON.addEventListener("mouseout", resetOff);
RESET_BUTTON.addEventListener("click", resetGame);

PRESTIGE_BUTTON.addEventListener("click", prestigePurchased);

if (localStorage.getItem("candy") !== null) {
    loadGame();
} 

function loadGame() {
    candy = parseInt(localStorage.getItem("candy"), 10);
    candyPerSecond = parseInt(localStorage.getItem("candyPerSecond"), 10);
    clickPower = parseInt(localStorage.getItem("clickPower"), 10);
    candyTime = JSON.parse(localStorage.getItem("candyTime"));
    candySpawn = JSON.parse(localStorage.getItem("candySpawn"));
    demonSpawnChance = localStorage.getItem("demonSpawn");
    robberSpawnChance = localStorage.getItem("robberSpawn");
    devastationSpawnChance = localStorage.getItem("devastationSpawn");
    threshold = localStorage.getItem("prestigeThreshold");
    candiesCaught = localStorage.getItem("candiesCaught");
}

function saveGame() {
    localStorage.setItem("candy", candy);
    localStorage.setItem("candyPerSecond", candyPerSecond);
    localStorage.setItem("clickPower", clickPower);
    localStorage.setItem("candyTime", JSON.stringify(candyTime));
    localStorage.setItem("candySpawn", JSON.stringify(candySpawn));
    localStorage.setItem("demonSpawn", demonSpawnChance);
    localStorage.setItem("robberSpawn", robberSpawnChance);
    localStorage.setItem("devastationSpawn", devastationSpawnChance);
    localStorage.setItem("prestigeThreshold", threshold);
    localStorage.setItem("candiesCaught", candiesCaught);
}

window.addEventListener("mousemove", (e) => {mouseX = e.pageX; mouseY = e.pageY});

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
    const data = UPGRADE_DATA[id];
    if (candy >= data.cost) {
        candy -= data.cost;
        clickPower += data.power;
        refreshDisplay();
    }
}

function addCPS(id) {
    const data = UPGRADE_DATA[id];
    if (candy >= data.cost) {
        candy -= data.cost;
        candyPerSecond += data.power;
        refreshDisplay();
    }
}

function decreaseDemonSpawn() {
    const data = UPGRADE_DATA[id];
    if (candy >= data.cost) {
        candy -= data.cost;
        demonSpawnChance -= 0.01;
        refreshDisplay();
    }
}

function decreaseDevastationSpawn() {
    const data = UPGRADE_DATA[id];
    if (candy >= data.cost) {
        candy -= data.cost;
        devastationSpawnChance -= 0.01;
        refreshDisplay();
    }
}

function decreaseRobberSpawn() {
    const data = UPGRADE_DATA[id];
    if (candy >= data.cost) {
        candy -= data.cost;
        robberSpawnChance -= 0.01;
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
        prestigeAllowed();
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

class Candy {
    constructor(type, power, image) {
        this.power = power;
        const flyCandy = document.createElement("img");
        flyCandy.src = image;
        flyCandy.className = type;
        flyCandy.style.top = `${Math.floor(Math.random() * maxTrackHeight)}px`;
        this.element = flyCandy;
        if (type == 'robberCandy') {
            flyCandy.addEventListener("animationend", () => {this.addRobber();});
            flyCandy.addEventListener("pointerdown", () => {this.element.remove();});
        } else if (type == 'devastationCandy') {
            flyCandy.style.top = `${mouseY}px`;
            flyCandy.addEventListener("animationend", () => {this.element.remove();});
            flyCandy.addEventListener("mouseover", () => {this.addDevastation();});
        } else {
            flyCandy.addEventListener("animationend", () => {this.element.remove();});
            flyCandy.addEventListener("pointerdown", () => {this.addFlyCandy();});
        }
        document.body.appendChild(this.element);
    }

    addFlyCandy() {
        candy += this.power * clickPower;
        if (this.type = "regCandy") {
            candiesCaught++;
        }
        this.element.remove();
        refreshDisplay();
    }

    addRobber() {
        candyPerSecond *= this.power;
        this.element.remove();
        refreshDisplay();
    }

    addDevastation() {
        candy = Math.abs(candy) * -1;
        candyPerSecond = Math.floor(Math.abs(candyPerSecond * -0.1));
        clickPower = Math.floor(clickPower * 0.75);
        this.element.remove();
        refreshDisplay();
    }
}

async function checkCandySpawns() {
    if (candyTime[0] >= candySpawn[0]) {
        new Candy("regCandy", 10, "Regular Candy.svg");
        candySpawn[0] = (Math.random() * 60);
        candyTime[0] = 0;
    }
    if (candyTime[1] >= candySpawn[1]) {
        new Candy("goldCandy", 100, "Regular Candy.svg");
        candySpawn[1] = (Math.random() * 60) + 60;
        candyTime[1] = 0;
    }
    if (candyTime[2] >= candySpawn[2]) {
        new Candy("rainbowCandy", 10_000, "Regular Candy.svg");
        candySpawn[2] = (Math.random() * 120) + 120;
        candyTime[2] = 0;
    }
    if (candyTime[3] >= candySpawn[3]) {
        new Candy("diamondCandy", 1_000_000_000, "Regular Candy.svg");
        candySpawn[3] = (Math.random() * 300) + 600;
        candyTime[3] = 0;
    }
    if (candyTime[4] >= candySpawn[4]) {
            if (Math.random() <= demonSpawnChance) {
            new Candy("demonCandy", -500, "Demon Candy.svg");
            candySpawn[4] = (Math.random() * 80) + 40;
            candyTime[4] = 0;
        }
    }
    if (candyTime[5] >= candySpawn[5]) {
        if (Math.random() <= robberSpawnChance) {
            new Candy("robberCandy", 0.5, "Robber Candy.svg");
            candySpawn[5] = (Math.random() * 70) + 30;
            candyTime[5] = 0;
        }
    }
    if (candyTime[6] >= candySpawn[6]) {
        if (Math.random() <= devastationSpawnChance) {
            candySpawn[6] = (Math.random() * 160) + 80;
            candyTime[6] = 0;
            for (let i = 0; i < 5; i++) {
                new Candy("demonCandy", -500, "Demon Candy.svg")
                await delay(500);
            }
            await delay(2000)
            new Candy("devastationCandy", -10, "Devastation Candy.svg");
        }
    }
}

function resetHover() {
    RESET_BUTTON.style.backgroundColor = "red";
    RESET_BUTTON.style.border = "2px solid red";
}

function resetOff() {
    RESET_BUTTON.style.backgroundColor = "black";
    RESET_BUTTON.style.border = "2px solid black";
}

function resetGame() {
    if (confirm("Do you want to reset you game?")) {
        if (confirm("Are you sure?")) {
            if (confirm("Are you very sure - this is irreversible")) {
                candy = 0;
                clickPower = 1;
                candyPerSecond = 0;
                candyTime = [0, 0, 0, 0, 0, 0, 0];
                candySpawn = [createSpawns(0, 60), createSpawns(60, 120), createSpawns(120, 240), createSpawns(600, 900), createSpawns(40, 120), createSpawns(30, 100), createSpawns(80, 240)];
                demonSpawnChance = 1;
                robberSpawnChance = 1;
                devastationSpawnChance = 1;
                threshold = 1_000_000;
                saveGame();
                window.location.reload();
            }
        }
    }
}

function prestigePurchased() {
    if (candy >= threshold) {
        candy = 0;
        clickPower = Math.floor(0.001 * clickPower);
        candyPerSecond = 0;
        candyTime = [0, 0, 0, 0, 0, 0, 0];
        candySpawn = [createSpawns(0, 60), createSpawns(60, 120), createSpawns(120, 240), createSpawns(600, 900), createSpawns(40, 120), createSpawns(30, 100), createSpawns(80, 240)];
        demonSpawnChance = Math.floor(0.2 * demonSpawnChance);
        robberSpawnChance = Math.floor(0.2 * robberSpawnChance);
        devastationSpawnChance = Math.floor(0.2 * devastationSpawnChance);
        threshold *= 1_000_000;
        saveGame();
        window.location.reload();
    }
}

function prestigeAllowed() {
    if (candy < threshold) {
        PRESTIGE_BUTTON.style.opacity = "0.25";
    } else {
        PRESTIGE_BUTTON.style.opacity = "1";
    }
}

async function checkAchievment() {
    if (candiesCaught == 1) {
        await delay(2500);
    }
}

loadUpgrades();
runCPS();
