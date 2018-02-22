/// <reference path="references.d.ts" />

import { WebView } from 'ui/web-view';

//Change from UIWebViewDelegate
export class TnsOAuthWebViewHelper extends NSObject implements WKNavigationDelegate {
    //public static ObjCProtocols = [UIWebViewDelegate];
    public static ObjCProtocols = [WKNavigationDelegate];
    private _owner: WeakRef<WebView>;
    private _origDelegate: any; //UIWebViewDelegateImpl
    private _checkCodeIntercept: (WebView, error?, url?) => boolean;

    constructor() {
        super();
    }

    public static initWithWebViewAndIntercept(wv: WebView, checkCodeIntercept) {
        (<any>wv)._delegate = TnsOAuthWebViewHelper.initWithOwner(new WeakRef(wv), checkCodeIntercept);
    }

    // private static initWithOwner(owner: WeakRef<WebView>, checkCodeIntercept): TnsOAuthWebViewHelper {
    //     let delegate = new TnsOAuthWebViewHelper();
    //     delegate._owner = owner;
    //     delegate._origDelegate = (<any>owner.get())._delegate;
    //     delegate._checkCodeIntercept = checkCodeIntercept;
    //     return delegate;
    // }

    public static initWithOwner(owner: WeakRef<WebView>, checkCodeIntercept): TnsOAuthWebViewHelper {
        let handler = <TnsOAuthWebViewHelper>TnsOAuthWebViewHelper.new();
        handler._owner = owner;
        handler._origDelegate = (<any>owner.get())._delegate;
        handler._checkCodeIntercept = checkCodeIntercept;
        return handler;
    }

    public webViewDidFinishNavigation(webView: WKWebView, navigation: WKNavigation): void {
        this._checkCodeIntercept(webView, null);
        this._origDelegate.webViewDidFinishNavigation(webView, navigation);
    }

    public webViewDidFailNavigationWithError(webView: WKWebView, navigation: WKNavigation, error: NSError): void {
        this._checkCodeIntercept(webView, error);
        this._origDelegate.webViewDidFailNavigationWithError(webView, navigation, error);
    }



    // public webViewShouldStartLoadWithRequestNavigationType(webView: UIWebView, request: NSURLRequest, navigationType: number) {
    //     return this._origDelegate.webViewShouldStartLoadWithRequestNavigationType(webView, request, navigationType);
    // }

    // public webViewDidStartLoad(webView: UIWebView) {
    //     this._origDelegate.webViewDidStartLoad(webView);
    // }

    // public webViewDidFinishLoad(webView: UIWebView) {
    //     this._checkCodeIntercept(webView, null);
    //     this._origDelegate.webViewDidFinishLoad(webView);
    // }

    // public webViewDidFailLoadWithError(webView: UIWebView, error: NSError) {
    //     this._checkCodeIntercept(webView, error);
    //     this._origDelegate.webViewDidFailLoadWithError(webView, error);
    // }

}
