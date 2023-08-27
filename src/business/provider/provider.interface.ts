export const Providers = {
  DUCK: "Duck",
  GOOSE: "Goose",
  FOX: "Fox",
};

export const providerFeeData = {
  [Providers.DUCK]: {
    fixed: 5,
    percent: 0.001,
  },
  [Providers.GOOSE]: {
    fixed: 0,
    percent: 0.003,
  },
  [Providers.FOX]: {
    fixed: 0,
    percent: 0.005,
  },
};
