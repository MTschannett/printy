import {FileReaderUtil} from '../util/file-reader.util';
import {PrintingInternalHandler} from './internal-print-handler.abstract';
import {Printable} from './printing.interface';

export class TabPrintingHandler extends PrintingInternalHandler {
    private loadingIFrame: HTMLIFrameElement;

    public print(printable: string | HTMLElement | File): void {
        this.preparePrinting(printable);
    }

    protected preparePrinting(printable: Printable) {
        this.loadingIFrame = this.createIframe();

        if (typeof printable === 'string') {
            if (this.isPdfFile(printable)) {
                window.open(printable);
                window.focus();
            } else {
                this.loadingIFrame.onload = () => this.executePrinting();
                this.loadingIFrame.src = printable;
            }
        } else if (printable instanceof HTMLElement) {
            this.appendChild(printable);
            this.executePrinting();
        } else if (printable instanceof File) {
            FileReaderUtil.readFile(printable).then((res) => {
                const embed = document.createElement('object');
                this.appendChild(embed);

                embed.data = res;

                embed.onload = () => {
                    this.loadingIFrame.contentWindow.print();
                };

                setTimeout(() => {
                    this.executePrinting();
                }, 1000);
            });
        }
    }

    protected executePrinting(): void {
        // At the moment we only handle iframes here.
        // We cannot do something in a new window, because we get an security issue there.
        this.loadingIFrame.focus();
        this.loadingIFrame.contentWindow.print();
    }

    protected isPdfFile(indicatior: string): boolean {
        return indicatior.toLowerCase().endsWith('.pdf');
    }

    private appendChild(el: Node) {
        if (!this.loadingIFrame) {
            this.createIframe();
        }

        this.loadingIFrame.contentDocument.body.appendChild(el);
    }
}
