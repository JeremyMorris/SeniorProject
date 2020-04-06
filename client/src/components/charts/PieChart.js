import React from 'react'
import PropTypes from 'prop-types'
import { Chart } from 'primereact/chart';

export const PieChart = ({ expenses, selectedCategories }) => {
  let categoryDictionary = {};
  
  selectedCategories.forEach(cat => {
    categoryDictionary[cat._id] = {
      sum: 0,
      name: cat.name,
      color: cat.color
    };
  });

  expenses.forEach(exp => {
    if (exp.category in categoryDictionary) {
      categoryDictionary[exp.category].sum += exp.amount;
    }
  });

  let names = [];
  let sums = [];
  let colors = [];

  for (const cat in categoryDictionary) {
    names.push(categoryDictionary[cat].name);
    sums.push(categoryDictionary[cat].sum);
    colors.push(categoryDictionary[cat].color);
  };

  const data = {
    labels: names,
    datasets: [
      {
        data: sums,
        backgroundColor: colors,
        hoverBackgroundColor: colors
      }
    ]
  }

  return (
    <div>
      <Chart type="pie" data={data} />
    </div>
  )
}

PieChart.propTypes = {
  expenses: PropTypes.array.isRequired,
  selectedCategories: PropTypes.array.isRequired
}

export default PieChart;
