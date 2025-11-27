// Waste type information with icons and disposal tips
export const wasteTypeInfo = {
  cardboard: {
    name: "Cardboard",
    icon: "📦",
    color: "#8B4513",
    tips: "Flatten boxes and remove tape before recycling.",
  },
  "food organics": {
    name: "Food Organics",
    icon: "🥬",
    color: "#6B4423",
    tips: "Compost food scraps to reduce landfill waste.",
  },
  glass: {
    name: "Glass",
    icon: "🫙",
    color: "#8B7355",
    tips: "Rinse containers and recycle with glass.",
  },
  metal: {
    name: "Metal",
    icon: "🥫",
    color: "#5C4033",
    tips: "Clean cans and foil before recycling.",
  },
  "miscellaneous trash": {
    name: "Miscellaneous Trash",
    icon: "🗑️",
    color: "#654321",
    tips: "Dispose in general waste bin.",
  },
  paper: {
    name: "Paper",
    icon: "📄",
    color: "#A0826D",
    tips: "Keep paper dry and clean for recycling.",
  },
  plastic: {
    name: "Plastic",
    icon: "♻️",
    color: "#8B6F47",
    tips: "Check the recycling number and clean before recycling.",
  },
  "textile trash": {
    name: "Textile",
    icon: "👕",
    color: "#704214",
    tips: "Donate wearable clothes or recycle fabric.",
  },
  vegetation: {
    name: "Vegetation",
    icon: "🌿",
    color: "#5C4033",
    tips: "Compost yard waste and plant material.",
  },
};

export const getWasteInfo = (wasteType) => {
  return (
    wasteTypeInfo[wasteType.toLowerCase()] ||
    wasteTypeInfo["miscellaneous trash"]
  );
};
