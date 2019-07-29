<!DOCTYPE html>
<html lang="en" ng-app="gameApp" ng-strict-di>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Game Application</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">


    <style>

        li {
            padding-bottom: 8px;
        }

    </style>

</head>

<body>

<div class="container">
    <div class="row">
        <div class="text-center">
            <img src="{{ asset('images/logo.png') }}" width="160">
        </div>
        <div class="col-md-6">

        </div>
        <hr>
        <div class="row">

        </div>
        <div class="clearfix"></div>

    </div>

    <div ng-view></div>
</div>

<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>

<script src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/lodash/lodash.js"></script>
<script src="bower_components/angular-route/angular-route.min.js"></script>
<script src="bower_components/angular-local-storage/dist/angular-local-storage.min.js"></script>
<script src="bower_components/restangular/dist/restangular.min.js"></script>

<script src="angular/app.js"></script>
<script src="angular/controllers.js"></script>
<script src="angular/services.js"></script>


<script src= "https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script>
    $(document).ready(function() {
        $('#example').DataTable();
    } );

    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').focus()
    })
</script>
</body>
</html>
