// import firebase from 'react-native-firebase';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Alert } from 'react-native';
// import { refreshNotificationsList, refreshTravelsList } from './List';
// import { AppNavigation } from '../common';
// import {
//   navigateToNotificationDetails,
//   refreshDetails,
// } from './notificationHelper';
// import { NotificationsRepo } from '../repo';
// const notificationsRepo = new NotificationsRepo();

// export default class Notifications {
//   cancelNotifications = () => {
//     firebase.notifications().cancelAllNotifications();
//     // This does in fact NOT cancel all notifications since repeating ones that have already been displayed will continue forever
//     firebase.notifications().removeAllDeliveredNotifications();
//   };

//   createNotificationChannel = () => {
//     // Build a channel
//     console.log("createNotificationChannel ",)
//     const channel = new firebase.notifications.Android
//       .Channel(
//         '81893479098',
//         'Test Channel',
//         firebase.notifications.Android.Importance.Max
//       )
//       .setDescription('My apps test channel');

//     // Create the channel
//     firebase.notifications().android.createChannel(channel);
//   };

//   async checkPermission() {
//     const enabled = await firebase.messaging().hasPermission();
//     // If Premission granted proceed towards token fetch
//     if (enabled) {
//       this.getToken();
//       if (Platform.OS === 'android')
//         this.createNotificationChannel();
//       this.createNotificationListeners();
//     } else {
//       // If permission hasn’t been granted to our app, request user in requestPermission method.
//       this.requestPermission();
//     }
//   }

//   async getToken() {
//     let fcmToken = await AsyncStorage.getItem('fcmToken');
//     if (!fcmToken) {
//       fcmToken = await firebase.messaging().getToken();
//       if (fcmToken) {
//         // user has a device token
//         await AsyncStorage.setItem('fcmToken', fcmToken);
//       }
//     }
//   }

//   async requestPermission() {
//     try {
//       await firebase.messaging().requestPermission();
//       // User has authorised
//       // this.getToken();
//       this.createNotificationListeners();
//     } catch (error) {
//       // User has rejected permissions
//       console.log('permission rejected');
//     }
//   }

//   async createNotificationListeners() {
//     // This listener triggered when notification has been received in foreground
//     this.notificationListener = firebase
//       .notifications()
//       .onNotification((notification) => {
//         const { title, body, notificationId, data } = notification;
//         console.log(notification, 'notification');
//         notificationsRepo.getUnReadCounter();
//         if (AppNavigation.currentScreen === 'notifications') {
//           refreshNotificationsList();
//         } else if (AppNavigation.currentScreen === 'myTravels') {
//           refreshTravelsList();
//         } else if (AppNavigation.currentScreen === 'tripDetails') {
//           refreshDetails('Trip');
//         } else if (AppNavigation.currentScreen === 'eventDetails') {
//           refreshDetails('Event');
//         }

//         this.displayNotification(title, body, notificationId, data);
//       });

//     // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
//     this.notificationOpenedListener = firebase
//       .notifications()
//       .onNotificationOpened(async (notificationOpen) => {
//         // this.displayNotification(title, body);
//         console.log("when app is in backgound and we click --------------------------", notificationOpen.notification.notificationId);
//         firebase.notifications().removeDeliveredNotification(notificationOpen.notification.notificationId)
//         this.handleNotifications(notificationOpen);
//       });

//     // This listener triggered when app is closed and we click,tapped and opened notification
//     const notificationOpen = await firebase
//       .notifications()
//       .getInitialNotification();
//     if (notificationOpen) {
//       // this.displayNotification(title, body);
//       console.log("when app is closed and we click+++++++++++++++++++++++++++++++++")
//       this.handleNotifications(notificationOpen);
//     }
//     // console.log('create notifications listener', notificationOpen);
//   }

//   handleNotifications = async (notificationOpen) => {
//     console.log("notificationOpen ", notificationOpen)
//     notificationsRepo.getUnReadCounter();
//     const parsedData = await JSON.parse(
//       JSON.stringify(notificationOpen.notification.data),
//     );
//     console.log("parsedData", parsedData);
//     if (parsedData.type === 'JoinEvent') {
//       refreshDetails(parsedData.type);
//     } else {
//       setTimeout(() => {
//         navigateToNotificationDetails(
//           parsedData.type,
//           parsedData.event_id || parsedData.trip_id || parsedData.user_id,
//           parsedData.post_id
//         );
//       }, 1000);
//     }
//   };
//   displayNotification(title, body, notificationId, data) {
//     // we display notification in alert box with title and body
//     if (Platform.OS === 'android') {
//       const notification = new firebase.notifications.Notification()
//         .setNotificationId(notificationId)
//         .setTitle(title)
//         .setBody(body)
//         .setData(data)
//         .android.setChannelId('81893479098');
//       firebase.notifications().displayNotification(notification)
//     }
//     else
//       Alert.alert(
//         title,
//         body,
//         [{ text: 'Ok', onPress: () => console.log('ok pressed') }],
//         { cancelable: false },
//       );
//   }
// }
