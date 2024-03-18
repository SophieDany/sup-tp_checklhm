sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("com.koerber.checklhm.controller.Unload", {
        onInit: function () {
            this.oBundle = this.getView().getModel("i18n").getResourceBundle();

            this._resetScanningProcess();
            Scanner.registerScanner(this.handleScan.bind(this));

            this._updateScanPrompt("promptScanLhmLabel");
        },
        onExit: function () {
            Scanner.unregisterScanner();
        },
        onNavigateToLoading: function() {
            this.getOwnerComponent().getRouter().navTo("Main");
        }
    });
});
