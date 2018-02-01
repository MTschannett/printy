export abstract class PrintingHanlderInterface {
    abstract print(printable: string | HTMLElement | File): void;

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

export abstract class PrintingInternalHandler extends PrintingHanlderInterface {
    abstract preparePrinting(printable: string | HTMLElement | File);

    abstract executePrinting(): void;
}
