    'use strict';

    app.asistencia = kendo.observable({
        onShow: function(e) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var miLatLong = [parseFloat(position.coords.latitude), parseFloat(position.coords.longitude)];
                console.log("Mi Ubicacion Actual: "+miLatLong);
                if (miLatLong.length > 0) {
                    // Reset the form data.
                    $("#formAddSiniestro").css("display", "none");
                    $("#setLatLong").css("display", "block");
                    $("#map").css("display", "block");
                    //mapa
                    $("#map").remove();
                    var divmap = "<div id='map'></div>"
                    $("#divmap").after(divmap);
                    var alto = $(window).height() - $("#asistenciaScreen .km-header").height();
                    
                    $("#map").css("height", alto + "px");

                    //var L;
                    if (miLatLong.length > 0) {
                        console.log("1");
                        var map = L.map('map').setView(miLatLong, 18);
                        //var map = L.map('map').setView([51.505, -0.09], 13);
                    } else {
                        miLatLong = [parseFloat(-12.0553016), parseFloat(-77.062695)];
                        var map = L.map('map').setView(miLatLong, 18);
                    } 

                    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);

                    var myIcon = L.icon({
                        iconUrl: 'mapa/images/marker.png',
                        iconAnchor: [25, 0],
                        iconSize: [49, 69],
                    });
                    var marker = L.marker(miLatLong, {
                            draggable: 'true',
                            icon: myIcon
                        }).addTo(map)
                        .bindPopup('Si no se encuentra en la posición establecida puede arrastrar el icono, y dejar pulsado en su posición.', {
                            maxWidth: 200,
                            closeOnClick: true
                        })
                        .openPopup();
                    marker.on("dragend", function (ev) {
                        var chagedPos = ev.target.getLatLng();
                        this.bindPopup(chagedPos.toString()).openPopup();

                        var latlong = chagedPos.toString().replace("LatLng(", "").replace(")", "");
                        var miLatitud = latlong.substring(0, latlong.indexOf(","));
                        var miLongitud = latlong.substring(latlong.indexOf(",") + 1, latlong.length);
                        $("#latitud").val(miLatitud);
                        $("#longitud").val(miLongitud);
                    });

                    //cargamos ds tipo 
                    /*
                    var dsTipos = app.tipos.tiposModel.dataSource;
                    dsTipos.fetch(function () {
                        var htmlBrooker = [];
                        var htmlAseguradora = [];
                        var htmlAseguradora2 = [];
                        var data = dsTipos.data();
                        for (var i = 0; i < data.length; i++) {
                            //console.log(data[i].Id + " - " + data[i].categoria + " - " + data[i].nombre);
                            if(data[i].categoria == "Brooker"){ 
                                htmlBrooker.push('<option value="' + data[i].Id + '" categoria="' + data[i].categoria + '" >' + data[i].nombre + '</option>');    
                            }else if(data[i].categoria == "Aseguradora"){
                                htmlAseguradora.push('<option value="' + data[i].Id + '" categoria="' + data[i].categoria + '" >' + data[i].nombre + '</option>');
                            }else{ 
                                htmlAseguradora2.push('<option value="' + data[i].Id + '" categoria="' + data[i].categoria + '" >' + data[i].nombre + '</option>');
                            }
                            
                        }
                        $("#tipoBrooker").html(htmlBrooker);
                        $("#tipoAseguradora").html(htmlAseguradora);
                        $("#tipoAseguradora2").html(htmlAseguradora2);
                    });
                    //cargamos ds vehiculo 
                    if (localStorage.getItem("placasAsignadas") != undefined) {
                        var placasGuardadas = JSON.parse(localStorage.getItem('placasAsignadas'));
                        var html = [];
                        for (var i = 0; i < placasGuardadas.length; i++) {
                            html.push('<option value="' + placasGuardadas[i].Id + '" vip="' + placasGuardadas[i].vip + '" brooker="' + placasGuardadas[i].brooker + '" aseguradora="' + placasGuardadas[i].aseguradora + '">' + placasGuardadas[i].placa + " - " + placasGuardadas[i].marca +  '</option>');
                        }
                        $("#vehiculo").html(html);
                    }
                    */
                    // var dsVehiculo = app.vehiculo.vehiculoModel.dataSource;
                    // dsVehiculo.fetch(function () {
                    //     var html = [];
                    //     var data = dsVehiculo.data();
                    //     for (var i = 0; i < data.length; i++) {
                    //         html.push('<option value="' + data[i].Id + '" vip="' + data[i].vip + '" brooker="' + data[i].brooker + '" aseguradora="' + data[i].aseguradora + '">' + data[i].placa + '</option>');
                    //     }
                    //     $("#vehiculo").html(html);
                    // });
                } else {
                    alert("Error");
                }
            },
            function (error) {
                alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
            });
        },
        setLatLong: function (e) {
            $("#contentAlertHome").html("Seleccione un vehículo y asi Solicitar Asistencia");
            openModal('modalview-alert-home');
            // $("#map").css("display", "none");
            // $("#setLatLong").css("display", "none");
            $("#formAddSiniestro").css("display", "block");
            if ($("#longitud").val() == "") {
                var latlong = miLatLong.toString();
                var miLatitud = latlong.substring(0, latlong.indexOf(","));
                var miLongitud = latlong.substring(latlong.indexOf(",") + 1, latlong.length);
                $("#latitud").val(miLatitud);
                $("#longitud").val(miLongitud);
            }
        },
        afterShow: function() {}
    }); 

    // START_CUSTOM_CODE_asistencia
    // Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
 
    // END_CUSTOM_CODE_asistencia