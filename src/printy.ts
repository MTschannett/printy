import {BrowserTest} from './BrowserTest';
import {DialogPrintingHandler} from './handlers/dialog-printing.handler';
import {PrintingHanlderInterface} from './handlers/printing.interface';
import {TabPrintingHandler} from './handlers/tab-printing.handler';

export class Printy {
    private handler: PrintingHanlderInterface;

    public print(printable: string | HTMLElement | File) {
        this.setHandler();

        this.handler.print(printable);
    }

    private setHandler() {
        if (BrowserTest.isChrome()) {
            this.handler = new DialogPrintingHandler();
        } else if (
            BrowserTest.isFirefox() ||
            BrowserTest.isEdge() ||
            BrowserTest.isIE()
        ) {
            this.handler = new TabPrintingHandler();
        }
    }
}
