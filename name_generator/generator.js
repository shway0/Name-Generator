/**
 * ANTIGRAVITY NAME FORGE v2
 * Uses REAL name databases with intelligent mixing
 * Supports multi-category, syllable control, and editable ban list
 */

// ============================================
// BANNED NAMES - Stored in localStorage for persistence
// ============================================
const DEFAULT_BANNED = [
    'elara', 'elena', 'alara', 'lyra', 'kira', 'arya', 'aara', 'arra',
    'silas', 'ethan', 'marcus', 'cyrus', 'elias', 'thomas',
    'sarah', 'sara', 'lena', 'lily', 'mike', 'jack', 'jackson',
    'aiden', 'cade', 'gabriel', 'noah', 'oliver', 'mason', 'isabella',
    'myra', 'cole', 'vale', 'reed', 'chloe', 'mina', 'miller',
    'thorn', 'kael', 'chen', 'blackwood', 'nightshade', 'thornwood',
    'ravencroft', 'sterling', 'montgomery', 'sinclair'
];

let bannedNames = JSON.parse(localStorage.getItem('bannedNames')) || [...DEFAULT_BANNED];

function saveBannedNames() {
    localStorage.setItem('bannedNames', JSON.stringify(bannedNames));
}

function addBannedName(name) {
    const lower = name.toLowerCase().trim();
    if (lower && !bannedNames.includes(lower)) {
        bannedNames.push(lower);
        saveBannedNames();
        return true;
    }
    return false;
}

function removeBannedName(name) {
    const lower = name.toLowerCase().trim();
    const idx = bannedNames.indexOf(lower);
    if (idx !== -1) {
        bannedNames.splice(idx, 1);
        saveBannedNames();
        return true;
    }
    return false;
}

function isBanned(name) {
    const lower = name.toLowerCase();
    return bannedNames.some(banned => lower.includes(banned));
}

// ============================================
// REAL NAME DATABASES
// These are actual names, not component mashups
// ============================================

const REAL_NAMES = {
    // HUMAN FIRST NAMES - Organized by gender and syllable count
    human: {
        masculine: {
            1: ['James', 'John', 'Jack', 'Luke', 'Mark', 'Paul', 'Sean', 'Grant', 'Blake', 'Chase', 'Dean', 'Finn', 'Hugh', 'Kane', 'Lane', 'Neil', 'Rex', 'Troy', 'Wade', 'Zane', 'Brock', 'Clark', 'Craig', 'Drew', 'Flint', 'Gage', 'Hayes', 'Jude', 'Kent', 'Lance', 'Nash', 'Pierce', 'Quinn', 'Reid', 'Scott', 'Shane', 'Seth', 'Vance', 'Wayne', 'Wyatt'],
            2: ['Aaron', 'Adam', 'Alan', 'Anton', 'Arthur', 'Austin', 'Barrett', 'Bennett', 'Brandon', 'Brennan', 'Calvin', 'Caleb', 'Carson', 'Carter', 'Colton', 'Connor', 'Cooper', 'Corbin', 'Dallas', 'Dalton', 'Daniel', 'David', 'Declan', 'Derek', 'Devon', 'Dillon', 'Donovan', 'Duncan', 'Dylan', 'Easton', 'Edmund', 'Edwin', 'Emmett', 'Felix', 'Garrett', 'Gavin', 'Gordon', 'Graham', 'Griffin', 'Harlan', 'Harris', 'Harvey', 'Henry', 'Hudson', 'Hunter', 'Isaac', 'Ivan', 'Jason', 'Jasper', 'Jaxon', 'Jesse', 'Jordan', 'Joseph', 'Julian', 'Justin', 'Keegan', 'Kellan', 'Kieran', 'Kingston', 'Landon', 'Lawson', 'Lennon', 'Levi', 'Logan', 'Lucas', 'Malcolm', 'Martin', 'Mason', 'Matthew', 'Maxwell', 'Michael', 'Morgan', 'Nathan', 'Nelson', 'Nolan', 'Oscar', 'Owen', 'Parker', 'Patrick', 'Paxton', 'Peter', 'Preston', 'Raymond', 'Reuben', 'Richard', 'Robert', 'Roman', 'Ronan', 'Rowan', 'Russell', 'Ryan', 'Rylan', 'Samuel', 'Sawyer', 'Simon', 'Spencer', 'Stephen', 'Sterling', 'Sullivan', 'Tanner', 'Taylor', 'Thomas', 'Tristan', 'Tucker', 'Tyler', 'Victor', 'Vincent', 'Walker', 'Warren', 'Wesley', 'Weston', 'William', 'Wilson', 'Wyatt', 'Xavier', 'Zachary'],
            3: ['Abraham', 'Alexander', 'Alistair', 'Anderson', 'Anthony', 'Archibald', 'Augustus', 'Bartholomew', 'Benjamin', 'Broderick', 'Cameron', 'Cornelius', 'Dominic', 'Donovan', 'Douglas', 'Eduardo', 'Elliot', 'Emmanuel', 'Ezekiel', 'Fernando', 'Frederick', 'Gabriel', 'Gideon', 'Giovanni', 'Gregory', 'Hamilton', 'Harrison', 'Ignatius', 'Jefferson', 'Jeremiah', 'Jonathan', 'Josiah', 'Leonardo', 'Leander', 'Lorenzo', 'Lysander', 'Matthias', 'Maximilian', 'Montgomery', 'Nathaniel', 'Nicholas', 'Oberon', 'Orlando', 'Orion', 'Percival', 'Phineas', 'Rafferty', 'Reginald', 'Remington', 'Ricardo', 'Rodrigo', 'Salvador', 'Sebastian', 'Solomon', 'Sylvester', 'Theodore', 'Thaddeus', 'Timothy', 'Tobias', 'Valentine', 'Wellington', 'Zacharias'],
            4: ['Alejandro', 'Alessandro', 'Bartholomew', 'Benedetto', 'Cornelius', 'Emiliano', 'Federico', 'Fitzgerald', 'Leonardo', 'Maximilian', 'Montgomery', 'Nathaniel', 'Obadiah', 'Octavian', 'Sebastian', 'Zachariah']
        },
        feminine: {
            1: ['Anne', 'Belle', 'Beth', 'Blair', 'Bree', 'Brooke', 'Claire', 'Dawn', 'Elle', 'Eve', 'Faith', 'Faye', 'Fern', 'Grace', 'Hope', 'Jade', 'Jane', 'Jean', 'Joy', 'June', 'Kate', 'Lane', 'Leigh', 'Lynn', 'Mae', 'Maeve', 'Nell', 'Paige', 'Pearl', 'Quinn', 'Rain', 'Rose', 'Ruth', 'Sage', 'Sloane', 'Tess', 'True', 'Wren'],
            2: ['Ada', 'Agnes', 'Alice', 'Alma', 'Amber', 'Amy', 'Anna', 'Ava', 'Bella', 'Briar', 'Bridget', 'Carmen', 'Carla', 'Clara', 'Cora', 'Darcy', 'Della', 'Edith', 'Ella', 'Emma', 'Esme', 'Flora', 'Freya', 'Georgia', 'Greta', 'Hannah', 'Harper', 'Hazel', 'Heidi', 'Helen', 'Ida', 'Ingrid', 'Iris', 'Ivy', 'Jenna', 'Julia', 'Kira', 'Lana', 'Laura', 'Leah', 'Lila', 'Lily', 'Linda', 'Lola', 'Lorna', 'Louisa', 'Lucy', 'Luna', 'Mabel', 'Margo', 'Maria', 'Martha', 'Mary', 'Maura', 'Mila', 'Molly', 'Nadia', 'Nadine', 'Nancy', 'Nora', 'Olive', 'Opal', 'Paula', 'Piper', 'Poppy', 'Rachel', 'Raven', 'Rita', 'Rosa', 'Ruby', 'Sadie', 'Sarah', 'Selma', 'Sophie', 'Stella', 'Susan', 'Tara', 'Thea', 'Vera', 'Viola', 'Violet', 'Willow', 'Zelda', 'Zara', 'Zoe'],
            3: ['Abigail', 'Adelaide', 'Adriana', 'Alexandra', 'Amelia', 'Anastasia', 'Angelica', 'Arabella', 'Aurora', 'Barbara', 'Beatrice', 'Camilla', 'Carolina', 'Cassandra', 'Cecilia', 'Claudia', 'Cordelia', 'Cornelia', 'Delilah', 'Dorothy', 'Eleanor', 'Eliza', 'Elizabeth', 'Emilia', 'Emily', 'Eugenia', 'Evangeline', 'Felicity', 'Francesca', 'Genevieve', 'Gwendolyn', 'Henrietta', 'Imogen', 'Isabel', 'Isadora', 'Josephine', 'Juliana', 'Juniper', 'Katherine', 'Lavinia', 'Lillian', 'Loretta', 'Lucinda', 'Lydia', 'Madeline', 'Magnolia', 'Margaret', 'Marianne', 'Matilda', 'Melissa', 'Miranda', 'Natalie', 'Octavia', 'Ophelia', 'Penelope', 'Priscilla', 'Ramona', 'Rebecca', 'Regina', 'Rosalie', 'Rosemary', 'Samantha', 'Savannah', 'Seraphina', 'Susanna', 'Tabitha', 'Theodora', 'Valentina', 'Vanessa', 'Veronica', 'Victoria', 'Virginia', 'Vivian', 'Winifred'],
            4: ['Alessandra', 'Anastasia', 'Annabella', 'Arianna', 'Carolina', 'Clementine', 'Cordelia', 'Desdemona', 'Eleonora', 'Elisabetta', 'Esmeralda', 'Evangeline', 'Florentina', 'Genevieve', 'Guinevere', 'Isabella', 'Josephina', 'Millicent', 'Persephone', 'Philadelphia', 'Raphaella', 'Seraphina', 'Theodora', 'Valentina', 'Wilhelmina']
        },
        neutral: {
            1: ['Ash', 'Bay', 'Blake', 'Blaine', 'Brice', 'Brook', 'Dale', 'Drew', 'Finn', 'Gray', 'Jade', 'Jules', 'Lane', 'Lee', 'Lynn', 'Max', 'Quinn', 'Ray', 'Reed', 'Reese', 'Riley', 'River', 'Robin', 'Sage', 'Sam', 'Scout', 'Sky', 'Storm', 'Tate', 'True', 'Vale', 'West', 'Wren'],
            2: ['Addison', 'Adrian', 'Alex', 'Ashton', 'Avery', 'Bailey', 'Blair', 'Casey', 'Charlie', 'Dallas', 'Dakota', 'Devon', 'Eden', 'Ellis', 'Emery', 'Finley', 'Frankie', 'Harley', 'Hayden', 'Jamie', 'Jordan', 'Kendall', 'Kennedy', 'Logan', 'London', 'Mackenzie', 'Madison', 'Morgan', 'Parker', 'Peyton', 'Phoenix', 'Reagan', 'Reese', 'Riley', 'Rory', 'Rowan', 'Sawyer', 'Shannon', 'Sidney', 'Spencer', 'Taylor', 'Winter'],
            3: ['Addison', 'Cameron', 'Cassidy', 'Dakota', 'Delaney', 'Emerson', 'Evelyn', 'Finley', 'Kennedy', 'Mackenzie', 'Madison', 'Makenzie', 'Peyton', 'Remington', 'Skyler', 'Sullivan', 'Teagan', 'Tristan', 'Whitney']
        }
    },

    // SURNAMES - By culture
    surnames: {
        western: ['Abbott', 'Archer', 'Ashford', 'Ashworth', 'Atwood', 'Baker', 'Bancroft', 'Barrett', 'Baxter', 'Beaumont', 'Beckett', 'Bedford', 'Bellamy', 'Bishop', 'Blackwell', 'Blair', 'Blake', 'Bolton', 'Bradford', 'Bradley', 'Brandon', 'Brooks', 'Burke', 'Caldwell', 'Callahan', 'Campbell', 'Carlisle', 'Carrington', 'Carter', 'Chandler', 'Chapman', 'Clark', 'Clayton', 'Clifford', 'Cole', 'Collins', 'Connelly', 'Conway', 'Cooper', 'Crawford', 'Cromwell', 'Cross', 'Davenport', 'Davies', 'Dawson', 'Delaney', 'Douglas', 'Drake', 'Drummond', 'Duncan', 'Dunn', 'Easton', 'Edwards', 'Elliott', 'Ellis', 'Everett', 'Fairfax', 'Finch', 'Fletcher', 'Flynn', 'Ford', 'Foster', 'Fox', 'Fraser', 'Gallagher', 'Garrett', 'Gibson', 'Grayson', 'Griffin', 'Hale', 'Hamilton', 'Hammond', 'Hancock', 'Harrington', 'Hart', 'Hastings', 'Hawkins', 'Hayes', 'Henderson', 'Holt', 'Holloway', 'Howard', 'Hughes', 'Hunter', 'James', 'Jenkins', 'Kane', 'Keating', 'Kelly', 'Kennedy', 'Kent', 'Kingsley', 'Knight', 'Lambert', 'Lancaster', 'Lane', 'Langley', 'Larson', 'Lawrence', 'Lawson', 'Lennox', 'Lewis', 'Lincoln', 'Lloyd', 'Lockwood', 'Lowe', 'MacAllister', 'Maddox', 'Manning', 'Marshall', 'Martin', 'Mason', 'Maxwell', 'Mercer', 'Mitchell', 'Monroe', 'Morgan', 'Morris', 'Morrison', 'Morton', 'Murphy', 'Nash', 'Nelson', 'Norwood', 'Oliver', 'Osborne', 'Palmer', 'Parker', 'Patterson', 'Paxton', 'Pearson', 'Perry', 'Porter', 'Powell', 'Preston', 'Price', 'Quinn', 'Ramsey', 'Randall', 'Reeves', 'Reynolds', 'Rhodes', 'Richards', 'Richardson', 'Riley', 'Rowe', 'Russell', 'Rutherford', 'Sanders', 'Sawyer', 'Scott', 'Shaw', 'Sheldon', 'Sinclair', 'Sloane', 'Spencer', 'Stafford', 'Stanley', 'Stanton', 'Steele', 'Stewart', 'Stone', 'Sullivan', 'Sutton', 'Tate', 'Taylor', 'Thornton', 'Townsend', 'Turner', 'Underwood', 'Vaughn', 'Walsh', 'Ward', 'Warner', 'Warren', 'Watson', 'Webb', 'Wells', 'Weston', 'Wheeler', 'White', 'Whitmore', 'Wilder', 'Wilkins', 'Williams', 'Willis', 'Wilson', 'Windsor', 'Wolfe', 'Woods', 'Wright', 'Wyatt', 'Young'],
        african: ['Adebayo', 'Adeyemi', 'Amadi', 'Asante', 'Chukwu', 'Diallo', 'Dlamini', 'Eze', 'Kenyatta', 'Kimathi', 'Mandela', 'Mensah', 'Mwangi', 'Ndlovu', 'Nkosi', 'Nkrumah', 'Obi', 'Okafor', 'Olawale', 'Osei', 'Sarpong', 'Traore', 'Zulu'],
        middleeastern: ['Abbas', 'Ahmadi', 'Al-Farsi', 'Barzani', 'Darwish', 'Ebrahim', 'Hadid', 'Hakim', 'Hassan', 'Hosseini', 'Ibrahim', 'Jafari', 'Karimi', 'Kazemi', 'Khalil', 'Khouri', 'Maleki', 'Mansouri', 'Nasr', 'Nazari', 'Rashid', 'Sadiq', 'Saleh', 'Shahid', 'Sultan', 'Talib'],
        eastasian: ['Aoki', 'Chen', 'Choi', 'Fujita', 'Hayashi', 'Honda', 'Huang', 'Ito', 'Kato', 'Kim', 'Kobayashi', 'Lee', 'Li', 'Lin', 'Liu', 'Matsuda', 'Mori', 'Nakamura', 'Nguyen', 'Park', 'Pham', 'Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Tran', 'Wang', 'Watanabe', 'Wong', 'Wu', 'Yamada', 'Yamamoto', 'Yang', 'Yoshida', 'Zhang'],
        slavic: ['Antonov', 'Bogdanov', 'Fedorov', 'Ivanov', 'Kowalski', 'Kuznetsov', 'Lebedev', 'Morozov', 'Nikolaev', 'Novak', 'Pavlov', 'Petrov', 'Popov', 'Smirnov', 'Sokolov', 'Volkov'],
        nordic: ['Andersen', 'Berg', 'Bjornsson', 'Carlsson', 'Dahl', 'Eriksen', 'Gustafsson', 'Hansen', 'Johansson', 'Larsen', 'Lindgren', 'Magnus', 'Nilsen', 'Olsen', 'Petersen', 'Ragnarsson', 'Svensson', 'Thorsen'],
        celtic: ['Brennan', 'Byrne', 'Callaghan', 'Connolly', 'Doyle', 'Fitzgerald', 'Flynn', 'Gallagher', 'Kelly', 'Kennedy', 'Lynch', 'MacCarthy', 'MacLeod', 'Murphy', 'O\'Brien', 'O\'Connor', 'O\'Donnell', 'O\'Neill', 'O\'Sullivan', 'Quinn', 'Ryan', 'Walsh'],
        latinamerican: ['Alvarez', 'Castillo', 'Cruz', 'Delgado', 'Espinoza', 'Fernandez', 'Garcia', 'Gonzalez', 'Gutierrez', 'Hernandez', 'Lopez', 'Martinez', 'Morales', 'Ortiz', 'Perez', 'Ramirez', 'Rivera', 'Rodriguez', 'Romero', 'Sanchez', 'Silva', 'Torres', 'Vargas', 'Vasquez']
    },

    // ALIEN NAME COMPONENTS - These combine to form actual alien-sounding names
    alien: {
        melodic: {
            starts: ['Ael', 'Cae', 'Dai', 'Eli', 'Fae', 'Ior', 'Kai', 'Lae', 'Mai', 'Nae', 'Ori', 'Rae', 'Sai', 'Tae', 'Vai', 'Xai', 'Yae', 'Zae'],
            mids: ['li', 'ri', 'ni', 'si', 'vi', 'ra', 'na', 'la', 'ma', 'ta'],
            ends: ['en', 'an', 'on', 'in', 'is', 'os', 'us', 'ar', 'or', 'ir']
        },
        harsh: {
            starts: ['Drak', 'Ghor', 'Krag', 'Thok', 'Vrak', 'Zgor', 'Brak', 'Grak', 'Khor', 'Morg', 'Skar', 'Torg', 'Vrax', 'Zrak'],
            mids: ['ar', 'or', 'ur', 'ak', 'ok', 'uk', 'ag', 'og', 'ug'],
            ends: ['ak', 'ok', 'uk', 'ax', 'ox', 'ux', 'ath', 'oth', 'uth', 'ag', 'og']
        },
        sibilant: {
            starts: ['Shar', 'Shel', 'Sil', 'Sor', 'Sur', 'Sar', 'Sel', 'Shir', 'Shor', 'Syr', 'Zar', 'Zel', 'Zir', 'Zor', 'Zur'],
            mids: ['iss', 'oss', 'uss', 'ash', 'esh', 'ish', 'osh'],
            ends: ['iss', 'oss', 'uss', 'is', 'os', 'us', 'az', 'ez', 'iz', 'oz', 'uz']
        },
        clicking: {
            starts: ['Klik', 'Tik', 'Chit', 'Krix', 'Trix', 'Xik', 'Zik', 'Chak', 'Krak', 'Trak'],
            mids: ['ik', 'ak', 'ix', 'ax', 'ik', 'ak'],
            ends: ['ik', 'ak', 'ix', 'ax', 'ek', 'ox', 'tik', 'tak', 'chik']
        }
    },

    // FANTASY NAMES - Complete names for each race
    fantasy: {
        elven: {
            masculine: ['Aelindor', 'Caelum', 'Celeborn', 'Cirdan', 'Elrond', 'Faelar', 'Finrod', 'Galadon', 'Gilthoniel', 'Haldir', 'Legolas', 'Lindir', 'Lorien', 'Maeglin', 'Orophin', 'Rúmil', 'Silvan', 'Thalion', 'Thranduil'],
            feminine: ['Arwen', 'Celebrian', 'Earwen', 'Elbereth', 'Galadriel', 'Idril', 'Luthien', 'Miriel', 'Morwen', 'Nerdanel', 'Nimrodel', 'Silwen', 'Tauriel', 'Yavanna'],
            epithets: ['Silverleaf', 'Starweaver', 'Moonwhisper', 'Dawnwalker', 'Stormbow', 'Lightbringer']
        },
        dwarven: {
            masculine: ['Balin', 'Bifur', 'Bofur', 'Bombur', 'Dain', 'Dori', 'Durin', 'Dwalin', 'Fili', 'Gimli', 'Gloin', 'Kili', 'Nori', 'Oin', 'Ori', 'Thorin', 'Thrain', 'Thror'],
            feminine: ['Dis', 'Dvalina', 'Brunhilde', 'Freya', 'Golda', 'Helga', 'Magna', 'Marta', 'Sigrid', 'Thyra'],
            epithets: ['Ironforge', 'Stonefist', 'Goldvein', 'Deepdelver', 'Hammerborn', 'Anvil-Heart']
        },
        orcish: {
            masculine: ['Azog', 'Bolg', 'Gorbag', 'Gothmog', 'Grishnak', 'Lurtz', 'Muzgash', 'Shagrat', 'Ugluk', 'Grom', 'Thrall', 'Durotan', 'Orgrim', 'Blackhand'],
            feminine: ['Garona', 'Draka', 'Geyah', 'Aggra', 'Zaela', 'Morgra'],
            epithets: ['Skullcrusher', 'Bloodfang', 'Bonechewer', 'Wartooth', 'Ironjaw', 'Goreclaw']
        }
    },

    // MONSTER EPITHETS AND NAMES
    monster: {
        cryptid: {
            epithets: ['The Watcher in the Woods', 'The Silent Stalker', 'The Mist Walker', 'The Shadow Dweller', 'The Forest Guardian', 'The Night Howler', 'The Marsh Phantom', 'The Ridge Runner', 'The Cave Lurker', 'The Deep One'],
            nicknames: ['Squishy', 'Patches', 'Whiskers', 'Rumble', 'Glimmer', 'Pebbles', 'Dusty', 'Flicker', 'Moss', 'Wisp', 'Noodle', 'Fizz', 'Spark', 'Munch', 'Biscuit', 'Bumble', 'Twig', 'Puddles', 'Snuggles', 'Bramble']
        },
        cosmic: {
            names: ['Azathoth', 'Cthulhu', 'Nyarlathotep', 'Yog-Sothoth', 'Shub-Niggurath', 'Hastur', 'Dagon', 'Ithaqua', 'Tsathoggua'],
            epithets: ['The Crawling Chaos', 'The Lurker at the Threshold', 'The Sleeper of R\'lyeh', 'The Blind Idiot God', 'The Dreamer in the Deep', 'That Which Should Not Be', 'The Formless One', 'The Ancient Dread']
        }
    },

    // PLACE NAME COMPONENTS
    places: {
        prefixes: ['Silver', 'Iron', 'Storm', 'Shadow', 'Golden', 'Crystal', 'Raven', 'Wolf', 'Dragon', 'Star', 'Moon', 'Sun', 'Frost', 'Ember', 'Mist', 'Thunder', 'Crimson', 'Azure', 'Jade', 'Obsidian'],
        suffixes_city: ['port', 'haven', 'burgh', 'ford', 'vale', 'dale', 'keep', 'reach', 'hollow', 'crest', 'gate', 'watch', 'hold', 'grove', 'field', 'brook', 'wick', 'stead', 'ton', 'bridge'],
        tavern_adj: ['The Rusty', 'The Golden', 'The Prancing', 'The Drunken', 'The Weary', 'The Lucky', 'The Jolly', 'The Salty', 'The Crooked', 'The Dancing', 'The Wandering', 'The Sleeping', 'The Laughing', 'The Howling', 'The Whistling', 'The Gilded', 'The Silver', 'The Iron', 'The Copper', 'The Wooden'],
        tavern_noun: ['Dragon', 'Griffin', 'Pony', 'Goat', 'Traveler', 'Dice', 'Giant', 'Hound', 'Crow', 'Maiden', 'Knight', 'Tankard', 'Sword', 'Stag', 'Bear', 'Eagle', 'Serpent', 'Boar', 'Fox', 'Owl', 'Badger', 'Hammer', 'Anvil', 'Anchor', 'Compass'],
        tavern_type: ['Inn', 'Tavern', 'Alehouse', 'Rest', 'Lodge', 'House', 'Hall', 'Pub', 'Brewery', 'Tap', 'Arms', 'Hostel']
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomFromMultiple(...arrays) {
    const combined = arrays.flat();
    return combined[Math.floor(Math.random() * combined.length)];
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function countSyllables(word) {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
}

function filterBySyllables(names, minSyl, maxSyl) {
    return names.filter(name => {
        const syl = countSyllables(name);
        return syl >= minSyl && syl <= maxSyl;
    });
}

// ============================================
// NAME GENERATORS
// ============================================

function generateHumanName(options) {
    const { gender = 'any', minSyl = 2, maxSyl = 3, culture = 'western', includeSurname = true } = options;

    // Get first names
    let firstNames = [];
    const genderKey = gender === 'any'
        ? (Math.random() > 0.5 ? 'masculine' : 'feminine')
        : gender;

    // Collect names from appropriate syllable buckets
    const genderData = REAL_NAMES.human[genderKey] || REAL_NAMES.human.neutral;
    for (let syl = minSyl; syl <= maxSyl; syl++) {
        if (genderData[syl]) {
            firstNames = firstNames.concat(genderData[syl]);
        }
    }

    // Fallback if no names in syllable range
    if (firstNames.length === 0) {
        firstNames = genderData[2] || [];
    }

    // Filter banned names
    firstNames = firstNames.filter(n => !isBanned(n));

    if (firstNames.length === 0) return null;

    let name = random(firstNames);

    if (includeSurname) {
        const surnames = REAL_NAMES.surnames[culture] || REAL_NAMES.surnames.western;
        const filteredSurnames = surnames.filter(s => !isBanned(s));
        if (filteredSurnames.length > 0) {
            name += ' ' + random(filteredSurnames);
        }
    }

    return name;
}

function generateAlienName(options) {
    const { sound = 'melodic', minSyl = 2, maxSyl = 3 } = options;

    const soundData = REAL_NAMES.alien[sound] || REAL_NAMES.alien.melodic;

    let name = random(soundData.starts);

    // Add middle parts based on desired syllables
    const targetSyl = Math.floor(Math.random() * (maxSyl - minSyl + 1)) + minSyl;
    if (targetSyl >= 3) {
        name += random(soundData.mids);
    }
    if (targetSyl >= 4) {
        name += random(soundData.mids);
    }

    name += random(soundData.ends);

    // Clean up double letters
    name = name.replace(/(.)\1{2,}/g, '$1$1');

    return capitalize(name);
}

function generateFantasyName(options) {
    const { race = 'elven', gender = 'any', includeTitle = false } = options;

    const raceData = REAL_NAMES.fantasy[race];
    if (!raceData) return generateAlienName(options);

    const genderKey = gender === 'any'
        ? (Math.random() > 0.5 ? 'masculine' : 'feminine')
        : gender;

    const names = raceData[genderKey] || raceData.masculine;
    if (!names || names.length === 0) return null;

    let name = random(names.filter(n => !isBanned(n)));

    if (includeTitle && raceData.epithets) {
        name += ' ' + random(raceData.epithets);
    }

    return name;
}

function generateMonsterName(options) {
    const { style = 'epithet', type = 'cryptid' } = options;

    const typeData = REAL_NAMES.monster[type] || REAL_NAMES.monster.cryptid;

    if (style === 'nickname' && typeData.nicknames) {
        return random(typeData.nicknames);
    }

    if (typeData.epithets) {
        return random(typeData.epithets);
    }

    if (typeData.names) {
        return random(typeData.names);
    }

    return 'The Unknown';
}

function generatePlaceName(options) {
    const { type = 'city', setting = 'fantasy' } = options;

    if (type === 'tavern') {
        const adj = random(REAL_NAMES.places.tavern_adj);
        const noun = random(REAL_NAMES.places.tavern_noun);
        const ptype = random(REAL_NAMES.places.tavern_type);
        return `${adj} ${noun} ${ptype}`;
    }

    const prefix = random(REAL_NAMES.places.prefixes);
    const suffix = random(REAL_NAMES.places.suffixes_city);

    return prefix + suffix;
}

function generateTerm(options) {
    const { type = 'magic' } = options;

    // Generate compound terms
    const prefixes = ['Arch', 'Neo', 'Proto', 'Meta', 'Ultra', 'Omni', 'Poly', 'Mono', 'Hyper', 'Crypto'];
    const magicRoots = ['mancy', 'kinesis', 'weaving', 'binding', 'calling', 'shaping', 'craft'];
    const techRoots = ['drive', 'core', 'matrix', 'link', 'node', 'grid', 'net', 'pulse', 'wave', 'field'];

    if (type === 'tech') {
        return random(prefixes) + random(techRoots);
    }

    return random(prefixes) + random(magicRoots);
}

// ============================================
// MAIN GENERATION FUNCTION - SUPPORTS MULTI-CATEGORY
// ============================================
function generateNames(categories, options, count = 10) {
    const names = new Set();
    let attempts = 0;
    const maxAttempts = count * 10;

    // Ensure categories is an array
    if (!Array.isArray(categories)) {
        categories = [categories];
    }

    while (names.size < count && attempts < maxAttempts) {
        // Pick a random category from selected ones
        const category = random(categories);
        let name = null;

        switch (category) {
            case 'human':
                name = generateHumanName(options);
                break;
            case 'alien':
                name = generateAlienName(options);
                break;
            case 'fantasy':
                name = generateFantasyName(options);
                break;
            case 'monster':
                name = generateMonsterName(options);
                break;
            case 'place':
                name = generatePlaceName(options);
                break;
            case 'term':
                name = generateTerm(options);
                break;
            default:
                name = generateHumanName(options);
        }

        if (name && !isBanned(name)) {
            names.add(name);
        }

        attempts++;
    }

    return Array.from(names);
}

// ============================================
// UI INTERACTION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Multi-select category buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    let selectedCategories = ['human'];

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.dataset.category;

            if (btn.classList.contains('active')) {
                // Don't allow deselecting all
                if (selectedCategories.length > 1) {
                    btn.classList.remove('active');
                    selectedCategories = selectedCategories.filter(c => c !== cat);
                }
            } else {
                btn.classList.add('active');
                selectedCategories.push(cat);
            }
        });
    });

    // Syllable sliders
    const syllableMin = document.getElementById('syllable-min');
    const syllableMax = document.getElementById('syllable-max');
    const syllableValue = document.getElementById('syllable-value');

    function updateSyllableDisplay() {
        let min = parseInt(syllableMin.value);
        let max = parseInt(syllableMax.value);

        // Ensure min <= max
        if (min > max) {
            if (this === syllableMin) {
                syllableMax.value = min;
                max = min;
            } else {
                syllableMin.value = max;
                min = max;
            }
        }

        syllableValue.textContent = min === max ? min : `${min}-${max}`;
    }

    syllableMin.addEventListener('input', updateSyllableDisplay);
    syllableMax.addEventListener('input', updateSyllableDisplay);

    // Generate button
    const generateBtn = document.getElementById('generate-btn');
    const resultsSection = document.getElementById('results-section');
    const resultsGrid = document.getElementById('results-grid');

    generateBtn.addEventListener('click', () => {
        generateBtn.classList.add('loading');

        const quantity = parseInt(document.getElementById('quantity').value);

        const options = {
            gender: document.getElementById('gender-select').value,
            era: document.getElementById('era-select').value,
            culture: document.getElementById('culture-select').value,
            tone: document.getElementById('tone-select').value,
            minSyl: parseInt(syllableMin.value),
            maxSyl: parseInt(syllableMax.value),
            includeSurname: document.getElementById('include-surname').checked,
            includeTitle: document.getElementById('include-title').checked,
            // Map tone to alien sound profile
            sound: document.getElementById('tone-select').value === 'fierce' ? 'harsh' :
                document.getElementById('tone-select').value === 'dark' ? 'sibilant' : 'melodic'
        };

        setTimeout(() => {
            const names = generateNames(selectedCategories, options, quantity);
            displayResults(names);
            generateBtn.classList.remove('loading');
        }, 200);
    });

    function displayResults(names) {
        resultsGrid.innerHTML = '';

        if (names.length === 0) {
            resultsGrid.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center;">No names match your criteria. Try different settings.</p>';
            resultsSection.classList.add('visible');
            return;
        }

        names.forEach(name => {
            const card = document.createElement('div');
            card.className = 'name-card';
            card.innerHTML = `
                <span class="name-text">${name}</span>
                <span class="name-copy-icon">📋</span>
            `;

            card.addEventListener('click', () => {
                navigator.clipboard.writeText(name).then(() => {
                    card.classList.add('copied');
                    setTimeout(() => card.classList.remove('copied'), 1500);
                });
            });

            resultsGrid.appendChild(card);
        });

        resultsSection.classList.add('visible');
    }

    // Copy all button
    document.getElementById('copy-all-btn').addEventListener('click', () => {
        const names = Array.from(document.querySelectorAll('.name-text')).map(el => el.textContent);
        navigator.clipboard.writeText(names.join('\n')).then(() => {
            const btn = document.getElementById('copy-all-btn');
            btn.textContent = '✓ Copied!';
            setTimeout(() => btn.textContent = '📋 Copy All', 1500);
        });
    });

    // Regenerate button
    document.getElementById('regenerate-btn').addEventListener('click', () => {
        generateBtn.click();
    });

    // Banned names panel
    const toggleBannedBtn = document.getElementById('toggle-banned');
    const bannedPanel = document.getElementById('banned-panel');
    const bannedGrid = document.getElementById('banned-grid');
    const newBannedInput = document.getElementById('new-banned-input');
    const addBannedBtn = document.getElementById('add-banned-btn');

    function renderBannedNames() {
        bannedGrid.innerHTML = '';
        bannedNames.forEach(name => {
            const tag = document.createElement('span');
            tag.className = 'banned-tag';
            tag.textContent = capitalize(name);
            tag.addEventListener('click', () => {
                if (confirm(`Remove "${capitalize(name)}" from banned list?`)) {
                    removeBannedName(name);
                    renderBannedNames();
                }
            });
            bannedGrid.appendChild(tag);
        });
    }

    renderBannedNames();

    toggleBannedBtn.addEventListener('click', () => {
        toggleBannedBtn.classList.toggle('open');
        bannedPanel.classList.toggle('open');
    });

    addBannedBtn.addEventListener('click', () => {
        const name = newBannedInput.value.trim();
        if (name && addBannedName(name)) {
            renderBannedNames();
            newBannedInput.value = '';
        }
    });

    newBannedInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addBannedBtn.click();
        }
    });
});
