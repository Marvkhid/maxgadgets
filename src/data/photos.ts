export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const photos = {
  store: { src: "/images/store.jpg", alt: "The Max Gadget Enterprise shop front with its red sign at Block A, Shop 13, Fayose Market", width: 771, height: 1135 },
  iphones: { src: "/images/iphones.jpg", alt: "Boxed iPhones in maroon, blue and black stacked on a display table", width: 973, height: 1280 },
  ipads: { src: "/images/ipads.jpg", alt: "Stacks of boxed iPads on a table", width: 1280, height: 1059 },
  cables: { src: "/images/cables.jpg", alt: "A stack of braided charging cables in their packaging", width: 1273, height: 1280 },
  cracked: { src: "/images/cracked.jpg", alt: "A cracked iPhone display removed from the phone", width: 960, height: 1280 },
  working: { src: "/images/working.jpg", alt: "An iPhone with a bright, working display held in a hand", width: 960, height: 1280 },
  nosim: { src: "/images/nosim.jpg", alt: "An iPhone lock screen showing a No SIM Available message", width: 720, height: 1280 },
  workingMtn: { src: "/images/workingmtn.jpg", alt: "An iPhone lock screen showing the MTN network and LTE signal", width: 778, height: 1280 },
  screenOff: { src: "/images/screenoff.jpg", alt: "An iPhone with its screen removed, held over the open frame", width: 592, height: 1053 },
  blackBack: { src: "/images/blackback.jpg", alt: "The back of a black iPhone held in a hand", width: 592, height: 1053 },
  boardOpen: { src: "/images/boardopen.jpg", alt: "An iPhone opened on the repair bench with its logic board exposed", width: 832, height: 1280 },
  boardPurple: { src: "/images/boardpurple.jpg", alt: "A logic board lifted out of a purple iPhone and held against its back", width: 858, height: 1280 },
  counterPos: { src: "/images/counter-pos.jpg", alt: "Illustrative image: a customer and a Max Gadget Enterprise team member at the shop counter, with phones and laptops on the shelves behind", width: 848, height: 1247 },
  microscope: { src: "/images/repair-microscope.jpg", alt: "Illustrative image: a technician repairing a phone under a microscope at the Max Gadget Enterprise counter while a customer watches", width: 848, height: 1247 },
  badGoodBack: { src: "/images/bad-good-back.jpg", alt: "A phone with a shattered glass back shown above, and a restored phone with a working screen shown below", width: 848, height: 1247 },
  badGoodCharging: { src: "/images/bad-good-charging.jpg", alt: "A phone with a damaged charging port shown above, and a phone showing 100% charged below", width: 848, height: 1247 },
  benchScene: { src: "/images/bench-scene.jpg", alt: "The Max Gadget Enterprise repair bench with a microscope, a phone with a shattered screen, a working phone and loose phone parts on a blue mat", width: 848, height: 1247 },
} as const satisfies Record<string, Photo>;

export type PhotoName = keyof typeof photos;
