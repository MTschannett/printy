export abstract class PrintingHanlderInterface {
    public abstract print(printable: Printable): void;

    /**
     * Creates a document and attaches it to the DOM
     *
     * @returns {HTMLIFrameElement}
     */
    protected createIframe() {
        const iframe = document.createElement('iframe') as HTMLIFrameElement;

        iframe.style.display = 'none';

        document.body.appendChild(iframe);

        return iframe;
    }
}

export type Printable = string | HTMLElement | File;
