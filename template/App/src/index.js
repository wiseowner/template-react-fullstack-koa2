import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Route, HashRouter } from "react-router-dom";<%if(i18n){%>
import { I18nextProvider } from 'react-i18next';
import AntdLocaleProvider from './utils/AntdLocaleProvider';
import i18n from './i18n/setup';<%}%>
import App from './App';
import './index.less';
import registerServiceWorker from './registerServiceWorker';
import stores from './stores';

if (module.hot) { // hmr necessary
  module.hot.accept();
}

ReactDOM.render(
  <HashRouter>
    <%if(i18n){%><I18nextProvider i18n={i18n}>
        <AntdLocaleProvider><%}%>
          <Provider {...stores}>
            <Route component={App} />
          </Provider>
    <%if(i18n){%></AntdLocaleProvider>
      </I18nextProvider><%}%>
  </HashRouter>, document.getElementById("root"));
registerServiceWorker();
