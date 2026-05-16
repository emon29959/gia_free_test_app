// GIA Assessment Practice App

function calculateGIAScore(answers) {
    let score = 0;
    const penalties = {
        'reasoning': 1.0,
        'perceptual': 0.25,
        'numbers': 0.5,
        'word': 0.5,
        'spatial': 0.5
    };
    answers.forEach(ans => {
        if (ans.isCorrect) {
            score += 1;
        } else {
            let penalty = penalties[ans.taskId] || 0.5;
            score -= penalty;
        }
    });
    return Number(score.toFixed(2));
}

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
        },
        {
            label: 'cities',
            items: ['London', 'Paris', 'Tokyo', 'Berlin', 'Cairo', 'Sydney', 'Dubai',
                    'Rome', 'Oslo', 'Lima', 'Seoul', 'Lagos', 'Delhi', 'Boston'],
            adjs: [
                ['larger', 'smaller'], ['more populated', 'less populated'],
                ['older', 'newer'], ['more expensive', 'cheaper'],
                ['hotter', 'colder'], ['noisier', 'quieter'],
                ['more polluted', 'cleaner'], ['more touristy', 'less touristy']
            ],
            whom: 'Which'
        },
        {
            label: 'gems',
            items: ['Diamond', 'Ruby', 'Emerald', 'Sapphire', 'Opal', 'Topaz',
                    'Garnet', 'Jade', 'Amber', 'Pearl', 'Quartz', 'Onyx'],
            adjs: [
                ['harder', 'softer'], ['rarer', 'more common'], ['more expensive', 'cheaper'],
                ['shinier', 'duller'], ['heavier', 'lighter'], ['more transparent', 'more opaque'],
                ['more colourful', 'plainer']
            ],
            whom: 'Which'
        },
        {
            label: 'instruments',
            items: ['Piano', 'Guitar', 'Violin', 'Drums', 'Flute', 'Trumpet',
                    'Harp', 'Cello', 'Banjo', 'Organ', 'Tuba', 'Oboe'],
            adjs: [
                ['louder', 'quieter'], ['heavier', 'lighter'], ['higher-pitched', 'lower-pitched'],
                ['larger', 'smaller'], ['more expensive', 'cheaper'],
                ['older', 'newer'], ['more common', 'rarer']
            ],
            whom: 'Which'
        },
        {
            label: 'sports',
            items: ['Football', 'Tennis', 'Cricket', 'Boxing', 'Swimming', 'Golf',
                    'Rugby', 'Hockey', 'Archery', 'Fencing', 'Rowing', 'Judo'],
            adjs: [
                ['more popular', 'less popular'], ['faster-paced', 'slower-paced'],
                ['more dangerous', 'safer'], ['older', 'newer'],
                ['more physical', 'less physical'], ['more expensive', 'cheaper'],
                ['more strategic', 'less strategic']
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
    // All numbers are randomly generated in range 2–99
    // 60% of questions have tight margins (≤3) for extra challenge
    const questions = [];
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < count; i++) {
        let n1, n2, n3;
        let valid = false;
        let highest, lowest, remaining, distHigh, distLow;
        const forceTight = Math.random() < 0.6; // 60% tight-margin questions

        while (!valid) {
            n1 = rand(2, 99);
            n2 = rand(2, 99);
            n3 = rand(2, 99);

            if (n1 === n2 || n1 === n3 || n2 === n3) continue;

            let arr = [n1, n2, n3].sort((a,b) => a-b);
            lowest = arr[0];
            remaining = arr[1];
            highest = arr[2];

            distLow = remaining - lowest;
            distHigh = highest - remaining;

            // Reject equidistant (no valid answer)
            if (distLow === distHigh) continue;

            // For tight questions, force the margin between distances to be ≤3
            if (forceTight) {
                let margin = Math.abs(distHigh - distLow);
                if (margin > 3) continue;
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
        ['narrow', 'slim'], ['shallow', 'superficial'], ['deep', 'profound'],
        // Expanded set — ensures no repeats across sessions
        ['wealthy', 'affluent'], ['absurd', 'ridiculous'], ['hostile', 'antagonistic'],
        ['genuine', 'authentic'], ['lethal', 'deadly'], ['tranquil', 'peaceful'],
        ['stubborn', 'obstinate'], ['prompt', 'punctual'], ['soggy', 'damp'],
        ['rapid', 'swift'], ['hazardous', 'perilous'], ['plentiful', 'abundant'],
        ['cunning', 'crafty'], ['cheerful', 'merry'], ['gloomy', 'dreary'],
        ['fertile', 'productive'], ['barren', 'desolate'], ['miniature', 'diminutive'],
        ['colossal', 'enormous'], ['precise', 'accurate'], ['vague', 'ambiguous'],
        ['grateful', 'thankful'], ['hostile', 'unfriendly'], ['jubilant', 'elated'],
        ['weary', 'fatigued'], ['hideous', 'ugly'], ['gorgeous', 'beautiful'],
        ['nimble', 'agile'], ['clumsy', 'awkward'], ['sincere', 'earnest'],
        ['deceitful', 'dishonest'], ['thrifty', 'frugal'], ['lavish', 'extravagant'],
        ['renowned', 'famous'], ['obscure', 'unknown'], ['lethal', 'fatal'],
        ['benign', 'harmless'], ['candid', 'frank'], ['reserved', 'restrained']
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
        ['visible', 'hidden'], ['accept', 'reject'], ['advance', 'retreat'],
        // Expanded set
        ['calm', 'anxious'], ['polite', 'rude'], ['generous', 'stingy'],
        ['honest', 'deceitful'], ['humble', 'proud'], ['create', 'destroy'],
        ['expand', 'shrink'], ['arrive', 'depart'], ['borrow', 'lend'],
        ['ancient', 'modern'], ['abundant', 'scarce'], ['temporary', 'permanent'],
        ['artificial', 'natural'], ['domestic', 'foreign'], ['amateur', 'professional'],
        ['optional', 'mandatory'], ['complex', 'simple'], ['fragile', 'sturdy'],
        ['genuine', 'fake'], ['maximum', 'minimum'], ['majority', 'minority'],
        ['frequent', 'rare'], ['interior', 'exterior'], ['superior', 'inferior'],
        ['praise', 'criticise'], ['reward', 'punish'], ['export', 'import'],
        ['connect', 'disconnect']
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
        'castle', 'barn', 'chapel', 'tunnel', 'bridge', 'lighthouse',
        // Expanded categories — weather, tools, clothing, music, science
        'thunder', 'rainbow', 'tornado', 'hailstone', 'monsoon', 'blizzard',
        'hammer', 'chisel', 'pliers', 'wrench', 'shovel', 'anvil',
        'jacket', 'sandal', 'mitten', 'bonnet', 'apron', 'scarf',
        'violin', 'trumpet', 'cymbal', 'accordion', 'harmonica', 'xylophone',
        'molecule', 'neutron', 'prism', 'magnet', 'circuit', 'pendulum',
        'anchor', 'compass', 'lantern', 'goblet', 'telescope', 'sundial'
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

function generateSpatialQuestions(count, includeExtras) {
    // Base pool: ONLY truly asymmetric characters
    // Removed: B,C,D,E,K (horizontal axis symmetry — mirror+180° = original)
    // Removed: N,S,Z (180° rotational symmetry — mirror looks like rotation)
    // Removed: a,e,n,s,z (same issues in lowercase)
    // Removed: 3 (horizontally symmetric — top/bottom bumps are mirror images)
    // Removed: 6 (rotational symmetry with 9 — 6 rotated 180° = 9; keep only one)
    const basePool = [
        'R', 'P', 'F', 'L', 'J', 'Q', 'G',
        'b', 'd', 'f', 'g', 'h', 'j', 'k', 'p', 'q', 'r', 'y',
        '2', '4', '5', '7', '9'
    ];
    // Extra pool: symbols and geometric shapes (all asymmetric)
    const extraPool = [
        '?', '&', '#', '%', '@', '\u00A3', '\u00A7', '\u00B6',
        '\u2190', '\u2191', '\u2196', '\u2197',
        '\u25B7', '\u25C1',
        '\u2702', '\u2709', '\u260E', '\u2615',
        '\u2692', '\u2694', '\u26A1',
        '\u2764', '\u266A', '\u266B', '\u2605',
        '\u2708', '\u2602', '\u2690', '\u2691'
    ];
    const symbolPool = includeExtras ? [...basePool, ...extraPool] : basePool;
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
            let rot1 = pick(rotationAngles);
            let rot2 = pick(rotationAngles);

            // Independent mirror state for each symbol
            // Match = both same state (normal-normal OR mirrored-mirrored)
            // No match = different states (normal-mirrored OR mirrored-normal)
            let isMatch = Math.random() > 0.5;
            let mirror1, mirror2;
            if (isMatch) {
                // Both same: either both normal or both mirrored
                let bothMirrored = Math.random() > 0.5;
                mirror1 = bothMirrored;
                mirror2 = bothMirrored;
            } else {
                // Different: one mirrored, one not (random which)
                mirror1 = Math.random() > 0.5;
                mirror2 = !mirror1;
            }

            pairs.push({
                symbol: baseSymbol,
                rot1: rot1,
                rot2: rot2,
                mirror1: mirror1,
                mirror2: mirror2
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
    spatial: () => generateSpatialQuestions(100, state.includeExtraSymbols)
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

let sessionHistory = []; // Array of completed test result snapshots

let state = {
    mode: 'home', // home, intro, test, result, final, history, historyDetail
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
    reasoningPhase: 'statement', // 'statement' or 'question' (Task 1 only)
    includeExtraSymbols: true, // include symbols & shapes in spatial questions
    viewingHistoryIndex: -1, // index into sessionHistory for detail view
    sessionStartTime: null // track when the session started
};

// --- LOGIC ---

function startApp() {
    const categorySelect = document.getElementById('category-select').value;
    const modeSelect = document.querySelector('input[name="test-mode"]:checked').value;
    
    let customTime = 0;
    if (modeSelect === 'exam') {
        customTime = parseFloat(document.getElementById('custom-time-input').value) || 0;
    }
    
    const extraSymCb = document.getElementById('extra-symbols-check');
    state.selectedCategory = categorySelect;
    state.testMode = modeSelect;
    state.customTimeLimit = customTime;
    state.includeExtraSymbols = extraSymCb ? extraSymCb.checked : true;
    
    if (categorySelect === 'all') {
        state.taskQueue = [...TASKS];
    } else {
        state.taskQueue = [TASKS.find(t => t.id === categorySelect)];
    }
    
    state.currentTaskIndex = 0;
    state.answerHistory = [];
    state.sessionStartTime = null;
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
    if (!state.sessionStartTime) state.sessionStartTime = Date.now();
    
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
        isCorrect: selected === correct,
        questionData: JSON.parse(JSON.stringify(q)), // store full question for review modal
        taskId: state.taskQueue[state.currentTaskIndex].id,
        taskTitle: state.taskQueue[state.currentTaskIndex].title
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

// --- QUESTION REVIEW MODAL ---

function showQuestionModal(idx, historyAnswers) {
    const answers = historyAnswers || state.answerHistory;
    const ans = answers[idx];
    const q = ans.questionData;
    if (!q) return;

    // Remove existing modal if any
    closeModal();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'question-modal';
    overlay.onclick = (e) => { if (e.target === overlay) closeModal(); };

    let questionContent = '';

    if (q.type === 'reasoning') {
        questionContent = `
            <div class="modal-q-label">Statement</div>
            <div class="modal-q-statement">${q.statement}</div>
            <div class="modal-q-label" style="margin-top:16px;">Question</div>
            <div class="modal-q-text">${q.question}</div>
        `;
    } else if (q.type === 'perceptual') {
        let pairsHtml = '<div class="modal-pairs">';
        q.pairs.forEach(p => {
            let isMatch = p[0].toLowerCase() === p[1].toLowerCase();
            pairsHtml += `<div class="modal-pair ${isMatch ? 'match' : ''}">${p[0]}<br>${p[1]}</div>`;
        });
        pairsHtml += '</div>';
        questionContent = `
            <div class="modal-q-label">How many pairs contain the same letter?</div>
            ${pairsHtml}
        `;
    } else if (q.type === 'numbers') {
        questionContent = `
            <div class="modal-q-label">Which number is furthest from the middle?</div>
            <div class="modal-numbers">${q.numbers.map(n => `<span>${n}</span>`).join('')}</div>
        `;
    } else if (q.type === 'word') {
        questionContent = `
            <div class="modal-q-label">Which word is the odd one out?</div>
            <div class="modal-words">${q.options.map(w => `<span class="${w === ans.correct ? 'odd-word' : ''}">${w}</span>`).join('')}</div>
        `;
    } else if (q.type === 'spatial') {
        let spHtml = '<div class="modal-spatial">';
        q.pairs.forEach(p => {
            let isMatch = p.mirror1 === p.mirror2;
            spHtml += `<div class="modal-sp-pair ${isMatch ? 'match' : ''}">
                <div style="transform: rotate(${p.rot1}deg) ${p.mirror1 ? 'scaleX(-1)' : ''}; font-size: 36px; font-weight: bold;">${p.symbol}</div>
                <div style="transform: rotate(${p.rot2}deg) ${p.mirror2 ? 'scaleX(-1)' : ''}; font-size: 36px; font-weight: bold;">${p.symbol}</div>
            </div>`;
        });
        spHtml += '</div>';
        questionContent = `
            <div class="modal-q-label">How many pairs match (rotation only)?</div>
            ${spHtml}
        `;
    }

    const modal = document.createElement('div');
    modal.className = 'modal-card';
    modal.innerHTML = `
        <button class="modal-close" onclick="closeModal()">✕</button>
        <div class="modal-header">Question ${idx + 1}</div>
        <div class="modal-body">
            ${questionContent}
            <div class="modal-answers">
                <div class="modal-ans-item ${ans.isCorrect ? 'correct' : 'wrong'}">
                    <span class="modal-ans-label">Your answer</span>
                    <span class="modal-ans-value">${ans.selected}</span>
                </div>
                <div class="modal-ans-item correct">
                    <span class="modal-ans-label">Correct answer</span>
                    <span class="modal-ans-value">${ans.correct}</span>
                </div>
            </div>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    // Animate in
    requestAnimationFrame(() => overlay.classList.add('visible'));
}
window.showQuestionModal = showQuestionModal;

function closeModal() {
    const existing = document.getElementById('question-modal');
    if (existing) {
        existing.classList.remove('visible');
        setTimeout(() => existing.remove(), 200);
    }
}
window.closeModal = closeModal;

// Task 1 Reasoning: transition from statement phase to question phase
function reasoningReady() {
    state.reasoningPhase = 'question';
    render();
}
window.reasoningReady = reasoningReady;

function finishTask() {
    state.currentTaskIndex++;
    if (state.currentTaskIndex >= state.taskQueue.length) {
        // Save this completed session to history
        const correctCount = state.answerHistory.filter(a => a.isCorrect).length;
        const totalAns = state.answerHistory.length;
        const elapsedMs = state.sessionStartTime ? Date.now() - state.sessionStartTime : 0;
        const elapsedSec = Math.round(elapsedMs / 1000);
        sessionHistory.push({
            timestamp: new Date(),
            category: state.selectedCategory === 'all' ? 'Full Test' : state.taskQueue[0].title,
            mode: state.testMode,
            total: totalAns,
            correct: correctCount,
            accuracy: totalAns > 0 ? Math.round((correctCount / totalAns) * 100) : 0,
            duration: elapsedSec,
            answerHistory: JSON.parse(JSON.stringify(state.answerHistory))
        });
        state.mode = 'final';
    } else {
        state.mode = 'intro';
    }
    render();
}

function showHistory() {
    state.mode = 'history';
    render();
}
window.showHistory = showHistory;

function viewHistoryDetail(idx) {
    state.viewingHistoryIndex = idx;
    state.mode = 'historyDetail';
    render();
}
window.viewHistoryDetail = viewHistoryDetail;

function deleteHistoryItem(idx) {
    if (!confirm('Delete this result?')) return;
    sessionHistory.splice(idx, 1);
    render();
}
window.deleteHistoryItem = deleteHistoryItem;

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

// SVG Icons
const HOME_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
const BRAIN_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 002 2h4a2 2 0 002-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7z" fill="currentColor"/><path d="M9 21h6M10 21v1a1 1 0 001 1h2a1 1 0 001-1v-1" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`;

function goHome() {
    if (state.mode === 'test' || state.mode === 'intro') {
        if (!confirm('Are you sure? Your current progress will be lost.')) return;
    }
    clearInterval(state.timerInterval);
    state.mode = 'home';
    state.answerHistory = [];
    state.currentTaskIndex = 0;
    state.currentQuestionIndex = 0;
    state.reasoningPhase = 'statement';
    state.sessionStartTime = null;
    render();
}
window.goHome = goHome;

function retest() {
    // Restart with the exact same configuration
    clearInterval(state.timerInterval);
    if (state.selectedCategory === 'all') {
        state.taskQueue = [...TASKS];
    } else {
        state.taskQueue = [TASKS.find(t => t.id === state.selectedCategory)];
    }
    state.currentTaskIndex = 0;
    state.currentQuestionIndex = 0;
    state.answerHistory = [];
    state.reasoningPhase = 'statement';
    state.sessionStartTime = null;
    state.mode = 'intro';
    render();
}
window.retest = retest;

function goBack() {
    // Navigate to the logical previous screen
    switch (state.mode) {
        case 'history':
            goHome();
            break;
        case 'historyDetail':
            state.mode = 'history';
            render();
            break;
        case 'intro':
            // No confirm needed — user hasn't started answering yet
            clearInterval(state.timerInterval);
            state.mode = 'home';
            state.answerHistory = [];
            state.currentTaskIndex = 0;
            state.currentQuestionIndex = 0;
            state.reasoningPhase = 'statement';
            render();
            break;
        case 'final':
            goHome();
            break;
        default:
            goHome();
    }
}
window.goBack = goBack;

function injectHomeButton() {
    const nav = document.createElement('div');
    nav.className = 'nav-buttons';

    // Back button — show on all screens except test (exam running)
    if (state.mode !== 'test') {
        const backBtn = document.createElement('button');
        backBtn.className = 'back-btn';
        backBtn.setAttribute('title', 'Go Back');
        backBtn.innerHTML = '← Back';
        backBtn.onclick = goBack;
        nav.appendChild(backBtn);
    }

    const btn = document.createElement('button');
    btn.className = 'home-btn';
    btn.setAttribute('title', 'Go Home');
    btn.innerHTML = HOME_SVG;
    btn.onclick = goHome;
    nav.appendChild(btn);

    appContainer.appendChild(nav);
}

function buildProgressDots() {
    if (state.taskQueue.length <= 1) return '';
    let dots = '<div class="progress-dots">';
    for (let i = 0; i < state.taskQueue.length; i++) {
        let cls = 'progress-dot';
        if (i < state.currentTaskIndex) cls += ' done';
        else if (i === state.currentTaskIndex) cls += ' active';
        dots += `<div class="${cls}"></div>`;
    }
    dots += '</div>';
    return dots;
}


// --- TIPS & SPATIAL TOOL ---

let selectedChar = 'R';

function toggleTips() {
    const panels = document.getElementById('tips-panels');
    const arrow = document.getElementById('tips-arrow');
    if (!panels) return;
    if (panels.style.display === 'none') {
        panels.style.display = 'flex';
        if (arrow) arrow.textContent = '▲';
    } else {
        panels.style.display = 'none';
        if (arrow) arrow.textContent = '▼';
    }
}
window.toggleTips = toggleTips;

function toggleTipPanel(headerBtn) {
    const body = headerBtn.nextElementSibling;
    const chevron = headerBtn.querySelector('.tip-chevron');
    if (!body) return;
    const isOpen = body.classList.contains('open');
    // Close all others
    document.querySelectorAll('.tip-panel-body').forEach(b => b.classList.remove('open'));
    document.querySelectorAll('.tip-chevron').forEach(c => c.classList.remove('open'));
    if (!isOpen) {
        body.classList.add('open');
        if (chevron) chevron.classList.add('open');
    }
}
window.toggleTipPanel = toggleTipPanel;

function buildCharGrid() {
    const grid = document.getElementById('char-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const sections = [
        { label: 'A–Z', chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
        { label: 'a–z', chars: 'abcdefghijklmnopqrstuvwxyz' },
        { label: '0–9', chars: '123456789' },
        { label: 'Symbols', chars: '?&#%@\u00A3\u00A7\u00B6' },
        { label: 'Shapes', chars: '\u2190\u2191\u2196\u2197\u25B7\u25C1\u25B3\u25BD\u2702\u2709\u260E\u2615\u269A\u2692\u2694\u26A1\u2764\u266A\u266B\u2605\u2708\u2602\u2690\u2691' }
    ];

    sections.forEach(sec => {
        const divider = document.createElement('div');
        divider.className = 'char-grid-divider';
        divider.textContent = sec.label;
        grid.appendChild(divider);
        for (let ch of sec.chars) {
            const cell = document.createElement('span');
            cell.className = 'char-cell' + (ch === selectedChar ? ' active' : '');
            cell.textContent = ch;
            cell.onclick = () => selectChar(ch);
            grid.appendChild(cell);
        }
    });
}

function selectChar(ch) {
    selectedChar = ch;
    document.querySelectorAll('.char-cell').forEach(c => {
        c.classList.toggle('active', c.textContent === ch);
    });
    // Reset both sliders
    const ns = document.getElementById('sp-normal-slider');
    const ms = document.getElementById('sp-mirror-slider');
    if (ns) ns.value = 0;
    if (ms) ms.value = 0;
    updateDualPreview();
}
window.selectChar = selectChar;

function updateDualPreview() {
    const normalSlider = document.getElementById('sp-normal-slider');
    const mirrorSlider = document.getElementById('sp-mirror-slider');
    const normalDeg = document.getElementById('sp-normal-deg');
    const mirrorDeg = document.getElementById('sp-mirror-deg');
    const normalChar = document.getElementById('sp-normal-char');
    const mirrorChar = document.getElementById('sp-mirror-char');

    if (!normalSlider || !mirrorSlider || !normalChar || !mirrorChar) return;

    const nDeg = parseInt(normalSlider.value);
    const mDeg = parseInt(mirrorSlider.value);

    if (normalDeg) normalDeg.textContent = nDeg;
    if (mirrorDeg) mirrorDeg.textContent = mDeg;

    normalChar.textContent = selectedChar;
    normalChar.style.transform = `rotate(${nDeg}deg)`;

    mirrorChar.textContent = selectedChar;
    mirrorChar.style.transform = `rotate(${mDeg}deg) scaleX(-1)`;
}
window.updateDualPreview = updateDualPreview;

function render() {
    appContainer.innerHTML = '';

    // ═══════════ HOME SCREEN ═══════════
    if (state.mode === 'home') {
        appContainer.innerHTML = `
            <div class="home-scroll">
                <div class="center-content" style="flex-grow:0;">
                <div class="brand">
                    <div class="brand-icon">${BRAIN_SVG}</div>
                </div>
                <h1>GIA Practice Assessment</h1>
                <p class="subtitle">Thomas International — General Intelligence Assessment</p>
                </div>
                
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
                                Practice
                            </label>
                            <label class="radio-label">
                                <input type="radio" name="test-mode" value="exam" onchange="window.toggleCustomTime(true)">
                                Exam
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group" id="custom-time-group" style="display: none;">
                        <label>Custom Time Limit (minutes)</label>
                        <input type="number" id="custom-time-input" min="0" step="0.5" value="0">
                        <small style="color: var(--text-muted); margin-top: 4px; font-size: 12px;">Leave at 0 for standard GIA times.</small>
                    </div>

                    <div class="form-group">
                        <label class="extra-sym-label"><input type="checkbox" id="extra-symbols-check" checked> Include symbols & shapes in Spatial questions</label>
                        <small style="color: var(--text-muted); margin-top: 2px; font-size: 11px;">Uncheck for letters & numbers only (standard GIA).</small>
                    </div>
                    
                    <button class="btn" onclick="startApp()">Start Session</button>
                    <button class="btn btn-history" onclick="showHistory()">
                        📋 Test Results
                        ${sessionHistory.length > 0 ? '<span class="history-badge">' + sessionHistory.length + '</span>' : ''}
                    </button>
                </div>

                <div class="tips-section">
                    <button class="tips-toggle-btn" onclick="toggleTips()"><span>💡 Tips & Tricks</span><span id="tips-arrow" class="tips-arrow">▼</span></button>
                    <div id="tips-panels" class="tips-panels" style="display:none;">
                        <div class="tip-panel"><button class="tip-panel-header" onclick="toggleTipPanel(this)"><span>Task 1: Reasoning</span><span class="tip-chevron">›</span></button><div class="tip-panel-body"><ul>
                            <li><strong>Memorise the relationship</strong> — "A is taller than B" means B is shorter.</li>
                            <li><strong>One read only</strong> — The statement disappears. Think "A &gt; B" instantly.</li>
                            <li><strong>Watch for negatives</strong> — "Who is NOT heavier?" flips the answer.</li>
                            <li><strong>Label mentally</strong> — Subject1=MORE, Subject2=LESS.</li>
                            <li><strong>Target</strong> — Under 3 seconds per question.</li>
                        </ul></div></div>
                        <div class="tip-panel"><button class="tip-panel-header" onclick="toggleTipPanel(this)"><span>Task 2: Perceptual Speed</span><span class="tip-chevron">›</span></button><div class="tip-panel-body"><ul>
                            <li><strong>Scan, don't read</strong> — Glance at each pair as a shape.</li>
                            <li><strong>Confusable letters</strong> — b/d, p/q, m/n, u/v look similar.</li>
                            <li><strong>Case doesn't matter</strong> — 'A' and 'a' are the same letter.</li>
                            <li><strong>Count mismatches</strong> — Count non-matches, subtract from 4.</li>
                            <li><strong>Target</strong> — Under 4 seconds per question.</li>
                        </ul></div></div>
                        <div class="tip-panel"><button class="tip-panel-header" onclick="toggleTipPanel(this)"><span>Task 3: Number Speed</span><span class="tip-chevron">›</span></button><div class="tip-panel-body"><ul>
                            <li><strong>Find the middle number</strong> — Neither highest nor lowest.</li>
                            <li><strong>Compare distances</strong> — Which extreme is further from the middle?</li>
                            <li><strong>Estimate</strong> — Round mentally. 47 vs 52 vs 89 → 89 is further.</li>
                            <li><strong>Close margins</strong> — Two close numbers (34, 36, 71) → 71 is obvious.</li>
                            <li><strong>Target</strong> — Under 3 seconds per question.</li>
                        </ul></div></div>
                        <div class="tip-panel"><button class="tip-panel-header" onclick="toggleTipPanel(this)"><span>Task 4: Word Meaning</span><span class="tip-chevron">›</span></button><div class="tip-panel-body"><ul>
                            <li><strong>Find the connection</strong> — Two words are synonyms or antonyms.</li>
                            <li><strong>Synonyms are common</strong> — Two synonyms + one unrelated word.</li>
                            <li><strong>Antonyms appear too</strong> — Happy, Sad, Bicycle → Bicycle is odd.</li>
                            <li><strong>Read all three</strong> — Don't jump at the first odd word.</li>
                            <li><strong>Build vocabulary</strong> — More words = faster recognition.</li>
                        </ul></div></div>
                        <div class="tip-panel"><button class="tip-panel-header" onclick="toggleTipPanel(this)"><span>Task 5: Spatial Visualisation</span><span class="tip-chevron">›</span></button><div class="tip-panel-body"><ul>
                            <li><strong>Rotation ≠ Mirror</strong> — Rotated "R" = same. Mirrored "R" = different.</li>
                            <li><strong>Track one feature</strong> — If an arm flips side, it's a mirror.</li>
                            <li><strong>Asymmetric letters</strong> — R, F, P, J are asymmetric. O, X always match.</li>
                            <li><strong>Mental rotation</strong> — Spin on card = same. Must flip card = mirror.</li>
                            <li><strong>Target</strong> — Under 4 seconds per question.</li>
                        </ul>
                        <div class="spatial-tool">
                            <div class="spatial-tool-header">🔄 Interactive Rotation Practice</div>
                            <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px;">See how Normal vs Mirrored characters look at any rotation. Drag each slider independently.</p>
                            <div class="spatial-tool-controls">
                                <div class="char-grid-label">Pick a character:</div>
                                <div class="char-grid" id="char-grid"></div>
                            </div>
                            <div class="sp-dual-area">
                                <div class="sp-dual-panel sp-normal">
                                    <div class="sp-panel-badge normal">Normal</div>
                                    <div class="spatial-preview-char sp-char" id="sp-normal-char">R</div>
                                    <div class="sp-rot-control"><label>Rotate: <span id="sp-normal-deg">0</span>°</label><input type="range" id="sp-normal-slider" min="0" max="360" value="0" step="15" class="rot-slider" oninput="updateDualPreview()"></div>
                                </div>
                                <div class="sp-dual-vs">vs</div>
                                <div class="sp-dual-panel sp-mirror">
                                    <div class="sp-panel-badge mirror">Mirrored</div>
                                    <div class="spatial-preview-char sp-char" id="sp-mirror-char">R</div>
                                    <div class="sp-rot-control"><label>Rotate: <span id="sp-mirror-deg">0</span>°</label><input type="range" id="sp-mirror-slider" min="0" max="360" value="0" step="15" class="rot-slider" oninput="updateDualPreview()"></div>
                                </div>
                            </div>
                            <div class="sp-hint">💡 The <strong>normal</strong> version can match any rotation of itself. The <strong>mirrored</strong> version can NEVER match the normal — no matter how you rotate it.</div>
                        </div>
                        </div></div>
                    </div>
                </div>
            </div>
        `;
        buildCharGrid();
        return;
    }

    // ═══════════ HISTORY LIST SCREEN ═══════════
    if (state.mode === 'history') {
        let rows = '';
        if (sessionHistory.length === 0) {
            rows = '<div class="history-empty">📭 No test results yet.<br>Complete a session to see your history here.</div>';
        } else {
            rows = sessionHistory.map((h, idx) => {
                const d = h.timestamp;
                const timeStr = d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
                const dateStr = d.toLocaleDateString([], {month: 'short', day: 'numeric'});
                const accClass = h.accuracy >= 80 ? 'acc-high' : h.accuracy >= 50 ? 'acc-mid' : 'acc-low';
                return `
                    <div class="history-card" onclick="viewHistoryDetail(${idx})">
                        <div class="history-card-top">
                            <span class="history-cat">${h.category}</span>
                            <span class="history-mode ${h.mode}">${h.mode.toUpperCase()}</span>
                        </div>
                        <div class="history-card-stats">
                            <span class="history-stat"><strong>${h.correct}</strong>/${h.total}</span>
                            <span class="history-acc ${accClass}">${h.accuracy}%</span>
                            <span class="history-score" style="color:var(--primary); font-weight:700;">⭐ ${calculateGIAScore(h.answerHistory)}</span>
                        </div>
                        <div class="history-card-bottom">
                            <span class="history-time">${dateStr} ${timeStr}</span>
                            <span class="history-duration">⏱ ${formatTime(h.duration || 0)} (${h.total > 0 ? (h.duration / h.total).toFixed(1) : 0}s/q)</span>
                            <button class="history-del" onclick="event.stopPropagation(); deleteHistoryItem(${idx})" title="Delete">🗑</button>
                        </div>
                    </div>
                `;
            }).reverse().join('');
        }

        appContainer.innerHTML = `
            <div class="home-scroll">
                <div class="center-content" style="flex-grow:0;">
                    <h1 style="font-size: 1.6rem;">📋 Test Results</h1>
                    <p class="subtitle">Session history — ${sessionHistory.length} test${sessionHistory.length !== 1 ? 's' : ''} completed</p>
                </div>
                <div class="history-list">
                    ${rows}
                </div>
                <button class="btn" style="margin-top: 12px;" onclick="goHome()">← Back to Home</button>
            </div>
        `;
        injectHomeButton();
        return;
    }

    // ═══════════ HISTORY DETAIL SCREEN ═══════════
    if (state.mode === 'historyDetail') {
        const h = sessionHistory[state.viewingHistoryIndex];
        if (!h) { state.mode = 'history'; render(); return; }

        const d = h.timestamp;
        const timeStr = d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'});
        const dateStr = d.toLocaleDateString([], {year: 'numeric', month: 'short', day: 'numeric'});
        const incorrectCount = h.total - h.correct;
        const isFullTest = h.category === 'Full Test';
        const histIdx = state.viewingHistoryIndex;

        // Build section-by-section breakdown for Full Test history
        let sectionsHtml = '';
        if (isFullTest && h.answerHistory.length > 0) {
            const taskOrder = ['reasoning', 'perceptual', 'numbers', 'word', 'spatial'];
            const taskNames = {
                reasoning: 'Task 1: Reasoning',
                perceptual: 'Task 2: Perceptual Speed',
                numbers: 'Task 3: Number Speed',
                word: 'Task 4: Word Meaning',
                spatial: 'Task 5: Spatial Visualisation'
            };

            taskOrder.forEach(taskId => {
                const sectionAnswers = h.answerHistory.filter(a => a.taskId === taskId);
                if (sectionAnswers.length === 0) return;

                const sCorrect = sectionAnswers.filter(a => a.isCorrect).length;
                const sTotal = sectionAnswers.length;
                const sWrong = sTotal - sCorrect;
                const sAcc = sTotal > 0 ? Math.round((sCorrect / sTotal) * 100) : 0;
                const accClass = sAcc >= 80 ? 'acc-high' : sAcc >= 50 ? 'acc-mid' : 'acc-low';
                const sScore = calculateGIAScore(sectionAnswers);

                const sectionRows = sectionAnswers.map(ans => {
                    const globalIdx = h.answerHistory.indexOf(ans);
                    return `
                        <tr class="${ans.isCorrect ? 'correct-row' : 'incorrect-row'}">
                            <td>${globalIdx + 1}</td>
                            <td>${ans.summary}</td>
                            <td>${ans.selected}</td>
                            <td>${ans.correct}</td>
                            <td class="status-icon ${ans.isCorrect ? 'correct' : 'incorrect'}">
                                ${ans.isCorrect ? '✔' : '✘'}
                            </td>
                            <td><button class="view-q-btn" onclick="showQuestionModal(${globalIdx}, sessionHistory[${histIdx}].answerHistory)">View</button></td>
                        </tr>
                    `;
                }).join('');

                sectionsHtml += `
                    <div class="section-result">
                        <button class="section-header" onclick="this.parentElement.classList.toggle('open')">
                            <span class="section-title">${taskNames[taskId]}</span>
                            <span class="section-stats">
                                <span class="${accClass}" style="font-weight:700;">${sAcc}%</span>
                                <span style="color:var(--text-muted); font-size:12px;">${sCorrect}/${sTotal}</span>
                                <span class="section-chevron">›</span>
                            </span>
                        </button>
                        <div class="section-body">
                            <div class="stat-row" style="margin-bottom:10px;">
                                <div class="stat-card"><div class="stat-value">${sTotal}</div><div class="stat-label">Attempted</div></div>
                                <div class="stat-card"><div class="stat-value" style="color:var(--success)">${sCorrect}</div><div class="stat-label">Correct</div></div>
                                <div class="stat-card"><div class="stat-value" style="color:var(--danger)">${sWrong}</div><div class="stat-label">Wrong</div></div>
                                <div class="stat-card"><div class="stat-value" style="color:var(--warning)">${sAcc}%</div><div class="stat-label">Accuracy</div></div>
                                <div class="stat-card"><div class="stat-value" style="color:var(--primary)">${sScore}</div><div class="stat-label">Score</div></div>
                            </div>
                            <div class="results-table-wrapper" style="max-height:200px;">
                                <table>
                                    <thead><tr><th>#</th><th>Question</th><th>Yours</th><th>Correct</th><th></th><th></th></tr></thead>
                                    <tbody>${sectionRows}</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        // For single-task history, keep the flat table
        let tableRows = '';
        if (!isFullTest) {
            tableRows = h.answerHistory.map((ans, idx) => `
                <tr class="${ans.isCorrect ? 'correct-row' : 'incorrect-row'}">
                    <td>${idx + 1}</td>
                    <td>${ans.summary}</td>
                    <td>${ans.selected}</td>
                    <td>${ans.correct}</td>
                    <td class="status-icon ${ans.isCorrect ? 'correct' : 'incorrect'}">
                        ${ans.isCorrect ? '✔' : '✘'}
                    </td>
                    <td><button class="view-q-btn" onclick="showQuestionModal(${idx}, sessionHistory[${histIdx}].answerHistory)">View</button></td>
                </tr>
            `).join('');
        }

        appContainer.innerHTML = `
            <div class="screen active">
                <div class="results-container">
                    <div class="results-summary">
                        <h2>${h.category} <span class="history-mode ${h.mode}" style="font-size: 12px; vertical-align: middle;">${h.mode.toUpperCase()}</span></h2>
                        <p style="color: var(--text-muted); font-size: 12px; margin-bottom: 12px;">${dateStr} at ${timeStr} · Duration: ${formatTime(h.duration || 0)}</p>
                        <div class="stat-row">
                            <div class="stat-card">
                                <div class="stat-value">${h.total}</div>
                                <div class="stat-label">Attempted</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value" style="color: var(--success)">${h.correct}</div>
                                <div class="stat-label">Correct</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value" style="color: var(--danger)">${incorrectCount}</div>
                                <div class="stat-label">Wrong</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value" style="color: var(--warning)">${h.accuracy}%</div>
                                <div class="stat-label">Accuracy</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value" style="color: var(--primary)">${calculateGIAScore(h.answerHistory)}</div>
                                <div class="stat-label">GIA Score</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-value" style="color: var(--text-muted)">${h.total > 0 ? (h.duration / h.total).toFixed(1) : 0}s</div>
                                <div class="stat-label">Avg. Time/Q</div>
                            </div>
                        </div>
                    </div>
                    ${isFullTest ? `
                        <div class="sections-breakdown">
                            ${sectionsHtml}
                        </div>
                    ` : `
                        <div class="results-table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Question</th>
                                        <th>Yours</th>
                                        <th>Correct</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${tableRows.length > 0 ? tableRows : '<tr><td colspan="6" style="text-align:center; color: var(--text-muted)">No questions answered.</td></tr>'}
                                </tbody>
                            </table>
                        </div>
                    `}
                    <button class="btn" style="margin-top: 0;" onclick="state.mode='history'; render();">← Back to Results</button>
                </div>
            </div>
        `;
        injectHomeButton();
        return;
    }
    
    // ─── Home button on all non-home screens ───
    injectHomeButton();
    
    const task = state.taskQueue[state.currentTaskIndex];

    // ═══════════ HEADER (test screens only) ═══════════
    if (state.mode === 'test') {
        const header = document.createElement('div');
        header.className = 'header-info';
        
        let qInfo = `<span>${task.title}</span>`;
        let pInfo = `<span>Q ${state.currentQuestionIndex + 1}</span>`;
        let tInfo = `<span id="timer-display" class="timer"></span>`;
        
        header.innerHTML = `${qInfo} ${pInfo} ${tInfo}`;
        appContainer.appendChild(header);
        
        setTimeout(updateTimerDisplay, 0);
    }

    const screen = document.createElement('div');
    screen.className = 'screen active';

    // ═══════════ INTRO SCREEN ═══════════
    if (state.mode === 'intro') {
        let timeText;
        let badgeClass = state.testMode === 'exam' ? 'exam' : 'practice';
        let badgeText = state.testMode === 'exam' ? 'Exam Mode' : 'Practice Mode';
        
        if (state.testMode === 'exam') {
            let limit = state.customTimeLimit > 0 ? Math.floor(state.customTimeLimit * 60) : task.timeLimit;
            timeText = `Time limit: <strong>${formatTime(limit)}</strong>`;
        } else {
            timeText = `No time limit — focus on accuracy.`;
        }
            
        screen.innerHTML = `
            <div class="center-content">
                ${buildProgressDots()}
                <span class="task-badge ${badgeClass}">${badgeText}</span>
                <h1>${task.title}</h1>
                <p>100 questions available. ${timeText}</p>
                <p>Both speed and accuracy matter. Work as quickly and accurately as possible.</p>
                <button class="btn" onclick="startTask()">Begin Task →</button>
            </div>
        `;

    // ═══════════ TEST SCREEN ═══════════
    } else if (state.mode === 'test') {
        const q = state.questions[state.currentQuestionIndex];
        const qArea = document.createElement('div');
        qArea.className = 'center-content';
        
        // ─── TASK 1: REASONING ───
        if (q.type === 'reasoning') {
            if (state.reasoningPhase === 'statement') {
                qArea.innerHTML = `
                    <div class="reasoning-statement">${q.statement}</div>
                    <p style="color: var(--text-muted); margin-top: 16px;">Study the statement. Click when ready.</p>
                    <button class="btn" onclick="reasoningReady()">Ready</button>
                `;
            } else {
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

        // ─── TASK 2: PERCEPTUAL SPEED ───
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

        // ─── TASK 3: NUMBER SPEED & ACCURACY ───
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

        // ─── TASK 4: WORD MEANING ───
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

        // ─── TASK 5: SPATIAL VISUALISATION ───
        } else if (q.type === 'spatial') {
            let html = '<div class="spatial-pairs">';
            q.pairs.forEach(p => {
                html += `<div class="spatial-pair">
                    <div class="spatial-symbol" style="transform: rotate(${p.rot1}deg) ${p.mirror1 ? 'scaleX(-1)' : ''}">${p.symbol}</div>
                    <div class="spatial-symbol" style="transform: rotate(${p.rot2}deg) ${p.mirror2 ? 'scaleX(-1)' : ''}">${p.symbol}</div>
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

    // ═══════════ RESULTS SCREEN ═══════════
    } else if (state.mode === 'final') {
        let correctCount = state.answerHistory.filter(a => a.isCorrect).length;
        let totalAns = state.answerHistory.length;
        let accuracy = totalAns > 0 ? Math.round((correctCount / totalAns) * 100) : 0;
        let incorrectCount = totalAns - correctCount;
        let lastSession = sessionHistory.length > 0 ? sessionHistory[sessionHistory.length - 1] : null;
        let duration = lastSession ? lastSession.duration : 0;
        let avgTime = totalAns > 0 ? (duration / totalAns).toFixed(1) : 0;
        
        const isFullTest = state.selectedCategory === 'all';

        // Build section-by-section breakdown for Full Test
        let sectionsHtml = '';
        if (isFullTest && totalAns > 0) {
            // Group answers by task
            const taskOrder = ['reasoning', 'perceptual', 'numbers', 'word', 'spatial'];
            const taskNames = {
                reasoning: 'Task 1: Reasoning',
                perceptual: 'Task 2: Perceptual Speed',
                numbers: 'Task 3: Number Speed',
                word: 'Task 4: Word Meaning',
                spatial: 'Task 5: Spatial Visualisation'
            };

            taskOrder.forEach(taskId => {
                const sectionAnswers = state.answerHistory.filter(a => a.taskId === taskId);
                if (sectionAnswers.length === 0) return;

                const sCorrect = sectionAnswers.filter(a => a.isCorrect).length;
                const sTotal = sectionAnswers.length;
                const sWrong = sTotal - sCorrect;
                const sAcc = sTotal > 0 ? Math.round((sCorrect / sTotal) * 100) : 0;
                const accClass = sAcc >= 80 ? 'acc-high' : sAcc >= 50 ? 'acc-mid' : 'acc-low';
                const sScore = calculateGIAScore(sectionAnswers);

                // Find the global index of each answer for the View modal
                const sectionRows = sectionAnswers.map(ans => {
                    const globalIdx = state.answerHistory.indexOf(ans);
                    return `
                        <tr class="${ans.isCorrect ? 'correct-row' : 'incorrect-row'}">
                            <td>${globalIdx + 1}</td>
                            <td>${ans.summary}</td>
                            <td>${ans.selected}</td>
                            <td>${ans.correct}</td>
                            <td class="status-icon ${ans.isCorrect ? 'correct' : 'incorrect'}">
                                ${ans.isCorrect ? '✔' : '✘'}
                            </td>
                            <td><button class="view-q-btn" onclick="showQuestionModal(${globalIdx})">View</button></td>
                        </tr>
                    `;
                }).join('');

                sectionsHtml += `
                    <div class="section-result">
                        <button class="section-header" onclick="this.parentElement.classList.toggle('open')">
                            <span class="section-title">${taskNames[taskId]}</span>
                            <span class="section-stats">
                                <span class="${accClass}" style="font-weight:700;">${sAcc}%</span>
                                <span style="color:var(--text-muted); font-size:12px;">${sCorrect}/${sTotal}</span>
                                <span class="section-chevron">›</span>
                            </span>
                        </button>
                        <div class="section-body">
                            <div class="stat-row" style="margin-bottom:10px;">
                                <div class="stat-card"><div class="stat-value">${sTotal}</div><div class="stat-label">Attempted</div></div>
                                <div class="stat-card"><div class="stat-value" style="color:var(--success)">${sCorrect}</div><div class="stat-label">Correct</div></div>
                                <div class="stat-card"><div class="stat-value" style="color:var(--danger)">${sWrong}</div><div class="stat-label">Wrong</div></div>
                                <div class="stat-card"><div class="stat-value" style="color:var(--warning)">${sAcc}%</div><div class="stat-label">Accuracy</div></div>
                                <div class="stat-card"><div class="stat-value" style="color:var(--primary)">${sScore}</div><div class="stat-label">Score</div></div>
                            </div>
                            <div class="results-table-wrapper" style="max-height:200px;">
                                <table>
                                    <thead><tr><th>#</th><th>Question</th><th>Yours</th><th>Correct</th><th></th><th></th></tr></thead>
                                    <tbody>${sectionRows}</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        // For single-task results, keep the original flat table
        let tableRows = '';
        if (!isFullTest) {
            tableRows = state.answerHistory.map((ans, idx) => `
                <tr class="${ans.isCorrect ? 'correct-row' : 'incorrect-row'}">
                    <td>${idx + 1}</td>
                    <td>${ans.summary}</td>
                    <td>${ans.selected}</td>
                    <td>${ans.correct}</td>
                    <td class="status-icon ${ans.isCorrect ? 'correct' : 'incorrect'}">
                        ${ans.isCorrect ? '✔' : '✘'}
                    </td>
                    <td><button class="view-q-btn" onclick="showQuestionModal(${idx})">View</button></td>
                </tr>
            `).join('');
        }

        screen.innerHTML = `
            <div class="results-container">
                <div class="results-summary">
                    <h2>Session Complete</h2>
                    <div class="stat-row">
                        <div class="stat-card">
                            <div class="stat-value">${totalAns}</div>
                            <div class="stat-label">Attempted</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value" style="color: var(--success)">${correctCount}</div>
                            <div class="stat-label">Correct</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value" style="color: var(--danger)">${incorrectCount}</div>
                            <div class="stat-label">Wrong</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value" style="color: var(--warning)">${accuracy}%</div>
                            <div class="stat-label">Accuracy</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value" style="color: var(--primary)">${calculateGIAScore(state.answerHistory)}</div>
                            <div class="stat-label">GIA Score</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value" style="color: var(--text-muted)">${avgTime}s</div>
                            <div class="stat-label">Avg. Time/Q</div>
                        </div>
                    </div>
                </div>
                ${isFullTest ? `
                    <div class="sections-breakdown">
                        ${sectionsHtml}
                    </div>
                ` : `
                    <div class="results-table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Question</th>
                                    <th>Yours</th>
                                    <th>Correct</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tableRows.length > 0 ? tableRows : '<tr><td colspan="6" style="text-align:center; color: var(--text-muted)">No questions answered.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                `}
                <div class="results-actions">
                    <button class="btn btn-retest" onclick="retest()">🔄 Retest</button>
                    <button class="btn btn-home-outline" onclick="goHome()">Back to Home</button>
                </div>
            </div>
        `;
    }

    appContainer.appendChild(screen);
}

// Initial render
render();

