export interface TabData {
  index: number;
  active: boolean;
  type?: inputType;
  name?: string;
}

export enum inputType {
  text = 'text',
  number = 'numebr',
  button = 'button',
  dropdown = 'dropdown',
  checkbox = 'checkbox'
}

export enum controlType {
  input = 1,
  button = 2,
  global = 3,
  dropdown = 4,
  checkbox = 5
}


export interface VoiceRecognizion {
  continuous: boolean;
  interimResults: boolean;
  onresult: Function;
  onend: Function;
  start(): void;
  stop(): void;
}