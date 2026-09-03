export const initialNodes = [
  {
    id: "ambedkar",
    type: "person",
    data: {
      label: "Dr. B. R. Ambedkar",
      type: "person",
      description: "Chief Architect of the Indian Constitution, social reformer, and political leader.",
      metadata: { date: "1891-1956", location: "India" },
      topics: ["Caste", "Constitution", "Economics"],
      expandable: true,
      sourceIds: ["S001"]
    },
    position: { x: 0, y: 0 }
  },
  {
    id: "annihilation",
    type: "writing",
    data: {
      label: "Annihilation of Caste",
      type: "writing",
      description: "An undelivered speech written in 1936.",
      metadata: { year: "1936" },
      topics: ["Caste", "Social Reform"],
      sourceIds: ["S002"]
    },
    position: { x: -200, y: -150 }
  },
  {
    id: "constitution",
    type: "constitution",
    data: {
      label: "Constitution of India",
      type: "constitution",
      description: "The supreme law of India.",
      metadata: { year: "1950" },
      topics: ["Constitution", "Law"]
    },
    position: { x: 200, y: -150 }
  },
  {
    id: "mahad",
    type: "event",
    data: {
      label: "Mahad Satyagraha",
      type: "event",
      description: "A satyagraha led by B. R. Ambedkar to allow untouchables to use water in a public tank.",
      metadata: { year: "1927", location: "Mahad" },
      topics: ["Social Reform", "Protest"]
    },
    position: { x: -250, y: 100 }
  },
  {
    id: "buddhism",
    type: "idea",
    data: {
      label: "Navayana Buddhism",
      type: "idea",
      description: "Re-interpretation of Buddhism by B. R. Ambedkar.",
      metadata: { year: "1956" },
      topics: ["Religion", "Philosophy"]
    },
    position: { x: 250, y: 100 }
  },
  {
    id: "const-morality",
    type: "idea",
    data: {
      label: "Constitutional Morality",
      type: "idea",
      description: "A concept emphasized by Ambedkar in the Constituent Assembly.",
      topics: ["Constitution", "Morality"]
    },
    position: { x: 400, y: -200 }
  }
];

export const initialEdges = [
  {
    id: "e-ambedkar-annihilation",
    source: "ambedkar",
    target: "annihilation",
    label: "AUTHORED",
    type: "smoothstep"
  },
  {
    id: "e-ambedkar-constitution",
    source: "ambedkar",
    target: "constitution",
    label: "CHAIRED DRAFTING CMTE",
    type: "smoothstep"
  },
  {
    id: "e-ambedkar-mahad",
    source: "ambedkar",
    target: "mahad",
    label: "LED",
    type: "smoothstep"
  },
  {
    id: "e-ambedkar-buddhism",
    source: "ambedkar",
    target: "buddhism",
    label: "FOUNDED",
    type: "smoothstep"
  },
  {
    id: "e-constitution-morality",
    source: "constitution",
    target: "const-morality",
    label: "ESTABLISHES",
    type: "smoothstep"
  },
  {
    id: "e-ambedkar-morality",
    source: "ambedkar",
    target: "const-morality",
    label: "ADVOCATED",
    type: "smoothstep"
  }
];
