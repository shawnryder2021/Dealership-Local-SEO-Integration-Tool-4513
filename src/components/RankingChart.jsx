import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { motion } from 'framer-motion';

const RankingChart = ({ rankings }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!rankings.length) return;

    const chart = echarts.init(chartRef.current);

    const dates = ['7 days ago', '6 days ago', '5 days ago', '4 days ago', '3 days ago', '2 days ago', 'Yesterday', 'Today'];
    
    const series = rankings.slice(0, 5).map((ranking, index) => ({
      name: ranking.keyword,
      type: 'line',
      data: generateMockHistoricalData(ranking.currentPosition),
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: {
        width: 3
      }
    }));

    const option = {
      title: {
        text: 'Ranking Trends',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#1f2937'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: rankings.slice(0, 5).map(r => r.keyword),
        bottom: 0
      },
      grid: {
        top: 60,
        bottom: 80,
        left: 50,
        right: 30
      },
      xAxis: {
        type: 'category',
        data: dates,
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        name: 'Position',
        inverse: true,
        min: 1,
        max: 20
      },
      series: series
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [rankings]);

  const generateMockHistoricalData = (currentPosition) => {
    const data = [];
    let position = currentPosition + Math.floor(Math.random() * 5) - 2;
    
    for (let i = 0; i < 8; i++) {
      position += (Math.random() - 0.5) * 2;
      position = Math.max(1, Math.min(20, Math.round(position)));
      data.push(position);
    }
    
    data[data.length - 1] = currentPosition;
    return data;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </motion.div>
  );
};

export default RankingChart;