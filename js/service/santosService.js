import { SantoModel } from "../model/santo.model.js";

/**
 * Clase encragada de manejar los servicios y conexion con el API
 * @class
 */
export class SantosService {
  #url;
  #opciones;

  constructor() {
    this.#url = "http://localhost:3000/santos";
    this.#opciones = {
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
    };
  }

  /**
   * Obtiene todos los santos del API
   * @returns <Promise>
   */
  async obtenerSantos() {
    const { data } = await axios.get(this.#url, this.#opciones);
    const santos = data.map(
      ({ id, nombre, constelacion }) => new SantoModel(id, nombre, constelacion)
    );
    return santos;
  }

  /**
   * Ontiene el sato po ID
   * @param {SantoModel} santo 
   */
  async crearSanto(santo) {
    await axios.post(this.#url, santo, this.#opciones);
  }

  /**
   * Actauliza las propiedades del santo enviado
   * @param {number} id 
   * @param {SantoModel} data 
   */

  async actualizarSanto(id, data) {
    await axios.put(`${this.#url}/${id}`, data, this.#opciones);
  }

  /**
   * Borra el anto por ID
   * @param {number} id 
   */
  async borrarSanto(id) {
    await axios.delete(`${this.#url}/${id}`, this.#opciones);
  }
}
