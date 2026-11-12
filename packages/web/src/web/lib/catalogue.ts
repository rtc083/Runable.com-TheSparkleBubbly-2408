export const storeUrl = "https://take.app/sparklebubbly";
export const whatsapp = (
  text = "Hello The Sparkle Bubbly! I would love to know more about your alcohol-free grape juice range.",
) => `https://wa.me/27645776111?text=${encodeURIComponent(text)}`;
export const products = [
  {
    id: "mcgregor-red",
    brand: "McGregor Winery",
    name: "Sparkling Red Grape",
    size: "750 ml · Cork finish",
    price: 450,
    type: "celebration",
    image: "mcgregor-red.png",
    tone: "rose",
    description:
      "Vibrant red grape character and celebratory bubbles. A thoughtful pour for dinner tables and milestone moments.",
  },
  {
    id: "mcgregor-white",
    brand: "McGregor Winery",
    name: "Sparkling White Grape",
    size: "750 ml · Cork finish",
    price: 450,
    type: "celebration",
    image: "mcgregor-white.png",
    tone: "champagne",
    description:
      "Fresh white grape sparkle with an elegant profile. Welcome your guests with a beautifully chilled glass.",
  },
  {
    id: "ashton-red",
    brand: "Ashton Vintage",
    name: "Sparkling Red Grape",
    size: "750 ml · Cork finish",
    price: 450,
    type: "celebration",
    image: "ashton-red.png",
    tone: "pink",
    description:
      "A champagne-style presentation for red grape refreshment. Made for gifting, receptions and inclusive toasts.",
  },
  {
    id: "ashton-white",
    brand: "Ashton Vintage",
    name: "Sparkling White Grape",
    size: "750 ml · Cork finish",
    price: 450,
    type: "celebration",
    image: "ashton-white.png",
    tone: "cream",
    description:
      "A luminous white grape pour with delicate bubbles, beautifully presented for daytime celebrations.",
  },
  {
    id: "red-bottle",
    brand: "Ashton",
    name: "Red Grape Juice",
    size: "340 ml · Screw-cap bottle",
    price: 165,
    type: "portable",
    image: "red-bottle.png",
    tone: "pink",
    description:
      "Still red grape juice in an easy-to-carry glass bottle. For the picnic basket, welcome bag and everyday pause.",
  },
  {
    id: "red-can",
    brand: "Ashton",
    name: "Sparkling Red Grape Can",
    size: "300 ml · Aluminium can",
    price: 155,
    type: "portable",
    image: "red-can.png",
    tone: "rose",
    description:
      "Red grape sparkle in a convenient single-serve can. Ready for relaxed entertaining and chilled refreshment.",
  },
] as const;
export const money = (amount: number) =>
  `R ${amount.toLocaleString("en-ZA", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
export const faqs = [
  [
    "Is The Sparkle Bubbly range alcohol-free?",
    "Yes. Our catalogue is a non-alcoholic grape juice collection. The 750 ml celebration bottles and 300 ml cans are sparkling; the 340 ml red grape bottle is a still juice option.",
  ],
  [
    "What is the difference between red and white grape juice?",
    "Red grape juice offers a fuller grape character, while white grape juice has a fresh, lighter profile. Choose red for richer menus or white for a crisp welcome pour—or offer both so every guest can choose.",
  ],
  [
    "How many bottles or cans come in a case?",
    "Each listed case contains six units. Indicative prices are R 450 for a six-bottle 750 ml case, R 165 for six 340 ml bottles and R 155 for six 300 ml cans. Confirm current prices and availability in our Take App store.",
  ],
  [
    "Can I order for a wedding, venue or corporate event?",
    "Absolutely. We welcome enquiries from event planners, hospitality venues, caterers and retail partners. Send us your date, guest count and preferred products on WhatsApp for a tailored bulk quotation.",
  ],
  [
    "Where are you based, and how do I arrange delivery?",
    "The Sparkle Bubbly is based at 6 Pike Close, Hagley, Cape Town, 7580, South Africa. Contact us to confirm delivery arrangements and charges for your location. Please arrange any collection or visit with us first.",
  ],
  [
    "How should I serve sparkling grape juice?",
    "Serve chilled in a flute or your favourite glass, and open cork-finished bottles carefully, pointing them away from people. Keep opened juice refrigerated and follow the storage instructions on each product label.",
  ],
];
