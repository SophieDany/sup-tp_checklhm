sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.koerber.checklhm.controller.Loading", {
        testBackend() {
            var oModel = this.getView().getModel();
                var that = this;
                this.testList = [];
                var testLa= {
                    Type: "1",
                    TypeDesc: "EuPal",
                    Quantity: "5",
                    QuantityUnit: "st"
                };
                this.testList.push(testLa);
                var testLa2= {
                    Type: "6",
                    TypeDesc: "EuPa56l",
                    Quantity: "556",
                    QuantityUnit: "st56"
                };
                this.testList.push(testLa2)
                var oCreateData = {
                    "Ideumdev": this._IvIdEumDev,
                    "Exidv": "1234123412341234",
                    "toLoadList": this.testList
                }
                oModel.create("/LaLoadSet", oCreateData, { // eventuell Url anpassen
                    //Event für erfolgreiches Speichern der Daten
                    success: function (oData) {
                        //schließen des Lade Dialogs
                        //that._globalDialog.close();
                    },
                    error: function (oError) {
                 
                        //that._globalDialog.close();
                    }
                });
        },
        onInit() {
            const oModel = this.getOwnerComponent().getModel("lhm");
            this.getView().setModel(oModel, "lhm");
        },

        onIncreaseLHM(oEvent) {
            const oItem = oEvent.getSource().getBindingContext("lhm").getObject();
            oItem.quantity += 1;
            this.getView().getModel("lhm").refresh();
        },

        onDecreaseLHM(oEvent) {
            const oItem = oEvent.getSource().getBindingContext("lhm").getObject();
            if (oItem.quantity > 0) {
                oItem.quantity -= 1;
            }
            this.getView().getModel("lhm").refresh();
        },

        onLoad() {
            this.testBackend();
            //TODO: eingegebene Daten einlesen
            //TODO: Daten an Backend schicken ?bzw. Überprüfung, ob LHM mit geplanten Übereinstimmen?
            sap.m.MessageToast.show("Ladehilfsmittel verladen.");//TODO: in Successfall von Backend-Methode, wenn diese fertig
        }
    });
});
