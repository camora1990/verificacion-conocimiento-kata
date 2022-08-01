/**
 * Clase modelo santo
 * @class
 */


export class SantoModel {
  #id;
  #nombre;
  #constelacion;
  /**
   * 
   * @param {number} id 
   * @param {string} nombre 
   * @param {string} constelacion 
   */
  constructor(id, nombre, constelacion) {
    this.#id = id;
    this.#nombre = nombre;
    this.#constelacion = constelacion;
  }

  get id() {
    return this.#id;
  }
  get nombre() {
    return this.#nombre;
  }
  get constelacion() {
    return this.#constelacion;
  }

  set id(value) {
    this.#id = value;
  }
  set nombre(value) {
    this.#nombre = value;
  }
  set constelacion(value) {
    this.#constelacion = value;
  }
}
