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
                        color= "rgba(206, 228, 230, 0.53);";
                        cont=1;
                    }

                    $("#listado-polizas").append('<li id="GrupoLI" style="background-color:'+ color +'" onclick="DetallePL(\''+ idDetalle +'\')"><span id="etiqueta"></span>'+ 
                                            '<span style="margin-left: 0.5em; margin-top: 0.5em;"> <i class="fa fa-user" aria-hidden="true"></i> &nbsp;&nbsp;'+ item.Contratante +'</span>'+
                                            '<span style="margin-left: 0.5em;"> <i class="fa fa-shield" aria-hidden="true"></i> &nbsp;&nbsp;'+ item.AseguradoraNombre +'</span>'+ 
                                            '<span style="margin-left: 0.5em;"> <i class="fa fa-file-text-o" aria-hidden="true"></i> &nbsp;'+ item.NroPoliza +'</span>'+
                                            '<span style="margin-left: 0.5em;"> <i class="fa fa-area-chart" aria-hidden="true"></i> &nbsp;'+ item.Ramo +'</span></li>');
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
                    $("#Agencia").val(datos.GetDetallePoliza_AFFResult.Agencia);
                    $("#AseguradoraNombre").val(datos.GetDetallePoliza_AFFResult.AseguradoraNombre);
                    $("#Contratante").val(datos.GetDetallePoliza_AFFResult.Contratante);
                    $("#Estado").val(datos.GetDetallePoliza_AFFResult.Estado);
                    $("#FechaEmision").val(datos.GetDetallePoliza_AFFResult.FechaEmision);
                    $("#MateriaSeguro").val(datos.GetDetallePoliza_AFFResult.MateriaSeguro);
                    $("#Moneda").val(datos.GetDetallePoliza_AFFResult.Moneda);
                    $("#NroColocacion").val(datos.GetDetallePoliza_AFFResult.NroColocacion);
                    $("#NroPoliza").val(datos.GetDetallePoliza_AFFResult.NroPoliza);
                    $("#NroRenovacion").val(datos.GetDetallePoliza_AFFResult.NroRenovacion);
                    $("#Porcentaje").val(datos.GetDetallePoliza_AFFResult.Porcentaje);
                    $("#Ramo").val(datos.GetDetallePoliza_AFFResult.Ramo);
                    $("#UnidadNegocio").val(datos.GetDetallePoliza_AFFResult.UnidadNegocio);
                    $("#vigenciaFinal").val(datos.GetDetallePoliza_AFFResult.vigenciaFinal);
                    $("#vigenciaInicial").val(datos.GetDetallePoliza_AFFResult.vigenciaInicial);
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