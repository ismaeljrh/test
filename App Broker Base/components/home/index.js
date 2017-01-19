    'use strict';

    app.home = kendo.observable({
        onShow: function() {},
        afterShow: function() {}
    });
    app.localization.registerView('home');

    (function(parent) {
        var
        /// start global model properties
        /// end global model properties
            homeModel = kendo.observable({
            submit: function() {
                iniciar();
            },
            /// start add model functions
            /// end add model functions

            cancel: function() {}
        });

        /// start form functions
        /// end form functions

        parent.set('onShow', function _onShow() {
            var that = parent;
            that.set('addFormData', {
                dni: '07973522',
                /// start add form data init
                /// end add form data init
            });
            /// start add form show
            /// end add form show
        });
        parent.set('homeModel', homeModel);
    })(app.home);

    // START_CUSTOM_CODE_homeModel
    // Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

    // END_CUSTOM_CODE_homeModel

    function iniciar(){
        var dni = $("#dni").val();

        $.ajax({
            type: "GET",
            url: 'http://addserver.ddns.net/BrokerUp-Movil-Service/BrokerUpMovil.svc/getUsuario/' + dni,
            async: false,
            success: function (datos) {
                var data = [];
                //console.log(datos);
                //console.log(datos.GetUsuario_AffResult); 

                $("#LoginID").val(datos.GetUsuario_AffResult.ClienteId);
                $("#LoginDNI").val(datos.GetUsuario_AffResult.DocumentNumber);
                $("#LoginDNI").val(datos.GetUsuario_AffResult.DocumentNumber);
                $("#LoginNombre").val(datos.GetUsuario_AffResult.FirstName+" "+datos.GetUsuario_AffResult.MiddleName+" "+datos.GetUsuario_AffResult.LastName+" "+datos.GetUsuario_AffResult.LastName2);
  
                mostrarmenu(1);

                /*
                $("#DocumentTypeId").val(datos.GetUsuario_AffResult.DocumentTypeId);
                $("#DocumentNumber").val(datos.GetUsuario_AffResult.DocumentNumber);
                $("#Email").val(datos.GetUsuario_AffResult.Email);
                $("#FirstName").val(datos.GetUsuario_AffResult.FirstName);
                $("#MiddleName").val(datos.GetUsuario_AffResult.MiddleName);
                $("#LastName").val(datos.GetUsuario_AffResult.LastName);
                $("#LastName2").val(datos.GetUsuario_AffResult.LastName2);
                $("#UserId").val(datos.GetUsuario_AffResult.UserId);
                $("#WorkPhone").val(datos.GetUsuario_AffResult.WorkPhone);
                */

                //app.navigate('components/principal/view.html');
                kendo.mobile.application.navigate('components/principal/view.html');
                //kendo.mobile.application.navigate('components/polizas/view.html')

                //notificationWidget.show("Datos Obtenidos", "success");
            },
            error: function (request, error) {
                console.log(request);
                console.log(error); 
                //alert("Ocurrio Un Error con el Servicio");
                alert("No se Encontraron Resultados");

                //notificationWidget.show("Ocurrio un problema con el Servicio", "error"); 
                //window.location.href = "#clienteScreen";  
            }
        });         
 
    }

    function mostrarmenu(id){
        if (id == 1) {
            $("#fun00").css("display", "none");
            $("#fun01").css("display", "block");
            $("#fun02").css("display", "block");
            $("#fun03").css("display", "block");
            $("#fun04").css("display", "block");
            $("#fun05").css("display", "block");
            //$("#fun06").css("display", "block");  
            $("#fun07").css("display", "block");
        } else {
            $("#fun00").css("display", "block");
            $("#fun01").css("display", "none");
            $("#fun02").css("display", "none");
            $("#fun03").css("display", "none");
            $("#fun04").css("display", "none");
            $("#fun05").css("display", "none");
            //$("#fun06").css("display", "none"); 
            $("#fun07").css("display", "none");
            $("#LoginID").val('');
            $("#LoginDNI").val('');
            kendo.mobile.application.navigate('components/home/view.html');
        }
    }