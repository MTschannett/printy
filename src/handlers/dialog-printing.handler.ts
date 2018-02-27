import {FileReaderUtil} from '../util/file-reader.util';
import {PrintingInternalHandler} from './internal-print-handler.abstract';
import {Printable} from './printing.interface';

export class DialogPrintingHandler extends PrintingInternalHandler {
    private currentPrintingFrame: HTMLIFrameElement;

    constructor() {
        super();
    }

    public print(printable: Printable) {
        this.preparePrinting(printable);
    }

    protected executePrinting(): void {
        this.currentPrintingFrame.contentWindow.focus();
        this.currentPrintingFrame.contentWindow.print();
    }

    protected preparePrinting(printable) {
        this.currentPrintingFrame = this.createIframe();

        if (typeof printable === 'string') {
            this.currentPrintingFrame.src = printable;
            this.currentPrintingFrame.onload = () => this.executePrinting();
        } else if (printable instanceof HTMLElement) {
            this.currentPrintingFrame.contentDocument.body.appendChild(
                printable,
            );
            this.executePrinting();
        } else if (printable instanceof File) {
            const img = new Image();

            img.onload = () => {
                this.currentPrintingFrame.contentDocument.body.appendChild(img);
                this.executePrinting();
            };

            FileReaderUtil.readFile(printable).then((res) => {
                img.src = res;
            });
        }
    }
}
