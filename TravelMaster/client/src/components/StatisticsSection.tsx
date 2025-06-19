import { useEffect, useRef, useState } from "react";

const stats = [
  { number: 50000, label: "Happy Customers", suffix: "+" },
  { number: 150, label: "Destinations", suffix: "+" },
  { number: 15, label: "Years Experience", suffix: "+" },
  { number: 25, label: "Awards Won", suffix: "+" }
];

export default function StatisticsSection() {
  const [animated, setAnimated] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            setAnimated(true);
            
            // Animate each stat number
            stats.forEach((stat, index) => {
              let current = 0;
              const increment = stat.number / 100;
              const timer = setInterval(() => {
                current += increment;
                if (current >= stat.number) {
                  current = stat.number;
                  clearInterval(timer);
                }
                setAnimatedNumbers(prev => {
                  const newNumbers = [...prev];
                  newNumbers[index] = Math.floor(current);
                  return newNumbers;
                });
              }, 30);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [animated]);

  useEffect(() => {
    // Initialize Chart.js for statistics visualization
    const initChart = () => {
      const ctx = document.getElementById('statsChart') as HTMLCanvasElement;
      if (ctx && window.Chart && !ctx.dataset.chartInitialized) {
        ctx.dataset.chartInitialized = 'true';
        
        new window.Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Happy Customers', 'Destinations', 'Years Experience', 'Awards Won'],
            datasets: [{
              data: [50000, 150, 15, 25],
              backgroundColor: [
                'rgba(37, 99, 235, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(239, 68, 68, 0.8)'
              ],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });
      }
    };

    // Check if Chart.js is loaded
    if (window.Chart) {
      initChart();
    } else {
      // Wait for Chart.js to load
      const checkChart = setInterval(() => {
        if (window.Chart) {
          initChart();
          clearInterval(checkChart);
        }
      }, 100);
    }
  }, []);

  return (
    <section ref={sectionRef} className="stats-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="row text-center">
              {stats.map((stat, index) => (
                <div key={index} className="col-lg-6 col-md-6" data-aos="fade-up" data-aos-delay={200 + index * 100}>
                  <div className="stat-card">
                    <span className="stat-number">{animatedNumbers[index].toLocaleString()}{stat.suffix}</span>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4" data-aos="fade-left" data-aos-delay="400">
            <div className="chart-container">
              <canvas id="statsChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
