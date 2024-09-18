var id = [];
var users = [];
var entDate = [];
var outLog=[];
var newKayıt = [];
var updateKayıt = [];
var deleteKayıt = [];

$.ajax({
    type: "GET",
    url: "/Home/GetLogs",
    datatype: "json",
    success: function (data) {
        for (var items of data){
            id = items.ides;
            users = items.user_;
            entDate = items.date;
            outLog = items.items.logmessage;
            newKayıt = items.yeniKayıt;
            updateKayıt = items.güncellenenKayıt;
            deleteKayıt = items.silinenKayıt;
        }
    },
    error: function () {

    }
})


















//let ids = [];
//var co;
//var vectorLayer1;
//var vectorSource1;
//const raster = new ol.layer.Tile({
//    source: new ol.source.OSM(),
//});

//const source = new ol.source.Vector();
//const vector = new ol.layer.Vector({
//    source: source,
//    //style: {
//    //    'fill-color': 'rgba(255, 255, 255, 0.2)',
//    //    'stroke-color': '#ffcc33',
//    //    'stroke-width': 2,
//    //    'circle-radius': 7,
//    //    'circle-fill-color': '#ffcc33',
//    //},
//});

//// Limit multi-world panning to one world east and west of the real world.
//// Geometry coordinates have to be within that range.
//const extent = ol.proj.get('EPSG:3857').getExtent().slice();
//extent[0] += extent[0];
//extent[2] += extent[2];
//const map = new ol.Map({
//    layers: [raster, vector],
//    target: 'map',
//    view: new ol.View({
//        center: [-11000000, 4600000],
//        zoom: 4,
//        extent,
//    }),
//});



//const modify = new ol.interaction.Modify({ source: source });
//map.addInteraction(modify);

//const typeSelect = document.getElementById('type');


//GetAllData();

///*typ();*/
//let draw, snap;

//let dene = null;

//var select = new ol.interaction.Select();
//map.addInteraction(select);
//select.getFeatures().clear();
//const selection = function () {


//    select.on('select', function (evt) {
//        /* idler=evt.selected*/
//        var amas = evt.selected.length;
//        //console.log(amas);

//        for (var i = 0; i < amas; i++) {
//            $("#infProps").modal('show');

//            $(document).ready(function () {
//                var a = evt.selected[0].getProperties();
//                var modal = $(this);

//                modal.find('#namers').text(a.name);
//                modal.find('#daters').text(a.date);
//                modal.find('#surnamers').text(a.surname);

//                modal.find('#commenters').text(a.comment);
//                dene = evt.selected[0].getProperties().id;
//                debugger;
//                co = evt.selected[0].getProperties().name;

//            })
//        }

//        //var amas = evt.selected[0].id;
//        //console.log(amas);









//        /* return dene;*/


//        //function deletee() {
//        //    
//        //}








//    })
//    /*    asel();*/
//    /*vectorLayer1.getSource().removeFeature(evt.selected[0]);*/
//    /* map.removeInteraction(select);*/
//    /* select.setActive(false);*/
//    GetAllData();
//    Update();
//    Delete();
//}

//selection();

//function Update() {



//    $('#degistir').click(function () {



//        $.ajax({

//            type: "POST",
//            url: "/Home/UpdateFeatures",
//            data: {
//                Name: document.getElementById('fname').value,
//                Surname: document.getElementById('fsurname').value,
//                Comment: document.getElementById('fcomnt').value,
//                Id: dene,

//            },
//            success: function (data) {
//                debugger;
//                GetAllData();
//                $("#infProps").modal('hide');

//                $('#infProps').on('hidden.bs.modal', function () {
//                    document.getElementById("gnclForm").reset();
//                });

//                alert("Kayıtlar Değiştirildi");

//            },
//            error: function (error) {
//                error;
//            }





//        })


//    });
//}



//function Delete() {


//    $('#sil').click(function () {


//        $.ajax({

//            type: "POST",
//            url: "/Home/DeleteFeatures",
//            data: {
//                idddd: dene,

//            },
//            success: function (data) {
//                debugger;
//                vectorSource1.clear();
//                /* GetAllData();*/
//                $("#infProps").modal('hide');

//                $('#infProps').on('hidden.bs.modal', function () {
//                    document.getElementById("gnclForm").reset();
//                });

//                alert("Kayıtlar Silindi");

//            },
//            error: function (error) {
//                error;
//            }





//        })

//    });
//}
//$('#btnClose').on('click', function (e) {
//    debugger;
//    //var featuresss = select.getFeatures();
//    //// var features = vectorSource.getFeatures();
//    //var lastFeatures = featuresss[featuresss.length - 1];
//    //select.getFeatures().remove(lastFeatures);
//    //var asas = evt.selected[0];
//    //select.getFeatures().remove(asas);


//    refresh();

//    $('#staticBack').on('hidden.bs.modal', function () {
//        document.getElementById("kayıtForm").reset();
//    });
//    $("#staticBack").modal('hide');

//});

//$('#btnCloser').on('click', function (e) {
//    debugger;
//    //var asas = evt.selected[0];
//    //select.getFeatures().remove(asas);
//    //as();
//    select.getFeatures().clear();

//    //var featuresss = select.getfeatures();
//    //// var features = vectorsource.getfeatures();
//    //var lastfeatures = featuresss[featuresss.length - 1];
//    //select.getfeatures().remove(lastfeatures);
//    $('#infProps').on('hidden.bs.modal', function () {
//        document.getElementById("gnclForm").reset();
//    });
//    $("#infProps").modal('hide');

//});






//function typ() {
//    if (typeSelect.value == 'None') {

//        select.setActive(true);
//    } else {
//        select.setActive(false);
//    }
//}
//function addInteractions() {
//    if (typeSelect.value != 'None') {
//        const a = typeSelect.value;
//        draw = new ol.interaction.Draw({
//            source: source,
//            type: a,
//            condition: (e) => ol.events.condition.noModifierKeys(e) && ol.events.condition.primaryAction(e),
//        });
//        draw.setActive(true);


//        map.addInteraction(draw);
//        snap = new ol.interaction.Snap({ source: source });
//        map.addInteraction(snap);

//        draw.on('drawend', function (e) {
//            $('#staticBack').modal('show');


//        });
//    }
//}



//typeSelect.onchange = function () {
//    debugger;

//    map.removeInteraction(draw);
//    map.removeInteraction(snap);
//    typ(); 3
//    addInteractions();

//};
//addInteractions();



//function yeni() {
//    $('#exportBtn').click(function () {





//        var featureList = vector.getSource().getFeatures();
//        var s = featureList.length;


//        var ilkEleman = featureList[s - 1];

//        if (ilkEleman) {

//            var wkb = new ol.format.WKT();
//            var wkbFeature = wkb.writeFeature(ilkEleman);

//        }





//        var names = document.getElementById('names').value;
//        var surnames = document.getElementById('surnames').value;
//        var comments = document.getElementById('comments').value;


//        $.ajax({

//            type: "POST",
//            url: "/Home/AddGeometry",
//            data: {
//                wkbText: wkbFeature,
//                Name: names,
//                Surname: surnames,
//                Comment: comments

//            },
//            success: function (data) {
//                debugger;
//                refresh();
//                GetAllData();
//                alert("Bilgiler Kaydedildi!");
//                $('#staticBack').on('hidden.bs.modal', function () {
//                    document.getElementById("kayıtForm").reset();
//                });

//                $("#staticBack").modal('hide');


//            },
//            error: function (error) {

//            }



//        });


//    })
//}
//yeni();


//let features = [];

//let feature = [];
//let featurel = [];
//function GetAllData() {


//    $.ajax({
//        type: "GET",
//        url: "/Home/GetData",
//        datatype: "json",



//        success: function (data) {
//            debugger;


//            for (var items of data) {
//                debugger;
//                const texter = new ol.style.Style({
//                    text: new ol.style.Text({

//                        font: '16px Calibri,sans-serif',
//                        /*overflow: true,*/

//                        fill: new ol.style.Fill({
//                            color: '#000',
//                        }), stroke: new ol.style.Stroke({
//                            color: '#fff',
//                            width: 2,
//                        }),
//                    }),
//                });
//                const _myStroke = new ol.style.Stroke({
//                    color: 'rgba(51, 153,255)',
//                    width: 1
//                });

//                const _myFill = ol.style.Fill({
//                    color: 'rgba(51, 153,255,0.1)',
//                });

//                const myStyle = new ol.style.Style({
//                    stroke: _myStroke,
//                    fill: _myFill,


//                });
//                var tyle = new ol.style.Style({
//                    image: new ol.style.Circle({
//                        radius: 18,
//                        fill: _myFill,
//                        stroke: _myStroke,


//                    }),
//                    fill: _myFill,
//                    stroke: _myStroke,
//                });
//                const styler = [myStyle, texter];
//                const as = [tyle, texter];

//                ids = items.Geom;
//                var namers = items.Namew;
//                var dater = items.Datew;
//                var surnamers = items.Surnamew;
//                var Coommentser = items.Comments;
//                var Idd = items.id;
//                const format = new ol.format.WKT();
//                featurel = format.readFeature(ids, namers, dater, Coommentser);

//                var av = featurel.getGeometry().getCoordinates();
//                var c = av.at().length;
//                var asa;
//                if (c > 2) {
//                    asa = new ol.geom.Polygon(av);

//                    var featurething = new ol.Feature({
//                        name: namers,
//                        surname: surnamers,
//                        date: dater,
//                        comment: Coommentser,
//                        geometry: asa,
//                        id: Idd,
//                        style: myStyle,
//                    });


//                    vectorSource1 = new ol.source.Vector({
//                        features: [featurething],
//                        name: 'vect',
//                    });

//                    vectorLayer1 = new ol.layer.Vector({
//                        source: vectorSource1,
//                        style: function (feature) {
//                            const label = feature.get('name');

//                            texter.getText().setText(label);
//                            debugger;

//                            return styler;
//                        },

//                    });


//                    map.addLayer(vectorLayer1);
//                } else {
//                    asa = new ol.geom.Point(av);


//                    var iconFeature = new ol.Feature({

//                        name: namers,
//                        surname: surnamers,
//                        date: dater,
//                        comment: Coommentser,
//                        geometry: asa,
//                        id: Idd,
//                        style: tyle,
//                    });
//                    vectorSource1 = new ol.source.Vector({
//                        features: [iconFeature],
//                        name: 'vect',
//                    });

//                    vectorLayer1 = new ol.layer.Vector({
//                        source: vectorSource1,
//                        style: function (feature) {
//                            const label = feature.get('name');

//                            texter.getText().setText(label);
//                            debugger;

//                            return as;
//                        },

//                    });


//                    map.addLayer(vectorLayer1);
//                }

//            }
//        }, error: function (error) {

//            alert("hata");
//        }



//    });


//}















//function refresh() {

//    var featuress = source.getFeatures();
//    // var features = vectorSource.getFeatures();
//    var lastFeature = featuress[featuress.length - 1];
//    source.removeFeature(lastFeature);
//    GetAllData();
//}


////var featuress=    new ol.Feature({

////        geometry: new ol.geom.Polygon(featurel), // this string is exactly the output of ol.coordinate.toStringXY
////        time: '2019-03-17 09:43:31.428',
////        TWS: 5.29,
////        style:myStyle,
////    })


////console.log(featuress[0]);
////featuress.setStyle(myStyle);

////source.addFeature(featuress);









///* var vectorSource;*/
//    //var select;
//    //const raster = new ol.layer.Tile({
//    //    source: new ol.source.OSM(),
//    //});

//    //const source = new ol.source.Vector();
//    //const vector = new ol.layer.Vector({
//    //    source: vectorSource,
//    //    //style: {
//    //    //    'fill-color': 'rgba(255, 255, 255, 0.2)',
//    //    //    'stroke-color': '#ffcc33',
//    //    //    'stroke-width': 2,
//    //    //    'circle-radius': 7,
//    //    //    'circle-fill-color': '#ffcc33',
//    //    //},
//    //});

//    //// Limit multi-world panning to one world east and west of the real world.
//    //// Geometry coordinates have to be within that range.
//    //const extent = ol.proj.get('EPSG:3857').getExtent().slice();
//    //extent[0] += extent[0];
//    //extent[2] += extent[2];
//    //var map = new ol.Map({
//    //    layers: [raster, vector],
//    //    target: 'map',
//    //    view: new ol.View({
//    //        center: [-11000000, 4600000],
//    //        zoom: 4,
//    //        extent,
//    //    }),
//    //});

//    //const modify = new ol.interaction.Modify({ source: source });
//    //map.addInteraction(modify);

//    //let draw, snap; // global so we can remove them later

//    //select = new ol.interaction.Select({
//    //    source: vectorSource,

//    //})


//    ///**
//    // * Handle change event.
//    // */







//    //$('#map').on('click', function () {

//    //    const typeSelect = ($(this).text());
//    //    addNew();
//    //    function addNew() {
//    //        draw = new ol.interaction.Draw({
//    //            source: vectorSource,
//    //            type: typeSelect,
//    //        });
//    //        map.addInteraction(draw);
//    //        draw.setActive(true);
//    //        select.setActive(false);


//    //        draw.on('drawend', function (evt) {

//    //            //3857 olarak çizilen geometri alınır
//    //            var format = new ol.format.WKB();
//    //            wkb = format.writeFeature(evt.feature);
//    //            draw.setActive(false);
//    //            select.setActive(true);

//    //            mapObject.removeInteraction(draw);
//    //            $("#exportBtn").click(function () {


//    //                debugger;
//    //                var names = document.getElementById('names').value;
//    //                var dates = document.getElementById('dates').value;
//    //                var comments = document.getElementById('comments').value;


//    //                $.ajax({

//    //                    type: "POST",
//    //                    url: "/Home/AddGeometry",
//    //                    data: {
//    //                        wkbText: wkbFeature,
//    //                        Name: names,
//    //                        Datee: dates,
//    //                        Comment: comments

//    //                    },
//    //                    success: function (response) {
//    //                        debugger;
//    //                        $("#staticBackdrop").modal('hide');
//    //                        alert("Koordinat kaydedildi.");

//    //                    },
//    //                    error: function (error) {
//    //                        error;
//    //                    }
//    //                })
//    //            });
//    //            return true;

//    //        }, this);
//    //    }
//    //    debugger;
//    //})