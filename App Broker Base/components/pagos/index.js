    'use strict';

    app.pagos = kendo.observable({
        onShow: function() {
            listadoprimas($("#LoginID").val()); 
        },
        afterShow: function() {}
    });
    app.localization.registerView('pagos');
  
    function listadoprimas(idusuario){
        //listado-primas
        $.ajax({
            type: "GET",
            url:'http://addserver.ddns.net/BrokerUp-Movil-Service/BrokerUpMovil.svc/getConsultaPrimas/' + idusuario,
            async: false,
            success: function (datos) {
                var data = [];  
                data = datos.Consulta_Movil_Primas_AFFResult;

                var cont = 1;
                $.each(data, function(i, item) {
                    /*                    
                    console.log(item.Contratante);
                    console.log(item.AseguradoraNombre);
                    console.log(item.NroPoliza);
                    */ 
                    
                    var Aseguradora = "'"+item.Aseguradora+"'";
                    var Cliente = "'"+item.Cliente+"'";
                    var NombreStatus = "'"+item.NombreStatus+"'";
                    var NroDocumento = "'"+item.NroDocumento+"'";
                    var Poliza = "'"+item.Poliza+"'";
                    var PrimaNeta = "'"+item.PrimaNeta+"'";
                    var PrimaTotal = "'"+item.PrimaTotal+"'";
                    var Producto = "'"+item.Producto+"'";
                    var Ramo = "'"+item.Ramo+"'";
                    var SimboloMoneda = "'"+item.SimboloMoneda+"'";
                    var TipoDocumento = "'"+item.TipoDocumento+"'";
                    
                    var VigenciaInicial = "'"+item.VigenciaInicial+"'";
                    //VigenciaInicial = VigenciaInicial.replace("\\","");

                    var VigenciaFinal = "'"+item.VigenciaFinal+"'";
                    //VigenciaFinal = VigenciaFinal.replace("\\",""); 

                    var FechaEmision = "'"+item.FechaEmision+"'";
                    //FechaEmision = FechaEmision.replace("\\","");

                    var color = "";
                    if (cont==1){
                        color= "white;";
                        cont=2;
                    }else{
                        color= "rgba(206, 228, 230, 0.53);";
                        cont=1;
                    } 

                    $("#listado-primas").append('<li id="GrupoLI" style="background-color:'+ color +
                                            '" onclick="DetallePG('+ Aseguradora +', '+ Cliente +', '+ FechaEmision +', '+ NombreStatus +', '+ NroDocumento +', '+ Poliza +', ' + PrimaNeta +', '+ 
                                            PrimaTotal +', '+ Producto +', '+ Ramo +', '+ SimboloMoneda +', '+ TipoDocumento +', '+ VigenciaFinal +', '+ VigenciaInicial + ' )"><span id="etiqueta"></span>'+ 
                                            '<span style="margin-left: 0.5em; margin-top: 0.5em;"> <i class="fa fa-user" aria-hidden="true"></i> &nbsp;&nbsp;'+ Cliente +'</span>'+
                                            '<span style="margin-left: 0.5em;"> <i class="fa fa-shield" aria-hidden="true"></i> &nbsp;&nbsp;'+ Aseguradora +'</span>'+ 
                                            '<span style="margin-left: 0.5em;"> <i class="fa fa-file-text-o" aria-hidden="true"></i> &nbsp;'+ NombreStatus +'</span>'+
                                            '<span style="margin-left: 0.5em;"> <i class="fa fa-area-chart" aria-hidden="true"></i> &nbsp;'+ FechaEmision +'</span></li>');
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

    function DetallePG(Aseguradora, Cliente, FechaEmision, NombreStatus, NroDocumento, Poliza, PrimaNeta, PrimaTotal, Producto, Ramo, SimboloMoneda, TipoDocumento, VigenciaFinal, VigenciaInicial){
        window.location.href = "#detallePrima"; 

        $("#Aseguradora").val(Aseguradora);
        $("#Cliente").val(Cliente);
        $("#FechaEmision").val(FechaEmision);
        $("#NombreStatus").val(NombreStatus);
        $("#NroDocumento").val(NroDocumento);
        $("#Poliza").val(Poliza);
        $("#PrimaNeta").val(PrimaNeta + " " + SimboloMoneda);
        $("#PrimaTotal").val(PrimaTotal + " " + SimboloMoneda);
        $("#Producto").val(Producto);
        $("#Ramo").val(Ramo);
        $("#TipoDocumento").val(TipoDocumento);
        $("#VigenciaFinal").val(VigenciaFinal);
        $("#VigenciaInicial").val(VigenciaInicial);

    }

    // START_CUSTOM_CODE_pagos
    // Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes 
    
    // END_CUSTOM_CODE_pagos