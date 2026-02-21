const searchBarOptions = {
  flightType: {
    placeholder: "Select Flight",
    options: [
      { value: "one-way", label: "One Way" },
      { value: "round", label: "Round Trip" },
      { value: "multi", label: "Multi City" },
    ],
  },

  travelClass: {
    placeholder: "Select Class",
    options: [
      { value: "economy", label: "Economy" },
      { value: "business", label: "Business" },
      { value: "first", label: "First Class" },
    ],
  },

  tripType: {
    placeholder: "Select Trip",
    options: [
      { value: "domestic", label: "Domestic" },
      { value: "international", label: "International" },
    ],
  },
};

export default searchBarOptions;