sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/koerber/checklhm/utils/Scanner"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Scanner) {
        "use strict";

        return Controller.extend("com.koerber.checklhm.controller.Main", {
            onInit: function () {
                
            },
            onAfterRendering: function () {
                this.oBundle = this.getView().getModel("i18n").getResourceBundle();
    
                this._resetScanningProcess();
                Scanner.registerScanner(this.handleScan.bind(this));
    
                this._updateScanPrompt("promptScanLhmLabel");
            },
            onExit: function () {
                Scanner.unregisterScanner();
            },
            handleScan: function(scannedValue) {
                if (!this._tourScanned) {
                    this._tourCode = scannedValue;
                    this._tourScanned = true;
                    this._updateScanPrompt("promptScanLhmLabel");
                } else {
                    this._validateCodes(this._tourCode, scannedValue);
                    this._resetScanningProcess(); // Bereitet sich auf den nächsten Scan vor
                }
            },
            _updateScanPrompt(i18nKey) {
                const sText = this.oBundle.getText(i18nKey);
                this.getView().byId("labelScanPrompt").setText(sText);
            },
            _validateCodes: function(tourCode, gateCode) {
                // Überprüfen, ob die ersten beiden Ziffern übereinstimmen
                if (tourCode.substring(0, 2) === gateCode.substring(0, 2)) {
                    sap.m.MessageToast.show(this.oBundle.getText("successLhmMatchGate"));
                    this._navigateToLoading(); // Weiterleitung zum VerladeDialog
                } else {
                    sap.m.MessageBox.error(this.oBundle.getText("errorLhmNotMatchGate"));
                    this._updateScanPrompt("promptScanLHMLabel");
                }
            },
            _navigateToLoading: function() {
                // Verwendung des Routers zum Navigieren zum VerladeDialog
                this.getOwnerComponent().getRouter().navTo("LoadingView");//TODO: Route einrichten
            },
            _resetScanningProcess: function() {
                this._tourScanned = false;
                this._tourCode = "";
            },
    
            onNavigateToUnload () {
                this.getOwnerComponent().getRouter().navTo("UnloadingView");//TODO: Route einrichten
            }
        });
    });
