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
                data = datos.Consulta_EECCResult;

                var cont = 1;
                $.each(data, function(i, item) {
                    /*                    
                    console.log(item.Contratante);
                    console.log(item.AseguradoraNombre);
                    console.log(item.NroPoliza);
                    */ 
                    
                    var NroDocumento = item.Documento;
                    var Poliza = item.NroPoliza;
                    var Aseguradora = item.AseguradoraNombre;
                    var Ramo = item.Ramo;
                    var SimboloMoneda = item.Moneda;
                    if (SimboloMoneda=="Dólar estadounidense"){
                        SimboloMoneda = "$";
                    }else{
                        SimboloMoneda = "s/.";
                    }
                    var PrimaTotal = item.PrimaTotal;
                    var Vencimiento = item.Vencimiento; 

                    /*
                    var Cliente = item.Cliente; 
                    var PrimaNeta = item.PrimaNeta; 
                    var Producto = item.Producto; 
                    var TipoDocumento = item.TipoDocumento; 
                    var FechaEmision = item.FechaEmision;
                    //FechaEmision = FechaEmision.replace("\\","");
                    */
                    var bkcolor;
                    if (Vencimiento == "Vencida"){
                        bkcolor = "red";
                    }else{
                        bkcolor = "green";
                    }

                    var color = "";
                    if (cont==1){
                        color= "white;";
                        cont=2;
                    }else{ 
                        color= "rgba(206, 211, 230, 0.53);";
                        cont=1;
                    } 
                    
                    /* '" onclick="DetallePG('+ Aseguradora +', '+ Cliente +', '+ FechaEmision +', '+ NombreStatus +', '+ NroDocumento +', '+ Poliza +', ' + PrimaNeta +', '+  */

                    $("#listado-primas").append('<li id="GrupoLI" style="background-color:'+ color + '" ><span id="etiqueta"></span>'+ 
                                            '<span style="margin-left: 0.5em; margin-top: 0.5em;"> <b>Documento: </b> &nbsp;'+ NroDocumento +'</span>'+
                                            '<span style="margin-left: 0.5em;"> <b>Póliza: </b> &nbsp;'+ Poliza +'</span>'+ 
                                            /* '<span style="margin-left: 0.5em;"> <b>Aseguradora: </b> &nbsp;'+ Aseguradora +'</span>'+ */
                                            '<span style="margin-left: 0.5em;"> <b>Ramo: </b> &nbsp;'+ Ramo +'</span>'+
                                            '<span style="margin-left: 0.5em;"> <b>Prima Total: </b> &nbsp;'+ SimboloMoneda +' '+ PrimaTotal +'</span>'+
                                            '<span style="margin-left: 0.5em;  width:75% !important;"> <b>Vencimiento: </b> &nbsp;'+ Vencimiento +'</span> <span style="background-color:'+ bkcolor +'; width: 5% !important; height: 1em !important; border-radius: 1em !important;" ></span></li>');
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

    /*
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
    */
    
