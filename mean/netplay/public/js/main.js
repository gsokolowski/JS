var GAMES = {
    getData: function (category, selector) {

        //console.log(category);

        $.ajax({
            url: 'api/games/'+category,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            success: function(data) {
                $.each(data, function(i, val) {
                    var path = '<div class="image"><img src="https:' + val.FIELD2 + '"></div>';
                    $(selector).append(path);
                });
                console.log(data);
            }
        });
    },
    searchData: function () {

        $('#search_result').hide(); // don't show this div if you don't have results jet or instead of this you can add display:none to css for serach_result
        $('#search_box').keyup(function() {

            // get value of what user typed int search_box and this will be send as data array
            var value = $(this).val();
            var length = $(this).val().length;
            console.log(length);

            // check if value typed by user is alphanumeric and no space
            if(length>=2) {
                $('#search_result').show();
                // ajax call with passing data as json to search.php
                $.ajax({
                    url: '/api/game/'+value,
                    type: 'GET',
                    success: function(data) {
                        // send info about success
                        $("#search_result").empty();

                        $.each(data, function(i, val) {
                            var path = '<div class="image"><img src="https:' + val.FIELD2 + '"></div>';
                            $("#search_result").append(path);
                        });
                        //console.log(data);
                    }
                });

            } else {
                $('#search_result').hide();
            }
        });
    }
};



//$(function() {
//    $('#search_result').hide(); // don't show this div if you don't have results jet or instead of this you can add display:none to css for serach_result
//    $('#search_box').keyup(function() {
//        // get value of what user typed int search_box and this will be send as data array
//        var value = $(this).val();
//        console.log(value);
//
//        // check if value typed by user is alphanumeric and no space
//        if(value) {
//            $('#search_result').show();
//                // ajax call with passing data as json to search.php
//                $.ajax({
//                    url: '/api/game/'+value,
//                    type: 'GET',
//                    success: function(response) {
//                        // send info about success
//                        $('#search_result').html('asasa');
//                        console.log(response);
//                    }
//                });
//
//        } else {
//            $('#search_result').hide();
//        }
//    });
//});











//function testAjax(handleData) {
//    $.ajax({
//            url: "/api/games",
//            type: "GET",
//            contentType: 'application/json; charset=utf-8',
//        success:function(data) {
//            handleData(data);
//        }
//    });
//}

// define object myObject literal
//var myObject = {
//    name : "Bronek", // property
//    go : "do paki",
//    zaco : "pierscionek",
//    pietro : 3,
//    daneWiezienia : { // to jest property
//        sciany : 'niebieskie',
//        klawisz : 'spory',
//        jedznie : 'przesolone'
//    },
//    getInfo: function () {
//        return this.name + ' cela ' + this.cela + ' ' + this.zaco;
//    }
//};
//
//var SUN = {}; // object
//// do wlasnosc przypisana function
//SUN.wlasnosc = (function (){
//    var zmienna;
//    zmienna = 'Jestem zmienna we funkcji';
//    //alert("Patrz do console.log");
//    console.log(zmienna);
//}());





//$.ajax({
//    url: "/api/games",
//    type: "GET",
//
//    contentType: 'application/json; charset=utf-8',
//    success: function(data) {
//        console.log(data);
//
//        $.each(data, function(i, val) {
//            $("#allgames").append('https').append(val.FIELD2);
//        });
//    }
//});




//
//var loadTextFile = function(myUrl, cb) {
//    $.ajax({
//        type: "GET",
//        url: myUrl,
//
//        success: function(data) {
//
//            cb(null, data);
//        },
//
//        error: function() {
//            cb(true);
//        }
//    });
//};
//
//loadTextFile('/api/games', function(err, data) {
//    if(err) {
//        console.log('There was an error!');
//        return;
//    }
//    console.log(data);
//});
//


//--------------Slots
//$.ajax({
//    url: "/api/slotes",
//    type: "GET",
//
//    contentType: 'application/json; charset=utf-8',
//    success: function(data) {
//        console.log(data);
//
//        $.each(data, function(i, val) {
//            $("#allgames").append(val.FIELD1);
//        });
//    }
//});
