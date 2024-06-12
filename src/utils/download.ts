export const handleBlobDownload = (filename: string, blob: Blob) => {
  try {
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    link.remove();
  } catch (err: any) {
    console.error(err);
  }
};
