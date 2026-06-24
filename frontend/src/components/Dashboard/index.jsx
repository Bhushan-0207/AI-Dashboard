import React from 'react';
import Highcharts from 'highcharts';
import { Chart } from '@highcharts/react';
import KPICard from '../KPICard';

export default function Dashboard({ data, isDarkMode, onReset }) {
    const { dashboard_title, dataset_type, kpis, charts } = data;

    const textColor = isDarkMode ? '#F8FAFC' : '#0F172A';
    const gridLineColor = isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)';
   //colour palette
    const getChartColors = (type) => {
        if (type === 'pie') {
            return isDarkMode 
                ? ["#22D3EE", "#7C3AED", "#A855F7", "#3B82F6", "#10B981", "#F472B6"] 
                : ["#06B6D4", "#4F46E5", "#8B5CF6", "#2563EB", "#059669", "#EC4899"];
        }
        if (type === 'line' || type === 'spline') {
            return isDarkMode 
                ? ["#7C3AED", "#22D3EE", "#A855F7"] 
                : ["#4F46E5", "#06B6D4", "#8B5CF6"];
        }
        if (type === 'bar' || type === 'column') {
            return isDarkMode 
                ? ["#3B82F6", "#7C3AED", "#22D3EE", "#10B981"] 
                : ["#2563EB", "#4F46E5", "#06B6D4", "#059669"];
        }
        return isDarkMode ? ["#7C3AED"] : ["#4F46E5"];
    };

    const chartOptionsList = charts.map(chart => {
        const typeColors = getChartColors(chart.type);
        const primaryColor = typeColors[0]; 

         const shapeOpacity = isDarkMode ? 0.55 : 0.65;

        //translucency
        const appliedColors = typeColors.map(color => {
            if (['pie', 'bar', 'column'].includes(chart.type)) {
                return Highcharts.color(color).setOpacity(shapeOpacity).get('rgba');
            }
            return color; 
        });

        return {
            chart: { 
                type: chart.type,
                backgroundColor: 'transparent',
                style: { fontFamily: 'Inter, "SF Pro Display", sans-serif' },
                spacing: [20, 20, 20, 20]
            },
            title: { 
                text: null 
            },
            colors: appliedColors,
            xAxis: { 
                categories: chart.categories,
                gridLineColor: gridLineColor, 
                labels: { style: { color: textColor, fontWeight: '500' } },
                lineColor: gridLineColor,
                tickColor: 'transparent'
            },
            yAxis: { 
                title: { text: null },
                gridLineColor: gridLineColor,
                labels: { style: { color: textColor, fontWeight: '500' } }
            },
            legend: {
                itemStyle: { color: textColor, fontWeight: '600', cursor: 'pointer' },
                itemHoverStyle: { color: isDarkMode ? '#22D3EE' : '#4F46E5' },
                symbolRadius: 4
            },
            tooltip: {
                backgroundColor: isDarkMode ? 'rgba(10, 11, 15, 0.85)' : 'hsla(0, 0%, 100%, 0.90)',
                style: { color: textColor, fontWeight: '500' },
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                borderRadius: 12,
                shadow: false,
                padding: 12
            },
            plotOptions: {
                column: { 
                    colorByPoint: true, 
                    borderRadius: 6, 
                    borderWidth: 1.5, 
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(79,70,229,0.3)'
                },
                bar: { 
                    colorByPoint: true, 
                    borderRadius: 6, 
                    borderWidth: 1.5, 
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(79,70,229,0.3)'
                },
                pie: { 
                    borderWidth: 2, 
                    borderColor: isDarkMode ? 'rgba(10,11,15,0.8)' : 'rgba(255,255,255,0.8)',
                    innerSize: '60%',
                    dataLabels: {
                        style: {
                            color: isDarkMode ? '#ffffff' : '#0F172A',
                            textOutline: 'none',
                            fontWeight: '500'
                        }
                    }
                },
                line: { 
                    lineWidth: 3,
                    marker: { radius: 5, symbol: 'circle', lineWidth: 2, lineColor: isDarkMode ? '#111827' : '#ffffff' }
                },
                area: {
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, Highcharts.color(primaryColor).setOpacity(0.3).get('rgba')], 
                            [1, Highcharts.color(primaryColor).setOpacity(0.0).get('rgba')]
                        ]
                    },
                    lineWidth: 3,
                    lineColor: primaryColor,
                    marker: { enabled: false }
                }
            },
            series: [
                { 
                    name: chart.title, 
                    data: chart.type === 'pie' && chart.categories
                        ? chart.data.map((val, i) => ({
                              name: chart.categories[i] || `Slice ${i + 1}`,
                              y: val
                          }))
                        : chart.data 
                }
            ],
            credits: { 
                enabled: false 
            }
        };
    });

    return (
        <div className="relative min-h-screen bg-[#F5F7FB] dark:bg-[#0A0B0F] font-sans transition-colors duration-500 overflow-hidden">
            
            {/*Background*/}
            <div className="fixed top-[-10%] left-[-5%] w-[700px] h-[700px] bg-[#4F46E5]/10 dark:bg-[#7C3AED]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen dark:mix-blend-lighten" />
            <div className="fixed top-[40%] right-[-10%] w-[600px] h-[600px] bg-[#06B6D4]/10 dark:bg-[#22D3EE]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen dark:mix-blend-lighten" />

            <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/*Header*/}
                <header className="mb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in-up">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-2 h-2 rounded-full bg-[#06B6D4] dark:bg-[#22D3EE] shadow-[0_0_10px_rgba(6,182,212,0.8)] dark:shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                Real-Time Analytics
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: 'Inter, "SF Pro Display", sans-serif' }}>
                            {dashboard_title}
                        </h1>
                    </div>
                    
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(20,25,35,0.65)] backdrop-blur-xl border border-[rgba(255,255,255,0.8)] dark:border-[rgba(255,255,255,0.08)] shadow-[0_4px_16px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.2)] text-[#4F46E5] dark:text-[#22D3EE] text-sm font-semibold rounded-xl tracking-wide">
                        <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                        {dataset_type}
                    </div>

                    
                </header>
                
                {/* Reset Button Area */}
                <div className="flex justify-end mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <button 
                        onClick={onReset}
                        className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-blue-100 text-blue-600 dark:bg-rose-500/10 dark:text-rose-400 hover:bg-blue-200 dark:hover:bg-rose-500/20 transition-all shadow-sm hover:-translate-y-0.5 flex items-center gap-2 border border-blue-200 dark:border-rose-500/20"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Start New Analysis
                    </button>
                </div>


                {/* KPI Grid */}
                <div className="flex flex-wrap lg:grid lg:grid-cols-5 gap-6 mb-12">
                    {kpis.map((kpi, index) => (
                        <KPICard 
                            key={`kpi-${index}`} 
                            title={kpi.title} 
                            value={kpi.value} 
                        />
                    ))}
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {chartOptionsList.map((options, index) => {
                        const isFullRow = index === 2; 
                        const currentChartTitle = charts[index].title;

                        return (
                            <div 
                                key={`chart-${index}`} 
                                className={`group relative w-full flex flex-col ${isFullRow ? 'lg:col-span-2' : 'lg:col-span-1'}`}
                            >
                                {/*Hover Glow behind Chart Card*/}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4F46E5]/20 to-[#06B6D4]/20 dark:from-[#7C3AED]/20 dark:to-[#22D3EE]/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700 ease-in-out pointer-events-none" />
                                
                                {/* Main Chart Container*/}
                                <div className="relative flex-1 flex flex-col bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(20,25,35,0.65)] backdrop-blur-[40px] border border-blue-500 shadow-sm dark:border-blue-400/30  dark:shadow-[0_8px_32px_rgba(0,0,0,0.15)] rounded-[2rem] p-6 md:p-8 transition-transform duration-500 group-hover:-translate-y-1">
                                    
                                    {/* 3D Surface Highlight */}
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none rounded-t-[2rem]" />
                                    
                                    <div className="relative z-10 mb-6 flex flex-col gap-4 w-full">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: 'Inter, "SF Pro Display", sans-serif' }}>
                                            {currentChartTitle}
                                        </h3>
                                        <div className="w-full h-[1px] bg-gradient-to-r from-slate-300 via-slate-200 to-transparent dark:from-slate-700 dark:via-slate-800 dark:to-transparent" />
                                    </div>

                                    <div className="relative z-10 w-full flex-1 min-h-[350px]">
                                        <Chart
                                            highcharts={Highcharts}
                                            options={options}
                                            containerProps={{ style: { height: '100%', width: '100%' } }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
            </div>
        </div>
    );
}