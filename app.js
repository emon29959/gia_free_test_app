// GIA Assessment Practice App

// --- QUESTION GENERATORS ---
// (Keep the same procedural generators)

function generateReasoningQuestions(count) {
    // Subject categories — each with its own fitting adjective pool
    const subjectGroups = [
        {
            label: 'people',
            items: ['Tom', 'Bob', 'Jim', 'Sam', 'Dan', 'Rob', 'Joe', 'Ben', 'Amy', 'Zoe',
                    'Max', 'Eve', 'Leo', 'Mia', 'Raj', 'Kim', 'Ivy', 'Kai', 'Ali', 'Uma'],
            adjs: [
                ['heavier', 'lighter'], ['taller', 'shorter'], ['older', 'younger'],
                ['stronger', 'weaker'], ['faster', 'slower'], ['richer', 'poorer'],
                ['louder', 'quieter'], ['braver', 'more timid'], ['friendlier', 'less friendly'],
                ['smarter', 'less smart'], ['happier', 'sadder']
            ],
            whom: 'Who'
        },
        {
            label: 'animals',
            items: ['Eagle', 'Tiger', 'Whale', 'Snake', 'Shark', 'Horse', 'Mouse', 'Bear',
                    'Hawk', 'Wolf', 'Frog', 'Deer', 'Otter', 'Raven', 'Lynx', 'Crane'],
            adjs: [
                ['heavier', 'lighter'], ['faster', 'slower'], ['larger', 'smaller'],
                ['louder', 'quieter'], ['stronger', 'weaker'], ['fiercer', 'gentler'],
                ['more agile', 'less agile'], ['older', 'younger']
            ],
            whom: 'Which'
        },
        {
            label: 'planets',
            items: ['Mars', 'Venus', 'Earth', 'Pluto', 'Saturn', 'Neptune', 'Mercury', 'Jupiter',
                    'Titan', 'Europa', 'Ceres', 'Io'],
            adjs: [
                ['larger', 'smaller'], ['hotter', 'colder'], ['denser', 'less dense'],
                ['closer to the Sun', 'farther from the Sun'], ['brighter', 'dimmer'],
                ['heavier', 'lighter'], ['older', 'younger']
            ],
            whom: 'Which'
        },
        {
            label: 'buildings',
            items: ['Tower A', 'Tower B', 'Block X', 'Block Y', 'Hall C', 'Hall D',
                    'Wing E', 'Wing F', 'Annex G', 'Annex H', 'Unit J', 'Unit K'],
            adjs: [
                ['taller', 'shorter'], ['wider', 'narrower'], ['older', 'newer'],
                ['more expensive', 'cheaper'], ['larger', 'smaller'],
                ['closer to the centre', 'farther from the centre']
            ],
            whom: 'Which'
        },
        {
            label: 'rivers',
            items: ['River Nile', 'River Amazon', 'River Thames', 'River Ganges', 'River Danube',
                    'River Rhine', 'River Volga', 'River Congo', 'River Mekong', 'River Seine'],
            adjs: [
                ['longer', 'shorter'], ['wider', 'narrower'], ['deeper', 'shallower'],
                ['faster-flowing', 'slower-flowing'], ['warmer', 'colder'], ['cleaner', 'murkier']
            ],
            whom: 'Which'
        },
        {
            label: 'metals',
            items: ['Gold', 'Silver', 'Iron', 'Copper', 'Tin', 'Lead', 'Zinc',
                    'Nickel', 'Platinum', 'Cobalt', 'Titanium', 'Aluminium'],
            adjs: [
                ['heavier', 'lighter'], ['harder', 'softer'], ['more expensive', 'cheaper'],
                ['shinier', 'duller'], ['denser', 'less dense'], ['more reactive', 'less reactive'],
                ['more conductive', 'less conductive']
            ],
            whom: 'Which'
        }
    ];

    const pick = arr => arr[Math.floor(Math.random() * arr.length)];
    const questions = [];
    const usedCombos = new Set();

    for (let i = 0; i < count; i++) {
        let group = pick(subjectGroups);
        let n1, n2, adjPair, comboKey;

        // Ensure uniqueness within this batch
        let attempts = 0;
        do {
            n1 = pick(group.items);
            n2 = pick(group.items);
            while (n1 === n2) n2 = pick(group.items);
            adjPair = pick(group.adjs);
            comboKey = `${n1}|${n2}|${adjPair[0]}`;
            attempts++;
        } while (usedCombos.has(comboKey) && attempts < 50);
        usedCombos.add(comboKey);

        let isFirstMore = Math.random() > 0.5;
        let adjStatement = isFirstMore ? adjPair[0] : adjPair[1];

        let askFirst = Math.random() > 0.5;
        let adjQuestion = askFirst ? adjPair[0] : adjPair[1];

        let answer;
        if (isFirstMore) {
            answer = askFirst ? n1 : n2;
        } else {
            answer = askFirst ? n2 : n1;
        }

        questions.push({
            type: 'reasoning',
            summary: `${n1} is ${adjStatement} than ${n2}. ${group.whom} is ${adjQuestion}?`,
            statement: `${n1} is ${adjStatement} than ${n2}.`,
            question: `${group.whom} is ${adjQuestion}?`,
            options: [n1, n2],
            answer: answer
        });
    }
    return questions;
}

function generatePerceptualSpeedQuestions(count) {
    // Confusable letter groups — make visual matching harder
    const easyLetters = 'abcdefghijklmnopqrstuvwxyz';
    const confusablePairs = [
        ['b', 'd'], ['p', 'q'], ['m', 'n'], ['u', 'v'], ['i', 'l'],
        ['c', 'e'], ['f', 't'], ['g', 'q'], ['h', 'n'], ['o', 'c'],
        ['r', 'n'], ['w', 'v'], ['s', 'z'], ['k', 'x']
    ];

    const questions = [];
    const usedSignatures = new Set();

    for (let i = 0; i < count; i++) {
        // GIA standard: always exactly 4 pairs
        let numPairs = 4;
        let pairs = [];
        let sameCount = 0;
        let displayStr = "";
        let useConfusable = Math.random() > 0.4; // 60% chance of trickier chars

        for (let j = 0; j < numPairs; j++) {
            let l1, l2;
            let isSame = Math.random() > 0.5;

            if (isSame) {
                // Matching pair
                l1 = easyLetters[Math.floor(Math.random() * easyLetters.length)];
                l2 = l1;
                // Randomize case independently
                l1 = Math.random() > 0.5 ? l1.toUpperCase() : l1;
                l2 = Math.random() > 0.5 ? l2.toUpperCase() : l2;
                sameCount++;
            } else {
                if (useConfusable && Math.random() > 0.5) {
                    // Use a visually confusable pair (tricky!)
                    let cp = confusablePairs[Math.floor(Math.random() * confusablePairs.length)];
                    l1 = Math.random() > 0.5 ? cp[0].toUpperCase() : cp[0];
                    l2 = Math.random() > 0.5 ? cp[1].toUpperCase() : cp[1];
                } else {
                    l1 = easyLetters[Math.floor(Math.random() * easyLetters.length)];
                    l2 = easyLetters[Math.floor(Math.random() * easyLetters.length)];
                    while (l2.toLowerCase() === l1.toLowerCase()) {
                        l2 = easyLetters[Math.floor(Math.random() * easyLetters.length)];
                    }
                    l1 = Math.random() > 0.5 ? l1.toUpperCase() : l1;
                    l2 = Math.random() > 0.5 ? l2.toUpperCase() : l2;
                }
            }
            pairs.push([l1, l2]);
            displayStr += `[${l1},${l2}] `;
        }

        // Deduplicate
        let sig = pairs.map(p => `${p[0]}${p[1]}`).join('|');
        if (usedSignatures.has(sig)) { i--; continue; }
        usedSignatures.add(sig);

        // GIA standard: options are always 0-4
        let opts = [];
        for (let k = 0; k <= 4; k++) opts.push(k.toString());

        questions.push({
            type: 'perceptual',
            summary: `Pairs: ${displayStr}`,
            pairs: pairs,
            options: opts,
            answer: sameCount.toString()
        });
    }
    return questions;
}

function generateNumberSpeedQuestions(count) {
    // Difficulty tiers matching real GIA progression
    const difficultyTiers = [
        // Tier 1: Easy warm-up (single digits, clear gaps)
        { minVal: 2, maxVal: 9, weight: 15 },
        // Tier 2: Standard (small two-digit, moderate gaps)
        { minVal: 3, maxVal: 19, weight: 25 },
        // Tier 3: Tricky (wider range, closer margins)
        { minVal: 5, maxVal: 30, weight: 25 },
        // Tier 4: Hard (large numbers, tight differences)
        { minVal: 10, maxVal: 50, weight: 20 },
        // Tier 5: Very hard (big spread, requires fast mental math)
        { minVal: 2, maxVal: 99, weight: 15 }
    ];

    // Build weighted pool
    let tierPool = [];
    difficultyTiers.forEach((tier, idx) => {
        for (let w = 0; w < tier.weight; w++) tierPool.push(idx);
    });

    const questions = [];
    for (let i = 0; i < count; i++) {
        let n1, n2, n3;
        let valid = false;
        let highest, lowest, remaining, distHigh, distLow;

        // Pick a difficulty tier
        let tierIdx = tierPool[Math.floor(Math.random() * tierPool.length)];
        let tier = difficultyTiers[tierIdx];

        while (!valid) {
            n1 = Math.floor(Math.random() * (tier.maxVal - tier.minVal + 1)) + tier.minVal;
            n2 = Math.floor(Math.random() * (tier.maxVal - tier.minVal + 1)) + tier.minVal;
            n3 = Math.floor(Math.random() * (tier.maxVal - tier.minVal + 1)) + tier.minVal;

            if (n1 === n2 || n1 === n3 || n2 === n3) continue;

            let arr = [n1, n2, n3].sort((a,b) => a-b);
            lowest = arr[0];
            remaining = arr[1];
            highest = arr[2];

            distLow = remaining - lowest;
            distHigh = highest - remaining;

            // Reject equidistant (no valid answer)
            if (distLow === distHigh) continue;

            // For harder tiers, prefer close margins (difference of 1-3)
            if (tierIdx >= 3) {
                let margin = Math.abs(distHigh - distLow);
                if (margin > 5) continue; // Force tricky close margins
            }

            valid = true;
        }

        let answer = distHigh > distLow ? highest : lowest;
        let displayObj = [n1, n2, n3].sort(() => Math.random() - 0.5);

        questions.push({
            type: 'numbers',
            summary: `Numbers: ${displayObj.join(', ')}`,
            numbers: displayObj,
            options: displayObj.map(n => n.toString()),
            answer: answer.toString()
        });
    }
    return questions;
}

function generateWordMeaningQuestions(count) {
    // Massive vocabulary pool organized by relationship type
    const synonymPairs = [
        // Basic
        ['happy', 'joyful'], ['sad', 'unhappy'], ['big', 'large'], ['small', 'tiny'],
        ['fast', 'quick'], ['slow', 'sluggish'], ['hot', 'warm'], ['cold', 'chilly'],
        ['below', 'under'], ['above', 'over'], ['smart', 'clever'], ['start', 'begin'],
        ['finish', 'end'], ['rich', 'wealthy'], ['poor', 'destitute'],
        // Intermediate
        ['angry', 'furious'], ['calm', 'serene'], ['brave', 'courageous'],
        ['scared', 'frightened'], ['tired', 'exhausted'], ['strong', 'powerful'],
        ['weak', 'feeble'], ['bright', 'luminous'], ['dark', 'gloomy'],
        ['old', 'ancient'], ['new', 'modern'], ['empty', 'vacant'], ['full', 'packed'],
        ['loud', 'noisy'], ['quiet', 'silent'], ['clean', 'spotless'], ['dirty', 'filthy'],
        // Advanced
        ['honest', 'truthful'], ['wicked', 'evil'], ['polite', 'courteous'],
        ['rude', 'impolite'], ['generous', 'charitable'], ['greedy', 'selfish'],
        ['humble', 'modest'], ['arrogant', 'conceited'], ['fragile', 'delicate'],
        ['tough', 'durable'], ['shy', 'timid'], ['bold', 'daring'],
        ['cruel', 'ruthless'], ['kind', 'compassionate'], ['strange', 'peculiar'],
        ['normal', 'ordinary'], ['vivid', 'vibrant'], ['dull', 'bland'],
        ['urgent', 'pressing'], ['trivial', 'insignificant'], ['rare', 'scarce'],
        ['common', 'frequent'], ['rigid', 'stiff'], ['flexible', 'supple'],
        ['complex', 'intricate'], ['simple', 'basic'], ['vast', 'immense'],
        ['narrow', 'slim'], ['shallow', 'superficial'], ['deep', 'profound']
    ];

    const antonymPairs = [
        ['up', 'down'], ['left', 'right'], ['in', 'out'], ['hot', 'cold'],
        ['fast', 'slow'], ['good', 'bad'], ['black', 'white'], ['day', 'night'],
        ['happy', 'sad'], ['big', 'small'], ['hard', 'soft'], ['light', 'dark'],
        ['open', 'closed'], ['young', 'old'], ['tall', 'short'], ['wide', 'narrow'],
        ['win', 'lose'], ['push', 'pull'], ['buy', 'sell'], ['give', 'take'],
        ['love', 'hate'], ['war', 'peace'], ['rich', 'poor'], ['early', 'late'],
        ['wet', 'dry'], ['safe', 'dangerous'], ['thick', 'thin'], ['rough', 'smooth'],
        ['brave', 'cowardly'], ['sweet', 'bitter'], ['sharp', 'blunt'], ['wild', 'tame'],
        ['noisy', 'quiet'], ['empty', 'full'], ['heavy', 'light'], ['awake', 'asleep'],
        ['success', 'failure'], ['attack', 'defend'], ['guilty', 'innocent'],
        ['visible', 'hidden'], ['accept', 'reject'], ['advance', 'retreat']
    ];

    // Unrelated words across multiple categories (the "odd one out" pool)
    const unrelatedWords = [
        // Objects
        'chair', 'table', 'lamp', 'clock', 'mirror', 'pillow', 'blanket', 'basket',
        // Food
        'apple', 'bread', 'cheese', 'grape', 'onion', 'pepper', 'lemon', 'walnut',
        // Animals
        'eagle', 'tiger', 'whale', 'spider', 'rabbit', 'parrot', 'salmon', 'beetle',
        // Nature
        'river', 'mountain', 'forest', 'ocean', 'desert', 'valley', 'meadow', 'glacier',
        // Body parts
        'elbow', 'ankle', 'wrist', 'shoulder', 'finger', 'knee',
        // Transport
        'bicycle', 'rocket', 'canoe', 'helicopter', 'tractor', 'ferry',
        // Materials
        'copper', 'marble', 'velvet', 'rubber', 'crystal', 'canvas',
        // Buildings
        'castle', 'barn', 'chapel', 'tunnel', 'bridge', 'lighthouse'
    ];

    const pick = arr => arr[Math.floor(Math.random() * arr.length)];
    const questions = [];
    const usedCombos = new Set();

    for (let i = 0; i < count; i++) {
        let useSynonym = Math.random() > 0.5;
        let pool = useSynonym ? synonymPairs : antonymPairs;
        let pair, oddWord, comboKey;

        let attempts = 0;
        do {
            pair = pick(pool);
            oddWord = pick(unrelatedWords);
            // Make sure the odd word is not accidentally the same as a pair word
            while (oddWord === pair[0] || oddWord === pair[1]) {
                oddWord = pick(unrelatedWords);
            }
            comboKey = `${pair[0]}|${pair[1]}|${oddWord}`;
            attempts++;
        } while (usedCombos.has(comboKey) && attempts < 50);
        usedCombos.add(comboKey);

        let options = [pair[0], pair[1], oddWord].sort(() => Math.random() - 0.5);

        questions.push({
            type: 'word',
            summary: `Words: ${options.join(', ')}`,
            options: options,
            answer: oddWord
        });
    }
    return questions;
}

function generateSpatialQuestions(count) {
    // Expanded pool of asymmetric characters that look distinct when mirrored
    const symbolPool = [
        'R', 'P', 'F', 'L', 'J', 'Q', 'G', 'K', 'N', 'S',
        'b', 'd', 'h', 'k', 'q', 'r', 'y', 'f'
    ];
    // Finer rotation angles for more visual challenge
    const rotationAngles = [0, 45, 90, 135, 180, 225, 270, 315];
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];

    const questions = [];
    for (let i = 0; i < count; i++) {
        // GIA standard: always exactly 2 pairs
        let numPairs = 2;
        let pairs = [];
        let matchCount = 0;

        for (let j = 0; j < numPairs; j++) {
            // Each pair can use a different symbol for variety
            let baseSymbol = pick(symbolPool);
            let isMatch = Math.random() > 0.5;
            let rot1 = pick(rotationAngles);
            let rot2 = pick(rotationAngles);
            let isMirror = !isMatch;

            pairs.push({
                symbol: baseSymbol,
                rot1: rot1,
                rot2: rot2,
                mirror: isMirror
            });
            if (isMatch) matchCount++;
        }

        // GIA standard: options are always 0-2
        let opts = ['0', '1', '2'];

        questions.push({
            type: 'spatial',
            summary: `Spatial (${numPairs} pairs): ${pairs.map(p => p.symbol).join(', ')}`,
            pairs: pairs,
            options: opts,
            answer: matchCount.toString()
        });
    }
    return questions;
}

// Generator map: questions are generated fresh & shuffled each time a task starts
const questionGenerators = {
    reasoning: () => generateReasoningQuestions(100),
    perceptual: () => generatePerceptualSpeedQuestions(100),
    numbers: () => generateNumberSpeedQuestions(100),
    word: () => generateWordMeaningQuestions(100),
    spatial: () => generateSpatialQuestions(100)
};

// Fisher-Yates shuffle for true randomization
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// --- STATE MANAGEMENT ---

// GIA Official Time Limits (Approximate based on standards)
const TASKS = [
    { id: 'reasoning', title: 'Task 1: Reasoning', timeLimit: 300 }, // 5 mins
    { id: 'perceptual', title: 'Task 2: Perceptual Speed', timeLimit: 240 }, // 4 mins
    { id: 'numbers', title: 'Task 3: Number Speed & Accuracy', timeLimit: 120 }, // 2 mins
    { id: 'word', title: 'Task 4: Word Meaning', timeLimit: 150 }, // 2.5 mins
    { id: 'spatial', title: 'Task 5: Spatial Visualisation', timeLimit: 120 } // 2 mins
];

let state = {
    mode: 'home', // home, intro, test, result, final
    selectedCategory: 'all',
    testMode: 'practice', // practice, exam
    
    taskQueue: [],
    currentTaskIndex: 0,
    currentQuestionIndex: 0,
    
    questions: [],
    answerHistory: [], // { summary, selected, correct, isCorrect }
    
    timeValue: 0, // seconds elapsed or remaining
    timerInterval: null,
    customTimeLimit: 0, // custom minutes set by user
    reasoningPhase: 'statement' // 'statement' or 'question' (Task 1 only)
};

// --- LOGIC ---

function startApp() {
    const categorySelect = document.getElementById('category-select').value;
    const modeSelect = document.querySelector('input[name="test-mode"]:checked').value;
    
    let customTime = 0;
    if (modeSelect === 'exam') {
        customTime = parseFloat(document.getElementById('custom-time-input').value) || 0;
    }
    
    state.selectedCategory = categorySelect;
    state.testMode = modeSelect;
    state.customTimeLimit = customTime;
    
    if (categorySelect === 'all') {
        state.taskQueue = [...TASKS];
    } else {
        state.taskQueue = [TASKS.find(t => t.id === categorySelect)];
    }
    
    state.currentTaskIndex = 0;
    state.answerHistory = [];
    state.mode = 'intro';
    render();
}
window.startApp = startApp;

function startTask() {
    const task = state.taskQueue[state.currentTaskIndex];
    // Generate fresh questions and shuffle them for every new test
    state.questions = shuffleArray(questionGenerators[task.id]());
    state.currentQuestionIndex = 0;
    state.reasoningPhase = 'statement';
    state.mode = 'test';
    
    // Timer setup
    if (state.testMode === 'practice') {
        state.timeValue = 0;
    } else {
        if (state.customTimeLimit > 0) {
            state.timeValue = Math.floor(state.customTimeLimit * 60);
        } else {
            state.timeValue = task.timeLimit;
        }
    }
    
    clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
        if (state.testMode === 'practice') {
            state.timeValue++;
        } else {
            state.timeValue--;
            if (state.timeValue <= 0) {
                clearInterval(state.timerInterval);
                finishTask();
            }
        }
        updateTimerDisplay();
    }, 1000);
    
    render();
}
window.startTask = startTask;

function updateTimerDisplay() {
    const timerEl = document.getElementById('timer-display');
    if (!timerEl) return;
    
    let mins = Math.floor(state.timeValue / 60);
    let secs = state.timeValue % 60;
    let formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    if (state.testMode === 'practice') {
        timerEl.innerText = `⏱ ${formatted}`;
    } else {
        timerEl.innerText = `⏳ ${formatted}`;
        if (state.timeValue <= 10) {
            timerEl.classList.add('warning');
        } else {
            timerEl.classList.remove('warning');
        }
    }
}

function handleAnswer(selected, correct) {
    const q = state.questions[state.currentQuestionIndex];
    
    state.answerHistory.push({
        summary: q.summary,
        selected: selected,
        correct: correct,
        isCorrect: selected === correct
    });
    
    state.currentQuestionIndex++;
    state.reasoningPhase = 'statement'; // Reset for next reasoning question
    if (state.currentQuestionIndex >= state.questions.length) {
        clearInterval(state.timerInterval);
        finishTask();
    } else {
        render(); // render next question
    }
}
window.handleAnswer = handleAnswer;

// Task 1 Reasoning: transition from statement phase to question phase
function reasoningReady() {
    state.reasoningPhase = 'question';
    render();
}
window.reasoningReady = reasoningReady;

function finishTask() {
    state.currentTaskIndex++;
    if (state.currentTaskIndex >= state.taskQueue.length) {
        state.mode = 'final';
    } else {
        state.mode = 'intro';
    }
    render();
}

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${mins}m ${secs}s`;
}

window.toggleCustomTime = function(show) {
    const el = document.getElementById('custom-time-group');
    if (el) {
        el.style.display = show ? 'flex' : 'none';
    }
}

// --- UI RENDERERS ---

const appContainer = document.getElementById('app-container');

function render() {
    appContainer.innerHTML = '';

    if (state.mode === 'home') {
        appContainer.innerHTML = `
            <div class="center-content">
                <h1>GIA Practice Assessment</h1>
                <p>Configure your test session below.</p>
                
                <div class="setup-form">
                    <div class="form-group">
                        <label>Select Category</label>
                        <select id="category-select">
                            <option value="all">All Sections (Full Test)</option>
                            <option value="reasoning">Task 1: Reasoning</option>
                            <option value="perceptual">Task 2: Perceptual Speed</option>
                            <option value="numbers">Task 3: Number Speed & Accuracy</option>
                            <option value="word">Task 4: Word Meaning</option>
                            <option value="spatial">Task 5: Spatial Visualisation</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Test Mode</label>
                        <div class="radio-group">
                            <label class="radio-label">
                                <input type="radio" name="test-mode" value="practice" onchange="window.toggleCustomTime(false)" checked>
                                Practice (Stopwatch only)
                            </label>
                            <label class="radio-label">
                                <input type="radio" name="test-mode" value="exam" onchange="window.toggleCustomTime(true)">
                                Exam (Strict Timers)
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group" id="custom-time-group" style="display: none; margin-top: 10px;">
                        <label>Time Limit per task (minutes)</label>
                        <input type="number" id="custom-time-input" min="0" step="0.5" value="0" style="padding: 10px; border-radius: 6px; border: 1px solid #ccc; width: 100%; font-size: 16px;">
                        <small style="color: #666; margin-top: 5px;">Leave at 0 to use standard GIA times.</small>
                    </div>
                    
                    <button class="btn" onclick="startApp()">Start Session</button>
                </div>
            </div>
        `;
        return;
    }
    
    const task = state.taskQueue[state.currentTaskIndex];

    // Header for active test screens
    if (state.mode === 'test') {
        const header = document.createElement('div');
        header.className = 'header-info';
        
        let qInfo = `<span>${task.title}</span>`;
        let pInfo = `<span>Question: ${state.currentQuestionIndex + 1}</span>`;
        let tInfo = `<span id="timer-display" class="timer"></span>`;
        
        header.innerHTML = `${qInfo} ${pInfo} ${tInfo}`;
        appContainer.appendChild(header);
        
        // Wait a tick to update the timer display immediately after DOM insert
        setTimeout(updateTimerDisplay, 0);
    }

    const screen = document.createElement('div');
    screen.className = 'screen active';

    if (state.mode === 'intro') {
        let timeText;
        if (state.testMode === 'exam') {
            let limit = state.customTimeLimit > 0 ? Math.floor(state.customTimeLimit * 60) : task.timeLimit;
            timeText = `Strict time limit: <strong>${formatTime(limit)}</strong>.`;
        } else {
            timeText = `Practice mode: Untimed.`;
        }
            
        screen.innerHTML = `
            <div class="center-content">
                <h1>${task.title}</h1>
                <p>You are about to start a section with 100 available questions.</p>
                <p>${timeText}</p>
                <p>Remember, both speed and accuracy are equally important. Work as quickly and accurately as possible.</p>
                <button class="btn" onclick="startTask()">Begin Task</button>
            </div>
        `;
    } else if (state.mode === 'test') {
        const q = state.questions[state.currentQuestionIndex];
        const qArea = document.createElement('div');
        qArea.className = 'center-content';
        
        // ─── TASK 1: REASONING (Two-phase: Statement → Click → Question) ───
        if (q.type === 'reasoning') {
            if (state.reasoningPhase === 'statement') {
                // Phase 1: Show ONLY the statement. User clicks when ready.
                qArea.innerHTML = `
                    <div class="reasoning-statement">${q.statement}</div>
                    <p style="color:#888; margin-top: 20px;">Study the statement above. Click when ready.</p>
                    <button class="btn" onclick="reasoningReady()" style="margin-top: 20px;">Ready</button>
                `;
            } else {
                // Phase 2: Statement DISAPPEARS. Show question + two answer options.
                qArea.innerHTML = `<div class="question-area">${q.question}</div>`;
                const optionsArea = document.createElement('div');
                optionsArea.className = 'options-area';
                q.options.forEach(opt => {
                    const btn = document.createElement('div');
                    btn.className = 'option-box';
                    btn.innerText = opt;
                    btn.onclick = () => handleAnswer(opt, q.answer);
                    optionsArea.appendChild(btn);
                });
                qArea.appendChild(optionsArea);
            }

        // ─── TASK 2: PERCEPTUAL SPEED (4 pairs, answer 0-4) ───
        } else if (q.type === 'perceptual') {
            let html = '<div class="question-area">How many pairs contain the same letter?</div><div class="perceptual-pairs">';
            q.pairs.forEach(p => {
                html += `<div class="perceptual-pair">${p[0]}<br>${p[1]}</div>`;
            });
            html += '</div>';
            qArea.innerHTML = html;
            const optionsArea = document.createElement('div');
            optionsArea.className = 'options-area';
            q.options.forEach(opt => {
                const btn = document.createElement('div');
                btn.className = 'option-box';
                btn.innerText = opt;
                btn.onclick = () => handleAnswer(opt, q.answer);
                optionsArea.appendChild(btn);
            });
            qArea.appendChild(optionsArea);

        // ─── TASK 3: NUMBER SPEED & ACCURACY (3 clickable numbers) ───
        } else if (q.type === 'numbers') {
            qArea.innerHTML = '';
            const optionsArea = document.createElement('div');
            optionsArea.className = 'options-area';
            q.numbers.forEach(n => {
                const btn = document.createElement('div');
                btn.className = 'option-box';
                btn.innerText = n;
                btn.onclick = () => handleAnswer(n.toString(), q.answer);
                optionsArea.appendChild(btn);
            });
            qArea.appendChild(optionsArea);

        // ─── TASK 4: WORD MEANING (3 clickable words — click the odd one) ───
        } else if (q.type === 'word') {
            qArea.innerHTML = '';
            const optionsArea = document.createElement('div');
            optionsArea.className = 'options-area';
            q.options.forEach(opt => {
                const btn = document.createElement('div');
                btn.className = 'option-box';
                btn.innerText = opt;
                btn.onclick = () => handleAnswer(opt, q.answer);
                optionsArea.appendChild(btn);
            });
            qArea.appendChild(optionsArea);

        // ─── TASK 5: SPATIAL VISUALISATION (2 pairs, answer 0-2) ───
        } else if (q.type === 'spatial') {
            let html = '<div class="spatial-pairs">';
            q.pairs.forEach(p => {
                html += `<div class="spatial-pair">
                    <div class="spatial-symbol" style="transform: rotate(${p.rot1}deg)">${p.symbol}</div>
                    <div class="spatial-symbol" style="transform: rotate(${p.rot2}deg) ${p.mirror ? 'scaleX(-1)' : ''}">${p.symbol}</div>
                </div>`;
            });
            html += '</div>';
            qArea.innerHTML = html;
            const optionsArea = document.createElement('div');
            optionsArea.className = 'options-area';
            q.options.forEach(opt => {
                const btn = document.createElement('div');
                btn.className = 'option-box';
                btn.innerText = opt;
                btn.onclick = () => handleAnswer(opt, q.answer);
                optionsArea.appendChild(btn);
            });
            qArea.appendChild(optionsArea);
        }
        
        screen.appendChild(qArea);

    } else if (state.mode === 'final') {
        let correctCount = state.answerHistory.filter(a => a.isCorrect).length;
        let totalAns = state.answerHistory.length;
        let accuracy = totalAns > 0 ? Math.round((correctCount / totalAns) * 100) : 0;
        
        let tableRows = state.answerHistory.map((ans, idx) => `
            <tr class="${ans.isCorrect ? 'correct-row' : 'incorrect-row'}">
                <td>${idx + 1}</td>
                <td>${ans.summary}</td>
                <td>${ans.selected}</td>
                <td>${ans.correct}</td>
                <td class="status-icon ${ans.isCorrect ? 'correct' : 'incorrect'}">
                    ${ans.isCorrect ? '✔ Correct' : '✘ Incorrect'}
                </td>
            </tr>
        `).join('');

        screen.innerHTML = `
            <div class="results-container">
                <div class="results-summary">
                    <h2>Session Complete</h2>
                    <p>Total Attempted: <strong>${totalAns}</strong> | Correct: <strong>${correctCount}</strong> | Accuracy: <strong>${accuracy}%</strong></p>
                </div>
                <div class="results-table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Question Summary</th>
                                <th>Your Answer</th>
                                <th>Correct Answer</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows.length > 0 ? tableRows : '<tr><td colspan="5" style="text-align:center;">No questions answered.</td></tr>'}
                        </tbody>
                    </table>
                </div>
                <button class="btn" style="margin-top: 0;" onclick="location.reload()">Return to Home</button>
            </div>
        `;
    }

    appContainer.appendChild(screen);
}

// Initial render
render();
