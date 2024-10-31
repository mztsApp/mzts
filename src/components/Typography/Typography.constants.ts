export const TYPOGRAPHY_COMPONENTS = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
  PARAGRAPH: 'p',
  DIV: 'div',
  SPAN: 'span',
  LI: 'li',
} as const;

export const TYPOGRAPHY_VARIANTS = {
  H1: 'typography__h1',
  H2: 'typography__h2',
  H3: 'typography__h3',
  H4: 'typography__h4',
  BODY: '',
  SUBTITLE: 'typography__subtitle',
  BODY2: 'typography__body2',
  BUTTON_TEXT: 'typography__buttonText',
  HELPER_TEXT: 'typography__helperText',
} as const;

export const TYPOGRAPHY_COLORS = {
  TEXT: '',
  SIDE_TEXT: 'typography__sideTextColor',
  BACKGROUND: 'typography__backgroundColor',
  ACCENT: 'typography__accentColor',
  GRADIENT_TOP: 'typography__gradientTop',
  GRADIENT_RIGHT: 'typography__gradientRight',
  GRADIENT_BOTTOM: 'typography__gradientBottom',
  GRADIENT_LEFT: 'typography__gradientLeft',
} as const;
