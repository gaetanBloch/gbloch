import "./languageSelector.scss";
import { type Component, createSignal } from "solid-js";
import { detectLocaleFromPath, localizePath } from "../../../utils/i18n.utils";
import Dismiss from "solid-dismiss";
import FrenchFlag from "./french-flag.svg?raw";
import JapaneseFlag from "./japan-flag.svg?raw";
import UKFlag from "./uk-flag.svg?raw";
import SpainFlag from "./spain-flag.svg?raw";

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
    code: "en",
    label: "English",
    flag: UKFlag,
  },
  fr: {
    code: "fr",
    label: "Français",
    flag: FrenchFlag,
  },
  ja: {
    code: "ja",
    label: "日本語",
    flag: JapaneseFlag,
  },
  es: {
    code: "es",
    label: "Español",
    flag: SpainFlag,
  },
};

const LanguageSelector: Component<SelectorProps> = props => {
  const locale = detectLocaleFromPath(props.path);
  const defaultLang = "en";
  const definedLanguage = locale ?? defaultLang;
  const [lang] = createSignal<language>(
    languages[definedLanguage],
  );

  const [open, setOpen] = createSignal(false);
  let btnEl: HTMLButtonElement | null = null;

  return (
    <>
      <span class='inline-flex'>
        <span class='relative'>
          <button
            ref={ btnEl }
            type='button'
            id='language-dropdown-button'
            class='flex flex-row rounded-lg cursor-pointer relative hover:font-black focus:font-black'
            aria-expanded='false'
            aria-haspopup='true'>
            <span innerHTML={ lang().flag } class='rounded-sm absolute top-[2px]' />
            <span class="flex ml-8">{ lang().label }</span>
          </button>

          <Dismiss
            open={ open }
            setOpen={ setOpen }
            menuButton={ btnEl }
            cursorKeys>
            {/*Dropdown panel, show/hide based on dropdown state.*/ }
            <div
              class='z-50 absolute right-[-1.5rem] mt-2 bg-background border border-background-dark rounded-lg
              dark:border-neutral-lightest dark:bg-background-dark'
              role='menu' aria-orientation='vertical'
              aria-labelledby='user-menu-button' tabIndex='-1'>
              <ul class='py-2 font-medium' role='none'>
                {
                  Object.keys(languages).map((key) => {
                    const language = languages[key];
                    return (
                      <li class="list-none">
                        <a href={ localizePath(props.path, language.code) }
                           class='block px-4 py-2 text-sm hover:text-black hover:font-black
                           dark:hover:text-neutral-lightest dark:text-gray-400 dark:hover:bg-gray-600 '
                           role='menuitem'>
                          <div class='inline-flex items-center'>
                            <div innerHTML={ language.flag } class='rounded-sm me-2' />
                            { language.label }
                          </div>
                        </a>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </Dismiss>
        </span>
      </span>
    </>
  );
};

export default LanguageSelector;

