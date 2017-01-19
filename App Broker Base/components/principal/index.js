    'use strict';

    app.principal = kendo.observable({
        onShow: function() {},
        afterShow: function() {}
    });
    app.localization.registerView('principal');

    function redireccion(id){
        switch(id){
            case 1:
                //alert("1");
                kendo.mobile.application.navigate('components/polizas/view.html');
            break;
            case 2:
                //alert("2");
                kendo.mobile.application.navigate('components/pagos/view.html');
            break;
            case 3:
                //alert("3");
                kendo.mobile.application.navigate('components/asistencia/view.html');
            break;
            case 4:
                //alert("4");
                kendo.mobile.application.navigate('components/oficinas/view.html');
            break;
        }
    }