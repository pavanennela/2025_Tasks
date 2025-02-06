// Importing necessary modules and components
import React from "react";
import { Bar } from "react-chartjs-2"; // Bar component for bar charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Registering the required components from Chart.js for the chart to function
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// ChartComponent takes 'barMonthlyData' as a prop, which contains income and expense data per month
const ChartComponent = ({ barMonthlyData }) => {
  // Extracting months (keys) from the input data object
  const months = Object.keys(barMonthlyData);

  // Mapping over the months to extract income and expense values for each month
  const incomeData = months.map((month) => barMonthlyData[month]?.income || 0); // Default to 0 if undefined
  const expenseData = months.map((month) => barMonthlyData[month]?.expense || 0); // Default to 0 if undefined

  // Defining the dataset for the bar chart
  const data = {
    labels: months, // Labels for the X-axis (months)
    datasets: [
      {
        label: "Income", // Label for the income dataset
        data: incomeData, // Income values for each month
        backgroundColor: "#4CAF50", // Green color for income bars
        borderColor: "#4CAF50", // Border color matching the bar color
        borderWidth: 1, // Border thickness for the bars
      },
      {
        label: "Expense", // Label for the expense dataset
        data: expenseData, // Expense values for each month
        backgroundColor: "#FF6347", // Red color for expense bars
        borderColor: "#FF6347", // Border color matching the bar color
        borderWidth: 1, // Border thickness for the bars
      },
    ],
  };

  // Configuration options for the chart
  const options = {
    responsive: true, // Makes the chart responsive to the screen size
    plugins: {
      legend: {
        position: "top", // Position of the legend (top of the chart)
        labels: {
          font: {
            size: 14, // Font size for the legend labels
          },
        },
      },
      tooltip: {
        callbacks: {
          // Customizing tooltip labels
          label: (tooltipItem) => {
            const value = tooltipItem.raw; // Raw value of the data point
            return `${tooltipItem.dataset.label}: ${value.toFixed(2)}`; // Display with two decimal places
          },
        },
      },
    },
  };

  // Rendering the Bar chart inside a styled container
  return (
    <div style={{ width: "60vw" }}> {/* Container for the chart */}
      <h3>Monthly Income and Expenses</h3> {/* Chart title */}
      <Bar data={data} options={options} /> {/* Bar chart component with data and options */}
    </div>
  );
};

export default ChartComponent; // Exporting the component for use in other parts of the application
