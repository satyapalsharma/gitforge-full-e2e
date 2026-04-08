const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

export async function generateLineChart(
  labels: string[],
  data: number[]
): Promise<Buffer> {
  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width: 800,
    height: 600,
    backgroundColour: '#ffffff',
  });

  const configuration = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Data',
          data,
          borderColor: 'blue',
          backgroundColor: 'rgba(0,0,255,0.1)',
          fill: true,
        },
      ],
    },
    options: {
      responsive: false,
    },
  };

  const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
  return buffer;
}
