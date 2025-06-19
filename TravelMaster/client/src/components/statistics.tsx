import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface Statistics {
  happyCustomers: number;
  destinations: number;
  yearsExperience: number;
  awards: number;
  totalBookings: number;
  customerSatisfaction: number;
}

export default function Statistics() {
  const [animated, setAnimated] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    happyCustomers: 0,
    destinations: 0,
    yearsExperience: 0,
    awards: 0
  });
  const sectionRef = useRef<HTMLElement>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);

  const { data: stats, isLoading } = useQuery<Statistics>({
    queryKey: ['/api/statistics'],
  });

  useEffect(() => {
    const handleScroll = () => {
      if (animated || !stats || !sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setAnimated(true);
        
        // Animate statistics
        const targets = {
          happyCustomers: stats.happyCustomers,
          destinations: stats.destinations,
          yearsExperience: stats.yearsExperience,
          awards: stats.awards
        };
        
        Object.entries(targets).forEach(([key, target]) => {
          let current = 0;
          const increment = target / 100;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setAnimatedValues(prev => ({
              ...prev,
              [key]: Math.floor(current)
            }));
          }, 30);
        });

        // Create chart
        createChart();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animated, stats]);

  const createChart = () => {
    if (!chartRef.current || !stats) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Check if Chart.js is available
    if (typeof window !== 'undefined' && (window as any).Chart) {
      const Chart = (window as any).Chart;
      
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Customer Satisfaction', 'Remaining'],
          datasets: [{
            data: [stats.customerSatisfaction, 100 - stats.customerSatisfaction],
            backgroundColor: [
              'rgba(37, 99, 235, 0.8)',
              'rgba(255, 255, 255, 0.2)'
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
          },
          cutout: '70%'
        }
      });
    }
  };

  if (isLoading) {
    return (
      <section className="stats-section section-padding">
        <div className="container">
          <div className="row text-center">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="stat-card">
                  <div className="bg-white bg-opacity-20 animate-pulse h-12 mb-2 rounded"></div>
                  <div className="bg-white bg-opacity-20 animate-pulse h-6 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="stats-section section-padding">
      <div className="container">
        <div className="row text-center">
          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div className="stat-card">
              <span className="stat-number">
                {animatedValues.happyCustomers.toLocaleString()}+
              </span>
              <div className="stat-label">Happy Customers</div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div className="stat-card">
              <span className="stat-number">
                {animatedValues.destinations}+
              </span>
              <div className="stat-label">Destinations</div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="400">
            <div className="stat-card">
              <span className="stat-number">
                {animatedValues.yearsExperience}+
              </span>
              <div className="stat-label">Years Experience</div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="500">
            <div className="stat-card">
              <span className="stat-number">
                {animatedValues.awards}+
              </span>
              <div className="stat-label">Awards Won</div>
            </div>
          </div>
        </div>
        
        {/* Chart Section */}
        <div className="row mt-5">
          <div className="col-lg-6 offset-lg-3">
            <div className="text-center">
              <h4 className="text-white mb-3">Customer Satisfaction</h4>
              <div className="chart-container">
                <canvas ref={chartRef} width="300" height="300"></canvas>
                <div className="position-absolute top-50 start-50 translate-middle text-center">
                  <div className="text-white">
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                      {stats?.customerSatisfaction}%
                    </div>
                    <div>Satisfied</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
