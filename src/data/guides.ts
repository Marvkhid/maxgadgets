export interface Tip {
  title: string;
  text: string;
}

export const buyingTips: Tip[] = [
  { title: "Check the battery health", text: "On an iPhone, open Settings, Battery, Battery Health. Ask us for the figure before you buy a used phone." },
  { title: "Make sure it is signed out of iCloud", text: "A used iPhone must be signed out of the previous owner's Apple ID, or Activation Lock can block you. Check it on the spot." },
  { title: "Test Face ID and the cameras", text: "Set up Face ID, open the front and back cameras and check the flash." },
  { title: "Test charging and sound", text: "Charge it, make a call on speaker and play a video to check the speakers and microphone." },
  { title: "Check the network", text: "Put your SIM in and confirm that calls, data and Wi-Fi all work." },
  { title: "Ask about the warranty", text: "Eligible UK-used gadgets at Max Gadgets carry a 7-day warranty. Ask what applies to your phone." },
  { title: "Match storage to your life", text: "Heavy photo, video and WhatsApp users should think about more storage. Ask us what is available." },
];

export const careTips: Tip[] = [
  { title: "Charge it right", text: "Use an original or certified charger. If your power keeps fluctuating, charge through a surge protector." },
  { title: "Keep it cool", text: "Do not leave your phone in direct sun, a hot car or on a dashboard. Take a thick case off if it gets warm while charging." },
  { title: "Protect the screen", text: "A good case and screen protector cost far less than a cracked display." },
  { title: "Back up often", text: "Back up photos and chats to iCloud or Google Photos, and turn on your WhatsApp chat backup." },
  { title: "Keep iOS updated", text: "Updates fix bugs and security problems. Install them when your battery is above half." },
  { title: "Clear space", text: "Clear big WhatsApp videos and old downloads so your phone stays quick." },
];

export interface GlossaryTerm {
  term: string;
  meaning: string;
}

export const glossary: GlossaryTerm[] = [
  { term: "Microsoldering", meaning: "Repairing tiny components on the logic board under magnification with a very fine soldering tool." },
  { term: "Logic board", meaning: "The main circuit board inside the phone. It is the phone's brain." },
  { term: "Board swap", meaning: "Moving or replacing a board so a phone can start or your data can be recovered. It depends on the fault." },
  { term: "Screen baking", meaning: "A heat process used for some display faults. We tell you if it suits your phone." },
  { term: "Flashing", meaning: "Reinstalling or updating a phone's operating software." },
  { term: "Unlocking", meaning: "Removing a lock that stops a phone working as intended, such as a network lock. Message us the model and what you need." },
  { term: "Face ID", meaning: "Facial recognition. Its sensors sit in the notch or island at the top of the screen." },
  { term: "Green screen", meaning: "A green tint or lines on the display, often caused by a display or board fault." },
  { term: "iOS update or restore", meaning: "An update keeps your data. A restore erases the phone and reinstalls the software." },
];

export interface AnatomyLayer {
  name: string;
  blurb: string;
  fixes: string[];
}

export const anatomy: AnatomyLayer[] = [
  { name: "Display", blurb: "The glass you touch and see. The Face ID sensors sit at the top.", fixes: ["Screen repair", "Green screen repair", "Screen baking", "Face ID repair"] },
  { name: "Logic board", blurb: "The main circuit board. Board-level faults need microsoldering.", fixes: ["Logic-board repair", "Board swap for data recovery", "Network / searching", "Dead iPhones"] },
  { name: "Battery", blurb: "Powers everything. Heat or fast drain can point here. Ask us if you think your battery is the problem.", fixes: [] },
  { name: "Frame, port and back", blurb: "The charging port at the bottom takes the charge, and the back glass protects the rest.", fixes: ["Charging issues"] },
];
