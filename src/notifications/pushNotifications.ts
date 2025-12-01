import { configureNotificationHandler } from './config';
import { requestNotificationPermissions } from './permissions';
import { getExpoPushToken } from './tokenManager';

configureNotificationHandler();

export { getExpoPushToken, requestNotificationPermissions };

