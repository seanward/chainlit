import { atom } from 'recoil';

import { TFormInput } from 'components/organisms/FormInput';

import { IPrompt } from './chat';

export interface ILLMProvider {
  id: string;
  inputs: TFormInput[];
  name: string;
  settings: ILLMSettings;
  is_chat: boolean;
}

export interface ILLMSettings {
  settings: {
    $schema: string;
    $ref: string;
    definitions: {
      settingsSchema: {
        type: string;
        Properties: Record<string, any>;
      };
    };
  };
}

export interface IPlayground {
  providers?: ILLMProvider[];
  prompt?: IPrompt;
  originalPrompt?: IPrompt;
}

export const playgroundState = atom<IPlayground>({
  key: 'Playground',
  default: undefined
});

export const variableState = atom<string | undefined>({
  key: 'PlaygroundVariable',
  default: undefined
});

export type PromptMode = 'Template' | 'Formatted';

export const modeState = atom<PromptMode>({
  key: 'PlaygroundMode',
  default: 'Template'
});
