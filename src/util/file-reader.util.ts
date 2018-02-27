export class FileReaderUtil {
    public static readFile(file: Blob): Promise<string> {
        return new Promise((res, rej) => {
            const reader = new FileReader();

            reader.onload = res;
            reader.onerror = rej;

            reader.readAsDataURL(file);
        }).then((ev: Event) => (ev.target as FileReader).result);
    }
}
