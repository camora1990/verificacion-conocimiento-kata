/**
 * Clase encargada de renderizzar las vista de los santos
 * @class
 */

export class SantosView {
  #table;
  #form;
  #title;
  #template;
  #fragment;
  #santoController;
  constructor(santosController) {
    this.#table = document.querySelector(".crud-table");
    this.#form = document.querySelector(".crud-form");
    this.#title = document.querySelector(".crud-title");
    this.#template = document.getElementById("crud-template").content;
    this.#fragment = document.createDocumentFragment();
    this.#santoController = santosController;
  }

  /**
   * Meetodo encargado de asignar los eventos click a los botones y formulario
   */
  #agregarEventosClic() {
    
    document.querySelectorAll("button").forEach((ele) => {
      ele.addEventListener("click", this.#eventoclickBotones());
    });
    this.#form.addEventListener("submit", this.#submitForm());
  }

  /**
   * Metodo encargad de renderizar los santos en la vista
   * @param {} response 
   * @returns 
   */
  mostrarSantos(response) {
    if (response.ok) {
      const { santos } = response;
      santos.forEach((el) => {
        this.#template.querySelector(".name").textContent = el.nombre;
        this.#template.querySelector(".constellation").textContent =
          el.constelacion;
        this.#template.querySelector(".edit").dataset.id = el.id;
        this.#template.querySelector(".edit").dataset.name = el.nombre;
        this.#template.querySelector(".edit").dataset.constellation =
          el.constelacion;
        this.#template.querySelector(".delete").dataset.id = el.id;

        let $clone = document.importNode(this.#template, true);
        this.#fragment.appendChild($clone);
      });

      this.#table.querySelector("tbody").appendChild(this.#fragment);
      this.#agregarEventosClic();
      return;
    }
    const { message } = response;
    this.#table.insertAdjacentHTML(
      "afterend",
      `<p><b>Error ${message}</b></p>`
    );
  }

  /**
   * Evento click de los botones para editar o eliminar un santo 
   * @returns event
   */
  #eventoclickBotones() {
    return async (e) => {
      
      if (e.target.matches(".edit")) {
        this.#title.textContent = "Editar Santo";
        this.#form.nombre.value = e.target.dataset.name;
        this.#form.constelacion.value = e.target.dataset.constellation;
        this.#form.id.value = e.target.dataset.id;
      }

      if (e.target.matches(".delete")) {
        let isDelete = confirm(
          `¿Estás seguro de eliminar el id ${e.target.dataset.id}?`
        );

        if (isDelete) {
          //Delete - DELETE
          const respuesta = await this.#santoController.eliminarSanto(
            e.target.dataset.id
          );

          respuesta.ok && location.reload();

          !respuesta.ok && alert(`Error ${respuesta.message}`);
        }
      }
    };
  }

  /**
   * Metodo encargado de realizar el submit del formulario y crear el santo
   * @returns event
   */

  #submitForm() {
    return async (e) => {
      
      let data = {
        nombre: e.target.nombre.value,
        constelacion: e.target.constelacion.value,
      };

      if (!e.target.id.value) {
        const respuesta = await this.#santoController.crearSanto(data);
        respuesta.ok && location.reload();
        !respuesta.ok &&
          $form.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${respuesta.message}</b></p>`
          );
      } else {
        const respuesta = await this.#santoController.actualizarSanto(
          e.target.id.value,
          data
        );
        respuesta.ok && location.reload();
        !respuesta.ok &&
          $form.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${respuesta.message}</b></p>`
          );
      }
    };
  }
}
