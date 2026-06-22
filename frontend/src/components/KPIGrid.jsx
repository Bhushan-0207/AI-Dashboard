function KPIGrid({ kpis }) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {kpis.map((kpi, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow p-4"
        >
          <h3 className="text-gray-500">
            {kpi.title}
          </h3>

          <p className="text-2xl font-bold">
            {kpi.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default KPIGrid;