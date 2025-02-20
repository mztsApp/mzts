import { Button } from '../Button/Button';
import { BUTTON_COMPONENTS } from '../Button/Button.constants';
import { ADDITIONAL_CONTENT_VARIANT_BY_IDENTIFICATION } from './AdditionalContent.constants';
import { getAdditionalContent } from './api/getAdditionalContent';
import styles from './AdditionalSectionContent.module.scss';

type AdditionalSectionContentProps = {
  hash: string;
};

const getShouldOpenInNewWindowProps = (shouldOpenInNewWindow: boolean) =>
  shouldOpenInNewWindow
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};

export const AdditionalSectionContent = async ({
  hash,
}: AdditionalSectionContentProps) => {
  const { data, isError, isPending } = await getAdditionalContent(hash);

  console.log('finalData', { data });

  if (isPending || isError) return null;

  switch (data?.variant) {
    case ADDITIONAL_CONTENT_VARIANT_BY_IDENTIFICATION.STYLED_LIST:
      return null;
    case ADDITIONAL_CONTENT_VARIANT_BY_IDENTIFICATION.LINKS:
      return (
        <ul className={styles.additionalContentLinks}>
          {data.items.map(({ text, href, shouldOpenInNewWindow }) => (
            <li key={text}>
              <Button
                {...getShouldOpenInNewWindowProps(shouldOpenInNewWindow)}
                as={BUTTON_COMPONENTS.ANCHOR}
                href={href}
              >
                {text}
              </Button>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
};
