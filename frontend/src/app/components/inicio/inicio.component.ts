import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
import { Chart, registerables } from 'chart.js';

type Counts = {
  [key: string]: number;
};

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  @ViewChild('myChart', { static: true }) myChart: ElementRef;
  @ViewChild('myChartClients', { static: true }) myChartClients: ElementRef;
  @ViewChild('myChartProducts', { static: true }) myChartProducts: ElementRef;

  listVentas: any[] = [];
  listClientes: any[] = [];
  listProductos: any[] = [];
  listProductosVenta: any[] = [];

  activated: string | null;
  ventasMes: { month: string, total: number }[] = [];

  constructor(
    private toastr: ToastrService,
    private _ventaService: VentaService,
    private _clienteService: ClienteService,
    private _productoService: ProductoService
  ) {
    this.activated = localStorage.getItem('auth');
    Chart.register(...registerables);

    if (this.activated) {
      this.getVentas();
      this.getProductos();
      this.getClientes();
      this.getProductosPorVenta();
    }
  }

  getVentas() {
    this._ventaService.getListVentas().subscribe((data: any) => {
      this.listVentas = data;
      this.ventasMes = this.getMonthlySales(data);
      setTimeout(() => {
        this.createChart();
      }, 1000);
    }, error => {
      this.toastr.error(`Se ha presentado un error buscando Ventas`, '¡¡ERROR!!')
      console.error(error);
    })
  }

  getMonthlySales(ventas: any[]): { month: string, total: number }[] {
    const monthlySales: { [month: string]: number } = {};

    ventas.forEach(venta => {
      const date = new Date(venta.fecha_v);
      const month = `${date.getMonth() + 1}/${date.getFullYear()}`;

      if (!monthlySales[month]) {
        monthlySales[month] = 0;
      }

      monthlySales[month] += venta.total_v;
    });

    return Object.entries(monthlySales).map(([month, total]) => ({ month, total }));
  }

  createChart(): void {
    const chart = new Chart(this.myChart.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        labels: this.ventasMes.map(sale => sale.month),
        datasets: [
          {
            label: 'Ventas mensuales',
            data: this.ventasMes.map(sale => sale.total),
            backgroundColor: 'rgba(1, 150, 253, 0.2)',
            borderColor: '#0196FD',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getProductos() {
    this._productoService.getListProductos().subscribe((result: any) => {
      this.listProductos = result;

    }, error => {
      this.toastr.error(`Se ha presentado un error buscando productos`, '¡¡ERROR!!')
      console.error(error);
    })
  }

  getClientes() {
    this._clienteService.getListClientes().subscribe((result: any) => {
      this.listClientes = result;

      setTimeout(() => {
        if (this.listVentas.length > 0) {
          this.createChartCli();
        }
      }, 1000);

    }, error => {
      this.toastr.error(`Se ha presentado un error buscando los clientes`, '¡¡ERROR!!')
      console.error(error);
    })
  }

  createChartCli(): void {
    const clientCounts: Counts = {};
    this.listVentas.forEach(sale => {
      if (clientCounts[sale.clienteId]) {
        clientCounts[sale.clienteId]++;
      } else {
        clientCounts[sale.clienteId] = 1;
      }
    });

    const clientNames: { [key: string]: string } = {};
    this.listClientes.forEach(client => {
      clientNames[client.id] = client.nombre_c;
    });

    const clientCountsArray = Object.entries(clientCounts);
    clientCountsArray.sort((a, b) => b[1] - a[1]);
    const top5Clients = clientCountsArray.slice(0, 5);

    const labels = top5Clients.map(client => clientNames[client[0]]);
    const data = top5Clients.map(client => client[1]);

    const chart = new Chart(this.myChartClients.nativeElement.getContext('2d'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Clientes con más compras',
            data: data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
          },
        ],
      },
    });
  }

  getProductosPorVenta() {
    this._productoService.getListProductoPorVenta().subscribe((result: any) => {
      this.listProductosVenta = result;

      setTimeout(() => {
        if (this.listProductos.length > 0) {
          this.createChartProd();
        }
      }, 1000);

    }, error => {
      this.toastr.error(`Se ha presentado un error buscando productos`, '¡¡ERROR!!')
      console.error(error);
    })
  }

  createChartProd(): void {
    const prodCounts: Counts = {};
    this.listProductosVenta.forEach(sale => {
      if (prodCounts[sale.productoId]) {
        prodCounts[sale.productoId]++;
      } else {
        prodCounts[sale.productoId] = 1;
      }
    });

    const prodNames: { [key: string]: string } = {};
    this.listProductos.forEach(prod => {
      prodNames[prod.id] = prod.nombre_p;
    });

    const prodArray = Object.entries(prodCounts);
    prodArray.sort((a, b) => b[1] - a[1]);
    const top5Prods = prodArray.slice(0, 5);

    const labels = top5Prods.map(prod => prodNames[prod[0]]);
    const data = top5Prods.map(prod => prod[1]);

    const chart = new Chart(this.myChartProducts.nativeElement.getContext('2d'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Producto más bendido',
            data: data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
          },
        ],
      },
    });
  }

}
