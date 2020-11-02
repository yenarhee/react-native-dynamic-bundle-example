import Providers from './src/navigation/index';

export default Providers;

import Amplify from 'aws-amplify';
import config from './src/aws-exports';

Amplify.configure(config);
require('./src/services/NotificationService');
