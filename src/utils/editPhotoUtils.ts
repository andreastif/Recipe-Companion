/*
    In the frontend, you can use JavaScript's FileReader API to convert the image file to a Base64 encoded string.
    This is useful as Base64 is a common format for encoding binary data into a string, which can easily be transmitted over HTTP
 */
export function convertImageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}


export function isValidFileExtension(fileTypeString: string): boolean {
    const lastDot = fileTypeString.toLowerCase().lastIndexOf("/");
    const ext = fileTypeString.substring(lastDot + 1)
    return ext.startsWith("jpg") || ext.startsWith("png") || ext.startsWith("jpeg");
}