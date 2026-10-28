import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { randomTip } from '../data/selfCareTips';

const REMINDER_CHANNEL_ID = 'momcare_daily_reminder';
const REMINDER_IDENTIFIER = 'momcare-daily-reminder';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function createReminderNotificationChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(REMINDER_CHANNEL_ID, {
      name: 'Daily Self-Care Reminder',
      description: 'A gentle daily nudge to check in with yourself.',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
}

export async function requestNotificationPermission() {
  // Android 13+ / iOS both require runtime permission to post notifications.
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    return finalStatus === 'granted';
  }
  return false;
}

export async function scheduleDailyReminder() {
  const existing = await Notifications.getAllScheduledNotificationsAsync();
  const alreadyScheduled = existing.some(
    (n) => n.identifier === REMINDER_IDENTIFIER
  );
  if (alreadyScheduled) return;

  const tip = randomTip();

  await Notifications.scheduleNotificationAsync({
    identifier: REMINDER_IDENTIFIER,
    content: {
      title: 'A moment for you 🌸',
      body: tip,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      channelId: REMINDER_CHANNEL_ID,
      hour: 10,
      minute: 0,
    },
  });
}
