export const business = {
  name: "Max Gadgets",
  legalName: "Max Gadget Enterprise",
  address: {
    line1: "Block A, Shop 13, Fayose Market",
    line2: "Ado-Ekiti, Ekiti State, Nigeria",
  },
  phones: [
    { display: "+234 706 263 5457", tel: "+2347062635457", wa: "2347062635457" },
    { display: "+234 802 277 7600", tel: "+2348022777600", wa: "2348022777600" },
  ],
  email: "Surprisemax123@gmail.com",
  closedDay: "Sunday",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Fayose+Market+Ado-Ekiti",
  mapsEmbed: "https://www.google.com/maps?q=Fayose+Market,+Ado-Ekiti&output=embed",
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop iPhones" },
  { href: "/repairs", label: "Repairs & Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Reviews & Contact" },
] as const;
