var polygons = [];
function initMap() {
  //set center coordinate
  var myLat = 42 /*value*/ ;
  var myLng = -72 /*value*/ ;
  var center = {
    lat: myLat,
    lng: myLng
  };

  //create map
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: center
  });

  var mapSc = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 16,
    center: center
  });
  var redCoords = [{lat:42.00031094932131, lng: -72.00506401062012},{lat:41.99980067271279, lng: -72.005042552948},{lat:42.00002391923251, lng: -72.00409841537476}];
  // var paths = localStorage.data;

  google.maps.event.addDomListener(document.getElementById('show'), 'click', function(){
    //var showData = localStorage.getItem("data");
    //console.log('hi');
    var latLngData = JSON.parse(localStorage.data)
    //var kk = latLngData.polygon[x].path;
    var paths = Object.keys(latLngData.polygon).map(x=>{
      return latLngData.polygon[x].path;
    });
    //console.log(paths);
    //console.log(kk);
    //console.log(paths.polygon0[1]);
    for (var i = 0; i < paths.length; i++){
        var cords = paths[i];
      //var latlng = ["cords "+i+": "+cords];
      var latlng = JSON.parse(cords);
      console.log(JSON.parse(cords));
      var pp = new google.maps.Polygon({
        map: mapSc,
        paths: latlng,
        strokeColor: '#FFC107',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FFC107',
        fillOpacity: 0.35
      });

    }

  });
    // google.maps.event.addListener(pp,"mouseover",function(){
    //  this.setOptions({fillColor: "#00FF00"});
    // });



  //console.log(paths);



  addDrawingControl(map);
  //bermudaTriangle.setMap(mapSc);
}

function addDrawingControl(map) {
  //add drawing control
  var drawingControl = new google.maps.drawing.DrawingManager({
    drawingMode: null,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.POLYGON
      ]
    },
    polygonOptions: {
      editable: true,
      draggable: false,
      geodesic: true
    }
  });
  drawingControl.setMap(map);
  //end of add drawing control

  //add event listener
  google.maps.event.addListener(drawingControl, 'polygoncomplete', function(polygon) {
    polygons.push(polygon);
    var polygonPath = polygon.getPath();
    //console.log(polygonPath);
    var paths = polygonPath.getArray();
    //console.log("polygon : " + paths, typeof paths);
    //localStorage.setItem('paths', JSON.stringify(paths));

  });


  google.maps.event.addListener(drawingControl, 'polygoncomplete', function(polygon) {
    var htmlStr = "";
    for (var i = 0; i < polygons.length; i++) {
      //htmlStr += "polygon #" + i + " # vertices=" + polygons[i].getPath().getLength() + " km<br>";
      //for (var j = 0; j < +polygons[i].getPath().getLength(); j++) {
      //  htmlStr += "&nbsp;&nbsp;" + polygons[i].getPath().getArray()+ "<br>";
      var polygonPath = polygon.getPath(i);
      //console.log(polygonPath);
      //var cords = polygonPath.getArray(i);
      htmlStr += "<input id='polygon["+i+"][path]' name='polygon["+i+"][path]'  class='form-control' value='"+ JSON.stringify(polygons[i].getPath().getArray())+"' type='text' /><input id='polygon["+i+"][name]' name='polygon["+i+"][name]' class='form-control' value='' type='text' placeholder='Enter Name'/>";
      //}
    }
    document.getElementById('my-form').innerHTML = htmlStr;
  });
    google.maps.event.addDomListener(document.getElementById('add'), 'click', function(){
      var obj = $("form").serializeJSON();
      //console.log("obj : "+obj);
  		var jsonString = JSON.stringify(obj);
      //console.log("jsonString : "+jsonString );
      localStorage.setItem('data', JSON.stringify(obj));
    });
  }
google.maps.event.addDomListener(window, "load", initMap);
