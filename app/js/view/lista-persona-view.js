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
        var selec = this.collection.get(id);

        selec.destroy({
            dataType : 'text',
            success: function() {
                alert("Se eliminó correctamente!");
                window.location.reload();
            },
            error: function() {
                alert("Ha ocurrido un error!");
                window.location.reload();
            }
        });

        }else {return false;}


    },

    editar: function(e){
        e.preventDefault();
        var id = $(e.currentTarget).data("id");

        document.getElementById(id+"nombre").type="text";
        document.getElementById(id+"nombreActual").style = 'display:none;';

        document.getElementById(id+"apellido").type="text";
        document.getElementById(id+"apellidoActual").style = 'display:none;';

        document.getElementById(id+"alias").type="text";
        document.getElementById(id+"aliasActual").style = 'display:none;';

        document.getElementById(id+"telefono").type="text";
        document.getElementById(id+"telefonoActual").style = 'display:none;';

        document.getElementById(id+"direccion").type="text";
        document.getElementById(id+"direccionActual").style = 'display:none;';

        document.getElementById(id+"email").type="text";
        document.getElementById(id+"emailActual").style = 'display:none;';

        document.getElementById("actualizar").style.display = "block";

    },

    actualizar: function(e) {
        e.preventDefault();
        var id = $(e.currentTarget).data("id");

        var persona = new PersonaModel({id});
            persona.fetch({
                success: function (response) {
                    response.set("nombre", document.getElementById(id + "nombre").value);
                    response.set("apellido", document.getElementById(id + "apellido").value);
                    response.set("alias", document.getElementById(id + "alias").value);
                    response.set("telefono", document.getElementById(id + "telefono").value);
                    response.set("direccion", document.getElementById(id + "direccion").value);
                    response.set("email", document.getElementById(id + "email").value);

                    response.save({}, {
                        success: function () {
                            alert("Se modifico el usuario correctamente");
                            window.location.reload();
                        },
                        error: function () {
                            alert("Ocurrio un error al modificar el usuario");
                            window.location.reload();
                        }
                    });
                }

            });


        }



});

_.formatdate = function (stamp) {
    var d = new Date(stamp); // or d = new Date(date)
    return d.getDate()+'-'+(d.getMonth() + 1)+'-'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes();
};
