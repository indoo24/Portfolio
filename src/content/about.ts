export const aboutParagraphs: string[] = [
  "I'm Yousef Mohamed Kandeel, a Flutter developer and software engineer. I'm the mobile developer at Scenario Marketing Agency, where I built the Scenario Omni Channel and AlEyada apps on my own — architecture, API integration, tests and release builds.",
  "Most of my work sits on the boundary between the app and the backend: authentication and sessions, realtime updates, contracts with Django REST APIs, and the failure cases in between — dropped networks, expired tokens, printers that won't pair.",
  "I like code that stays easy to change: clear layers, one state-management approach per app, and tests written against the real API contracts. Many of the apps I build are Arabic-first, so right-to-left layout is part of the design from the start.",
];

export const principles: { title: string; body: string }[] = [
  {
    title: "The server decides",
    body: "Apps render what the API returns instead of keeping a second copy of the business rules.",
  },
  {
    title: "Plan for failure",
    body: "Offline, expired tokens and denied permissions each get their own state and a way forward.",
  },
  {
    title: "Test the contract",
    body: "Parse real API responses in tests, so a mismatch fails before release, not after.",
  },
  {
    title: "RTL from day one",
    body: "Layout direction comes from the locale, so screens work in Arabic and English alike.",
  },
];

export const experience = {
  role: "Mobile Developer",
  company: "Scenario Marketing Agency",
  period: "Current role",
  contributions: [
    "Sole mobile developer for Scenario Omni Channel, a customer-service inbox app built with Flutter, Riverpod, WebSockets and Firebase Cloud Messaging.",
    "Sole mobile developer for AlEyada, an Arabic-first doctor directory and booking app built with Flutter, Riverpod and JWT authentication.",
    "Integrated both apps directly with the agency's Django REST backends, keeping API references and mobile–backend sync notes in the repositories.",
    "Set up a GitHub Actions pipeline that analyzes and tests Scenario on every push, and obfuscated release builds for AlEyada.",
  ],
};
