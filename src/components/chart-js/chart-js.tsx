import { Component, Element, Prop, Watch } from '@stencil/core';

// TODO: Use @types/chart.js
import * as chartjs from 'chart.js';
const { Chart } = chartjs.default.Chart;

@Component({
  tag: 'chart-js',
  styleUrl: 'chart-js.css'
  // shadow: true // TODO: try later
})
export class ChartJs {

  @Prop()
  private data: any;
  @Watch('data')
  protected dataWatcher(newData: any): void {
    console.log('chart-js::dataWatcher', newData);

    this.myChartInstance.data.labels = newData.labels;

    this.myChartInstance.data.datasets.forEach((dataset: any) => {
      dataset.data = newData.values;
    });

    this.myChartInstance.update();
  }
  @Element()
  private el: HTMLElement;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  @Prop({
    context: 'isServer'
  })
  private isServer: boolean;

  protected myChartInstance: any;

  protected componentDidLoad(): void {

    if (!this.isServer) {
      // this.canvas = this.el.shadowRoot.querySelector('canvas');
      this.canvas = this.el.querySelector('canvas');
      this.canvas.width = 400;
      this.canvas.height = 300;

      this.context = this.canvas.getContext('2d');

      const chartOptions: any = {
        type: 'line',
        data: {
          labels: this.data.labels,
          datasets: [{
            label: this.data.caption[0],
            data: this.data.values,
            backgroundColor: [
              'rgba(0, 163, 218, 1.0)'
              // 'rgba(54, 162, 235, 0.2)',
              // 'rgba(255, 206, 86, 0.2)',
              // 'rgba(75, 192, 192, 0.2)',
              // 'rgba(153, 102, 255, 0.2)',
              // 'rgba(255, 159, 64, 0.2)'
            ],
            // borderColor: [
            //   'rgba(255,99,132,1)',
            //   'rgba(54, 162, 235, 1)',
            //   'rgba(255, 206, 86, 1)',
            //   'rgba(75, 192, 192, 1)',
            //   'rgba(153, 102, 255, 1)',
            //   'rgba(255, 159, 64, 1)'
            // ],
            borderWidth: 1
          }]
        },
        options: {
          animation: {
            duration: 0
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      };

      this.myChartInstance = new Chart(this.context, chartOptions);
    }

  }

  protected render(): JSX.Element {
    return (
      <div class='chart-container' style={{ position: 'relative', height: '65vh', width: '100%' }}>
        <canvas width='400' height='300' />
      </div>
    );
  }
}
