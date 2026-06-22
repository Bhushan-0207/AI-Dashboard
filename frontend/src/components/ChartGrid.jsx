import ChartRenderer from "./ChartRenderer";

function ChartGrid({ charts }) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {charts.map((chart, index) => (
        <ChartRenderer
          key={index}
          chart={chart}
        />
      ))}
    </div>
  );
}

export default ChartGrid;