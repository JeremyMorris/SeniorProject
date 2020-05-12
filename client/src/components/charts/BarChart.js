import React from 'react'
import { Chart } from 'primereact/chart';

export const BarChart = ({ expenses, selectedCategories, dateList, xLabels }) => {
  let categoryDictionary = [];
  
  selectedCategories.forEach(cat => {
    categoryDictionary[cat._id] = {
      type: 'bar',
      label: cat.name,
      backgroundColor: cat.color,
      data: []
    };
  });

  dateList.forEach((d, i) => {
    const date = new Date(d);
    let expDate;

    const dayExpenses = expenses.filter(exp => {
      expDate = new Date(exp.date);
      return (expDate.getFullYear() === date.getFullYear() &&
      expDate.getMonth() === date.getMonth() &&
      expDate.getDate() === date.getDate());
    });
    
    selectedCategories.forEach(cat => {
      categoryDictionary[cat._id].data.push(0);
    });

    dayExpenses.forEach(exp => {
      if (categoryDictionary[exp.category]) {
        categoryDictionary[exp.category].data[i] += exp.amount;
      }
    });
  });

  const dataList = [];
  for (var key in categoryDictionary) {
    dataList.push(categoryDictionary[key]);
  }

  const data = {
    labels: xLabels,
    datasets: dataList
  };

  const stackedOptions = {
    tooltips: {
      mode: 'index',
      intersect: false
    },
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true,
      }],
      yAxes: [{
        stacked: true
      }]
    }
  };
  
  return (
    <Chart type="bar" data={data} options={stackedOptions} />
  )
}

BarChart.propTypes = {

}

export default BarChart;
