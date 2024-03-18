sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.koerber.checklhm.controller.App", {
        onInit: function() {
        },

        onBack: function() {
            const oHistory = History.getInstance();
            let sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                // Direktes Navigieren zurück, falls eine vorherige Route existiert
                window.history.go(-1);
            } else {
                // Navigieren zu Standardfall (z.B. Startseite), falls keine vorherige Route existiert
                this.getOwnerComponent().getRouter().navTo("home", {}, true);
            }
        }
      });
    }
  );
  