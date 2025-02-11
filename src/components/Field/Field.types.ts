import type TextareaAutosize from 'react-textarea-autosize';
import type {
  FormField as RadixFormField,
  FormControl as RadixFormControl,
  FormMessage as RadixFormMessage,
} from '@radix-ui/react-form';

import type { ValueOf } from '@/types';

import type { FIELD_VARIANTS } from './Field.constants';

export type FieldMessageProps = React.ComponentProps<
  typeof RadixFormMessage
> & {
  withBackground?: boolean;
};

export type InputTagConditionalProps = {
  inputProps?: Partial<Omit<React.ComponentProps<'input'>, 'placeholder'>>;
  variant: typeof FIELD_VARIANTS.INPUT;
};
export type TextAreaTagConditionalProps = {
  textAreaProps?: Partial<
    Omit<React.ComponentProps<typeof TextareaAutosize>, 'placeholder'>
  >;
  variant: typeof FIELD_VARIANTS.TEXT_AREA;
};

type FieldConditionalProps =
  | InputTagConditionalProps
  | TextAreaTagConditionalProps;

type InputCustomProps = {
  label: string;
  required?: boolean;
  variant?: ValueOf<typeof FIELD_VARIANTS>;
  isDarkBackground?: boolean;
  placeholder?: string;
};

export type FieldProps = React.PropsWithChildren<
  React.ComponentProps<typeof RadixFormField> &
    Pick<React.ComponentProps<typeof RadixFormControl>, 'type'> &
    InputCustomProps &
    FieldConditionalProps
>;
