import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { motion } from 'framer-motion';

const PerformanceChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const option = {
      title: {
        text: 'Local SEO Performance',
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
        data: ['Average Position', 'Local Pack Appearances', 'Organic Traffic']
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yAxis: [
        {
          type: 'value',
          name: 'Position',
          position: 'left',
          inverse: true,
          min: 1,
          max: 20
        },
        {
          type: 'value',
          name: 'Traffic',
          position: 'right'
        }
      ],
      series: [
        {
          name: 'Average Position',
          type: 'line',
          data: [15.2, 14.8, 13.5, 12.9, 12.1, 11.8, 11.2, 10.9, 10.5, 10.1, 9.8, 9.4],
          smooth: true,
          lineStyle: {
            color: '#3b82f6'
          },
          itemStyle: {
            color: '#3b82f6'
          }
        },
        {
          name: 'Local Pack Appearances',
          type: 'bar',
          data: [45, 52, 58, 64, 71, 78, 85, 89, 94, 98, 102, 108],
          itemStyle: {
            color: '#10b981'
          }
        },
        {
          name: 'Organic Traffic',
          type: 'line',
          yAxisIndex: 1,
          data: [8500, 9200, 10100, 11200, 12300, 13100, 13800, 14200, 14800, 15100, 15400, 15800],
          smooth: true,
          lineStyle: {
            color: '#f59e0b'
          },
          itemStyle: {
            color: '#f59e0b'
          }
        }
      ]
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
  }, []);

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

export default PerformanceChart;