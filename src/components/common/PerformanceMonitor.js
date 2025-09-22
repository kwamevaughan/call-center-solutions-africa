// PerformanceMonitor.jsx - Monitor and display performance metrics
import React, { useState, useEffect, useRef } from 'react';

const PerformanceMonitor = ({ enabled = false, children }) => {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    inputDelay: 0,
    lastInputTime: 0
  });
  
  const renderStartTime = useRef(0);
  const inputStartTime = useRef(0);

  useEffect(() => {
    if (enabled) {
      renderStartTime.current = performance.now();
    }
  });

  useEffect(() => {
    if (enabled && renderStartTime.current > 0) {
      const renderTime = performance.now() - renderStartTime.current;
      setMetrics(prev => ({ ...prev, renderTime }));
    }
  });

  const measureInputPerformance = (callback) => {
    return (...args) => {
      if (enabled) {
        inputStartTime.current = performance.now();
      }
      
      const result = callback(...args);
      
      if (enabled) {
        const inputDelay = performance.now() - inputStartTime.current;
        setMetrics(prev => ({
          ...prev,
          inputDelay,
          lastInputTime: Date.now()
        }));
      }
      
      return result;
    };
  };

  if (!enabled) {
    return children;
  }

  return (
    <div className="relative">
      {children}
      <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded-lg text-xs font-mono z-50">
        <div>Render: {metrics.renderTime.toFixed(2)}ms</div>
        <div>Input: {metrics.inputDelay.toFixed(2)}ms</div>
        <div>Last: {new Date(metrics.lastInputTime).toLocaleTimeString()}</div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;