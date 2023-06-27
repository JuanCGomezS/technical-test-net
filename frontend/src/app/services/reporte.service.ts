import { Injectable } from '@angular/core';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor() { }

  imprimir(head: string[], body: Array<any>, titulo: string, filename: string, guardar?: boolean) {
    const documento = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: 'letter'
    });

    documento.text(titulo, documento.internal.pageSize.width / 2, 25, { align: 'center' });

    autoTable(documento, {
      head: [head],
      body: body
    });

    if (guardar) {
      const fecha = new Date();
      console.log();
      const nameFile = `Ventas Antojitos ${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()} Información de ${filename}.pdf`

      documento.save(nameFile);
    } else { }

  }
}
