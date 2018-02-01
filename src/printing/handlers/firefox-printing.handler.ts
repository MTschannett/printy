
export class FirefoxPrintingHandler extends PrintingInternalHandler {
    handleExternalWindow: false;
    printingFrame: HTMLIFrameElement;

    preparePrinting(printable: string | HTMLElement | File) {
        this.printingFrame = this.createIframe();

        if (typeof printable === 'string') {
            if (this.isPdfFile(printable)) {
                window.open(printable);
                window.focus();
            } else {
                this.printingFrame.onload = () => this.executePrinting();
                this.printingFrame.src = printable;
            }
        } else if (printable instanceof HTMLElement) {
            this.appendChild(printable);
            this.executePrinting();
        } else if (printable instanceof File) {
            FileReaderHelper.readFile(printable).then((res) => {
                const embed = document.createElement('object');
                this.appendChild(embed);

                embed.data = res;

                embed.onload = () => {
                    this.printingFrame.contentWindow.print();
                };

                setTimeout(() => {
                    this.executePrinting();
                }, 1000);
            });
        }
    }

    appendChild(el: Node) {
        if (!this.printingFrame) this.createIframe();

        this.printingFrame.contentDocument.body.appendChild(el);
    }

    executePrinting(): void {
        // At the moment we only handle iframes here. We cannot do something in a new window, because we get an security issue there.
        this.printingFrame.focus();
        this.printingFrame.contentWindow.print();
    }

    print(printable: string | HTMLElement | File): void {
        this.preparePrinting(printable);
    }

    isPdfFile(indicatior: string): boolean {
        return indicatior.toLowerCase().endsWith('.pdf');
    }
}
