import './languageSelector.scss';
import { type Component, createSignal } from 'solid-js';
import { detectLocaleFromPath, localizePath } from '../../../utils/i18n.utils.ts';

type SelectorProps = {
  path: string;
  languages: string[];
};

const LanguageSelector: Component<SelectorProps> = props => {
  const locale = detectLocaleFromPath(props.path);
  const [flag, setFlag] = createSignal();

  const initialLng = 'en';
  const definedLanguage = locale ?? initialLng;
  setFlag(definedLanguage);

  const changeFlag = () => {
    switch (flag()) {
      case 'en':
        setFlag('fr');
        break;
      case 'fr':
        setFlag('ja');
        break;
      case 'ja':
        setFlag('en');
        break;
      default:
        setFlag('en');
    }
    location = localizePath(props.path, flag());
  };

  return <button class={'language-selector ' + flag()} onClick={changeFlag}></button>;

};

export default LanguageSelector;
