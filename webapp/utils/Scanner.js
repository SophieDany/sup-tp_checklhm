sap.ui.define([], function () {
    "use strict";

    let scannedValue = "";
    let intervalId;
    let callbackFunction;

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            if (scannedValue.length > 4) {
                console.log("Scanned value:", scannedValue);
                if (callbackFunction) {
                    callbackFunction(scannedValue);
                }
            } else {
                console.log("Scan aborted: Insufficient characters");
            }
            scannedValue = "";
        } else {
            scannedValue += event.key;
        }

        clearInterval(intervalId);
        intervalId = setInterval(() => scannedValue = "", 5550);
    }

    return {
        registerScanner: function(callback){
            callbackFunction = callback;
            document.addEventListener("keydown", handleKeyDown);
            console.log("Scanner registered");
        },
        unregisterScanner: function(){
            document.removeEventListener("keydown", handleKeyDown);
            console.log("Scanner unregistered");
        },
        clearData: function(){
            clearInterval(intervalId);
            scannedValue = "";
            console.log("Data cleared");
        },
        isScanning: function(){
            console.log("Is scanning:", scannedValue.length > 0);
            return scannedValue.length > 0;
        }
    };
});