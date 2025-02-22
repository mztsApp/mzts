import { Button } from '../Button/Button';
import { BUTTON_COMPONENTS } from '../Button/Button.constants';
import { ADDITIONAL_CONTENT_VARIANT_BY_IDENTIFICATION } from './AdditionalContent.constants';
import { getAdditionalContent } from './api/getAdditionalContent';
import styles from './AdditionalSectionContent.module.scss';
import StyledLinksList from '../StyledLinksList/StyledLinksList';

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

  if (isPending || isError) return null;

  switch (data?.variant) {
    case ADDITIONAL_CONTENT_VARIANT_BY_IDENTIFICATION.STYLED_LIST:
      return (
        <StyledLinksList>
          {data.items.map((itemProps) => {
            return (
              <StyledLinksList.Item {...itemProps} key={itemProps.title} />
            );
          })}
        </StyledLinksList>
      );
    case ADDITIONAL_CONTENT_VARIANT_BY_IDENTIFICATION.LINKS:
      return (
        <ul className={styles.additionalContentLinks}>
          {data.items.map(({ title, href, shouldOpenInNewWindow }) => (
            <li key={title}>
              <Button
                {...getShouldOpenInNewWindowProps(shouldOpenInNewWindow)}
                as={BUTTON_COMPONENTS.ANCHOR}
                href={href}
              >
                {title}
              </Button>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
};
