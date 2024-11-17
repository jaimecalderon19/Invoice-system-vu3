import { defineStore } from "pinia";
import axios from "axios";

const BASE_URL = "http://localhost:8081/api";

export const useVehiculeStore = defineStore("Vehicule", {
  state: () => ({
    menuIsOpen: false,
    vehicules: [] as Vehicule[],  // Lista de facturas de la API
    filter: [] as string[],     // Filtros para facturas
  }),

  actions: {
    // Cargar facturas desde la API
    async fetchVehicules() {
      try {
        const response = await axios.get<Vehicule[]>(`${BASE_URL}/invoices`);
        this.vehicules = response.data;
      } catch (error) {
        console.error("Error al cargar las facturas:", error);
      }
    },

    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    },

    // Añadir una nueva factura
    async addVehicule(payload: Omit<Vehicule, "invoiceId">) {
      try {
        const response = await axios.post<Vehicule>(`${BASE_URL}/invoices`, payload);
        this.vehicules.push(response.data);
      } catch (error) {
        console.error("Error al agregar la factura:", error);
      }
    },
  },

  getters: {},
});




export interface Vehicule {
    clientId: number;
    name: string;
    email: string;
    address: string;
    city: string;
    postCode: number;
}
