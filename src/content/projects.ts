import type { Project, ProjectStatus, Screenshot } from "./types";

/*
 * Every statement below is taken from the project's repository (README, docs,
 * pubspec.yaml, source and commit history) or was confirmed by Yousef.
 * Do not add metrics, user counts or store listings without a source.
 */

// Screenshots live in public/projects/<path>.webp (see `npm run images`).
function slide(path: string, alt: string): Screenshot {
  return { src: `/projects/${path}.webp`, alt, width: 1440, height: 1080 };
}

function phone(path: string, alt: string): Screenshot {
  return { src: `/projects/${path}.webp`, alt, width: 720, height: 1280 };
}

export const statusLabels: Record<ProjectStatus, string> = {
  client: "Client work",
  freelance: "Freelance",
  personal: "Personal project",
  "in-development": "In development",
  concept: "Concept · mock data",
};

export const projects: Project[] = [
  {
    slug: "scenario-omni-channel",
    title: "Scenario Omni Channel",
    tagline: "Mobile client for an omnichannel customer-service platform",
    summary:
      "A Flutter app that lets support agents, supervisors and admins work one shared inbox across WhatsApp, Messenger, Instagram and TikTok from their phones — answering conversations, managing customers and teams, and reviewing analytics.",
    status: "client",
    context: "Scenario Marketing Agency",
    role: "Sole mobile developer",
    period: "2026",
    platforms: ["Android", "iOS"],
    stack: [
      "Flutter",
      "Dart",
      "Riverpod",
      "go_router",
      "Dio",
      "WebSockets",
      "Firebase Cloud Messaging",
      "Secure storage",
      "English / Arabic (RTL)",
      "GitHub Actions",
    ],
    highlights: [
      "Built the full mobile client against an existing Django REST and Channels backend, reusing its session-cookie and CSRF authentication.",
      "REST is the source of truth: WebSocket events and push notifications only invalidate Riverpod providers, so the app never drifts from the server.",
      "Conversation threads with images, documents and recorded voice notes, quoted and swipe-to-reply, retry on failed sends and draft preservation.",
      "Role-based navigation declared once and shared by the drawer and the router guard.",
      "130+ test files; CI runs analysis and tests on every push and pull request.",
      "Released on Google Play.",
    ],
    links: {
      source: "https://github.com/indoo24/SocialOmniChannelMobileApp",
      googlePlay: "https://play.google.com/store/apps/details?id=com.scenario.scenario_mobile",
    },
    screenshots: {
      format: "slides",
      images: [
        slide(
          "scenario-omni-channel/unified-inbox",
          "Unified inbox: WhatsApp, Instagram, TikTok and Messenger conversations in one list, each tagged with its status, lead stage and assigned agent.",
        ),
        slide(
          "scenario-omni-channel/channel-analytics",
          "Channel analytics: conversation volume per channel and a live lead pipeline, computed from the conversation database.",
        ),
        slide(
          "scenario-omni-channel/agent-dashboard",
          "Agent dashboard: open, waiting and resolved conversations, lead quality, purchase claims and response time.",
        ),
        slide(
          "scenario-omni-channel/channel-connections",
          "Channel connections: WhatsApp Business numbers, Facebook Pages and Instagram accounts with live status and one-tap reconnect.",
        ),
        slide(
          "scenario-omni-channel/themes-language",
          "Appearance settings: light, dark or system mode, four colour themes and a switch between English and Arabic.",
        ),
      ],
      caption: "Screens from the Android app.",
    },
    diagram: {
      title: "Architecture",
      layers: [
        { label: "Screens & widgets", detail: "Inbox, threads, customers, dashboard" },
        { label: "Riverpod controllers", detail: "AsyncNotifier per feature" },
        { label: "Repositories", detail: "Typed models over the API" },
        { label: "ApiClient", detail: "Dio · cookie jar · CSRF" },
        { label: "Scenario backend", detail: "Django REST + Channels" },
      ],
      channels: [
        { label: "WebSocket events", detail: "Invalidate providers → refetch" },
        { label: "FCM push", detail: "Invalidate or deep-link" },
      ],
      caption: "Drawn from the project README.",
    },
    caseStudy: {
      overview: [
        "Scenario gives support teams one shared inbox across customer messaging channels, together with customer records, orders, routing, teams and conversation intelligence such as lead scoring and purchase detection.",
        "The mobile app is a second front end for the same Django backend the web app uses: same session, same permissions, same visibility rules. It holds no business logic of its own and renders what the API returns. I built it on my own as the agency's mobile developer.",
      ],
      decisions: [
        {
          title: "Realtime without drift",
          problem:
            "Messages, assignments and notifications arrive over WebSockets while the app is open and through Firebase push when it is in the background. Patching local state from each payload would let the phone slowly disagree with the server.",
          decision:
            "Both channels are treated as invalidation signals only. A realtime bridge and a push bridge invalidate the affected Riverpod providers, which refetch from REST, so every screen shows what the server says.",
        },
        {
          title: "Reusing web sessions safely",
          problem:
            "The backend authenticates with a session cookie and CSRF token rather than bearer tokens, and stale responses can arrive after a user has signed out and back in.",
          decision:
            "Dio with a persistent cookie jar and CSRF header handling. A session epoch stops a late response from an old session ending a newer one, and a single hook turns any 401 into a clean return to sign-in.",
        },
        {
          title: "Permissions in one place",
          problem:
            "Agents, supervisors and admins see different sections. A menu link the role cannot open is a broken experience.",
          decision:
            "Navigation is declared once and read by both the drawer and the go_router guard. It is presentation only; the backend still re-checks every capability.",
        },
        {
          title: "Fewer duplicate requests",
          problem: "Dashboard and analytics screens fire overlapping requests as filters change.",
          decision: "An in-memory query cache de-duplicates dashboard and analytics requests.",
        },
      ],
      practices: [
        "130+ test files covering the API client, authentication and sessions, realtime, push, inbox behaviour and localization-sensitive UI, using mocktail and fake_async.",
        "GitHub Actions workflow running flutter analyze and flutter test on pushes and pull requests to main.",
        "Client error reporting to the backend, a connectivity monitor with an offline-at-launch retry, and a Google Play in-app update prompt.",
        "API reference, OpenAPI spec and security notes kept in the repository.",
      ],
    },
  },
  {
    slug: "aleyada",
    title: "AlEyada",
    tagline: "Arabic-first doctor directory and appointment booking",
    summary:
      "Patients search for doctors, check availability and book appointments; approved doctors manage their clinics, assistants and schedules. A Flutter client for an existing Django REST API.",
    status: "client",
    context: "Scenario Marketing Agency",
    role: "Sole mobile developer",
    period: "2026",
    platforms: ["Android", "iOS"],
    stack: [
      "Flutter",
      "Dart",
      "Riverpod",
      "go_router",
      "Dio",
      "JWT",
      "Secure storage",
      "Arabic / English (RTL)",
      "Light & dark themes",
    ],
    highlights: [
      "Audited the backend's authentication and used its native JWT contract directly — no backend changes required.",
      "Single-flight token refresh: concurrent requests racing an expired token trigger exactly one refresh.",
      "A network outage is not a logout: signed out, token rejected and token unverifiable are three distinct states.",
      "Booking rules, cancellation windows and clinic-timezone display times all come from the server.",
      "Light and dark themes built from colour roles, with a test that checks every pair against WCAG AA.",
      "Released on Google Play.",
    ],
    links: {
      source: "https://github.com/indoo24/AlEyadaMobileApp",
      googlePlay: "https://play.google.com/store/apps/details?id=com.aleyada.app",
    },
    screenshots: {
      format: "slides",
      images: [
        slide(
          "aleyada/home",
          "Home screen with a city filter, doctor search, quick actions, medical specialties and recommended doctors.",
        ),
        slide(
          "aleyada/doctor-search",
          "Doctor search results filtered by specialty and sorted by best match; each card shows experience, consultation fee and how to book.",
        ),
        slide(
          "aleyada/booking-details",
          "Booking details for a confirmed appointment: date, time, duration and clinic, with a Book again button.",
        ),
        slide(
          "aleyada/my-bookings",
          "My bookings with upcoming, past and cancelled tabs; each card shows the doctor, date, time, clinic and status.",
        ),
        slide(
          "aleyada/sign-in",
          "Arabic right-to-left sign-in with phone number and password, plus password reset and account creation.",
        ),
        slide(
          "aleyada/favorites",
          "Favourite doctors with specialty, location, consultation fee and whether online booking is available.",
        ),
        slide(
          "aleyada/cancelled-bookings",
          "Cancelled bookings tab, where each appointment keeps a clear cancelled status badge.",
        ),
        slide(
          "aleyada/cancelled-booking",
          "Details of a cancelled appointment with the visit type on record and a button to book a new appointment.",
        ),
        slide(
          "aleyada/account",
          "Account screen with a verified phone number, notifications, language and appearance settings, and an invitation for doctors to join.",
        ),
        slide(
          "aleyada/splash",
          "Splash screen with the AlEyada mark, an A crossed by a heartbeat line, and the tagline “Your Guide to Better Care”.",
        ),
      ],
      caption: "Screens from the Android app.",
    },
    diagram: {
      title: "Architecture",
      layers: [
        { label: "Feature screens", detail: "Doctors, bookings, practice management" },
        { label: "Riverpod + go_router", detail: "Controllers and declarative guards" },
        { label: "ApiClient", detail: "Dio · auth and error interceptors" },
        { label: "Token store", detail: "Keystore / Keychain" },
        { label: "AlEyada API", detail: "Django REST · JWT" },
      ],
      channels: [
        { label: "401 response", detail: "One refresh, then replay" },
        { label: "Error codes", detail: "Mapped to localized messages" },
      ],
      caption: "Drawn from the project README.",
    },
    caseStudy: {
      overview: [
        "AlEyada (العيادة) is a medical directory. Patients search and filter doctors, view profiles and availability, and book appointments. Doctors apply, get approved and then manage their practice: clinics, assistants, schedules and stats.",
        "The app is a client of the existing Django API and nothing else — no second backend, no business rules of its own, no duplicated validation. I built it alone as the agency's mobile developer.",
      ],
      decisions: [
        {
          title: "Straight to Django, not through the web BFF",
          problem:
            "The website routes authentication through its own backend-for-frontend to keep tokens out of browser JavaScript. Copying that on mobile would add a hop, a cookie jar and CSRF handling.",
          decision:
            "After confirming JWT is the backend's only authentication class, the app uses the access/refresh pair natively and keeps it in Keystore and Keychain. No backend change was needed.",
        },
        {
          title: "Refresh without logging people out",
          problem:
            "The backend rotates and blacklists refresh tokens. Ten requests hitting an expired access token would start ten refreshes, and nine would present a token that had just been blacklisted.",
          decision:
            "Refresh is single-flight: one refresh runs while the other requests wait, the rotated token is stored, and every original request is replayed.",
        },
        {
          title: "Offline is not signed out",
          problem:
            "Throwing away a valid seven-day session because a train entered a tunnel would be the worst bug the app could have.",
          decision:
            "Session restore separates no token, token rejected and token unverifiable. Only the first two sign the user out; the third keeps the session and offers a retry.",
        },
        {
          title: "Times in the clinic's timezone",
          problem:
            "Formatting appointment times from UTC on the phone would show a patient who is abroad the wrong hour.",
          decision:
            "The app renders the backend's display date and time, formatted in the clinic's timezone, and treats money as a decimal string end to end.",
        },
      ],
      practices: [
        "Contract-first tests: every DTO is parsed from a response captured from the real API, so a field-name or nullability mismatch fails in tests rather than in production.",
        "Widget tests run through the real ApiClient with only the HTTP adapter swapped.",
        "Obfuscated release builds with archived debug symbols; internet is the only Android permission, backups are disabled and cleartext HTTP is refused in release.",
        "A guard test fails the build if a raw colour is used outside the theme layer.",
      ],
    },
  },
  {
    slug: "saloonsa-pos",
    title: "Saloonsa POS",
    tagline: "Salon cashier app with Arabic thermal-receipt printing",
    summary:
      "A Flutter point-of-sale app for salons and barbershops. Staff build invoices from the salon's services, issue tax invoices with QR codes, and print receipts on Bluetooth thermal printers — in Arabic.",
    status: "freelance",
    context: "Freelance · ended before launch",
    role: "Mobile developer",
    period: "2025 – 2026",
    platforms: ["Android"],
    stack: [
      "Flutter",
      "Dart",
      "BLoC / Cubit",
      "ESC/POS",
      "Bluetooth Classic",
      "PDF generation",
      "REST API",
      "shared_preferences",
    ],
    highlights: [
      "Image-based printing pipeline that renders receipts as bitmaps, so Arabic prints correctly on any Classic Bluetooth thermal printer.",
      "Printer discovery across built-in Sunmi printers, paired devices and nearby devices, with Android 8–14 permission handling.",
      "Tax invoices with a ZATCA-format QR code, plus A4 PDF invoices.",
      "BLoC/Cubit state for authentication, cashier and printer flows, with errors mapped to Arabic and English messages.",
    ],
    links: {
      source: "https://github.com/indoo24/Saloonsa-POS",
    },
    screenshots: {
      format: "phones",
      images: [
        phone(
          "saloonsa-pos/cashier",
          "Arabic cashier screen with customer search, service category tabs and a grid of services with prices in Saudi riyals.",
        ),
        phone(
          "saloonsa-pos/invoice-cart",
          "Invoice sheet listing the selected services, the staff member for each, and the running total.",
        ),
        phone(
          "saloonsa-pos/checkout",
          "Checkout with subtotal before VAT, discount, 15% VAT, final total and amount paid, plus save, preview and print actions.",
        ),
        phone(
          "saloonsa-pos/invoice-details",
          "Invoice details form: number, customer, date, cashier, branch, payment method and due date, followed by the services.",
        ),
        phone(
          "saloonsa-pos/printer-settings",
          "Printer settings: paper size (58 mm, 80 mm or A4), a sample receipt preview and printer search over Wi-Fi, Bluetooth or USB.",
        ),
        phone(
          "saloonsa-pos/shop-settings",
          "Shop settings synced from the server: name, address, phone, tax number and an invoice footer note.",
        ),
        phone("saloonsa-pos/service-filter", "Cashier screen filtered to the skin-care category."),
        phone(
          "saloonsa-pos/splash",
          "Salon POS splash screen with the salon's logo and the tagline “Professional Salon Management”.",
        ),
      ],
      caption: "Screens from the Android app.",
    },
    diagram: {
      title: "Printing pipeline",
      layers: [
        { label: "Invoice data", detail: "Services, totals, VAT, QR payload" },
        { label: "Flutter widget", detail: "Receipt laid out like any screen" },
        { label: "Pixel image", detail: "Rasterised off-screen" },
        { label: "Monochrome bitmap", detail: "Thresholded for thermal paper" },
        { label: "ESC/POS raster bytes", detail: "Sent over Bluetooth Classic" },
      ],
      caption: "Drawn from the project documentation.",
    },
    caseStudy: {
      overview: [
        "Saloonsa POS is a cashier app for salons and barbershops. It signs in against the Saloonsa API, lets staff build invoices from the salon's services, and prints them on the spot.",
        "I built it as a freelance project. The engagement ended before the app was completed, so it was never released.",
        "Most of the engineering went into printing. Inexpensive Bluetooth thermal printers cannot shape Arabic text from ESC/POS text commands, and the app had to work across printer brands, paper sizes and Android versions.",
      ],
      decisions: [
        {
          title: "Print pixels, not text",
          problem:
            "ESC/POS text commands cannot shape Arabic script, and code pages differ between printer brands.",
          decision:
            "Every receipt is rendered as a Flutter widget, rasterised to a monochrome bitmap and sent as ESC/POS raster bytes. Text commands are never used, so output looks the same on every printer.",
        },
        {
          title: "Find the printer, whatever it is",
          problem:
            "Some salons use Sunmi terminals with built-in printers; others pair a standalone Bluetooth printer with a phone.",
          decision:
            "A unified discovery service queries built-in, paired and nearby devices together, with a timeout and fallback so paired printers always appear.",
        },
        {
          title: "Permissions across Android 8–14",
          problem:
            "Bluetooth permissions changed shape across Android versions, and a denied permission looks exactly like “no printers found”.",
          decision:
            "Version-specific permission requests, validation before connecting, and an error mapper that turns low-level failures into actionable Arabic and English messages.",
        },
      ],
      practices: [
        "30+ documents in the repository covering architecture, Bluetooth permissions, error codes and testing guides.",
        "A PDF test mode for checking receipt layouts without a printer.",
        "Structured logging and a connectivity monitor.",
      ],
    },
  },
  {
    slug: "intelligent-todo",
    title: "Intelligent Todo",
    tagline: "Task manager with machine-learning priority suggestions",
    summary:
      "A Flutter task manager with Firebase sign-in and Firestore sync. A small Flask service runs a TF-IDF and Naive Bayes model that classifies each task as high, medium or low priority.",
    status: "personal",
    context: "Personal project",
    role: "Developer",
    period: "2024 – 2025",
    platforms: ["Android", "iOS"],
    stack: [
      "Flutter",
      "Provider",
      "Firebase Auth",
      "Cloud Firestore",
      "Python",
      "Flask",
      "scikit-learn",
      "English / Arabic",
    ],
    highlights: [
      "Firebase Authentication and Cloud Firestore for accounts and tasks.",
      "Priority classification served over HTTP from a Flask endpoint.",
      "Light and dark themes, English and Arabic.",
    ],
    links: {
      source: "https://github.com/indoo24/Intelligent_Todo_app",
    },
    screenshots: {
      format: "phones",
      images: [
        {
          src: "/projects/intelligent-todo/home-dark.webp",
          alt: "Intelligent Todo home screen in dark mode: a date strip above three task cards marked high, medium and low priority.",
          width: 600,
          height: 1271,
        },
        {
          src: "/projects/intelligent-todo/home-light.webp",
          alt: "The same task list in light mode with colour-coded priority labels.",
          width: 600,
          height: 1271,
        },
        {
          src: "/projects/intelligent-todo/add-task-arabic.webp",
          alt: "Add-task sheet in Arabic with right-to-left layout, title and description fields, and date and time pickers.",
          width: 600,
          height: 1271,
        },
      ],
      caption: "Screenshots from the project repository.",
    },
  },
  {
    slug: "bahaa-discover",
    title: "Bahaa Discover",
    tagline: "Tourism guide for Saudi Arabia's Al Baha region",
    summary:
      "A tourism guide built with Clean Architecture and BLoC: places, events, a region map, QR check-ins with points and badges, a premium plan and offline downloads. It runs on mock data and is not connected to a backend yet.",
    status: "concept",
    context: "Concept",
    role: "Developer",
    period: "2026",
    platforms: ["Android", "iOS"],
    stack: ["Flutter", "BLoC", "Clean Architecture", "get_it", "dartz", "go_router"],
    highlights: [],
    links: {
      source: "https://github.com/indoo24/bahaa_discover",
    },
    screenshots: {
      format: "phones",
      images: [
        phone(
          "bahaa-discover/home",
          "Home screen with today's weather, feature shortcuts, quick suggestions and categories.",
        ),
        phone(
          "bahaa-discover/explore",
          "Explore places with a search bar, category filters and a place card with rating and distance.",
        ),
        phone("bahaa-discover/places", "Featured places with ratings, tags and visit counts."),
        phone(
          "bahaa-discover/map",
          "Map screen with a link to Google Maps and a list of places in the Al Baha region.",
        ),
        phone(
          "bahaa-discover/qr-scan",
          "QR scanner for collecting points at landmarks, restaurants and events.",
        ),
        phone(
          "bahaa-discover/badges",
          "Achievements screen with points, visits and trails counters.",
        ),
        phone(
          "bahaa-discover/achievements",
          "Locked achievement badges with the points needed to unlock each one.",
        ),
        phone(
          "bahaa-discover/events",
          "Events screen with category filters and an empty state when nothing matches.",
        ),
        phone(
          "bahaa-discover/premium",
          "Premium plan screen listing benefits such as no ads, featured trails, offline downloads and priority support.",
        ),
        phone(
          "bahaa-discover/offline",
          "Offline mode settings for downloading the region map, place information, walking trails and the tourist guide.",
        ),
        phone(
          "bahaa-discover/splash",
          "Splash screen with a tree mark and the Arabic title “Discover Al Baha”.",
        ),
      ],
      caption: "Screens from the app, running on mock data.",
    },
  },
  {
    slug: "honest-squash",
    title: "Honest Squash",
    tagline: "Squash court reservation app",
    summary:
      "Court booking for a squash academy: court schedules, reservations with QR codes, coaches and an admin area. Feature-first Clean Architecture with Bloc/Cubit and Firebase-ready repositories that run on demo data until Firebase is configured.",
    status: "in-development",
    context: "In development",
    role: "Developer",
    period: "2026",
    platforms: ["Android", "iOS"],
    stack: ["Flutter", "Bloc / Cubit", "Clean Architecture", "get_it", "go_router", "Firebase"],
    highlights: [],
    links: {
      source: "https://github.com/indoo24/Honest-Acadimy",
    },
  },
];

export const caseStudies = projects.filter((project) => project.caseStudy);
export const otherProjects = projects.filter((project) => !project.caseStudy);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
