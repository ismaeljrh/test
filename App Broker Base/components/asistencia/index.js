
    'use strict'; 
    app.asistencia = kendo.observable({
        onShow: function(e) {
            navigator.geolocation.getCurrentPosition(function (position) {
                miLatLong = [parseFloat(position.coords.latitude), parseFloat(position.coords.longitude)];
                //console.log("Mi Ubicacion Actual: "+miLatLong);
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
                        //console.log("1");
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

    function changeTipoAsistencia(value){
        /* 
        <option value="1">Accidente</option>
        <option value="2">Asistencia Mecánica</option>
        <option value="3">Chofer Reemplazo</option>
        */
        //console.log(value);
        switch(value){
            case "1":
                //console.log("1");
                $('#tipoDetalle')
                    .empty()
                    .append('<option selected="selected" value="Accidente con lesiones">Accidente con lesiones</option>')
                ; 
                $("#tipoDetalle").append('<option value="Atropello">Atropello</option>');
                $("#tipoDetalle").append('<option value="Choque">Choque</option>');
                $("#tipoDetalle").append('<option value="Robo parcial">Robo parcial</option>');
                $("#tipoDetalle").append('<option value="Robo total">Robo total</option>');
            break;
            case "2":
                //console.log("2");
                $('#tipoDetalle')
                    .empty()
                    .append('<option selected="selected" value="Grúa">Grúa</option>')
                ; 
                $("#tipoDetalle").append('<option value="Auxilio Mecánico">Auxilio Mecánico</option>');
            break;
            case "3":
                //console.log("3");
                $('#tipoDetalle')
                    .empty()
                    .append('<option selected="selected" value="Solicitar Chofer">Solicitar Chofer</option>')
                ;  
            break;
        }
    }

    function ConfirmarAsistencia(){

        window.location.href = "#detalleAsistencia"; 

        $("#Asegurado").val($("#LoginNombre").val());
        $("#AseguradoraNombreAsistencia").val("La Positiva"); 

        var IdVehiculo = $('select#vehiculo').val();
        //console.log(IdVehiculo);

        switch(IdVehiculo){ 
            case "1": 
                $("#VehiculoValor").val("Volvo S60");
                $("#PlacaValor").val("AAL095");
            break;
            case "2":
                $("#VehiculoValor").val("Honda Accord");
                $("#PlacaValor").val("F1W542");
            break;
            case "3":
                $("#VehiculoValor").val("Toyota RAV");
                $("#PlacaValor").val("AQL973");
            break;
        }

        var IdTipoAsistencia = $('select#tipoAsistencia').val();
        //console.log(IdTipoAsistencia);

        switch(IdTipoAsistencia){
            case "1": 
                $("#AsistenciaValor").val("Accidente");
            break;
            case "2":
                $("#AsistenciaValor").val("Asistencia Mecánica");
            break;
            case "3":
                $("#AsistenciaValor").val("Chofer Reemplazo");
            break;
        } 

        var IdTipoDetalle = $('select#tipoDetalle').val();
        //console.log(IdTipoDetalle);
        $("#TipoValor").val(IdTipoDetalle);

        //$("#ubicacion").val($('#latitud').val()+","+$('#longitud').val());

        $("#LlamadaField").html('<span onclick="MakeCall(970005515);" class="btn-llamar"><i class="fa fa-phone" aria-hidden="true"></i> <b>Llamar</b></span>');

    }
    