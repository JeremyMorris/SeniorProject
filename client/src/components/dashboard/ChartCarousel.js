import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'primereact/carousel';
import PieChart from '../charts/PieChart';
import BarChart from '../charts/BarChart';

export const ChartCarousel = ({ expenses, selectedCategories, fromDate, toDate }) => {
  const filteredExpenses = expenses.filter(
    exp => {
      const time = new Date(exp.date).getTime();
      const from = new Date(fromDate).getTime();
      const to = new Date(toDate).getTime();
      return (from <= time && time <= to);
    }
  );

  const dateList = [];
  const xLabels = [];

  let i = new Date(fromDate);
  let endDate = new Date(toDate);
  for (i; i <= endDate; i.setDate(i.getDate()+1)) {
    dateList.push(i.toISOString().slice(0,10));
    xLabels.push(i.toISOString().slice(5,10));
  }
  
  const charts = [
    (<PieChart expenses={filteredExpenses} selectedCategories={selectedCategories} />),
    (<BarChart expenses={filteredExpenses} selectedCategories={selectedCategories} dateList={dateList} xLabels={xLabels} />)
  ];
  
  return (
    <Carousel value={charts} itemTemplate={(chart) => chart} numVisible={1} numScroll={1}/>
  )
}

ChartCarousel.propTypes = {

}

export default ChartCarousel
