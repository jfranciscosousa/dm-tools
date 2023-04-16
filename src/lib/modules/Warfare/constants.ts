export const UNIT_TYPES = {
  flying: {
    label: "Flying",
    attack: 0,
    power: 0,
    defense: 0,
    toughness: 0,
    morale: 3,
    costModifier: 2
  },
  archers: {
    label: "Archers",
    attack: 0,
    power: 1,
    defense: 0,
    toughness: 0,
    morale: 1,
    costModifier: 1.75
  },
  cavalry: {
    label: "Cavalry",
    attack: 1,
    power: 1,
    defense: 0,
    toughness: 0,
    morale: 2,
    costModifier: 1.5
  },
  levies: {
    label: "Levies",
    attack: 0,
    power: 0,
    defense: 0,
    toughness: 0,
    morale: -1,
    costModifier: 0.75
  },
  infantry: {
    label: "Infantry",
    attack: 0,
    power: 0,
    defense: 1,
    toughness: 1,
    morale: 0,
    costModifier: 1
  },
  siegeEngine: {
    label: "Siege Engine",
    attack: 1,
    power: 1,
    defense: 0,
    toughness: 1,
    morale: 0,
    costModifier: 1.5
  }
};

export const UNIT_TYPES_OPTIONS = Object.entries(UNIT_TYPES).map(([key, value]) => ({
  value: key,
  label: value.label
}));

export const UNIT_SIZES = {
  "4": {
    label: "1d4",
    costModifier: 0.66
  },
  "6": {
    label: "1d6",
    costModifier: 1
  },
  "8": {
    label: "1d8",
    costModifier: 1.33
  },
  "10": {
    label: "1d10",
    costModifier: 1.66
  },
  "12": {
    label: "1d12",
    costModifier: 2
  }
};

export const UNIT_SIZES_OPTIONS = Object.entries(UNIT_SIZES).map(([key, value]) => ({
  value: key,
  label: value.label
}));
