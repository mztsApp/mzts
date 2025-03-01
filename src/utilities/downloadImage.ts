const whiteSpaceRegex = /\s+/g;

export const downloadImage = async (imageSource: string, title: string) => {
  try {
    const response = await fetch(imageSource, { mode: 'cors' });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = `${title.replace(whiteSpaceRegex, '-')}.webp`;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Błąd pobierania obrazu:', error);
  }
};
