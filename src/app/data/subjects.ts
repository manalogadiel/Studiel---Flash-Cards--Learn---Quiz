import { qmGurusCards } from "./qmGurusCards";
import { emergingTrendsCards } from "./emergingTrendsCards";
import { qmChapter1Cards } from "./qmChapter1Cards";
import { qmChapter1V2Cards } from "./qmChapter1V2Cards";
import { mobileComputingCards } from "./mobileComputingCards";
import { automataTheoryCards } from "./automataTheoryCards";

export type Flashcard = {
  id: number;
  term: string;
  definition: string;
};

export type Subject = {
  id: string;
  name: string;
  code?: string;
  description?: string;
  isCustom?: boolean;
  cards: Flashcard[];
};

export {
  qmGurusCards,
  emergingTrendsCards,
  qmChapter1Cards,
  qmChapter1V2Cards,
  mobileComputingCards,
  automataTheoryCards,
};

export const it321Cards: Flashcard[] = [
  {
    id: 1,
    term: "HCI (Human-Computer Interaction)",
    definition:
      "The study and design of interfaces between users and computers to establish effective user-centered systems; emerged in the 1970s as a specialization of computer science.",
  },
  {
    id: 2,
    term: "Desktop & Mental Models (1980–1990)",
    definition:
      "An era of HCI guided by the philosophy 'Easy to learn, easy to use', introducing familiar visual analogies to bridge user understanding.",
  },
  {
    id: 3,
    term: "Desktop Metaphor / Dark Metaphor",
    definition:
      "Pioneered by Apple Macintosh; provides the conceptual framework and visual reasoning for how users interact with graphical computer systems.",
  },
  {
    id: 4,
    term: "Collaboration & Communication (1990–2000)",
    definition:
      "An era of HCI characterized by shifting focus from individual cognitive processing toward interactive group collaboration and network communications.",
  },
  {
    id: 5,
    term: "Electronic Mail (Email)",
    definition:
      "Drove massive interest in human interaction and collaboration, accelerating the growth of informative and organizational computing.",
  },
  {
    id: 6,
    term: "Social Change & Social Expression (2000–2010)",
    definition:
      "An era of HCI emphasizing self-expression, awareness, reflection, emotional/social connections, and the paradox of being 'Alone together'.",
  },
  {
    id: 7,
    term: "Ergonomics (Human Factors)",
    definition:
      "The scientific discipline concerned with understanding interactions among humans and system elements to optimize human well-being and workplace efficiency.",
  },
  {
    id: 8,
    term: "HCI Challenges and Problems",
    definition:
      "Major challenges including human-technology symbiosis, human-environment interaction, ethics/privacy/security, well-being and eudaimonia, universal accessibility, learning/creativity, and social democracy.",
  },
  {
    id: 9,
    term: "Core HCI Theme",
    definition:
      "The foundational principle in system design stating that 'People working with computer systems should come first.'",
  },
  {
    id: 10,
    term: "Human vs. Computer Information Processing",
    definition:
      "Humans process information through organic compounds and biological neural systems, whereas computers process information through electricity, silicon, and digital circuitry.",
  },
  {
    id: 11,
    term: "Human Strengths",
    definition:
      "Common sense reasoning, out-of-the-box creative thinking, adaptable problem solving, and rich perceptual input from physical senses.",
  },
  {
    id: 12,
    term: "Human Weaknesses",
    definition:
      "Takes time to recall information from long-term memory, limited working memory capacity, prone to cognitive biases, fatigue, and illness.",
  },
  {
    id: 13,
    term: "Computer Strengths",
    definition:
      "Supports diverse input/output peripherals (mouse, mic, speakers), operates continuously without needing sleep, and computes rapidly without emotional interference.",
  },
  {
    id: 14,
    term: "Computer Weaknesses",
    definition:
      "Requires electricity, cannot act autonomously without explicit commands, and strictly follows only what is programmed without inherent common sense.",
  },
  {
    id: 15,
    term: "Philosophy of Mind",
    definition:
      "A branch of philosophy studying the essence of the mind, mental properties and consciousness, and their relationship to the physical body.",
  },
  {
    id: 16,
    term: "Mind-Body Problem",
    definition:
      "The central philosophical inquiry into how non-physical mental states (thoughts, desires, consciousness) correlate with and impact the physical body.",
  },
  {
    id: 17,
    term: "Dualism",
    definition:
      "The philosophical view (rooted in Plato, Aristotle, and 17th-century René Descartes) that mind and body exist as two independent substances, with mind as cognition and conscious awareness.",
  },
  {
    id: 18,
    term: "Monism",
    definition:
      "The philosophical view (originating with Parmenides) asserting there is only one fundamental substance; mind and body are not existentially different.",
  },
  {
    id: 19,
    term: "Artificial Intelligence (AI)",
    definition:
      "A computer-controlled robot or system's ability to carry out tasks associated with intelligence, shaped by applied philosophy, ethics, privacy, security, and regulations.",
  },
  {
    id: 20,
    term: "Computational Theory of Mind (CTM)",
    definition:
      "The cognitive and philosophical view (computationalism) stating that the human mind is an information processing system and thinking is a form of computation.",
  },
  {
    id: 21,
    term: "Brain vs. Circuit Boards",
    definition:
      "The human brain is a biological enigma of conscious neural networks, whereas circuit boards are engineered physical pieces of technology.",
  },
  {
    id: 22,
    term: "Information System Users",
    definition:
      "The primary human participants of a system; if users cannot understand and effectively operate an information system, the system will fail.",
  },
  {
    id: 23,
    term: "Five Groups of Technology Adopters (Everett Rogers, 1962)",
    definition:
      "The diffusion model categorizing adoption into: Innovators, Early Adopters, Early Majority, Late Majority, and Laggards.",
  },
  {
    id: 24,
    term: "Innovators",
    definition:
      "The youngest, most adventurous technology adopter group; the first individuals to embrace and experiment with an innovation.",
  },
  {
    id: 25,
    term: "Early Adopters",
    definition:
      "Adopters who embrace an innovation after it has been tested and verified by innovators; they serve as respected opinion leaders.",
  },
  {
    id: 26,
    term: "Early Majority",
    definition:
      "A pragmatic group of adopters who accept an innovation after seeing practical proof, representing a large portion of adoption.",
  },
  {
    id: 27,
    term: "Late Majority",
    definition:
      "Skeptical adopters who only support and adopt an innovation after the majority has proven its necessity or value.",
  },
  {
    id: 28,
    term: "Laggards",
    definition:
      "The last category to change or adopt an innovation, heavily relying on traditions, habits, and expressing skepticism toward change.",
  },
  {
    id: 29,
    term: "Problem Solving vs. Reasoning",
    definition:
      "Problem solving is the process of finding solutions to complex questions, while reasoning is thinking logically to draw an inference or make a judgment.",
  },
  {
    id: 30,
    term: "Approaches in Problem Solving",
    definition:
      "Major cognitive approaches used to tackle problems: Gestalt principles, Theory-driven strategies, Problem Space exploration, and Analogy.",
  },
  {
    id: 31,
    term: "Continuation (Gestalt)",
    definition:
      "The perceptual principle where the human eye naturally follows a line, curve, or path from one point to another (e.g., the curved arrow in the Amazon logo).",
  },
  {
    id: 32,
    term: "Closure (Gestalt)",
    definition:
      "The perceptual tendency for the brain to automatically fill in missing gaps to perceive a complete, enclosed image (e.g., the WWF panda logo).",
  },
  {
    id: 33,
    term: "Similarity (Gestalt)",
    definition:
      "The principle that visual elements sharing similar characteristics (shape, color, size, orientation) are perceived as belonging together.",
  },
  {
    id: 34,
    term: "Proximity (Gestalt)",
    definition:
      "The principle that visual elements positioned close to each other are perceived as an associated, related group.",
  },
  {
    id: 35,
    term: "Symmetry (Gestalt)",
    definition:
      "The principle where symmetrical or identical visual elements are perceived as balanced, unified, and stable (e.g., the Starbucks siren emblem).",
  },
  {
    id: 36,
    term: "Figure and Ground (Gestalt)",
    definition:
      "The perceptual ability of the human eye to distinguish prominent focal objects (figure) from their surrounding background (ground).",
  },
  {
    id: 37,
    term: "Problem Space",
    definition:
      "The mental framework comprising problem states and the process of finding a solution: Initial State, Intermediate States, and Goal State.",
  },
  {
    id: 38,
    term: "Initial State",
    definition:
      "The starting condition and problem statement describing what the problem is all about prior to any actions.",
  },
  {
    id: 39,
    term: "Intermediate State",
    definition:
      "The states in between the initial and goal state consisting of procedures, operations, and steps that lead toward a solution.",
  },
  {
    id: 40,
    term: "Goal State",
    definition:
      "The desired terminal condition or successful solution reached at the end of the problem-solving process.",
  },
  {
    id: 41,
    term: "Analogy in Problem Solving",
    definition:
      "Using a familiar metaphor or past solution to solve a new problem by noticing similarities, mapping between source and target, and transferring solutions.",
  },
  {
    id: 42,
    term: "Types of Reasoning",
    definition:
      "The three fundamental modes of reasoning: Deductive (top-down), Inductive (bottom-up), and Abductive (inference to the best explanation).",
  },
  {
    id: 43,
    term: "Deductive Reasoning",
    definition:
      "A top-down logical method moving from one or more general premises to arrive at a logically certain conclusion; evaluated as Valid, Invalid, or Sound.",
  },
  {
    id: 44,
    term: "Valid Argument",
    definition:
      "A deductive argument structured such that if all its premises were true, the conclusion could not possibly be false (even if premises are factually untrue).",
  },
  {
    id: 45,
    term: "Invalid Argument",
    definition:
      "An argument where the premises do not logically lead to or support the stated conclusion, even if individual premises happen to be true.",
  },
  {
    id: 46,
    term: "Sound Argument",
    definition:
      "A deductive argument that is both structurally valid AND has premises that are factually true in reality.",
  },
  {
    id: 47,
    term: "Inductive Reasoning",
    definition:
      "A bottom-up reasoning method generalizing from specific observations or statistical samples to reach a probable (uncertain) conclusion.",
  },
  {
    id: 48,
    term: "Strong Argument",
    definition:
      "An inductive argument where the premises make the conclusion highly probable and likely to be true (e.g., 95% passing rate).",
  },
  {
    id: 49,
    term: "Weak Argument",
    definition:
      "An inductive argument where the conclusion has low probability and is poorly supported by the given premises.",
  },
  {
    id: 50,
    term: "Cogent Argument",
    definition:
      "A strong inductive argument whose premises are verified to be factually true based on real-world evidence and data.",
  },
  {
    id: 51,
    term: "Abductive Reasoning",
    definition:
      "Logical reasoning starting with a set of observations to form the best or most likely explanation (an educated hypothesis or best guess).",
  },
  {
    id: 52,
    term: "Reasoning Rules of Thumb",
    definition:
      "Heuristics: If direct certainty = Deductive; If statistical/probabilistic = Inductive; If best hypothesis = Abductive; Valid = connected logic; Sound = valid + true.",
  },
  {
    id: 53,
    term: "Attention",
    definition:
      "The cognitive process of selectively focusing mental faculties on specific environmental stimuli while filtering out distracting signals.",
  },
  {
    id: 54,
    term: "Divided Attention",
    definition:
      "Splitting mental focus to attend to multiple tasks or input sources at the same time (multitasking).",
  },
  {
    id: 55,
    term: "Selective Attention",
    definition:
      "Focusing cognitive resources on a chosen stimulus while intentionally ignoring irrelevant stimuli in the environment.",
  },
  {
    id: 56,
    term: "Change Blindness",
    definition:
      "A perceptual failure where an observer does not notice a noticeable visual change or alteration in a scene or interface.",
  },
  {
    id: 57,
    term: "Memory",
    definition:
      "The mental capacity to encode, store, retain, and recall information and experiences over time.",
  },
  {
    id: 58,
    term: "Sensory Memory",
    definition:
      "Ultra-brief memory lasting less than 500 milliseconds from sensory organs; includes Iconic (visual) and Echoic (auditory) memory.",
  },
  {
    id: 59,
    term: "Short-Term Memory (Working Memory)",
    definition:
      "Temporary holding system for conscious, active thoughts; responsible for immediate mental processing and limited in capacity.",
  },
  {
    id: 60,
    term: "Information Chunking",
    definition:
      "A memory strategy of grouping individual bits of information into smaller, meaningful, and cohesive chunks to enhance retention.",
  },
  {
    id: 61,
    term: "Method of Loci (Roman Rooms)",
    definition:
      "A mnemonic memory strategy where items to remember are mentally visualized and placed within specific locations in an imagined room or palace.",
  },
  {
    id: 62,
    term: "Long-Term Memory",
    definition:
      "A relatively permanent cognitive storage system with practically unlimited capacity, divided into Explicit (declarative) and Implicit (procedural) memory.",
  },
  {
    id: 63,
    term: "Explicit Memory (Declarative)",
    definition:
      "Conscious, intentional recollection of factual information, divided into Episodic memory (events) and Semantic memory (general concepts).",
  },
  {
    id: 64,
    term: "Episodic Memory",
    definition:
      "A subdivision of explicit memory involving the recollection of personal experiences, autobiographical events, and specific past moments.",
  },
  {
    id: 65,
    term: "Semantic Memory",
    definition:
      "A subdivision of explicit memory storing general factual knowledge, words, concepts, symbols, and rules without personal context.",
  },
  {
    id: 66,
    term: "Implicit Memory (Procedural)",
    definition:
      "Unconscious, automatic memory that guides actions and motor skills (such as typing on a keyboard or riding a bicycle).",
  },
  {
    id: 67,
    term: "Decay Theory",
    definition:
      "A theory of forgetting proposing that memory traces physically fade and erode over time if they are not actively accessed or rehearsed.",
  },
  {
    id: 68,
    term: "Proactive Interference",
    definition:
      "Memory disruption that happens when older, previously learned information prevents or hinders the learning and recall of new information.",
  },
  {
    id: 69,
    term: "Retroactive Interference",
    definition:
      "Memory disruption that happens when newly acquired information interferes with and obscures the retrieval of previously learned information.",
  },
  {
    id: 70,
    term: "Atkinson-Shiffrin Model",
    definition:
      "The foundational Multi-Store Model of memory proposing that information sequentially passes through Sensory Memory, Short-Term Memory, and Long-Term Memory.",
  },
  {
    id: 71,
    term: "Retrieval Failure Theory",
    definition:
      "Theory stating that forgotten information is safely stored in long-term memory but cannot be accessed due to insufficient internal or external retrieval cues.",
  },
  {
    id: 72,
    term: "Recall vs. Recognition",
    definition:
      "Recall requires retrieving information from memory without cues, while recognition only requires identifying information from options; recognition is far easier and preferred in UI design.",
  },
  {
    id: 73,
    term: "Techniques to Improve Recall",
    definition:
      "Three core cognitive retrieval methods: Association (linking new info to known concepts), Categorization (logical grouping), and Visualization (creating mental imagery).",
  },
  {
    id: 74,
    term: "Command Line Interface (CLI)",
    definition:
      "A text-based interaction style where users type discrete commands executed by the system; puts the user in direct control but requires memorizing syntax.",
  },
  {
    id: 75,
    term: "Menu-Based Interaction",
    definition:
      "A visual interaction style organizing system capabilities into selectable lists or icons, requiring minimal user learning and relying on recognition.",
  },
  {
    id: 76,
    term: "Form-Filling Interaction",
    definition:
      "An interaction style where users provide structured information by entering data into labeled fields, familiar from real-world paper forms.",
  },
  {
    id: 77,
    term: "Graphical User Interface (GUI)",
    definition:
      "An interaction style enabling direct manipulation of visual elements (windows, icons, buttons, menus - WIMP) through pointing devices.",
  },
  {
    id: 78,
    term: "CLI Examples & Guidelines",
    definition:
      "Good: Linux Terminal, PowerShell. Bad: Command-only interfaces forced on beginners, cryptic error messages without actionable solutions.",
  },
  {
    id: 79,
    term: "Menu Interaction Examples & Guidelines",
    definition:
      "Good: ATM screens, mobile navigation bars. Bad: Overwhelming lists with too many options, ambiguous terminology, or deeply nested hierarchies.",
  },
  {
    id: 80,
    term: "Form-Filling Examples & Guidelines",
    definition:
      "Good: Clean online registration and e-commerce checkout. Bad: Excessively long forms lacking progress indicators, and missing inline validation or error feedback.",
  },
  {
    id: 81,
    term: "GUI Examples & Guidelines",
    definition:
      "Good: Windows/macOS desktops, modern fluid mobile apps. Bad: Overcrowded and cluttered screens, ambiguous icons lacking explanatory labels.",
  },
];

export const envCards: Flashcard[] = [
  { id: 1, term: "Surface Water", definition: "Is fresh water on Earth's land surface. Surface water is found in lakes, rivers, streams, and wetlands." },
  { id: 2, term: "River system", definition: "Streams and rivers move across the land and form a flowing network of water." },
  { id: 3, term: "Watersheds", definition: "The area of land that is drained by a river." },
  { id: 4, term: "Ground water", definition: "Water stored beneath the Earth's surface in sediment and rock formations." },
  { id: 5, term: "Water table", definition: "A level where the rocks and soil are saturated with water." },
  { id: 6, term: "Aquifer", definition: "An underground formation that contains groundwater." },
  { id: 7, term: "Porosity", definition: "The amount of space between the particles that make up a rock." },
  { id: 8, term: "Permeability", definition: "The ability of rock or soil to allow water to flow through it." },
  { id: 9, term: "Recharge Zone", definition: "The area of the Earth's surface where water percolates down into the aquifer." },
  { id: 10, term: "Wells", definition: "A hole that is dug or drilled to reach groundwater." },
  { id: 11, term: "Water treatment", definition: "The process that removes elements such as mercury, arsenic, and lead, which are poisonous to humans even in low concentrations." },
  { id: 12, term: "Irrigation", definition: "A method of providing plants with water from sources other than direct precipitation." },
  { id: 13, term: "Dam", definition: "A structure built across a river to control the river's flow." },
  { id: 14, term: "Drip irrigation systems", definition: "Deliver small amounts of water directly to plant roots by using perforated tubing." },
  { id: 15, term: "Desalination", definition: "The process of removing salt from salt water." },
  { id: 16, term: "Water Pollution", definition: "The introduction of chemical, physical, or biological agents into water that degrade water quality and adversely affect the organisms that depend on the water." },
  { id: 17, term: "Waste water", definition: "Water that contains waste from homes or industry." },
  { id: 18, term: "Artificial Eutrophication", definition: "Eutrophication caused by humans." },
  { id: 19, term: "Biomagnification", definition: "The accumulation of pollutants at successive levels of the food chain." },
  { id: 20, term: "Primary Pollutant", definition: "A pollutant that is put directly into the air by human activity." },
  { id: 21, term: "Secondary Pollutant", definition: "Forms when a primary pollutant comes into contact with other primary pollutants or with naturally occurring substances such as water vapor and a chemical reaction takes place." },
  { id: 22, term: "Zero-emission vehicles", definition: "Vehicles that have no tailpipe emissions, no emissions from gasoline, and no emission-control systems that deteriorate over time." },
  { id: 23, term: "Scrubber", definition: "A machine that moves gases through a spray of water that dissolves many pollutants." },
  { id: 24, term: "Smog", definition: "Produced when air pollution hangs over urban areas and reduces visibility." },
  { id: 25, term: "Sick-building syndrome", definition: "Most common in hot places where buildings are tightly sealed to keep out the heat." },
  { id: 26, term: "Radon", definition: "One of the elements produced by the decay of uranium, a radioactive element that occurs naturally in the Earth's crust." },
  { id: 27, term: "Decibels", definition: "A measurement unit to measure the intensity of sound." },
  { id: 28, term: "Acid Precipitation", definition: "Precipitation such as rain, sleet, or snow that contains a high concentration of acids." },
  { id: 29, term: "pH (power of hydrogen)", definition: "A number that is a measure of how acidic or basic a substance is." },
  { id: 30, term: "Acid shock", definition: "The sudden influx of acidic water that causes a rapid change in the water's pH." },
  { id: 31, term: "Climate", definition: "The long-term prevailing weather conditions at a particular place based upon records taken." },
  { id: 32, term: "Latitude", definition: "The distance from the equator measured in degrees north or south of the equator." },
  { id: 33, term: "Wind", definition: "The movement of air within the atmosphere." },
  { id: 34, term: "Prevailing Winds", definition: "Winds that blow predominantly in one direction throughout the year." },
  { id: 35, term: "Trade winds", definition: "Belts of prevailing winds are produced in both hemispheres between 30° north and south latitude and the equator." },
  { id: 36, term: "El Niño", definition: "The name given to the short-term (generally 6- to 18-month period), periodic change in the location of warm and cold water masses in the Pacific Ocean. During an El Niño, winds in the western Pacific Ocean, which are usually weak, strengthen and push warm water eastward." },
  { id: 37, term: "La Niña", definition: "The water in the eastern Pacific Ocean is cooler than usual. El Niño and La Niña are opposite phases of the ENSO cycle; El Niño is the warm phase and La Niña is the cold phase." },
  { id: 38, term: "Pacific Decadal Oscillation", definition: "A long-term, 20- to 30-year change in the location of warm and cold water masses in the Pacific Ocean." },
  { id: 39, term: "Solar maximum", definition: "The sun emits an increased amount of ultraviolet (UV) radiation. UV radiation produces more ozone." },
  { id: 40, term: "Ozone layer", definition: "An area in the stratosphere where ozone is highly concentrated." },
  { id: 41, term: "Polar vortex", definition: "During the dark polar winter, strong circulating winds over Antarctica isolate cold air from surrounding warmer air." },
  { id: 42, term: "Greenhouse effect", definition: "The process of heat absorption." },
  { id: 43, term: "Greenhouse gases", definition: "The gases that do absorb and radiate heat." },
  { id: 44, term: "Global Warming", definition: "The predicted increase in global temperature." },
  { id: 45, term: "Kyoto Protocol", definition: "Requires developed countries to decrease emissions of carbon dioxide and other greenhouse gases." },
  { id: 46, term: "Urban", definition: "Land that is covered mainly with buildings and roads." },
  { id: 47, term: "Rural", definition: "Land that contains relatively few people and large areas of open space." },
  { id: 48, term: "Ecosystem Services", definition: "The resources that are produced by natural and artificial ecosystems." },
  { id: 49, term: "Urbanization", definition: "The movement of people from rural areas to cities." },
  { id: 50, term: "Infrastructure", definition: "All of the things that a society builds for public use." },
  { id: 51, term: "Urban Sprawl", definition: "Rapid expansion of a city into the countryside around the city." },
  { id: 52, term: "Land-use planning", definition: "Determining in advance how land will be used—where houses, businesses, and factories will be built, where land will be protected for recreation, and so on." },
  { id: 53, term: "Geographic information system", definition: "A computerized system for storing, manipulating, and viewing geographic data." },
  { id: 54, term: "Open space", definition: "Land within urban areas that is set aside for scenic and recreational enjoyment." },
  { id: 55, term: "Greenbelts", definition: "Open spaces left in their natural condition." },
  { id: 56, term: "Farmland", definition: "Land that is used to grow crops and fruit." },
  { id: 57, term: "Rangeland", definition: "Land that supports different vegetation types like grasslands, shrublands, and deserts and that is not used for farming or timber production." },
  { id: 58, term: "Clear-cutting", definition: "The process of removing all of the trees from an area of land." },
  { id: 59, term: "Selective cutting", definition: "The process of cutting and removing only middle-aged or mature trees." },
  { id: 60, term: "Deforestation", definition: "The clearing of trees from an area without replacing them." },
  { id: 61, term: "Reforestation", definition: "The process by which trees are planted to re-establish trees that have been cut down in a forest land." },
  { id: 62, term: "Wilderness", definition: "An area in which the land and the ecosystems it supports are protected from all exploitation." },
  { id: 63, term: "Famine", definition: "Widespread starvation caused by a shortage of food." },
  { id: 64, term: "Malnutrition", definition: "A condition that occurs when people do not consume enough Calories or do not eat a sufficient variety of foods to fulfill all of the body's needs." },
  { id: 65, term: "Drought", definition: "A prolonged period during which rainfall is below average." },
  { id: 66, term: "Fertile Soils", definition: "Soil that can support the growth of healthy plants." },
  { id: 67, term: "Chemical weathering", definition: "The minerals in the rock react chemically with substances such as water to form new materials." },
  { id: 68, term: "Erosion", definition: "The wearing away of rock or soil by wind and water." },
  { id: 69, term: "Land degradation", definition: "Happens when human activity or natural processes damage the land so that it can no longer support the local ecosystem." },
  { id: 70, term: "Desertification", definition: "The process by which land in arid or semiarid areas becomes more desert-like because of human activity or climatic changes." },
  { id: 71, term: "Compost", definition: "Partly decomposed organic material." },
  { id: 72, term: "Salinization", definition: "The accumulation of salts in the soil." },
  { id: 73, term: "Pesticides", definition: "Chemicals used to kill insects, weeds, and other crop pests." },
  { id: 74, term: "Pest", definition: "Any organism that occurs where it is not wanted or that occurs in large enough numbers to cause economic damage." },
  { id: 75, term: "Biological pest control", definition: "The use of living organisms to control pests." },
  { id: 76, term: "Pathogens", definition: "Organisms that cause disease." },
  { id: 77, term: "Pheromones", definition: "Chemicals produced by one organism that affect the behavior of another organism, can also be used in pest control." },
  { id: 78, term: "Integrated pest management", definition: "A modern method of controlling pests on crops." },
  { id: 79, term: "Genetic Engineering", definition: "The technology in which genetic material in a living cell is modified for medical or industrial use." },
  { id: 80, term: "Overharvesting", definition: "Catching or removing from a population more organisms than the population can replace." },
  { id: 81, term: "Sustainable Agriculture", definition: "Farming that conserves natural resources and helps keep the land productive." },
  { id: 82, term: "Aquaculture", definition: "The raising of aquatic organisms for human use or consumption." },
  { id: 83, term: "Livestock", definition: "Domesticated animals that are raised to be used on a farm or ranch or to be sold for profit." },
  { id: 84, term: "Surface mining", definition: "Methods are used when ore deposits are located close to Earth's surface." },
  { id: 85, term: "Open-pit mining", definition: "A method that is often used when large quantities of near-surface ore are mined." },
  { id: 86, term: "Smelting", definition: "Crushed ore is melted at high temperatures in furnaces to separate impurities from molten metal." },
  { id: 86.1, term: "Dump", definition: "Excess rock from mines is sometimes dumped into large piles." },
  { id: 87, term: "Subsidence", definition: "The sinking of regions of the ground with little or no horizontal movement." },
  { id: 88, term: "Reclamation", definition: "The process of returning land to its original or better condition after mining is completed." },
  { id: 89, term: "Fossil Fuels", definition: "The remains of ancient organisms that changed into coal, oil, or natural gas." },
  { id: 90, term: "Electric generator", definition: "A machine that converts mechanical energy, or motion, into electrical energy." },
  { id: 91, term: "Turbine", definition: "A wheel that changes the force of a moving gas or a liquid into energy that can do work. In most power plants, water is boiled to produce the steam that turns the turbine." },
  { id: 92, term: "Oil Reserves", definition: "Oil deposits that can be extracted profitably at current prices using current technology." },
  { id: 93, term: "Nuclear energy", definition: "The energy within the nucleus of an atom." },
  { id: 94, term: "Nuclear Fission", definition: "Collisions cause the nuclei to split." },
  { id: 95, term: "Nuclear Fusion", definition: "Occurs when lightweight atomic nuclei combine to form a heavier nucleus and release tremendous amounts of energy." },
  { id: 96, term: "Renewable Energy", definition: "Energy from sources that are constantly being formed." },
  { id: 97, term: "Alternative Energy", definition: "Describes energy sources that are still in development." },
  { id: 98, term: "Tides", definition: "The movement of water in the oceans and seas caused by gravitational attraction between the sun, Earth, and moon." },
  { id: 99, term: "Energy Efficiency", definition: "The percentage of energy put into a system that does useful work." },
  { id: 100, term: "Cogeneration", definition: "The production of two useful forms of energy from the same fuel source." },
  { id: 101, term: "Solid waste", definition: "Any discarded solid material." },
  { id: 102, term: "Biodegradable material", definition: "Can be broken down by biological processes." },
  { id: 103, term: "Nonbiodegradable material", definition: "Cannot be broken down by biological processes." },
  { id: 104, term: "Active Solar Heating", definition: "Energy from the sun can be gathered by collectors and used to heat water or to heat a building." },
  { id: 105, term: "Biomass Fuel", definition: "Plant material, manure, and any other organic matter that is used as an energy source." },
  { id: 106, term: "Hydroelectric Energy", definition: "Energy produced from moving water. It is a renewable resource that accounts for about 20 percent of the world's electricity." },
  { id: 107, term: "Geothermal Energy", definition: "The energy from heat in the Earth's crust." },
  { id: 108, term: "Landfill", definition: "A permanent waste-disposal facility where wastes are put in the ground and covered each day with a layer of soil, plastic, or both." },
  { id: 109, term: "Leachate", definition: "A liquid that has passed through compacted solid waste in a landfill." },
  { id: 110, term: "Source Reduction", definition: "Any change in design, manufacture, purchase, or use of materials or products to reduce their amount or toxicity before they become municipal solid waste." },
  { id: 111, term: "Recycling", definition: "The process of reusing materials or recovering valuable materials from waste or scrap." },
  { id: 112, term: "Photodegradable plastic", definition: "Made so that when it is left in the sun for many weeks, it becomes weak and brittle and eventually breaks into pieces." },
  { id: 113, term: "Green plastic", definition: "Made by blending the sugars in plants with a special chemical agent to make plastic." },
  { id: 114, term: "Hazardous waste", definition: "Any waste that is a risk to the health of humans or other living things." },
  { id: 115, term: "Toxicology", definition: "The study of the harmful effects of substances on organisms." },
  { id: 116, term: "Dose of the chemical", definition: "The amount of a harmful chemical to which a person is exposed." },
  { id: 117, term: "Response", definition: "The damage to health that results from exposure to a given dose." },
  { id: 118, term: "Epidemiology", definition: "The study of the spread of diseases." },
  { id: 119, term: "Risk assessment", definition: "An estimate of the risk posed by an action or substance." },
  { id: 120, term: "Particulates", definition: "Particles in the air that are small enough to breathe into the lungs." },
  { id: 121, term: "Host", definition: "An organism in which a pathogen lives all or part of its life." },
  { id: 122, term: "Vectors", definition: "Organisms, such as mosquitoes, that transmit diseases to people." },
  { id: 123, term: "Sustainability", definition: "The condition in which human needs are met in such a way that a human population can survive indefinitely." },
  { id: 124, term: "Economics", definition: "The study of the choices people make as they use and distribute limited resources." },
  { id: 125, term: "Economic growth", definition: "An increase in the flow of money and products within a market." },
  { id: 126, term: "Permeable", definition: "Materials such as gravel that allow the flow of water." },
  { id: 127, term: "Impermeable", definition: "Materials such as clay or granite that stop the flow of water." },
  { id: 128, term: "Point-source pollution", definition: "Pollution that can often be identified and traced to a source." },
  { id: 129, term: "Acidification", definition: "Changes the balance of a soil's chemistry in several ways." },
  { id: 130, term: "Non-point pollution", definition: "Pollution that comes from many different sources that are often difficult to identify." },
  { id: 131, term: "Thermal pollution", definition: "Can occur when power plants and other industries use water in their cooling systems and then discharge the warm water into a lake or river." },
  { id: 132, term: "Deep-well injection", definition: "Wastes are pumped deep into the ground, where they are absorbed into a dry layer of rock below the level of groundwater." },
  { id: 133, term: "Surface impoundment", definition: "Basically a pond that has a sealed bottom, used for waste disposal." },
];

export const DEFAULT_SUBJECTS: Subject[] = [
  {
    id: "qm-gurus",
    name: "Chapter 3: Quality Management Gurus",
    code: "QMG 201",
    description: "Deming, Juran, Crosby, Feigenbaum, PDCA, 14-points, and Total Quality Control.",
    isCustom: false,
    cards: qmGurusCards,
  },
  {
    id: "emerging-trends-quality",
    name: "Chapter 2: Emerging Trends in Quality",
    code: "ETQ 301",
    description: "Industry 4.0, Quality 4.0 (C-I-A), enabling technologies, big data, and analytics.",
    isCustom: false,
    cards: emergingTrendsCards,
  },
  {
    id: "qm-chapter-1",
    name: "Chapter 1: Quality Management",
    code: "QM 101",
    description: "Definitions of Quality, organizational levels, QMS, and TQM implementation strategies.",
    isCustom: false,
    cards: qmChapter1Cards,
  },
  {
    id: "qm-chapter-1-v2",
    name: "Chapter 1: Version 2 Quality Management",
    code: "QM 102",
    description: "Terms & definitions, Types of Quality, QC vs QA, QMS/TQM, Dimensions, 8 Principles, and Japanese TQM concepts.",
    isCustom: false,
    cards: qmChapter1V2Cards,
  },
  {
    id: "it-321",
    name: "Human Computer Interaction",
    code: "IT 321",
    description: "HCI models, ergonomics, Gestalt principles, reasoning, memory, and interaction styles.",
    isCustom: false,
    cards: it321Cards,
  },
  {
    id: "env-sci",
    name: "Environmental Science",
    code: "SCI 101",
    description: "Water systems, pollution, ecology, climate, resources, and sustainability.",
    isCustom: false,
    cards: envCards,
  },
  {
    id: "mobile-computing",
    name: "Mobile Computing & Wireless Networks",
    code: "MC 301",
    description: "Mobile computing concepts, network topology, transmission media, cellular architecture, and 1G to 6G.",
    isCustom: false,
    cards: mobileComputingCards,
  },
  {
    id: "set-theory-automata",
    name: "Set Theory & Finite Automata",
    code: "CS 201",
    description: "Set theory operations, set builder notation, sets in computer science, and DFA vs NDFA.",
    isCustom: false,
    cards: automataTheoryCards,
  },
];

const STORAGE_KEY = "studiel_subjects_v5";
const ACTIVE_KEY = "studiel_active_subject_id_v5";

export function loadStoredSubjects(): Subject[] {
  if (typeof window === "undefined") return DEFAULT_SUBJECTS;
  try {
    const raw =
      localStorage.getItem(STORAGE_KEY) ||
      localStorage.getItem("studiel_subjects_v4") ||
      localStorage.getItem("studiel_subjects_v3") ||
      localStorage.getItem("studiel_subjects_v2");
    if (!raw) return DEFAULT_SUBJECTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Ensure all built-in subjects are present and up to date
      const customSubjects = parsed.filter((s: Subject) => s.isCustom);
      return [...DEFAULT_SUBJECTS, ...customSubjects];
    }
  } catch (err) {
    console.error("Failed to load stored subjects", err);
  }
  return DEFAULT_SUBJECTS;
}

export function saveStoredSubjects(subjects: Subject[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
  } catch (err) {
    console.error("Failed to save subjects to storage", err);
  }
}

export function getActiveSubjectId(available: Subject[]): string {
  if (typeof window === "undefined") return "mobile-computing";
  try {
    const saved =
      localStorage.getItem(ACTIVE_KEY) ||
      localStorage.getItem("studiel_active_subject_id_v4") ||
      localStorage.getItem("studiel_active_subject_id_v3") ||
      localStorage.getItem("studiel_active_subject_id_v2");
    if (saved && available.some((s) => s.id === saved)) {
      return saved;
    }
  } catch { }
  return available[0]?.id ?? "mobile-computing";
}

export function setActiveSubjectId(id: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ACTIVE_KEY, id);
  } catch { }
}

