import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function ChartRenderer({ chart }) {

  const options = {
    chart: {
      type: chart.type
    },

    title: {
      text: chart.title
    },

    xAxis: {
      categories: chart.categories
    },

    series: [
      {
        name: chart.title,
        data: chart.data
      }
    ]
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
}

export default ChartRenderer;