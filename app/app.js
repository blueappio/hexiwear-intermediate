angular.module('BlueAppDemo', [])
    .controller('MainController', ['$scope', mainController]);

function mainController($scope) {
    var main = this;
    main.hexiwear = window.hexiwear;

    main.buttonClicked = function () {
        if (!isBluetoothEnabled()) {
            alert('Bluetooth Not Supported');
            return;
        }

		main.hexiwear.connect();
    }
    
    /* UI update function */
    main.hexiwear.updateUI = () => {
        $scope.$apply();
    };

    function isBluetoothEnabled() {
        if (navigator.bluetooth) {
            console.log("We have bluetooth");
            return true;
        } else {
            return false;
        }
    }
}
