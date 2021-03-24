# ionic-scroll
 
 Bug video placed @ https://drive.google.com/drive/folders/1oZPFO11jkAwsg7faCQHIxpz7Ua4-qKQV?usp=sharing




const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)"
      ],
      borderWidth: 1
    }
  ]
};

const App = () => {
  const [tooltipValue, setTooltipValue] = useState({ value: "", x: 0 });
  const canvasref = useRef(null);
  let myChart:any;
  useEffect(() => {
    const ctx = document.getElementById("myChart") as HTMLCanvasElement;
    Chart.defaults.LineWithLine = Chart.defaults.line;
    Chart.controllers.LineWithLine = Chart.controllers.line.extend({
    draw: function(ease:any) {
        Chart.controllers.line.prototype.draw.call(this, ease);

        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
          console.log('hiiiiiii');
          var activePoint = this.chart.tooltip._active[0],
              ctx = this.chart.ctx,
              x = activePoint.tooltipPosition().x,
              topY = this.chart.scales['y-axis-0'].top,
              bottomY = this.chart.scales['y-axis-0'].bottom;

          // draw line
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#07C';
          ctx.stroke();
          ctx.restore();
        }
    }
});

    myChart = new Chart(ctx, {
      type: "LineWithLine",
      data,
      //legend: { display: false },
      options: {
        tooltips: {
          enabled: false,
          intersect:false,
        },
        events :['mousemove', 'mouseout', 'touchstart', 'touchmove'],
        hover: {
          mode: 'x',
          intersect: false
       },
        onHover: function(event, array = []) {
          //alert(array);
          if (array?.length) {
            //console.log('In',event.x);
            var activeElement = array[0];
            if ("_index" in activeElement) {
              const index = activeElement["_index"];
              const model = activeElement["_model"];
              const xPosition = model["x"];
              //console.log("activeElement array ", model["x"]);
              //console.log(index, xPosition);
              updateHeader({ index, xPosition });
            }
          }
          if(event.type ==='mouseout'){
            updateHeader({ index:0, xPosition :0});
          }
        }
        
      }
    });
    //canvasref.current.addEventListener("mousemove", handleMove);
  }, []);

  
  const updateHeader = (param:any) => {
    const { index, xPosition } = param;
    const value = data?.datasets[0].data[index];
    console.log("updateHeader", value,xPosition);
    setTooltipValue({ value: value.toString(), x: xPosition });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>rrrrrrr</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {tooltipValue?.value ? (
          <div className="tooltip-container">
            <div className="batch">{tooltipValue?.value}</div>
            <div className="batch-value">
              <span
                className="batch-text"
                style={{
                  left:
                    tooltipValue.x > 10 ? tooltipValue.x - 15 : tooltipValue.x
                }}
              >
                {tooltipValue?.x.toFixed(2)}
              </span>
            </div>
          </div>
        ) : (
          <div>Custom Nav </div>
        )}
        <div
          className="chart-container"
          style={{ position: "relative", height: "40vh", width: " 80vw" }}
        >
          <canvas ref={canvasref} id="myChart" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default App;
