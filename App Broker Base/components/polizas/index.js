    'use strict';

    app.polizas = kendo.observable({
        onShow: function() {
            listadopolizas($("#LoginID").val()); 
        },
        afterShow: function() {}
    });
    app.localization.registerView('polizas');

    function listadopolizas(idusuario){
        //listado-polizas
        $.ajax({
            type: "GET",
            url:'http://addserver.ddns.net/BrokerUp-Movil-Service/BrokerUpMovil.svc/getConsultaPoliza/' + idusuario,
            async: false,
            success: function (datos) {
                var data = [];  
                data = datos.ConsultaPoliza_AFFResult;

                var cont = 1;
                $.each(data, function(i, item) { 
                    /*                    
                    console.log(item.Contratante);
                    console.log(item.AseguradoraNombre);
                    console.log(item.NroPoliza);
                    */
                    var Finicial = item.vigenciaInicial;
                    Finicial = Finicial.replace("\\","");
                    var Ffinal = item.vigenciaFinal;
                    Ffinal = Ffinal.replace("\\","");
                    var idDetalle = item.AseguradoraId + '.' + item.NroPoliza;
                    var color = "";
                    if (cont==1){
                        color= "white;";
                        cont=2;
                    }else{
                        color= "rgba(206, 211, 230, 0.53);";
                        cont=1;
                    }

                    $("#listado-polizas").append('<li id="GrupoLI" style="background-color:'+ color +'" onclick="DetallePL(\''+ idDetalle +'\')"><span id="etiqueta"></span>'+ 
                                            '<span style="margin-left: 0.5em; margin-top: 0.5em;"> <b>Póliza: </b>'+ item.NroPoliza +'</span>'+
                                            '<span style="margin-left: 0.5em;"> <b>Aseguradora: </b>'+ item.AseguradoraNombre +'</span>'+ 
                                            '<span style="margin-left: 0.5em;"> <b>Ramo: </b> '+ item.Ramo +'</span>'+
                                            '<span style="margin-left: 0.5em;"> <b>Vigencia: </b> '+ item.vigenciaInicial +' - '+ item.vigenciaFinal +'</span></li>');
                                            /*
                                            '<span style="margin-left: 0.5em;"> <b>Descripción: </b> '+ item.materiaSeguro +'</li>');
                                            */
                });

                //console.log(JSON.stringify(data)); 

            },
            error: function (request, error) {
                console.log(request);
                console.log(error); 
                alert("Ocurrio Un Error con el Servicio");  
            }
        });   
    }

    function DetallePL(id){
        var valores = id.split(".");
        window.location.href = "#detallePoliza"; 

        kendo.ui.progress($("#detallePoliza"), true);  
        setTimeout(console.log('Consulta Cliente'),2000);

        $.ajax({
            type: "GET",
            url: 'http://addserver.ddns.net/BrokerUp-Movil-Service/BrokerUpMovil.svc/getDetallePoliza/' + valores[1] + "/" + valores[0] + "/" + $("#LoginID").val(),
            async: false,
            success: function (datos) {
                var data = [];
                //console.log(datos.GetDetallePoliza_AFFResult); 
                console.log(datos);
                
                if(datos.GetDetallePoliza_AFFResult==null){
                    alert("No existen datos Detalle"); 
                    window.location.href = "#polizasScreen"; 
                }else{
                    $("#NroPoliza").val(datos.GetDetallePoliza_AFFResult.NroPoliza);
                    $("#AseguradoraNombre").val(datos.GetDetallePoliza_AFFResult.AseguradoraNombre);
                    $("#Ramo").val(datos.GetDetallePoliza_AFFResult.Ramo);
                    $("#Contratante").val(datos.GetDetallePoliza_AFFResult.Contratante);
                    $("#Moneda").val(datos.GetDetallePoliza_AFFResult.Moneda);
                    $("#vigencia").val(datos.GetDetallePoliza_AFFResult.vigenciaInicial +" - \n "+datos.GetDetallePoliza_AFFResult.vigenciaFinal);
                    $("#MateriaSeguro").val(datos.GetDetallePoliza_AFFResult.MateriaSeguro);
 
                } 
                 
            },
            error: function (request, error) {
                console.log(request);
                console.log(error); 
                alert("Ocurrio Un Error con el Servicio");
                
                window.location.href = "#polizasScreen"; 
            }
        }); 
        
        kendo.ui.progress($("#detallePoliza"), false); 
    }

    // START_CUSTOM_CODE_polizas
    // Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

    // END_CUSTOM_CODE_polizas