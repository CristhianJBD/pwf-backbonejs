/**
 * Clase que implementa el listado de personas.
 * @class
 */
var ListaPersonaView = Backbone.View.extend({
    /**
     * Url del template que corresponde al view
     * @field
     */
    templateURL: "templates/lista-persona-tmpl.html",

    events: {
        "click #limpiar": "render",
        "click tr": "clicked",
        "click #eliminar": "eliminar",
        "click #editar": "editar",
        "click #actualizar": "actualizar"

    },

    /**
     * @Constructor
     */
    initialize: function () {
        var thiz = this;
        //cuando el collection cambia, se carga la lista.
        this.collection.on("add", this.render, this);
        this.loadTemplate(function () {
            //una vez descargado el template se invoca al fetch para obtener los datos
            //del collection
            thiz.collection.fetch();
        });
    },

    /**
     * Se encarga de renderizar el html de la página.
     * @function
     */
    render: function () {
        var tmpl = _.template(this.template);
        //se procesa el collection a un json
        var coll = this.collection.toJSON();
        //se añade el html resultante al contenedor del view.
        this.$el.html(tmpl({
            collection: coll
        }));
        return this;
    },

    eliminar: function (e) {
        var opcion = window.confirm("Si borra el contacto ya no se podrá recuperar. Desea borrar el contacto?");

        if(opcion == true) {
        e.preventDefault();
        var id = $(e.currentTarget).data("id");
        this.selectedPersona = this.collection.get(id);

        var selec = this.collection.get(this.selectedPersona);
            var thiz = this;
        selec.destroy({

            dataType : 'text',
            success: function(model, response, options) {
                alert("Se eliminó correctamente!");
                window.location.reload();

            },
            error: function(model, response, options) {
                alert("Ha ocurrido un error!");
                window.location.reload();


            }

        });

        }else {return false;}


    },

    editar: function(e){
        e.preventDefault();
        var id = $(e.currentTarget).data("id");
        this.selectedPersona = this.collection.get(id);

        var a = document.getElementById(id+"nombre");
        a.type= "text";
        var aa = document.getElementById(id+"nombre1");
        aa.style='display:none;';

        var b = document.getElementById(id+"apellido");
        b.type= "text";
        var bb = document.getElementById(id+"apellido1");
        bb.style='display:none;';

        var c = document.getElementById(id+"alias");
        c.type= "text";
        var cc = document.getElementById(id+"alias1");
        cc.style='display:none;';

        var d = document.getElementById(id+"telefono");
        d.type= "text";
        var dd = document.getElementById(id+"telefono1");
        dd.style='display:none;';

        var e = document.getElementById(id+"direccion");
        e.type= "text";
        var ee = document.getElementById(id+"direccion1");
        ee.style='display:none;';

        var f = document.getElementById(id+"email");
        f.type= "text";
        var ff = document.getElementById(id+"email1");
        ff.style='display:none;';

        var g = document.getElementById("actualizar");
        g.style.display = "block";



    },

    actualizar: function(e){
        e.preventDefault();
        var id = $(e.currentTarget).data("id");
        this.selectedPersona = this.collection.get(id);

        nombre = document.getElementById(id+"nombre");
        apellido = document.getElementById(id+"apellido");
        alias = document.getElementById(id+"alias");
        telefono = document.getElementById(id+"telefono");
        direccion = document.getElementById(id+"direccion");
        email = document.getElementById(id+"email");

        var persona = new PersonaModel({ id });
        persona.fetch({
            success: function (response) {
                console.log("Found the book: " + response.get("nombre"));
                // Let us update this retreived book now (doing it in the callback) [UPDATE]
                response.set("nombre", nombre.value);
                response.set("apellido", apellido.value);
                response.set("alias", alias.value);
                response.set("telefono", telefono.value);
                response.set("direccion", direccion.value);
                response.set("email", email.value);

                response.save({}, {
                    success: function (model, respose, options) {
                        alert("Se modifico el usuario correctamente");
                        window.location.reload();
                    },
                    error: function (model, xhr, options) {
                        alert("Ocurrio un error al modificar el usuario");
                        window.location.reload();
                    }
                });
            }
        });



    },


});

_.formatdate = function (stamp) {
    var d = new Date(stamp); // or d = new Date(date)
    return d.getDate()+'-'+(d.getMonth() + 1)+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes();
};
