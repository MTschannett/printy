export class BrowserTest {
    public static isFirefox() {
        return typeof InstallTrigger !== 'undefined';
    }

    // Internet Explorer 6-11
    public static isIE() {
        return (
            navigator.userAgent.indexOf('MSIE') !== -1 ||
            !!(document as any).documentMode
        );
    }

    // Edge 20+
    public static isEdge() {
        return !BrowserTest.isIE() && !!(window as any).StyleMedia;
    }

    public static isChrome() {
        return !this.isFirefox() && !this.isIE() && !this.isEdge();
    }
}

// This is needed to for testing firefox browser, we only want to get rid of the import error here!
declare var InstallTrigger: any;
