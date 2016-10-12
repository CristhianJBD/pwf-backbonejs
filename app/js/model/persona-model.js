/**
 * Model que corresponde al recurso persona.
 */
var PersonaModel = Backbone.Model.extend({
    /**
     * Atributos por defecto del model 
     * @field
     */
    defaults: {
        "nombre": "",
        "apellido": "",
        "alias": "",
        "telefono":"",
        "email":"",
        "direccion":"",
        "fechacreacion": "",
        "fechamodificacion":null

    },
        validate:function (atributos) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var regTelefono = /^[0-9]*$/ ;

        if(!atributos.nombre){
            alert( 'Debe ingresar el Nombre del nuevo contacto');
            return false;
        }else if(!atributos.apellido){
            alert('Debe ingresar el Apellido del nuevo contacto');
        }else if(!atributos.alias){
            alert('Debe ingresar el Alias del nuevo contacto');
            return false;
        }else if(!atributos.telefono){
            alert('Debe ingresar el numero de telefono del nuevo contacto');
            return false;
        }else if(!atributos.email){
            alert( 'Debe ingresar el Email del nuevo contacto');
            return false;
        }else if(!atributos.direccion){
            ralert('Debe ingresar la Direccion del nuevo contacto');
            return false;
        }else if (reg.test(atributos.email)==false){
            alert('El Email ingresado no es válido, el formato debe ser example@gmail.com');
            return false;
        }else if (regTelefono.test(atributos.telefono)==false){
            alert( 'El numero de telefono ingresado no es válido');
            return false;
        }


    },
    urlRoot: 'https://desa03.konecta.com.py/pwf/rest/agenda'

});
