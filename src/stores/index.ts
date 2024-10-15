import { defineStore } from "pinia";
import axios from "axios";
// import { Client, Invoice, Project } from "../interfaces/interface"; // Importamos las interfaces

const BASE_URL = "http://localhost:8081/api";

export const useInvoiceStore = defineStore("invoice", {
  state: () => ({
    menuIsOpen: false,
    edit: { status: false, id: null as string | null },
    invoices: [] as Invoice[],  // Lista de facturas de la API
    filter: [] as string[],     // Filtros para facturas
    projects: [] as Project[],     // Filtros para facturas
  }),

  actions: {
    // Cargar facturas desde la API
    async fetchInvoices() {
      try {
        const response = await axios.get<Invoice[]>(`${BASE_URL}/invoices`);
        this.invoices = response.data;
      } catch (error) {
        console.error("Error al cargar las facturas:", error);
      }
    },

    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    },

    setEdit(payload: { status: boolean, id: string | null }) {
      this.edit = { ...payload };
    },

    // Añadir una nueva factura
    async addClient(payload: Omit<Client, "clientId">) {
      try {
        const response = await axios.post<Client>(`${BASE_URL}/clients`, payload);
        return response.data.clientId;
      } catch (error) {
        console.error("Error al agregar la factura:", error);
      }
    },

    // Añadir una nueva factura
    async addInvoice(payload: Omit<Invoice, "invoiceId">) {
      try {
        const clientId = await this.addClient(payload.client);
        payload.client.clientId = clientId;
        const response = await axios.post<Invoice>(`${BASE_URL}/invoices`, payload);
        this.invoices.push(response.data);
      } catch (error) {
        console.error("Error al agregar la factura:", error);
      }
    },

    // Eliminar una factura
    async deleteInvoice(invoiceId: string) {
      try {
        await axios.delete(`${BASE_URL}/invoices/${invoiceId}`);
        this.invoices = this.invoices.filter((invoice) => invoice.invoiceId !== invoiceId);
      } catch (error) {
        console.error("Error al eliminar la factura:", error);
      }
    },

    // Marcar una factura como pagada
    async markInvoiceAsPaid(invoiceId: string) {
      try {
        const invoice = this.invoices.find((inv) => inv.invoiceId === invoiceId);
        if (invoice) {
          invoice.status = "Paid";
          await axios.put(`${BASE_URL}/invoices/${invoiceId}`, invoice);
        }
      } catch (error) {
        console.error("Error al marcar como pagada la factura:", error);
      }
    },

    // Actualizar una factura existente
    async updateInvoice(payload: { invoiceId: string, info: Partial<Invoice> }) {
      try {
        const response = await axios.put<Invoice>(`${BASE_URL}/invoices/${payload.invoiceId}`, payload.info);
        const index = this.invoices.findIndex((inv) => inv.invoiceId === payload.invoiceId);
        this.invoices.splice(index, 1, response.data);
      } catch (error) {
        console.error("Error al actualizar la factura:", error);
      }
    },

    // Establecer filtros para las facturas
    setFilter(payload: string[]) {
      this.filter = payload;
    },
  },

  getters: {
    filteredInvoices: (state) => {
      if (!state.filter == null) return state.invoices;
      if (!state.filter.length) return state.invoices;
      return state.invoices.filter((item) => item.status !== "");
    },
  },
});


export interface Invoice {
    invoiceId: string;
    client: Client;
    address: string;
    city: string;
    postCode: number;
    country: string;
    invoiceDate: string; // ISO date string (yyyy-MM-dd)
    invoiceDue: string; // ISO date string (yyyy-MM-dd)
    paymentTerm: string;
    projectDesc: string;
    totalPrice: number;
    status: string; // E.g., "Pending", "Paid", etc.
    projects: Project[]
  }
  
  export interface Client {
    clientId: number;
    name: string;
    email: string;
    address: string;
    city: string;
    postCode: number;
    country: string;
    invoices: Invoice[];
  }

  export interface Project {
    projectId: number;
    invoice: Invoice;
    name: string;
    quantity: number;
    price: number;
    total: number;
  }