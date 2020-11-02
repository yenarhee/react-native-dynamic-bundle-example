// get the notification data when notification is received
import PushNotification from '@aws-amplify/pushnotification';
import {PushNotificationIOS} from '@react-native-community/push-notification-ios';

PushNotification.onNotification((notification) => {
  // Note that the notification object structure is different from Android and IOS
  console.log('in app notification', notification);

  // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/push-notification-ios#finish)
  notification.finish(PushNotificationIOS.FetchResult.NoData);
});

// get the registration token
// This will only be triggered when the token is generated or updated.
PushNotification.onRegister((token) => {
  console.log('in app registration', token);
});

// get the notification data when notification is opened
PushNotification.onNotificationOpened((notification) => {
  console.log('the notification is opened', notification);
});
