
let ids = [];
let featurel = [];
var co;
var vectorLayer2;
var vectorSource2;
let draw, snap;
let dene = null;
var t = document.getElementById("table");

const texter = new ol.style.Style({
    text: new ol.style.Text({
        font: '16px Calibri,sans-serif',
        fill: new ol.style.Fill({
            color: '#000',
        }), stroke: new ol.style.Stroke({
            color: '#fff',
            width: 1,
        }),
    }),
});
const _myStroke = new ol.style.Stroke({
    color: 'rgba(51, 153,255)',
    width: 1
});
const _myFill = ol.style.Fill({
    color: 'rgba(51, 153,255,0.1)',
});
const myStyle = new ol.style.Style({
    stroke: _myStroke,
    fill: _myFill,
});
var tyle = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 18,
        fill: _myFill,
        stroke: _myStroke,
    }),
    fill: _myFill,
    stroke: _myStroke,
});
const styler = [myStyle, texter];
const as = [tyle, texter];
vectorSource2 = new ol.source.Vector();
vectorLayer2 = new ol.layer.Vector({
    source: vectorSource2,
    style: function (feature) {
        debugger;
        const label = feature.get('name');
        /* feature.setStyle(as)*/
        texter.getText().setText(label);
        return as;
        return styler;
    },
})
const raster = new ol.layer.Tile({
    source: new ol.source.OSM(),
});
const source = new ol.source.Vector();
const vector = new ol.layer.Vector({
    source: source,
});
const extent = ol.proj.get('EPSG:3857').getExtent().slice();
extent[0] += extent[0];
extent[2] += extent[2];
const map = new ol.Map({
    layers: [raster, vector],
    target: 'map',
    view: new ol.View({
        center: [-11000000, 4600000],
        zoom: 4,
        extent,
    }),
});
map.addLayer(vectorLayer2);
const modify = new ol.interaction.Modify({ source: source });
map.addInteraction(modify);
const typeSelect = document.getElementById('type');
var select = new ol.interaction.Select();
map.addInteraction(select);
select.getFeatures().clear();

const selection = function () {
//Seçilen Geometrinin Özelliklerini ve Girilen Bilgilerin Alınması.
    select.on('select', function (evt) {
        var amas = evt.selected.length;
        for (var i = 0; i < amas; i++) {
             $("#infProps").modal('show');
            $(document).ready(function () {
                var a = evt.selected[0].getProperties();
                var modal = $(this);
                modal.find('#namers').text(a.name);
                modal.find('#daters').text(a.date);
                modal.find('#surnamers').text(a.surname);
                modal.find('#commenters').text(a.comment);
                dene = evt.selected[0].getProperties().id;
            })
        }
    })
    GetAllData();
    Update();
    Delete();
}



function Update() {
    //Seçilen Geometrinin Güncellenmesi.
    $('#degistir').click(function () {
        $.ajax({
            type: "POST",
            url: "/Home/UpdateFeatures",
            data: {
                Name: document.getElementById('fname').value,
                Surname: document.getElementById('fsurname').value,
                Comment: document.getElementById('fcomnt').value,
                Id: dene,
            },
            success: function (data) {
                vectorSource2.clear();
                GetAllData();
                $("#infProps").modal('hide');
                $('#infProps').on('hidden.bs.modal', function () {
                    document.getElementById("gnclForm").reset();
                });
                alert("Kayıtlar Değiştirildi");
            },
            error: function (error) {
                error;
            }
        })
    });
}



function Delete() {
    //Seçilen Geometrinin Silinmesi.
    $('#sil').click(function () {
        $.ajax({
            type: "POST",
            url: "/Home/DeleteFeatures",
            data: {
                idddd: dene,
            },
            success: function (data) {
                vectorSource2.clear();
                GetAllData();
                $("#infProps").modal('hide');
                $('#infProps').on('hidden.bs.modal', function () {
                    document.getElementById("gnclForm").reset();
                });
                alert("Kayıtlar Silindi");
            },
            error: function (error) {
                error;
            }
        })

    });
}
$('#btnClose').on('click', function (e) {
    //Yeni Kayıt Modal Kapatma Fonksiyonu.
    select.getFeatures().clear();
    refresh();
    draw.setActive(false);
    $('#staticBack').on('hidden.bs.modal', function () {
        document.getElementById("kayıtForm").reset();
        addInteractions();
    });
    $("#staticBack").modal('hide');
});

$('#btnCloser').on('click', function (e) {
    //Güncelleme Modal Kapatma Fonksiyonu.
    select.getFeatures().clear();
    refresh();
    draw.setActive(false);
    $('#infProps').on('hidden.bs.modal', function () {
        document.getElementById("gnclForm").reset();
        addInteractions();
    });
    $("#infProps").modal('hide');
});

function typ() {
   //Seçilen Çizim Aracına Göre Seçim Eventi Aktifliği.
    if (typeSelect.value == 'None') {
        select.setActive(true);
    } else {
        select.setActive(false);
    }
}

function addInteractions() {
    //Yeni Çizim Fonksiyonu.
    debugger
    typ();
    if (typeSelect.value != 'None') {
        const a = typeSelect.value;
        draw = new ol.interaction.Draw({
            source: source,
            type: a,
        });
        draw.setActive(true);
        map.addInteraction(draw);
        snap = new ol.interaction.Snap({ source: source });
        map.addInteraction(snap);
        draw.on('drawend', function (e) {
            $('#staticBack').modal('show');
        });
    }
}

typeSelect.onchange = function () {
    //Çizim Tipinin Değişimi Fonksiyonu.
    map.removeInteraction(snap);
    selection();
};




function yeni() {
    //Yeni Çizilen Geometrinin Kaydının Yapılması.
    $('#exportBtn').click(function () {
        var featureList = vector.getSource().getFeatures();
        var s = featureList.length;
        var ilkEleman = featureList[s - 1];
        if (ilkEleman) {
            var wkb = new ol.format.WKT();
            var wkbFeature = wkb.writeFeature(ilkEleman);
        }

        var names = document.getElementById('names').value;
        var surnames = document.getElementById('surnames').value;
        var comments = document.getElementById('comments').value;
        $.ajax({
            type: "POST",
            url: "/Home/AddGeometry",
            data: {
                wkbText: wkbFeature,
                Name: names,
                Surname: surnames,
                Comment: comments
            },
            success: function (data) {
                refresh();
                GetAllData();
                alert("Bilgiler Kaydedildi!");
                $('#staticBack').on('hidden.bs.modal', function () {
                    document.getElementById("kayıtForm").reset();
                });
                $("#staticBack").modal('hide');
            },
            error: function (error) {
            }
        });
    })
}

function GetAllData() {
    //Veri Tabanından Verilerin Çekilmesi Fonksiyonu.
    $.ajax({
        type: "GET",
        url: "/Home/GetData",
        datatype: "json",
        success: function (data) {
            for (var items of data) {
                ids = items.Geom;
                var namers = items.Namew;
                var dater = items.Datew;
                var surnamers = items.Surnamew;
                var Coommentser = items.Comments;
                var Idd = items.id;
                const format = new ol.format.WKT();
                featurel = format.readFeature(ids, namers, dater, Coommentser);

                var av = featurel.getGeometry().getCoordinates();
                var c = av.at().length;
                var asa;
                debugger;
                if (c > 2) {
                    asa = new ol.geom.Polygon(av);
                    debugger;
                    var featurething = new ol.Feature({
                        name: namers,
                        surname: surnamers,
                        date: dater,
                        comment: Coommentser,
                        geometry: asa,
                        id: Idd,
                        style: myStyle,
                    });
                    vectorSource2.addFeature(featurething);
                } else {
                    asa = new ol.geom.Point(av);
                    var iconFeature = new ol.Feature({
                        name: namers,
                        surname: surnamers,
                        date: dater,
                        comment: Coommentser,
                        geometry: asa,
                        id: Idd,
                        style: tyle,
                    });
                    vectorSource2.addFeature(iconFeature);
                }

            }
        }, error: function (error) {
            alert("hata");
        }
    });
}

function getLogs() {
    //Log Datalarının Veri Tabanından Çekilmesi.
    $('#asas').click(function () {
        $.ajax({
            type: "GET",
            url: "/Home/GetLogs",
            datatype: "json",
            success: function (data) {
                debugger;
                $('#table tbody').empty();
                for (var items of data) {
                    var r = document.createElement("TR");
                    r.innerHTML = `
                 
                                             <tr>
                                                <th scope="row">${items.ides}</th>
                                                <th>${items.user_}</th>
                                                <th>${items.date}</th>
                                                <th>${items.logmessage}</th> 
                                                <th>${items.yeniKayıt}</th> 
                                                <th>${items.güncellenenKayıt}</th> 
                                                <th>${items.silinenKayıt}</th> 
                                            </tr>
                                    `
                    t.tBodies[0].appendChild(r)
                }
            },
            error: function (error) {
            }
        })
    })
}

function refresh() {
    //haritada Çizilen Son Çizimin Silinmesi
    var featuress = source.getFeatures();
    var lastFeature = featuress[featuress.length - 1];
    source.removeFeature(lastFeature);
    GetAllData();
}


getLogs();
GetAllData();
selection();
addInteractions();
yeni();