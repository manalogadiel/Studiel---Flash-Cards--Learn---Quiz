import type { Flashcard } from "./subjects";

export const automataTheoryCards: Flashcard[] = [
  {
    id: 601,
    term: "Set Theory",
    definition:
      "A foundational branch of mathematical logic that studies sets, which are collections of objects; serves as a basis for formal language theory and computer science.",
  },
  {
    id: 602,
    term: "Set",
    definition:
      "An unordered collection of distinct elements, conventionally denoted by a capital letter and enclosed within curly braces separated by commas { }.",
  },
  {
    id: 603,
    term: "Set Naming Convention",
    definition:
      "In formal set theory, a set must conventionally be named using a CAPITAL LETTER (e.g., A, B, S).",
  },
  {
    id: 604,
    term: "Venn Diagram",
    definition:
      "A visual illustration of sets and their relationships where elements inside the circle represent set members, and regions outside the circle represent all non-member elements.",
  },
  {
    id: 605,
    term: "∈ (Membership Symbol)",
    definition:
      "The mathematical membership symbol meaning 'is an element of' or 'is a member of' (e.g., x ∈ A indicates that x belongs to set A).",
  },
  {
    id: 606,
    term: "Finite Set",
    definition:
      "A set that contains a countable number of distinct elements, where the count n is either 0 or a positive integer (n = 0 ∨ n ∈ Z⁺).",
  },
  {
    id: 607,
    term: "Infinite Set",
    definition:
      "A set with an endless number of elements, conventionally indicated using ellipsis dots (...); can be either countably infinite or uncountably infinite.",
  },
  {
    id: 608,
    term: "Countably Infinite Set",
    definition:
      "An infinite set whose elements can be placed in one-to-one correspondence with the set of natural numbers (e.g., Natural numbers ℕ, Integers ℤ, and Rational numbers ℚ).",
  },
  {
    id: 609,
    term: "Uncountably Infinite Set",
    definition:
      "An infinite set whose elements cannot be enumerated or counted one by one (e.g., Real numbers ℝ, Irrational numbers ℝ\\ℚ).",
  },
  {
    id: 610,
    term: "Cardinality of a Finite Set",
    definition:
      "The total number of elements contained in a set, denoted by double vertical bars |A|; for example, the English alphabet has a fixed cardinality of 26 (|Alphabet| = 26).",
  },
  {
    id: 611,
    term: "Empty Set",
    definition:
      "A set containing no members or elements, denoted by the symbol ∅ or empty curly braces { }.",
  },
  {
    id: 612,
    term: "{∅} (Set Containing Empty Set)",
    definition:
      "A set containing the empty set as an element; Note: {∅} is NOT an empty set because its cardinality is 1 (|{∅}| = 1).",
  },
  {
    id: 613,
    term: "Intersection (∩)",
    definition:
      "A set operation that yields a set containing all common elements shared simultaneously by both sets.",
  },
  {
    id: 614,
    term: "Union (∪)",
    definition:
      "A set operation that joins two sets together, producing a set that contains all elements belonging to either set or both.",
  },
  {
    id: 615,
    term: "Difference",
    definition:
      "A set operation that removes the elements of the second set from the first set (denoted A \\ B or A - B), leaving elements belonging solely to the first set.",
  },
  {
    id: 616,
    term: "⊆ (Subset or Equal)",
    definition:
      "The subset relation symbol indicating that every element of the first set is also contained within the second set.",
  },
  {
    id: 617,
    term: "⊇ (Superset)",
    definition:
      "The superset relation symbol indicating that the first set contains all elements of the second set, potentially along with others.",
  },
  {
    id: 618,
    term: "⊂ (Proper Subset)",
    definition:
      "The relation symbol indicating that the first set is a subset of the second set, but the two sets are not equal (the second set has at least one extra element).",
  },
  {
    id: 619,
    term: "⊄ (Not a Subset)",
    definition:
      "The relation symbol indicating that the first set is not a subset of the second set (it contains at least one element not present in the second set).",
  },
  {
    id: 620,
    term: "Set Comprehension / Set Builder Notation",
    definition:
      "A formal mathematical method used to define a large or infinite set by stating a rule, condition, or property that all its members must satisfy.",
  },
  {
    id: 621,
    term: "A = {x | x ∈ ℕ ∧ x ≥ 1}",
    definition:
      "A set builder notation statement interpreted as: A is the set consisting of elements x, such that x is a natural number (x ∈ ℕ) AND (∧) x is greater than or equal to 1 (x ≥ 1).",
  },
  {
    id: 622,
    term: "B = {2x + 1 | x ∈ ℤ}",
    definition:
      "Set builder notation that defines the set of all odd integers, where x is an integer (x ∈ ℤ).",
  },
  {
    id: 623,
    term: "C = {0ⁿ 1ⁿ | n ≥ 1}",
    definition:
      "Set builder notation defining the formal language of all strings with an equal number of 0s followed by an equal number of 1s (e.g., 01, 0011, 000111).",
  },
  {
    id: 624,
    term: "D = {x | x is a primary colour}",
    definition:
      "An example of set comprehension using a descriptive natural-language word condition where this is the most obvious way to define the set.",
  },
  {
    id: 625,
    term: "Sets in Computer Science",
    definition:
      "An abstract data type (ADT) that stores an unordered collection of unique values with no positional index access and no duplicate elements allowed.",
  },
  {
    id: 626,
    term: "Automata",
    definition:
      "Plural of automaton; originates from the Greek word meaning 'self-acting'.",
  },
  {
    id: 627,
    term: "Automaton",
    definition:
      "An abstract, self-propelled computing device or mathematical machine that follows a predetermined sequence of operations.",
  },
  {
    id: 628,
    term: "Finite Automata (DFA and NFA)",
    definition:
      "Theoretical computing models with finite memory used to recognize patterns and regular languages, divided into Deterministic and Non-Deterministic variants.",
  },
  {
    id: 629,
    term: "Deterministic Finite Automaton (DFA)",
    definition:
      "A finite state machine where each input symbol uniquely determines the exact single next state to which the machine will move.",
  },
  {
    id: 630,
    term: "Vertices / Circles (Automata)",
    definition:
      "In finite automata transition state diagrams, the vertices or circles represent the individual states.",
  },
  {
    id: 631,
    term: "Arcs (Automata)",
    definition:
      "In finite automata diagrams, the directed arcs or arrows labeled with an input alphabet symbol show the state transitions.",
  },
  {
    id: 632,
    term: "Initial State (Automata)",
    definition:
      "The starting state in a finite automaton diagram, denoted by an empty single incoming arc that originates from no state.",
  },
  {
    id: 633,
    term: "Final State (Automata)",
    definition:
      "The accepting state in a finite automaton signaling valid string recognition, indicated graphically by double concentric circles.",
  },
  {
    id: 634,
    term: "Non-Deterministic Finite Automaton (NDFA / NFA)",
    definition:
      "A finite state machine that can move to any combination of states, such that the exact state to where the machine moves cannot be uniquely determined from the current input.",
  },
  {
    id: 635,
    term: "Transition in DFA vs NDFA",
    definition:
      "In a DFA, the transition from a state is to a single particular next state for each input symbol; in an NDFA, the transition from a state can be to multiple next states for each input symbol.",
  },
  {
    id: 636,
    term: "Empty String Transitions (ε-transitions)",
    definition:
      "State transitions that occur without reading any input symbol; empty string transitions are NOT seen in DFA, whereas NDFA permits empty string transitions.",
  },
  {
    id: 637,
    term: "Backtracking in DFA vs NDFA",
    definition:
      "Backtracking is allowed and easily implemented in a DFA, whereas in an NDFA, backtracking is not always possible.",
  },
  {
    id: 638,
    term: "Space Requirement: DFA vs NDFA",
    definition:
      "A DFA requires more memory space (due to potentially exponential number of states during subset construction), whereas an NDFA requires less space.",
  },
  {
    id: 639,
    term: "String Acceptance in DFA",
    definition:
      "A string is accepted by a DFA if its sequence of deterministic transitions ends in a final (accepting) state after processing the full input string.",
  },
  {
    id: 640,
    term: "String Acceptance in NDFA",
    definition:
      "A string is accepted by an NDFA if at least one of all possible execution branches/transitions ends in a final (accepting) state after processing the string.",
  },
];
