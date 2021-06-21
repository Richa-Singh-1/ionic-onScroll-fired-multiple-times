mport * as Highcharts from 'highcharts';


const App: React.FC = () => {

  const renderBarAreaChart = () => {
    let chart: any = null;

    const mouseUpEvent = function () {
      chart.tooltip.hide();
      chart.xAxis[0].hideCrosshair();
    };


    // @ts-ignore
    chart = Highcharts.chart('container', {
      chart: {
        type: 'area',
        events: {
          load: function () {
            this.container.addEventListener('click', mouseUpEvent);
            this.container.addEventListener('touchend', mouseUpEvent);
          }
        },
      },

      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        crosshair: {
          width: 2,
          color: '#002BEB',
        },
        allowDecimals: false,
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        accessibility: {
          rangeDescription: 'Range: 1940 to 2017.'
        }
      },
      yAxis: {
        title: {
          text: 'Nuclear weapon states'
        },
        labels: {
          formatter: function () {
            // @ts-ignore
            return this.value;
          }
        }
      },
      tooltip: {
        shared: true,
        outside: true,
        useHTML: true,
        animation: false,
        hideDelay: 0,
        pointFormatter: function () {
          return '<div>Hello World</div>';
        },
        positioner: function (labelHeight, labelWidth, value) {
          const { plotX } = value;
          return {
            x: plotX,
            y: this.chart.plotHeight - 50,
          }
        }
      },
      plotOptions: {
        area: {
          pointStart: 1940,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        },
      },
      series: [{
        name: 'USA',
        data: [0, 29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        events: {
          legendItemClick: function () {
            return false;
          }
        },
        color: '#00B3F0',
      }],
      credits: {
        enabled: false
      }
    });
  };


  const renderPieChart = () => {
    let chart: any = null;
    let selectedFlag = false;
    const data = [
      {
        name: 'Chrome',
        y: 61.41,
      }, {
        name: 'Internet Explorer',
        y: 11.84
      }, {
        name: 'Firefox',
        y: 10.85
      }, {
        name: 'Edge',
        y: 4.67
      }, {
        name: 'Safari',
        y: 4.18
      }, {
        name: 'Other',
        y: 7.05
      }
    ];



    function fadeData() {
      // @ts-ignore
      const currentData = this;
      let options = { name: '', y: '' };
      // @ts-ignore
      this.series.data.forEach(function (data) {
        if (currentData.id !== data.id) {
          data.update({ opacity: 0.2 }, false);
        } else {
          options = data.options;
          data.update({ opacity: 1 }, false);
        }
      });

      // @ts-ignore
      this.series.chart.update({
        title: {
          text: `${options.name} - ${options.y}`,
          align: 'center',
          verticalAlign: 'middle',
        }
      });
      selectedFlag = true;
      // @ts-ignore
      this.series.chart.redraw();
    }

    // @ts-ignore
    chart = Highcharts.chart({
      chart: {
        type: 'pie',
        renderTo: 'pie-container',
      },
      title: {
        text: '2020',
        align: 'center',
        verticalAlign: 'middle',
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        pie: {
          innerSize: '60%',
          allowPointSelect: true,
          cursor: 'pointer',
          slicedOffset: 0,
          colors: ['#613F75', '#EF798A', '#011638', '#DD9787', '#74D3AE', 'aqua'],
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        },
        series: {
          states: {
            hover: {
              enabled: false,
            }
          },
          events: {
            click: function () {
              if (selectedFlag && this) {
                this.data.forEach(function (data: any) {
                  data.update({ opacity: 1 }, false);
                });

                this.chart.update({
                  title: {
                    text: `reset`,
                    align: 'center',
                    verticalAlign: 'middle',
                  }
                });

                this.chart.redraw();
                selectedFlag = false;
              }
            }
          }
        }
      },
      // @ts-ignore
      series: [{
        data: data,
        allowPointSelect: true,
        point: {
          events: {
            select: fadeData,
          }
        },
      }],
      credits: {
        enabled: false
      }
    });
  }


  useEffect(() => {
    renderBarAreaChart();
    renderPieChart();
  }, []);

  return (

    <IonApp>
      <IonPage>
        <div style={{ height: '90vh' }}>
          <div style={{ height: '300px', backgroundColor: 'red' }}>Header</div>
          <div id="container" />
          <div id="pie-container" />
          <div style={{ height: '300px', backgroundColor: 'green' }}>Footer</div>
        </div>
      </IonPage>
    </IonApp>
  );
};

export default App;
