export function file2base64(file: File): Promise<string> {
    return new Promise((res) => {
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onloadend = () => res(fr.result as string);
    });
}
