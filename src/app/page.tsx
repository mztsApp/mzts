import {
  SECTION_ALIGNMENT,
  SECTION_COMPONENT,
  SECTION_HEADING_COMPONENT,
} from '@/components/Section/Section.constants';
import { Section } from '@/components/Section/Section';
import BGImages from '@/assets/images/defaultBGImages.png';

export default function Home() {
  return (
    <>
      <Section
        as={SECTION_COMPONENT.HEADER}
        sectionAlignment={SECTION_ALIGNMENT.RIGHT}
        headingLevel={SECTION_HEADING_COMPONENT.H1}
        headingText="dupa heading"
        description="Tańcząc, wkraczamy w świat, gdzie dźwięk staje się ruchem, a ciało opowiada historie, których słowa nie potrafią wyrazić. To uniwersalny język, który łączy ludzi bez względu na kulturę, wiek czy doświadczenie. Każdy krok, obrót czy gest to mały fragment naszej duszy, wyrażony w rytmie muzyki."
        image={{
          src: BGImages,
          width: 1440,
          height: 875,
          alt: 'Jakieś zdjęcie',
        }}
      />
    </>
  );
}
