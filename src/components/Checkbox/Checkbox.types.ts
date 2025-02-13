import type React from 'react';

type InputProps = Omit<React.ComponentProps<'input'>, 'name' | 'type' | 'id'>;

type CheckboxCustomProps = {
  name: string;
  label: string;
  id?: string;
  required?: boolean;
};

export type CheckboxComponentProps = InputProps & CheckboxCustomProps;
