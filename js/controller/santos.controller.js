import { SantoModel } from "../model/santo.model.js";
import { SantosService } from "../service/santosService.js";
import { SantosView } from "../view/santos.view.js";


/**
 * Clase controlador santos
 * @class
 */
class SantosController {
  #santosService;
  #santosView;
  #respuesta;
  constructor() {
    this.#santosService = new SantosService();
    this.#santosView = new SantosView(this);
  }

  init() {
    this.#getSantos();
  }


  /**
   * Metodo que obtiene todos los santos creados en el api falsa
   */
  async #getSantos() {
    try {
      const santos = await this.#santosService.obtenerSantos();
      this.#respuesta = {
        ok: true,
        santos,
      };
      this.#santosView.mostrarSantos(this.#respuesta);
    } catch (error) {
      
      this.#respuesta = {
        ok: false,
        message: error.statusText || "Ocurrió un error",
      };
      this.#santosView.mostrarSantos(this.#respuesta);
    }
  }

  /**
   * Mentodo encargado de buscar un santo por su ID
   * @param {number} id 
   * @returns 
   */
  async eliminarSanto(id) {
    try {
      await this.#santosService.borrarSanto(id);
      return this.#respuesta = {
        ok: true,
      };
    } catch (error) {
      return this.#respuesta = {
        ok: false,
        message: error.statusText || "Ocurrió un error"

      };
    }
  }

  /**
   * 
   * @param {number} id 
   * @param {SantoModel} data 
   * @returns 
   */
  async actualizarSanto(id,data) {
    try {
      await this.#santosService.actualizarSanto(id,data);
      return this.#respuesta = {
        ok: true,
      };
    } catch (error) {
      return this.#respuesta = {
        ok: false,
        message: error.statusText || "Ocurrió un error"

      };
    }
  }

  /**
   * 
   * @param {SantoModel} santo 
   * @returns 
   */

  async crearSanto(santo) {
    try {
      await this.#santosService.crearSanto(santo);
      return this.#respuesta = {
        ok: true,
      };
    } catch (error) {
      return this.#respuesta = {
        ok: false,
        message: error.statusText || "Ocurrió un error"

      };
    }
  }


}

export const santosController = new SantosController();

santosController.init();
