import PushNotificationIOS from "@react-native-community/push-notification-ios";
var PushNotification = require("react-native-push-notification");

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

// PushNotification.configure({
//       // (optional) Called when Token is generated (iOS and Android)
//       onRegister: function(token) {
//         console.log('TOKEN:', token)
//       },// (required) Called when a remote or local notification is opened or received
//       onNotification: function(notification) {
//         console.log('REMOTE NOTIFICATION ==>', notification)// process the notification here
//       },
//       // Android only: GCM or FCM Sender ID
//       senderID: '639121968729',
//       popInitialNotification: true,
//       requestPermissions: true
//     })

// PushNotification.onNotification((notification) => {
//   // Note that the notification object structure is different from Android and IOS
//   console.log('in app notification', notification);

//   // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/push-notification-ios#finish)
//   notification.finish(PushNotificationIOS.FetchResult.NoData);
// });

// // get the registration token
// // This will only be triggered when the token is generated or updated.
// PushNotification.onRegister((token) => {
//   console.log('in app registration', token);
// });

// // get the notification data when notification is opened
// PushNotification.onNotificationOpened((notification) => {
//   console.log('the notification is opened', notification);
// });
