export class PrintingService {
    handler: PrintingHanlderInterface;

    print(printable: string | HTMLElement | File) {
        // If we have a chrome browser we can print it with a iframe
        this.setHandler();

        this.handler.print(printable);
    }

    setHandler() {
        if (TestBrowser.isChrome()) {
            this.handler = new ChromePrintingHandler();
        } else if (
            TestBrowser.isFirefox() ||
            TestBrowser.isEdge() ||
            TestBrowser.isIE()
        ) {
            this.handler = new FirefoxPrintingHandler();
        }
    }
}

export class TestBrowser {
    static isFirefox() {
        return typeof InstallTrigger !== 'undefined';
    }

    // Internet Explorer 6-11
    static isIE() {
        return (
            navigator.userAgent.indexOf('MSIE') !== -1 ||
            !!(document as any).documentMode
        );
    }

    // Edge 20+
    static isEdge() {
        return !TestBrowser.isIE() && !!(window as any).StyleMedia;
    }

    static isChrome() {
        return !this.isFirefox() && !this.isIE() && !this.isEdge();
    }
}

// This is needed to for testing firefox browser, we only want to get rid of the import error here!
declare var InstallTrigger: any;
