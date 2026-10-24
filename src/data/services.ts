export interface Service {
  title: string;
  description: string;
}

export const services: Service[] = [
  { title: "Face ID repair", description: "Face ID not working, or saying it is unavailable? We check the sensors at the top of the screen and tell you what can be repaired." },
  { title: "Screen repair", description: "Cracked glass, dead touch, lines or a dim display. We replace damaged screens and explain your options first." },
  { title: "Charging issues", description: "Not charging, charging slowly or only at an angle? We check the cable, port and battery side to find the cause." },
  { title: "Dead iPhones", description: "A phone that will not switch on is not always finished. We trace the fault and tell you honestly if it can be revived." },
  { title: "Network / searching", description: "Stuck on Searching or No Service with a good SIM? We check the SIM tray and the network hardware on the board." },
  { title: "Logic-board repair and iOS update", description: "Board-level repair using microsoldering, plus iOS updates and restores when the problem is software." },
  { title: "Board swap for data recovery", description: "When a phone cannot start but your data matters, a board swap can help recover it. Ask whether your phone qualifies." },
  { title: "Screen baking", description: "A heat treatment used for some display faults. We tell you if it suits your phone before we try it." },
  { title: "Green screen repair", description: "A green tint or lines on the display. We find out whether the screen or the board is at fault and fix it." },
  { title: "Memory / storage upgrade", description: "Running out of space? Storage can be upgraded on some iPhone models. Message us your model to check." },
  { title: "Flashing and unlocking of phones", description: "Flashing and unlocking of phones. Message us the phone model and what you need." },
];

export const serviceNote = "We confirm what is possible after we see the phone.";

export const offers = [
  { title: "Phones", text: "Latest iPhones and other phones, including UK-used." },
  { title: "Laptops", text: "Ask us which laptops are available today." },
  { title: "Apple repairs", text: "iPhone, iPad and other devices, with microsoldering." },
  { title: "Accessories", text: "Cables and other accessories. Ask what is in stock." },
  { title: "Flashing and unlocking", text: "Flashing and unlocking of phones. Message us the model." },
] as const;
