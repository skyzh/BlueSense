export const options = {
  chartOptions: {
    responsive: true,
    maintainAspectRatio: false,
    element: {
      point: {
        pointStyle: 'rectRounded'
      }
    }
  },
  chartColors: [
    {
      backgroundColor: 'rgba(21,101,192,0.2)',
      borderColor: 'rgba(21,101,192,1)',
      pointBackgroundColor: 'rgba(21,101,192,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(21,101,192,0.8)'
    },
    {
      backgroundColor: 'rgba(63,81,181,0.2)',
      borderColor: 'rgba(63,81,181,1)',
      pointBackgroundColor: 'rgba(63,81,181,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(63,81,181,1)'
    },
    {
      backgroundColor: 'rgba(33,150,243,0.2)',
      borderColor: 'rgba(33,150,243,1)',
      pointBackgroundColor: 'rgba(33,150,243,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(33,150,243,0.8)'
    }
  ],
  chartLegend: true,
  chartType: 'line'
};