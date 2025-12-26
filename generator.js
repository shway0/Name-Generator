/**
 * ANTIGRAVITY NAME FORGE v3
 * - Fixed copy functionality
 * - Real monster names (not just epithets)
 * - Custom input actually works
 * - Can use custom input alone without categories
 */
// ============================================
// BANNED NAMES - Stored in localStorage
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
// COMPREHENSIVE NAME DATABASES
// ============================================
const NAMES = {
    // HUMAN FIRST NAMES - By syllable count
    human: {
        masculine: {
            1: ['James', 'John', 'Luke', 'Mark', 'Paul', 'Sean', 'Grant', 'Blake', 'Chase', 'Dean', 'Finn', 'Hugh', 'Kane', 'Lane', 'Neil', 'Rex', 'Troy', 'Wade', 'Zane', 'Brock', 'Clark', 'Craig', 'Drew', 'Flint', 'Gage', 'Hayes', 'Jude', 'Kent', 'Lance', 'Nash', 'Pierce', 'Quinn', 'Scott', 'Shane', 'Seth', 'Vance', 'Wayne', 'Rhys', 'Colt', 'Holt', 'Knox', 'Burke', 'Cole', 'Ford', 'Gage', 'Heath', 'Brooks', 'Wells', 'Stone'],
            2: ['Aaron', 'Adam', 'Alan', 'Anton', 'Arthur', 'Austin', 'Barrett', 'Bennett', 'Brandon', 'Brennan', 'Calvin', 'Caleb', 'Carson', 'Carter', 'Colton', 'Connor', 'Cooper', 'Corbin', 'Dallas', 'Dalton', 'Daniel', 'David', 'Declan', 'Derek', 'Devon', 'Dillon', 'Duncan', 'Dylan', 'Easton', 'Edmund', 'Edwin', 'Emmett', 'Felix', 'Garrett', 'Gavin', 'Gordon', 'Graham', 'Griffin', 'Harlan', 'Harris', 'Harvey', 'Henry', 'Hudson', 'Hunter', 'Isaac', 'Ivan', 'Jasper', 'Jesse', 'Jordan', 'Joseph', 'Julian', 'Justin', 'Keegan', 'Kellan', 'Kieran', 'Landon', 'Lawson', 'Lennon', 'Levi', 'Logan', 'Lucas', 'Malcolm', 'Martin', 'Matthew', 'Maxwell', 'Michael', 'Morgan', 'Nathan', 'Nelson', 'Nolan', 'Oscar', 'Owen', 'Parker', 'Patrick', 'Paxton', 'Peter', 'Preston', 'Raymond', 'Reuben', 'Richard', 'Robert', 'Roman', 'Ronan', 'Rowan', 'Russell', 'Ryan', 'Rylan', 'Samuel', 'Sawyer', 'Simon', 'Spencer', 'Stephen', 'Sullivan', 'Tanner', 'Taylor', 'Tristan', 'Tucker', 'Tyler', 'Victor', 'Vincent', 'Walker', 'Warren', 'Wesley', 'Weston', 'William', 'Wilson', 'Wyatt', 'Xavier', 'Zachary'],
            3: ['Abraham', 'Alexander', 'Alistair', 'Anderson', 'Anthony', 'Archibald', 'Augustus', 'Benjamin', 'Broderick', 'Cameron', 'Cornelius', 'Dominic', 'Donovan', 'Douglas', 'Eduardo', 'Elliot', 'Emmanuel', 'Ezekiel', 'Fernando', 'Frederick', 'Gideon', 'Giovanni', 'Gregory', 'Hamilton', 'Harrison', 'Ignatius', 'Jefferson', 'Jeremiah', 'Jonathan', 'Josiah', 'Leonardo', 'Leander', 'Lorenzo', 'Lysander', 'Matthias', 'Nathaniel', 'Nicholas', 'Oberon', 'Orlando', 'Orion', 'Percival', 'Phineas', 'Rafferty', 'Reginald', 'Remington', 'Ricardo', 'Rodrigo', 'Salvador', 'Sebastian', 'Solomon', 'Sylvester', 'Theodore', 'Thaddeus', 'Timothy', 'Tobias', 'Valentine', 'Wellington', 'Zacharias'],
            4: ['Alejandro', 'Alessandro', 'Bartholomew', 'Benedetto', 'Cornelius', 'Emiliano', 'Federico', 'Fitzgerald', 'Maximilian', 'Nathaniel', 'Obadiah', 'Octavian', 'Zachariah']
        },
        feminine: {
            1: ['Anne', 'Belle', 'Beth', 'Blair', 'Bree', 'Brooke', 'Claire', 'Dawn', 'Elle', 'Eve', 'Faith', 'Faye', 'Fern', 'Grace', 'Hope', 'Jade', 'Jane', 'Jean', 'Joy', 'June', 'Kate', 'Lane', 'Leigh', 'Lynn', 'Mae', 'Maeve', 'Nell', 'Paige', 'Pearl', 'Quinn', 'Rain', 'Rose', 'Ruth', 'Sage', 'Sloane', 'Tess', 'True', 'Wren', 'Brynn', 'Gwen', 'Liv', 'Sky', 'Rae', 'Shay'],
            2: ['Ada', 'Agnes', 'Alice', 'Alma', 'Amber', 'Anna', 'Ava', 'Bella', 'Briar', 'Bridget', 'Carmen', 'Carla', 'Clara', 'Cora', 'Darcy', 'Della', 'Edith', 'Ella', 'Emma', 'Esme', 'Flora', 'Freya', 'Georgia', 'Greta', 'Hannah', 'Harper', 'Hazel', 'Heidi', 'Helen', 'Ida', 'Ingrid', 'Iris', 'Ivy', 'Jenna', 'Julia', 'Lana', 'Laura', 'Leah', 'Lila', 'Linda', 'Lola', 'Lorna', 'Louisa', 'Lucy', 'Luna', 'Mabel', 'Margo', 'Maria', 'Martha', 'Mary', 'Maura', 'Mila', 'Molly', 'Nadia', 'Nadine', 'Nancy', 'Nora', 'Olive', 'Opal', 'Paula', 'Piper', 'Poppy', 'Rachel', 'Raven', 'Rita', 'Rosa', 'Ruby', 'Sadie', 'Selma', 'Sophie', 'Stella', 'Susan', 'Tara', 'Thea', 'Vera', 'Viola', 'Violet', 'Willow', 'Zelda', 'Zara', 'Zoe', 'Petra', 'Gwen', 'Cleo', 'Nina', 'Dina'],
            3: ['Abigail', 'Adelaide', 'Adriana', 'Alexandra', 'Amelia', 'Anastasia', 'Angelica', 'Arabella', 'Aurora', 'Barbara', 'Beatrice', 'Camilla', 'Carolina', 'Cassandra', 'Cecilia', 'Claudia', 'Cordelia', 'Cornelia', 'Delilah', 'Dorothy', 'Eleanor', 'Eliza', 'Elizabeth', 'Emilia', 'Emily', 'Eugenia', 'Evangeline', 'Felicity', 'Francesca', 'Genevieve', 'Gwendolyn', 'Henrietta', 'Imogen', 'Isabel', 'Isadora', 'Josephine', 'Juliana', 'Juniper', 'Katherine', 'Lavinia', 'Lillian', 'Loretta', 'Lucinda', 'Lydia', 'Madeline', 'Magnolia', 'Margaret', 'Marianne', 'Matilda', 'Melissa', 'Miranda', 'Natalie', 'Octavia', 'Ophelia', 'Penelope', 'Priscilla', 'Ramona', 'Rebecca', 'Regina', 'Rosalie', 'Rosemary', 'Samantha', 'Savannah', 'Seraphina', 'Susanna', 'Tabitha', 'Theodora', 'Valentina', 'Vanessa', 'Veronica', 'Victoria', 'Virginia', 'Vivian', 'Winifred'],
            4: ['Alessandra', 'Annabella', 'Arianna', 'Clementine', 'Desdemona', 'Eleonora', 'Elisabetta', 'Esmeralda', 'Florentina', 'Guinevere', 'Josephina', 'Millicent', 'Persephone', 'Philadelphia', 'Raphaella', 'Wilhelmina']
        },
        neutral: {
            1: ['Ash', 'Bay', 'Blake', 'Blaine', 'Brook', 'Dale', 'Drew', 'Finn', 'Gray', 'Jade', 'Jules', 'Lane', 'Lee', 'Lynn', 'Max', 'Quinn', 'Ray', 'Reese', 'River', 'Robin', 'Sage', 'Sam', 'Scout', 'Sky', 'Storm', 'Tate', 'True', 'West', 'Wren'],
            2: ['Addison', 'Adrian', 'Alex', 'Ashton', 'Avery', 'Bailey', 'Casey', 'Charlie', 'Dallas', 'Dakota', 'Devon', 'Eden', 'Ellis', 'Emery', 'Finley', 'Frankie', 'Harley', 'Hayden', 'Jamie', 'Jordan', 'Kendall', 'Kennedy', 'Logan', 'London', 'Morgan', 'Parker', 'Peyton', 'Phoenix', 'Reagan', 'Riley', 'Rory', 'Rowan', 'Sawyer', 'Shannon', 'Sidney', 'Spencer', 'Taylor', 'Winter'],
            3: ['Cameron', 'Cassidy', 'Delaney', 'Emerson', 'Mackenzie', 'Madison', 'Remington', 'Skyler', 'Sullivan', 'Teagan', 'Tristan', 'Whitney']
        }
    },
    // SURNAMES
    surnames: {
        western: ['Abbott', 'Archer', 'Ashford', 'Ashworth', 'Atwood', 'Baker', 'Bancroft', 'Barrett', 'Baxter', 'Beaumont', 'Beckett', 'Bedford', 'Bellamy', 'Bishop', 'Blair', 'Blake', 'Bolton', 'Bradford', 'Bradley', 'Brandon', 'Brooks', 'Burke', 'Caldwell', 'Callahan', 'Campbell', 'Carlisle', 'Carrington', 'Carter', 'Chandler', 'Chapman', 'Clark', 'Clayton', 'Clifford', 'Collins', 'Connelly', 'Conway', 'Cooper', 'Crawford', 'Cromwell', 'Cross', 'Davenport', 'Davies', 'Dawson', 'Delaney', 'Douglas', 'Drake', 'Drummond', 'Duncan', 'Dunn', 'Easton', 'Edwards', 'Elliott', 'Ellis', 'Everett', 'Fairfax', 'Finch', 'Fletcher', 'Flynn', 'Ford', 'Foster', 'Fox', 'Fraser', 'Gallagher', 'Garrett', 'Gibson', 'Grayson', 'Griffin', 'Hale', 'Hamilton', 'Hammond', 'Hancock', 'Harrington', 'Hart', 'Hastings', 'Hawkins', 'Hayes', 'Henderson', 'Holt', 'Holloway', 'Howard', 'Hughes', 'Hunter', 'James', 'Jenkins', 'Kane', 'Keating', 'Kelly', 'Kennedy', 'Kent', 'Kingsley', 'Knight', 'Lambert', 'Lancaster', 'Lane', 'Langley', 'Larson', 'Lawrence', 'Lawson', 'Lennox', 'Lewis', 'Lincoln', 'Lloyd', 'Lockwood', 'Lowe', 'Maddox', 'Manning', 'Marshall', 'Martin', 'Maxwell', 'Mercer', 'Mitchell', 'Monroe', 'Morgan', 'Morris', 'Morrison', 'Morton', 'Murphy', 'Nash', 'Nelson', 'Norwood', 'Palmer', 'Parker', 'Patterson', 'Paxton', 'Pearson', 'Perry', 'Porter', 'Powell', 'Preston', 'Price', 'Quinn', 'Ramsey', 'Randall', 'Reeves', 'Reynolds', 'Rhodes', 'Richards', 'Richardson', 'Riley', 'Rowe', 'Russell', 'Rutherford', 'Sanders', 'Sawyer', 'Scott', 'Shaw', 'Sheldon', 'Sloane', 'Spencer', 'Stafford', 'Stanley', 'Stanton', 'Steele', 'Stewart', 'Stone', 'Sullivan', 'Sutton', 'Tate', 'Taylor', 'Thornton', 'Townsend', 'Turner', 'Underwood', 'Vaughn', 'Walsh', 'Ward', 'Warner', 'Warren', 'Watson', 'Webb', 'Wells', 'Weston', 'Wheeler', 'White', 'Whitmore', 'Wilder', 'Wilkins', 'Williams', 'Willis', 'Wilson', 'Windsor', 'Wolfe', 'Woods', 'Wright', 'Wyatt', 'Young'],
        african: ['Adebayo', 'Adeyemi', 'Amadi', 'Asante', 'Chukwu', 'Diallo', 'Dlamini', 'Eze', 'Kenyatta', 'Kimathi', 'Mensah', 'Mwangi', 'Ndlovu', 'Nkosi', 'Obi', 'Okafor', 'Olawale', 'Osei', 'Sarpong', 'Traore', 'Zulu'],
        middleeastern: ['Abbas', 'Ahmadi', 'Al-Farsi', 'Barzani', 'Darwish', 'Ebrahim', 'Hadid', 'Hakim', 'Hassan', 'Hosseini', 'Ibrahim', 'Jafari', 'Karimi', 'Kazemi', 'Khalil', 'Khouri', 'Maleki', 'Mansouri', 'Nasr', 'Nazari', 'Rashid', 'Sadiq', 'Saleh', 'Shahid', 'Sultan', 'Talib'],
        eastasian: ['Aoki', 'Choi', 'Fujita', 'Hayashi', 'Honda', 'Huang', 'Ito', 'Kato', 'Kim', 'Kobayashi', 'Lee', 'Li', 'Lin', 'Liu', 'Matsuda', 'Mori', 'Nakamura', 'Nguyen', 'Park', 'Pham', 'Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Tran', 'Wang', 'Watanabe', 'Wong', 'Wu', 'Yamada', 'Yamamoto', 'Yang', 'Yoshida', 'Zhang'],
        slavic: ['Antonov', 'Bogdanov', 'Fedorov', 'Ivanov', 'Kowalski', 'Kuznetsov', 'Lebedev', 'Morozov', 'Nikolaev', 'Novak', 'Pavlov', 'Petrov', 'Popov', 'Smirnov', 'Sokolov', 'Volkov'],
        nordic: ['Andersen', 'Berg', 'Bjornsson', 'Carlsson', 'Dahl', 'Eriksen', 'Gustafsson', 'Hansen', 'Johansson', 'Larsen', 'Lindgren', 'Magnus', 'Nilsen', 'Olsen', 'Petersen', 'Ragnarsson', 'Svensson', 'Thorsen'],
        celtic: ['Brennan', 'Byrne', 'Callaghan', 'Connolly', 'Doyle', 'Fitzgerald', 'Flynn', 'Gallagher', 'Kelly', 'Kennedy', 'Lynch', 'MacCarthy', 'MacLeod', 'Murphy', 'Quinn', 'Ryan', 'Walsh'],
        latinamerican: ['Alvarez', 'Castillo', 'Cruz', 'Delgado', 'Espinoza', 'Fernandez', 'Garcia', 'Gonzalez', 'Gutierrez', 'Hernandez', 'Lopez', 'Martinez', 'Morales', 'Ortiz', 'Perez', 'Ramirez', 'Rivera', 'Rodriguez', 'Romero', 'Sanchez', 'Silva', 'Torres', 'Vargas', 'Vasquez']
    },
    // MONSTER NAMES - Actual names, not just epithets
    monster: {
        // Friendly/cute monster names (think cryptid romance)
        friendly: {
            1: ['Moss', 'Fern', 'Twig', 'Bramble', 'Dusk', 'Mist', 'Fog', 'Glen', 'Brook', 'Shade', 'Wisp', 'Drift', 'Haze', 'Vale'],
            2: ['Bramble', 'Thistle', 'Clover', 'Willow', 'Aspen', 'Cedar', 'Birch', 'Rowan', 'Hawthorn', 'Juniper', 'Heather', 'Ivy', 'Sorrel', 'Basil', 'Fennel', 'Lichen', 'Cobalt', 'Russet', 'Copper', 'Ember', 'Cinder', 'Flicker', 'Shimmer', 'Glow', 'Glint'],
            3: ['Holloway', 'Ashgrove', 'Fernwood', 'Thornbury', 'Blackmoss', 'Silveroak', 'Nighthollow', 'Frostfern', 'Driftwood', 'Stoneleaf', 'Cloudberry', 'Moonvine', 'Starling', 'Dewdrop', 'Foxglove']
        },
        // Dark/ominous monster names
        dark: {
            1: ['Grim', 'Dread', 'Bane', 'Gore', 'Vex', 'Wraith', 'Shade', 'Murk', 'Blight', 'Scourge', 'Maw', 'Void', 'Abyss'],
            2: ['Grimshaw', 'Malice', 'Rancor', 'Vesper', 'Mortis', 'Carrion', 'Banshee', 'Phantom', 'Specter', 'Revenant', 'Harbinger', 'Omen', 'Dirge', 'Lament', 'Sorrow', 'Anguish', 'Torment', 'Havoc', 'Ravage', 'Ruin'],
            3: ['Nightfall', 'Shadowmere', 'Darkhallow', 'Graveborn', 'Bonechill', 'Deathweaver', 'Soulrender', 'Fleshripper', 'Bloodmaw', 'Doomcaller', 'Hellspawn', 'Voidwalker', 'Cryptkeeper']
        },
        // Eldritch/cosmic monster names
        cosmic: {
            1: ['Xoth', 'Nyth', 'Zhar', 'Ghol', 'Thul', 'Yib', 'Koth', 'Vhol', 'Zhul', 'Mhar'],
            2: ['Nyogtha', 'Zathog', 'Cthylla', 'Ygolonac', 'Tsathoggua', 'Shudde', 'Bokrug', 'Xastur', 'Zvilpoggua', 'Othuum'],
            3: ['Nyarlathotep', 'Azathoth', 'Yog-Sothoth', 'Shub-Niggurath', 'Cthugha', 'Hastur', 'Dagon', 'Ithaqua', 'Chaugnar'],
            4: ['Nyarlathotep', 'Shub-Niggurath', 'Yog-Sothoth']
        },
        // Nicknames humans give monsters
        nicknames: ['Squishy', 'Patches', 'Whiskers', 'Rumble', 'Glimmer', 'Pebbles', 'Dusty', 'Flicker', 'Wisp', 'Noodle', 'Fizz', 'Spark', 'Munch', 'Biscuit', 'Bumble', 'Puddles', 'Snuggles', 'Chompers', 'Fuzz', 'Pickles', 'Marshmallow', 'Butterbean', 'Spud', 'Nugget', 'Waffles', 'Boo', 'Spooky', 'Midnight', 'Shadow', 'Ghost']
    },
    // ALIEN COMPONENTS
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
        }
    },
    // FANTASY RACE NAMES
    fantasy: {
        elven: {
            masculine: ['Aelindor', 'Caelum', 'Celeborn', 'Cirdan', 'Elrond', 'Faelar', 'Finrod', 'Galadon', 'Haldir', 'Legolas', 'Lindir', 'Lorien', 'Maeglin', 'Orophin', 'Silvan', 'Thalion', 'Thranduil', 'Aerion', 'Vaelin', 'Eryndor'],
            feminine: ['Arwen', 'Celebrian', 'Earwen', 'Elbereth', 'Galadriel', 'Idril', 'Luthien', 'Miriel', 'Morwen', 'Nerdanel', 'Nimrodel', 'Silwen', 'Tauriel', 'Yavanna', 'Aelindis', 'Caelindra', 'Faelwen', 'Ithilwen']
        },
        dwarven: {
            masculine: ['Balin', 'Bifur', 'Bofur', 'Bombur', 'Dain', 'Dori', 'Durin', 'Dwalin', 'Fili', 'Gimli', 'Gloin', 'Kili', 'Nori', 'Oin', 'Ori', 'Thorin', 'Thrain', 'Thror', 'Brokkr', 'Hrothgar'],
            feminine: ['Dis', 'Dvalina', 'Brunhilde', 'Freya', 'Golda', 'Helga', 'Magna', 'Sigrid', 'Thyra', 'Astrid', 'Greta', 'Hilda', 'Inga']
        },
        orcish: {
            masculine: ['Azog', 'Bolg', 'Gorbag', 'Gothmog', 'Grishnak', 'Lurtz', 'Muzgash', 'Shagrat', 'Ugluk', 'Grom', 'Thrall', 'Durotan', 'Orgrim', 'Grommash', 'Kilrogg', 'Nazgrim', 'Zakhan'],
            feminine: ['Garona', 'Draka', 'Geyah', 'Aggra', 'Zaela', 'Morgra', 'Grukha', 'Drakka', 'Shakra']
        }
    },
    // PLACE NAMES
    places: {
        prefixes: ['Silver', 'Iron', 'Storm', 'Shadow', 'Golden', 'Crystal', 'Raven', 'Wolf', 'Dragon', 'Star', 'Moon', 'Sun', 'Frost', 'Ember', 'Mist', 'Thunder', 'Crimson', 'Azure', 'Jade', 'Obsidian', 'Amber', 'Copper', 'Pearl', 'Onyx', 'Ivory', 'Ebony', 'Scarlet', 'Twilight', 'Dawn', 'Dusk'],
        middles: ['vale', 'fell', 'mere', 'wood', 'keep', 'haven', 'hollow', 'reach', 'crest', 'gate', 'watch', 'hold', 'grove', 'field', 'brook', 'wick', 'stead', 'ford', 'bridge', 'port', 'shore', 'cliff', 'peak', 'dale', 'glen'],
        tavernAdj: ['The Rusty', 'The Golden', 'The Prancing', 'The Drunken', 'The Weary', 'The Lucky', 'The Jolly', 'The Salty', 'The Crooked', 'The Dancing', 'The Wandering', 'The Sleeping', 'The Laughing', 'The Howling', 'The Whistling', 'The Gilded', 'The Silver', 'The Iron', 'The Copper', 'The Wooden', 'The Merry', 'The Wayward', 'The Tipsy', 'The Winking'],
        tavernNoun: ['Dragon', 'Griffin', 'Pony', 'Goat', 'Traveler', 'Dice', 'Giant', 'Hound', 'Crow', 'Maiden', 'Knight', 'Tankard', 'Sword', 'Stag', 'Bear', 'Eagle', 'Serpent', 'Boar', 'Fox', 'Owl', 'Badger', 'Hammer', 'Anvil', 'Anchor', 'Compass', 'Rogue', 'Barrel', 'Candle', 'Lantern', 'Moon', 'Star'],
        tavernType: ['Inn', 'Tavern', 'Alehouse', 'Rest', 'Lodge', 'House', 'Hall', 'Pub', 'Brewery', 'Tap']
    }
};
// ============================================
// UTILITY FUNCTIONS
// ============================================
function random(arr) {
    if (!arr || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
}
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function countSyllables(word) {
    if (!word) return 1;
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
}
// ============================================
// GENERATORS
// ============================================
function generateHumanName(options) {
    const { gender = 'any', minSyl = 1, maxSyl = 4, culture = 'western', includeSurname = true } = options;
    let firstNames = [];
    const genderKey = gender === 'any'
        ? (Math.random() > 0.5 ? 'masculine' : 'feminine')
        : gender;
    const genderData = NAMES.human[genderKey] || NAMES.human.neutral;
    // Get names from syllable buckets
    for (let syl = minSyl; syl <= maxSyl; syl++) {
        if (genderData[syl]) {
            firstNames = firstNames.concat(genderData[syl]);
        }
    }
    if (firstNames.length === 0) {
        firstNames = genderData[2] || [];
    }
    firstNames = firstNames.filter(n => !isBanned(n));
    if (firstNames.length === 0) return null;
    let name = random(firstNames);
    if (includeSurname) {
        const surnames = NAMES.surnames[culture] || NAMES.surnames.western;
        const filteredSurnames = surnames.filter(s => !isBanned(s));
        if (filteredSurnames.length > 0) {
            name += ' ' + random(filteredSurnames);
        }
    }
    return name;
}
function generateAlienName(options) {
    const { tone = 'melodic', minSyl = 2, maxSyl = 3 } = options;
    const soundMap = {
        'any': 'melodic',
        'noble': 'melodic',
        'whimsical': 'melodic',
        'fierce': 'harsh',
        'dark': 'sibilant',
        'mysterious': 'sibilant',
        'ancient': 'harsh'
    };
    const sound = soundMap[tone] || 'melodic';
    const data = NAMES.alien[sound] || NAMES.alien.melodic;
    let name = random(data.starts);
    const targetSyl = Math.floor(Math.random() * (maxSyl - minSyl + 1)) + minSyl;
    if (targetSyl >= 3) name += random(data.mids);
    if (targetSyl >= 4) name += random(data.mids);
    name += random(data.ends);
    name = name.replace(/(.)\1{2,}/g, '$1$1');
    return capitalize(name);
}
function generateFantasyName(options) {
    const { race = 'elven', gender = 'any', includeTitle = false } = options;
    const raceData = NAMES.fantasy[race];
    if (!raceData) return generateAlienName(options);
    const genderKey = gender === 'any'
        ? (Math.random() > 0.5 ? 'masculine' : 'feminine')
        : gender;
    const names = raceData[genderKey] || raceData.masculine;
    if (!names || names.length === 0) return null;
    return random(names.filter(n => !isBanned(n)));
}
function generateMonsterName(options) {
    const { tone = 'any', minSyl = 1, maxSyl = 4 } = options;
    let pool = [];
    // Determine which pools to use based on tone
    if (tone === 'any' || tone === 'whimsical' || tone === 'noble') {
        // Mix friendly and nicknames
        for (let syl = minSyl; syl <= maxSyl; syl++) {
            if (NAMES.monster.friendly[syl]) {
                pool = pool.concat(NAMES.monster.friendly[syl]);
            }
        }
        pool = pool.concat(NAMES.monster.nicknames);
    }
    if (tone === 'any' || tone === 'dark' || tone === 'fierce') {
        for (let syl = minSyl; syl <= maxSyl; syl++) {
            if (NAMES.monster.dark[syl]) {
                pool = pool.concat(NAMES.monster.dark[syl]);
            }
        }
    }
    if (tone === 'any' || tone === 'mysterious' || tone === 'ancient') {
        for (let syl = minSyl; syl <= maxSyl; syl++) {
            if (NAMES.monster.cosmic[syl]) {
                pool = pool.concat(NAMES.monster.cosmic[syl]);
            }
        }
    }
    if (pool.length === 0) {
        // Fallback to all monster names
        pool = NAMES.monster.nicknames.concat(
            NAMES.monster.friendly[2] || [],
            NAMES.monster.dark[2] || []
        );
    }
    return random(pool.filter(n => !isBanned(n)));
}
function generatePlaceName(options) {
    const { type = 'city' } = options;
    if (type === 'tavern') {
        return `${random(NAMES.places.tavernAdj)} ${random(NAMES.places.tavernNoun)} ${random(NAMES.places.tavernType)}`;
    }
    return random(NAMES.places.prefixes) + random(NAMES.places.middles);
}
function generateTerm(options) {
    const prefixes = ['Arch', 'Neo', 'Proto', 'Meta', 'Ultra', 'Omni', 'Poly', 'Mono', 'Hyper', 'Crypto', 'Aether', 'Void', 'Chrono', 'Flux'];
    const magicRoots = ['mancy', 'kinesis', 'weaving', 'binding', 'calling', 'shaping', 'craft', 'working', 'sight', 'speak', 'walking'];
    return random(prefixes) + random(magicRoots);
}
// Parse custom input for keywords
function parseCustomInput(input) {
    const keywords = {
        gender: 'any',
        tone: 'any',
        culture: 'western',
        categories: []
    };
    const lower = input.toLowerCase();
    // Gender detection
    if (lower.includes('female') || lower.includes('woman') || lower.includes('girl') || lower.includes('feminine')) {
        keywords.gender = 'feminine';
    } else if (lower.includes('male') || lower.includes('man') || lower.includes('boy') || lower.includes('masculine')) {
        keywords.gender = 'masculine';
    } else if (lower.includes('neutral') || lower.includes('androgynous') || lower.includes('nonbinary')) {
        keywords.gender = 'neutral';
    }
    // Tone detection
    if (lower.includes('dark') || lower.includes('sinister') || lower.includes('evil') || lower.includes('scary')) {
        keywords.tone = 'dark';
    } else if (lower.includes('noble') || lower.includes('elegant') || lower.includes('royal')) {
        keywords.tone = 'noble';
    } else if (lower.includes('fierce') || lower.includes('warrior') || lower.includes('strong') || lower.includes('powerful')) {
        keywords.tone = 'fierce';
    } else if (lower.includes('cute') || lower.includes('friendly') || lower.includes('sweet') || lower.includes('whimsical')) {
        keywords.tone = 'whimsical';
    } else if (lower.includes('mysterious') || lower.includes('arcane') || lower.includes('mystic')) {
        keywords.tone = 'mysterious';
    } else if (lower.includes('ancient') || lower.includes('old') || lower.includes('elder')) {
        keywords.tone = 'ancient';
    }
    // Culture detection
    if (lower.includes('african')) keywords.culture = 'african';
    else if (lower.includes('asian') || lower.includes('japanese') || lower.includes('chinese') || lower.includes('korean')) keywords.culture = 'eastasian';
    else if (lower.includes('arab') || lower.includes('middle east') || lower.includes('persian')) keywords.culture = 'middleeastern';
    else if (lower.includes('latin') || lower.includes('spanish') || lower.includes('mexican')) keywords.culture = 'latinamerican';
    else if (lower.includes('slavic') || lower.includes('russian') || lower.includes('polish')) keywords.culture = 'slavic';
    else if (lower.includes('nordic') || lower.includes('viking') || lower.includes('scandinavian')) keywords.culture = 'nordic';
    else if (lower.includes('celtic') || lower.includes('irish') || lower.includes('scottish')) keywords.culture = 'celtic';
    // Category detection
    if (lower.includes('human') || lower.includes('person') || lower.includes('character')) keywords.categories.push('human');
    if (lower.includes('alien') || lower.includes('extraterrestrial') || lower.includes('space')) keywords.categories.push('alien');
    if (lower.includes('monster') || lower.includes('creature') || lower.includes('cryptid') || lower.includes('beast')) keywords.categories.push('monster');
    if (lower.includes('fantasy') || lower.includes('elf') || lower.includes('dwarf') || lower.includes('orc')) keywords.categories.push('fantasy');
    if (lower.includes('place') || lower.includes('city') || lower.includes('town') || lower.includes('tavern') || lower.includes('location')) keywords.categories.push('place');
    if (lower.includes('term') || lower.includes('magic') || lower.includes('spell') || lower.includes('ability')) keywords.categories.push('term');
    // If no categories found, add human as default
    if (keywords.categories.length === 0) {
        keywords.categories.push('human');
    }
    return keywords;
}
// ============================================
// MAIN GENERATOR
// ============================================
function generateNames(categories, options, count = 10) {
    const names = new Set();
    let attempts = 0;
    const maxAttempts = count * 15;
    if (!Array.isArray(categories)) categories = [categories];
    if (categories.length === 0) categories = ['human'];
    while (names.size < count && attempts < maxAttempts) {
        const category = random(categories);
        let name = null;
        switch (category) {
            case 'human': name = generateHumanName(options); break;
            case 'alien': name = generateAlienName(options); break;
            case 'fantasy': name = generateFantasyName(options); break;
            case 'monster': name = generateMonsterName(options); break;
            case 'place': name = generatePlaceName(options); break;
            case 'term': name = generateTerm(options); break;
            default: name = generateHumanName(options);
        }
        if (name && !isBanned(name)) {
            names.add(name);
        }
        attempts++;
    }
    return Array.from(names);
}
// ============================================
// UI
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const categoryBtns = document.querySelectorAll('.category-btn');
    let selectedCategories = ['human'];
    // Multi-select categories
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.dataset.category;
            const customInput = document.getElementById('custom-input').value.trim();
            if (btn.classList.contains('active')) {
                // Allow unchecking if custom input has content OR other categories selected
                if (selectedCategories.length > 1 || customInput.length > 0) {
                    btn.classList.remove('active');
                    selectedCategories = selectedCategories.filter(c => c !== cat);
                }
            } else {
                btn.classList.add('active');
                if (!selectedCategories.includes(cat)) {
                    selectedCategories.push(cat);
                }
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
        if (min > max) {
            if (this === syllableMin) { syllableMax.value = min; max = min; }
            else { syllableMin.value = max; min = max; }
        }
        syllableValue.textContent = min === max ? min : `${min}-${max}`;
    }
    syllableMin.addEventListener('input', updateSyllableDisplay);
    syllableMax.addEventListener('input', updateSyllableDisplay);
    // Generate
    const generateBtn = document.getElementById('generate-btn');
    const resultsSection = document.getElementById('results-section');
    const resultsGrid = document.getElementById('results-grid');
    generateBtn.addEventListener('click', () => {
        generateBtn.classList.add('loading');
        const quantity = parseInt(document.getElementById('quantity').value);
        const customInput = document.getElementById('custom-input').value.trim();
        let options = {
            gender: document.getElementById('gender-select').value,
            culture: document.getElementById('culture-select').value,
            tone: document.getElementById('tone-select').value,
            minSyl: parseInt(syllableMin.value),
            maxSyl: parseInt(syllableMax.value),
            includeSurname: document.getElementById('include-surname').checked,
            includeTitle: document.getElementById('include-title').checked
        };
        let categories = [...selectedCategories];
        // Parse custom input if provided
        if (customInput.length > 0) {
            const parsed = parseCustomInput(customInput);
            // Override options with parsed values
            if (parsed.gender !== 'any') options.gender = parsed.gender;
            if (parsed.tone !== 'any') options.tone = parsed.tone;
            if (parsed.culture !== 'western') options.culture = parsed.culture;
            // Add parsed categories
            parsed.categories.forEach(cat => {
                if (!categories.includes(cat)) categories.push(cat);
            });
        }
        setTimeout(() => {
            const names = generateNames(categories, options, quantity);
            displayResults(names);
            generateBtn.classList.remove('loading');
        }, 200);
    });
    function displayResults(names) {
        resultsGrid.innerHTML = '';
        if (names.length === 0) {
            resultsGrid.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center;">No names found. Try different settings.</p>';
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
            // FIX: Proper copy functionality
            card.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(name);
                    card.classList.add('copied');
                    setTimeout(() => card.classList.remove('copied'), 1500);
                } catch (err) {
                    // Fallback for older browsers or non-HTTPS
                    const textArea = document.createElement('textarea');
                    textArea.value = name;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-9999px';
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    card.classList.add('copied');
                    setTimeout(() => card.classList.remove('copied'), 1500);
                }
            });
            resultsGrid.appendChild(card);
        });
        resultsSection.classList.add('visible');
    }
    // Copy all
    document.getElementById('copy-all-btn').addEventListener('click', async () => {
        const names = Array.from(document.querySelectorAll('.name-text')).map(el => el.textContent);
        try {
            await navigator.clipboard.writeText(names.join('\n'));
        } catch (err) {
            const textArea = document.createElement('textarea');
            textArea.value = names.join('\n');
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
        const btn = document.getElementById('copy-all-btn');
        btn.textContent = '✓ Copied!';
        setTimeout(() => btn.textContent = '📋 Copy All', 1500);
    });
    // Regenerate
    document.getElementById('regenerate-btn').addEventListener('click', () => {
        generateBtn.click();
    });
    // Banned names
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
        if (e.key === 'Enter') addBannedBtn.click();
    });
});
