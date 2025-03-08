const whiteSpaceRegex = /\s+/g;

export const downloadAsset = async (
  assetSource: string,
  title: string,
  fileExtension?: string,
) => {
  const extension = fileExtension ?? 'webp';

  try {
    const response = await fetch(assetSource, { mode: 'cors' });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = `${title.replace(whiteSpaceRegex, '-')}.${extension}`;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Błąd pobierania obrazu:', error);
  }
};
