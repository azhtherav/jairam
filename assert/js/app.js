var domain = "http://api.jairamantransport.com";
//var domain = "http://localhost:1666";


var app = angular.module('StarterApp', ['ngMaterial', 'ngRoute', 'ultimateDataTableServices']);



app.config(['$routeProvider', '$mdThemingProvider',
  function ($routeProvider, $mdThemingProvider) {
      $mdThemingProvider.theme('default')
     .primaryPalette('red', {
         'default': '700', // by default use shade 400 from the pink palette for primary intentions
         'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
         'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
         'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
     })
     .accentPalette('orange');
      $routeProvider.
        when('/dashboard', {
              templateUrl: 'dashboard.html',
              controller: 'dashboardCtl'
          }).
        when('/lorry', {
            templateUrl: 'lorry.html',
            controller: 'lorry'
        }).
        when('/load', {
            templateUrl: 'load.html',
            controller: 'transporter'
        }).
        when('/documentupload', {
            templateUrl: 'documentupload.html',
            controller: 'uploaddocument'
        }).
        when('/assign', {
            templateUrl: 'assignloadlorry.html',
            controller: 'assignLoadLorry'
        }).
        when('/commission', {
            templateUrl: 'commission.html',
            controller: 'commissionCtl'
        }).
        when('/commissionlist', {
            templateUrl: 'commissionlist.html',
            controller: 'commissionlistCtl'
        }).
        when('/toopaylist', {
            templateUrl: 'toopaylist.html',
            controller: 'toopaylistCtl'
        }).
        when('/advancelist', {
            templateUrl: 'advancepaylist.html',
            controller: 'advancepaylistCtl'
        }).
          when('/advancepay', {
              templateUrl: 'advancepay.html',
              controller: 'advancepayCtl'
          }).
          when('/toopay', {
              templateUrl: 'toopay.html',
              controller: 'toopayCtl'
          }).
          when('/broker', {
              templateUrl: 'broker.html',
              controller: 'brokerCtl'
          }).
          when('/brokerlist', {
              templateUrl: 'brokerlist.html',
              controller: 'brokerlistCtl'
          }).
          when('/enquiry', {
              templateUrl: 'enquiry.html',
              controller: 'enquiryCtl'
          }).
          when('/enquirysearch', {
              templateUrl: 'enquirysearch.html',
              controller: 'enquirysearchCtl'
          }).
          when('/outflow', {
              templateUrl: 'outflow.html',
              controller: 'outflowCtl'
          }).
          when('/inflow', {
              templateUrl: 'inflow.html',
              controller: 'inflowCtl'
          }).
          when('/commissiondetail/:param1', {
              templateUrl: 'commissiondetail.html',
              controller: 'commissiondetailCtl'
          })
          .
          when('/commissionprintdetail/:param1', {
              templateUrl: 'commissionprintdetail.html',
              controller: 'commissionprintdetailCtl'
          }).
          /*when('/simple', {
              templateUrl: 'simple.html',
              controller: 'ngAppDemoController'
          }).*/
          otherwise({
            redirectTo: '/dashboard'
          });
  }]);

app.controller('appCtr', ['$scope', '$mdSidenav', '$location', function ($scope, $mdSidenav, $location) {
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.go = function (path, menuID) {
        //console.log(path);
        $mdSidenav(menuID).toggle();
        $location.path(path);
    };
}]);



app.controller('outflowCtl', ['$scope', 'getalllorry', 'addlorry', '$log', 'fileUpload', 'allService', '$filter', 'allgetService', 'datatable', function ($scope, getalllorry, addlorry, $log, fileUpload, allService, $filter, allgetService, datatable) {

    var payload = [];

    $scope.loader = true;

    var datatableConfig = {
        "name": "AdvancePayCommissionList",
        "columns": [
            {
                "header": "ID",
                "property": "commissionid",
                "order": true,
                "type": "text"
            },
            {
                "header": "Lorry Number",
                "property": "lorryno",
                "order": true,
                "type": "text"
            },
            {
                "header": "Status",
                "property": "commitionstatus",
                "order": true,
                "type": "text"
            },
            //{
            //    "header": "Name Board",
            //    "property": "nameboard",
            //    "order": true,
            //    "type": "text"
            //},
            {
                "header": "Name Board",
                "property": "paymentmode",
                "order": true,
                "type": "text"
            },
            {
                "header": "Lorry Contact",
                "property": "ophone",
                "order": true,
                "type": "text"
            },
            {
                "header": "Trans. Number",
                "property": "transporterphone",
                "order": true,
                "type": "text"
            },
            {
                "header": "Loading Date",
                "property": "loadingdate",
                "order": true,
                "type": "text"
            },
            {
                "header": "From",
                "property": "lfrom",
                "order": true,
                "type": "text"
            },
            {
                "header": "To",
                "property": "lto",
                "order": true,
                "type": "text"
            }
            
        ],
        "filter": {
            "active": true,
            "highlight": true,
            "columnMode": true
        },
        "exportCSV": {
            active: true,//Active or not
            showButton: true,//Show the export button in the toolbar
            delimiter: ";"//Set the delimiter
        },
        "pagination": {
            "mode": 'local',
            numberRecordsPerPageList: [{
                number: 10,
                clazz: ''
            }, {
                number: 25,
                clazz: ''
            }]
        },
        "order": {
            "mode": 'local'
        },
        "select": {
            "active": true,
            "callback": function (line, data) {
                console.log("callback select : " + data.commissionid);
            }
        }
    };

    $scope.datatable = datatable(datatableConfig);
    $scope.datatable.setData(payload);
    

}]);

app.controller('inflowCtl', ['$scope', 'getalllorry', 'addlorry', '$log', 'fileUpload', 'allService', '$filter', 'allgetService', 'datatable', function ($scope, getalllorry, addlorry, $log, fileUpload, allService, $filter, allgetService, datatable) {


    $scope.loader = true;

    var payload = [];

    var datatableConfig = {
        "name": "AdvancePayCommissionList",
        "columns": [
            {
                "header": "ID",
                "property": "commissionid",
                "order": true,
                "type": "text"
            },
            {
                "header": "Lorry Number",
                "property": "lorryno",
                "order": true,
                "type": "text"
            },
            {
                "header": "Status",
                "property": "commitionstatus",
                "order": true,
                "type": "text"
            },
            //{
            //    "header": "Name Board",
            //    "property": "nameboard",
            //    "order": true,
            //    "type": "text"
            //},
            {
                "header": "Name Board",
                "property": "paymentmode",
                "order": true,
                "type": "text"
            },
            {
                "header": "Lorry Contact",
                "property": "ophone",
                "order": true,
                "type": "text"
            },
            {
                "header": "Trans. Number",
                "property": "transporterphone",
                "order": true,
                "type": "text"
            },
            {
                "header": "Loading Date",
                "property": "loadingdate",
                "order": true,
                "type": "text"
            },
            {
                "header": "From",
                "property": "lfrom",
                "order": true,
                "type": "text"
            },
            {
                "header": "To",
                "property": "lto",
                "order": true,
                "type": "text"
            }

        ],
        "filter": {
            "active": true,
            "highlight": true,
            "columnMode": true
        },
        "exportCSV": {
            active: true,//Active or not
            showButton: true,//Show the export button in the toolbar
            delimiter: ";"//Set the delimiter
        },
        "pagination": {
            "mode": 'local',
            numberRecordsPerPageList: [{
                number: 10,
                clazz: ''
            }, {
                number: 25,
                clazz: ''
            }]
        },
        "order": {
            "mode": 'local'
        },
        "select": {
            "active": true,
            "callback": function (line, data) {
                console.log("callback select : " + data.commissionid);
            }
        }
    };

    $scope.datatable = datatable(datatableConfig);
    $scope.datatable.setData(payload);


}]);



app.controller('enquiryCtl', ['$scope', 'getalllorry', 'addlorry', '$log', 'fileUpload', 'allService', '$filter', 'allgetService', function ($scope, getalllorry, addlorry, $log, fileUpload, allService, $filter, allgetService) {

    $scope.addenable = true;
    $scope.addenable1 = true;

    $scope.addnotes = function (isValid) {
        $scope.loader = false;
        $scope.notes.addeddate = $filter('date')(new Date(), 'dd/MM/yyyy');
        var promise =
        allService.getAllService(domain + "/api/Lorry/addnotes", $scope.notes);
        promise.then(
           function (payload) {
               alert('sucess');
               $scope.loader = true;
               $scope.notes = null;
               $scope.getnotelist();
           },
           function (errorPayload) {
               alert('error');
               $scope.loader = true;
               $scope.notes = null;
           });
    };


    $scope.getnotelist = function () {
        $scope.loader = false;
        var promise =
            allgetService.getAllService(domain + "/api/Lorry/getalltodaynotes");
        promise.then(
           function (payload) {
               $scope.note = payload;
               $scope.loader = true;
           },
           function (errorPayload) {
               alert('get note error');
               $scope.loader = true;
           });
    };

    $scope.addloadnotes = function (isValid) {
        $scope.loader = false;
        $scope.loadnotes.addeddate = $filter('date')(new Date(), 'dd/MM/yyyy');
        var promise =
        allService.getAllService(domain + "/api/Lorry/addloadnotes", $scope.loadnotes);
        promise.then(
           function (payload) {
               alert('sucess');
               $scope.loader = true;
               $scope.loadnotes = null;
               $scope.getloadnotelist();
           },
           function (errorPayload) {
               alert('error');
               $scope.loader = true;
               $scope.loadnotes = null;
           });
    };


    $scope.getloadnotelist = function () {
        $scope.loader = false;
        var promise =
            allgetService.getAllService(domain + "/api/Lorry/getalltodayloadnotes");
        promise.then(
           function (payload) {
               $scope.loadnote = payload;
               $scope.loader = true;
           },
           function (errorPayload) {
               alert('get note error');
               $scope.loader = true;
           });
    };

    $scope.getnotelist();
    $scope.getloadnotelist();

    $scope.testfunction2 = function (vv) {

        if (vv == undefined || vv == null || vv == "") {
            $scope.addenable = true;
        }
        else {
            $scope.addenable = false;
        }
    };

    $scope.testfunction1 = function (vv) {

        if (vv == undefined || vv == null || vv == "") {
            $scope.addenable1 = true;
        }
        else {
            $scope.addenable1 = false;
        }
    };
    
}]);


app.controller('dashboardCtl', ['$scope', '$location', 'getalllorry', 'addlorry', '$log', 'fileUpload', 'allService', '$filter', 'allgetService', 'addassign', 'addcommition', function ($scope, $location, getalllorry, addlorry, $log, fileUpload, allService, $filter, allgetService, addassign, addcommition) {

    $scope.loader = false;

    $scope.getackcommitionList = function () {
        var promise =
            allgetService.getAllService(domain + "/api/Commission/getnotackcommission");
        promise.then(
           function (payload) {
               $scope.ackcommitionList = payload;
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('failure loading movie', errorPayload);
               alert('error get not ack commission');
               $scope.loader = true;
           });
    };

    $scope.loader = false;

    $scope.getbalanceerrorcommitionList = function () {
        var promise =
            allgetService.getAllService(domain + "/api/Commission/getbalanceerrorcommission");
        promise.then(
           function (payload) {
               $scope.balanceerrorcommitionList = payload;
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('failure loading movie', errorPayload);
               alert('error get balance error commission');
               $scope.loader = true;
           });
    };

    $scope.loader = false;

    $scope.getbalancereceiveddatecommissionList = function () {
        var promise =
            allgetService.getAllService(domain + "/api/Commission/getbalancereceiveddatecommission");
        promise.then(
           function (payload) {
               $scope.balancereceiveddatecommitionList = payload;
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('failure loading movie', errorPayload);
               alert('error get balance received date commission');
               $scope.loader = true;
           });
    };

    $scope.loader = false;

    $scope.getallopencommissionList = function () {
        var promise =
            allgetService.getAllService(domain + "/api/Commission/getallopencommission");
        promise.then(
           function (payload) {
               $scope.allopencommissionList = payload;
               //console.log(payload);
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('failure loading movie', errorPayload);
               alert('error get all open commission');
               $scope.loader = true;
           });
    };

    $scope.getackcommitionList();
    $scope.getbalanceerrorcommitionList();
    $scope.getbalancereceiveddatecommissionList();
    $scope.getallopencommissionList();

    $scope.gotonextpage = function (param) {
        var x = '/commissiondetail/' + param
        $location.path(x);
    };

    
}]);

app.controller('commissiondetailCtl', ['$scope', '$location', '$routeParams', 'getalllorry', 'addlorry', '$log', 'fileUpload', 'allService', '$filter', 'allgetService', 'addassign', 'addcommition', function ($scope, $location, $routeParams, getalllorry, addlorry, $log, fileUpload, allService, $filter, allgetService, addassign, addcommition) {
    $scope.loader = false;

    var param1 = $routeParams.param1;
    console.log(param1);

    $scope.getsinglecommition = function () {
        var promise =
            allgetService.getAllService(domain + "/api/Commission/getsinglecommission?commissionid="+param1);
        promise.then(
           function (payload) {
               $scope.singlecommission = payload;
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('failure loading movie', errorPayload);
               alert('error get single commission');
               $scope.loader = true;
           });
    };

    $scope.getsinglecommition();

}]);


app.controller('commissionprintdetailCtl', ['$scope', '$location', '$routeParams', 'getalllorry', 'addlorry', '$log', 'fileUpload', 'allService', '$filter', 'allgetService', 'addassign', 'addcommition', function ($scope, $location, $routeParams, getalllorry, addlorry, $log, fileUpload, allService, $filter, allgetService, addassign, addcommition) {
    $scope.loader = false;

    var param1 = $routeParams.param1;
    console.log(param1);

    $scope.getsinglecommition = function () {
        var promise =
            allgetService.getAllService(domain + "/api/Commission/getsinglecommission?commissionid=" + param1);
        promise.then(
           function (payload) {
               $scope.singlecommission = payload;
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('failure loading movie', errorPayload);
               alert('error get single commission');
               $scope.loader = true;
           });
    };

    $scope.getsinglecommition();

}]);


app.controller('commissionlistCtl', ['$scope', '$location', 'getalllorry', 'addlorry', '$log', 'fileUpload', 'allService', '$filter', 'allgetService', 'addassign', 'addcommition', 'datatable', function ($scope, $location, getalllorry, addlorry, $log, fileUpload, allService, $filter, allgetService, addassign, addcommition, datatable) {
    $scope.loader = false;

    var datatableConfig = {
        "name": "AdvancePayCommissionList",
        "columns": [
            {
                "header": "ID",
                "property": "commissionid",
                "order": true,
                "render": "<a ng-click='gotonextpage(cellValue)'>{{cellValue}}</a>",
                "type": "text"
            },
            {
                "header": "Lorry Number",
                "property": "lorryno",
                "order": true,
                "type": "text"
            },
            {
                "header": "Status",
                "property": "commitionstatus",
                "order": true,
                "type": "text"
            },
            //{
            //    "header": "Name Board",
            //    "property": "nameboard",
            //    "order": true,
            //    "type": "text"
            //},
             {
                 "header": "Type",
                 "property": "paymentmode",
                 "order": true,
                 "type": "text"
             },
            {
                "header": "Lorry Contact",
                "property": "ophone",
                "order": true,
                "type": "text"
            },
            {
                "header": "Trans. Number",
                "property": "transporterphone",
                "order": true,
                "type": "text"
            },
            {
                "header": "Loading Date",
                "property": "loadingdate",
                "order": true,
                "type": "text"
            },
            {
                "header": "From",
                "property": "lfrom",
                "order": true,
                "type": "text"
            },
            {
                "header": "To",
                "property": "lto",
                "order": true,
                "type": "text"
            }
            ,
            {
                "header": "Bill",
                "property": "commissionid",
                "order": true,
                "render": "<a ng-click='gotoprintpage(cellValue)'>Print</a>",
                "type": "text"
            }

        ],
        "filter": {
            "active": true,
            "highlight": true,
            "columnMode": true
        },
        "exportCSV": {
            active: true,//Active or not
            showButton: true,//Show the export button in the toolbar
            delimiter: ";"//Set the delimiter
        },
        "pagination": {
            "mode": 'local',
            numberRecordsPerPageList: [{
                number: 10,
                clazz: ''
            }, {
                number: 25,
                clazz: ''
            }]
        },
        "order": {
            "mode": 'local'
        },
        "select": {
            "active": true,
            "callback": function (line, data) {
                console.log("callback select : " + data.commissionid);
            }
        }
    };


    $scope.getcommitionList = function () {
        var promise =
            allgetService.getAllService(domain+"/api/Commission/getallcommission");
        promise.then(
           function (payload) {
               //$scope.commitionList = payload;
               $scope.datatable = datatable(datatableConfig);
               $scope.datatable.setData(payload);
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('failure loading movie', errorPayload);
               alert('error get commission');
               $scope.loader = true;
           });
    };

    $scope.getcommitionList();

    $scope.gotonextpage = function (param) {
        var x = '/commissiondetail/' + param
        $location.path(x);
    };

    $scope.gotoprintpage = function (param) {
        var x = '/commissionprintdetail/' + param
        $location.path(x);
    };
    
}]);


app.controller('enquirysearchCtl', ['$scope', '$location', 'getalllorry', 'addlorry', '$log', 'fileUpload', 'allService', '$filter', 'allgetService', 'addassign', 'addcommition', 'datatable', function ($scope, $location, getalllorry, addlorry, $log, fileUpload, allService, $filter, allgetService, addassign, addcommition, datatable) {
    $scope.loader = false;

    var datatableConfig = {
        "name": "LorryNotesList",
        "columns": [
            {
                "header": "Lorry Number",
                "property": "lorryno",
                "order": true,
                "type": "text"
            },
            {
                "header": "Date",
                "property": "addeddate",
                "order": true,
                "type": "text"
            },
            {
                "header": "Note",
                "property": "note",
                "order": true,
                "type": "text"
            }

        ],
        "filter": {
            "active": true,
            "highlight": true,
            "columnMode": true
        },
        "exportCSV": {
            active: true,//Active or not
            showButton: true,//Show the export button in the toolbar
            delimiter: ";"//Set the delimiter
        },
        "pagination": {
            "mode": 'local',
            numberRecordsPerPageList: [{
                number: 10,
                clazz: ''
            }, {
                number: 25,
                clazz: ''
            }]
        },
        "order": {
            "mode": 'local'
        }
        //,
        //"select": {
        //    "active": true,
        //    "callback": function (line, data) {
        //        console.log("callback select : " + data.commissionid);
        //    }
        //}
    };


    var datatableConfig1 = {
        "name": "LoadNotesList",
        "columns": [
            {
                "header": "Trans. Name",
                "property": "transportername",
                "order": true,
                "type": "text"
            },
            {
                "header": "Date",
                "property": "addeddate",
                "order": true,
                "type": "text"
            },
            {
                "header": "Note",
                "property": "note",
                "order": true,
                "type": "text"
            }

        ],
        "filter": {
            "active": true,
            "highlight": true,
            "columnMode": true
        },
        "exportCSV": {
            active: true,//Active or not
            showButton: true,//Show the export button in the toolbar
            delimiter: ";"//Set the delimiter
        },
        "pagination": {
            "mode": 'local',
            numberRecordsPerPageList: [{
                number: 10,
                clazz: ''
            }, {
                number: 25,
                clazz: ''
            }]
        },
        "order": {
            "mode": 'local'
        }
        //,
        //"select": {
        //    "active": true,
        //    "callback": function (line, data) {
        //        console.log("callback select : " + data.commissionid);
        //    }
        //}
    };

    $scope.getnotelist = function () {
        $scope.loader = false;
        var promise =
            allgetService.getAllService(domain + "/api/Lorry/getallnotes");
        promise.then(
           function (payload) {
               $scope.note = payload;
               $scope.datatable = datatable(datatableConfig);
               $scope.datatable.setData(payload);
               $scope.loader = true;
           },
           function (errorPayload) {
               alert('get note error');
               $scope.loader = true;
           });
    };


    $scope.getloadnotelist = function () {
        $scope.loader = false;
        var promise =
            allgetService.getAllService(domain + "/api/Lorry/getallloadnotes");
        promise.then(
           function (payload) {
               $scope.loadnote = payload;
               $scope.datatable1 = datatable(datatableConfig1);
               $scope.datatable1.setData(payload);
               $scope.loader = true;
           },
           function (errorPayload) {
               alert('get note error');
               $scope.loader = true;
           });
    };


    $scope.getnotelist();

    $scope.getloadnotelist();

  

   
}]);


app.controller('toopaylistCtl', ['$scope', '$location', 'getalllorry', 'addlorry', '$log', 'fileUpload', 'allService', '$filter', 'allgetService', 'addassign', 'addcommition', 'datatable', function ($scope, $location, getalllorry, addlorry, $log, fileUpload, allService, $filter, allgetService, addassign, addcommition, datatable) {
    $scope.loader = false;

    var datatableConfig = {
        "name": "TooPayCommissionList",
        "columns": [
            {
                "header": "ID",
                "property": "commissionid",
                "order": true,
                "render": "<a ng-click='gotonextpage(cellValue)'>{{cellValue}}</a>",
                "type": "text"
            },
            {
                "header": "Lorry Number",
                "property": "lorryno",
                "order": true,
                "type": "text"
            },
            {
                "header": "Status",
                "property": "commitionstatus",
                "order": true,
                "type": "text"
            },
            {
                "header": "Name Board",
                "property": "nameboard",
                "order": true,
                "type": "text"
            },
            {
                "header": "Lorry Contact",
                "property": "ophone",
                "order": true,
                "type": "text"
            },
            {
                "header": "Trans. Number",
                "property": "transporterphone",
                "order": true,
                "type": "text"
            },
            {
                "header": "Loading Date",
                "property": "loadingdate",
                "order": true,
                "type": "text"
            },
            {
                "header": "From",
                "property": "lfrom",
                "order": true,
                "type": "text"
            },
            {
                "header": "To",
                "property": "lto",
                "order": true,
                "type": "text"
            }

        ],
        "filter": {
            "active": true,
            "highlight": true,
            "columnMode": true
        },
        "exportCSV": {
            active: true,//Active or not
            showButton: true,//Show the export button in the toolbar
            delimiter: ";"//Set the delimiter
        },
        "pagination": {
            "mode": 'local',
            numberRecordsPerPageList: [{
                number: 10,
                clazz: ''
            }, {
                number: 25,
                clazz: ''
            }]
        },
        "order": {
            "mode": 'local'
        },
        "select": {
            "active": true,
            "callback": function (line, data) {
                console.log("callback select : " + data.commissionid);
            }
        }
    };


    $scope.gettoopayList = function () {
        var promise =
            allgetService.getAllService(domain + "/api/Commission/getalltoopay");
        promise.then(
           function (payload) {
               //$scope.commitionList = payload;
               $scope.datatable = datatable(datatableConfig);
               $scope.datatable.setData(payload);
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('failure loading movie', errorPayload);
               alert('error get commission');
               $scope.loader = true;
           });
    };

    $scope.gettoopayList();

    $scope.gotonextpage = function (param) {
        //console.log(param);
        var x = '/commissiondetail/' + param
        $location.path(x);
    };
        
}]);


app.controller('advancepaylistCtl', ['$scope', '$location', 'getalllorry', 'addlorry', '$log', 'fileUpload', 'allService', '$filter', 'allgetService', 'addassign', 'addcommition', 'datatable', function ($scope, $location, getalllorry, addlorry, $log, fileUpload, allService, $filter, allgetService, addassign, addcommition, datatable) {
    $scope.loader = false;

    var datatableConfig = {
        "name": "AdvancePayCommissionList",
        "columns": [
            {
                "header": "ID",
                "property": "commissionid",
                "order": true,
                "render": "<a ng-click='gotonextpage(cellValue)'>{{cellValue}}</a>",
                "type": "text"
            },
            {
                "header": "Lorry Number",
                "property": "lorryno",
                "order": true,
                "type": "text"
            },
            {
                "header": "Status",
                "property": "commitionstatus",
                "order": true,
                "type": "text"
            },
            {
                "header": "Name Board",
                "property": "nameboard",
                "order": true,
                "type": "text"
            },
            {
                "header": "Lorry Contact",
                "property": "ophone",
                "order": true,
                "type": "text"
            },
            {
                "header": "Trans. Number",
                "property": "transporterphone",
                "order": true,
                "type": "text"
            },
            {
                "header": "Loading Date",
                "property": "loadingdate",
                "order": true,
                "type": "text"
            },
            {
                "header": "From",
                "property": "lfrom",
                "order": true,
                "type": "text"
            },
            {
                "header": "To",
                "property": "lto",
                "order": true,
                "type": "text"
            }

        ],
        "filter": {
            "active": true,
            "highlight": true,
            "columnMode": true
        },
        "exportCSV": {
            active: true,//Active or not
            showButton: true,//Show the export button in the toolbar
            delimiter: ";"//Set the delimiter
        },
        "pagination": {
            "mode": 'local',
            numberRecordsPerPageList: [{
                number: 10,
                clazz: ''
            }, {
                number: 25,
                clazz: ''
            }]
        },
        "order": {
            "mode": 'local'
        },
        "select": {
            "active": true,
            "callback": function (line, data) {
                console.log("callback select : " + data.commissionid);
            }
        }
    };

    $scope.getadvancedList = function () {
        var promise =
            allgetService.getAllService(domain + "/api/Commission/getalladvancepay");
        promise.then(
           function (payload) {
               //$scope.commitionList = payload;
               $scope.datatable = datatable(datatableConfig);
               $scope.datatable.setData(payload);
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('failure loading movie', errorPayload);
               alert('error get commission');
               $scope.loader = true;
           });
    };

    $scope.getadvancedList();

    $scope.gotonextpage = function (param) {
        //console.log(param);
        var x = '/commissiondetail/' + param
        $location.path(x);
    };

}]);


app.controller('brokerlistCtl', ['$scope', 'getalllorry', 'addlorry', '$log', 'fileUpload', 'allService', '$filter', 'allgetService', 'addassign', 'addcommition', 'datatable', function ($scope, getalllorry, addlorry, $log, fileUpload, allService, $filter, allgetService, addassign, addcommition, datatable) {
    $scope.loader = false;

    var datatableConfig = {
        "name": "BrokerList",
        "columns": [
            {
                "header": "Broker ID",
                "property": "brokerid",
                "order": true,
                "type": "text"
            },
            {
                "header": "Name",
                "property": "brokername",
                "order": true,
                "type": "text"
            },
            {
                "header": "Mobile",
                "property": "phone",
                "order": true,
                "type": "text"
            },
            {
                "header": "Landline",
                "property": "landline",
                "order": true,
                "type": "text"
            },
            {
                "header": "Address",
                "property": "address",
                "order": true,
                "type": "text"
            }
        ],
        "filter": {
            "active": true,
            "highlight": true,
            "columnMode": true
        },
        "exportCSV": {
            active: true,//Active or not
            showButton: true,//Show the export button in the toolbar
            delimiter: ";"//Set the delimiter
        },
        "pagination": {
            "mode": 'local',
            numberRecordsPerPageList: [{
                number: 10,
                clazz: ''
            }, {
                number: 25,
                clazz: ''
            }]
        },
        "order": {
            "mode": 'local'
        },
        "select": {
            "active": true,
            "callback": function (line, data) {
                console.log("callback select : " + data.brokerid);
            }
        }
    };

    $scope.getbrokerList = function () {
        var promise =
            allgetService.getAllService(domain + "/api/Broker/getallbroker");
        promise.then(
           function (payload) {
               //$scope.brokerList = payload;
               $scope.datatable = datatable(datatableConfig);
               $scope.datatable.setData(payload);
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('failure loading movie', errorPayload);
               alert('error get commission');
               $scope.loader = true;
           });
    };

    $scope.getbrokerList();



}]);

app.controller('commissionCtl', ['$scope', 'getalllorry', 'addlorry', '$log', 'fileUpload', 'allService', '$filter', 'allgetService', 'addassign', 'addcommition', function ($scope, getalllorry, addlorry, $log, fileUpload, allService, $filter, allgetService, addassign, addcommition) {
    $scope.loader = false;
    $scope.todaydate = $filter('date')(new Date(), 'dd/MM/yyyy');

    $scope.commition = {
        'commisiondate': $scope.todaydate
    }
    $scope.getAssign = function () {
        var promise =
            allgetService.getAllService(domain+"/api/Assign/getallassign");
        promise.then(
           function (payload) {
               $scope.assignLoad = payload;
               $scope.loader = true;
           },
           function (errorPayload) {
               alert('error get assign');
               $scope.loader = true;
           });
    };

    $scope.getDriver = function () {
        $scope.loader = false;
        var promise =
            allgetService.getAllService(domain+"/api/Driver/getalldriver");
        promise.then(
           function (payload) {
               $scope.driverLoad = payload;
               $scope.loader = true;
           },
           function (errorPayload) {
               //$log.error('failure loading movie', errorPayload);
               alert('error get driver');
               $scope.loader = true;
           });
    };

    $scope.addDriver = function () {
        $scope.loader = false;
        var promise =
            allService.getAllService(domain+"/api/Driver/adddriver", $scope.driver);
        promise.then(
           function (payload) {
               $scope.getDriver();
               $scope.driver = null;
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('failure loading movie', errorPayload);
               alert('error add driver');
               $scope.loader = true;
           });
    };

    $scope.addCommition = function () {
        $scope.loader = false;
        $scope.todaydate = $filter('date')(new Date(), 'dd/MM/yyyy');
        var promise =
            addcommition.addCommition($scope.commition, $scope.driver, $scope.todaydate);
        promise.then(
           function (payload) {
               alert('success');
               $scope.commition = null;
               $scope.driver = null;
               $scope.editenable = true;
               $scope.deleteenable = true;
               $scope.getDriver();
               $scope.getAssign();
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('failure loading movie', errorPayload);
               alert('error add commission');
               $scope.loader = true;
           });
    };


    $scope.getDriver();
    $scope.getAssign();

    $scope.selectLoadCommition = function (commissionData) {
        $scope.commition = commissionData;
        $scope.editenable = false;
        $scope.deleteenable = false;
    };

    $scope.selectLoadDriver = function (driverData) {
        $scope.driver = driverData;
        $scope.editenable = false;
        $scope.deleteenable = false;
    };

    $scope.editenable = true;
    $scope.deleteenable = true;

    $scope.resetForm = function () {
        $scope.commition = null;
        $scope.driver = null;
        $scope.editenable = true;
        $scope.deleteenable = true;
    };
}]);



app.controller('advancepayCtl', ['$scope', '$log', 'fileUpload', 'allService', '$filter', 'allgetService', function ($scope, $log, fileUpload, allService, $filter, allgetService) {
    $scope.loader = true;

    //$scope.todaydate = $filter('date')(new Date(), 'dd/MM/yyyy');

    $scope.$watch("ackCommission.claim", function (val) {
        if (val === 0) {
            $scope.ackCommission.claim = "";
        }
    });

    $scope.$watch("ackCommission.totalkuli", function (val) {
        if (val === 0) {
            $scope.ackCommission.totalkuli = "";
        }
    });

    $scope.$watch("ackCommission.extrakm", function (val) {
        if (val === 0) {
            $scope.ackCommission.extrakm = "";
        }
    });

    $scope.$watch("ackCommission.commitionpercent", function (val) {
        if (val === 0) {
            $scope.ackCommission.commitionpercent = "";
        }
    });

    
    $scope.showack = function () {
        $scope.loader = false;
        var promise =
            allgetService.getAllService(domain + "/api/Commission/getalladvancepay");
        promise.then(
           function (payload) {

               $scope.ackallopen = payload;
               $scope.loader = true;
           },
           function (errorPayload) {
               alert('error get Acknowledgement');
               $scope.loader = true;
           });
    };


    $scope.selectAck = function (ackData) {
        $scope.ackCommission = ackData;

        //console.log($scope.ackCommission.loadingdate);
        //console.log($scope.ackCommission.ackdate);
        //console.log($scope.ackCommission.amountsentdate);
        //console.log($scope.ackCommission.balancereceiveddate);
        
    };

    $scope.editAdvancePayCommision = function (objadvanced) {
        
        $scope.loader = false;
        var promise =
        allService.getAllService(domain + "/api/Commission/editadvancepaycommission", objadvanced);
        promise.then(
           function (payload) {
               alert('updated');
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('error', errorPayload);
               alert('error', errorPayload);
               $scope.loader = true;
           });
    };

    
}]);



app.controller('toopayCtl', ['$scope', '$log', 'fileUpload', 'allService', '$filter', 'allgetService', function ($scope, $log, fileUpload, allService, $filter, allgetService) {
    $scope.loader = true;

    //$scope.todaydate = $filter('date')(new Date(), 'dd/MM/yyyy');
       
    $scope.$watch("ackCommission.commitionpercent", function (val) {
        if (val === 0) {
            $scope.ackCommission.commitionpercent = "";
        }
    });
    
    $scope.showack = function () {
        $scope.loader = false;
        var promise =
            allgetService.getAllService(domain + "/api/Commission/getalltoopay");
        promise.then(
           function (payload) {

               $scope.ackallopen = payload;
               $scope.loader = true;
           },
           function (errorPayload) {
               alert('error get toopaylist');
               $scope.loader = true;
           });
    };


    $scope.selectAck = function (ackData) {
        $scope.ackCommission = ackData;
    };

    $scope.editTooPayCommision = function (objtoopay) {
        $scope.loader = false;
        var promise =
        allService.getAllService(domain + "/api/Commission/edittoopaycommission", objtoopay);
        promise.then(
           function (payload) {
               alert('updated');
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('error', errorPayload);
               alert('error', errorPayload);
               $scope.loader = true;
           });
    };


}]);



app.factory('addcommition', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    var addCommition = function (e, a, d) {

        var loadingdate = "";

        if (e.paymentmode !== "advance") {
            loadingdate = d;
        }

        var payload = $.param({
            'commissionid': e.commissionid,
            'paymentmode': e.paymentmode,
            'balance': e.balance,
            'advance': e.advance,
            'commitionpercent': "",
            'commition': "",
            'commitionpaid': "",
            'commitionbalance': "",
            'dcommitionpercent': e.dcommitionpercent,
            'dcommition': e.dcommition,
            'tmamul': e.tmamul,
            'assignid': e.assignid,
            'driverid': a.driverid,
            'lorryno': e.lorryno,
            'loadid': e.loadid,
            'transportid': e.transporterid,
            'commisiondate': d,
            'loadingdate': loadingdate,
            'ackmode': "",
            'ackdate': "",
            'extrakm': "",
            'claim': "",
            'totalkuli': "",
            'halting': "",
            'kulideduction': "",
            'grandtotal': "",
            'amountsentdate': "",
            'amountreceived': "",
            'balanceerrorchecking': "",
            'balancereceiveddate': "",
            'paymentcalculation': "",
            'paidin': ""


        });
        var d = $q.defer();
        $timeout(function () {
            $http.post(domain+"/api/Commission/addcommission", payload, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'username': 'ADMIN', 'password': 'ADMIN' },
            }).success(function (responseData) {
                d.resolve(responseData);

            }).error(function (err) {
                d.reject(err);
            });
        }, 1000);
        return d.promise;
    };
    return {
        addCommition: addCommition
    };
}]);


app.controller('assignLoadLorry', ['$scope', '$route', '$rootScope', 'getalllorry', 'addlorry', '$log', 'fileUpload', 'allService', '$filter', 'allgetService', 'addassign', '$mdBottomSheet', function ($scope, $route, $rootScope, getalllorry, addlorry, $log, fileUpload, allService, $filter, allgetService, addassign, $mdBottomSheet) {
    $scope.getLoad = function () {
        $scope.loader = false;
        var promise =
            allgetService.getAllService(domain+"/api/Load/getallload");
        promise.then(
           function (payload) {
               $scope.lload = payload;
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('failure loading movie', errorPayload);
               alert('error', errorPayload);
               $scope.loader = true;
           });
    };
    $scope.dataa = function () {
        $scope.loader = false;
        var promise =
            getalllorry.getData();
        promise.then(
           function (payload) {
               $scope.listingData = payload;
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('failure loading movie', errorPayload);
               alert('error', errorPayload);
               $scope.loader = true;
           });
    };
    $scope.dataa();

    $scope.getLoad();
    $scope.lorryselected = false;
    $scope.loadselected = false;

    $scope.resetForm = function () {
        $scope.lorry = null;
        $scope.transport = null;
        $scope.lorryload = null;
    };

    $scope.selectLorryAssign = function (lorryData) {
        $scope.lorryselected = true;
        $scope.lorryno = lorryData.lorryno;
        $scope.lorrycontact = lorryData.ophone;
        $rootScope.selectLorry = lorryData;
        $mdBottomSheet.show({
            templateUrl: 'lorryupdate.html',
            controller: 'ListBottomSheetCtrl'
        }).then(function (clickedItem) {
            $scope.alert = clickedItem['name'] + ' clicked!';
        });

    };

    $scope.selectLoadAssign = function (loadData) {
        $scope.loadselected = true;
        $scope.loadname = loadData.loadname;
        $scope.loadid = loadData.loadid;
        $scope.transpoternumber = loadData.transporterphone;
        $scope.transportid = loadData.transporterid;
    };
    $scope.removeLorry = function () {
        $scope.lorryselected = false;
    };
    $scope.removeLoad = function () {
        $scope.loadselected = false;
    };

    $scope.addAssign = function (isValid) {
        $scope.loader = false;
        $scope.todaydate = $filter('date')(new Date(), 'dd/MM/yyyy');
        var promise =
        addassign.addassign($scope.lorryno, $scope.loadid, $scope.transportid, $scope.todaydate);
        promise.then(
           function (payload) {
               alert('assigned');
               $route.reload();
               $scope.dataa();
               $scope.getLoad();
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('error', errorPayload);
               alert('error', errorPayload);
               $scope.loader = true;
           });
    };

}]);
app.controller('ListBottomSheetCtrl', ['$scope', '$rootScope', '$mdBottomSheet', '$filter', 'allService', function ($scope, $rootScope, $mdBottomSheet, $filter, allService) {

    $scope.editLorry = function (isValid) {
        $scope.loader = false;
        $rootScope.selectLorry.updateddate = $filter('date')(new Date(), 'dd/MM/yyyy');
        var promise =
        allService.getAllService(domain+"/api/Lorry/editlorry", $rootScope.selectLorry);
        promise.then(
           function (payload) {
               alert('updated');
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('error', errorPayload);
               alert('error', errorPayload);
               $scope.loader = true;
           });
    };

}]);

app.factory('addassign', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    var addAssign = function (e, a, t, d) {
        alert(e + a);
        var payload = $.param({
            'lorryno': e,
            'loadid': a,
            'transpoterid': t,
            'assigndate': d
        });
        var d = $q.defer();
        $timeout(function () {
            $http.post(domain+"/api/Assign/addassign", payload, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'username': 'ADMIN', 'password': 'ADMIN' },
            }).success(function (responseData) {
                d.resolve(responseData);

            }).error(function (err) {
                d.reject(err);
            });
        }, 1000);
        return d.promise;
    };
    return {
        addassign: addAssign
    };
}]);



app.controller('transporter', ['$scope', 'getalllorry', 'addlorry', '$log', 'fileUpload', 'allService', '$filter', 'allgetService', function ($scope, getalllorry, addlorry, $log, fileUpload, allService, $filter, allgetService) {

    $scope.loader = false;

    $scope.getTransporter = function () {
        $scope.loader = false;
        var promise =
            allgetService.getAllService(domain+"/api/User/getalluser");
        promise.then(
           function (payload) {
               $scope.trans = payload;
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('failure loading movie', errorPayload);
               alert('error get transport');
               $scope.loader = true;
           });
    };

    $scope.getLoad = function () {
        $scope.loader = false;
        var promise =
            allgetService.getAllService(domain+"/api/Load/getallload");
        promise.then(
           function (payload) {
               $scope.lload = payload;
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('failure loading movie', errorPayload);
               alert('error get load');
               $scope.loader = true;
           });
    };

    $scope.getLoad();
    $scope.getTransporter();


    $scope.addtrans = function (isValid) {
        $scope.loader = false;
        var promise =
        allService.getAllService(domain+"/api/User/adduser", $scope.transport);
        promise.then(
           function (payload) {
               $scope.transport = null;
               $scope.getTransporter();
               alert("success");
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('error', errorPayload);
               alert('error add transporter');
               $scope.loader = true;
           });
    };

    $scope.editTrans = function (isValid) {
        $scope.loader = false;
        var promise =
        allService.getAllService(domain+"/api/User/edituser", $scope.transport);
        promise.then(
           function (payload) {
               $scope.transport = null;
               $scope.getTransporter();
               alert("success");
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('error', errorPayload);
               alert('error edit transporter');
               $scope.loader = true;
           });
    };

    $scope.editenable = true;
    $scope.deleteenable = true;
    $scope.editenableload = true;
    $scope.deleteenableload = true;

    $scope.resetForm = function () {
        $scope.transport = null;
        $scope.editenable = true;
        $scope.deleteenable = true;
    };

    $scope.selectTrans = function (transData) {
        $scope.loader = false;
        console.log(transData.tranporterid);
        $scope.transport = transData;
        $scope.editenable = false;
        $scope.deleteenable = false;
        $scope.loader = true;
    };

    $scope.addLoad = function (isValid) {
        $scope.loader = false;
        $scope.lorryload.loaddate = $filter('date')(new Date(), 'dd/MM/yyyy');
        $scope.lorryload.transporterid = $scope.transport.tranporterid;
        var promise =
        allService.getAllService(domain+"/api/Load/addload", $scope.lorryload);
        promise.then(
           function (payload) {
               $scope.lorryload = null;
               $scope.getLoad();
               alert('success');
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('error', errorPayload);
               alert('error add load');
               $scope.loader = true;
           });
    };

    $scope.editLoad = function (isValid) {
        $scope.loader = false;
        $scope.lorryload.loaddate = $filter('date')(new Date(), 'dd/MM/yyyy');
        var promise =
        allService.getAllService(domain+"/api/Load/editload", $scope.lorryload);
        promise.then(
           function (payload) {
               $scope.lorryload = null;
               $scope.getLoad();
               alert('success');
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('error', errorPayload);
               alert('error edit load');
               $scope.loader = true;
           });
    };


    $scope.resetLoad = function () {
        $scope.lorryload = null;
        $scope.editenableload = true;
        $scope.deleteenableload = true;
    };

    $scope.selectLoad = function (lloadData) {
        $scope.loader = false;
        console.log(lloadData.loadname);
        $scope.lorryload = lloadData;
        $scope.editenableload = false;
        $scope.deleteenableload = false;
        $scope.loader = true;
    };

}]);


app.controller('brokerCtl', ['$scope', '$location', 'getalllorry', 'addlorry', '$log', 'fileUpload', 'allService', '$filter', 'allgetService', function ($scope, $location, getalllorry, addlorry, $log, fileUpload, allService, $filter, allgetService) {

    console.log($location.search());

    $scope.loader = false;

    $scope.getBroker = function () {
        $scope.loader = false;
        var promise =
            allgetService.getAllService(domain + "/api/Broker/getallbroker");
        promise.then(
           function (payload) {
               $scope.bro = payload;
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('failure loading movie', errorPayload);
               alert('error get transport');
               $scope.loader = true;
           });
    };

    $scope.getBroker();


    $scope.addbroker = function (isValid) {
        $scope.loader = false;
        var promise =
        allService.getAllService(domain + "/api/Broker/addbroker", $scope.broker);
        promise.then(
           function (payload) {
               $scope.broker = null;
               $scope.getBroker();
               alert("success");
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('error', errorPayload);
               alert('error add broker');
               $scope.loader = true;
           });
    };

    $scope.editbroker = function (isValid) {
        $scope.loader = false;
        var promise =
        allService.getAllService(domain + "/api/Broker/editbroker", $scope.broker);
        promise.then(
           function (payload) {
               $scope.broker = null;
               $scope.getBroker();
               alert("success");
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('error', errorPayload);
               alert('error edit broker');
               $scope.loader = true;
           });
    };

    $scope.deletebroker = function (isValid) {
        $scope.loader = false;
        var promise =
        allService.getAllService(domain + "/api/Broker/deletebroker", $scope.broker);
        promise.then(
           function (payload) {
               $scope.broker = null;
               $scope.getBroker();
               alert("success");
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('error', errorPayload);
               alert('error edit broker');
               $scope.loader = true;
           });
    };

    $scope.editenable = true;
    $scope.deleteenable = true;
    $scope.editenableload = true;
    $scope.deleteenableload = true;

    $scope.resetForm = function () {
        $scope.transport = null;
        $scope.editenable = true;
        $scope.deleteenable = true;
    };

    $scope.selectBroker = function (brokerData) {
        $scope.loader = false;
        $scope.broker = brokerData;
        $scope.editenable = false;
        $scope.deleteenable = false;
        $scope.loader = true;
    };

    

}]);



app.controller('lorry', ['$scope', 'getalllorry', 'addlorry', '$log', 'fileUpload', 'allService', '$filter', 'allgetService', function ($scope, getalllorry, addlorry, $log, fileUpload, allService, $filter, allgetService) {

    $scope.lorryData = null;
    $scope.loader = false;
    $scope.phonetype = "owner";
    //$scope.displayNotes = false;
    //$scope.enquiryText = "open note";
    $scope.CurrentDate = new Date();

    $scope.editenable = true;
    $scope.deleteenable = true;
    $scope.addenable = true;
    $scope.lorrynoenable = false;


    /*$scope.toggleNote = function () {
        if ($scope.displayNotes) {
            $scope.displayNotes = false;
            $scope.enquiryText = "open note";
        }
        else {
            $scope.displayNotes = true;
            $scope.enquiryText = "close note";
            $scope.getnotelist();
        }
    };*/

    $scope.dataa = function () {
        var promise =
            getalllorry.getData();
        promise.then(
           function (payload) {
               $scope.listingData = payload;
               $scope.lorryData = payload
               $scope.loader = true;
           },
           function (errorPayload) {
               $scope.loader = true;
               $scope.loader = true;
           });
    };

    $scope.dataa();

    $scope.addlorry = function (isValid) {
        $scope.loader = false;
        $scope.lorry.updateddate = $filter('date')(new Date(), 'dd/MM/yyyy');
        var promise =
        addlorry.addlorry($scope.lorry);
        promise.then(
           function (payload) {
               $scope.lorry = null;
               $scope.dataa();
               $scope.loader = true;
               $scope.lorrynoenable = false;
               $scope.editenable = true;
               $scope.deleteenable = true;
               $scope.addenable = true;
           },
           function (errorPayload) {
               $log.error('error', errorPayload);
               alert('error', errorPayload);
               $scope.loader = true;
           });
    };


    $scope.editLorry = function (isValid) {
        $scope.loader = false;
        $scope.lorry.updateddate = $filter('date')(new Date(), 'dd/MM/yyyy');
        var promise =
        allService.getAllService(domain+"/api/Lorry/editlorry", $scope.lorry);
        promise.then(
           function (payload) {
               $scope.lorry = null;
               $scope.dataa();
               $scope.loader = true;
               $scope.editenable = true;
               $scope.deleteenable = true;
               $scope.addenable = true;
               $scope.lorrynoenable = false;
           },
           function (errorPayload) {
               $log.error('error', errorPayload);
               alert('error', errorPayload);
               $scope.loader = true;
           });
    };

    $scope.deleteLorry = function (isValid) {

        //alert($scope.lorry.lorryno);

        $scope.loader = false;
        var promise =
        allService.getAllService(domain + "/api/Lorry/deletelorry", $scope.lorry);
        promise.then(
           function (payload) {

               if (payload === "no added") {
                   alert($scope.lorry.lorryno+" cannot delete.  Because this lorry is in commission...");

               }
               else {
                   alert($scope.lorry.lorryno + " lorry deleted....");
               }
               $scope.lorry = null;
               $scope.dataa();
               $scope.loader = true;
               $scope.editenable = true;
               $scope.deleteenable = true;
               $scope.addenable = true;
               $scope.lorrynoenable = false;
           },
           function (errorPayload) {
               $log.error('error', errorPayload);
               alert('error', errorPayload);
               $scope.loader = true;
           });
    };

    
    $scope.resetForm = function () {
        $scope.lorry = null;
        $scope.listingData = $scope.lorryData;
        $scope.addenable = true;
        $scope.editenable = true;
        $scope.deleteenable = true;
        $scope.lorrynoenable = false;

    };

    $scope.selectLorry = function (lorryData) {
        $scope.loader = false;
        console.log(lorryData.lorryno);
        $scope.lorry = lorryData;
        $scope.editenable = false;
        $scope.deleteenable = false;
        $scope.addenable = true;
        $scope.lorrynoenable = true;
        $scope.loader = true;
    };

    $scope.testfunction = function (vv) {

        if (vv == undefined || vv == null || vv == "") {
            $scope.addenable = true;
        }
        else {
            $scope.addenable = false;
        }
    };
}]);

app.controller('uploaddocument', ['$scope', '$log', 'fileUpload', 'getalllorry', function ($scope, $log, fileUpload, getalllorry) {
    $scope.loader = false;
    $scope.dataa = function () {
        var promise =
            getalllorry.getData();
        promise.then(
           function (payload) {
               $scope.listingData = payload;
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('failure loading movie', errorPayload);
               alert('error get lorry');
               $scope.loader = true;
           });
    };
    $scope.dataa();
    $scope.upFile = function () {
        $scope.loader = false;
        var file = $scope.myFile;
        alert($scope.document + $scope.filename);
        var promise =
            fileUpload.uploadFileToUrl(file, $scope.document, $scope.filename);
        promise.then(
           function (payload) {

               alert(payload);
               $scope.myFile = null;
               $scope.filename = null;
               $scope.document = null
               $scope.loader = true;
           },
           function (errorPayload) {
               $log.error('error', errorPayload);
               alert('error upload the file');
               $scope.loader = true;
           });
    };
}]);

app.factory('addlorry', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    var addLorry = function (e) {
        alert(e.lorryno);
        var payload = $.param(e);
        var d = $q.defer();
        $timeout(function (e) {
            $http.post(domain+"/api/Lorry/addlorry", payload, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'username': 'ADMIN', 'password': 'ADMIN' },
            }).success(function (responseData) {
                d.resolve(responseData);

            }).error(function (err) {
                d.reject(err);
            });
        }, 1000);
        return d.promise;
    };
    return {
        addlorry: addLorry
    };
}]);


app.factory('getalllorry', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    var getUser = function () {
        var d = $q.defer();
        $timeout(function () {
            $http.get(domain+"/api/Lorry/getalllorry", {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'username': 'ADMIN', 'password': 'ADMIN' },
            }).success(function (responseData) {
                d.resolve(responseData);

            }).error(function (err) {
                d.reject(err);
            });
        }, 1000);
        return d.promise;
    };
    return {
        getData: getUser
    };
}]);


app.factory('allService', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    var getAllService = function (url, data) {
        var d = $q.defer();
        var payload = $.param(data);
        $timeout(function () {
            $http.post(url, payload, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'username': 'ADMIN', 'password': 'ADMIN' },
            }).success(function (responseData) {
                d.resolve(responseData);

            }).error(function (err) {
                d.reject(err);
            });
        }, 1000);
        return d.promise;
    };
    return {
        getAllService: getAllService
    };
}]);

app.factory('allgetService', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    var getAllService = function (url) {
        var d = $q.defer();
        var url = url;
        $timeout(function () {
            $http.get(url, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'username': 'ADMIN', 'password': 'ADMIN' },
            }).success(function (responseData) {
                d.resolve(responseData);

            }).error(function (err) {
                d.reject(err);
            });
        }, 1000);
        return d.promise;
    };
    return {
        getAllService: getAllService
    };
}]);



app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.service('fileUpload', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    this.uploadFileToUrl = function (file, documenttype, lorryno) {
        var d = $q.defer();
        var filename = documenttype + "@" + lorryno;
        $timeout(function () {
            var fd = new FormData();
            fd.append('UploadedImage', file);
            $http.post(domain+"/api/FileUpload/", fd, {
                headers: { 'Content-Type': undefined, 'username': 'ADMIN', 'password': 'ADMIN', 'filename': filename },
            }).success(function (responseData) {
                d.resolve(responseData);

            }).error(function (err) {
                d.reject(err);
            });
        }, 1000);
        return d.promise;
    }
}]);

app.directive('googleplace', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                scope.$apply(function () {
                    model.$setViewValue(element.val());
                });
            });
        }
    };
});

app.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            
            element.datepicker({
                dateFormat: 'dd/mm/yy',
                onSelect: function (date) {
                    ngModelCtrl.$setViewValue(date);
                    ngModelCtrl.$render();
                    scope.$apply();
                }
            });
        }
    };
});

//app.directive('jqdatepicker2', function () {
//    return {
//        restrict: 'A',
//        require: 'ngModel',
//        link: function (scope, element, attrs, ngModelCtrl) {

//            element.datepicker({
//                dateFormat: 'dd/mm/yy',
//                onSelect: function (date) {
//                    scope.ackdate = date;
//                    scope.$apply();
//                }
//            });
//        }
//    };
//});

//app.directive('jqdatepicker3', function () {
//    return {
//        restrict: 'A',
//        require: 'ngModel',
//        link: function (scope, element, attrs, ngModelCtrl) {

//            element.datepicker({
//                dateFormat: 'dd/mm/yy',
//                onSelect: function (date) {
//                    scope.amountsentdate = date;
//                    scope.$apply();
//                }
//            });
//        }
//    };
//});

//app.directive('jqdatepicker4', function () {
//    return {
//        restrict: 'A',
//        require: 'ngModel',
//        link: function (scope, element, attrs, ngModelCtrl) {

//            element.datepicker({
//                dateFormat: 'dd/mm/yy',
//                onSelect: function (date) {
//                    scope.balancereceiveddate = date;
//                    scope.$apply();
//                }
//            });
//        }
//    };
//});


app.controller('ngAppDemoController', ['$scope', '$log', 'datatable', 'allgetService', function ($scope, $log, datatable, allgetService) {
		

    $scope.loader = false;

			var datatableConfig = {
				"name":"CommissionList",
				"columns":[
					{
						"header":"Lorry Number",
						"property":"lorryno",
						"order":true,
						"type":"text"
					},
					{
						"header":"Loading Date",
						"property":"loadingdate",
						"order":true,
						"type":"text"
					},
					{
						"header":"Amount Sent",
						"property":"grandtotal",
						"order":true,
						"type":"text"
					},
					{
						"header":"Amount Received",
						"property":"amountreceived",
						"order":true,
						"type":"text"
					}
					
				],
				"filter":{
					"active":true,
					"highlight":true,
					"columnMode":true
				},
				"exportCSV": {
				    active: true,//Active or not
				    showButton: true,//Show the export button in the toolbar
				    delimiter: ";"//Set the delimiter
				},
				"pagination":{
					"mode":'local',
					numberRecordsPerPageList:[{
                        number: 10,
                        clazz: ''
                    }, {
                        number: 25,
                        clazz: ''
                    }]
				},
				"order":{
					"mode":'local'
				},
				"select":{
					"active":true,
					"callback":function(line,data){
						console.log("callback select : "+data.lorryno);
					}
				}
			};


			$scope.getcommitionList = function () {
			    var promise =
                    allgetService.getAllService(domain + "/api/Commission/getallcommission");
			    promise.then(
                   function (payload) {
                       
                       $scope.datatable = datatable(datatableConfig);
                       $scope.datatable.setData(payload);

                       $scope.loader = true;
                       
                   },
                   function (errorPayload) {
                       $log.error('failure loading movie', errorPayload);
                       alert('error get commission');
                       
                   });
			};

			$scope.getcommitionList();
    		
			
			
		}]);