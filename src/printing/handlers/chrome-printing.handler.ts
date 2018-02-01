
export class ChromePrintingHandler extends PrintingInternalHandler {
    private currentPrintingFrame: HTMLIFrameElement;

    constructor() {
        super();
    }

    print(printable) {
        this.preparePrinting(printable);
    }

    preparePrinting(printable) {
        this.currentPrintingFrame = this.createIframe();

        if (typeof printable === 'string') {
            this.currentPrintingFrame.src = printable;
            this.currentPrintingFrame.onload = () => this.executePrinting();
        } else if (printable instanceof HTMLElement) {
            this.currentPrintingFrame.contentDocument.body.appendChild(
                printable
            );
            this.executePrinting();
        } else if (printable instanceof File) {
            const img = new Image();

            img.onload = () => {
                this.currentPrintingFrame.contentDocument.body.appendChild(img);
                this.executePrinting();
            };

            FileReaderHelper.readFile(printable).then((res) => {
                img.src = res;
            });
        }
    }

    executePrinting(): void {
        this.currentPrintingFrame.contentWindow.focus();
        this.currentPrintingFrame.contentWindow.print();
    }
}

export class FileReaderHelper {
    static readFile(file: Blob): Promise<string> {
        return new Promise((res, rej) => {
            const reader = new FileReader();

            reader.onload = res;
            reader.onerror = rej;

            reader.readAsDataURL(file);
        }).then((ev: Event) => (ev.target as FileReader).result);
    }
}
