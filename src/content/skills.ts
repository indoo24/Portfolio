import type { SkillGroup } from "./types";

// `usedIn` names projects whose repositories show the skill in use.
export const skillGroups: SkillGroup[] = [
  {
    title: "Mobile development",
    items: [
      { name: "Flutter", usedIn: ["Scenario", "AlEyada", "Saloonsa POS"] },
      { name: "Dart", usedIn: ["Scenario", "AlEyada", "Saloonsa POS"] },
      { name: "Android builds & permissions", usedIn: ["AlEyada", "Saloonsa POS"] },
      { name: "Localization & RTL (gen-l10n)", usedIn: ["Scenario", "AlEyada"] },
      { name: "Theming with light & dark modes", usedIn: ["AlEyada", "Intelligent Todo"] },
      { name: "Bluetooth & thermal printing", usedIn: ["Saloonsa POS"] },
    ],
  },
  {
    title: "State management & architecture",
    items: [
      { name: "Riverpod", usedIn: ["Scenario", "AlEyada"] },
      { name: "BLoC / Cubit", usedIn: ["Saloonsa POS", "Honest Squash", "Bahaa Discover"] },
      { name: "Provider", usedIn: ["Intelligent Todo"] },
      { name: "Clean Architecture", usedIn: ["Honest Squash", "Bahaa Discover"] },
      { name: "Feature-first structure & repositories", usedIn: ["Scenario", "AlEyada"] },
      { name: "go_router with guards", usedIn: ["Scenario", "AlEyada"] },
    ],
  },
  {
    title: "Backend integration",
    items: [
      { name: "REST APIs with Dio", usedIn: ["Scenario", "AlEyada"] },
      { name: "JWT & session-cookie auth", usedIn: ["AlEyada", "Scenario"] },
      { name: "WebSockets", usedIn: ["Scenario"] },
      { name: "OpenAPI contracts", usedIn: ["Scenario"] },
      { name: "Python / Flask service", usedIn: ["Intelligent Todo"] },
    ],
  },
  {
    title: "Storage & Firebase",
    items: [
      { name: "Firebase Cloud Messaging", usedIn: ["Scenario"] },
      { name: "Firebase Auth & Cloud Firestore", usedIn: ["Intelligent Todo"] },
      { name: "flutter_secure_storage", usedIn: ["Scenario", "AlEyada"] },
      { name: "shared_preferences", usedIn: ["AlEyada", "Saloonsa POS", "Intelligent Todo"] },
    ],
  },
  {
    title: "Tools & workflow",
    items: [
      { name: "Git & GitHub" },
      { name: "GitHub Actions CI", usedIn: ["Scenario"] },
      { name: "flutter_test & API mocking", usedIn: ["Scenario", "AlEyada"] },
      { name: "Postman" },
      { name: "Figma" },
    ],
  },
];
