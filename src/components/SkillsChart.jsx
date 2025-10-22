// Create src/components/SkillsChart.jsx
import { useState } from 'react';

const skills = {
  'Frontend': [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 95 },
    { name: 'Tailwind CSS', level: 85 },
  ],
  'Backend': [
    { name: 'Python', level: 92 },
    { name: 'SQL', level: 88 },
    { name: 'Node.js', level: 75 },
  ],
  'Data': [
    { name: 'dbt', level: 85 },
    { name: 'Airflow', level: 80 },
    { name: 'Snowflake', level: 82 },
  ],
};

export const SkillsChart = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend');
  
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        {Object.keys(skills).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full transition ${
              activeCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="space-y-4">
        {skills[activeCategory].map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-1">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};