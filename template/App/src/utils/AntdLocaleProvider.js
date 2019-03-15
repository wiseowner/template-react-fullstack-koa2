/**
 * 对antd的LocaleProvider进行封装
 * 使当i18n的语言变化时，可以同时变更antd的locale
 */

import React from 'react';
import { translate } from 'react-i18next';
import moment from 'moment';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import esES from 'antd/lib/locale-provider/es_ES';
import jaJP from 'antd/lib/locale-provider/ja_JP';
import ptBR from 'antd/lib/locale-provider/pt_BR';
import _ from 'lodash';
import { LocaleProvider } from 'antd';
export const languageList = {
  zhCN: { label: '中文', value: 'zhCN', antd: zhCN, moment: 'zh-cn' },
  // 英语
  enUS: { label: 'English', value: 'enUS', antd: null, moment: 'en' },
  // 西班牙语(墨西哥)
  esMX: { label: 'Español', value: 'esMX', antd: esES, moment: 'es' },
  // 日语
  jaJP: { label: 'にほんご', value: 'jaJP', antd: jaJP, moment: 'ja' },
  // 葡萄牙语（巴西）
  ptBR: { label: 'Português', value: 'ptBR', antd: ptBR, moment: 'pt' }
};
class AntdLocaleProvider extends React.Component {
  render() {
    const { i18n } = this.props;
    const { language } = i18n;

    let locale = null;

    const lang = languageList[language];
    if (!_.isEmpty(lang)) {
      locale = lang.antd;
      // 切换moment的语言
      moment.locale(lang.moment);
    }

    return (
      <LocaleProvider locale={locale} >
        {this.props.children}
      </LocaleProvider>
    );
  }
}

export default translate()(AntdLocaleProvider);
