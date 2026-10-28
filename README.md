# MomCare (React Native / Expo port)

A React Native Android app — a gentle postpartum wellness companion with mood
check-ins, a private journal, self-care tips, and crisis/support resources.

## Getting started

```bash
npm install
npx expo start
```

Then press `a` for Android, `i` for iOS (Mac only), or scan the QR code with
the Expo Go app on your phone.

## What's included

- **Bottom tab navigation** — Home, Self-Care, Journal, Support (same four
  screens as the original `Screen` sealed class + `NavigationBar` in
  `MainActivity.kt`).
- **Mood check-ins** with emoji buttons + optional note (`HomeScreen`).
- **Private journal** with save/list of entries (`JournalScreen`).
- **Self-care tips** list (`SelfCareTipsScreen`).
- **Support resources** with tap-to-call and tap-to-visit links, including
  PSI Helpline, the National Maternal Mental Health Hotline, and 988
  (`ResourcesScreen`).
- **Local persistence** via `@react-native-async-storage/async-storage`,
  replacing the original Room/SQLite database.
- **Daily reminder notification** via `expo-notifications`, replacing the
  original WorkManager `ReminderWorker` + `Scheduler`.
- Same soft, calming color palette (blush pink / warm rose / sage green /
  cream / lavender) as the original `Color.kt` / `Theme.kt`.

## Project structure

```
App.js                          Entry point + tab navigator (was MainActivity.kt)
src/
  theme/colors.js                Color palette + typography (was Color.kt / Theme.kt)
  data/
    MomCareContext.js            AsyncStorage-backed store (was Room DB + Repository + ViewModel)
    selfCareTips.js               Tip list (was in MomCareRepository.kt / ReminderWorker.kt)
    resources.js                  Support resources list (was in ResourcesScreen.kt)
  notifications/reminders.js      Daily reminder scheduling (was Scheduler.kt / ReminderWorker.kt)
  screens/
    HomeScreen.js
    SelfCareTipsScreen.js
    JournalScreen.js
    ResourcesScreen.js
```

## Notes on the port

- The original app used Room (SQLite) for storage; this port uses
  AsyncStorage, which is simpler and sufficient for this data volume. If you
  need SQL queries or larger datasets, swap in `expo-sqlite` or
  `@nozbe/watermelondb`.
- The daily reminder is scheduled for 10:00 AM local time and repeats daily,
  matching the spirit of the original's `PeriodicWorkRequestBuilder(1, DAYS)`.
  Exact-time daily notifications on Android require the app to remain
  installed and, on some OEMs, battery-optimization exemptions — same
  real-world caveat the original WorkManager version had.
- This is a bare Expo-managed project; no native Android/iOS folders are
  checked in. Run `npx expo prebuild` if you need to eject to bare workflow.
