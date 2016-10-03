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
        var model = new PersonaModel(data);
        model.save(null,{
            success: function(model, response) {
                alert("Se agregó correctamente!");

            },
            error: function(model, response) {
                alert("Ha ocurrido un error!");
            }

        });


    }
    



});
