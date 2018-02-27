import {Printable, PrintingHanlderInterface} from './printing.interface';

export abstract class PrintingInternalHandler extends PrintingHanlderInterface {
    protected abstract executePrinting(): void;
    protected abstract preparePrinting(printable: string | HTMLElement | File);
}
