/**
 * Clase que implementa el Formulario de alta de personas.
 * @class
 */
var FormularioPersonaView = Backbone.View.extend({
    /**
     * Url del template que corresponde al view
     * @field
     */
    templateURL: "templates/formulario-persona-tmpl.html",

    /**
     * Atributo que define el mapeo de eventos a handlers
     * @field
     */
    events: {
        "click #guardar": "guardar"
    },

    /**
     * @Constructor
     */
    initialize: function () {
        var thiz = this;
        this.loadTemplate(function () {
            thiz.render();
        });
    },

    /**
     * Se encarga de renderizar el html de la página.
     * @function
     */
    render: function () {
        var tmpl = _.template(this.template);
        //se añade el html resultante al contenedor del view.
        this.$el.html(tmpl());
        return this;
    },



    /**
     * Se encarga de añade el nuevo dato al collection que se encuentra en memoria.
     * @function
     */
    guardar: function () {
        var data = {};
        //por cada input del view
        this.$el.find("[name]").each(function () {
            data[this.name] = this.value;
        });


        //validación
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(data["nombre"]==""){
            alert("El campo de nombre no puede estar vacío");
            return false;
        }else if(data["apellido"]==""){
            alert("El campo de apellido no puede estar vacío");
            return false;
        }else if(data["telefono"]==""){
            alert("El campo de telefono no puede estar vacío");
            return false;
        }else if(data["email"]=="") {
            alert("El campo de email no puede estar vacío");
            return false;
        }else if (reg.test(data["email"])==false){
            alert("El campo de email no es valido, se debe seguir el siguiente formato de ejemplo: example@gmail.com");
            return false;
        }


        var thiz = this;
        var model = new PersonaModel(data);
            model.save(null, {
                success: function (model, response) {
                    alert("Se agregó correctamente!");
                    thiz.collection.fetch();

                    //limpiar campos
                    document.getElementById("nombre").value="";
                    document.getElementById("apellido").value="";
                    document.getElementById("alias").value="";
                    document.getElementById("telefono").value="";
                    document.getElementById("direccion").value="";
                    document.getElementById("email").value="";

                },
                error: function (model, response) {
                    alert("Ha ocurrido un error!");
                }

            });

        }
    



});
