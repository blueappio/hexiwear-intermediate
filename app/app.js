angular.module('BlueAppDemo', [])
    .controller('MainController', ['$scope', mainController]);

function mainController($scope) {
    var main = this;
    
    if (isBluetoothEnabled) {
    	main.hexiwear = window.hexiwear;
    
		/* UI update function */
		main.hexiwear.updateUI = function() {
			$scope.$apply();
   	 	};
    
		/* Define the reoccurring event. */
   	 	setInterval(function() {
    	    if(main.hexiwear && main.hexiwear.connected != undefined){
    	        main.hexiwear.refreshValues();
    	    }
    	},1000);
    
    	main.buttonClicked = function() {
			/* Start the connection. */
			main.hexiwear.connect();
    	}
	}
	

    function isBluetoothEnabled() {
        if (navigator.bluetooth) {
            console.log("We have bluetooth");
            return true;
        } else {
            return false;
        }
    }
}
