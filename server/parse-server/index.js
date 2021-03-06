import { ParseServer } from 'parse-server';
import Parse from 'parse/node';
import ParseDashboard from 'parse-dashboard';

export default {
  setup (app, appName, settings, allowInsecureHTTPInParseDashboard = false) {
    Parse.initialize(settings.parseServerApplicationId, 'js-key', settings.parseServerMasterKey);
    Parse.serverURL = settings.parseServerURL;

    const api = new ParseServer({
      appId: settings.parseServerApplicationId,
      masterKey: settings.parseServerMasterKey,
      serverURL: settings.parseServerURL,
    });

    app.use('/parse', api);

    app.use(
      '/dashboard',
      ParseDashboard({
        apps: [{
          serverURL: settings.parseServerURL,
          appId: settings.parseServerApplicationId,
          masterKey: settings.parseServerMasterKey,
          appName,
          iconName: 'todo-mvc-icon.png'
        }],
        iconsFolder: 'server/public/images',
        users: settings.parseServerDashboardUsers
      }, allowInsecureHTTPInParseDashboard)
    );
  }
};
