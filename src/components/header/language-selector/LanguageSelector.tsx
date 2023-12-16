import './languageSelector.scss';
import { type Component, createSignal } from 'solid-js';
import { detectLocaleFromPath, localizePath } from '../../../utils/i18n.utils';
import Dismiss from 'solid-dismiss';
import FrenchFlag from './french-flag.svg?raw';
import JapaneseFlag from './japan-flag.svg?raw';
import UKFlag from './uk-flag.svg?raw';
import SpainFlag from './spain-flag.svg?raw';

type SelectorProps = {
  path: string;
  supportedLanguages: string[];
};

interface language {
  code: string;
  label: string;
  flag: string;
}

type Lang = Record<string, language>;

const languages: Lang = {
  en: {
    code: 'en',
    label: 'English',
    flag: UKFlag,
  },
  fr: {
    code: 'fr',
    label: 'Français',
    flag: FrenchFlag,
  },
  ja: {
    code: 'ja',
    label: '日本語',
    flag: JapaneseFlag,
  },
  es: {
    code: 'es',
    label: 'Español',
    flag: SpainFlag,
  },
};

const LanguageSelector: Component<SelectorProps> = props => {
  const locale = detectLocaleFromPath(props.path);
  const defaultLang = 'en';
  const definedLanguage = locale ?? defaultLang;
  const [lang] = createSignal<language>(languages[definedLanguage]);

  const [open, setOpen] = createSignal(false);
  let btnEl: HTMLButtonElement | null = null;

  return (
    <>
      <span class="inline-flex">
        <span class="relative">
          <button
            ref={btnEl}
            type="button"
            id="language-dropdown-button"
            class="relative flex cursor-pointer flex-row rounded-lg hover:font-black focus:font-black"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span innerHTML={lang().flag} class="absolute top-[2px] rounded-sm" />
            <span class="ml-8 flex">{lang().label}</span>
          </button>

          <Dismiss open={open} setOpen={setOpen} menuButton={btnEl} cursorKeys>
            {/*Dropdown panel, show/hide based on dropdown state.*/}
            <div
              class="absolute right-[-1.5rem] z-50 mt-2 rounded-lg border border-background-dark bg-background
              dark:border-neutral-lightest dark:bg-background-dark"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabIndex="-1"
            >
              <ul class="py-2 font-medium" role="none">
                {Object.keys(languages).map(key => {
                  const language = languages[key];
                  return (
                    <li class="list-none">
                      <a
                        href={localizePath(props.path, language.code)}
                        class="dark:text-gray-400 dark:hover:bg-gray-600 block px-4 py-2 text-sm
                           hover:font-black hover:text-black dark:hover:text-neutral-lightest "
                        role="menuitem"
                      >
                        <div class="inline-flex items-center">
                          <div innerHTML={language.flag} class="me-2 rounded-sm" />
                          {language.label}
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Dismiss>
        </span>
      </span>
    </>
  );
};

export default LanguageSelector;
