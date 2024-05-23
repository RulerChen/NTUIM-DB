export const readAsBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  const reader: FileReader = new FileReader();
  const fileValue: Promise<string | ArrayBuffer | null> = new Promise((resolve, reject) => {
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });

    reader.addEventListener('error', (event: ProgressEvent<FileReader>) => {
      reject(event);
    });

    reader.readAsDataURL(file);
  });
  return fileValue;
};
